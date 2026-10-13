import {T,ground,path,forest,fogLayers,rain,log,marker,cabinExterior,box,woodMaterial,material,cylinder} from '../world.js';
import {collectWood} from '../state.js';
export function createChapter(app){
 const root=new T.Group(),colliders=[],interactions=[],items=[];ground(root);path(root);forest(root,colliders,app.state.quality);const mist=fogLayers(root),drizzle=rain(root,app.state.quality);cabinExterior(root);colliders.push({type:'box',x:0,z:-15,w:6.9,d:5.2});
 // Wooden guidepost, a small bench and the stream beyond the trees.
 const wood=woodMaterial('#80725b');cylinder(root,.075,.09,1.8,wood,3.3,.9,11);box(root,1.5,.32,.09,wood,3.3,1.6,11);const sign=marker(root,3.3,2.13,11);
 interactions.push({id:'sign',x:3.3,z:11,radius:2.2,label:'Tấm biển bên đường',action(){app.dialog('Không còn xa nữa.','<p>Qua những hàng thông, bạn sẽ thấy một căn nhà. Củi khô ở dưới những tán cây, nơi mưa chưa chạm tới.</p><p>“Nếu đến khi trời lạnh, hãy nhóm bếp trước.”</p>');}});
 const coords=[[-1.9,14],[2.1,7],[-2.3,0],[1.9,-5]];
 for(let i=0;i<coords.length;i++){const [x,z]=coords[i],id=`wood-${i+1}`;if(app.state.collected.includes(id))continue;const g=log(root,x,z,i*.9),m=marker(root,x,.7,z);const item={id,x,z,radius:1.7,label:'Nhặt nhánh củi khô',action(){if(collectWood(app.state,id)){g.visible=false;m.visible=false;item.disabled=true;app.work(1.1);app.persist();app.toast(app.state.wood===3?'Đủ củi rồi. Căn nhà đang ở phía trước.':`Đã nhặt một nhánh củi · ${app.state.wood}/3`);app.audio.tap();}}};interactions.push(item);items.push(m);}
 const door=marker(root,0,1.6,-10.7);interactions.push({id:'door',x:0,z:-10.7,radius:2.5,label:'Mở cửa · Vào căn nhà',action(){app.loadChapter('cabin');}});
 const bm=woodMaterial('#655d4a');box(root,2,.1,.55,bm,-6,.53,6);box(root,2,.65,.08,bm,-6,.85,6.23);for(const x of [-6.75,-5.25])box(root,.12,.5,.5,bm,x,.25,6);
 interactions.push({id:'bench',x:-6,z:5.2,radius:1.9,label:'Ngồi nghe thung lũng',action(){app.rest({x:-6,z:6,rotation:Math.PI},false);}});
 const water=box(root,2,.015,42,material('#7b9996',{metalness:.35,roughness:.25,transparent:true,opacity:.75}),12,.015,-2);water.rotation.y=.08;colliders.push({type:'box',x:12,z:-2,w:2.6,d:44});
 return {id:'valley',root,bounds:[-11.4,11,-11,23],colliders,interactions,spawn:app.from==='cabin'?{x:0,z:-9}:{x:0,z:20},camera:{distance:12,height:7.4,targetY:1.1,lookAhead:-2},name:'Qua màn sương',number:'01',interior:false,update(dt,t){mist(t);drizzle(dt);[...items,door,sign].forEach((m,i)=>{m.rotation.y=t*.6;m.position.y=(m===door?1.6:m===sign?2.13:.7)+Math.sin(t*1.5+i)*.055;});}};
}
