import {T,box,material,woodMaterial,cylinder,sphere,mesh,marker,mug,canvasTexture} from '../world.js';
import {lightFire,brewTea} from '../state.js';
export function createChapter(app){
 const root=new T.Group(),colliders=[],interactions=[];const wood=woodMaterial('#73634d'),dark=woodMaterial('#493f32'),plaster=material('#858475'),stone=material('#666e65'),iron=material('#333b37');
 // A cutaway room: front wall and roof are intentionally omitted for the camera.
 box(root,11,.22,10,wood,0,-.13,0);for(let i=0;i<23;i++)box(root,.022,.004,10,dark,-5.3+i*.48,.001,0);
 box(root,11,3.7,.2,plaster,0,1.85,-5);box(root,.18,3.7,10,plaster,-5.5,1.85,0);box(root,.18,.8,10,plaster,5.5,.4,0);
 for(let i=0;i<5;i++){box(root,.18,3.8,.24,dark,-5.36,1.9,-4.8+i*2.4);box(root,.22,3.8,.24,dark,-5+i*2.5,1.9,-4.84);}box(root,11,.15,.2,dark,0,3.2,-4.78);
 // Deep window and a painted distant view, loaded only when this chapter is imported.
 const win=material('#c4d2c1',{emissive:'#a0b7a2',emissiveIntensity:.28});box(root,3.5,2.2,.08,dark,2.55,2.04,-4.83);box(root,3.22,1.94,.08,win,2.55,2.04,-4.75);
 const viewMap=typeof document!=='undefined'?new T.TextureLoader().load('assets/valley.webp'):null;if(viewMap)viewMap.colorSpace=T.SRGBColorSpace;
 const view=mesh(root,new T.PlaneGeometry(3.17,1.89),new T.MeshBasicMaterial({map:viewMap,color:'#bfc7b0'}),2.55,2.04,-4.69);
 for(const x of [1.03,2.55,4.08])box(root,.085,2,.08,dark,x,2.04,-4.62);box(root,3.3,.08,.08,dark,2.55,2.02,-4.61);box(root,3.65,.1,.5,wood,2.55,.99,-4.54);
 // Fireplace built from irregular stones, with animated flame and warm light.
 box(root,2.05,.15,1.35,stone,-3.25,.075,-3.9);box(root,2.0,2.7,.8,stone,-3.25,1.35,-4.48);box(root,1.32,1.2,.09,material('#18231d'),-3.25,.72,-4.025);box(root,2.25,.18,1.2,dark,-3.25,1.52,-4.18);
 for(const x of [-3.98,-2.52])for(let j=0;j<4;j++){const r=mesh(root,new T.DodecahedronGeometry(.24,0),stone,x,.22+j*.33,-3.93);r.scale.set(.9,.7,.8);}
 const logs=new T.Group();logs.position.set(-3.25,.2,-3.95);root.add(logs);for(let i=0;i<3;i++){const l=cylinder(logs,.08,.105,.8,wood,(i-1)*.15,.05,0);l.rotation.z=1.4+i*.2;l.rotation.y=i*.6;}
 const flame=new T.Group();flame.position.set(-3.25,.31,-3.93);root.add(flame);for(let i=0;i<5;i++){const f=mesh(flame,new T.SphereGeometry(1,10,8),new T.MeshBasicMaterial({color:i%2?'#ecc17d':'#d77c42',transparent:true,opacity:.78}),Math.sin(i*2)*.16,.17,Math.cos(i*2)*.1);f.scale.set(.095,.25+i*.025,.085);}
 const light=new T.PointLight('#f2ad68',15,11,2);light.position.set(-3.25,1.2,-3.6);root.add(light);
 const fm=marker(root,-3.25,1.75,-3.6);colliders.push({type:'box',x:-3.25,z:-4.1,w:2.1,d:1.5});
 interactions.push({id:'fire',x:-3.25,z:-2.65,radius:1.65,label:'Nhóm bếp lửa',action(){const result=lightFire(app.state);if(result==='needs-wood')return app.toast('Cần 3 nhánh củi khô. Bạn có thể quay ra thung lũng.');if(result==='already')return app.dialog('Lửa vẫn đang cháy.','<p>Bạn đưa tay lại gần. Hơi lạnh ngoài thung lũng dần rời khỏi những đầu ngón tay.</p>');app.work(2);app.persist();app.toast('Lửa đã lên. Căn nhà bắt đầu ấm.');}});
 // Kitchen table, kettle, ceramic cup, shelf and jars.
 box(root,2.3,.13,1.1,wood,-3.8,1,0);for(const x of [-4.7,-2.9])for(const z of [-.35,.35])box(root,.1,1,.1,dark,x,.47,z);colliders.push({type:'box',x:-3.8,z:0,w:2.3,d:1.1});
 const kettle=sphere(root,.25,iron,-4.1,1.29,0);kettle.scale.y=.8;const kh=mesh(root,new T.TorusGeometry(.24,.025,8,20,Math.PI),iron,-4.1,1.44,0);cylinder(root,.085,.12,.05,iron,-4.1,1.49,0);const spout=cylinder(root,.035,.055,.24,iron,-3.87,1.33,0);spout.rotation.z=-.8;mug(root,-3.3,1.08,.05);const tm=marker(root,-3.1,1.67,0);
 interactions.push({id:'tea',x:-2.3,z:.1,radius:1.6,label:'Pha một tách trà',action(){const result=brewTea(app.state);if(result==='needs-fire')return app.toast('Nhóm bếp trước để có nước nóng.');if(result==='already')return app.dialog('Một tách trà vừa đủ.','<p>Trà vẫn còn ấm. Bạn có thể mang đến chiếc ghế bên cửa sổ.</p>');app.work(2.2);app.persist();app.toast('Trà đã pha. Đến chiếc ghế bên cửa sổ nhé.');app.audio.tap();}});
 for(let j=0;j<2;j++){box(root,.55,.08,2.3,dark,-5.14,1.7+j*.7,0);for(let i=0;i<3;i++)cylinder(root,.12,.12,.25,material(['#a69f82','#877b66','#6c7d70'][i]),-5.04,1.86+j*.7,-.7+i*.6);}
 // Armchair: curved seat and back, wooden legs. Facing the window.
 const chair=new T.Group();chair.position.set(2.65,0,-2.9);root.add(chair);const fabric=material('#697569');const seat=sphere(chair,1,fabric,0,.49,0);seat.scale.set(.56,.14,.52);const back=sphere(chair,1,fabric,0,.91,.4);back.scale.set(.56,.53,.12);for(const s of [-1,1]){const arm=sphere(chair,1,wood,s*.53,.75,0);arm.scale.set(.065,.09,.57);for(const z of [-.35,.35])cylinder(chair,.037,.04,.48,dark,s*.4,.24,z);}colliders.push({type:'box',x:2.65,z:-2.9,w:1.2,d:1.15});
 const sm=marker(root,2.65,1.68,-2.9);interactions.push({id:'rest',x:2.65,z:-1.6,radius:1.6,label:'Ngồi bên cửa sổ',action(){app.rest({x:2.65,z:-2.9,rotation:0},true);}});
 const rug=box(root,3.4,.012,2.8,material('#796b53'),1.6,.016,-.3);for(let i=0;i<7;i++)box(root,3.3,.004,.028,material('#ac9b76'),1.6,.025,-1.5+i*.4);
 box(root,1.7,.1,.8,wood,3.9,.83,1.7);for(const x of [3.25,4.55])for(const z of [1.42,1.98])box(root,.09,.8,.09,dark,x,.4,z);colliders.push({type:'box',x:3.9,z:1.7,w:1.7,d:.8});
 const paper=box(root,.42,.006,.3,material('#ddd4b5'),3.8,.888,1.7);paper.rotation.y=.12;const nm=marker(root,3.85,1.35,1.7);interactions.push({id:'letter',x:3.9,z:2.6,radius:1.7,label:'Viết điều chưa nói',action(){app.openLetter();}});
 box(root,1.3,2.45,.1,dark,0,1.225,4.98);const dm=marker(root,0,1.5,4.5);interactions.push({id:'exit',x:0,z:3.8,radius:1.6,label:'Mở cửa · Ra thung lũng',action(){app.loadChapter('valley');}});
 const welcome=marker(root,-1,1.2,2);const paper2=box(root,.34,.01,.25,material('#dbd0b4'),-1,.49,2);const stool=cylinder(root,.32,.27,.45,wood,-1,.225,2);
 interactions.push({id:'welcome',x:-1,z:2,radius:1.4,label:'Lời nhắn của chủ nhà',action(){app.dialog('Cứ ở lại.','<p>“Củi ở ngoài vườn. Trà ở trên bàn. Cửa sổ nhìn về phía núi.</p><p>Bạn không cần kể mình từ đâu đến.<br>Khi nào muốn đi thì đi.”</p>');}});
 return {id:'cabin',root,bounds:[-5.25,5.25,-4.7,4.8],colliders,interactions,spawn:{x:0,z:3.2},camera:{distance:8.9,height:7.8,targetY:.7,lookAhead:-.8},name:'Một mái nhà',number:'02',interior:true,update(dt,t){flame.visible=app.state.fire;light.intensity=app.state.fire?13+Math.sin(t*7)*1.5+Math.sin(t*11)*.7:0;flame.children.forEach((f,i)=>f.scale.y=.25+i*.025+Math.sin(t*6+i)*.06);[fm,tm,sm,nm,dm,welcome].forEach((m,i)=>{m.rotation.y=t*.5;m.position.y+=Math.sin(t*1.7+i)*dt*.035;});fm.visible=!app.state.fire;tm.visible=app.state.fire&&!app.state.tea;}};
}
