import * as T from '../vendor/three.module.min.js';
export {T};
export function rng(seed=12){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
export function material(color,opts={}){return new T.MeshStandardMaterial({color,roughness:.95,...opts});}
export function mesh(parent,geometry,mat,x=0,y=0,z=0){const o=new T.Mesh(geometry,mat);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
export function box(parent,w,h,d,mat,x=0,y=0,z=0){return mesh(parent,new T.BoxGeometry(w,h,d),mat,x,y,z);}
export function sphere(parent,r,mat,x,y,z){return mesh(parent,new T.SphereGeometry(r,16,10),mat,x,y,z);}
export function cylinder(parent,r1,r2,h,mat,x,y,z){return mesh(parent,new T.CylinderGeometry(r1,r2,h,12),mat,x,y,z);}
export function canvasTexture(w,h,paint){if(typeof document==='undefined')return null;const c=document.createElement('canvas');c.width=w;c.height=h;paint(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;}
export function woodMaterial(color='#79664d'){
 const map=canvasTexture(128,256,(c,w,h)=>{const r=rng(17);c.fillStyle=color;c.fillRect(0,0,w,h);for(let i=0;i<160;i++){c.strokeStyle=r()>.5?'#00000018':'#e4d9ab18';c.lineWidth=.3+r()*2;c.beginPath();const x=r()*w;c.moveTo(x,0);c.bezierCurveTo(x+15,r()*h,x-8,r()*h,x,h);c.stroke();}});if(map){map.wrapS=map.wrapT=T.RepeatWrapping;}return material('#ffffff',{map});
}
export function ground(parent,size=68){
 const map=canvasTexture(256,256,(c,w,h)=>{const r=rng(15);c.fillStyle='#62715a';c.fillRect(0,0,w,h);for(let i=0;i<15000;i++){c.fillStyle=['#344c3c40','#99a08030','#bdba9120','#263d3930'][i%4];c.fillRect(r()*w,r()*h,1+r()*4,1+r()*4);}});if(map){map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(12,12);}
 const m=material('#b2b8a0',{map,transparent:true});m.onBeforeCompile=shader=>{shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vLocal;').replace('#include <begin_vertex>','#include <begin_vertex>\nvLocal = position;');shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vLocal;').replace('#include <opaque_fragment>','#include <opaque_fragment>\ngl_FragColor.a *= 1.0-smoothstep(24.0,34.0,max(abs(vLocal.x),abs(vLocal.y)));');};
 const o=mesh(parent,new T.PlaneGeometry(size,size),m);o.rotation.x=-Math.PI/2;o.position.y=-.02;return o;
}
export function path(parent){
 const points=[];for(let i=0;i<=70;i++){const z=25-i*.6,x=Math.sin(z*.13)*1.3;points.push([x,z]);}
 const pos=[],uv=[];for(let i=0;i<points.length-1;i++){const [x,z]=points[i],[a,b]=points[i+1],w=1.45+Math.sin(i*.6)*.1;pos.push(x-w,.006,z,x+w,.006,z,a-w,.006,b,x+w,.006,z,a+w,.006,b,a-w,.006,b);for(let j=0;j<6;j++)uv.push(j%2,i/10);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.computeVertexNormals();const m=material('#91866a',{transparent:true,opacity:.7});const p=mesh(parent,g,m);p.castShadow=false;
 const r=rng(74);const stone=new T.IcosahedronGeometry(.12,0),sm=material('#979583');const stones=new T.InstancedMesh(stone,sm,90),obj=new T.Object3D();for(let i=0;i<90;i++){const z=r()*42-17;obj.position.set(Math.sin(z*.13)*1.3+(r()-.5)*2.4,.025,z);obj.scale.set(r()+.4,.2,r()+.4);obj.rotation.y=r()*6;obj.updateMatrix();stones.setMatrixAt(i,obj.matrix);}parent.add(stones);
}
export function pineTexture(){return canvasTexture(256,512,(c,w,h)=>{
 const r=rng(22);c.clearRect(0,0,w,h);c.strokeStyle='#303f34';c.lineWidth=4;c.beginPath();c.moveTo(w/2,15);c.lineTo(w/2,h);c.stroke();
 for(let y=35;y<485;y+=7){const width=(y/512)*110*(.68+r()*.32);for(const s of [-1,1]){const x=128+s*width;c.strokeStyle=['#253d34','#33493b','#405241','#4b5c46'][Math.floor(r()*4)];c.lineWidth=2+r()*3;c.beginPath();c.moveTo(128,y-9);c.quadraticCurveTo(128+s*width*.45,y+18,x,y+8+r()*12);c.stroke();for(let k=0;k<12;k++){let t=k/12,bx=128+s*width*t,by=y+Math.sin(t*2)*14;c.beginPath();c.moveTo(bx,by);c.lineTo(bx+s*(3+r()*6),by+5+r()*16);c.stroke();}}}
});}
export function forest(parent,colliders,quality='balanced'){
 const r=rng(18),tex=pineTexture(),mat=new T.MeshStandardMaterial({map:tex,color:'#b9c5a8',transparent:false,alphaTest:.48,side:T.DoubleSide,roughness:1});const plane=new T.PlaneGeometry(1,1),trunk=material('#4e4b3d');
 const n=quality==='low'?40:68;
 for(let i=0;i<n;i++){let x=(r()-.5)*51,z=r()*53-29;if(Math.abs(x)<4.3||Math.abs(x)<8&&z<-7)continue;const h=4+r()*6,w=h*.54;const g=new T.Group();g.position.set(x,0,z);parent.add(g);for(let j=0;j<2;j++){const p=mesh(g,plane,mat,0,h/2,0);p.scale.set(w,h,1);p.rotation.y=j*Math.PI/2;p.castShadow=false;}
 cylinder(g,.075,.15,h*.6,trunk,0,h*.3,0);if(x>-14&&x<14&&z>-20&&z<23)colliders.push({type:'circle',x,z,r:.2});}
 const grassCount=quality==='low'?500:1500,gg=new T.ConeGeometry(.055,.34,3),gm=material('#778368'),grass=new T.InstancedMesh(gg,gm,grassCount),o=new T.Object3D();for(let i=0;i<grassCount;i++){const x=(r()-.5)*45,z=r()*54-28;if(Math.abs(x-Math.sin(z*.13)*1.3)<1.8||Math.abs(x)<6&&z<-9){o.position.set(0,-10,0);}else o.position.set(x,.14,z);o.scale.set(1,.5+r()*1.2,1);o.rotation.set((r()-.5)*.5,r()*6,(r()-.5)*.5);o.updateMatrix();grass.setMatrixAt(i,o.matrix);}grass.receiveShadow=true;parent.add(grass);
 const rockmat=material('#737e70');for(let i=0;i<15;i++){const x=(r()>.5?1:-1)*(4+r()*18),z=r()*45-21;const rock=mesh(parent,new T.DodecahedronGeometry(.5+r()*.6,0),rockmat,x,.25,z);rock.scale.set(1.5,.6,1);rock.rotation.set(r(),r(),r());}
}
export function fogLayers(parent){const tex=canvasTexture(128,64,(c,w,h)=>{const g=c.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);g.addColorStop(0,'#ccd2c4aa');g.addColorStop(.45,'#c3cbb955');g.addColorStop(1,'#c3cbb900');c.fillStyle=g;c.fillRect(0,0,w,h);});const layers=[];for(let i=0;i<5;i++){const m=new T.SpriteMaterial({map:tex,color:'#c1cec0',opacity:.12,depthWrite:false});const s=new T.Sprite(m);s.position.set((i-2)*11,2+i*.5,-19-i*2);s.scale.set(28,7,1);parent.add(s);layers.push(s);}return t=>layers.forEach((s,i)=>{s.position.x=(i-2)*11+Math.sin(t*.025+i)*7;});}
export function rain(parent,quality='balanced'){
 const n=quality==='low'?120:260,positions=new Float32Array(n*6),r=rng(99);for(let i=0;i<n;i++){const x=(r()-.5)*45,y=r()*16,z=(r()-.5)*50;positions.set([x,y,z,x-.035,y+.25,z],i*6);}const g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(positions,3));const line=new T.LineSegments(g,new T.LineBasicMaterial({color:'#dce2d7',transparent:true,opacity:.2,depthWrite:false}));parent.add(line);return dt=>{for(let i=0;i<n;i++){positions[i*6+1]-=dt*6;positions[i*6+4]-=dt*6;if(positions[i*6+1]<0){positions[i*6+1]=16;positions[i*6+4]=16.25;}}g.attributes.position.needsUpdate=true;};
}
export function log(parent,x,z,rot=0){const g=new T.Group();g.position.set(x,.13,z);g.rotation.y=rot;parent.add(g);const m=woodMaterial('#796751');const l=cylinder(g,.09,.12,.75,m,0,0,0);l.rotation.z=Math.PI/2;const twig=cylinder(g,.022,.045,.35,m,.18,.1,0);twig.rotation.z=-.6;return g;}
export function marker(parent,x,y,z){const g=new T.Group();g.position.set(x,y,z);const m=new T.MeshBasicMaterial({color:'#d9c28f',transparent:true,opacity:.7,depthWrite:false});const o=mesh(g,new T.OctahedronGeometry(.09),m);parent.add(g);return g;}
export function cabinExterior(parent){
 const g=new T.Group();parent.add(g);g.position.set(0,0,-15);const wood=woodMaterial('#665b49'),trim=woodMaterial('#4d483b'),roof=material('#424e49'),stone=material('#788074'),glow=material('#e2b66c',{emissive:'#d5a65b',emissiveIntensity:.75});
 box(g,7,.3,5.5,stone,0,.15,0);box(g,6.6,3.15,4.8,wood,0,1.85,0);
 for(let i=0;i<20;i++)box(g,.025,3.2,.018,trim,-3.2+i*.335,1.88,2.407);
 for(const s of [-1,1]){const r=box(g,4,.2,5.6,roof,s*1.77,4.22,0);r.rotation.z=s*-.46;}
 // Triangular gables with wood siding.
 const shape=new T.Shape();shape.moveTo(-3.45,0);shape.lineTo(0,1.65);shape.lineTo(3.45,0);shape.closePath();const gable=mesh(g,new T.ShapeGeometry(shape),wood,0,3.48,2.41);gable.material.side=T.DoubleSide;
 box(g,1.05,2.28,.12,trim,0,1.48,2.45);box(g,.92,2.12,.08,wood,0,1.47,2.53);sphere(g,.045,glow,.32,1.4,2.6);
 for(const s of [-1,1]){box(g,1.15,1.2,.08,trim,s*2,2.05,2.46);box(g,.99,1.03,.03,glow,s*2,2.05,2.515);box(g,.06,1.08,.05,trim,s*2,2.05,2.55);box(g,1.02,.06,.05,trim,s*2,2.05,2.55);box(g,1.32,.1,.25,trim,s*2,1.42,2.56);}
 box(g,.9,.8,.08,trim,0,4.06,2.46);box(g,.74,.62,.04,glow,0,4.06,2.52);box(g,.05,.65,.05,trim,0,4.06,2.56);
 box(g,7,.16,2.1,wood,0,.36,3.1);for(const s of [-1,1]){cylinder(g,.075,.08,2.8,trim,s*3.05,1.8,3.7);}const canopy=box(g,7.4,.14,2.4,roof,0,3.1,3.2);canopy.rotation.x=.12;
 box(g,2.2,.16,.45,trim,0,.15,4.26);box(g,2,.22,.4,wood,0,.22,3.9);box(g,.65,1.7,.65,stone,2,4.8,-1.3);
 const lamp=new T.PointLight('#f3c980',8,7,2);lamp.position.set(0,2.1,3);g.add(lamp);return g;
}
export function mug(parent,x,y,z){const clay=material('#b9b9a0'),tea=material('#61513b'),g=new T.Group();g.position.set(x,y,z);parent.add(g);cylinder(g,.11,.085,.18,clay,0,.09,0);cylinder(g,.096,.096,.008,tea,0,.185,0);const handle=mesh(g,new T.TorusGeometry(.07,.019,8,16),clay,.11,.11,0);return g;}
export function disposeGroup(group){const geos=new Set(),mats=new Set(),textures=new Set();group.traverse(o=>{if(o.geometry)geos.add(o.geometry);if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material]){mats.add(m);for(const v of Object.values(m))if(v?.isTexture)textures.add(v);}}});textures.forEach(t=>t.dispose());mats.forEach(m=>m.dispose());geos.forEach(g=>g.dispose());group.clear();}
