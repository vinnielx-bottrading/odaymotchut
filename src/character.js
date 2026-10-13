import * as T from '../vendor/three.module.min.js';
// Organic surfaces and a small articulated skeleton. No box primitives in the character.
export function createWanderer(){
 const root=new T.Group(), rig=new T.Group();root.add(rig);
 const mat=(c)=>new T.MeshStandardMaterial({color:c,roughness:.95});const coat=mat('#8a6951'), seam=mat('#634d3e'), pants=mat('#303b37'),boot=mat('#292d29'),skin=mat('#b38c72'),hair=mat('#35312c'),scarf=mat('#a4997e');
 function ell(parent,m,x,y,z,sx,sy,sz){const o=new T.Mesh(new T.SphereGeometry(1,16,12),m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;parent.add(o);return o;}
 function lathe(parent,m,points,x,y,z,depth=1){const o=new T.Mesh(new T.LatheGeometry(points.map(p=>new T.Vector2(...p)),20),m);o.position.set(x,y,z);o.scale.z=depth;o.castShadow=true;parent.add(o);return o;}
 lathe(rig,coat,[[.25,.73],[.29,.78],[.265,.94],[.23,1.15],[.26,1.38],[.245,1.47],[.145,1.52],[.1,1.55]],0,0,0,.74);
 // Collar, scarf, coat buttons, seam and pocket flaps.
 const collar=new T.Mesh(new T.TorusGeometry(.115,.035,8,20),scarf);collar.rotation.x=Math.PI/2;collar.position.y=1.53;rig.add(collar);
 ell(rig,scarf,-.085,1.36,-.185,.052,.19,.025);
 for(let i=0;i<4;i++)ell(rig,seam,.017,1.32-i*.12,-.195,.014,.014,.011);
 for(const s of [-1,1])ell(rig,seam,s*.19,.92,-.17,.07,.026,.016);
 const head=new T.Group();head.position.y=1.69;rig.add(head);ell(head,skin,0,0,0,.125,.164,.123);ell(head,hair,0,.078,.023,.132,.109,.122);ell(head,skin,0,-.008,-.121,.027,.037,.029);
 for(const s of [-1,1]){ell(head,skin,s*.125,-.015,.002,.021,.038,.024);ell(head,hair,s*.045,.025,-.117,.012,.007,.007);}
 // Hood resting against the neck, oval rucksack, shoulder straps.
 ell(rig,coat,0,1.42,.15,.18,.105,.08);ell(rig,seam,0,1.2,.235,.193,.245,.09);ell(rig,coat,0,1.35,.28,.175,.065,.044);
 for(const s of [-1,1])ell(rig,seam,s*.16,1.31,-.175,.022,.17,.016);
 const arms=[],legs=[];
 for(const s of [-1,1]){
  const arm=new T.Group();arm.position.set(s*.25,1.4,0);rig.add(arm);ell(arm,coat,s*.026,-.15,0,.082,.23,.088);const fore=new T.Group();fore.position.set(s*.04,-.32,0);arm.add(fore);ell(fore,coat,0,-.13,-.01,.063,.18,.068);ell(fore,skin,0,-.31,-.01,.047,.072,.044);arms.push({arm,fore});
  const leg=new T.Group();leg.position.set(s*.125,.82,0);rig.add(leg);ell(leg,pants,0,-.18,0,.097,.25,.11);const shin=new T.Group();shin.position.y=-.37;leg.add(shin);ell(shin,pants,0,-.17,0,.07,.23,.08);ell(shin,boot,0,-.35,-.06,.083,.071,.15);legs.push({leg,shin});
 }
 let phase=0;
 function update(dt,moving,t,pose='idle'){
  phase+=dt*(moving?7:1);rig.position.y=moving?Math.abs(Math.sin(phase))*.023:Math.sin(t*1.6)*.004;
  rig.rotation.z=moving?Math.sin(phase)*.018:0;head.rotation.x=pose==='work'?.2:.035;
  arms.forEach(({arm,fore},i)=>{arm.rotation.x=moving?Math.sin(phase+i*Math.PI)*.38:Math.sin(t*1.4+i)*.022;fore.rotation.x=-.08;});
  legs.forEach(({leg,shin},i)=>{leg.rotation.x=moving?Math.sin(phase+(i+1)*Math.PI)*.46:0;shin.rotation.x=moving?Math.max(0,Math.sin(phase+(i+1)*Math.PI))*.5:0;});
  if(pose==='work'){arms.forEach(({arm,fore},i)=>{arm.rotation.x=.85+Math.sin(t*3+i)*.09;fore.rotation.x=.5;});}
  if(pose==='sit'){rig.position.y=-.4;legs.forEach(({leg,shin})=>{leg.rotation.x=Math.PI/2;shin.rotation.x=-Math.PI/2;});arms.forEach(({arm,fore})=>{arm.rotation.x=.5;fore.rotation.x=.6;});}
 }
 return {root,update};
}
