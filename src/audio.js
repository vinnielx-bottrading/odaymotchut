// Original synthesized ambience. No external audio files or autoplay.
export class Ambience{
 constructor(){this.ctx=null;this.master=null;this.enabled=false;this.interior=false;this.nodes=[];}
 async setEnabled(on){if(!on){this.enabled=false;if(this.master)this.master.gain.setTargetAtTime(0,this.ctx.currentTime,.15);return;}
 const AC=globalThis.AudioContext||globalThis.webkitAudioContext;if(!AC)return false;
 try{if(!this.ctx){this.ctx=new AC();this.master=this.ctx.createGain();this.master.gain.value=0;this.master.connect(this.ctx.destination);const buffer=this.ctx.createBuffer(1,this.ctx.sampleRate*4,this.ctx.sampleRate),d=buffer.getChannelData(0);let v=0;for(let i=0;i<d.length;i++){v=(v+(Math.random()*2-1)*.035)/1.02;d[i]=v*4;}const src=this.ctx.createBufferSource();src.buffer=buffer;src.loop=true;const filter=this.ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=1200;src.connect(filter);filter.connect(this.master);src.start();this.nodes.push(src,filter);this.filter=filter;}
 await this.ctx.resume();this.enabled=true;this.setInterior(this.interior);return true;}catch{return false;}}
 setInterior(on){this.interior=on;if(!this.ctx)return;this.filter.frequency.setTargetAtTime(on?550:1400,this.ctx.currentTime,.6);this.master.gain.setTargetAtTime(this.enabled?(on?.18:.3):0,this.ctx.currentTime,.4);}
 tap(){if(!this.enabled||!this.ctx)return;const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type='sine';o.frequency.value=170;g.gain.setValueAtTime(.025,this.ctx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,this.ctx.currentTime+.12);o.connect(g);g.connect(this.master);o.start();o.stop(this.ctx.currentTime+.13);o.onended=()=>{o.disconnect();g.disconnect();};}
}
