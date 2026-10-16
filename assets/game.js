import{t as xh,L as rt,d as Lu,p as Du,c as nn,w as Ol,i as Bl}from"./index.js";const Iu=4e3,Uu=5e3,zl=200*1024;class Nu{constructor(t,e){this.player=null,this.timer=null,this.lastCloudWrite=0,this.pending=!1,this.key=t,this.data={...e,...this.readLocal()},this.bindFlushOnHide()}readLocal(){try{const t=localStorage.getItem(this.key);return t?JSON.parse(t):{}}catch{return{}}}writeLocal(){try{localStorage.setItem(this.key,JSON.stringify(this.data))}catch{}}async attachCloud(t){this.player=t;try{const n=(await t.getData([this.key]))?.[this.key];if(n&&typeof n=="object"){const s=Number(this.data.updatedAt??0);Number(n.updatedAt??0)>=s?(this.data={...this.data,...n},this.writeLocal()):this.scheduleCloud()}else this.scheduleCloud()}catch{}}scheduleCloud(){if(!this.player)return;this.pending=!0,this.timer&&clearTimeout(this.timer);const t=Date.now()-this.lastCloudWrite,e=Math.max(Iu,Uu-t);this.timer=setTimeout(()=>void this.flushCloud(),e)}async flushCloud(){if(!(!this.player||!this.pending)){this.pending=!1,this.lastCloudWrite=Date.now();try{const t={[this.key]:this.data},e=JSON.stringify(t).length;if(e>zl){console.warn(`[yg-core] сохранение ${e} Б превышает лимит ${zl} Б`);return}await this.player.setData(t,!0)}catch{this.pending=!0}}}bindFlushOnHide(){if(typeof document>"u")return;const t=()=>{this.timer&&clearTimeout(this.timer),this.flushCloud()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&t()}),window.addEventListener("pagehide",t)}get(t){return this.data[t]}set(t,e){this.data[t]=e,this.data.updatedAt=Date.now(),this.writeLocal(),this.scheduleCloud()}patch(t){Object.assign(this.data,t),this.data.updatedAt=Date.now(),this.writeLocal(),this.scheduleCloud()}snapshot(){return this.data}}let xi=null;function Ko(){try{(!xi||!xi.isConnected)&&(xi=document.createElement("div"),xi.setAttribute("aria-hidden","true"),xi.style.cssText="position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;pointer-events:none;padding-top:env(safe-area-inset-top,0px);padding-right:env(safe-area-inset-right,0px);padding-bottom:env(safe-area-inset-bottom,0px);padding-left:env(safe-area-inset-left,0px);",document.body.appendChild(xi));const i=getComputedStyle(xi);return{top:parseFloat(i.paddingTop)||0,right:parseFloat(i.paddingRight)||0,bottom:parseFloat(i.paddingBottom)||0,left:parseFloat(i.paddingLeft)||0}}catch{return{top:0,right:0,bottom:0,left:0}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zo="185",Fu=0,Gl=1,ku=2,Us=1,Ou=2,Ls=3,fi=0,Je=1,Mn=2,$n=0,ns=1,Hl=2,Vl=3,Wl=4,Bu=5,Ei=100,zu=101,Gu=102,Hu=103,Vu=104,Wu=200,Xu=201,Yu=202,qu=203,eo=204,no=205,$u=206,Ku=207,Zu=208,Ju=209,Qu=210,ju=211,td=212,ed=213,nd=214,io=0,so=1,ro=2,os=3,ao=4,oo=5,lo=6,co=7,Jo=0,id=1,sd=2,Nn=0,_h=1,vh=2,Mh=3,yh=4,bh=5,Sh=6,ia=7,Eh=300,Pi=301,ls=302,fa=303,pa=304,sa=306,Gr=1e3,Yn=1001,ho=1002,He=1003,rd=1004,Ks=1005,$e=1006,ma=1007,Ti=1008,cn=1009,wh=1010,Th=1011,zs=1012,Qo=1013,kn=1014,bn=1015,Jn=1016,jo=1017,tl=1018,Gs=1020,Ah=35902,Rh=35899,Ch=1021,Ph=1022,Sn=1023,Qn=1026,Ai=1027,el=1028,nl=1029,Li=1030,il=1031,sl=1033,Dr=33776,Ir=33777,Ur=33778,Nr=33779,uo=35840,fo=35841,po=35842,mo=35843,go=36196,xo=37492,_o=37496,vo=37488,Mo=37489,Hr=37490,yo=37491,bo=37808,So=37809,Eo=37810,wo=37811,To=37812,Ao=37813,Ro=37814,Co=37815,Po=37816,Lo=37817,Do=37818,Io=37819,Uo=37820,No=37821,Fo=36492,ko=36494,Oo=36495,Bo=36283,zo=36284,Vr=36285,Go=36286,ad=3200,Wr=0,od=1,hi="",Le="srgb",Xr="srgb-linear",Yr="linear",ae="srgb",Fi=7680,Xl=519,ld=512,cd=513,hd=514,rl=515,ud=516,dd=517,al=518,fd=519,Ho=35044,Yl="300 es",Un=2e3,Hs=2001;function pd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function qr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function md(){const i=qr("canvas");return i.style.display="block",i}const ql={};function $r(...i){const t="THREE."+i.shift();console.log(t,...i)}function Lh(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Nt(...i){i=Lh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Jt(...i){i=Lh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function is(...i){const t=i.join(" ");t in ql||(ql[t]=!0,Nt(...i))}function gd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const xd={[io]:so,[ro]:lo,[ao]:co,[os]:oo,[so]:io,[lo]:ro,[co]:ao,[oo]:os};class Ii{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $l=1234567;const ss=Math.PI/180,Vs=180/Math.PI;function Kn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(We[i&255]+We[i>>8&255]+We[i>>16&255]+We[i>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]).toLowerCase()}function qt(i,t,e){return Math.max(t,Math.min(e,i))}function ol(i,t){return(i%t+t)%t}function _d(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function vd(i,t,e){return i!==t?(e-i)/(t-i):0}function Ns(i,t,e){return(1-e)*i+e*t}function Md(i,t,e,n){return Ns(i,t,1-Math.exp(-e*n))}function yd(i,t=1){return t-Math.abs(ol(i,t*2)-t)}function bd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Sd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Ed(i,t){return i+Math.floor(Math.random()*(t-i+1))}function wd(i,t){return i+Math.random()*(t-i)}function Td(i){return i*(.5-Math.random())}function Ad(i){i!==void 0&&($l=i);let t=$l+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Rd(i){return i*ss}function Cd(i){return i*Vs}function Pd(i){return(i&i-1)===0&&i!==0}function Ld(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Dd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Id(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),h=a((t+n)/2),u=r((t-n)/2),d=a((t-n)/2),f=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,c*u,c*d,o*l);break;case"YZY":i.set(c*d,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*d,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*h,o*l);break;default:Nt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function oe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Kr={DEG2RAD:ss,RAD2DEG:Vs,generateUUID:Kn,clamp:qt,euclideanModulo:ol,mapLinear:_d,inverseLerp:vd,lerp:Ns,damp:Md,pingpong:yd,smoothstep:bd,smootherstep:Sd,randInt:Ed,randFloat:wd,randFloatSpread:Td,seededRandom:Ad,degToRad:Rd,radToDeg:Cd,isPowerOfTwo:Pd,ceilPowerOfTwo:Ld,floorPowerOfTwo:Dd,setQuaternionFromProperEuler:Id,normalize:oe,denormalize:yn},El=class El{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};El.prototype.isVector2=!0;let It=El;class On{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(u!==v||c!==d||l!==f||h!==g){let m=c*d+l*f+h*g+u*v;m<0&&(d=-d,f=-f,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){const b=Math.acos(m),w=Math.sin(b);p=Math.sin(p*b)/w,o=Math.sin(o*b)/w,c=c*p+d*o,l=l*p+f*o,h=h*p+g*o,u=u*p+v*o}else{c=c*p+d*o,l=l*p+f*o,h=h*p+g*o,u=u*p+v*o;const b=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=b,l*=b,h*=b,u*=b}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-o*f,t[e+2]=l*g+h*f+o*d-c*u,t[e+3]=h*g-o*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:Nt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const wl=class wl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ga.copy(this).projectOnVector(t),this.sub(ga)}reflect(t){return this.sub(ga.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};wl.prototype.isVector3=!0;let R=wl;const ga=new R,Kl=new On,Tl=class Tl{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=s[0],m=s[3],p=s[6],b=s[1],w=s[4],M=s[7],T=s[2],S=s[5],L=s[8];return r[0]=a*v+o*b+c*T,r[3]=a*m+o*w+c*S,r[6]=a*p+o*M+c*L,r[1]=l*v+h*b+u*T,r[4]=l*m+h*w+u*S,r[7]=l*p+h*M+u*L,r[2]=d*v+f*b+g*T,r[5]=d*m+f*w+g*S,r[8]=d*p+f*M+g*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=d*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-o*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return is("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xa.makeScale(t,e)),this}rotate(t){return is("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xa.makeRotation(-t)),this}translate(t,e){return is("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Tl.prototype.isMatrix3=!0;let Ot=Tl;const xa=new Ot,Zl=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jl=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ud(){const i={enabled:!0,workingColorSpace:Xr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ae&&(s.r=Zn(s.r),s.g=Zn(s.g),s.b=Zn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ae&&(s.r=rs(s.r),s.g=rs(s.g),s.b=rs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===hi?Yr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return is("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return is("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Xr]:{primaries:t,whitePoint:n,transfer:Yr,toXYZ:Zl,fromXYZ:Jl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:n,transfer:ae,toXYZ:Zl,fromXYZ:Jl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),i}const Kt=Ud();function Zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function rs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ki;class Nd{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ki===void 0&&(ki=qr("canvas")),ki.width=t.width,ki.height=t.height;const s=ki.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ki}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=qr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Zn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Zn(e[n]/255)*255):e[n]=Zn(e[n]);return{data:e,width:t.width,height:t.height}}else return Nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Fd=0;class ll{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(_a(s[a].image)):r.push(_a(s[a]))}else r=_a(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function _a(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Nd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Nt("Texture: Unable to serialize Texture."),{})}let kd=0;const va=new R;class Qe extends Ii{constructor(t=Qe.DEFAULT_IMAGE,e=Qe.DEFAULT_MAPPING,n=Yn,s=Yn,r=$e,a=Ti,o=Sn,c=cn,l=Qe.DEFAULT_ANISOTROPY,h=hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=Kn(),this.name="",this.source=new ll(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(va).x}get height(){return this.source.getSize(va).y}get depth(){return this.source.getSize(va).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Nt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Nt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Eh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Gr:t.x=t.x-Math.floor(t.x);break;case Yn:t.x=t.x<0?0:1;break;case ho:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Gr:t.y=t.y-Math.floor(t.y);break;case Yn:t.y=t.y<0?0:1;break;case ho:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=Eh;Qe.DEFAULT_ANISOTROPY=1;const Al=class Al{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(l+1)/2,M=(f+1)/2,T=(p+1)/2,S=(h+d)/4,L=(u+v)/4,_=(g+m)/4;return w>M&&w>T?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=S/n,r=L/n):M>T?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=S/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=L/r,s=_/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-v)/b,this.z=(d-h)/b,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Al.prototype.isVector4=!0;let be=Al;class Od extends Ii{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new Qe(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:$e,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new ll(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends Od{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Dh extends Qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bd extends Qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ea=class ea{constructor(t,e,n,s,r,a,o,c,l,h,u,d,f,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,u,d,f,g,v,m)}set(t,e,n,s,r,a,o,c,l,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ea().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Oi.setFromMatrixColumn(t,0).length(),r=1/Oi.setFromMatrixColumn(t,1).length(),a=1/Oi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,f=a*u,g=o*h,v=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-v*l,e[9]=-o*c,e[2]=v-d*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,v=l*u;e[0]=d+v*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=v+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,v=l*u;e[0]=d-v*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*h,f=a*u,g=o*h,v=o*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+v,e[1]=c*u,e[5]=v*l+d,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,g=o*c,v=o*l;e[0]=c*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*c,f=a*l,g=o*c,v=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+v,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zd,t,Gd)}lookAt(t,e,n){const s=this.elements;return on.subVectors(t,e),on.lengthSq()===0&&(on.z=1),on.normalize(),si.crossVectors(n,on),si.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),si.crossVectors(n,on)),si.normalize(),Zs.crossVectors(on,si),s[0]=si.x,s[4]=Zs.x,s[8]=on.x,s[1]=si.y,s[5]=Zs.y,s[9]=on.y,s[2]=si.z,s[6]=Zs.z,s[10]=on.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],b=n[3],w=n[7],M=n[11],T=n[15],S=s[0],L=s[4],_=s[8],E=s[12],D=s[1],U=s[5],P=s[9],J=s[13],$=s[2],z=s[6],Z=s[10],X=s[14],nt=s[3],st=s[7],ut=s[11],dt=s[15];return r[0]=a*S+o*D+c*$+l*nt,r[4]=a*L+o*U+c*z+l*st,r[8]=a*_+o*P+c*Z+l*ut,r[12]=a*E+o*J+c*X+l*dt,r[1]=h*S+u*D+d*$+f*nt,r[5]=h*L+u*U+d*z+f*st,r[9]=h*_+u*P+d*Z+f*ut,r[13]=h*E+u*J+d*X+f*dt,r[2]=g*S+v*D+m*$+p*nt,r[6]=g*L+v*U+m*z+p*st,r[10]=g*_+v*P+m*Z+p*ut,r[14]=g*E+v*J+m*X+p*dt,r[3]=b*S+w*D+M*$+T*nt,r[7]=b*L+w*U+M*z+T*st,r[11]=b*_+w*P+M*Z+T*ut,r[15]=b*E+w*J+M*X+T*dt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15],b=c*f-l*d,w=o*f-l*u,M=o*d-c*u,T=a*f-l*h,S=a*d-c*h,L=a*u-o*h;return e*(v*b-m*w+p*M)-n*(g*b-m*T+p*S)+s*(g*w-v*T+p*L)-r*(g*M-v*S+m*L)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],b=e*o-n*a,w=e*c-s*a,M=e*l-r*a,T=n*c-s*o,S=n*l-r*o,L=s*l-r*c,_=h*v-u*g,E=h*m-d*g,D=h*p-f*g,U=u*m-d*v,P=u*p-f*v,J=d*p-f*m,$=b*J-w*P+M*U+T*D-S*E+L*_;if($===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/$;return t[0]=(o*J-c*P+l*U)*z,t[1]=(s*P-n*J-r*U)*z,t[2]=(v*L-m*S+p*T)*z,t[3]=(d*S-u*L-f*T)*z,t[4]=(c*D-a*J-l*E)*z,t[5]=(e*J-s*D+r*E)*z,t[6]=(m*M-g*L-p*w)*z,t[7]=(h*L-d*M+f*w)*z,t[8]=(a*P-o*D+l*_)*z,t[9]=(n*D-e*P-r*_)*z,t[10]=(g*S-v*M+p*b)*z,t[11]=(u*M-h*S-f*b)*z,t[12]=(o*E-a*U-c*_)*z,t[13]=(e*U-n*E+s*_)*z,t[14]=(v*w-g*T-m*b)*z,t[15]=(h*T-u*w+d*b)*z,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,g=r*u,v=a*h,m=a*u,p=o*u,b=c*l,w=c*h,M=c*u,T=n.x,S=n.y,L=n.z;return s[0]=(1-(v+p))*T,s[1]=(f+M)*T,s[2]=(g-w)*T,s[3]=0,s[4]=(f-M)*S,s[5]=(1-(d+p))*S,s[6]=(m+b)*S,s[7]=0,s[8]=(g+w)*L,s[9]=(m-b)*L,s[10]=(1-(d+v))*L,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Oi.set(s[0],s[1],s[2]).length();const o=Oi.set(s[4],s[5],s[6]).length(),c=Oi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),xn.copy(this);const l=1/a,h=1/o,u=1/c;return xn.elements[0]*=l,xn.elements[1]*=l,xn.elements[2]*=l,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,e.setFromRotationMatrix(xn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=Un,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let g,v;if(c)g=r/(a-r),v=a*r/(a-r);else if(o===Un)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Hs)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Un,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let g,v;if(c)g=1/(a-r),v=a/(a-r);else if(o===Un)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Hs)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};ea.prototype.isMatrix4=!0;let ie=ea;const Oi=new R,xn=new ie,zd=new R(0,0,0),Gd=new R(1,1,1),si=new R,Zs=new R,on=new R,Ql=new ie,jl=new On;class wn{constructor(t=0,e=0,n=0,s=wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ql.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ql,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jl.setFromEuler(this),this.setFromQuaternion(jl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wn.DEFAULT_ORDER="XYZ";class Ih{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Hd=0;const tc=new R,Bi=new On,Bn=new ie,Js=new R,gs=new R,Vd=new R,Wd=new On,ec=new R(1,0,0),nc=new R(0,1,0),ic=new R(0,0,1),sc={type:"added"},Xd={type:"removed"},zi={type:"childadded",child:null},Ma={type:"childremoved",child:null};class Fe extends Ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Fe.DEFAULT_UP.clone();const t=new R,e=new wn,n=new On,s=new R(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new Ot}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=Fe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ih,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.multiply(Bi),this}rotateOnWorldAxis(t,e){return Bi.setFromAxisAngle(t,e),this.quaternion.premultiply(Bi),this}rotateX(t){return this.rotateOnAxis(ec,t)}rotateY(t){return this.rotateOnAxis(nc,t)}rotateZ(t){return this.rotateOnAxis(ic,t)}translateOnAxis(t,e){return tc.copy(t).applyQuaternion(this.quaternion),this.position.add(tc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ec,t)}translateY(t){return this.translateOnAxis(nc,t)}translateZ(t){return this.translateOnAxis(ic,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Js.copy(t):Js.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(gs,Js,this.up):Bn.lookAt(Js,gs,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),Bi.setFromRotationMatrix(Bn),this.quaternion.premultiply(Bi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(sc),zi.child=t,this.dispatchEvent(zi),zi.child=null):Jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xd),Ma.child=t,this.dispatchEvent(Ma),Ma.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(sc),zi.child=t,this.dispatchEvent(zi),zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,t,Vd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gs,Wd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Fe.DEFAULT_UP=new R(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ae extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yd={type:"move"};class ya{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Yd)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ae;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Uh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},Qs={h:0,s:0,l:0};function ba(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Kt.workingColorSpace){if(t=ol(t,1),e=qt(e,0,1),n=qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ba(a,r,t+1/3),this.g=ba(a,r,t),this.b=ba(a,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,e=Le){function n(r){r!==void 0&&parseFloat(r)<1&&Nt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Nt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Nt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){const n=Uh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Nt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Zn(t.r),this.g=Zn(t.g),this.b=Zn(t.b),this}copyLinearToSRGB(t){return this.r=rs(t.r),this.g=rs(t.g),this.b=rs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return Kt.workingToColorSpace(Xe.copy(this),t),Math.round(qt(Xe.r*255,0,255))*65536+Math.round(qt(Xe.g*255,0,255))*256+Math.round(qt(Xe.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(Xe.copy(this),e);const n=Xe.r,s=Xe.g,r=Xe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=Le){Kt.workingToColorSpace(Xe.copy(this),t);const e=Xe.r,n=Xe.g,s=Xe.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ri),this.setHSL(ri.h+t,ri.s+e,ri.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ri),t.getHSL(Qs);const n=Ns(ri.h,Qs.h,e),s=Ns(ri.s,Qs.s,e),r=Ns(ri.l,Qs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xe=new zt;zt.NAMES=Uh;class cl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new zt(t),this.near=e,this.far=n}clone(){return new cl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class hl extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const _n=new R,zn=new R,Sa=new R,Gn=new R,Gi=new R,Hi=new R,rc=new R,Ea=new R,wa=new R,Ta=new R,Aa=new be,Ra=new be,Ca=new be;class hn{constructor(t=new R,e=new R,n=new R){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),_n.subVectors(t,e),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){_n.subVectors(s,e),zn.subVectors(n,e),Sa.subVectors(t,e);const a=_n.dot(_n),o=_n.dot(zn),c=_n.dot(Sa),l=zn.dot(zn),h=zn.dot(Sa),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Gn.x),c.addScaledVector(a,Gn.y),c.addScaledVector(o,Gn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Aa.setScalar(0),Ra.setScalar(0),Ca.setScalar(0),Aa.fromBufferAttribute(t,e),Ra.fromBufferAttribute(t,n),Ca.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Aa,r.x),a.addScaledVector(Ra,r.y),a.addScaledVector(Ca,r.z),a}static isFrontFacing(t,e,n,s){return _n.subVectors(n,e),zn.subVectors(t,e),_n.cross(zn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _n.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),_n.cross(zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Gi.subVectors(s,n),Hi.subVectors(r,n),Ea.subVectors(t,n);const c=Gi.dot(Ea),l=Hi.dot(Ea);if(c<=0&&l<=0)return e.copy(n);wa.subVectors(t,s);const h=Gi.dot(wa),u=Hi.dot(wa);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Gi,a);Ta.subVectors(t,r);const f=Gi.dot(Ta),g=Hi.dot(Ta);if(g>=0&&f<=g)return e.copy(r);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Hi,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return rc.subVectors(r,s),o=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(rc,o);const p=1/(m+v+d);return a=v*p,o=d*p,e.copy(n).addScaledVector(Gi,a).addScaledVector(Hi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class ze{constructor(t=new R(1/0,1/0,1/0),e=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,vn):vn.fromBufferAttribute(r,a),vn.applyMatrix4(t.matrixWorld),this.expandByPoint(vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),js.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),js.copy(n.boundingBox)),js.applyMatrix4(t.matrixWorld),this.union(js)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,vn),vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(xs),tr.subVectors(this.max,xs),Vi.subVectors(t.a,xs),Wi.subVectors(t.b,xs),Xi.subVectors(t.c,xs),ai.subVectors(Wi,Vi),oi.subVectors(Xi,Wi),_i.subVectors(Vi,Xi);let e=[0,-ai.z,ai.y,0,-oi.z,oi.y,0,-_i.z,_i.y,ai.z,0,-ai.x,oi.z,0,-oi.x,_i.z,0,-_i.x,-ai.y,ai.x,0,-oi.y,oi.x,0,-_i.y,_i.x,0];return!Pa(e,Vi,Wi,Xi,tr)||(e=[1,0,0,0,1,0,0,0,1],!Pa(e,Vi,Wi,Xi,tr))?!1:(er.crossVectors(ai,oi),e=[er.x,er.y,er.z],Pa(e,Vi,Wi,Xi,tr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Hn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Hn=[new R,new R,new R,new R,new R,new R,new R,new R],vn=new R,js=new ze,Vi=new R,Wi=new R,Xi=new R,ai=new R,oi=new R,_i=new R,xs=new R,tr=new R,er=new R,vi=new R;function Pa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){vi.fromArray(i,r);const o=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),c=t.dot(vi),l=e.dot(vi),h=n.dot(vi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Ue=new R,nr=new It;let qd=0;class un extends Ii{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ho,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)nr.fromBufferAttribute(this,e),nr.applyMatrix3(t),this.setXY(e,nr.x,nr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=oe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=yn(e,this.array)),e}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=yn(e,this.array)),e}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=yn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=yn(e,this.array)),e}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array),r=oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ho&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Nh extends un{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Fh extends un{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class fe extends un{constructor(t,e,n){super(new Float32Array(t),e,n)}}const $d=new ze,_s=new R,La=new R;class fs{constructor(t=new R,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):$d.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;_s.subVectors(t,this.center);const e=_s.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(_s,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(La.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(_s.copy(t.center).add(La)),this.expandByPoint(_s.copy(t.center).sub(La))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Kd=0;const fn=new ie,Da=new Fe,Yi=new R,ln=new ze,vs=new ze,Be=new R;class Ge extends Ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kd++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pd(t)?Fh:Nh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,n){return fn.makeTranslation(t,e,n),this.applyMatrix4(fn),this}scale(t,e,n){return fn.makeScale(t,e,n),this.applyMatrix4(fn),this}lookAt(t){return Da.lookAt(t),Da.updateMatrix(),this.applyMatrix4(Da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new fe(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ze);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];ln.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(t){const n=this.boundingSphere.center;if(ln.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];vs.setFromBufferAttribute(o),this.morphTargetsRelative?(Be.addVectors(ln.min,vs.min),ln.expandByPoint(Be),Be.addVectors(ln.max,vs.max),ln.expandByPoint(Be)):(ln.expandByPoint(vs.min),ln.expandByPoint(vs.max))}ln.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Be.fromBufferAttribute(o,l),c&&(Yi.fromBufferAttribute(t,l),Be.add(Yi)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new un(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let _=0;_<n.count;_++)o[_]=new R,c[_]=new R;const l=new R,h=new R,u=new R,d=new It,f=new It,g=new It,v=new R,m=new R;function p(_,E,D){l.fromBufferAttribute(n,_),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,D),d.fromBufferAttribute(r,_),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,D),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const U=1/(f.x*g.y-g.x*f.y);isFinite(U)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(U),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(U),o[_].add(v),o[E].add(v),o[D].add(v),c[_].add(m),c[E].add(m),c[D].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let _=0,E=b.length;_<E;++_){const D=b[_],U=D.start,P=D.count;for(let J=U,$=U+P;J<$;J+=3)p(t.getX(J+0),t.getX(J+1),t.getX(J+2))}const w=new R,M=new R,T=new R,S=new R;function L(_){T.fromBufferAttribute(s,_),S.copy(T);const E=o[_];w.copy(E),w.sub(T.multiplyScalar(T.dot(E))).normalize(),M.crossVectors(S,E);const U=M.dot(c[_])<0?-1:1;a.setXYZW(_,w.x,w.y,w.z,U)}for(let _=0,E=b.length;_<E;++_){const D=b[_],U=D.start,P=D.count;for(let J=U,$=U+P;J<$;J+=3)L(t.getX(J+0)),L(t.getX(J+1)),L(t.getX(J+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new R,r=new R,a=new R,o=new R,c=new R,l=new R,h=new R,u=new R;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?f=c[v]*o.data.stride+o.offset:f=c[v]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new un(d,h,u)}if(this.index===null)return Nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ge,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zd{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ho,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const je=new R;class Zr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=oe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=oe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=yn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=yn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=yn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=yn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=oe(e,this.array),n=oe(n,this.array),s=oe(s,this.array),r=oe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){$r("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new un(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Zr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){$r("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Jd=0;class pi extends Ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=Kn(),this.name="",this.type="Material",this.blending=ns,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=eo,this.blendDst=no,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Nt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Nt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ns&&(n.blending=this.blending),this.side!==fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==eo&&(n.blendSrc=this.blendSrc),this.blendDst!==no&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new zt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new It().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new It().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ra extends pi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let qi;const Ms=new R,$i=new R,Ki=new R,Zi=new It,ys=new It,kh=new ie,ir=new R,bs=new R,sr=new R,ac=new It,Ia=new It,oc=new It;class ul extends Fe{constructor(t=new ra){if(super(),this.isSprite=!0,this.type="Sprite",qi===void 0){qi=new Ge;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Zd(e,5);qi.setIndex([0,1,2,0,2,3]),qi.setAttribute("position",new Zr(n,3,0,!1)),qi.setAttribute("uv",new Zr(n,2,3,!1))}this.geometry=qi,this.material=t,this.center=new It(.5,.5),this.count=1}raycast(t,e){t.camera===null&&Jt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),$i.setFromMatrixScale(this.matrixWorld),kh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ki.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&$i.multiplyScalar(-Ki.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;rr(ir.set(-.5,-.5,0),Ki,a,$i,s,r),rr(bs.set(.5,-.5,0),Ki,a,$i,s,r),rr(sr.set(.5,.5,0),Ki,a,$i,s,r),ac.set(0,0),Ia.set(1,0),oc.set(1,1);let o=t.ray.intersectTriangle(ir,bs,sr,!1,Ms);if(o===null&&(rr(bs.set(-.5,.5,0),Ki,a,$i,s,r),Ia.set(0,1),o=t.ray.intersectTriangle(ir,sr,bs,!1,Ms),o===null))return;const c=t.ray.origin.distanceTo(Ms);c<t.near||c>t.far||e.push({distance:c,point:Ms.clone(),uv:hn.getInterpolation(Ms,ir,bs,sr,ac,Ia,oc,new It),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function rr(i,t,e,n,s,r){Zi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(ys.x=r*Zi.x-s*Zi.y,ys.y=s*Zi.x+r*Zi.y):ys.copy(Zi),i.copy(t),i.x+=ys.x,i.y+=ys.y,i.applyMatrix4(kh)}const Vn=new R,Ua=new R,ar=new R,li=new R,Na=new R,or=new R,Fa=new R;class Oh{constructor(t=new R,e=new R(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Vn.copy(this.origin).addScaledVector(this.direction,e),Vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ua.copy(t).add(e).multiplyScalar(.5),ar.copy(e).sub(t).normalize(),li.copy(this.origin).sub(Ua);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ar),o=li.dot(this.direction),c=-li.dot(ar),l=li.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ua).addScaledVector(ar,d),f}intersectSphere(t,e){Vn.subVectors(t.center,this.origin);const n=Vn.dot(this.direction),s=Vn.dot(Vn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Vn)!==null}intersectTriangle(t,e,n,s,r){Na.subVectors(e,t),or.subVectors(n,t),Fa.crossVectors(Na,or);let a=this.direction.dot(Fa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;li.subVectors(this.origin,t);const c=o*this.direction.dot(or.crossVectors(li,or));if(c<0)return null;const l=o*this.direction.dot(Na.cross(li));if(l<0||c+l>a)return null;const h=-o*li.dot(Fa);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ps extends pi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Jo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const lc=new ie,Mi=new Oh,lr=new fs,cc=new R,cr=new R,hr=new R,ur=new R,ka=new R,dr=new R,hc=new R,fr=new R;class ne extends Fe{constructor(t=new Ge,e=new ps){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){dr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(ka.fromBufferAttribute(u,t),a?dr.addScaledVector(ka,h):dr.addScaledVector(ka.sub(e),h))}e.add(dr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(r),Mi.copy(t.ray).recast(t.near),!(lr.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(lr,cc)===null||Mi.origin.distanceToSquared(cc)>(t.far-t.near)**2))&&(lc.copy(r).invert(),Mi.copy(t.ray).applyMatrix4(lc),!(n.boundingBox!==null&&Mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Mi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,T=w;M<T;M+=3){const S=o.getX(M),L=o.getX(M+1),_=o.getX(M+2);s=pr(this,p,t,n,l,h,u,S,L,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const b=o.getX(m),w=o.getX(m+1),M=o.getX(m+2);s=pr(this,a,t,n,l,h,u,b,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),w=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,T=w;M<T;M+=3){const S=M,L=M+1,_=M+2;s=pr(this,p,t,n,l,h,u,S,L,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const b=m,w=m+1,M=m+2;s=pr(this,a,t,n,l,h,u,b,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Qd(i,t,e,n,s,r,a,o){let c;if(t.side===Je?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===fi,o),c===null)return null;fr.copy(o),fr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(fr);return l<e.near||l>e.far?null:{distance:l,point:fr.clone(),object:i}}function pr(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,cr),i.getVertexPosition(c,hr),i.getVertexPosition(l,ur);const h=Qd(i,t,e,n,cr,hr,ur,hc);if(h){const u=new R;hn.getBarycoord(hc,cr,hr,ur,u),s&&(h.uv=hn.getInterpolatedAttribute(s,o,c,l,u,new It)),r&&(h.uv1=hn.getInterpolatedAttribute(r,o,c,l,u,new It)),a&&(h.normal=hn.getInterpolatedAttribute(a,o,c,l,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new R,materialIndex:0};hn.getNormal(cr,hr,ur,d.normal),h.face=d,h.barycoord=u}return h}class Bh extends Qe{constructor(t=null,e=1,n=1,s,r,a,o,c,l=He,h=He,u,d){super(null,a,o,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vo extends un{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ji=new ie,uc=new ie,mr=[],dc=new ze,jd=new ie,Ss=new ne,Es=new fs;class aa extends ne{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Vo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ze),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ji),dc.copy(t.boundingBox).applyMatrix4(Ji),this.boundingBox.union(dc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new fs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ji),Es.copy(t.boundingSphere).applyMatrix4(Ji),this.boundingSphere.union(Es)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ss.geometry=this.geometry,Ss.material=this.material,Ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Es.copy(this.boundingSphere),Es.applyMatrix4(n),t.ray.intersectsSphere(Es)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ji),uc.multiplyMatrices(n,Ji),Ss.matrixWorld=uc,Ss.raycast(t,mr);for(let a=0,o=mr.length;a<o;a++){const c=mr[a];c.instanceId=r,c.object=this,e.push(c)}mr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Vo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Bh(new Float32Array(s*this.count),s,this.count,el,bn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Oa=new R,tf=new R,ef=new Ot;class Si{constructor(t=new R(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Oa.subVectors(n,e).cross(tf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Oa),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||ef.getNormalMatrix(t),s=this.coplanarPoint(Oa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yi=new fs,nf=new It(.5,.5),gr=new R;class dl{constructor(t=new Si,e=new Si,n=new Si,s=new Si,r=new Si,a=new Si){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Un,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],b=r[12],w=r[13],M=r[14],T=r[15];if(s[0].setComponents(l-a,f-h,p-g,T-b).normalize(),s[1].setComponents(l+a,f+h,p+g,T+b).normalize(),s[2].setComponents(l+o,f+u,p+v,T+w).normalize(),s[3].setComponents(l-o,f-u,p-v,T-w).normalize(),n)s[4].setComponents(c,d,m,M).normalize(),s[5].setComponents(l-c,f-d,p-m,T-M).normalize();else if(s[4].setComponents(l-c,f-d,p-m,T-M).normalize(),e===Un)s[5].setComponents(l+c,f+d,p+m,T+M).normalize();else if(e===Hs)s[5].setComponents(c,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(t){yi.center.set(0,0,0);const e=nf.distanceTo(t.center);return yi.radius=.7071067811865476+e,yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(gr.x=s.normal.x>0?t.max.x:t.min.x,gr.y=s.normal.y>0?t.max.y:t.min.y,gr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(gr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fl extends pi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Jr=new R,Qr=new R,fc=new ie,ws=new Oh,xr=new fs,Ba=new R,pc=new R;class sf extends Fe{constructor(t=new Ge,e=new fl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Jr.fromBufferAttribute(e,s-1),Qr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Jr.distanceTo(Qr);t.setAttribute("lineDistance",new fe(n,1))}else Nt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(s),xr.radius+=r,t.ray.intersectsSphere(xr)===!1)return;fc.copy(s).invert(),ws.copy(t.ray).applyMatrix4(fc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=l){const p=h.getX(v),b=h.getX(v+1),w=_r(this,t,ws,c,p,b,v);w&&e.push(w)}if(this.isLineLoop){const v=h.getX(g-1),m=h.getX(f),p=_r(this,t,ws,c,v,m,g-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=f,m=g-1;v<m;v+=l){const p=_r(this,t,ws,c,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=_r(this,t,ws,c,g-1,f,g-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function _r(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Jr.fromBufferAttribute(o,s),Qr.fromBufferAttribute(o,r),e.distanceSqToSegment(Jr,Qr,Ba,pc)>n)return;Ba.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ba);if(!(l<t.near||l>t.far))return{distance:l,point:pc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const mc=new R,gc=new R;class zh extends sf{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)mc.fromBufferAttribute(e,s),gc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+mc.distanceTo(gc);t.setAttribute("lineDistance",new fe(n,1))}else Nt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Gh extends Qe{constructor(t=[],e=Pi,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class mi extends Qe{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class cs extends Qe{constructor(t,e,n=kn,s,r,a,o=He,c=He,l,h=Qn,u=1){if(h!==Qn&&h!==Ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ll(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class rf extends cs{constructor(t,e=kn,n=Pi,s,r,a=He,o=He,c,l=Qn){const h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Hh extends Qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class An extends Ge{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new fe(l,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(u,2));function g(v,m,p,b,w,M,T,S,L,_,E){const D=M/L,U=T/_,P=M/2,J=T/2,$=S/2,z=L+1,Z=_+1;let X=0,nt=0;const st=new R;for(let ut=0;ut<Z;ut++){const dt=ut*U-J;for(let St=0;St<z;St++){const Wt=St*D-P;st[v]=Wt*b,st[m]=dt*w,st[p]=$,l.push(st.x,st.y,st.z),st[v]=0,st[m]=0,st[p]=S>0?1:-1,h.push(st.x,st.y,st.z),u.push(St/L),u.push(1-ut/_),X+=1}}for(let ut=0;ut<_;ut++)for(let dt=0;dt<L;dt++){const St=d+dt+z*ut,Wt=d+dt+z*(ut+1),re=d+(dt+1)+z*(ut+1),$t=d+(dt+1)+z*ut;c.push(St,Wt,$t),c.push(Wt,re,$t),nt+=6}o.addGroup(f,nt,E),f+=nt,d+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new An(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class oa extends Ge{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new R,h=new It;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new fe(a,3)),this.setAttribute("normal",new fe(o,3)),this.setAttribute("uv",new fe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oa(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Di extends Ge{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;b(),a===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new fe(u,3)),this.setAttribute("normal",new fe(d,3)),this.setAttribute("uv",new fe(f,2));function b(){const M=new R,T=new R;let S=0;const L=(e-t)/n;for(let _=0;_<=r;_++){const E=[],D=_/r,U=D*(e-t)+t;for(let P=0;P<=s;P++){const J=P/s,$=J*c+o,z=Math.sin($),Z=Math.cos($);T.x=U*z,T.y=-D*n+m,T.z=U*Z,u.push(T.x,T.y,T.z),M.set(z,L,Z).normalize(),d.push(M.x,M.y,M.z),f.push(J,1-D),E.push(g++)}v.push(E)}for(let _=0;_<s;_++)for(let E=0;E<r;E++){const D=v[E][_],U=v[E+1][_],P=v[E+1][_+1],J=v[E][_+1];(t>0||E!==0)&&(h.push(D,U,J),S+=3),(e>0||E!==r-1)&&(h.push(U,P,J),S+=3)}l.addGroup(p,S,0),p+=S}function w(M){const T=g,S=new It,L=new R;let _=0;const E=M===!0?t:e,D=M===!0?1:-1;for(let P=1;P<=s;P++)u.push(0,m*D,0),d.push(0,D,0),f.push(.5,.5),g++;const U=g;for(let P=0;P<=s;P++){const $=P/s*c+o,z=Math.cos($),Z=Math.sin($);L.x=E*Z,L.y=m*D,L.z=E*z,u.push(L.x,L.y,L.z),d.push(0,D,0),S.x=z*.5+.5,S.y=Z*.5*D+.5,f.push(S.x,S.y),g++}for(let P=0;P<s;P++){const J=T+P,$=U+P;M===!0?h.push($,$+1,J):h.push($+1,$,J),_+=3}l.addGroup(p,_,M===!0?1:2),p+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Di(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class pl extends Di{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new pl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ml extends Ge{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),l(n),h(),this.setAttribute("position",new fe(r,3)),this.setAttribute("normal",new fe(r.slice(),3)),this.setAttribute("uv",new fe(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const w=new R,M=new R,T=new R;for(let S=0;S<e.length;S+=3)f(e[S+0],w),f(e[S+1],M),f(e[S+2],T),c(w,M,T,b)}function c(b,w,M,T){const S=T+1,L=[];for(let _=0;_<=S;_++){L[_]=[];const E=b.clone().lerp(M,_/S),D=w.clone().lerp(M,_/S),U=S-_;for(let P=0;P<=U;P++)P===0&&_===S?L[_][P]=E:L[_][P]=E.clone().lerp(D,P/U)}for(let _=0;_<S;_++)for(let E=0;E<2*(S-_)-1;E++){const D=Math.floor(E/2);E%2===0?(d(L[_][D+1]),d(L[_+1][D]),d(L[_][D])):(d(L[_][D+1]),d(L[_+1][D+1]),d(L[_+1][D]))}}function l(b){const w=new R;for(let M=0;M<r.length;M+=3)w.x=r[M+0],w.y=r[M+1],w.z=r[M+2],w.normalize().multiplyScalar(b),r[M+0]=w.x,r[M+1]=w.y,r[M+2]=w.z}function h(){const b=new R;for(let w=0;w<r.length;w+=3){b.x=r[w+0],b.y=r[w+1],b.z=r[w+2];const M=m(b)/2/Math.PI+.5,T=p(b)/Math.PI+.5;a.push(M,1-T)}g(),u()}function u(){for(let b=0;b<a.length;b+=6){const w=a[b+0],M=a[b+2],T=a[b+4],S=Math.max(w,M,T),L=Math.min(w,M,T);S>.9&&L<.1&&(w<.2&&(a[b+0]+=1),M<.2&&(a[b+2]+=1),T<.2&&(a[b+4]+=1))}}function d(b){r.push(b.x,b.y,b.z)}function f(b,w){const M=b*3;w.x=t[M+0],w.y=t[M+1],w.z=t[M+2]}function g(){const b=new R,w=new R,M=new R,T=new R,S=new It,L=new It,_=new It;for(let E=0,D=0;E<r.length;E+=9,D+=6){b.set(r[E+0],r[E+1],r[E+2]),w.set(r[E+3],r[E+4],r[E+5]),M.set(r[E+6],r[E+7],r[E+8]),S.set(a[D+0],a[D+1]),L.set(a[D+2],a[D+3]),_.set(a[D+4],a[D+5]),T.copy(b).add(w).add(M).divideScalar(3);const U=m(T);v(S,D+0,b,U),v(L,D+2,w,U),v(_,D+4,M,U)}}function v(b,w,M,T){T<0&&b.x===1&&(a[w]=b.x-1),M.x===0&&M.z===0&&(a[w]=T/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ml(t.vertices,t.indices,t.radius,t.detail)}}const vr=new R,Mr=new R,za=new R,yr=new hn;class Vh extends Ge{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ss*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:v,b:m,c:p}=yr;if(v.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),yr.getNormal(za),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let b=0;b<3;b++){const w=(b+1)%3,M=u[b],T=u[w],S=yr[h[b]],L=yr[h[w]],_=`${M}_${T}`,E=`${T}_${M}`;E in d&&d[E]?(za.dot(d[E].normal)<=r&&(f.push(S.x,S.y,S.z),f.push(L.x,L.y,L.z)),d[E]=null):_ in d||(d[_]={index0:l[b],index1:l[w],normal:za.clone()})}}for(const g in d)if(d[g]){const{index0:v,index1:m}=d[g];vr.fromBufferAttribute(o,v),Mr.fromBufferAttribute(o,m),f.push(vr.x,vr.y,vr.z),f.push(Mr.x,Mr.y,Mr.z)}this.setAttribute("position",new fe(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class gl extends ml{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new gl(t.radius,t.detail)}}class xl extends Ge{constructor(t=[new It(0,-.5),new It(.5,0),new It(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=qt(s,0,Math.PI*2);const r=[],a=[],o=[],c=[],l=[],h=1/e,u=new R,d=new It,f=new R,g=new R,v=new R;let m=0,p=0;for(let b=0;b<=t.length-1;b++)switch(b){case 0:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,f.x=p*1,f.y=-m,f.z=p*0,v.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:m=t[b+1].x-t[b].x,p=t[b+1].y-t[b].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),c.push(f.x,f.y,f.z),v.copy(g)}for(let b=0;b<=e;b++){const w=n+b*h*s,M=Math.sin(w),T=Math.cos(w);for(let S=0;S<=t.length-1;S++){u.x=t[S].x*M,u.y=t[S].y,u.z=t[S].x*T,a.push(u.x,u.y,u.z),d.x=b/e,d.y=S/(t.length-1),o.push(d.x,d.y);const L=c[3*S+0]*M,_=c[3*S+1],E=c[3*S+0]*T;l.push(L,_,E)}}for(let b=0;b<e;b++)for(let w=0;w<t.length-1;w++){const M=w+b*t.length,T=M,S=M+t.length,L=M+t.length+1,_=M+1;r.push(T,S,_),r.push(L,_,S)}this.setIndex(r),this.setAttribute("position",new fe(a,3)),this.setAttribute("uv",new fe(o,2)),this.setAttribute("normal",new fe(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xl(t.points,t.segments,t.phiStart,t.phiLength)}}class Xs extends Ge{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=t/o,d=e/c,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const b=p*d-a;for(let w=0;w<l;w++){const M=w*u-r;g.push(M,-b,0),v.push(0,0,1),m.push(w/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<o;b++){const w=b+l*p,M=b+l*(p+1),T=b+1+l*(p+1),S=b+1+l*p;f.push(w,M,S),f.push(M,T,S)}this.setIndex(f),this.setAttribute("position",new fe(g,3)),this.setAttribute("normal",new fe(v,3)),this.setAttribute("uv",new fe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ci extends Ge{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new R,d=new R,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const b=[],w=p/n,M=a+w*o,T=t*Math.cos(M),S=Math.sqrt(t*t-T*T);let L=0;p===0&&a===0?L=.5/e:p===n&&c===Math.PI&&(L=-.5/e);for(let _=0;_<=e;_++){const E=_/e,D=s+E*r;u.x=-S*Math.cos(D),u.y=T,u.z=S*Math.sin(D),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(E+L,1-w),b.push(l++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){const w=h[p][b+1],M=h[p][b],T=h[p+1][b],S=h[p+1][b+1];(p!==0||a>0)&&f.push(w,M,S),(p!==n-1||c<Math.PI)&&f.push(M,T,S)}this.setIndex(f),this.setAttribute("position",new fe(g,3)),this.setAttribute("normal",new fe(v,3)),this.setAttribute("uv",new fe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ci(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function hs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(xc(s))s.isRenderTargetTexture?(Nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(xc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function tn(i){const t={};for(let e=0;e<i.length;e++){const n=hs(i[e]);for(const s in n)t[s]=n[s]}return t}function xc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function af(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Wh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const of={clone:hs,merge:tn};var lf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tn extends pi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lf,this.fragmentShader=cf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hs(t.uniforms),this.uniformsGroups=af(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new zt().setHex(s.value);break;case"v2":this.uniforms[n].value=new It().fromArray(s.value);break;case"v3":this.uniforms[n].value=new R().fromArray(s.value);break;case"v4":this.uniforms[n].value=new be().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ot().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ie().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class hf extends Tn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Pe extends pi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wr,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class _l extends pi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wr,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Jo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class uf extends pi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class df extends pi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class vl extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Xh extends vl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ga=new ie,_c=new R,vc=new R;class Yh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.mapType=cn,this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dl,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;_c.setFromMatrixPosition(t.matrixWorld),e.position.copy(_c),vc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vc),e.updateMatrixWorld(),Ga.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ga,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Hs||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ga)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const br=new R,Sr=new On,Ln=new R;class qh extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(br,Sr,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(br,Sr,Ln.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(br,Sr,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(br,Sr,Ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ci=new R,Mc=new It,yc=new It;class sn extends qh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ss*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Vs*2*Math.atan(Math.tan(ss*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ci.x,ci.y).multiplyScalar(-t/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-t/ci.z)}getViewSize(t,e){return this.getViewBounds(t,Mc,yc),e.subVectors(yc,Mc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ss*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class ff extends Yh{constructor(){super(new sn(90,1,.5,500)),this.isPointLightShadow=!0}}class pf extends vl{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ff}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Ml extends qh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class mf extends Yh{constructor(){super(new Ml(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $h extends vl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new mf}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Qi=-90,ji=1;class gf extends Fe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new sn(Qi,ji,t,e);s.layers=this.layers,this.add(s);const r=new sn(Qi,ji,t,e);r.layers=this.layers,this.add(r);const a=new sn(Qi,ji,t,e);a.layers=this.layers,this.add(a);const o=new sn(Qi,ji,t,e);o.layers=this.layers,this.add(o);const c=new sn(Qi,ji,t,e);c.layers=this.layers,this.add(c);const l=new sn(Qi,ji,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class xf extends sn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class _f{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Nt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const Rl=class Rl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Rl.prototype.isMatrix2=!0;let bc=Rl;function Sc(i,t,e,n){const s=vf(n);switch(e){case Ch:return i*t;case el:return i*t/s.components*s.byteLength;case nl:return i*t/s.components*s.byteLength;case Li:return i*t*2/s.components*s.byteLength;case il:return i*t*2/s.components*s.byteLength;case Ph:return i*t*3/s.components*s.byteLength;case Sn:return i*t*4/s.components*s.byteLength;case sl:return i*t*4/s.components*s.byteLength;case Dr:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ur:case Nr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fo:case mo:return Math.max(i,16)*Math.max(t,8)/4;case uo:case po:return Math.max(i,8)*Math.max(t,8)/2;case go:case xo:case vo:case Mo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case _o:case Hr:case yo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case So:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Eo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case wo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case To:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ao:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ro:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Co:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Po:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Do:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Io:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Uo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case No:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Fo:case ko:case Oo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Bo:case zo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Vr:case Go:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vf(i){switch(i){case cn:case wh:return{byteLength:1,components:1};case zs:case Th:case Jn:return{byteLength:2,components:1};case jo:case tl:return{byteLength:2,components:4};case kn:case Qo:case bn:return{byteLength:4,components:1};case Ah:case Rh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zo}}));typeof window<"u"&&(window.__THREE__?Nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Mf(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var yf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Sf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ef=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Af=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Pf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Df=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,If=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Uf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Nf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Gf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Vf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Wf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Xf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Yf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,qf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$f=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,tp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ep=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,np=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ip=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ap=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,op=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,up=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,fp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,pp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_p=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,vp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Mp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,yp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sp=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Pp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Lp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ip=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Up=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Np=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Wp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Xp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$p=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Jp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,em=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,im=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,sm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,am=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,om=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,cm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,um=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,mm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ym=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Em=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Rm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Cm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Pm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Im=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Um=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Fm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,km=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Om=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Hm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Vm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Wm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ym=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$m=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Km=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,t0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ht={alphahash_fragment:yf,alphahash_pars_fragment:bf,alphamap_fragment:Sf,alphamap_pars_fragment:Ef,alphatest_fragment:wf,alphatest_pars_fragment:Tf,aomap_fragment:Af,aomap_pars_fragment:Rf,batching_pars_vertex:Cf,batching_vertex:Pf,begin_vertex:Lf,beginnormal_vertex:Df,bsdfs:If,iridescence_fragment:Uf,bumpmap_pars_fragment:Nf,clipping_planes_fragment:Ff,clipping_planes_pars_fragment:kf,clipping_planes_pars_vertex:Of,clipping_planes_vertex:Bf,color_fragment:zf,color_pars_fragment:Gf,color_pars_vertex:Hf,color_vertex:Vf,common:Wf,cube_uv_reflection_fragment:Xf,defaultnormal_vertex:Yf,displacementmap_pars_vertex:qf,displacementmap_vertex:$f,emissivemap_fragment:Kf,emissivemap_pars_fragment:Zf,colorspace_fragment:Jf,colorspace_pars_fragment:Qf,envmap_fragment:jf,envmap_common_pars_fragment:tp,envmap_pars_fragment:ep,envmap_pars_vertex:np,envmap_physical_pars_fragment:fp,envmap_vertex:ip,fog_vertex:sp,fog_pars_vertex:rp,fog_fragment:ap,fog_pars_fragment:op,gradientmap_pars_fragment:lp,lightmap_pars_fragment:cp,lights_lambert_fragment:hp,lights_lambert_pars_fragment:up,lights_pars_begin:dp,lights_toon_fragment:pp,lights_toon_pars_fragment:mp,lights_phong_fragment:gp,lights_phong_pars_fragment:xp,lights_physical_fragment:_p,lights_physical_pars_fragment:vp,lights_fragment_begin:Mp,lights_fragment_maps:yp,lights_fragment_end:bp,lightprobes_pars_fragment:Sp,logdepthbuf_fragment:Ep,logdepthbuf_pars_fragment:wp,logdepthbuf_pars_vertex:Tp,logdepthbuf_vertex:Ap,map_fragment:Rp,map_pars_fragment:Cp,map_particle_fragment:Pp,map_particle_pars_fragment:Lp,metalnessmap_fragment:Dp,metalnessmap_pars_fragment:Ip,morphinstance_vertex:Up,morphcolor_vertex:Np,morphnormal_vertex:Fp,morphtarget_pars_vertex:kp,morphtarget_vertex:Op,normal_fragment_begin:Bp,normal_fragment_maps:zp,normal_pars_fragment:Gp,normal_pars_vertex:Hp,normal_vertex:Vp,normalmap_pars_fragment:Wp,clearcoat_normal_fragment_begin:Xp,clearcoat_normal_fragment_maps:Yp,clearcoat_pars_fragment:qp,iridescence_pars_fragment:$p,opaque_fragment:Kp,packing:Zp,premultiplied_alpha_fragment:Jp,project_vertex:Qp,dithering_fragment:jp,dithering_pars_fragment:tm,roughnessmap_fragment:em,roughnessmap_pars_fragment:nm,shadowmap_pars_fragment:im,shadowmap_pars_vertex:sm,shadowmap_vertex:rm,shadowmask_pars_fragment:am,skinbase_vertex:om,skinning_pars_vertex:lm,skinning_vertex:cm,skinnormal_vertex:hm,specularmap_fragment:um,specularmap_pars_fragment:dm,tonemapping_fragment:fm,tonemapping_pars_fragment:pm,transmission_fragment:mm,transmission_pars_fragment:gm,uv_pars_fragment:xm,uv_pars_vertex:_m,uv_vertex:vm,worldpos_vertex:Mm,background_vert:ym,background_frag:bm,backgroundCube_vert:Sm,backgroundCube_frag:Em,cube_vert:wm,cube_frag:Tm,depth_vert:Am,depth_frag:Rm,distance_vert:Cm,distance_frag:Pm,equirect_vert:Lm,equirect_frag:Dm,linedashed_vert:Im,linedashed_frag:Um,meshbasic_vert:Nm,meshbasic_frag:Fm,meshlambert_vert:km,meshlambert_frag:Om,meshmatcap_vert:Bm,meshmatcap_frag:zm,meshnormal_vert:Gm,meshnormal_frag:Hm,meshphong_vert:Vm,meshphong_frag:Wm,meshphysical_vert:Xm,meshphysical_frag:Ym,meshtoon_vert:qm,meshtoon_frag:$m,points_vert:Km,points_frag:Zm,shadow_vert:Jm,shadow_frag:Qm,sprite_vert:jm,sprite_frag:t0},_t={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new R},probesMax:{value:new R},probesResolution:{value:new R}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},In={basic:{uniforms:tn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:tn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new zt(0)},envMapIntensity:{value:1}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:tn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:tn([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:tn([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new zt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:tn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:tn([_t.points,_t.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:tn([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:tn([_t.common,_t.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:tn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:tn([_t.sprite,_t.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distance:{uniforms:tn([_t.common,_t.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distance_vert,fragmentShader:Ht.distance_frag},shadow:{uniforms:tn([_t.lights,_t.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};In.physical={uniforms:tn([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const Er={r:0,b:0,g:0},e0=new ie,Zh=new Ot;Zh.set(-1,0,0,0,1,0,0,0,1);function n0(i,t,e,n,s,r){const a=new zt(0);let o=s===!0?0:1,c,l,h=null,u=0,d=null;function f(b){let w=b.isScene===!0?b.background:null;if(w&&w.isTexture){const M=b.backgroundBlurriness>0;w=t.get(w,M)}return w}function g(b){let w=!1;const M=f(b);M===null?m(a,o):M&&M.isColor&&(m(M,1),w=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(b,w){const M=f(w);M&&(M.isCubeTexture||M.mapping===sa)?(l===void 0&&(l=new ne(new An(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:hs(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,S,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(e0.makeRotationFromEuler(w.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Zh),l.material.toneMapped=Kt.getTransfer(M.colorSpace)!==ae,(h!==M||u!==M.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new ne(new Xs(2,2),new Tn({name:"BackgroundMaterial",uniforms:hs(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(M.colorSpace)!==ae,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,d=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,w){b.getRGB(Er,Wh(i)),e.buffers.color.setClear(Er.r,Er.g,Er.b,w,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,w=1){a.set(b),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,m(a,o)},render:g,addToRenderList:v,dispose:p}}function i0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(U,P,J,$,z){let Z=!1;const X=u(U,$,J,P);r!==X&&(r=X,l(r.object)),Z=f(U,$,J,z),Z&&g(U,$,J,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,M(U,P,J,$),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return i.createVertexArray()}function l(U){return i.bindVertexArray(U)}function h(U){return i.deleteVertexArray(U)}function u(U,P,J,$){const z=$.wireframe===!0;let Z=n[P.id];Z===void 0&&(Z={},n[P.id]=Z);const X=U.isInstancedMesh===!0?U.id:0;let nt=Z[X];nt===void 0&&(nt={},Z[X]=nt);let st=nt[J.id];st===void 0&&(st={},nt[J.id]=st);let ut=st[z];return ut===void 0&&(ut=d(c()),st[z]=ut),ut}function d(U){const P=[],J=[],$=[];for(let z=0;z<e;z++)P[z]=0,J[z]=0,$[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:J,attributeDivisors:$,object:U,attributes:{},index:null}}function f(U,P,J,$){const z=r.attributes,Z=P.attributes;let X=0;const nt=J.getAttributes();for(const st in nt)if(nt[st].location>=0){const dt=z[st];let St=Z[st];if(St===void 0&&(st==="instanceMatrix"&&U.instanceMatrix&&(St=U.instanceMatrix),st==="instanceColor"&&U.instanceColor&&(St=U.instanceColor)),dt===void 0||dt.attribute!==St||St&&dt.data!==St.data)return!0;X++}return r.attributesNum!==X||r.index!==$}function g(U,P,J,$){const z={},Z=P.attributes;let X=0;const nt=J.getAttributes();for(const st in nt)if(nt[st].location>=0){let dt=Z[st];dt===void 0&&(st==="instanceMatrix"&&U.instanceMatrix&&(dt=U.instanceMatrix),st==="instanceColor"&&U.instanceColor&&(dt=U.instanceColor));const St={};St.attribute=dt,dt&&dt.data&&(St.data=dt.data),z[st]=St,X++}r.attributes=z,r.attributesNum=X,r.index=$}function v(){const U=r.newAttributes;for(let P=0,J=U.length;P<J;P++)U[P]=0}function m(U){p(U,0)}function p(U,P){const J=r.newAttributes,$=r.enabledAttributes,z=r.attributeDivisors;J[U]=1,$[U]===0&&(i.enableVertexAttribArray(U),$[U]=1),z[U]!==P&&(i.vertexAttribDivisor(U,P),z[U]=P)}function b(){const U=r.newAttributes,P=r.enabledAttributes;for(let J=0,$=P.length;J<$;J++)P[J]!==U[J]&&(i.disableVertexAttribArray(J),P[J]=0)}function w(U,P,J,$,z,Z,X){X===!0?i.vertexAttribIPointer(U,P,J,z,Z):i.vertexAttribPointer(U,P,J,$,z,Z)}function M(U,P,J,$){v();const z=$.attributes,Z=J.getAttributes(),X=P.defaultAttributeValues;for(const nt in Z){const st=Z[nt];if(st.location>=0){let ut=z[nt];if(ut===void 0&&(nt==="instanceMatrix"&&U.instanceMatrix&&(ut=U.instanceMatrix),nt==="instanceColor"&&U.instanceColor&&(ut=U.instanceColor)),ut!==void 0){const dt=ut.normalized,St=ut.itemSize,Wt=t.get(ut);if(Wt===void 0)continue;const re=Wt.buffer,$t=Wt.type,tt=Wt.bytesPerElement,ft=$t===i.INT||$t===i.UNSIGNED_INT||ut.gpuType===Qo;if(ut.isInterleavedBufferAttribute){const ot=ut.data,Ut=ot.stride,Ft=ut.offset;if(ot.isInstancedInterleavedBuffer){for(let Lt=0;Lt<st.locationSize;Lt++)p(st.location+Lt,ot.meshPerAttribute);U.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Lt=0;Lt<st.locationSize;Lt++)m(st.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,re);for(let Lt=0;Lt<st.locationSize;Lt++)w(st.location+Lt,St/st.locationSize,$t,dt,Ut*tt,(Ft+St/st.locationSize*Lt)*tt,ft)}else{if(ut.isInstancedBufferAttribute){for(let ot=0;ot<st.locationSize;ot++)p(st.location+ot,ut.meshPerAttribute);U.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let ot=0;ot<st.locationSize;ot++)m(st.location+ot);i.bindBuffer(i.ARRAY_BUFFER,re);for(let ot=0;ot<st.locationSize;ot++)w(st.location+ot,St/st.locationSize,$t,dt,St*tt,St/st.locationSize*ot*tt,ft)}}else if(X!==void 0){const dt=X[nt];if(dt!==void 0)switch(dt.length){case 2:i.vertexAttrib2fv(st.location,dt);break;case 3:i.vertexAttrib3fv(st.location,dt);break;case 4:i.vertexAttrib4fv(st.location,dt);break;default:i.vertexAttrib1fv(st.location,dt)}}}}b()}function T(){E();for(const U in n){const P=n[U];for(const J in P){const $=P[J];for(const z in $){const Z=$[z];for(const X in Z)h(Z[X].object),delete Z[X];delete $[z]}}delete n[U]}}function S(U){if(n[U.id]===void 0)return;const P=n[U.id];for(const J in P){const $=P[J];for(const z in $){const Z=$[z];for(const X in Z)h(Z[X].object),delete Z[X];delete $[z]}}delete n[U.id]}function L(U){for(const P in n){const J=n[P];for(const $ in J){const z=J[$];if(z[U.id]===void 0)continue;const Z=z[U.id];for(const X in Z)h(Z[X].object),delete Z[X];delete z[U.id]}}}function _(U){for(const P in n){const J=n[P],$=U.isInstancedMesh===!0?U.id:0,z=J[$];if(z!==void 0){for(const Z in z){const X=z[Z];for(const nt in X)h(X[nt].object),delete X[nt];delete z[Z]}delete J[$],Object.keys(J).length===0&&delete n[P]}}}function E(){D(),a=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:D,dispose:T,releaseStatesOfGeometry:S,releaseStatesOfObject:_,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:m,disableUnusedAttributes:b}}function s0(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function r0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Sn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const _=L===Jn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==cn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==bn&&!_)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Nt("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&d===!1&&Nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:w,maxFragmentUniforms:M,maxSamples:T,samples:S}}function a0(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Si,o=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const b=r?0:n,w=b*4;let M=p.clippingState||null;c.value=M,M=h(g,d,w,f);for(let T=0;T!==w;++T)M[T]=e[T];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=f+v*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,M=f;w!==v;++w,M+=4)a.copy(u[w]).applyMatrix4(b,o),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}const ui=4,Ec=[.125,.215,.35,.446,.526,.582],wi=20,o0=256,Ts=new Ml,wc=new zt;let Ha=null,Va=0,Wa=0,Xa=!1;const l0=new R;class jr{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=l0}=r;Ha=this._renderer.getRenderTarget(),Va=this._renderer.getActiveCubeFace(),Wa=this._renderer.getActiveMipmapLevel(),Xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ac(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ha,Va,Wa),this._renderer.xr.enabled=Xa,t.scissorTest=!1,ts(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pi||t.mapping===ls?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ha=this._renderer.getRenderTarget(),Va=this._renderer.getActiveCubeFace(),Wa=this._renderer.getActiveMipmapLevel(),Xa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:Jn,format:Sn,colorSpace:Xr,depthBuffer:!1},s=Tc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tc(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=c0(r)),this._blurMaterial=u0(r,t,e),this._ggxMaterial=h0(r,t,e)}return s}_compileMaterial(t){const e=new ne(new Ge,t);this._renderer.compile(e,Ts)}_sceneToCubeUV(t,e,n,s,r){const c=new sn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(wc),u.toneMapping=Nn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ne(new An,new ps({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const b=t.background;b?b.isColor&&(m.color.copy(b),t.background=null,p=!0):(m.color.copy(wc),p=!0);for(let w=0;w<6;w++){const M=w%3;M===0?(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[w],r.y,r.z)):M===1?(c.up.set(0,0,l[w]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[w],r.z)):(c.up.set(0,l[w],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[w]));const T=this._cubeSize;ts(s,M*T,w>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(v,c),u.render(t,c)}u.toneMapping=f,u.autoClear=d,t.background=b}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Pi||t.mapping===ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ac());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;ts(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Ts)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=0+l*1.25,f=u*d,{_lodMax:g}=this,v=this._sizeLods[n],m=3*v*(n>g-ui?n-g+ui:0),p=4*(this._cubeSize-v);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=g-e,ts(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(o,Ts),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,ts(t,m,p,3*v,2*v),s.setRenderTarget(t),s.render(o,Ts)}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Jt("blur direction must be either latitudinal or longitudinal!");const h=3,u=this._lodMeshes[s];u.material=l;const d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*wi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):wi;m>wi&&Nt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wi}`);const p=[];let b=0;for(let L=0;L<wi;++L){const _=L/v,E=Math.exp(-_*_/2);p.push(E),L===0?b+=E:L<m&&(b+=2*E)}for(let L=0;L<p.length;L++)p[L]=p[L]/b;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:w}=this;d.dTheta.value=g,d.mipInt.value=w-n;const M=this._sizeLods[s],T=3*M*(s>w-ui?s-w+ui:0),S=4*(this._cubeSize-M);ts(e,T,S,3*M,2*M),c.setRenderTarget(e),c.render(u,Ts)}}function c0(i){const t=[],e=[],n=[];let s=i;const r=i-ui+1+Ec.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-ui?c=Ec[a-i+ui-1]:a===0&&(c=0),e.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,b=new Float32Array(v*g*f),w=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let S=0;S<f;S++){const L=S%3*2/3-1,_=S>2?0:-1,E=[L,_,0,L+2/3,_,0,L+2/3,_+1,0,L,_,0,L+2/3,_+1,0,L,_+1,0];b.set(E,v*g*S),w.set(d,m*g*S);const D=[S,S,S,S,S,S];M.set(D,p*g*S)}const T=new Ge;T.setAttribute("position",new un(b,v)),T.setAttribute("uv",new un(w,m)),T.setAttribute("faceIndex",new un(M,p)),n.push(new ne(T,null)),s>ui&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function Tc(i,t,e){const n=new En(i,t,e);return n.texture.mapping=sa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ts(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function h0(i,t,e){return new Tn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:o0,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:la(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function u0(i,t,e){const n=new Float32Array(wi),s=new R(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ac(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Rc(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function la(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Jh extends En{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Gh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new An(5,5,5),r=new Tn({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:$n});r.uniforms.tEquirect.value=e;const a=new ne(s,r),o=e.minFilter;return e.minFilter===Ti&&(e.minFilter=$e),new gf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}function d0(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){const f=d.mapping;if(f===fa||f===pa)if(t.has(d)){const g=t.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const v=new Jh(g.height);return v.fromEquirectangularTexture(i,d),t.set(d,v),d.addEventListener("dispose",l),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const f=d.mapping,g=f===fa||f===pa,v=f===Pi||f===ls;if(g||v){let m=e.get(d);const p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new jr(i)),m=g?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{const b=d.image;return g&&b&&b.height>0||v&&b&&c(b)?(n===null&&(n=new jr(i)),m=g?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,f){return f===fa?d.mapping=Pi:f===pa&&(d.mapping=ls),d}function c(d){let f=0;const g=6;for(let v=0;v<g;v++)d[v]!==void 0&&f++;return f===g}function l(d){const f=d.target;f.removeEventListener("dispose",l);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(d){const f=d.target;f.removeEventListener("dispose",h);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function f0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&is("WebGLRenderer: "+n+" extension not supported."),s}}}function p0(i,t,e,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(g===void 0)return;if(f!==null){const b=f.array;v=f.version;for(let w=0,M=b.length;w<M;w+=3){const T=b[w+0],S=b[w+1],L=b[w+2];d.push(T,S,S,L,L,T)}}else{const b=g.array;v=g.version;for(let w=0,M=b.length/3-1;w<M;w+=3){const T=w+0,S=w+1,L=w+2;d.push(T,S,S,L,L,T)}}const m=new(g.count>=65535?Fh:Nh)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function m0(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*a),e.update(d,n,1)}function l(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*a,f),e.update(d,n,f))}function h(u,d,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let v=0;for(let m=0;m<f;m++)v+=d[m];e.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function g0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Jt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function x0(i,t,e){const n=new WeakMap,s=new be;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let E=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let w=0;f===!0&&(w=1),g===!0&&(w=2),v===!0&&(w=3);let M=o.attributes.position.count*w,T=1;M>t.maxTextureSize&&(T=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const S=new Float32Array(M*T*4*u),L=new Dh(S,M,T,u);L.type=bn,L.needsUpdate=!0;const _=w*4;for(let D=0;D<u;D++){const U=m[D],P=p[D],J=b[D],$=M*T*4*D;for(let z=0;z<U.count;z++){const Z=z*_;f===!0&&(s.fromBufferAttribute(U,z),S[$+Z+0]=s.x,S[$+Z+1]=s.y,S[$+Z+2]=s.z,S[$+Z+3]=0),g===!0&&(s.fromBufferAttribute(P,z),S[$+Z+4]=s.x,S[$+Z+5]=s.y,S[$+Z+6]=s.z,S[$+Z+7]=0),v===!0&&(s.fromBufferAttribute(J,z),S[$+Z+8]=s.x,S[$+Z+9]=s.y,S[$+Z+10]=s.z,S[$+Z+11]=J.itemSize===4?s.w:1)}}d={count:u,texture:L,size:new It(M,T)},n.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let f=0;for(let v=0;v<l.length;v++)f+=l[v];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function _0(i,t,e,n,s){let r=new WeakMap;function a(l){const h=s.render.frame,u=l.geometry,d=t.get(l,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const v0={[_h]:"LINEAR_TONE_MAPPING",[vh]:"REINHARD_TONE_MAPPING",[Mh]:"CINEON_TONE_MAPPING",[yh]:"ACES_FILMIC_TONE_MAPPING",[Sh]:"AGX_TONE_MAPPING",[ia]:"NEUTRAL_TONE_MAPPING",[bh]:"CUSTOM_TONE_MAPPING"};function M0(i,t,e,n,s,r){const a=new En(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new cs(t,e):void 0}),o=new En(t,e,{type:Jn,depthBuffer:!1,stencilBuffer:!1}),c=new Ge;c.setAttribute("position",new fe([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new fe([0,2,0,0,2,0],2));const l=new hf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new ne(c,l),u=new Ml(-1,1,1,-1,0,1);let d=null,f=null,g=!1,v,m=null,p=[],b=!1;this.setSize=function(w,M){a.setSize(w,M),o.setSize(w,M);for(let T=0;T<p.length;T++){const S=p[T];S.setSize&&S.setSize(w,M)}},this.setEffects=function(w){p=w,b=p.length>0&&p[0].isRenderPass===!0;const M=a.width,T=a.height;for(let S=0;S<p.length;S++){const L=p[S];L.setSize&&L.setSize(M,T)}},this.begin=function(w,M){if(g||w.toneMapping===Nn&&p.length===0)return!1;if(m=M,M!==null){const T=M.width,S=M.height;(a.width!==T||a.height!==S)&&this.setSize(T,S)}return b===!1&&w.setRenderTarget(a),v=w.toneMapping,w.toneMapping=Nn,!0},this.hasRenderPass=function(){return b},this.end=function(w,M){w.toneMapping=v,g=!0;let T=a,S=o;for(let L=0;L<p.length;L++){const _=p[L];if(_.enabled!==!1&&(_.render(w,S,T,M),_.needsSwap!==!1)){const E=T;T=S,S=E}}if(d!==w.outputColorSpace||f!==w.toneMapping){d=w.outputColorSpace,f=w.toneMapping,l.defines={},Kt.getTransfer(d)===ae&&(l.defines.SRGB_TRANSFER="");const L=v0[f];L&&(l.defines[L]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=T.texture,w.setRenderTarget(m),w.render(h,u),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Qh=new Qe,Wo=new cs(1,1),jh=new Dh,tu=new Bd,eu=new Gh,Cc=[],Pc=[],Lc=new Float32Array(16),Dc=new Float32Array(9),Ic=new Float32Array(4);function ms(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Cc[s];if(r===void 0&&(r=new Float32Array(s),Cc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ke(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ca(i,t){let e=Pc[t];e===void 0&&(e=new Int32Array(t),Pc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function y0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function b0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function S0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ke(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function E0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function w0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(ke(e,n))return;Ic.set(n),i.uniformMatrix2fv(this.addr,!1,Ic),Oe(e,n)}}function T0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(ke(e,n))return;Dc.set(n),i.uniformMatrix3fv(this.addr,!1,Dc),Oe(e,n)}}function A0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ke(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(ke(e,n))return;Lc.set(n),i.uniformMatrix4fv(this.addr,!1,Lc),Oe(e,n)}}function R0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function C0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function P0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function L0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function D0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function I0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ke(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function U0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ke(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function N0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ke(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function F0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Wo.compareFunction=e.isReversedDepthBuffer()?al:rl,r=Wo):r=Qh,e.setTexture2D(t||r,s)}function k0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||tu,s)}function O0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||eu,s)}function B0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||jh,s)}function z0(i){switch(i){case 5126:return y0;case 35664:return b0;case 35665:return S0;case 35666:return E0;case 35674:return w0;case 35675:return T0;case 35676:return A0;case 5124:case 35670:return R0;case 35667:case 35671:return C0;case 35668:case 35672:return P0;case 35669:case 35673:return L0;case 5125:return D0;case 36294:return I0;case 36295:return U0;case 36296:return N0;case 35678:case 36198:case 36298:case 36306:case 35682:return F0;case 35679:case 36299:case 36307:return k0;case 35680:case 36300:case 36308:case 36293:return O0;case 36289:case 36303:case 36311:case 36292:return B0}}function G0(i,t){i.uniform1fv(this.addr,t)}function H0(i,t){const e=ms(t,this.size,2);i.uniform2fv(this.addr,e)}function V0(i,t){const e=ms(t,this.size,3);i.uniform3fv(this.addr,e)}function W0(i,t){const e=ms(t,this.size,4);i.uniform4fv(this.addr,e)}function X0(i,t){const e=ms(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Y0(i,t){const e=ms(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function q0(i,t){const e=ms(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function $0(i,t){i.uniform1iv(this.addr,t)}function K0(i,t){i.uniform2iv(this.addr,t)}function Z0(i,t){i.uniform3iv(this.addr,t)}function J0(i,t){i.uniform4iv(this.addr,t)}function Q0(i,t){i.uniform1uiv(this.addr,t)}function j0(i,t){i.uniform2uiv(this.addr,t)}function tg(i,t){i.uniform3uiv(this.addr,t)}function eg(i,t){i.uniform4uiv(this.addr,t)}function ng(i,t,e){const n=this.cache,s=t.length,r=ca(e,s);ke(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Wo:a=Qh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function ig(i,t,e){const n=this.cache,s=t.length,r=ca(e,s);ke(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||tu,r[a])}function sg(i,t,e){const n=this.cache,s=t.length,r=ca(e,s);ke(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||eu,r[a])}function rg(i,t,e){const n=this.cache,s=t.length,r=ca(e,s);ke(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||jh,r[a])}function ag(i){switch(i){case 5126:return G0;case 35664:return H0;case 35665:return V0;case 35666:return W0;case 35674:return X0;case 35675:return Y0;case 35676:return q0;case 5124:case 35670:return $0;case 35667:case 35671:return K0;case 35668:case 35672:return Z0;case 35669:case 35673:return J0;case 5125:return Q0;case 36294:return j0;case 36295:return tg;case 36296:return eg;case 35678:case 36198:case 36298:case 36306:case 35682:return ng;case 35679:case 36299:case 36307:return ig;case 35680:case 36300:case 36308:case 36293:return sg;case 36289:case 36303:case 36311:case 36292:return rg}}class og{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=z0(e.type)}}class lg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ag(e.type)}}class cg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Ya=/(\w+)(\])?(\[|\.)?/g;function Uc(i,t){i.seq.push(t),i.map[t.id]=t}function hg(i,t,e){const n=i.name,s=n.length;for(Ya.lastIndex=0;;){const r=Ya.exec(n),a=Ya.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Uc(e,l===void 0?new og(o,i,t):new lg(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new cg(o),Uc(e,u)),e=u}}}class Fr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);hg(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Nc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const ug=37297;let dg=0;function fg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Fc=new Ot;function pg(i){Kt._getMatrix(Fc,Kt.workingColorSpace,i);const t=`mat3( ${Fc.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(i)){case Yr:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return Nt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function kc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+fg(i.getShaderSource(t),o)}else return r}function mg(i,t){const e=pg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const gg={[_h]:"Linear",[vh]:"Reinhard",[Mh]:"Cineon",[yh]:"ACESFilmic",[Sh]:"AgX",[ia]:"Neutral",[bh]:"Custom"};function xg(i,t){const e=gg[t];return e===void 0?(Nt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const wr=new R;function _g(){Kt.getLuminanceCoefficients(wr);const i=wr.x.toFixed(4),t=wr.y.toFixed(4),e=wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ds).join(`
`)}function Mg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function yg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ds(i){return i!==""}function Oc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Bc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const bg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xo(i){return i.replace(bg,Eg)}const Sg=new Map;function Eg(i,t){let e=Ht[t];if(e===void 0){const n=Sg.get(t);if(n!==void 0)e=Ht[n],Nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Xo(e)}const wg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zc(i){return i.replace(wg,Tg)}function Tg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Gc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const Ag={[Us]:"SHADOWMAP_TYPE_PCF",[Ls]:"SHADOWMAP_TYPE_VSM"};function Rg(i){return Ag[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Cg={[Pi]:"ENVMAP_TYPE_CUBE",[ls]:"ENVMAP_TYPE_CUBE",[sa]:"ENVMAP_TYPE_CUBE_UV"};function Pg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Cg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Lg={[ls]:"ENVMAP_MODE_REFRACTION"};function Dg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Lg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ig={[Jo]:"ENVMAP_BLENDING_MULTIPLY",[id]:"ENVMAP_BLENDING_MIX",[sd]:"ENVMAP_BLENDING_ADD"};function Ug(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Ig[i.combine]||"ENVMAP_BLENDING_NONE"}function Ng(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Fg(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Rg(e),l=Pg(e),h=Dg(e),u=Ug(e),d=Ng(e),f=vg(e),g=Mg(r),v=s.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ds).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ds).join(`
`),p.length>0&&(p+=`
`)):(m=[Gc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ds).join(`
`),p=[Gc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Nn?"#define TONE_MAPPING":"",e.toneMapping!==Nn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==Nn?xg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,mg("linearToOutputTexel",e.outputColorSpace),_g(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ds).join(`
`)),a=Xo(a),a=Oc(a,e),a=Bc(a,e),o=Xo(o),o=Oc(o,e),o=Bc(o,e),a=zc(a),o=zc(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=b+m+a,M=b+p+o,T=Nc(s,s.VERTEX_SHADER,w),S=Nc(s,s.FRAGMENT_SHADER,M);s.attachShader(v,T),s.attachShader(v,S),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function L(U){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(v)||"",J=s.getShaderInfoLog(T)||"",$=s.getShaderInfoLog(S)||"",z=P.trim(),Z=J.trim(),X=$.trim();let nt=!0,st=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(nt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,S);else{const ut=kc(s,T,"vertex"),dt=kc(s,S,"fragment");Jt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+z+`
`+ut+`
`+dt)}else z!==""?Nt("WebGLProgram: Program Info Log:",z):(Z===""||X==="")&&(st=!1);st&&(U.diagnostics={runnable:nt,programLog:z,vertexShader:{log:Z,prefix:m},fragmentShader:{log:X,prefix:p}})}s.deleteShader(T),s.deleteShader(S),_=new Fr(s,v),E=yg(s,v)}let _;this.getUniforms=function(){return _===void 0&&L(this),_};let E;this.getAttributes=function(){return E===void 0&&L(this),E};let D=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(v,ug)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dg++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=S,this}let kg=0;class Og{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Bg(t),e.set(t,n)),n}}class Bg{constructor(t){this.id=kg++,this.code=t,this.usedTimes=0}}function zg(i){return i===Li||i===Hr||i===Vr}function Gg(i,t,e,n,s,r){const a=new Ih,o=new Og,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer;let d=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function v(_,E,D,U,P,J){const $=U.fog,z=P.geometry,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?U.environment:null,X=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,nt=t.get(_.envMap||Z,X),st=nt&&nt.mapping===sa?nt.image.height:null,ut=f[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&Nt("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const dt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,St=dt!==void 0?dt.length:0;let Wt=0;z.morphAttributes.position!==void 0&&(Wt=1),z.morphAttributes.normal!==void 0&&(Wt=2),z.morphAttributes.color!==void 0&&(Wt=3);let re,$t,tt,ft;if(ut){const yt=In[ut];re=yt.vertexShader,$t=yt.fragmentShader}else{re=_.vertexShader,$t=_.fragmentShader;const yt=o.getVertexShaderStage(_),he=o.getFragmentShaderStage(_);o.update(_,yt,he),tt=yt.id,ft=he.id}const ot=i.getRenderTarget(),Ut=i.state.buffers.depth.getReversed(),Ft=P.isInstancedMesh===!0,Lt=P.isBatchedMesh===!0,xe=!!_.map,kt=!!_.matcap,se=!!nt,Xt=!!_.aoMap,Gt=!!_.lightMap,Se=!!_.bumpMap&&_.wireframe===!1,Ee=!!_.normalMap,ye=!!_.displacementMap,De=!!_.emissiveMap,ce=!!_.metalnessMap,_e=!!_.roughnessMap,N=_.anisotropy>0,Ie=_.clearcoat>0,Zt=_.dispersion>0,A=_.iridescence>0,x=_.sheen>0,k=_.transmission>0,G=N&&!!_.anisotropyMap,K=Ie&&!!_.clearcoatMap,ct=Ie&&!!_.clearcoatNormalMap,pt=Ie&&!!_.clearcoatRoughnessMap,Q=A&&!!_.iridescenceMap,j=A&&!!_.iridescenceThicknessMap,gt=x&&!!_.sheenColorMap,At=x&&!!_.sheenRoughnessMap,xt=!!_.specularMap,C=!!_.specularColorMap,B=!!_.specularIntensityMap,at=k&&!!_.transmissionMap,mt=k&&!!_.thicknessMap,I=!!_.gradientMap,it=!!_.alphaMap,q=_.alphaTest>0,lt=!!_.alphaHash,ht=!!_.extensions;let et=Nn;_.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(et=i.toneMapping);const bt={shaderID:ut,shaderType:_.type,shaderName:_.name,vertexShader:re,fragmentShader:$t,defines:_.defines,customVertexShaderID:tt,customFragmentShaderID:ft,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:Lt,batchingColor:Lt&&P._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&P.instanceColor!==null,instancingMorph:Ft&&P.morphTexture!==null,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Kt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:xe,matcap:kt,envMap:se,envMapMode:se&&nt.mapping,envMapCubeUVHeight:st,aoMap:Xt,lightMap:Gt,bumpMap:Se,normalMap:Ee,displacementMap:ye,emissiveMap:De,normalMapObjectSpace:Ee&&_.normalMapType===od,normalMapTangentSpace:Ee&&_.normalMapType===Wr,packedNormalMap:Ee&&_.normalMapType===Wr&&zg(_.normalMap.format),metalnessMap:ce,roughnessMap:_e,anisotropy:N,anisotropyMap:G,clearcoat:Ie,clearcoatMap:K,clearcoatNormalMap:ct,clearcoatRoughnessMap:pt,dispersion:Zt,iridescence:A,iridescenceMap:Q,iridescenceThicknessMap:j,sheen:x,sheenColorMap:gt,sheenRoughnessMap:At,specularMap:xt,specularColorMap:C,specularIntensityMap:B,transmission:k,transmissionMap:at,thicknessMap:mt,gradientMap:I,opaque:_.transparent===!1&&_.blending===ns&&_.alphaToCoverage===!1,alphaMap:it,alphaTest:q,alphaHash:lt,combine:_.combine,mapUv:xe&&g(_.map.channel),aoMapUv:Xt&&g(_.aoMap.channel),lightMapUv:Gt&&g(_.lightMap.channel),bumpMapUv:Se&&g(_.bumpMap.channel),normalMapUv:Ee&&g(_.normalMap.channel),displacementMapUv:ye&&g(_.displacementMap.channel),emissiveMapUv:De&&g(_.emissiveMap.channel),metalnessMapUv:ce&&g(_.metalnessMap.channel),roughnessMapUv:_e&&g(_.roughnessMap.channel),anisotropyMapUv:G&&g(_.anisotropyMap.channel),clearcoatMapUv:K&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ct&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:At&&g(_.sheenRoughnessMap.channel),specularMapUv:xt&&g(_.specularMap.channel),specularColorMapUv:C&&g(_.specularColorMap.channel),specularIntensityMapUv:B&&g(_.specularIntensityMap.channel),transmissionMapUv:at&&g(_.transmissionMap.channel),thicknessMapUv:mt&&g(_.thicknessMap.channel),alphaMapUv:it&&g(_.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Ee||N),vertexNormals:!!z.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!z.attributes.uv&&(xe||it),fog:!!$,useFog:_.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||z.attributes.normal===void 0&&Ee===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Ut,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Wt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:et,decodeVideoTexture:xe&&_.map.isVideoTexture===!0&&Kt.getTransfer(_.map.colorSpace)===ae,decodeVideoTextureEmissive:De&&_.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(_.emissiveMap.colorSpace)===ae,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Mn,flipSided:_.side===Je,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ht&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ht&&_.extensions.multiDraw===!0||Lt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return bt.vertexUv1s=c.has(1),bt.vertexUv2s=c.has(2),bt.vertexUv3s=c.has(3),c.clear(),bt}function m(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const D in _.defines)E.push(D),E.push(_.defines[D]);return _.isRawShaderMaterial===!1&&(p(E,_),b(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function p(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function b(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function w(_){const E=f[_.type];let D;if(E){const U=In[E];D=of.clone(U.uniforms)}else D=_.uniforms;return D}function M(_,E){let D=h.get(E);return D!==void 0?++D.usedTimes:(D=new Fg(i,E,_,s),l.push(D),h.set(E,D)),D}function T(_){if(--_.usedTimes===0){const E=l.indexOf(_);l[E]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function S(_){o.remove(_)}function L(){o.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:w,acquireProgram:M,releaseProgram:T,releaseShaderCache:S,programs:l,dispose:L}}function Hg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Vg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Hc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Vc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,g,v,m,p){let b=i[t];return b===void 0?(b={id:d.id,object:d,geometry:f,material:g,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:m,group:p},i[t]=b):(b.id=d.id,b.object=d,b.geometry=f,b.material=g,b.materialVariant=a(d),b.groupOrder=v,b.renderOrder=d.renderOrder,b.z=m,b.group=p),t++,b}function c(d,f,g,v,m,p){const b=o(d,f,g,v,m,p);g.transmission>0?n.push(b):g.transparent===!0?s.push(b):e.push(b)}function l(d,f,g,v,m,p){const b=o(d,f,g,v,m,p);g.transmission>0?n.unshift(b):g.transparent===!0?s.unshift(b):e.unshift(b)}function h(d,f,g){e.length>1&&e.sort(d||Vg),n.length>1&&n.sort(f||Hc),s.length>1&&s.sort(f||Hc),g&&(e.reverse(),n.reverse(),s.reverse())}function u(){for(let d=t,f=i.length;d<f;d++){const g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function Wg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Vc,i.set(n,[a])):s>=r.length?(a=new Vc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Xg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new R,color:new zt};break;case"SpotLight":e={position:new R,direction:new R,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new R,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new R,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new R,halfWidth:new R,halfHeight:new R};break}return i[t.id]=e,e}}}function Yg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let qg=0;function $g(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Kg(i){const t=new Xg,e=Yg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);const s=new R,r=new ie,a=new ie;function o(l){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,b=0,w=0,M=0,T=0,S=0,L=0;l.sort($g);for(let E=0,D=l.length;E<D;E++){const U=l[E],P=U.color,J=U.intensity,$=U.distance;let z=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Li?z=U.shadow.map.texture:z=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=P.r*J,u+=P.g*J,d+=P.b*J;else if(U.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(U.sh.coefficients[Z],J);L++}else if(U.isDirectionalLight){const Z=t.get(U);if(Z.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const X=U.shadow,nt=e.get(U);nt.shadowIntensity=X.intensity,nt.shadowBias=X.bias,nt.shadowNormalBias=X.normalBias,nt.shadowRadius=X.radius,nt.shadowMapSize=X.mapSize,n.directionalShadow[f]=nt,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=U.shadow.matrix,b++}n.directional[f]=Z,f++}else if(U.isSpotLight){const Z=t.get(U);Z.position.setFromMatrixPosition(U.matrixWorld),Z.color.copy(P).multiplyScalar(J),Z.distance=$,Z.coneCos=Math.cos(U.angle),Z.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Z.decay=U.decay,n.spot[v]=Z;const X=U.shadow;if(U.map&&(n.spotLightMap[T]=U.map,T++,X.updateMatrices(U),U.castShadow&&S++),n.spotLightMatrix[v]=X.matrix,U.castShadow){const nt=e.get(U);nt.shadowIntensity=X.intensity,nt.shadowBias=X.bias,nt.shadowNormalBias=X.normalBias,nt.shadowRadius=X.radius,nt.shadowMapSize=X.mapSize,n.spotShadow[v]=nt,n.spotShadowMap[v]=z,M++}v++}else if(U.isRectAreaLight){const Z=t.get(U);Z.color.copy(P).multiplyScalar(J),Z.halfWidth.set(U.width*.5,0,0),Z.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=Z,m++}else if(U.isPointLight){const Z=t.get(U);if(Z.color.copy(U.color).multiplyScalar(U.intensity),Z.distance=U.distance,Z.decay=U.decay,U.castShadow){const X=U.shadow,nt=e.get(U);nt.shadowIntensity=X.intensity,nt.shadowBias=X.bias,nt.shadowNormalBias=X.normalBias,nt.shadowRadius=X.radius,nt.shadowMapSize=X.mapSize,nt.shadowCameraNear=X.camera.near,nt.shadowCameraFar=X.camera.far,n.pointShadow[g]=nt,n.pointShadowMap[g]=z,n.pointShadowMatrix[g]=U.shadow.matrix,w++}n.point[g]=Z,g++}else if(U.isHemisphereLight){const Z=t.get(U);Z.skyColor.copy(U.color).multiplyScalar(J),Z.groundColor.copy(U.groundColor).multiplyScalar(J),n.hemi[p]=Z,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const _=n.hash;(_.directionalLength!==f||_.pointLength!==g||_.spotLength!==v||_.rectAreaLength!==m||_.hemiLength!==p||_.numDirectionalShadows!==b||_.numPointShadows!==w||_.numSpotShadows!==M||_.numSpotMaps!==T||_.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=M+T-S,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=L,_.directionalLength=f,_.pointLength=g,_.spotLength=v,_.rectAreaLength=m,_.hemiLength=p,_.numDirectionalShadows=b,_.numPointShadows=w,_.numSpotShadows=M,_.numSpotMaps=T,_.numLightProbes=L,n.version=qg++)}function c(l,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,b=l.length;p<b;p++){const w=l[p];if(w.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(w.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(w.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(w.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),d++}else if(w.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:n}}function Wc(i){const t=new Kg(i),e=[],n=[],s=[];function r(d){u.camera=d,e.length=0,n.length=0,s.length=0}function a(d){e.push(d)}function o(d){n.push(d)}function c(d){s.push(d)}function l(){t.setup(e)}function h(d){t.setupView(e,d)}const u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Zg(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Wc(i),t.set(s,[o])):r>=a.length?(o=new Wc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Jg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,jg=[new R(1,0,0),new R(-1,0,0),new R(0,1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1)],tx=[new R(0,-1,0),new R(0,-1,0),new R(0,0,1),new R(0,0,-1),new R(0,-1,0),new R(0,-1,0)],Xc=new ie,As=new R,qa=new R;function ex(i,t,e){let n=new dl;const s=new It,r=new It,a=new be,o=new uf,c=new df,l={},h=e.maxTextureSize,u={[fi]:Je,[Je]:fi,[Mn]:Mn},d=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:Jg,fragmentShader:Qg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ge;g.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ne(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Us;let p=this.type;this.render=function(S,L,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===Ou&&(Nt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Us);const E=i.getRenderTarget(),D=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),P=i.state;P.setBlending($n),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const J=p!==this.type;J&&L.traverse(function($){$.material&&(Array.isArray($.material)?$.material.forEach(z=>z.needsUpdate=!0):$.material.needsUpdate=!0)});for(let $=0,z=S.length;$<z;$++){const Z=S[$],X=Z.shadow;if(X===void 0){Nt("WebGLShadowMap:",Z,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const nt=X.getFrameExtents();s.multiply(nt),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/nt.x),s.x=r.x*nt.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/nt.y),s.y=r.y*nt.y,X.mapSize.y=r.y));const st=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=st,X.map===null||J===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Ls){if(Z.isPointLight){Nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new En(s.x,s.y,{format:Li,type:Jn,minFilter:$e,magFilter:$e,generateMipmaps:!1}),X.map.texture.name=Z.name+".shadowMap",X.map.depthTexture=new cs(s.x,s.y,bn),X.map.depthTexture.name=Z.name+".shadowMapDepth",X.map.depthTexture.format=Qn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=He,X.map.depthTexture.magFilter=He}else Z.isPointLight?(X.map=new Jh(s.x),X.map.depthTexture=new rf(s.x,kn)):(X.map=new En(s.x,s.y),X.map.depthTexture=new cs(s.x,s.y,kn)),X.map.depthTexture.name=Z.name+".shadowMap",X.map.depthTexture.format=Qn,this.type===Us?(X.map.depthTexture.compareFunction=st?al:rl,X.map.depthTexture.minFilter=$e,X.map.depthTexture.magFilter=$e):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=He,X.map.depthTexture.magFilter=He);X.camera.updateProjectionMatrix()}const ut=X.map.isWebGLCubeRenderTarget?6:1;for(let dt=0;dt<ut;dt++){if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,dt),i.clear();else{dt===0&&(i.setRenderTarget(X.map),i.clear());const St=X.getViewport(dt);a.set(r.x*St.x,r.y*St.y,r.x*St.z,r.y*St.w),P.viewport(a)}if(Z.isPointLight){const St=X.camera,Wt=X.matrix,re=Z.distance||St.far;re!==St.far&&(St.far=re,St.updateProjectionMatrix()),As.setFromMatrixPosition(Z.matrixWorld),St.position.copy(As),qa.copy(St.position),qa.add(jg[dt]),St.up.copy(tx[dt]),St.lookAt(qa),St.updateMatrixWorld(),Wt.makeTranslation(-As.x,-As.y,-As.z),Xc.multiplyMatrices(St.projectionMatrix,St.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Xc,St.coordinateSystem,St.reversedDepth)}else X.updateMatrices(Z);n=X.getFrustum(),M(L,_,X.camera,Z,this.type)}X.isPointLightShadow!==!0&&this.type===Ls&&b(X,_),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,D,U)};function b(S,L){const _=t.update(v);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new En(s.x,s.y,{format:Li,type:Jn})),d.uniforms.shadow_pass.value=S.map.depthTexture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(L,null,_,d,v,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(L,null,_,f,v,null)}function w(S,L,_,E){let D=null;const U=_.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(U!==void 0)D=U;else if(D=_.isPointLight===!0?c:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const P=D.uuid,J=L.uuid;let $=l[P];$===void 0&&($={},l[P]=$);let z=$[J];z===void 0&&(z=D.clone(),$[J]=z,L.addEventListener("dispose",T)),D=z}if(D.visible=L.visible,D.wireframe=L.wireframe,E===Ls?D.side=L.shadowSide!==null?L.shadowSide:L.side:D.side=L.shadowSide!==null?L.shadowSide:u[L.side],D.alphaMap=L.alphaMap,D.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,D.map=L.map,D.clipShadows=L.clipShadows,D.clippingPlanes=L.clippingPlanes,D.clipIntersection=L.clipIntersection,D.displacementMap=L.displacementMap,D.displacementScale=L.displacementScale,D.displacementBias=L.displacementBias,D.wireframeLinewidth=L.wireframeLinewidth,D.linewidth=L.linewidth,_.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const P=i.properties.get(D);P.light=_}return D}function M(S,L,_,E,D){if(S.visible===!1)return;if(S.layers.test(L.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&D===Ls)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,S.matrixWorld);const J=t.update(S),$=S.material;if(Array.isArray($)){const z=J.groups;for(let Z=0,X=z.length;Z<X;Z++){const nt=z[Z],st=$[nt.materialIndex];if(st&&st.visible){const ut=w(S,st,E,D);S.onBeforeShadow(i,S,L,_,J,ut,nt),i.renderBufferDirect(_,null,J,ut,S,nt),S.onAfterShadow(i,S,L,_,J,ut,nt)}}}else if($.visible){const z=w(S,$,E,D);S.onBeforeShadow(i,S,L,_,J,z,null),i.renderBufferDirect(_,null,J,z,S,null),S.onAfterShadow(i,S,L,_,J,z,null)}}const P=S.children;for(let J=0,$=P.length;J<$;J++)M(P[J],L,_,E,D)}function T(S){S.target.removeEventListener("dispose",T);for(const _ in l){const E=l[_],D=S.target.uuid;D in E&&(E[D].dispose(),delete E[D])}}}function nx(i,t){function e(){let I=!1;const it=new be;let q=null;const lt=new be(0,0,0,0);return{setMask:function(ht){q!==ht&&!I&&(i.colorMask(ht,ht,ht,ht),q=ht)},setLocked:function(ht){I=ht},setClear:function(ht,et,bt,yt,he){he===!0&&(ht*=yt,et*=yt,bt*=yt),it.set(ht,et,bt,yt),lt.equals(it)===!1&&(i.clearColor(ht,et,bt,yt),lt.copy(it))},reset:function(){I=!1,q=null,lt.set(-1,0,0,0)}}}function n(){let I=!1,it=!1,q=null,lt=null,ht=null;return{setReversed:function(et){if(it!==et){const bt=t.get("EXT_clip_control");et?bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.ZERO_TO_ONE_EXT):bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.NEGATIVE_ONE_TO_ONE_EXT),it=et;const yt=ht;ht=null,this.setClear(yt)}},getReversed:function(){return it},setTest:function(et){et?ot(i.DEPTH_TEST):Ut(i.DEPTH_TEST)},setMask:function(et){q!==et&&!I&&(i.depthMask(et),q=et)},setFunc:function(et){if(it&&(et=xd[et]),lt!==et){switch(et){case io:i.depthFunc(i.NEVER);break;case so:i.depthFunc(i.ALWAYS);break;case ro:i.depthFunc(i.LESS);break;case os:i.depthFunc(i.LEQUAL);break;case ao:i.depthFunc(i.EQUAL);break;case oo:i.depthFunc(i.GEQUAL);break;case lo:i.depthFunc(i.GREATER);break;case co:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}lt=et}},setLocked:function(et){I=et},setClear:function(et){ht!==et&&(ht=et,it&&(et=1-et),i.clearDepth(et))},reset:function(){I=!1,q=null,lt=null,ht=null,it=!1}}}function s(){let I=!1,it=null,q=null,lt=null,ht=null,et=null,bt=null,yt=null,he=null;return{setTest:function(pe){I||(pe?ot(i.STENCIL_TEST):Ut(i.STENCIL_TEST))},setMask:function(pe){it!==pe&&!I&&(i.stencilMask(pe),it=pe)},setFunc:function(pe,Rn,Cn){(q!==pe||lt!==Rn||ht!==Cn)&&(i.stencilFunc(pe,Rn,Cn),q=pe,lt=Rn,ht=Cn)},setOp:function(pe,Rn,Cn){(et!==pe||bt!==Rn||yt!==Cn)&&(i.stencilOp(pe,Rn,Cn),et=pe,bt=Rn,yt=Cn)},setLocked:function(pe){I=pe},setClear:function(pe){he!==pe&&(i.clearStencil(pe),he=pe)},reset:function(){I=!1,it=null,q=null,lt=null,ht=null,et=null,bt=null,yt=null,he=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d={},f=new WeakMap,g=[],v=null,m=!1,p=null,b=null,w=null,M=null,T=null,S=null,L=null,_=new zt(0,0,0),E=0,D=!1,U=null,P=null,J=null,$=null,z=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,nt=0;const st=i.getParameter(i.VERSION);st.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(st)[1]),X=nt>=1):st.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(st)[1]),X=nt>=2);let ut=null,dt={};const St=i.getParameter(i.SCISSOR_BOX),Wt=i.getParameter(i.VIEWPORT),re=new be().fromArray(St),$t=new be().fromArray(Wt);function tt(I,it,q,lt){const ht=new Uint8Array(4),et=i.createTexture();i.bindTexture(I,et),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let bt=0;bt<q;bt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(it,0,i.RGBA,1,1,lt,0,i.RGBA,i.UNSIGNED_BYTE,ht):i.texImage2D(it+bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ht);return et}const ft={};ft[i.TEXTURE_2D]=tt(i.TEXTURE_2D,i.TEXTURE_2D,1),ft[i.TEXTURE_CUBE_MAP]=tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[i.TEXTURE_2D_ARRAY]=tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ft[i.TEXTURE_3D]=tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(i.DEPTH_TEST),a.setFunc(os),Se(!1),Ee(Gl),ot(i.CULL_FACE),Xt($n);function ot(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Ut(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Ft(I,it){return d[I]!==it?(i.bindFramebuffer(I,it),d[I]=it,I===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=it),I===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=it),!0):!1}function Lt(I,it){let q=g,lt=!1;if(I){q=f.get(it),q===void 0&&(q=[],f.set(it,q));const ht=I.textures;if(q.length!==ht.length||q[0]!==i.COLOR_ATTACHMENT0){for(let et=0,bt=ht.length;et<bt;et++)q[et]=i.COLOR_ATTACHMENT0+et;q.length=ht.length,lt=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,lt=!0);lt&&i.drawBuffers(q)}function xe(I){return v!==I?(i.useProgram(I),v=I,!0):!1}const kt={[Ei]:i.FUNC_ADD,[zu]:i.FUNC_SUBTRACT,[Gu]:i.FUNC_REVERSE_SUBTRACT};kt[Hu]=i.MIN,kt[Vu]=i.MAX;const se={[Wu]:i.ZERO,[Xu]:i.ONE,[Yu]:i.SRC_COLOR,[eo]:i.SRC_ALPHA,[Qu]:i.SRC_ALPHA_SATURATE,[Zu]:i.DST_COLOR,[$u]:i.DST_ALPHA,[qu]:i.ONE_MINUS_SRC_COLOR,[no]:i.ONE_MINUS_SRC_ALPHA,[Ju]:i.ONE_MINUS_DST_COLOR,[Ku]:i.ONE_MINUS_DST_ALPHA,[ju]:i.CONSTANT_COLOR,[td]:i.ONE_MINUS_CONSTANT_COLOR,[ed]:i.CONSTANT_ALPHA,[nd]:i.ONE_MINUS_CONSTANT_ALPHA};function Xt(I,it,q,lt,ht,et,bt,yt,he,pe){if(I===$n){m===!0&&(Ut(i.BLEND),m=!1);return}if(m===!1&&(ot(i.BLEND),m=!0),I!==Bu){if(I!==p||pe!==D){if((b!==Ei||T!==Ei)&&(i.blendEquation(i.FUNC_ADD),b=Ei,T=Ei),pe)switch(I){case ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Hl:i.blendFunc(i.ONE,i.ONE);break;case Vl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Jt("WebGLState: Invalid blending: ",I);break}else switch(I){case ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Hl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Vl:Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wl:Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Jt("WebGLState: Invalid blending: ",I);break}w=null,M=null,S=null,L=null,_.set(0,0,0),E=0,p=I,D=pe}return}ht=ht||it,et=et||q,bt=bt||lt,(it!==b||ht!==T)&&(i.blendEquationSeparate(kt[it],kt[ht]),b=it,T=ht),(q!==w||lt!==M||et!==S||bt!==L)&&(i.blendFuncSeparate(se[q],se[lt],se[et],se[bt]),w=q,M=lt,S=et,L=bt),(yt.equals(_)===!1||he!==E)&&(i.blendColor(yt.r,yt.g,yt.b,he),_.copy(yt),E=he),p=I,D=!1}function Gt(I,it){I.side===Mn?Ut(i.CULL_FACE):ot(i.CULL_FACE);let q=I.side===Je;it&&(q=!q),Se(q),I.blending===ns&&I.transparent===!1?Xt($n):Xt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const lt=I.stencilWrite;o.setTest(lt),lt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),De(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):Ut(i.SAMPLE_ALPHA_TO_COVERAGE)}function Se(I){U!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),U=I)}function Ee(I){I!==Fu?(ot(i.CULL_FACE),I!==P&&(I===Gl?i.cullFace(i.BACK):I===ku?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ut(i.CULL_FACE),P=I}function ye(I){I!==J&&(X&&i.lineWidth(I),J=I)}function De(I,it,q){I?(ot(i.POLYGON_OFFSET_FILL),($!==it||z!==q)&&($=it,z=q,a.getReversed()&&(it=-it),i.polygonOffset(it,q))):Ut(i.POLYGON_OFFSET_FILL)}function ce(I){I?ot(i.SCISSOR_TEST):Ut(i.SCISSOR_TEST)}function _e(I){I===void 0&&(I=i.TEXTURE0+Z-1),ut!==I&&(i.activeTexture(I),ut=I)}function N(I,it,q){q===void 0&&(ut===null?q=i.TEXTURE0+Z-1:q=ut);let lt=dt[q];lt===void 0&&(lt={type:void 0,texture:void 0},dt[q]=lt),(lt.type!==I||lt.texture!==it)&&(ut!==q&&(i.activeTexture(q),ut=q),i.bindTexture(I,it||ft[I]),lt.type=I,lt.texture=it)}function Ie(){const I=dt[ut];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Zt(){try{i.compressedTexImage2D(...arguments)}catch(I){Jt("WebGLState:",I)}}function A(){try{i.compressedTexImage3D(...arguments)}catch(I){Jt("WebGLState:",I)}}function x(){try{i.texSubImage2D(...arguments)}catch(I){Jt("WebGLState:",I)}}function k(){try{i.texSubImage3D(...arguments)}catch(I){Jt("WebGLState:",I)}}function G(){try{i.compressedTexSubImage2D(...arguments)}catch(I){Jt("WebGLState:",I)}}function K(){try{i.compressedTexSubImage3D(...arguments)}catch(I){Jt("WebGLState:",I)}}function ct(){try{i.texStorage2D(...arguments)}catch(I){Jt("WebGLState:",I)}}function pt(){try{i.texStorage3D(...arguments)}catch(I){Jt("WebGLState:",I)}}function Q(){try{i.texImage2D(...arguments)}catch(I){Jt("WebGLState:",I)}}function j(){try{i.texImage3D(...arguments)}catch(I){Jt("WebGLState:",I)}}function gt(I){return u[I]!==void 0?u[I]:i.getParameter(I)}function At(I,it){u[I]!==it&&(i.pixelStorei(I,it),u[I]=it)}function xt(I){re.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),re.copy(I))}function C(I){$t.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),$t.copy(I))}function B(I,it){let q=l.get(it);q===void 0&&(q=new WeakMap,l.set(it,q));let lt=q.get(I);lt===void 0&&(lt=i.getUniformBlockIndex(it,I.name),q.set(I,lt))}function at(I,it){const lt=l.get(it).get(I);c.get(it)!==lt&&(i.uniformBlockBinding(it,lt,I.__bindingPointIndex),c.set(it,lt))}function mt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},ut=null,dt={},d={},f=new WeakMap,g=[],v=null,m=!1,p=null,b=null,w=null,M=null,T=null,S=null,L=null,_=new zt(0,0,0),E=0,D=!1,U=null,P=null,J=null,$=null,z=null,re.set(0,0,i.canvas.width,i.canvas.height),$t.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:Ut,bindFramebuffer:Ft,drawBuffers:Lt,useProgram:xe,setBlending:Xt,setMaterial:Gt,setFlipSided:Se,setCullFace:Ee,setLineWidth:ye,setPolygonOffset:De,setScissorTest:ce,activeTexture:_e,bindTexture:N,unbindTexture:Ie,compressedTexImage2D:Zt,compressedTexImage3D:A,texImage2D:Q,texImage3D:j,pixelStorei:At,getParameter:gt,updateUBOMapping:B,uniformBlockBinding:at,texStorage2D:ct,texStorage3D:pt,texSubImage2D:x,texSubImage3D:k,compressedTexSubImage2D:G,compressedTexSubImage3D:K,scissor:xt,viewport:C,reset:mt}}function ix(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new It,h=new WeakMap,u=new Set;let d;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(A,x){return g?new OffscreenCanvas(A,x):qr("canvas")}function m(A,x,k){let G=1;const K=Zt(A);if((K.width>k||K.height>k)&&(G=k/Math.max(K.width,K.height)),G<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ct=Math.floor(G*K.width),pt=Math.floor(G*K.height);d===void 0&&(d=v(ct,pt));const Q=x?v(ct,pt):d;return Q.width=ct,Q.height=pt,Q.getContext("2d").drawImage(A,0,0,ct,pt),Nt("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ct+"x"+pt+")."),Q}else return"data"in A&&Nt("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function p(A){return A.generateMipmaps}function b(A){i.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(A,x,k,G,K,ct=!1){if(A!==null){if(i[A]!==void 0)return i[A];Nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let pt;G&&(pt=t.get("EXT_texture_norm16"),pt||Nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=x;if(x===i.RED&&(k===i.FLOAT&&(Q=i.R32F),k===i.HALF_FLOAT&&(Q=i.R16F),k===i.UNSIGNED_BYTE&&(Q=i.R8),k===i.UNSIGNED_SHORT&&pt&&(Q=pt.R16_EXT),k===i.SHORT&&pt&&(Q=pt.R16_SNORM_EXT)),x===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.R8UI),k===i.UNSIGNED_SHORT&&(Q=i.R16UI),k===i.UNSIGNED_INT&&(Q=i.R32UI),k===i.BYTE&&(Q=i.R8I),k===i.SHORT&&(Q=i.R16I),k===i.INT&&(Q=i.R32I)),x===i.RG&&(k===i.FLOAT&&(Q=i.RG32F),k===i.HALF_FLOAT&&(Q=i.RG16F),k===i.UNSIGNED_BYTE&&(Q=i.RG8),k===i.UNSIGNED_SHORT&&pt&&(Q=pt.RG16_EXT),k===i.SHORT&&pt&&(Q=pt.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RG8UI),k===i.UNSIGNED_SHORT&&(Q=i.RG16UI),k===i.UNSIGNED_INT&&(Q=i.RG32UI),k===i.BYTE&&(Q=i.RG8I),k===i.SHORT&&(Q=i.RG16I),k===i.INT&&(Q=i.RG32I)),x===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),k===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),k===i.UNSIGNED_INT&&(Q=i.RGB32UI),k===i.BYTE&&(Q=i.RGB8I),k===i.SHORT&&(Q=i.RGB16I),k===i.INT&&(Q=i.RGB32I)),x===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),k===i.UNSIGNED_INT&&(Q=i.RGBA32UI),k===i.BYTE&&(Q=i.RGBA8I),k===i.SHORT&&(Q=i.RGBA16I),k===i.INT&&(Q=i.RGBA32I)),x===i.RGB&&(k===i.UNSIGNED_SHORT&&pt&&(Q=pt.RGB16_EXT),k===i.SHORT&&pt&&(Q=pt.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),x===i.RGBA){const j=ct?Yr:Kt.getTransfer(K);k===i.FLOAT&&(Q=i.RGBA32F),k===i.HALF_FLOAT&&(Q=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Q=j===ae?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&pt&&(Q=pt.RGBA16_EXT),k===i.SHORT&&pt&&(Q=pt.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function T(A,x){let k;return A?x===null||x===kn||x===Gs?k=i.DEPTH24_STENCIL8:x===bn?k=i.DEPTH32F_STENCIL8:x===zs&&(k=i.DEPTH24_STENCIL8,Nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===kn||x===Gs?k=i.DEPTH_COMPONENT24:x===bn?k=i.DEPTH_COMPONENT32F:x===zs&&(k=i.DEPTH_COMPONENT16),k}function S(A,x){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==He&&A.minFilter!==$e?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function L(A){const x=A.target;x.removeEventListener("dispose",L),E(x),x.isVideoTexture&&h.delete(x),x.isHTMLTexture&&u.delete(x)}function _(A){const x=A.target;x.removeEventListener("dispose",_),U(x)}function E(A){const x=n.get(A);if(x.__webglInit===void 0)return;const k=A.source,G=f.get(k);if(G){const K=G[x.__cacheKey];K.usedTimes--,K.usedTimes===0&&D(A),Object.keys(G).length===0&&f.delete(k)}n.remove(A)}function D(A){const x=n.get(A);i.deleteTexture(x.__webglTexture);const k=A.source,G=f.get(k);delete G[x.__cacheKey],a.memory.textures--}function U(A){const x=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let G=0;G<6;G++){if(Array.isArray(x.__webglFramebuffer[G]))for(let K=0;K<x.__webglFramebuffer[G].length;K++)i.deleteFramebuffer(x.__webglFramebuffer[G][K]);else i.deleteFramebuffer(x.__webglFramebuffer[G]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[G])}else{if(Array.isArray(x.__webglFramebuffer))for(let G=0;G<x.__webglFramebuffer.length;G++)i.deleteFramebuffer(x.__webglFramebuffer[G]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let G=0;G<x.__webglColorRenderbuffer.length;G++)x.__webglColorRenderbuffer[G]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[G]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const k=A.textures;for(let G=0,K=k.length;G<K;G++){const ct=n.get(k[G]);ct.__webglTexture&&(i.deleteTexture(ct.__webglTexture),a.memory.textures--),n.remove(k[G])}n.remove(A)}let P=0;function J(){P=0}function $(){return P}function z(A){P=A}function Z(){const A=P;return A>=s.maxTextures&&Nt("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function X(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function nt(A,x){const k=n.get(A);if(A.isVideoTexture&&N(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&k.__version!==A.version){const G=A.image;if(G===null)Nt("WebGLRenderer: Texture marked for update but no image data found.");else if(G.complete===!1)Nt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ut(k,A,x);return}}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+x)}function st(A,x){const k=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){Ut(k,A,x);return}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+x)}function ut(A,x){const k=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){Ut(k,A,x);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+x)}function dt(A,x){const k=n.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&k.__version!==A.version){Ft(k,A,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+x)}const St={[Gr]:i.REPEAT,[Yn]:i.CLAMP_TO_EDGE,[ho]:i.MIRRORED_REPEAT},Wt={[He]:i.NEAREST,[rd]:i.NEAREST_MIPMAP_NEAREST,[Ks]:i.NEAREST_MIPMAP_LINEAR,[$e]:i.LINEAR,[ma]:i.LINEAR_MIPMAP_NEAREST,[Ti]:i.LINEAR_MIPMAP_LINEAR},re={[ld]:i.NEVER,[fd]:i.ALWAYS,[cd]:i.LESS,[rl]:i.LEQUAL,[hd]:i.EQUAL,[al]:i.GEQUAL,[ud]:i.GREATER,[dd]:i.NOTEQUAL};function $t(A,x){if(x.type===bn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===$e||x.magFilter===ma||x.magFilter===Ks||x.magFilter===Ti||x.minFilter===$e||x.minFilter===ma||x.minFilter===Ks||x.minFilter===Ti)&&Nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,St[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,St[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,St[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Wt[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Wt[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,re[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===He||x.minFilter!==Ks&&x.minFilter!==Ti||x.type===bn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function tt(A,x){let k=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",L));const G=x.source;let K=f.get(G);K===void 0&&(K={},f.set(G,K));const ct=X(x);if(ct!==A.__cacheKey){K[ct]===void 0&&(K[ct]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),K[ct].usedTimes++;const pt=K[A.__cacheKey];pt!==void 0&&(K[A.__cacheKey].usedTimes--,pt.usedTimes===0&&D(x)),A.__cacheKey=ct,A.__webglTexture=K[ct].texture}return k}function ft(A,x,k){return Math.floor(Math.floor(A/k)/x)}function ot(A,x,k,G){const ct=A.updateRanges;if(ct.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,k,G,x.data);else{ct.sort((At,xt)=>At.start-xt.start);let pt=0;for(let At=1;At<ct.length;At++){const xt=ct[pt],C=ct[At],B=xt.start+xt.count,at=ft(C.start,x.width,4),mt=ft(xt.start,x.width,4);C.start<=B+1&&at===mt&&ft(C.start+C.count-1,x.width,4)===at?xt.count=Math.max(xt.count,C.start+C.count-xt.start):(++pt,ct[pt]=C)}ct.length=pt+1;const Q=e.getParameter(i.UNPACK_ROW_LENGTH),j=e.getParameter(i.UNPACK_SKIP_PIXELS),gt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let At=0,xt=ct.length;At<xt;At++){const C=ct[At],B=Math.floor(C.start/4),at=Math.ceil(C.count/4),mt=B%x.width,I=Math.floor(B/x.width),it=at,q=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,mt),e.pixelStorei(i.UNPACK_SKIP_ROWS,I),e.texSubImage2D(i.TEXTURE_2D,0,mt,I,it,q,k,G,x.data)}A.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Q),e.pixelStorei(i.UNPACK_SKIP_PIXELS,j),e.pixelStorei(i.UNPACK_SKIP_ROWS,gt)}}function Ut(A,x,k){let G=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(G=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(G=i.TEXTURE_3D);const K=tt(A,x),ct=x.source;e.bindTexture(G,A.__webglTexture,i.TEXTURE0+k);const pt=n.get(ct);if(ct.version!==pt.__version||K===!0){if(e.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const q=Kt.getPrimaries(Kt.workingColorSpace),lt=x.colorSpace===hi?null:Kt.getPrimaries(x.colorSpace),ht=x.colorSpace===hi||q===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let j=m(x.image,!1,s.maxTextureSize);j=Ie(x,j);const gt=r.convert(x.format,x.colorSpace),At=r.convert(x.type);let xt=M(x.internalFormat,gt,At,x.normalized,x.colorSpace,x.isVideoTexture);$t(G,x);let C;const B=x.mipmaps,at=x.isVideoTexture!==!0,mt=pt.__version===void 0||K===!0,I=ct.dataReady,it=S(x,j);if(x.isDepthTexture)xt=T(x.format===Ai,x.type),mt&&(at?e.texStorage2D(i.TEXTURE_2D,1,xt,j.width,j.height):e.texImage2D(i.TEXTURE_2D,0,xt,j.width,j.height,0,gt,At,null));else if(x.isDataTexture)if(B.length>0){at&&mt&&e.texStorage2D(i.TEXTURE_2D,it,xt,B[0].width,B[0].height);for(let q=0,lt=B.length;q<lt;q++)C=B[q],at?I&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,C.width,C.height,gt,At,C.data):e.texImage2D(i.TEXTURE_2D,q,xt,C.width,C.height,0,gt,At,C.data);x.generateMipmaps=!1}else at?(mt&&e.texStorage2D(i.TEXTURE_2D,it,xt,j.width,j.height),I&&ot(x,j,gt,At)):e.texImage2D(i.TEXTURE_2D,0,xt,j.width,j.height,0,gt,At,j.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){at&&mt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,it,xt,B[0].width,B[0].height,j.depth);for(let q=0,lt=B.length;q<lt;q++)if(C=B[q],x.format!==Sn)if(gt!==null)if(at){if(I)if(x.layerUpdates.size>0){const ht=Sc(C.width,C.height,x.format,x.type);for(const et of x.layerUpdates){const bt=C.data.subarray(et*ht/C.data.BYTES_PER_ELEMENT,(et+1)*ht/C.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,et,C.width,C.height,1,gt,bt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,C.width,C.height,j.depth,gt,C.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,xt,C.width,C.height,j.depth,0,C.data,0,0);else Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else at?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,C.width,C.height,j.depth,gt,At,C.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,xt,C.width,C.height,j.depth,0,gt,At,C.data)}else{at&&mt&&e.texStorage2D(i.TEXTURE_2D,it,xt,B[0].width,B[0].height);for(let q=0,lt=B.length;q<lt;q++)C=B[q],x.format!==Sn?gt!==null?at?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,C.width,C.height,gt,C.data):e.compressedTexImage2D(i.TEXTURE_2D,q,xt,C.width,C.height,0,C.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?I&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,C.width,C.height,gt,At,C.data):e.texImage2D(i.TEXTURE_2D,q,xt,C.width,C.height,0,gt,At,C.data)}else if(x.isDataArrayTexture)if(at){if(mt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,it,xt,j.width,j.height,j.depth),I)if(x.layerUpdates.size>0){const q=Sc(j.width,j.height,x.format,x.type);for(const lt of x.layerUpdates){const ht=j.data.subarray(lt*q/j.data.BYTES_PER_ELEMENT,(lt+1)*q/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,lt,j.width,j.height,1,gt,At,ht)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,gt,At,j.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,xt,j.width,j.height,j.depth,0,gt,At,j.data);else if(x.isData3DTexture)at?(mt&&e.texStorage3D(i.TEXTURE_3D,it,xt,j.width,j.height,j.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,gt,At,j.data)):e.texImage3D(i.TEXTURE_3D,0,xt,j.width,j.height,j.depth,0,gt,At,j.data);else if(x.isFramebufferTexture){if(mt)if(at)e.texStorage2D(i.TEXTURE_2D,it,xt,j.width,j.height);else{let q=j.width,lt=j.height;for(let ht=0;ht<it;ht++)e.texImage2D(i.TEXTURE_2D,ht,xt,q,lt,0,gt,At,null),q>>=1,lt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const q=i.canvas;if(q.hasAttribute("layoutsubtree")||q.setAttribute("layoutsubtree","true"),j.parentNode!==q){q.appendChild(j),u.add(x),q.onpaint=lt=>{const ht=lt.changedElements;for(const et of u)ht.includes(et.image)&&(et.needsUpdate=!0)},q.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,j);else{const ht=i.RGBA,et=i.RGBA,bt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ht,et,bt,j)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(B.length>0){if(at&&mt){const q=Zt(B[0]);e.texStorage2D(i.TEXTURE_2D,it,xt,q.width,q.height)}for(let q=0,lt=B.length;q<lt;q++)C=B[q],at?I&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,gt,At,C):e.texImage2D(i.TEXTURE_2D,q,xt,gt,At,C);x.generateMipmaps=!1}else if(at){if(mt){const q=Zt(j);e.texStorage2D(i.TEXTURE_2D,it,xt,q.width,q.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,At,j)}else e.texImage2D(i.TEXTURE_2D,0,xt,gt,At,j);p(x)&&b(G),pt.__version=ct.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Ft(A,x,k){if(x.image.length!==6)return;const G=tt(A,x),K=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+k);const ct=n.get(K);if(K.version!==ct.__version||G===!0){e.activeTexture(i.TEXTURE0+k);const pt=Kt.getPrimaries(Kt.workingColorSpace),Q=x.colorSpace===hi?null:Kt.getPrimaries(x.colorSpace),j=x.colorSpace===hi||pt===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const gt=x.isCompressedTexture||x.image[0].isCompressedTexture,At=x.image[0]&&x.image[0].isDataTexture,xt=[];for(let et=0;et<6;et++)!gt&&!At?xt[et]=m(x.image[et],!0,s.maxCubemapSize):xt[et]=At?x.image[et].image:x.image[et],xt[et]=Ie(x,xt[et]);const C=xt[0],B=r.convert(x.format,x.colorSpace),at=r.convert(x.type),mt=M(x.internalFormat,B,at,x.normalized,x.colorSpace),I=x.isVideoTexture!==!0,it=ct.__version===void 0||G===!0,q=K.dataReady;let lt=S(x,C);$t(i.TEXTURE_CUBE_MAP,x);let ht;if(gt){I&&it&&e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,mt,C.width,C.height);for(let et=0;et<6;et++){ht=xt[et].mipmaps;for(let bt=0;bt<ht.length;bt++){const yt=ht[bt];x.format!==Sn?B!==null?I?q&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,bt,0,0,yt.width,yt.height,B,yt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,bt,mt,yt.width,yt.height,0,yt.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,bt,0,0,yt.width,yt.height,B,at,yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,bt,mt,yt.width,yt.height,0,B,at,yt.data)}}}else{if(ht=x.mipmaps,I&&it){ht.length>0&&lt++;const et=Zt(xt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,mt,et.width,et.height)}for(let et=0;et<6;et++)if(At){I?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,xt[et].width,xt[et].height,B,at,xt[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,mt,xt[et].width,xt[et].height,0,B,at,xt[et].data);for(let bt=0;bt<ht.length;bt++){const he=ht[bt].image[et].image;I?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,bt+1,0,0,he.width,he.height,B,at,he.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,bt+1,mt,he.width,he.height,0,B,at,he.data)}}else{I?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,B,at,xt[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,mt,B,at,xt[et]);for(let bt=0;bt<ht.length;bt++){const yt=ht[bt];I?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,bt+1,0,0,B,at,yt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,bt+1,mt,B,at,yt.image[et])}}}p(x)&&b(i.TEXTURE_CUBE_MAP),ct.__version=K.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Lt(A,x,k,G,K,ct){const pt=r.convert(k.format,k.colorSpace),Q=r.convert(k.type),j=M(k.internalFormat,pt,Q,k.normalized,k.colorSpace),gt=n.get(x),At=n.get(k);if(At.__renderTarget=x,!gt.__hasExternalTextures){const xt=Math.max(1,x.width>>ct),C=Math.max(1,x.height>>ct);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,ct,j,xt,C,x.depth,0,pt,Q,null):e.texImage2D(K,ct,j,xt,C,0,pt,Q,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),_e(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,G,K,At.__webglTexture,0,ce(x)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,G,K,At.__webglTexture,ct),e.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(A,x,k){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){const G=x.depthTexture,K=G&&G.isDepthTexture?G.type:null,ct=T(x.stencilBuffer,K),pt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_e(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce(x),ct,x.width,x.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce(x),ct,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ct,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pt,i.RENDERBUFFER,A)}else{const G=x.textures;for(let K=0;K<G.length;K++){const ct=G[K],pt=r.convert(ct.format,ct.colorSpace),Q=r.convert(ct.type),j=M(ct.internalFormat,pt,Q,ct.normalized,ct.colorSpace);_e(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce(x),j,x.width,x.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce(x),j,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,j,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function kt(A,x,k){const G=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=n.get(x.depthTexture);if(K.__renderTarget=x,(!K.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G){if(K.__webglInit===void 0&&(K.__webglInit=!0,x.depthTexture.addEventListener("dispose",L)),K.__webglTexture===void 0){K.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),$t(i.TEXTURE_CUBE_MAP,x.depthTexture);const gt=r.convert(x.depthTexture.format),At=r.convert(x.depthTexture.type);let xt;x.depthTexture.format===Qn?xt=i.DEPTH_COMPONENT24:x.depthTexture.format===Ai&&(xt=i.DEPTH24_STENCIL8);for(let C=0;C<6;C++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+C,0,xt,x.width,x.height,0,gt,At,null)}}else nt(x.depthTexture,0);const ct=K.__webglTexture,pt=ce(x),Q=G?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,j=x.depthTexture.format===Ai?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Qn)_e(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Q,ct,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,j,Q,ct,0);else if(x.depthTexture.format===Ai)_e(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Q,ct,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,j,Q,ct,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function se(A){const x=n.get(A),k=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const G=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),G){const K=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,G.removeEventListener("dispose",K)};G.addEventListener("dispose",K),x.__depthDisposeCallback=K}x.__boundDepthTexture=G}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(k)for(let G=0;G<6;G++)kt(x.__webglFramebuffer[G],A,G);else{const G=A.texture.mipmaps;G&&G.length>0?kt(x.__webglFramebuffer[0],A,0):kt(x.__webglFramebuffer,A,0)}else if(k){x.__webglDepthbuffer=[];for(let G=0;G<6;G++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[G]),x.__webglDepthbuffer[G]===void 0)x.__webglDepthbuffer[G]=i.createRenderbuffer(),xe(x.__webglDepthbuffer[G],A,!1);else{const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=x.__webglDepthbuffer[G];i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ct)}}else{const G=A.texture.mipmaps;if(G&&G.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),xe(x.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ct),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,ct)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(A,x,k){const G=n.get(A);x!==void 0&&Lt(G.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&se(A)}function Gt(A){const x=A.texture,k=n.get(A),G=n.get(x);A.addEventListener("dispose",_);const K=A.textures,ct=A.isWebGLCubeRenderTarget===!0,pt=K.length>1;if(pt||(G.__webglTexture===void 0&&(G.__webglTexture=i.createTexture()),G.__version=x.version,a.memory.textures++),ct){k.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0){k.__webglFramebuffer[Q]=[];for(let j=0;j<x.mipmaps.length;j++)k.__webglFramebuffer[Q][j]=i.createFramebuffer()}else k.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){k.__webglFramebuffer=[];for(let Q=0;Q<x.mipmaps.length;Q++)k.__webglFramebuffer[Q]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(pt)for(let Q=0,j=K.length;Q<j;Q++){const gt=n.get(K[Q]);gt.__webglTexture===void 0&&(gt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&_e(A)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Q=0;Q<K.length;Q++){const j=K[Q];k.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[Q]);const gt=r.convert(j.format,j.colorSpace),At=r.convert(j.type),xt=M(j.internalFormat,gt,At,j.normalized,j.colorSpace,A.isXRRenderTarget===!0),C=ce(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,C,xt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,k.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(k.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ct){e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture),$t(i.TEXTURE_CUBE_MAP,x);for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)Lt(k.__webglFramebuffer[Q][j],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,j);else Lt(k.__webglFramebuffer[Q],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(x)&&b(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let Q=0,j=K.length;Q<j;Q++){const gt=K[Q],At=n.get(gt);let xt=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(xt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(xt,At.__webglTexture),$t(xt,gt),Lt(k.__webglFramebuffer,A,gt,i.COLOR_ATTACHMENT0+Q,xt,0),p(gt)&&b(xt)}e.unbindTexture()}else{let Q=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Q=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Q,G.__webglTexture),$t(Q,x),x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)Lt(k.__webglFramebuffer[j],A,x,i.COLOR_ATTACHMENT0,Q,j);else Lt(k.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,Q,0);p(x)&&b(Q),e.unbindTexture()}A.depthBuffer&&se(A)}function Se(A){const x=A.textures;for(let k=0,G=x.length;k<G;k++){const K=x[k];if(p(K)){const ct=w(A),pt=n.get(K).__webglTexture;e.bindTexture(ct,pt),b(ct),e.unbindTexture()}}}const Ee=[],ye=[];function De(A){if(A.samples>0){if(_e(A)===!1){const x=A.textures,k=A.width,G=A.height;let K=i.COLOR_BUFFER_BIT;const ct=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=n.get(A),Q=x.length>1;if(Q)for(let gt=0;gt<x.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);const j=A.texture.mipmaps;j&&j.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let gt=0;gt<x.length;gt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pt.__webglColorRenderbuffer[gt]);const At=n.get(x[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,At,0)}i.blitFramebuffer(0,0,k,G,0,0,k,G,K,i.NEAREST),c===!0&&(Ee.length=0,ye.length=0,Ee.push(i.COLOR_ATTACHMENT0+gt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ee.push(ct),ye.push(ct),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ye)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ee))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let gt=0;gt<x.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,pt.__webglColorRenderbuffer[gt]);const At=n.get(x[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,At,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function ce(A){return Math.min(s.maxSamples,A.samples)}function _e(A){const x=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function N(A){const x=a.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function Ie(A,x){const k=A.colorSpace,G=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||k!==Xr&&k!==hi&&(Kt.getTransfer(k)===ae?(G!==Sn||K!==cn)&&Nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Jt("WebGLTextures: Unsupported texture color space:",k)),x}function Zt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=Z,this.resetTextureUnits=J,this.getTextureUnits=$,this.setTextureUnits=z,this.setTexture2D=nt,this.setTexture2DArray=st,this.setTexture3D=ut,this.setTextureCube=dt,this.rebindTextures=Xt,this.setupRenderTarget=Gt,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=se,this.setupFrameBufferTexture=Lt,this.useMultisampledRTT=_e,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function sx(i,t){function e(n,s=hi){let r;const a=Kt.getTransfer(s);if(n===cn)return i.UNSIGNED_BYTE;if(n===jo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===tl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ah)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Rh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===wh)return i.BYTE;if(n===Th)return i.SHORT;if(n===zs)return i.UNSIGNED_SHORT;if(n===Qo)return i.INT;if(n===kn)return i.UNSIGNED_INT;if(n===bn)return i.FLOAT;if(n===Jn)return i.HALF_FLOAT;if(n===Ch)return i.ALPHA;if(n===Ph)return i.RGB;if(n===Sn)return i.RGBA;if(n===Qn)return i.DEPTH_COMPONENT;if(n===Ai)return i.DEPTH_STENCIL;if(n===el)return i.RED;if(n===nl)return i.RED_INTEGER;if(n===Li)return i.RG;if(n===il)return i.RG_INTEGER;if(n===sl)return i.RGBA_INTEGER;if(n===Dr||n===Ir||n===Ur||n===Nr)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Nr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===uo||n===fo||n===po||n===mo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===uo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===po)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===mo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===go||n===xo||n===_o||n===vo||n===Mo||n===Hr||n===yo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===go||n===xo)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_o)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===vo)return r.COMPRESSED_R11_EAC;if(n===Mo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Hr)return r.COMPRESSED_RG11_EAC;if(n===yo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===bo||n===So||n===Eo||n===wo||n===To||n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io||n===Uo||n===No)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===bo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===So)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Eo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===To)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ao)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ro)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Co)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Po)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Lo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Do)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Io)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Uo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===No)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fo||n===ko||n===Oo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Fo)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ko)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Oo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Bo||n===zo||n===Vr||n===Go)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Bo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===zo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Vr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Go)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const rx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ax=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ox{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Hh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Tn({vertexShader:rx,fragmentShader:ax,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ne(new Xs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lx extends Ii{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new ox,p={},b=e.getContextAttributes();let w=null,M=null;const T=[],S=[],L=new It;let _=null;const E=new sn;E.viewport=new be;const D=new sn;D.viewport=new be;const U=[E,D],P=new xf;let J=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let ft=T[tt];return ft===void 0&&(ft=new ya,T[tt]=ft),ft.getTargetRaySpace()},this.getControllerGrip=function(tt){let ft=T[tt];return ft===void 0&&(ft=new ya,T[tt]=ft),ft.getGripSpace()},this.getHand=function(tt){let ft=T[tt];return ft===void 0&&(ft=new ya,T[tt]=ft),ft.getHandSpace()};function z(tt){const ft=S.indexOf(tt.inputSource);if(ft===-1)return;const ot=T[ft];ot!==void 0&&(ot.update(tt.inputSource,tt.frame,l||a),ot.dispatchEvent({type:tt.type,data:tt.inputSource}))}function Z(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",X);for(let tt=0;tt<T.length;tt++){const ft=S[tt];ft!==null&&(S[tt]=null,T[tt].disconnect(ft))}J=null,$=null,m.reset();for(const tt in p)delete p[tt];t.setRenderTarget(w),f=null,d=null,u=null,s=null,M=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){r=tt,n.isPresenting===!0&&Nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){o=tt,n.isPresenting===!0&&Nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(tt){l=tt},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(tt){if(s=tt,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",X),b.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,Ut=null,Ft=null;b.depth&&(Ft=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=b.stencil?Ai:Qn,Ut=b.stencil?Gs:kn);const Lt={colorFormat:e.RGBA8,depthFormat:Ft,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Lt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new En(d.textureWidth,d.textureHeight,{format:Sn,type:cn,depthTexture:new cs(d.textureWidth,d.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ot={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new En(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:cn,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),$t.setContext(s),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(tt){for(let ft=0;ft<tt.removed.length;ft++){const ot=tt.removed[ft],Ut=S.indexOf(ot);Ut>=0&&(S[Ut]=null,T[Ut].disconnect(ot))}for(let ft=0;ft<tt.added.length;ft++){const ot=tt.added[ft];let Ut=S.indexOf(ot);if(Ut===-1){for(let Lt=0;Lt<T.length;Lt++)if(Lt>=S.length){S.push(ot),Ut=Lt;break}else if(S[Lt]===null){S[Lt]=ot,Ut=Lt;break}if(Ut===-1)break}const Ft=T[Ut];Ft&&Ft.connect(ot)}}const nt=new R,st=new R;function ut(tt,ft,ot){nt.setFromMatrixPosition(ft.matrixWorld),st.setFromMatrixPosition(ot.matrixWorld);const Ut=nt.distanceTo(st),Ft=ft.projectionMatrix.elements,Lt=ot.projectionMatrix.elements,xe=Ft[14]/(Ft[10]-1),kt=Ft[14]/(Ft[10]+1),se=(Ft[9]+1)/Ft[5],Xt=(Ft[9]-1)/Ft[5],Gt=(Ft[8]-1)/Ft[0],Se=(Lt[8]+1)/Lt[0],Ee=xe*Gt,ye=xe*Se,De=Ut/(-Gt+Se),ce=De*-Gt;if(ft.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(ce),tt.translateZ(De),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert(),Ft[10]===-1)tt.projectionMatrix.copy(ft.projectionMatrix),tt.projectionMatrixInverse.copy(ft.projectionMatrixInverse);else{const _e=xe+De,N=kt+De,Ie=Ee-ce,Zt=ye+(Ut-ce),A=se*kt/N*_e,x=Xt*kt/N*_e;tt.projectionMatrix.makePerspective(Ie,Zt,A,x,_e,N),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}}function dt(tt,ft){ft===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(ft.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(s===null)return;let ft=tt.near,ot=tt.far;m.texture!==null&&(m.depthNear>0&&(ft=m.depthNear),m.depthFar>0&&(ot=m.depthFar)),P.near=D.near=E.near=ft,P.far=D.far=E.far=ot,(J!==P.near||$!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),J=P.near,$=P.far),P.layers.mask=tt.layers.mask|6,E.layers.mask=P.layers.mask&-5,D.layers.mask=P.layers.mask&-3;const Ut=tt.parent,Ft=P.cameras;dt(P,Ut);for(let Lt=0;Lt<Ft.length;Lt++)dt(Ft[Lt],Ut);Ft.length===2?ut(P,E,D):P.projectionMatrix.copy(E.projectionMatrix),St(tt,P,Ut)};function St(tt,ft,ot){ot===null?tt.matrix.copy(ft.matrixWorld):(tt.matrix.copy(ot.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(ft.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(ft.projectionMatrix),tt.projectionMatrixInverse.copy(ft.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=Vs*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(tt){c=tt,d!==null&&(d.fixedFoveation=tt),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=tt)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(P)},this.getCameraTexture=function(tt){return p[tt]};let Wt=null;function re(tt,ft){if(h=ft.getViewerPose(l||a),g=ft,h!==null){const ot=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Ut=!1;ot.length!==P.cameras.length&&(P.cameras.length=0,Ut=!0);for(let kt=0;kt<ot.length;kt++){const se=ot[kt];let Xt=null;if(f!==null)Xt=f.getViewport(se);else{const Se=u.getViewSubImage(d,se);Xt=Se.viewport,kt===0&&(t.setRenderTargetTextures(M,Se.colorTexture,Se.depthStencilTexture),t.setRenderTarget(M))}let Gt=U[kt];Gt===void 0&&(Gt=new sn,Gt.layers.enable(kt),Gt.viewport=new be,U[kt]=Gt),Gt.matrix.fromArray(se.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(se.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(Xt.x,Xt.y,Xt.width,Xt.height),kt===0&&(P.matrix.copy(Gt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Ut===!0&&P.cameras.push(Gt)}const Ft=s.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const kt=u.getDepthInformation(ot[0]);kt&&kt.isValid&&kt.texture&&m.init(kt,s.renderState)}if(Ft&&Ft.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let kt=0;kt<ot.length;kt++){const se=ot[kt].camera;if(se){let Xt=p[se];Xt||(Xt=new Hh,p[se]=Xt);const Gt=u.getCameraImage(se);Xt.sourceTexture=Gt}}}}for(let ot=0;ot<T.length;ot++){const Ut=S[ot],Ft=T[ot];Ut!==null&&Ft!==void 0&&Ft.update(Ut,ft,l||a)}Wt&&Wt(tt,ft),ft.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ft}),g=null}const $t=new Kh;$t.setAnimationLoop(re),this.setAnimationLoop=function(tt){Wt=tt},this.dispose=function(){}}}const cx=new ie,nu=new Ot;nu.set(-1,0,0,0,1,0,0,0,1);function hx(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Wh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,w,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,b,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Je&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Je&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),w=b.envMap,M=b.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(cx.makeRotationFromEuler(M)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(nu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=w*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Je&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ux(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,T){const S=T.program;n.uniformBlockBinding(M,S)}function l(M,T){let S=s[M.id];S===void 0&&(m(M),S=h(M),s[M.id]=S,M.addEventListener("dispose",b));const L=T.program;n.updateUBOMapping(M,L);const _=t.render.frame;r[M.id]!==_&&(d(M),r[M.id]=_)}function h(M){const T=u();M.__bindingPointIndex=T;const S=i.createBuffer(),L=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,L,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,S),S}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const T=s[M.id],S=M.uniforms,L=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,E=S.length;_<E;_++){const D=S[_];if(Array.isArray(D))for(let U=0,P=D.length;U<P;U++)f(D[U],_,U,L);else f(D,_,0,L)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,T,S,L){if(v(M,T,S,L)===!0){const _=M.__offset,E=M.value;if(Array.isArray(E)){let D=0;for(let U=0;U<E.length;U++){const P=E[U],J=p(P);g(P,M.__data,D),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(D+=J.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function g(M,T,S){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,S)}function v(M,T,S,L){const _=M.value,E=T+"_"+S;if(L[E]===void 0)return typeof _=="number"||typeof _=="boolean"?L[E]=_:ArrayBuffer.isView(_)?L[E]=_.slice():L[E]=_.clone(),!0;{const D=L[E];if(typeof _=="number"||typeof _=="boolean"){if(D!==_)return L[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(D.equals(_)===!1)return D.copy(_),!0}}return!1}function m(M){const T=M.uniforms;let S=0;const L=16;for(let E=0,D=T.length;E<D;E++){const U=Array.isArray(T[E])?T[E]:[T[E]];for(let P=0,J=U.length;P<J;P++){const $=U[P],z=Array.isArray($.value)?$.value:[$.value];for(let Z=0,X=z.length;Z<X;Z++){const nt=z[Z],st=p(nt),ut=S%L,dt=ut%st.boundary,St=ut+dt;S+=dt,St!==0&&L-St<st.storage&&(S+=L-St),$.__data=new Float32Array(st.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=S,S+=st.storage}}}const _=S%L;return _>0&&(S+=L-_),M.__size=S,M.__cache={},this}function p(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?Nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):Nt("WebGLRenderer: Unsupported uniform value type.",M),T}function b(M){const T=M.target;T.removeEventListener("dispose",b);const S=a.indexOf(T.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function w(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:c,update:l,dispose:w}}const dx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Dn=null;function fx(){return Dn===null&&(Dn=new Bh(dx,16,16,Li,Jn),Dn.name="DFG_LUT",Dn.minFilter=$e,Dn.magFilter=$e,Dn.wrapS=Yn,Dn.wrapT=Yn,Dn.generateMipmaps=!1,Dn.needsUpdate=!0),Dn}class iu{constructor(t={}){const{canvas:e=md(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=cn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=f,m=new Set([sl,il,nl]),p=new Set([cn,kn,zs,Gs,jo,tl]),b=new Uint32Array(4),w=new Int32Array(4),M=new R;let T=null,S=null;const L=[],_=[];let E=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let U=!1,P=null,J=null,$=null,z=null;this._outputColorSpace=Le;let Z=0,X=0,nt=null,st=-1,ut=null;const dt=new be,St=new be;let Wt=null;const re=new zt(0);let $t=0,tt=e.width,ft=e.height,ot=1,Ut=null,Ft=null;const Lt=new be(0,0,tt,ft),xe=new be(0,0,tt,ft);let kt=!1;const se=new dl;let Xt=!1,Gt=!1;const Se=new ie,Ee=new R,ye=new be,De={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ce=!1;function _e(){return nt===null?ot:1}let N=n;function Ie(y,F){return e.getContext(y,F)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Zo}`),e.addEventListener("webglcontextlost",he,!1),e.addEventListener("webglcontextrestored",pe,!1),e.addEventListener("webglcontextcreationerror",Rn,!1),N===null){const F="webgl2";if(N=Ie(F,y),N===null)throw Ie(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(y){throw Jt("WebGLRenderer: "+y.message),y}let Zt,A,x,k,G,K,ct,pt,Q,j,gt,At,xt,C,B,at,mt,I,it,q,lt,ht,et;function bt(){Zt=new f0(N),Zt.init(),lt=new sx(N,Zt),A=new r0(N,Zt,t,lt),x=new nx(N,Zt),A.reversedDepthBuffer&&d&&x.buffers.depth.setReversed(!0),J=N.createFramebuffer(),$=N.createFramebuffer(),z=N.createFramebuffer(),k=new g0(N),G=new Hg,K=new ix(N,Zt,x,G,A,lt,k),ct=new d0(D),pt=new Mf(N),ht=new i0(N,pt),Q=new p0(N,pt,k,ht),j=new _0(N,Q,pt,ht,k),I=new x0(N,A,K),B=new a0(G),gt=new Gg(D,ct,Zt,A,ht,B),At=new hx(D,G),xt=new Wg,C=new Zg(Zt),mt=new n0(D,ct,x,j,g,c),at=new ex(D,j,A),et=new ux(N,k,A,x),it=new s0(N,Zt,k),q=new m0(N,Zt,k),k.programs=gt.programs,D.capabilities=A,D.extensions=Zt,D.properties=G,D.renderLists=xt,D.shadowMap=at,D.state=x,D.info=k}bt(),v!==cn&&(E=new M0(v,e.width,e.height,o,s,r));const yt=new lx(D,N);this.xr=yt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const y=Zt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Zt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ot},this.setPixelRatio=function(y){y!==void 0&&(ot=y,this.setSize(tt,ft,!1))},this.getSize=function(y){return y.set(tt,ft)},this.setSize=function(y,F,Y=!0){if(yt.isPresenting){Nt("WebGLRenderer: Can't change size while VR device is presenting.");return}tt=y,ft=F,e.width=Math.floor(y*ot),e.height=Math.floor(F*ot),Y===!0&&(e.style.width=y+"px",e.style.height=F+"px"),E!==null&&E.setSize(e.width,e.height),this.setViewport(0,0,y,F)},this.getDrawingBufferSize=function(y){return y.set(tt*ot,ft*ot).floor()},this.setDrawingBufferSize=function(y,F,Y){tt=y,ft=F,ot=Y,e.width=Math.floor(y*Y),e.height=Math.floor(F*Y),this.setViewport(0,0,y,F)},this.setEffects=function(y){if(v===cn){Jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let F=0;F<y.length;F++)if(y[F].isOutputPass===!0){Nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(dt)},this.getViewport=function(y){return y.copy(Lt)},this.setViewport=function(y,F,Y,H){y.isVector4?Lt.set(y.x,y.y,y.z,y.w):Lt.set(y,F,Y,H),x.viewport(dt.copy(Lt).multiplyScalar(ot).round())},this.getScissor=function(y){return y.copy(xe)},this.setScissor=function(y,F,Y,H){y.isVector4?xe.set(y.x,y.y,y.z,y.w):xe.set(y,F,Y,H),x.scissor(St.copy(xe).multiplyScalar(ot).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(y){x.setScissorTest(kt=y)},this.setOpaqueSort=function(y){Ut=y},this.setTransparentSort=function(y){Ft=y},this.getClearColor=function(y){return y.copy(mt.getClearColor())},this.setClearColor=function(){mt.setClearColor(...arguments)},this.getClearAlpha=function(){return mt.getClearAlpha()},this.setClearAlpha=function(){mt.setClearAlpha(...arguments)},this.clear=function(y=!0,F=!0,Y=!0){let H=0;if(y){let V=!1;if(nt!==null){const Mt=nt.texture.format;V=m.has(Mt)}if(V){const Mt=nt.texture.type,wt=p.has(Mt),vt=mt.getClearColor(),Rt=mt.getClearAlpha(),Ct=vt.r,Bt=vt.g,Vt=vt.b;wt?(b[0]=Ct,b[1]=Bt,b[2]=Vt,b[3]=Rt,N.clearBufferuiv(N.COLOR,0,b)):(w[0]=Ct,w[1]=Bt,w[2]=Vt,w[3]=Rt,N.clearBufferiv(N.COLOR,0,w))}else H|=N.COLOR_BUFFER_BIT}F&&(H|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),P=y},this.dispose=function(){e.removeEventListener("webglcontextlost",he,!1),e.removeEventListener("webglcontextrestored",pe,!1),e.removeEventListener("webglcontextcreationerror",Rn,!1),mt.dispose(),xt.dispose(),C.dispose(),G.dispose(),ct.dispose(),j.dispose(),ht.dispose(),et.dispose(),gt.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",Pl),yt.removeEventListener("sessionend",Ll),gi.stop()};function he(y){y.preventDefault(),$r("WebGLRenderer: Context Lost."),U=!0}function pe(){$r("WebGLRenderer: Context Restored."),U=!1;const y=k.autoReset,F=at.enabled,Y=at.autoUpdate,H=at.needsUpdate,V=at.type;bt(),k.autoReset=y,at.enabled=F,at.autoUpdate=Y,at.needsUpdate=H,at.type=V}function Rn(y){Jt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Cn(y){const F=y.target;F.removeEventListener("dispose",Cn),Eu(F)}function Eu(y){wu(y),G.remove(y)}function wu(y){const F=G.get(y).programs;F!==void 0&&(F.forEach(function(Y){gt.releaseProgram(Y)}),y.isShaderMaterial&&gt.releaseShaderCache(y))}this.renderBufferDirect=function(y,F,Y,H,V,Mt){F===null&&(F=De);const wt=V.isMesh&&V.matrixWorld.determinantAffine()<0,vt=Ru(y,F,Y,H,V);x.setMaterial(H,wt);let Rt=Y.index,Ct=1;if(H.wireframe===!0){if(Rt=Q.getWireframeAttribute(Y),Rt===void 0)return;Ct=2}const Bt=Y.drawRange,Vt=Y.attributes.position;let Pt=Bt.start*Ct,le=(Bt.start+Bt.count)*Ct;Mt!==null&&(Pt=Math.max(Pt,Mt.start*Ct),le=Math.min(le,(Mt.start+Mt.count)*Ct)),Rt!==null?(Pt=Math.max(Pt,0),le=Math.min(le,Rt.count)):Vt!=null&&(Pt=Math.max(Pt,0),le=Math.min(le,Vt.count));const Re=le-Pt;if(Re<0||Re===1/0)return;ht.setup(V,H,vt,Y,Rt);let we,ue=it;if(Rt!==null&&(we=pt.get(Rt),ue=q,ue.setIndex(we)),V.isMesh)H.wireframe===!0?(x.setLineWidth(H.wireframeLinewidth*_e()),ue.setMode(N.LINES)):ue.setMode(N.TRIANGLES);else if(V.isLine){let Ve=H.linewidth;Ve===void 0&&(Ve=1),x.setLineWidth(Ve*_e()),V.isLineSegments?ue.setMode(N.LINES):V.isLineLoop?ue.setMode(N.LINE_LOOP):ue.setMode(N.LINE_STRIP)}else V.isPoints?ue.setMode(N.POINTS):V.isSprite&&ue.setMode(N.TRIANGLES);if(V.isBatchedMesh)if(Zt.get("WEBGL_multi_draw"))ue.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Ve=V._multiDrawStarts,Et=V._multiDrawCounts,an=V._multiDrawCount,Qt=Rt?pt.get(Rt).bytesPerElement:1,dn=G.get(H).currentProgram.getUniforms();for(let Pn=0;Pn<an;Pn++)dn.setValue(N,"_gl_DrawID",Pn),ue.render(Ve[Pn]/Qt,Et[Pn])}else if(V.isInstancedMesh)ue.renderInstances(Pt,Re,V.count);else if(Y.isInstancedBufferGeometry){const Ve=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Et=Math.min(Y.instanceCount,Ve);ue.renderInstances(Pt,Re,Et)}else ue.render(Pt,Re)};function Cl(y,F,Y){y.transparent===!0&&y.side===Mn&&y.forceSinglePass===!1?(y.side=Je,y.needsUpdate=!0,$s(y,F,Y),y.side=fi,y.needsUpdate=!0,$s(y,F,Y),y.side=Mn):$s(y,F,Y)}this.compile=function(y,F,Y=null){Y===null&&(Y=y),S=C.get(Y),S.init(F),_.push(S),Y.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(S.pushLight(V),V.castShadow&&S.pushShadow(V))}),y!==Y&&y.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(S.pushLight(V),V.castShadow&&S.pushShadow(V))}),S.setupLights();const H=new Set;return y.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const Mt=V.material;if(Mt)if(Array.isArray(Mt))for(let wt=0;wt<Mt.length;wt++){const vt=Mt[wt];Cl(vt,Y,V),H.add(vt)}else Cl(Mt,Y,V),H.add(Mt)}),S=_.pop(),H},this.compileAsync=function(y,F,Y=null){const H=this.compile(y,F,Y);return new Promise(V=>{function Mt(){if(H.forEach(function(wt){G.get(wt).currentProgram.isReady()&&H.delete(wt)}),H.size===0){V(y);return}setTimeout(Mt,10)}Zt.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let ua=null;function Tu(y){ua&&ua(y)}function Pl(){gi.stop()}function Ll(){gi.start()}const gi=new Kh;gi.setAnimationLoop(Tu),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(y){ua=y,yt.setAnimationLoop(y),y===null?gi.stop():gi.start()},yt.addEventListener("sessionstart",Pl),yt.addEventListener("sessionend",Ll),this.render=function(y,F){if(F!==void 0&&F.isCamera!==!0){Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;P!==null&&P.renderStart(y,F);const Y=yt.enabled===!0&&yt.isPresenting===!0,H=E!==null&&(nt===null||Y)&&E.begin(D,nt);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(F),F=yt.getCamera()),y.isScene===!0&&y.onBeforeRender(D,y,F,nt),S=C.get(y,_.length),S.init(F),S.state.textureUnits=K.getTextureUnits(),_.push(S),Se.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),se.setFromProjectionMatrix(Se,Un,F.reversedDepth),Gt=this.localClippingEnabled,Xt=B.init(this.clippingPlanes,Gt),T=xt.get(y,L.length),T.init(),L.push(T),yt.enabled===!0&&yt.isPresenting===!0){const wt=D.xr.getDepthSensingMesh();wt!==null&&da(wt,F,-1/0,D.sortObjects)}da(y,F,0,D.sortObjects),T.finish(),D.sortObjects===!0&&T.sort(Ut,Ft,F.reversedDepth),ce=yt.enabled===!1||yt.isPresenting===!1||yt.hasDepthSensing()===!1,ce&&mt.addToRenderList(T,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Xt===!0&&B.beginShadows();const V=S.state.shadowsArray;if(at.render(V,y,F),Xt===!0&&B.endShadows(),(H&&E.hasRenderPass())===!1){const wt=T.opaque,vt=T.transmissive;if(S.setupLights(),F.isArrayCamera){const Rt=F.cameras;if(vt.length>0)for(let Ct=0,Bt=Rt.length;Ct<Bt;Ct++){const Vt=Rt[Ct];Il(wt,vt,y,Vt)}ce&&mt.render(y);for(let Ct=0,Bt=Rt.length;Ct<Bt;Ct++){const Vt=Rt[Ct];Dl(T,y,Vt,Vt.viewport)}}else vt.length>0&&Il(wt,vt,y,F),ce&&mt.render(y),Dl(T,y,F)}nt!==null&&X===0&&(K.updateMultisampleRenderTarget(nt),K.updateRenderTargetMipmap(nt)),H&&E.end(D),y.isScene===!0&&y.onAfterRender(D,y,F),ht.resetDefaultState(),st=-1,ut=null,_.pop(),_.length>0?(S=_[_.length-1],K.setTextureUnits(S.state.textureUnits),Xt===!0&&B.setGlobalState(D.clippingPlanes,S.state.camera)):S=null,L.pop(),L.length>0?T=L[L.length-1]:T=null,P!==null&&P.renderEnd()};function da(y,F,Y,H){if(y.visible===!1)return;if(y.layers.test(F.layers)){if(y.isGroup)Y=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(F);else if(y.isLightProbeGrid)S.pushLightProbeGrid(y);else if(y.isLight)S.pushLight(y),y.castShadow&&S.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||se.intersectsSprite(y)){H&&ye.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Se);const wt=j.update(y),vt=y.material;vt.visible&&T.push(y,wt,vt,Y,ye.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||se.intersectsObject(y))){const wt=j.update(y),vt=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),ye.copy(y.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),ye.copy(wt.boundingSphere.center)),ye.applyMatrix4(y.matrixWorld).applyMatrix4(Se)),Array.isArray(vt)){const Rt=wt.groups;for(let Ct=0,Bt=Rt.length;Ct<Bt;Ct++){const Vt=Rt[Ct],Pt=vt[Vt.materialIndex];Pt&&Pt.visible&&T.push(y,wt,Pt,Y,ye.z,Vt)}}else vt.visible&&T.push(y,wt,vt,Y,ye.z,null)}}const Mt=y.children;for(let wt=0,vt=Mt.length;wt<vt;wt++)da(Mt[wt],F,Y,H)}function Dl(y,F,Y,H){const{opaque:V,transmissive:Mt,transparent:wt}=y;S.setupLightsView(Y),Xt===!0&&B.setGlobalState(D.clippingPlanes,Y),H&&x.viewport(dt.copy(H)),V.length>0&&qs(V,F,Y),Mt.length>0&&qs(Mt,F,Y),wt.length>0&&qs(wt,F,Y),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Il(y,F,Y,H){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[H.id]===void 0){const Pt=Zt.has("EXT_color_buffer_half_float")||Zt.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[H.id]=new En(1,1,{generateMipmaps:!0,type:Pt?Jn:cn,minFilter:Ti,samples:Math.max(4,A.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const Mt=S.state.transmissionRenderTarget[H.id],wt=H.viewport||dt;Mt.setSize(wt.z*D.transmissionResolutionScale,wt.w*D.transmissionResolutionScale);const vt=D.getRenderTarget(),Rt=D.getActiveCubeFace(),Ct=D.getActiveMipmapLevel();D.setRenderTarget(Mt),D.getClearColor(re),$t=D.getClearAlpha(),$t<1&&D.setClearColor(16777215,.5),D.clear(),ce&&mt.render(Y);const Bt=D.toneMapping;D.toneMapping=Nn;const Vt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),Xt===!0&&B.setGlobalState(D.clippingPlanes,H),qs(y,Y,H),K.updateMultisampleRenderTarget(Mt),K.updateRenderTargetMipmap(Mt),Zt.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let le=0,Re=F.length;le<Re;le++){const we=F[le],{object:ue,geometry:Ve,material:Et,group:an}=we;if(Et.side===Mn&&ue.layers.test(H.layers)){const Qt=Et.side;Et.side=Je,Et.needsUpdate=!0,Ul(ue,Y,H,Ve,Et,an),Et.side=Qt,Et.needsUpdate=!0,Pt=!0}}Pt===!0&&(K.updateMultisampleRenderTarget(Mt),K.updateRenderTargetMipmap(Mt))}D.setRenderTarget(vt,Rt,Ct),D.setClearColor(re,$t),Vt!==void 0&&(H.viewport=Vt),D.toneMapping=Bt}function qs(y,F,Y){const H=F.isScene===!0?F.overrideMaterial:null;for(let V=0,Mt=y.length;V<Mt;V++){const wt=y[V],{object:vt,geometry:Rt,group:Ct}=wt;let Bt=wt.material;Bt.allowOverride===!0&&H!==null&&(Bt=H),vt.layers.test(Y.layers)&&Ul(vt,F,Y,Rt,Bt,Ct)}}function Ul(y,F,Y,H,V,Mt){y.onBeforeRender(D,F,Y,H,V,Mt),y.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),V.onBeforeRender(D,F,Y,H,y,Mt),V.transparent===!0&&V.side===Mn&&V.forceSinglePass===!1?(V.side=Je,V.needsUpdate=!0,D.renderBufferDirect(Y,F,H,V,y,Mt),V.side=fi,V.needsUpdate=!0,D.renderBufferDirect(Y,F,H,V,y,Mt),V.side=Mn):D.renderBufferDirect(Y,F,H,V,y,Mt),y.onAfterRender(D,F,Y,H,V,Mt)}function $s(y,F,Y){F.isScene!==!0&&(F=De);const H=G.get(y),V=S.state.lights,Mt=S.state.shadowsArray,wt=V.state.version,vt=gt.getParameters(y,V.state,Mt,F,Y,S.state.lightProbeGridArray),Rt=gt.getProgramCacheKey(vt);let Ct=H.programs;H.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?F.environment:null,H.fog=F.fog;const Bt=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;H.envMap=ct.get(y.envMap||H.environment,Bt),H.envMapRotation=H.environment!==null&&y.envMap===null?F.environmentRotation:y.envMapRotation,Ct===void 0&&(y.addEventListener("dispose",Cn),Ct=new Map,H.programs=Ct);let Vt=Ct.get(Rt);if(Vt!==void 0){if(H.currentProgram===Vt&&H.lightsStateVersion===wt)return Fl(y,vt),Vt}else vt.uniforms=gt.getUniforms(y),P!==null&&y.isNodeMaterial&&P.build(y,Y,vt),y.onBeforeCompile(vt,D),Vt=gt.acquireProgram(vt,Rt),Ct.set(Rt,Vt),H.uniforms=vt.uniforms;const Pt=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Pt.clippingPlanes=B.uniform),Fl(y,vt),H.needsLights=Pu(y),H.lightsStateVersion=wt,H.needsLights&&(Pt.ambientLightColor.value=V.state.ambient,Pt.lightProbe.value=V.state.probe,Pt.directionalLights.value=V.state.directional,Pt.directionalLightShadows.value=V.state.directionalShadow,Pt.spotLights.value=V.state.spot,Pt.spotLightShadows.value=V.state.spotShadow,Pt.rectAreaLights.value=V.state.rectArea,Pt.ltc_1.value=V.state.rectAreaLTC1,Pt.ltc_2.value=V.state.rectAreaLTC2,Pt.pointLights.value=V.state.point,Pt.pointLightShadows.value=V.state.pointShadow,Pt.hemisphereLights.value=V.state.hemi,Pt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Pt.spotLightMatrix.value=V.state.spotLightMatrix,Pt.spotLightMap.value=V.state.spotLightMap,Pt.pointShadowMatrix.value=V.state.pointShadowMatrix),H.lightProbeGrid=S.state.lightProbeGridArray.length>0,H.currentProgram=Vt,H.uniformsList=null,Vt}function Nl(y){if(y.uniformsList===null){const F=y.currentProgram.getUniforms();y.uniformsList=Fr.seqWithValue(F.seq,y.uniforms)}return y.uniformsList}function Fl(y,F){const Y=G.get(y);Y.outputColorSpace=F.outputColorSpace,Y.batching=F.batching,Y.batchingColor=F.batchingColor,Y.instancing=F.instancing,Y.instancingColor=F.instancingColor,Y.instancingMorph=F.instancingMorph,Y.skinning=F.skinning,Y.morphTargets=F.morphTargets,Y.morphNormals=F.morphNormals,Y.morphColors=F.morphColors,Y.morphTargetsCount=F.morphTargetsCount,Y.numClippingPlanes=F.numClippingPlanes,Y.numIntersection=F.numClipIntersection,Y.vertexAlphas=F.vertexAlphas,Y.vertexTangents=F.vertexTangents,Y.toneMapping=F.toneMapping}function Au(y,F){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;M.setFromMatrixPosition(F.matrixWorld);for(let Y=0,H=y.length;Y<H;Y++){const V=y[Y];if(V.texture!==null&&V.boundingBox.containsPoint(M))return V}return null}function Ru(y,F,Y,H,V){F.isScene!==!0&&(F=De),K.resetTextureUnits();const Mt=F.fog,wt=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?F.environment:null,vt=nt===null?D.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Kt.workingColorSpace,Rt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Ct=ct.get(H.envMap||wt,Rt),Bt=H.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Vt=!!Y.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pt=!!Y.morphAttributes.position,le=!!Y.morphAttributes.normal,Re=!!Y.morphAttributes.color;let we=Nn;H.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(we=D.toneMapping);const ue=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ve=ue!==void 0?ue.length:0,Et=G.get(H),an=S.state.lights;if(Xt===!0&&(Gt===!0||y!==ut)){const me=y===ut&&H.id===st;B.setState(H,y,me)}let Qt=!1;H.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==an.state.version||Et.outputColorSpace!==vt||V.isBatchedMesh&&Et.batching===!1||!V.isBatchedMesh&&Et.batching===!0||V.isBatchedMesh&&Et.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Et.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Et.instancing===!1||!V.isInstancedMesh&&Et.instancing===!0||V.isSkinnedMesh&&Et.skinning===!1||!V.isSkinnedMesh&&Et.skinning===!0||V.isInstancedMesh&&Et.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Et.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Et.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Et.instancingMorph===!1&&V.morphTexture!==null||Et.envMap!==Ct||H.fog===!0&&Et.fog!==Mt||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==B.numPlanes||Et.numIntersection!==B.numIntersection)||Et.vertexAlphas!==Bt||Et.vertexTangents!==Vt||Et.morphTargets!==Pt||Et.morphNormals!==le||Et.morphColors!==Re||Et.toneMapping!==we||Et.morphTargetsCount!==Ve||!!Et.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(Qt=!0):(Qt=!0,Et.__version=H.version);let dn=Et.currentProgram;Qt===!0&&(dn=$s(H,F,V),P&&H.isNodeMaterial&&P.onUpdateProgram(H,dn,Et));let Pn=!1,ei=!1,Ui=!1;const de=dn.getUniforms(),Ce=Et.uniforms;if(x.useProgram(dn.program)&&(Pn=!0,ei=!0,Ui=!0),H.id!==st&&(st=H.id,ei=!0),Et.needsLights){const me=Au(S.state.lightProbeGridArray,V);Et.lightProbeGrid!==me&&(Et.lightProbeGrid=me,ei=!0)}if(Pn||ut!==y){x.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),de.setValue(N,"projectionMatrix",y.projectionMatrix),de.setValue(N,"viewMatrix",y.matrixWorldInverse);const ii=de.map.cameraPosition;ii!==void 0&&ii.setValue(N,Ee.setFromMatrixPosition(y.matrixWorld)),A.logarithmicDepthBuffer&&de.setValue(N,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&de.setValue(N,"isOrthographic",y.isOrthographicCamera===!0),ut!==y&&(ut=y,ei=!0,Ui=!0)}if(Et.needsLights&&(an.state.directionalShadowMap.length>0&&de.setValue(N,"directionalShadowMap",an.state.directionalShadowMap,K),an.state.spotShadowMap.length>0&&de.setValue(N,"spotShadowMap",an.state.spotShadowMap,K),an.state.pointShadowMap.length>0&&de.setValue(N,"pointShadowMap",an.state.pointShadowMap,K)),V.isSkinnedMesh){de.setOptional(N,V,"bindMatrix"),de.setOptional(N,V,"bindMatrixInverse");const me=V.skeleton;me&&(me.boneTexture===null&&me.computeBoneTexture(),de.setValue(N,"boneTexture",me.boneTexture,K))}V.isBatchedMesh&&(de.setOptional(N,V,"batchingTexture"),de.setValue(N,"batchingTexture",V._matricesTexture,K),de.setOptional(N,V,"batchingIdTexture"),de.setValue(N,"batchingIdTexture",V._indirectTexture,K),de.setOptional(N,V,"batchingColorTexture"),V._colorsTexture!==null&&de.setValue(N,"batchingColorTexture",V._colorsTexture,K));const ni=Y.morphAttributes;if((ni.position!==void 0||ni.normal!==void 0||ni.color!==void 0)&&I.update(V,Y,dn),(ei||Et.receiveShadow!==V.receiveShadow)&&(Et.receiveShadow=V.receiveShadow,de.setValue(N,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&F.environment!==null&&(Ce.envMapIntensity.value=F.environmentIntensity),Ce.dfgLUT!==void 0&&(Ce.dfgLUT.value=fx()),ei){if(de.setValue(N,"toneMappingExposure",D.toneMappingExposure),Et.needsLights&&Cu(Ce,Ui),Mt&&H.fog===!0&&At.refreshFogUniforms(Ce,Mt),At.refreshMaterialUniforms(Ce,H,ot,ft,S.state.transmissionRenderTarget[y.id]),Et.needsLights&&Et.lightProbeGrid){const me=Et.lightProbeGrid;Ce.probesSH.value=me.texture,Ce.probesMin.value.copy(me.boundingBox.min),Ce.probesMax.value.copy(me.boundingBox.max),Ce.probesResolution.value.copy(me.resolution)}Fr.upload(N,Nl(Et),Ce,K)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Fr.upload(N,Nl(Et),Ce,K),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&de.setValue(N,"center",V.center),de.setValue(N,"modelViewMatrix",V.modelViewMatrix),de.setValue(N,"normalMatrix",V.normalMatrix),de.setValue(N,"modelMatrix",V.matrixWorld),H.uniformsGroups!==void 0){const me=H.uniformsGroups;for(let ii=0,Ni=me.length;ii<Ni;ii++){const kl=me[ii];et.update(kl,dn),et.bind(kl,dn)}}return dn}function Cu(y,F){y.ambientLightColor.needsUpdate=F,y.lightProbe.needsUpdate=F,y.directionalLights.needsUpdate=F,y.directionalLightShadows.needsUpdate=F,y.pointLights.needsUpdate=F,y.pointLightShadows.needsUpdate=F,y.spotLights.needsUpdate=F,y.spotLightShadows.needsUpdate=F,y.rectAreaLights.needsUpdate=F,y.hemisphereLights.needsUpdate=F}function Pu(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(y,F,Y){const H=G.get(y);H.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),G.get(y.texture).__webglTexture=F,G.get(y.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:Y,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,F){const Y=G.get(y);Y.__webglFramebuffer=F,Y.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(y,F=0,Y=0){nt=y,Z=F,X=Y;let H=null,V=!1,Mt=!1;if(y){const vt=G.get(y);if(vt.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(N.FRAMEBUFFER,vt.__webglFramebuffer),dt.copy(y.viewport),St.copy(y.scissor),Wt=y.scissorTest,x.viewport(dt),x.scissor(St),x.setScissorTest(Wt),st=-1;return}else if(vt.__webglFramebuffer===void 0)K.setupRenderTarget(y);else if(vt.__hasExternalTextures)K.rebindTextures(y,G.get(y.texture).__webglTexture,G.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Bt=y.depthTexture;if(vt.__boundDepthTexture!==Bt){if(Bt!==null&&G.has(Bt)&&(y.width!==Bt.image.width||y.height!==Bt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(y)}}const Rt=y.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(Mt=!0);const Ct=G.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ct[F])?H=Ct[F][Y]:H=Ct[F],V=!0):y.samples>0&&K.useMultisampledRTT(y)===!1?H=G.get(y).__webglMultisampledFramebuffer:Array.isArray(Ct)?H=Ct[Y]:H=Ct,dt.copy(y.viewport),St.copy(y.scissor),Wt=y.scissorTest}else dt.copy(Lt).multiplyScalar(ot).floor(),St.copy(xe).multiplyScalar(ot).floor(),Wt=kt;if(Y!==0&&(H=J),x.bindFramebuffer(N.FRAMEBUFFER,H)&&x.drawBuffers(y,H),x.viewport(dt),x.scissor(St),x.setScissorTest(Wt),V){const vt=G.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+F,vt.__webglTexture,Y)}else if(Mt){const vt=F;for(let Rt=0;Rt<y.textures.length;Rt++){const Ct=G.get(y.textures[Rt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Rt,Ct.__webglTexture,Y,vt)}}else if(y!==null&&Y!==0){const vt=G.get(y.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,vt.__webglTexture,Y)}st=-1},this.readRenderTargetPixels=function(y,F,Y,H,V,Mt,wt,vt=0){if(!(y&&y.isWebGLRenderTarget)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=G.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&wt!==void 0&&(Rt=Rt[wt]),Rt){x.bindFramebuffer(N.FRAMEBUFFER,Rt);try{const Ct=y.textures[vt],Bt=Ct.format,Vt=Ct.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+vt),!A.textureFormatReadable(Bt)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Vt)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=y.width-H&&Y>=0&&Y<=y.height-V&&N.readPixels(F,Y,H,V,lt.convert(Bt),lt.convert(Vt),Mt)}finally{const Ct=nt!==null?G.get(nt).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(y,F,Y,H,V,Mt,wt,vt=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=G.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&wt!==void 0&&(Rt=Rt[wt]),Rt)if(F>=0&&F<=y.width-H&&Y>=0&&Y<=y.height-V){x.bindFramebuffer(N.FRAMEBUFFER,Rt);const Ct=y.textures[vt],Bt=Ct.format,Vt=Ct.type;if(y.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+vt),!A.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Pt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Pt),N.bufferData(N.PIXEL_PACK_BUFFER,Mt.byteLength,N.STREAM_READ),N.readPixels(F,Y,H,V,lt.convert(Bt),lt.convert(Vt),0);const le=nt!==null?G.get(nt).__webglFramebuffer:null;x.bindFramebuffer(N.FRAMEBUFFER,le);const Re=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await gd(N,Re,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Pt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Mt),N.deleteBuffer(Pt),N.deleteSync(Re),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,F=null,Y=0){const H=Math.pow(2,-Y),V=Math.floor(y.image.width*H),Mt=Math.floor(y.image.height*H),wt=F!==null?F.x:0,vt=F!==null?F.y:0;K.setTexture2D(y,0),N.copyTexSubImage2D(N.TEXTURE_2D,Y,0,0,wt,vt,V,Mt),x.unbindTexture()},this.copyTextureToTexture=function(y,F,Y=null,H=null,V=0,Mt=0){let wt,vt,Rt,Ct,Bt,Vt,Pt,le,Re;const we=y.isCompressedTexture?y.mipmaps[Mt]:y.image;if(Y!==null)wt=Y.max.x-Y.min.x,vt=Y.max.y-Y.min.y,Rt=Y.isBox3?Y.max.z-Y.min.z:1,Ct=Y.min.x,Bt=Y.min.y,Vt=Y.isBox3?Y.min.z:0;else{const Ce=Math.pow(2,-V);wt=Math.floor(we.width*Ce),vt=Math.floor(we.height*Ce),y.isDataArrayTexture?Rt=we.depth:y.isData3DTexture?Rt=Math.floor(we.depth*Ce):Rt=1,Ct=0,Bt=0,Vt=0}H!==null?(Pt=H.x,le=H.y,Re=H.z):(Pt=0,le=0,Re=0);const ue=lt.convert(F.format),Ve=lt.convert(F.type);let Et;F.isData3DTexture?(K.setTexture3D(F,0),Et=N.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(K.setTexture2DArray(F,0),Et=N.TEXTURE_2D_ARRAY):(K.setTexture2D(F,0),Et=N.TEXTURE_2D),x.activeTexture(N.TEXTURE0),x.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,F.flipY),x.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),x.pixelStorei(N.UNPACK_ALIGNMENT,F.unpackAlignment);const an=x.getParameter(N.UNPACK_ROW_LENGTH),Qt=x.getParameter(N.UNPACK_IMAGE_HEIGHT),dn=x.getParameter(N.UNPACK_SKIP_PIXELS),Pn=x.getParameter(N.UNPACK_SKIP_ROWS),ei=x.getParameter(N.UNPACK_SKIP_IMAGES);x.pixelStorei(N.UNPACK_ROW_LENGTH,we.width),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,we.height),x.pixelStorei(N.UNPACK_SKIP_PIXELS,Ct),x.pixelStorei(N.UNPACK_SKIP_ROWS,Bt),x.pixelStorei(N.UNPACK_SKIP_IMAGES,Vt);const Ui=y.isDataArrayTexture||y.isData3DTexture,de=F.isDataArrayTexture||F.isData3DTexture;if(y.isDepthTexture){const Ce=G.get(y),ni=G.get(F),me=G.get(Ce.__renderTarget),ii=G.get(ni.__renderTarget);x.bindFramebuffer(N.READ_FRAMEBUFFER,me.__webglFramebuffer),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,ii.__webglFramebuffer);for(let Ni=0;Ni<Rt;Ni++)Ui&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,G.get(y).__webglTexture,V,Vt+Ni),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,G.get(F).__webglTexture,Mt,Re+Ni)),N.blitFramebuffer(Ct,Bt,wt,vt,Pt,le,wt,vt,N.DEPTH_BUFFER_BIT,N.NEAREST);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(V!==0||y.isRenderTargetTexture||G.has(y)){const Ce=G.get(y),ni=G.get(F);x.bindFramebuffer(N.READ_FRAMEBUFFER,$),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,z);for(let me=0;me<Rt;me++)Ui?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ce.__webglTexture,V,Vt+me):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ce.__webglTexture,V),de?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ni.__webglTexture,Mt,Re+me):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ni.__webglTexture,Mt),V!==0?N.blitFramebuffer(Ct,Bt,wt,vt,Pt,le,wt,vt,N.COLOR_BUFFER_BIT,N.NEAREST):de?N.copyTexSubImage3D(Et,Mt,Pt,le,Re+me,Ct,Bt,wt,vt):N.copyTexSubImage2D(Et,Mt,Pt,le,Ct,Bt,wt,vt);x.bindFramebuffer(N.READ_FRAMEBUFFER,null),x.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else de?y.isDataTexture||y.isData3DTexture?N.texSubImage3D(Et,Mt,Pt,le,Re,wt,vt,Rt,ue,Ve,we.data):F.isCompressedArrayTexture?N.compressedTexSubImage3D(Et,Mt,Pt,le,Re,wt,vt,Rt,ue,we.data):N.texSubImage3D(Et,Mt,Pt,le,Re,wt,vt,Rt,ue,Ve,we):y.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Mt,Pt,le,wt,vt,ue,Ve,we.data):y.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Mt,Pt,le,we.width,we.height,ue,we.data):N.texSubImage2D(N.TEXTURE_2D,Mt,Pt,le,wt,vt,ue,Ve,we);x.pixelStorei(N.UNPACK_ROW_LENGTH,an),x.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Qt),x.pixelStorei(N.UNPACK_SKIP_PIXELS,dn),x.pixelStorei(N.UNPACK_SKIP_ROWS,Pn),x.pixelStorei(N.UNPACK_SKIP_IMAGES,ei),Mt===0&&F.generateMipmaps&&N.generateMipmap(Et),x.unbindTexture()},this.initRenderTarget=function(y){G.get(y).__webglFramebuffer===void 0&&K.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?K.setTextureCube(y,0):y.isData3DTexture?K.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?K.setTexture2DArray(y,0):K.setTexture2D(y,0),x.unbindTexture()},this.resetState=function(){Z=0,X=0,nt=null,x.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}class su extends hl{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const t=new An;t.deleteAttribute("uv");const e=new Pe({side:Je}),n=new Pe,s=new pf(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new ne(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new aa(t,n,6),o=new Fe;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new ne(t,es(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new ne(t,es(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const h=new ne(t,es(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new ne(t,es(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new ne(t,es(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new ne(t,es(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function es(i){return new _l({color:0,emissive:16777215,emissiveIntensity:i})}const Rs=new R;function pn(i,t,e,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;Rs.copy(t),Rs[n]=0,Rs.normalize();const l=.5*a/(a+o),h=1-Rs.angleTo(i)/c;return Math.sign(Rs[e])===1?h*l:o/(a+o)+l+l*(1-h)}class Ys extends An{constructor(t=1,e=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new R,l=new R,h=new R(t,e,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,g=u.length/6,v=new R,m=.5/a;for(let p=0,b=0;p<u.length;p+=3,b+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*m,l.y-=Math.sign(l.y)*m,l.z-=Math.sign(l.z)*m,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*r,u[p+1]=h.y*Math.sign(c.y)+l.y*r,u[p+2]=h.z*Math.sign(c.z)+l.z*r,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/g)){case 0:v.set(1,0,0),f[b+0]=pn(v,l,"z","y",r,n),f[b+1]=1-pn(v,l,"y","z",r,e);break;case 1:v.set(-1,0,0),f[b+0]=1-pn(v,l,"z","y",r,n),f[b+1]=1-pn(v,l,"y","z",r,e);break;case 2:v.set(0,1,0),f[b+0]=1-pn(v,l,"x","z",r,t),f[b+1]=pn(v,l,"z","x",r,n);break;case 3:v.set(0,-1,0),f[b+0]=1-pn(v,l,"x","z",r,t),f[b+1]=1-pn(v,l,"z","x",r,n);break;case 4:v.set(0,0,1),f[b+0]=1-pn(v,l,"x","y",r,t),f[b+1]=1-pn(v,l,"y","x",r,e);break;case 5:v.set(0,0,-1),f[b+0]=pn(v,l,"x","y",r,t),f[b+1]=1-pn(v,l,"y","x",r,e);break}}static fromJSON(t){return new Ys(t.width,t.height,t.depth,t.segments,t.radius)}}function ha(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new Ge;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}c.setIndex(u)}for(const h in r){const u=Yc(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][d]);const g=Yc(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}}return c}function Yc(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new un(a,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const v=h.getComponent(d,g);o.setComponent(d+u,g,v)}}else a.set(h.array,c);c+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const ru={skyTop:3114736,skyBottom:15135743,ground:6076508,fog:14478591};function px(i,t=ru){const e=new iu({antialias:!0,alpha:!1,powerPreference:"high-performance"});e.shadowMap.enabled=!0,e.shadowMap.type=Us,e.outputColorSpace=Le,e.toneMapping=ia,e.toneMappingExposure=1,i.appendChild(e.domElement);const n=new hl;n.fog=new cl(t.fog,55,230);const s=mx(t.skyTop,t.fog);n.add(s);const r=new jr(e);n.environment=r.fromScene(new su,.04).texture,n.environmentIntensity=.45,n.add(new Xh(12574975,16773336,.9));const a=new $h(16773596,3);a.position.set(25,45,18),a.castShadow=!0,a.shadow.mapSize.set(1024,1024);const o=a.shadow.camera;o.left=-18,o.right=18,o.top=18,o.bottom=-18,o.near=1,o.far=140,a.shadow.bias=-4e-4,a.shadow.normalBias=.03,n.add(a,a.target),t.cloudSea&&gx(n),xx(n);const c=a.position.clone();return{renderer:e,scene:n,sun:a,followShadow(l){a.position.copy(l).add(c),a.target.position.copy(l),s.position.copy(l)},setSky(l,h){const u=s.material.uniforms;u.top.value.setHex(l),u.hor.value.setHex(h),n.fog.color.setHex(h)}}}function mx(i,t){const e=new Tn({uniforms:{top:{value:new zt(i)},hor:{value:new zt(t)}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:["uniform vec3 top; uniform vec3 hor; varying vec3 vDir;","void main(){ float k = smoothstep(0.0, 0.55, vDir.y); gl_FragColor = vec4(mix(hor, top, pow(k, 0.8)), 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`),side:Je,depthWrite:!1,fog:!1}),n=new ne(new Ci(420,32,16),e);return n.renderOrder=-1,n.frustumCulled=!1,n}const au=new _l({color:16777215,emissive:14543359,emissiveIntensity:.55});function kr(i,t){const e=new aa(new gl(1,1),au,t.length),n=new ie;t.forEach((s,r)=>e.setMatrixAt(r,n.compose(s.p,new On,new R(s.r,s.r*.75,s.r)))),i.add(e)}function gx(i){const t=new ne(new Xs(8e3,8e3),au);t.rotation.x=-Math.PI/2,t.position.y=ou,i.add(t)}const ou=-40;function qc(i,t,e=!0){const n=[],s=[],r=[],a=(o,c)=>o+Math.random()*(c-o);for(const o of t){if(e)for(let c=0;c<14;c++)n.push({p:new R(o.x+a(-140,140),ou+a(0,4),o.z+a(-20,20)),r:a(9,16)});for(let c=0;c<2;c++){const l=Math.random()<.5?-1:1,h=o.x+l*a(7,18),u=o.y-a(6,14),d=o.z+a(-8,8);for(let f=0;f<3+(Math.random()*2|0);f++)s.push({p:new R(h+a(-2.5,2.5),u+a(-.6,.6),d+a(-1.5,1.5)),r:a(1.6,2.8)})}if(Math.random()<.5){const c=o.x+a(-90,90),l=o.y+a(30,55),h=o.z+a(-30,30);for(let u=0;u<5;u++)r.push({p:new R(c+(u-2)*4.5,l+a(0,2),h+a(0,3)),r:a(4,7)})}}n.length&&kr(i,n),kr(i,s),r.length&&kr(i,r)}function xx(i){const t=[];for(let e=0;e<14;e++){const n=Math.random()*Math.PI*2,s=90+Math.random()*90,r=Math.cos(n)*s,a=Math.sin(n)*s-40,o=30+Math.random()*35,c=4+(Math.random()*4|0);for(let l=0;l<c;l++){const h=4+Math.random()*4;t.push({p:new R(r+(l-c/2)*4.5,o+Math.random()*3-(l===0||l===c-1?1.5:0),a+Math.random()*4),r:h})}}kr(i,t)}const $c=new Map,Kc=new Map;function Me(i,t){const e=`${i.x}|${i.y}|${i.z}`;let n=$c.get(e);if(!n){const a=Math.min(.18,Math.min(i.x,i.y,i.z)*.2);n=new Ys(i.x,i.y,i.z,2,a),$c.set(e,n)}let s=Kc.get(t);s||(s=new Pe({color:t,roughness:.32}),Kc.set(t,s));const r=new ne(n,s);return r.castShadow=r.receiveShadow=!0,r}function Yo(i,t){const e=new Map;for(const n of t){n.updateWorldMatrix(!0,!1);const s=n.geometry.clone().applyMatrix4(n.matrixWorld),r=n.material;e.has(r)||e.set(r,[]),e.get(r).push(s),n.removeFromParent()}for(const[n,s]of e){const r=new ne(ha(s),n);r.castShadow=r.receiveShadow=!0,i.add(r),s.forEach(a=>a.dispose())}}const lu={grass:5423674,rock:9341574,rockDark:7499370,trunk:8014374,leaf:3119685,leafLight:4569176,flower:16769357,tree:"pine"};class cu{constructor(t=lu,e=1234){this.pal=t,this.parts=[],this.colliders=[],this.seed=e}rnd(){return(this.seed=this.seed*16807%2147483647)/2147483647}range(t,e){return t+this.rnd()*(e-t)}box(t,e,n,s,r,a,o,c=0,l=.12,h=!0){const u=new Ys(e,n,s,1,Math.min(l,Math.min(e,n,s)*.3));u.applyMatrix4(new ie().compose(new R(r,a,o),new On().setFromEuler(new wn(0,c,0)),new R(1,1,1))),this.parts.push({geo:u,color:t}),h&&Math.min(e,n,s)>=.2&&(u.computeBoundingBox(),this.colliders.push(u.boundingBox.clone()))}tree(t,e,n,s=1){const r=this.pal;switch(r.tree){case"lolly":{this.box(r.trunk,.25*s,2.2*s,.25*s,t,e+1.1*s,n),this.box(r.leaf,1.6*s,1.6*s,.5*s,t,e+2.9*s,n,this.rnd()*Math.PI,.5*s),this.box(r.leafLight,.9*s,.9*s,.56*s,t,e+2.9*s,n,this.rnd()*Math.PI,.3*s);break}case"dead":{this.box(r.trunk,.5*s,2.4*s,.5*s,t,e+1.2*s,n),this.box(r.trunk,1.2*s,.3*s,.3*s,t+.5*s,e+1.9*s,n,.3),this.box(r.trunk,.3*s,.3*s,1*s,t,e+1.5*s,n-.4*s,.2),this.box(r.leaf,.3*s,.3*s,.3*s,t+1*s,e+2.1*s,n);break}default:this.box(r.trunk,.5*s,1.2*s,.5*s,t,e+.6*s,n),[[2.2,1,1.4],[1.6,.9,2.2],[1,.8,2.9]].forEach(([o,c,l],h)=>{const u=this.rnd()*Math.PI;this.box(r.tree==="snowpine"?r.leaf:h%2?r.leafLight:r.leaf,o*s,c*s,o*s,t,e+l*s,n,u,.15),r.tree==="snowpine"&&this.box(r.leafLight,o*.85*s,.25*s,o*.85*s,t,e+(l+c/2)*s,n,u,.1)})}}island(t,e,n,s,r=!0){const a=this.pal;this.box(a.grass,s,.9,s,t,e-.45,n,0,.3);let o=s*.92,c=e-.9;for(let h=0;h<3+Math.floor(this.rnd()*2);h++){const u=this.range(1.2,2.2);this.box(h%2?a.rock:a.rockDark,o,u,o*this.range(.8,1),t+this.range(-.4,.4),c-u/2,n+this.range(-.4,.4),this.rnd(),.25),c-=u,o*=this.range(.55,.75)}if(!r)return;const l=Math.max(1,Math.floor(s/3));for(let h=0;h<l;h++)this.tree(t+this.range(-s/3,s/3),e,n+this.range(-s/3,s/3),this.range(.8,1.3));for(let h=0;h<l*2;h++)this.box(a.flower,.25,.25,.25,t+this.range(-s/2.3,s/2.3),e+.12,n+this.range(-s/2.3,s/2.3),0,.05,!1)}root(t,e=5){let n=e,s=t.y-1;for(let r=0;r<3;r++){const a=this.range(1,1.8);this.box(r%2?this.pal.rock:this.pal.rockDark,n,a,n,t.x+this.range(-.3,.3),s-a/2,t.z+this.range(-.3,.3),this.rnd()*.5,.25),s-=a,n*=.6}}tower(t,e,n,s){this.box(this.pal.rock,7,46,7,t,e+46/2-10,n,0,.4);for(let a=0;a<16;a++){const o=a*.9,c=5.5;this.box(s[a%s.length],4,.8,3,t+Math.cos(o)*c,e-6+a*2.6,n+Math.sin(o)*c,-o,.2)}this.island(t,e-10,n,14,!0)}flush(t,e){if(e)for(const s of this.colliders)e.add({box:s,kind:"decor"});this.colliders.length=0;const n=new Map;for(const s of this.parts)n.has(s.color)||n.set(s.color,[]),n.get(s.color).push(s.geo);for(const[s,r]of n){const a=new ne(ha(r),new Pe({color:s,roughness:.7}));a.castShadow=!1,a.receiveShadow=!1,t.add(a),r.forEach(o=>o.dispose())}this.parts=[]}}function _x(i,t,e,n,s=1234,r){const a=new cu(e,s);for(const u of t)a.root(u.origin);const o=t.flatMap(u=>u.chain),c=(u,d,f)=>o.every(g=>Math.hypot(Math.max(0,g.min.x-u,u-g.max.x),Math.max(0,g.min.z-d,d-g.max.z))>f/2+5),l=(u,d,f,g)=>{c(u,f,g)&&a.island(u,d,f,g)};for(const u of t){const d=Math.cos(u.yaw),f=-Math.sin(u.yaw);for(const g of[-1,1]){if(a.rnd()<.25)continue;const v=a.range(13,20),m=a.range(30,55);l(u.origin.x+g*d*v,u.origin.y+a.range(-5,3),u.origin.z+g*f*v,a.range(4,7)),a.rnd()<.7&&l(u.origin.x+g*d*m,u.origin.y+a.range(-10,8),u.origin.z+g*f*m,a.range(8,14))}}const h=t[t.length-1];c(h.origin.x+40,h.origin.z-30,20)&&a.tower(h.origin.x+40,h.origin.y,h.origin.z-30,n),a.flush(i,r)}const hu={skin:16175162,shirt:2060256,pants:3453770,shoes:3453770,sleeve:0,hair:"none",face:"smile"},O=.5,Xn=2*O,Cs=2*O,Or=.6*O,Fs=1.2*O,uu=.24*O,qo=.035,Zc=new Map;function di(i,t){let e=Zc.get(i);return e||(e=t(),Zc.set(i,e)),e}const ee=(i,t,e,n)=>di(`b${i}|${t}|${e}|${n}`,()=>new Ys(i,t,e,2,n));function vx(){return di("cylhead",()=>{const i=Or,t=Fs,e=uu,n=[new It(0,-t/2)],s=10;for(let r=0;r<=s;r++){const a=-Math.PI/2+r/s*(Math.PI/2);n.push(new It(i-e+Math.cos(a)*e,-t/2+e+Math.sin(a)*e))}for(let r=0;r<=s;r++){const a=r/s*(Math.PI/2);n.push(new It(i-e+Math.cos(a)*e,t/2-e+Math.sin(a)*e))}return n.push(new It(0,t/2)),new xl(n,48)})}const Jc=new Map;function Mx(i){let t=Jc.get(i);if(t)return t;const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s="#151515";if(n.fillStyle=s,n.strokeStyle=s,n.lineCap="round",n.lineJoin="round",i==="cool")n.beginPath(),n.roundRect(46,84,164,40,14),n.fill(),n.fillStyle="rgba(255,255,255,0.55)",n.fillRect(64,92,30,7);else for(const r of[92,164])n.fillStyle=s,n.beginPath(),n.ellipse(r,100,13,21,0,0,Math.PI*2),n.fill(),n.fillStyle="#fff",n.beginPath(),n.arc(r-4,92,5,0,Math.PI*2),n.fill();return n.fillStyle=s,n.lineWidth=11,n.beginPath(),i==="grin"||i==="happy"?(n.moveTo(80,146),n.quadraticCurveTo(128,214,176,146),n.closePath(),n.fillStyle=i==="grin"?"#fff":"#7a2430",n.fill(),n.stroke()):(n.arc(128,132,46,.22*Math.PI,.78*Math.PI),n.stroke()),t=new mi(e),t.colorSpace=Le,t.anisotropy=4,Jc.set(i,t),t}const Qc=new Map;function yx(i){let t=Qc.get(i);return t||(t=new Pe({color:i,roughness:.45}),Qc.set(i,t)),t}function Yt(i,t,e=0,n=0,s=0){const r=new ne(i,yx(t));return r.position.set(e,n,s),r.castShadow=!0,r}function jc(i,t,e){const n=new Ae,s=O*.97,r=Math.max(0,Math.min(Xn,e));return r<Xn&&n.add(Yt(ee(s,Xn-r,O,qo),i,0,-(Xn-r)/2)),r>0&&n.add(Yt(ee(s,r,O,qo),t,0,-Xn+r/2)),n}function bx(i){const t=new Map;i.updateMatrixWorld(!0),i.traverse(n=>{const s=n;if(!s.isMesh)return;const r=s.geometry.index?s.geometry.toNonIndexed():s.geometry.clone();r.applyMatrix4(s.matrix);for(const o of Object.keys(r.attributes))o!=="position"&&o!=="normal"&&r.deleteAttribute(o);const a=s.material;t.has(a)||t.set(a,[]),t.get(a).push(r)});const e=new Ae;for(const[n,s]of t){const r=new ne(ha(s),n);r.castShadow=!0,e.add(r)}return e}function Sx(i,t,e){const n=new Ae,s=Fs/2;switch(i){case"short":n.add(Yt(ee(1.36*O,.42*O,1.36*O,.18),t,0,s-.02)),n.add(Yt(ee(1.36*O,.7*O,.36*O,.14),t,0,s-.25*O,-.52*O));break;case"spiky":n.add(Yt(ee(1.34*O,.36*O,1.34*O,.16),t,0,s-.02));for(let r=0;r<7;r++){const a=r/7*Math.PI*2,o=Yt(di("spike",()=>new pl(.2*O,.6*O,5)),t,Math.cos(a)*.35*O,s+.3*O,Math.sin(a)*.35*O-.05);o.rotation.set(Math.sin(a)*.5,0,-Math.cos(a)*.5),n.add(o)}break;case"long":n.add(Yt(ee(1.4*O,.44*O,1.4*O,.2),t,0,s-.02)),n.add(Yt(ee(1.42*O,1.9*O,.42*O,.16),t,0,s-.95*O,-.52*O));for(const r of[-.6,.6])n.add(Yt(ee(.24*O,1.1*O,1*O,.1),t,r*O,s-.55*O,-.1*O));break;case"ponytail":n.add(Yt(ee(1.4*O,.44*O,1.4*O,.2),t,0,s-.02)),n.add(Yt(ee(1.42*O,.8*O,.4*O,.14),t,0,s-.35*O,-.52*O)),n.add(Yt(ee(.3*O,.3*O,.3*O,.1),e,0,s+.05*O,-.8*O)),n.add(Yt(ee(.42*O,1.3*O,.42*O,.16),t,0,s-.6*O,-.95*O));break;case"pigtails":n.add(Yt(ee(1.4*O,.44*O,1.4*O,.2),t,0,s-.02)),n.add(Yt(ee(1.42*O,.8*O,.4*O,.14),t,0,s-.35*O,-.52*O));for(const r of[-1,1])n.add(Yt(ee(.3*O,.3*O,.3*O,.1),e,r*.78*O,s-.1*O,-.25*O)),n.add(Yt(ee(.4*O,1.1*O,.4*O,.16),t,r*.95*O,s-.65*O,-.25*O));break;case"bun":n.add(Yt(ee(1.38*O,.42*O,1.38*O,.2),t,0,s-.02)),n.add(Yt(ee(1.4*O,.6*O,.38*O,.14),t,0,s-.25*O,-.52*O)),n.add(Yt(di("bun",()=>new Ci(.4*O,16,10)),t,0,s+.45*O,-.15*O)),n.add(Yt(ee(.7*O,.14*O,.7*O,.05),e,0,s+.18*O,-.15*O));break;case"bob":n.add(Yt(ee(1.44*O,.46*O,1.44*O,.2),t,0,s-.02)),n.add(Yt(ee(1.46*O,1*O,.42*O,.16),t,0,s-.45*O,-.52*O));for(const r of[-.62,.62])n.add(Yt(ee(.26*O,.95*O,1.1*O,.1),t,r*O,s-.42*O,-.05*O));n.add(Yt(ee(1.3*O,.3*O,.2*O,.08),t,0,s-.12*O,.62*O));break;case"bow":n.add(Yt(ee(1.4*O,.44*O,1.4*O,.2),t,0,s-.02)),n.add(Yt(ee(1.42*O,1.9*O,.42*O,.16),t,0,s-.95*O,-.52*O));for(const r of[-.6,.6])n.add(Yt(ee(.24*O,1.1*O,1*O,.1),t,r*O,s-.55*O,-.1*O));for(const r of[-1,1])n.add(Yt(ee(.45*O,.4*O,.2*O,.12),e,r*.32*O,s+.28*O,.1*O));n.add(Yt(ee(.2*O,.22*O,.22*O,.06),e,0,s+.28*O,.1*O));break;case"cap":n.add(Yt(ee(1.4*O,.5*O,1.4*O,.22),e,0,s+.05)),n.add(Yt(ee(1.1*O,.08*O,.7*O,.03),e,0,s-.12*O,.85*O));break;case"beanie":n.add(Yt(di("beanie",()=>new Ci(.72*O,24,12,0,Math.PI*2,0,Math.PI/2)),e,0,s-.12*O)),n.add(Yt(di("pom",()=>new Ci(.18*O,12,8)),e,0,s+.62*O));break}return n}const Ex=new oa(.8,20),wx=(()=>{const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,4,32,32,32);return e.addColorStop(0,"rgba(0,0,0,.45)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new ps({map:new mi(i),transparent:!0,depthWrite:!1})})(),na=class na{constructor(t=hu,e=!1){this.root=new Ae,this.body=new Ae,this.torso=new Ae,this.armL=new Ae,this.armR=new Ae,this.legL=new Ae,this.legR=new Ae,this.head=new Ae,this.state="idle",this.t=Math.random()*10,this.cur={arm:0,leg:0,armUp:0,bob:0,lean:0};const n=t.shoes??2829104,s=t.sleeve??.35;this.root.add(this.body);for(const[l,h]of[[this.legL,-.5*O],[this.legR,.5*O]])l.position.set(h,Xn,0),l.add(jc(t.pants,n,.32*O)),this.body.add(l);this.torso.position.y=Xn,this.body.add(this.torso),this.torso.add(Yt(ee(2*O,Cs,O,qo),t.shirt,0,Cs/2));for(const[l,h]of[[this.armL,-1.5*O],[this.armR,1.5*O]]){l.position.set(h,Cs-.25*O,0);const u=jc(t.shirt,t.skin,Xn*(1-s));u.position.y=.25*O,l.add(u),this.torso.add(l)}this.head.position.y=Cs;const r=.11*O;this.head.add(Yt(di("neck",()=>new Di(.15*O,.15*O,r+.06,20)),t.skin,0,r/2));const a=r+Fs/2;this.head.add(Yt(vx(),t.skin,0,a));const o=new ne(di("face",()=>new Di(Or+.003,Or+.003,Fs-2*uu+.08,32,1,!0,-.85,1.7)),new Pe({map:Mx(t.face??"smile"),transparent:!0,roughness:.5,depthWrite:!1}));o.position.y=a,this.head.add(o);const c=bx(Sx(t.hair??"none",t.hairColor??3810324,t.hat??14168378));if(c.scale.setScalar(Or/(.62*O)),c.position.y=a,this.head.add(c),e){this.root.traverse(h=>{h.castShadow=!1});const l=new ne(Ex,wx);l.rotation.x=-Math.PI/2,l.position.y=.03,l.renderOrder=1,this.root.add(l)}this.torso.add(this.head)}setState(t){this.state=t}update(t,e=1){this.t+=t;const n=this.state,s=1-Math.exp(-t*14),r=this.t*12,a=n==="run"?Math.sin(r)*1.15*e:0,o={arm:n==="run"?a:n==="idle"?Math.sin(this.t*2)*.06:0,leg:n==="run"?a:n==="jump"?.7:n==="fall"?Math.sin(this.t*9)*.4:0,armUp:n==="jump"?2.7:n==="fall"?2.3+Math.sin(this.t*14)*.45:0,bob:n==="run"?Math.abs(Math.cos(r))*.14:n==="idle"?Math.sin(this.t*2)*.015:0,lean:n==="run"?.16*e:n==="fall"?-.15:0},c=this.cur;Object.keys(c).forEach(l=>{c[l]+=(o[l]-c[l])*s}),this.armL.rotation.set(c.arm-c.armUp,0,-c.armUp*.28),this.armR.rotation.set(-c.arm-c.armUp,0,c.armUp*.28),this.legL.rotation.x=-c.leg,this.legR.rotation.x=n==="jump"?-.35:c.leg,this.body.position.y=c.bob,this.torso.rotation.x=c.lean,this.torso.rotation.y=n==="run"?Math.sin(r)*.08:0,this.head.rotation.y=n==="idle"?Math.sin(this.t*.7)*.3:0}};na.HEIGHT=Xn+Cs+.11*O+Fs,na.WIDTH=2*O;let us=na;const Tx=new Set(["KeyW","KeyA","KeyS","KeyD","KeyE","KeyQ","KeyR","KeyF","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","ShiftLeft","ShiftRight","Enter"]),Ax=new Set(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]);class Rx{constructor(t){this.el=t,this.state={move:{x:0,y:0},jump:!1,look:{x:0,y:0},zoom:0,touch:!1},this.keys=new Set,this.touchJump=!1,this.stick=null,this.lookId=null,this.lookLast={x:0,y:0},this.mouseDown=!1,addEventListener("keydown",e=>{Tx.has(e.code)&&(Ax.has(e.code)&&e.preventDefault(),this.keys.add(e.code))}),addEventListener("keyup",e=>this.keys.delete(e.code)),addEventListener("blur",()=>{this.keys.clear(),this.mouseDown=!1}),document.addEventListener("contextmenu",e=>e.preventDefault()),t.addEventListener("mousedown",e=>{this.mouseDown=!0,this.lookLast={x:e.clientX,y:e.clientY}}),addEventListener("mouseup",()=>{this.mouseDown=!1}),addEventListener("mousemove",e=>{this.mouseDown&&(this.state.look.x+=e.clientX-this.lookLast.x,this.state.look.y+=e.clientY-this.lookLast.y,this.lookLast={x:e.clientX,y:e.clientY})}),t.addEventListener("wheel",e=>{e.preventDefault(),this.state.zoom+=Math.sign(e.deltaY)},{passive:!1}),this.ui=document.createElement("div"),this.ui.className="touch-ui",this.base=$a("stick-base"),this.knob=$a("stick-knob"),this.base.appendChild(this.knob),this.jumpBtn=$a("jump-btn"),this.ui.append(this.base,this.jumpBtn),t.appendChild(this.ui),Cx(),t.addEventListener("touchstart",e=>this.onTouch(e,"start"),{passive:!1}),t.addEventListener("touchmove",e=>this.onTouch(e,"move"),{passive:!1}),t.addEventListener("touchend",e=>this.onTouch(e,"end"),{passive:!1}),t.addEventListener("touchcancel",e=>this.onTouch(e,"end"),{passive:!1}),this.layout(),addEventListener("resize",()=>this.layout())}layout(){const t=Ko(),e=xh(Math.round(Math.min(innerWidth,innerHeight)*.2));Object.assign(this.jumpBtn.style,{width:e+"px",height:e+"px",right:t.right+e*.35+"px",bottom:t.bottom+e*.35+"px"});const n=Math.round(e*1.4);Object.assign(this.base.style,{width:n+"px",height:n+"px"}),Object.assign(this.knob.style,{width:n*.45+"px",height:n*.45+"px"})}onTouch(t,e){const n=t.target;if(n!==this.el&&n.tagName!=="CANVAS"&&!this.ui.contains(n))return;t.preventDefault(),this.state.touch||(this.state.touch=!0,this.ui.classList.add("on"));const s=this.jumpBtn.getBoundingClientRect();for(const r of Array.from(t.changedTouches)){const a=r.clientX>=s.left&&r.clientX<=s.right&&r.clientY>=s.top&&r.clientY<=s.bottom;if(e==="start"){if(a){this.touchJump=!0,this.jumpBtn.classList.add("down");continue}r.clientX<innerWidth*.45&&!this.stick?(this.stick={id:r.identifier,ox:r.clientX,oy:r.clientY,x:r.clientX,y:r.clientY},this.base.style.left=r.clientX+"px",this.base.style.top=r.clientY+"px",this.base.classList.add("show")):this.lookId===null&&(this.lookId=r.identifier,this.lookLast={x:r.clientX,y:r.clientY})}else e==="move"?(this.stick&&r.identifier===this.stick.id&&(this.stick.x=r.clientX,this.stick.y=r.clientY),r.identifier===this.lookId&&(this.state.look.x+=(r.clientX-this.lookLast.x)*1.4,this.state.look.y+=(r.clientY-this.lookLast.y)*1.4,this.lookLast={x:r.clientX,y:r.clientY})):(this.stick&&r.identifier===this.stick.id&&(this.stick=null,this.base.classList.remove("show")),r.identifier===this.lookId&&(this.lookId=null),(a||t.touches.length===0)&&(this.touchJump=!1,this.jumpBtn.classList.remove("down")))}}update(){const t=this.keys;let e=(t.has("KeyD")||t.has("ArrowRight")?1:0)-(t.has("KeyA")||t.has("ArrowLeft")?1:0),n=(t.has("KeyW")||t.has("ArrowUp")?1:0)-(t.has("KeyS")||t.has("ArrowDown")?1:0);if(this.stick){const r=parseFloat(this.base.style.width)/2;let a=(this.stick.x-this.stick.ox)/r,o=(this.stick.y-this.stick.oy)/r;const c=Math.hypot(a,o);c>1&&(a/=c,o/=c),this.knob.style.transform=`translate(${a*r*.6}px, ${o*r*.6}px)`,e=a,n=-o}const s=Math.hypot(e,n);s>1&&(e/=s,n/=s),this.state.move.x=e,this.state.move.y=n,this.state.jump=t.has("Space")||this.touchJump}consumeLook(){const t={x:this.state.look.x,y:this.state.look.y,zoom:this.state.zoom};return this.state.look.x=this.state.look.y=this.state.zoom=0,t}}function $a(i){const t=document.createElement("div");return t.className=i,t}let th=!1;function Cx(){if(th)return;th=!0;const i=document.createElement("style");i.textContent=`
.touch-ui{position:absolute;inset:0;pointer-events:none;display:none;z-index:5}
.touch-ui.on{display:block}
.stick-base{position:absolute;transform:translate(-50%,-50%);border-radius:50%;background:rgba(255,255,255,.18);border:3px solid rgba(255,255,255,.55);display:none}
.stick-base.show{display:block}
.stick-knob{position:absolute;left:50%;top:50%;margin:auto;inset:0;border-radius:50%;background:rgba(255,255,255,.85);box-shadow:0 3px 8px rgba(0,0,0,.25)}
.jump-btn{position:absolute;border-radius:50%;background:rgba(255,255,255,.28);border:3px solid rgba(255,255,255,.75);box-shadow:0 4px 10px rgba(0,0,0,.2)}
.jump-btn::after{content:'';position:absolute;left:50%;top:50%;width:34%;height:34%;transform:translate(-50%,-30%) rotate(45deg);border-left:6px solid #fff;border-top:6px solid #fff}
.jump-btn.down{background:rgba(255,255,255,.55);transform:scale(.94)}
`,document.head.appendChild(i)}class Px{constructor(){this.yaw=0,this.pitch=.35,this.dist=11,this.focus=new R,this.first=!0,this.shakeT=0,this.shakeA=0,this.yawGoal=null,this.camera=new sn(65,1,.1,500)}shake(t=.25){this.shakeA=t,this.shakeT=.35}turnTo(t){this.yawGoal=t}rotate(t,e,n){(t||e)&&(this.yawGoal=null),this.yaw-=t*.006,this.pitch=Kr.clamp(this.pitch+e*.005,-.25,1.3),this.dist=Kr.clamp(this.dist*(1+n*.1),5,24)}forward(t){return t.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw))}update(t,e){if(this.yawGoal!==null){let r=this.yawGoal-this.yaw;r=Math.atan2(Math.sin(r),Math.cos(r)),this.yaw+=r*(1-Math.exp(-t*3.5)),Math.abs(r)<.01&&(this.yawGoal=null)}const n=new R(e.x,e.y+2.2,e.z);this.first&&(this.focus.copy(n),this.first=!1),this.focus.x=n.x,this.focus.z=n.z,this.focus.y+=(n.y-this.focus.y)*(1-Math.exp(-t*8));const s=Math.cos(this.pitch);if(this.camera.position.set(this.focus.x+Math.sin(this.yaw)*s*this.dist,this.focus.y+Math.sin(this.pitch)*this.dist,this.focus.z+Math.cos(this.yaw)*s*this.dist),this.camera.lookAt(this.focus),this.shakeT>0){this.shakeT-=t;const r=this.shakeA*Math.max(0,this.shakeT/.35);this.camera.position.x+=(Math.random()-.5)*r,this.camera.position.y+=(Math.random()-.5)*r}}resize(t,e){this.camera.aspect=t/e,this.camera.fov=t<e?80:65,this.camera.updateProjectionMatrix()}}const bi={speed:8,accel:60,airControl:.7,jumpV:13,gravity:34,turn:14},Lx=.12,Dx=.14;class du{constructor(t,e){this.avatar=t,this.collide=e,this.pos=new R,this.vel=new R,this.grounded=!0,this.facing=0,this.jumpHeld=!1,this.sinceGround=0,this.sinceJumpPress=99,this.ground=null,this.touched=[],this.spawn=new R,this.spawnYaw=0}setAvatar(t){this.avatar=t,t.root.position.copy(this.pos),t.root.rotation.y=this.facing}respawn(){this.pos.copy(this.spawn),this.vel.set(0,0,0),this.facing=this.spawnYaw,this.sinceGround=99,this.ground=null,this.touched=[],this.grounded=!1}get yaw(){return this.facing}setSpawn(t,e=this.facing){this.spawn.copy(t),this.spawnYaw=e}update(t,e,n,s){const r=new R(-s.z,0,s.x),a=new R().addScaledVector(s,e.y).addScaledVector(r,e.x).multiplyScalar(bi.speed),o=bi.accel*(this.grounded?1:bi.airControl)*t,c=a.x-this.vel.x,l=a.z-this.vel.z,h=Math.hypot(c,l);if(h>0){const m=Math.min(1,o/h);this.vel.x+=c*m,this.vel.z+=l*m}n&&!this.jumpHeld&&(this.sinceJumpPress=0),this.jumpHeld=n,this.sinceJumpPress+=t,this.sinceGround=this.grounded?0:this.sinceGround+t,this.sinceJumpPress<=Dx&&this.sinceGround<=Lx&&this.vel.y<=.01&&(this.vel.y=bi.jumpV,this.grounded=!1,this.onJump?.(),this.sinceGround=99,this.sinceJumpPress=99),this.vel.y=Math.max(this.vel.y-bi.gravity*t,-45);const u=this.grounded,d=this.vel.y,f=this.collide(this.pos,this.vel,t);this.grounded=f.grounded,!u&&f.grounded&&d<-4&&this.onLand?.(-d),this.ground=f.ground,this.touched=f.touched;const g=Math.hypot(this.vel.x,this.vel.z);if(g>.5){let p=Math.atan2(this.vel.x,this.vel.z)-this.facing;p=Math.atan2(Math.sin(p),Math.cos(p)),this.facing+=p*(1-Math.exp(-t*bi.turn))}const v=this.avatar;v.root.position.copy(this.pos),v.root.rotation.y=this.facing,v.setState(this.grounded?g>.5?"run":"idle":this.vel.y>0?"jump":"fall"),v.update(t,Math.min(1,g/bi.speed))}}const Ye={halfW:.42,height:2.6},Ix=.35,Ux=1/120;class Nx{constructor(){this.solids=[],this.lastGround=new WeakMap,this.cur=[],this.near=new ze,this.body=new ze}add(t){return this.solids.push(t),t}remove(t){const e=this.solids.indexOf(t);e>=0&&this.solids.splice(e,1)}addMesh(t,e){return t.updateMatrixWorld(!0),this.add({box:new ze().setFromObject(t),kind:e})}move(t,e,n,s){const r=Math.hypot(e.x,e.y,e.z)*n+4;this.near.min.set(t.x-r,t.y-r,t.z-r),this.near.max.set(t.x+r,t.y+Ye.height+r,t.z+r),this.cur=[];for(const h of this.solids)h.box.intersectsBox(this.near)&&this.cur.push(h);if(s)for(const h of s)h.box.intersectsBox(this.near)&&this.cur.push(h);const a={grounded:!1,ground:null,touched:[]},o=this.lastGround.get(t);o?.delta&&this.cur.includes(o)&&t.add(o.delta);const c=Math.max(1,Math.ceil(n/Ux)),l=n/c;for(let h=0;h<c;h++)this.step(t,e,l,a);return this.lastGround.set(t,a.ground),a}bodyAt(t){return this.body.set(new R(t.x-Ye.halfW,t.y,t.z-Ye.halfW),new R(t.x+Ye.halfW,t.y+Ye.height,t.z+Ye.halfW))}step(t,e,n,s){for(const r of["x","z"]){t[r]+=e[r]*n;for(const a of this.cur){const o=this.bodyAt(t);if(!Ka(o,a.box))continue;const c=a.box.max.y-t.y;if(c>0&&c<=Ix&&e.y<=0&&this.free(t,c+.001)){t.y+=c+.001;continue}t[r]=e[r]>0?a.box.min[r]-Ye.halfW-1e-4:e[r]<0?a.box.max[r]+Ye.halfW+1e-4:t[r],e[r]=0,s.touched.push(a)}}t.y+=e.y*n;for(const r of this.cur){const a=this.bodyAt(t);Ka(a,r.box)&&(e.y<=0?(t.y=r.box.max.y,s.grounded=!0,s.ground=r):t.y=r.box.min.y-Ye.height-1e-4,e.y=0,s.touched.push(r))}if(!s.grounded&&e.y<=0){const r=this.bodyAt(t).clone();r.min.y-=.02,r.max.y=t.y+.01;for(const a of this.cur)if(r.intersectsBox(a.box)&&a.box.max.y<=t.y+.01){s.grounded=!0,s.ground=a;break}}}free(t,e){const n=this.bodyAt(t.clone().setY(t.y+e));return!this.cur.some(s=>Ka(n,s.box))}}function Ka(i,t){return Za(i,t,"x")>1e-6&&Za(i,t,"y")>1e-6&&Za(i,t,"z")>1e-6}function Za(i,t,e){return Math.min(i.max[e],t.max[e])-Math.max(i.min[e],t.min[e])}function Ws(i,t,e){const n=Math.round(Math.cos(e)),s=Math.round(Math.sin(e));return[i*n+t*s,-i*s+t*n]}const Is=[6,1,6],Te=2,Fx=9345190,kx=3854682;function Ox(i,t,e,n,s={}){const r=[],a=[],o=(s.origin??new R).clone();let c=0,l=0;i.forEach((h,u)=>{const d=nh(u,o.clone(),c,t,e,a);d.def=h,r.push(d);for(const m of h.parts){const[p,b]=Ws(m.p[0],m.p[2],c),w=Math.abs(Math.round(Math.sin(c)))===1,M=w?m.s[2]:m.s[0],T=w?m.s[0]:m.s[2],S=m.c??(s.colors?s.colors[l++%s.colors.length]:15220794),L=Me({x:M,y:m.s[1],z:T},S);L.position.set(o.x+p,o.y+m.p[1],o.z+b),m.kind==="spinner"&&(L.rotation.y=c);const _=m.kind==="spinner"||m.kind==="bumper"||m.kind==="fan";t.add(L);const E=_?null:e.addMesh(L,m.kind),D={...m,move:m.move?{...m.move,d:eh(m.move.d,c)}:void 0,push:m.push?eh(m.push,c):void 0};n&&(m.kind||m.move)&&n.register(D,L,E,c),E&&m.kind!=="lava"&&m.kind!=="door"&&!m.fake&&d.chain.push(E.box),E&&m.kind==="tile"&&d.noCoin.push(E.box),!m.kind&&!m.move&&a.push(L)}const f=h.end??zx(h),[g,v]=Ws(f[0],f[2],c);o.add(new R(g,f[1],v)),h.turn&&(c+=h.turn===-1?Math.PI/2:-Math.PI/2)}),r.push(nh(i.length,o.clone(),c,t,e,a,"finish"));for(let h=0;h<i.length;h++)r[h].chain.push(r[h+1].checkpoint.box);return Yo(t,a),r}const eh=(i,t)=>{const[e,n]=Ws(i[0],i[2],t);return[e,i[1],n]},Bx=new Set(["lava","spinner","door","bumper","fan"]);function zx(i){const t=i.parts.filter(n=>!Bx.has(n.kind??"")&&!n.fake);let e=t[0];for(const n of t)n.p[2]-n.s[2]/2<e.p[2]-e.s[2]/2&&(e=n);return[e.p[0],e.p[1]+e.s[1]/2,e.p[2]-e.s[2]/2-Is[2]/2]}function nh(i,t,e,n,s,r,a="checkpoint"){const o=Me({x:Is[0],y:Is[1],z:Is[2]},a==="finish"?16237596:Fx);o.position.set(t.x,t.y-Is[1]/2,t.z),o.material=o.material.clone(),n.add(o);const c=s.addMesh(o,a);c.stage=i;const l=Gx(a==="finish"?"★":String(i+1)),[h,u]=Ws(-6/2+.4,-6/2+.4,e);l.group.position.set(t.x+h,t.y,t.z+u),n.add(l.group),r.push(l.pole);const[d,f]=Ws(0,1.5,e);return{index:i,checkpoint:c,pad:o,spawn:new R(t.x+d,t.y+.01,t.z+f),origin:t.clone(),chain:[c.box],yaw:Math.PI+e,noCoin:[]}}function Gx(i){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d");e.fillStyle="#ffffff",e.beginPath(),e.roundRect(4,4,120,120,22),e.fill(),e.fillStyle="#1d2a3a",e.font="bold 80px Arial, sans-serif",e.textAlign="center",e.textBaseline="middle",e.fillText(i,64,70);const n=new mi(t);n.colorSpace=Le;const s=new Ae,r=Me({x:.15,y:2.4,z:.15},4475474);r.position.set(0,1.2,0);const a=new ul(new ra({map:n}));return a.scale.set(1.1,1.1,1),a.position.set(0,2.9,0),s.add(r,a),{group:s,pole:r}}function Hx(i){i.pad.material.color.setHex(kx)}const Tt=256;function ti(i,t=Tt){const e=document.createElement("canvas");e.width=e.height=t,i(e.getContext("2d"));const n=new mi(e);return n.colorSpace=Le,n.wrapS=n.wrapT=Gr,n.anisotropy=4,n}function yl(i){const t=[];let e=i;const n=()=>(e=e*16807%2147483647)/2147483647;for(let r=0;r<4;r++)for(let a=0;a<5;a++){const o=1<<r;t.push({fx:Math.round((n()*2-1)*3*o),fy:Math.round((n()*2-1)*3*o),ph:n()*Math.PI*2,a:1/o})}const s=t.reduce((r,a)=>r+a.a,0);return(r,a)=>{let o=0;for(const c of t)o+=c.a*Math.sin((c.fx*r+c.fy*a)*Math.PI*2+c.ph);return .5+.5*(o/s)*1.8}}function fu(i,t){t=Math.min(1,Math.max(0,t));for(let e=1;e<i.length;e++)if(t<=i[e][0]){const[n,s]=i[e-1],[r,a]=i[e],o=(t-n)/(r-n);return[0,1,2].map(c=>s[c]+(a[c]-s[c])*o)}return i[i.length-1][1]}function Vx(i,t){const e=yl(i);return ti(n=>{const s=n.createImageData(Tt,Tt);for(let r=0;r<Tt;r++)for(let a=0;a<Tt;a++){const[o,c,l]=fu(t,e(a/Tt,r/Tt)),h=(r*Tt+a)*4;s.data[h]=o,s.data[h+1]=c,s.data[h+2]=l,s.data[h+3]=255}n.putImageData(s,0,0)})}const Wx=()=>{let i=42;const t=()=>(i=i*16807%2147483647)/2147483647,e=Array.from({length:22},()=>[t(),t()]),n=yl(9);return ti(s=>{const r=s.createImageData(Tt,Tt);for(let a=0;a<Tt;a++)for(let o=0;o<Tt;o++){const c=o/Tt,l=a/Tt;let h=9,u=9;for(const[p,b]of e){const w=Math.min(Math.abs(c-p),1-Math.abs(c-p)),M=Math.min(Math.abs(l-b),1-Math.abs(l-b)),T=Math.hypot(w,M);T<h?(u=h,h=T):T<u&&(u=T)}const d=(u-h)*14+(n(c,l)-.5)*.35,[f,g,v]=fu([[0,[255,250,190]],[.12,[255,205,60]],[.3,[255,120,20]],[.5,[200,55,15]],[.75,[110,28,12]],[1,[70,18,10]]],d),m=(a*Tt+o)*4;r.data[m]=f,r.data[m+1]=g,r.data[m+2]=v,r.data[m+3]=255}s.putImageData(r,0,0)})},Xx=()=>ti(i=>{const t=yl(3),e=Tt/3;for(let n=0;n<3;n++){const s=[0,10,-8][n];for(let r=0;r<e;r++)for(let a=0;a<Tt;a++){const o=Math.sin(r/e*18+t(a/Tt,(n*e+r)/Tt)*9)*.5+.5,c=180+s+o*28;i.fillStyle=`rgb(${c+30},${c-25},${c-95})`,i.fillRect(a,n*e+r,1,1)}i.fillStyle="rgba(90,45,15,.85)",i.fillRect(0,n*e,Tt,4),i.fillStyle="rgba(255,230,180,.35)",i.fillRect(0,n*e+4,Tt,3);for(const r of[26,Tt-26])i.fillStyle="#6d6d72",i.beginPath(),i.arc(r,n*e+e/2,6,0,Math.PI*2),i.fill(),i.fillStyle="#b8b8c0",i.beginPath(),i.arc(r-2,n*e+e/2-2,2.5,0,Math.PI*2),i.fill()}i.strokeStyle="rgba(80,40,12,.9)",i.lineWidth=8,i.strokeRect(4,4,Tt-8,Tt-8)}),Yx=()=>{const i=Vx(5,[[0,[170,215,245]],[.6,[205,235,252]],[1,[245,252,255]]]),t=i.image.getContext("2d");t.strokeStyle="rgba(255,255,255,.7)",t.lineWidth=3;for(let e=0;e<6;e++)t.beginPath(),t.moveTo(e*50-40,0),t.lineTo(e*50+60,Tt),t.stroke();return t.strokeStyle="rgba(80,140,190,.6)",t.lineWidth=1.5,t.beginPath(),t.moveTo(40,60),t.lineTo(95,110),t.lineTo(88,160),t.moveTo(95,110),t.lineTo(150,128),t.stroke(),t.strokeStyle="rgba(255,255,255,.95)",t.lineWidth=10,t.strokeRect(5,5,Tt-10,Tt-10),i.needsUpdate=!0,i},qx=()=>ti(i=>{i.fillStyle="#ff5fae",i.fillRect(0,0,Tt,Tt);for(let t=0;t<8;t++)for(let e=0;e<8;e++){const n=e*32+16,s=t*32+16;i.fillStyle="#ff9bd0",i.beginPath(),i.arc(n,s,8,0,Math.PI*2),i.fill(),i.fillStyle="rgba(255,255,255,.75)",i.beginPath(),i.arc(n-2.5,s-2.5,3,0,Math.PI*2),i.fill()}i.strokeStyle="#ffffff",i.lineWidth=14,i.strokeRect(7,7,Tt-14,Tt-14)}),$x=()=>ti(i=>{i.fillStyle="#ffffff",i.fillRect(0,0,Tt,Tt),i.fillStyle="#e8303a";for(let t=-Tt;t<Tt*2;t+=64)i.beginPath(),i.moveTo(t,0),i.lineTo(t+32,0),i.lineTo(t+32+Tt,Tt),i.lineTo(t+Tt,Tt),i.fill()});function Tr(i,t,e,n=2){const s=i.clone();return s.repeat.set(Math.max(1,Math.round(t/n)),Math.max(1,Math.round(e/n))),s.needsUpdate=!0,s}let Ja=null;function pu(){if(Ja)return Ja;const i=128,t=document.createElement("canvas");t.width=t.height=i;const e=t.getContext("2d"),n=i/2,s=i/2;let r=e.createRadialGradient(n-18,s-22,6,n,s,64);r.addColorStop(0,"#fff3a0"),r.addColorStop(.45,"#ffcf2e"),r.addColorStop(1,"#d98a00"),e.fillStyle=r,e.beginPath(),e.arc(n,s,62,0,Math.PI*2),e.fill(),e.lineWidth=7,e.strokeStyle="#b86f00",e.beginPath(),e.arc(n,s,57,0,Math.PI*2),e.stroke(),e.lineWidth=2.5,e.strokeStyle="rgba(255,248,200,.9)",e.beginPath(),e.arc(n,s,52,Math.PI*.9,Math.PI*1.7),e.stroke();const a=(o,c,l)=>{e.fillStyle=l,e.beginPath(),e.roundRect(n-32+o,s+14+c,64,30,[14,14,4,4]),e.fill(),e.beginPath(),e.roundRect(n-7+o,s+4+c,14,12,3),e.fill(),e.beginPath(),e.roundRect(n-21+o,s-32+c,42,40,13),e.fill()};return e.save(),e.beginPath(),e.arc(n,s,50,0,Math.PI*2),e.clip(),a(2.5,2.5,"#a86200"),r=e.createLinearGradient(0,s-32,0,s+44),r.addColorStop(0,"#ffe680"),r.addColorStop(1,"#f0a800"),a(0,0,r),e.restore(),e.fillStyle="#9a5600",e.beginPath(),e.ellipse(n-8,s-15,3,4.5,0,0,Math.PI*2),e.fill(),e.beginPath(),e.ellipse(n+8,s-15,3,4.5,0,0,Math.PI*2),e.fill(),e.strokeStyle="#9a5600",e.lineWidth=3,e.lineCap="round",e.beginPath(),e.arc(n,s-9,9,.2*Math.PI,.8*Math.PI),e.stroke(),Ja=t,t}const mu=()=>pu().toDataURL("image/png"),Kx=()=>ti(i=>{i.fillStyle="#3a3f4a",i.fillRect(0,0,Tt,Tt),i.fillStyle="#2c3038";for(let t=0;t<Tt;t+=32)i.fillRect(0,t,Tt,4);i.fillStyle="#ffd23a";for(const t of[Tt/4,3*Tt/4])for(const e of[Tt/4,3*Tt/4])i.beginPath(),i.moveTo(t-30,e-18),i.lineTo(t,e+18),i.lineTo(t+30,e-18),i.lineTo(t+16,e-18),i.lineTo(t,e+2),i.lineTo(t-16,e-18),i.closePath(),i.fill();i.strokeStyle="#ffd23a",i.lineWidth=8,i.strokeRect(4,4,Tt-8,Tt-8)}),Zx=i=>ti(t=>{const e="#"+i.toString(16).padStart(6,"0");t.fillStyle=e,t.fillRect(0,0,Tt,Tt),t.fillStyle="rgba(255,255,255,.18)",t.fillRect(28,24,Tt-56,92),t.fillRect(28,136,Tt-56,96),t.strokeStyle="rgba(0,0,0,.25)",t.lineWidth=6,t.strokeRect(28,24,Tt-56,92),t.strokeRect(28,136,Tt-56,96),t.fillStyle="#ffe14d",t.beginPath(),t.arc(Tt-52,132,12,0,Math.PI*2),t.fill(),t.fillStyle="rgba(255,255,255,.9)",t.font="900 64px Rubik, Arial",t.textAlign="center",t.textBaseline="middle",t.lineJoin="round",t.lineWidth=8,t.strokeStyle="rgba(0,0,0,.35)",t.strokeText("?",Tt/2,72),t.fillText("?",Tt/2,72),t.strokeStyle="#ffffff",t.lineWidth=10,t.strokeRect(5,5,Tt-10,Tt-10)}),Jx=()=>ti(i=>{for(let t=0;t<4;t++)for(let e=0;e<4;e++)i.fillStyle=(e+t)%2?"#ff6fb5":"#ffd23a",i.fillRect(e*64,t*64,64,64);i.strokeStyle="#ffffff",i.lineWidth=16,i.strokeRect(8,8,Tt-16,Tt-16)}),Qx=()=>ti(i=>{i.clearRect(0,0,Tt,Tt),i.strokeStyle="rgba(255,255,255,.9)",i.lineWidth=6,i.lineCap="round";for(let t=0;t<9;t++){const e=14+t*28;i.beginPath(),i.moveTo(e,t*37%Tt),i.lineTo(e,t*37%Tt+60),i.stroke()}}),jx=21,t_=.5,e_=3,n_=.12,i_=12;class s_{constructor(t){this.physics=t,this.items=[],this.time=0,this.lavaMats=[],this.belts=[],this.fans=[],this.lavaTex=Wx(),this.tex={ice:Yx(),bounce:qx(),stripe:$x(),tile:Jx()},this.bumpCd=new WeakMap}register(t,e,n,s=0){const[r,a,o]=t.s;switch(t.kind){case"lava":{const c=Tr(this.lavaTex,r,o,3),l=new Pe({map:c,emissiveMap:c,emissive:16777215,emissiveIntensity:.9,roughness:.7});this.lavaMats.push(l),e.material=l;break}case"vanish":e.material=new Pe({map:Tr(this.tex.ice,r,o),roughness:.15,metalness:.05});break;case"bounce":e.material=new Pe({map:Tr(this.tex.bounce,r,o),roughness:.35});break;case"conveyor":{const c=Kx(),l=Math.abs(t.push?.[0]??0)>Math.abs(t.push?.[2]??0);c.repeat.set(Math.max(1,Math.round((l?r:o)/2)),Math.max(1,Math.round((l?o:r)/2))),c.rotation=l?Math.PI/2:0,c.center.set(.5,.5),e.material=new Pe({map:c,roughness:.6}),this.belts.push({tex:c,speed:Math.hypot(...t.push??[0,0,0])/2,sign:Math.sign((t.push?.[2]??0)+(t.push?.[0]??0))});break}case"spinner":{const c=this.tex.stripe.clone();c.repeat.set(Math.round(r/1.2),1),c.needsUpdate=!0,e.material=new Pe({map:c,roughness:.3}),e.castShadow=!0;break}case"door":{e.material=new Pe({map:Zx(t.c??16740277),roughness:.5});break}case"tile":e.material=new Pe({map:Tr(this.tex.tile,r,o),roughness:.4});break;case"bumper":{e.geometry=new Ci(r/2,24,16);const c=this.tex.stripe.clone();c.repeat.set(4,2),c.needsUpdate=!0,e.material=new Pe({map:c,color:t.c??16777215,roughness:.3});break}case"turntable":{e.geometry=new Di(r/2,r/2,a,40);const c=this.tex.stripe.clone();c.repeat.set(8,1),c.needsUpdate=!0,e.material=[new Pe({map:c,roughness:.4}),new Pe({color:t.c??16237596,roughness:.45}),new Pe({color:t.c??16237596})];break}case"fan":{const c=Qx();e.material=new ps({map:c,transparent:!0,opacity:.35,depthWrite:!1,side:Mn}),e.castShadow=!1,this.fans.push(c);break}}this.items.push({def:t,mesh:e,solid:n,base:e.position.clone(),t:0,touchT:0,goneT:0,broken:!1})}tick(t){this.time+=t;for(const e of this.belts)e.tex.offset.y=-this.time*e.speed*e.sign;for(const e of this.fans)e.offset.y=-this.time*1.5;for(const e of this.lavaMats)e.map.offset.set(this.time*.05,Math.sin(this.time*.4)*.08),e.emissiveIntensity=.75+Math.sin(this.time*2.6)*.25;for(const e of this.items){const n=e.def;if(n.move){const s=(1-Math.cos(this.time/n.move.t*Math.PI*2))/2,r=e.base.clone().add(new R(...n.move.d).multiplyScalar(s)),a=r.clone().sub(e.mesh.position);e.mesh.position.copy(r),e.solid&&(e.solid.box.translate(a),e.solid.delta=a)}switch(n.kind){case"bounce":e.t=Math.max(0,e.t-t),e.mesh.scale.y=1-Math.sin(e.t/.35*Math.PI)*.35;break;case"spinner":e.mesh.rotation.y=this.time*(n.spin??1.5);break;case"turntable":e.mesh.rotation.y+=(n.spin??.8)*t;break;case"bumper":e.mesh.rotation.x+=t*2;break;case"vanish":{const s=e.mesh.material;e.goneT>0?(e.goneT-=t,e.goneT<=0&&(e.solid=this.physics.addMesh(e.mesh,"vanish"),e.mesh.visible=!0,s.opacity=1,s.transparent=!1,e.touchT=0)):(e.touchT>0&&(e.touchT+=t),s.transparent=e.touchT>0,s.opacity=e.touchT>0?.55+Math.cos(e.touchT*30)*.3:1,e.touchT>=t_&&e.solid&&(this.physics.remove(e.solid),e.solid=null,e.mesh.visible=!1,e.goneT=e_));break}case"tile":case"door":{e.broken?(n.kind==="tile"&&e.mesh.visible&&(e.mesh.position.y-=t*12,e.mesh.position.y<e.base.y-15&&(e.mesh.visible=!1)),e.goneT-=t,e.goneT<=0&&this.restore(e)):e.touchT>0&&(e.touchT+=t,e.touchT>=n_&&this.breakItem(e));break}}}}breakItem(t){t.broken=!0,t.goneT=i_,t.touchT=0,t.solid&&(this.physics.remove(t.solid),t.solid=null),t.def.kind==="door"&&(t.mesh.visible=!1)}restore(t){t.broken=!1,t.mesh.position.copy(t.base),t.mesh.visible=!0,t.solid=this.physics.addMesh(t.mesh,t.def.kind)}resetAll(){for(const t of this.items)t.broken&&this.restore(t)}affect(t,e){let n=null;const s=Math.max(0,(this.bumpCd.get(t)??0)-e);this.bumpCd.set(t,s);for(const r of this.items){const a=r.def,o=r.solid!==null&&t.ground===r.solid;switch(a.kind){case"conveyor":o&&a.push&&t.pos.add(new R(...a.push).multiplyScalar(e));break;case"lava":(o||r.solid&&t.touched.includes(r.solid))&&(n="kill");break;case"bounce":o&&t.vel.y<=.01&&(t.vel.y=jx,t.grounded=!1,r.t=.35,n=n??"bounce");break;case"vanish":o&&r.touchT===0&&r.goneT<=0&&(r.touchT=1e-4);break;case"spinner":this.hitsSpinner(r,t.pos)&&(n="kill");break;case"door":a.fake&&!r.broken&&r.solid&&(o||t.touched.includes(r.solid))&&(this.breakItem(r),n=n??"break");break;case"tile":a.fake&&!r.broken&&o&&r.touchT===0&&(r.touchT=1e-4);break;case"turntable":if(o){const c=(a.spin??.8)*e,l=r.mesh.position,h=t.pos.x-l.x,u=t.pos.z-l.z;t.pos.x=l.x+h*Math.cos(c)+u*Math.sin(c),t.pos.z=l.z-h*Math.sin(c)+u*Math.cos(c)}break;case"fan":{const c=new R(...a.s).multiplyScalar(.5),l=r.mesh.position,h=t.pos;Math.abs(h.x-l.x)<c.x&&Math.abs(h.z-l.z)<c.z&&h.y+1>l.y-c.y&&h.y<l.y+c.y&&a.push&&(t.pos.x+=a.push[0]*e,t.pos.z+=a.push[2]*e,a.push[1]>0&&(t.vel.y=Math.max(t.vel.y,a.push[1]),t.grounded=!1));break}case"bumper":{if(s>0)break;const c=a.s[0]/2,l=r.mesh.position,h=t.pos.clone();h.y+=1.2;const u=h.clone().sub(l);u.length()<c+.7&&(u.y=0,u.lengthSq()<1e-4&&u.set(1,0,0),u.normalize(),t.vel.set(u.x*13,7,u.z*13),t.grounded=!1,this.bumpCd.set(t,.4),n=n??"bump");break}}}return n}spinnerNear(t,e){for(const n of this.items){if(n.def.kind!=="spinner")continue;const s=t.clone().sub(n.mesh.position).applyAxisAngle(new R(0,1,0),-n.mesh.rotation.y);if(!(Math.abs(s.y)>2)&&Math.abs(s.x)<n.def.s[0]/2&&Math.abs(s.z)<e)return!0}return!1}hitsSpinner(t,e){const n=e.clone().sub(t.mesh.position).applyAxisAngle(new R(0,1,0),-t.mesh.rotation.y),[s,r,a]=t.def.s,o=Ye.halfW*.8;return Math.abs(n.x)<s/2+o&&Math.abs(n.z)<a/2+o&&n.y<r/2&&n.y+Ye.height>-r/2}}const r_=["Kirill_2014","pro_nastya","DimkaYT","SuperMax777","Lizka_kitty","Noob_Master","TimurPlay","sonya.bloxy","Artem_GG","xX_Egor_Xx","Vika_cute","MegaBuilder"],a_=14,o_=.45,l_=25,c_=1,h_=3,Qa=4,Ps=2,u_=[16175162,15845280,14724222,9263675,16767925],ja=[15220794,2782440,3125322,10181072,16742959,1447446,16740277,1483683,16237596],d_=["short","spiky","long","cap","beanie","none"],f_=["smile","grin","happy","cool"],gu=new Pe({color:9427199,emissive:3842303,emissiveIntensity:.35,transparent:!0,opacity:.22,depthWrite:!1,roughness:.3}),p_=new fl({color:16777215,transparent:!0,opacity:.8}),m_=.8,Wn=i=>i[Math.floor(Math.random()*i.length)];function g_(){return{skin:Wn(u_),shirt:Wn(ja),pants:Wn(ja),shoes:Wn([16777215,2236962,15220794]),sleeve:Wn([0,.35,1]),hair:Wn(d_),hairColor:Wn([3810324,1446416,12867100,15254106,7027487]),hat:Wn(ja),face:Wn(f_)}}function x_(i){const t=document.createElement("canvas");t.width=256,t.height=64;const e=t.getContext("2d"),n=Math.min(34,8024/Math.max(1,(e.font="bold 34px Arial, sans-serif",e.measureText(i).width)));e.font=`bold ${n}px Arial, sans-serif`,e.textAlign="center",e.textBaseline="middle",e.lineJoin="round",e.miterLimit=2,e.lineWidth=7,e.strokeStyle="rgba(0,0,0,.65)",e.strokeText(i,128,34),e.fillStyle="#ffffff",e.fillText(i,128,34);const s=new mi(t);s.colorSpace=Le;const r=new ul(new ra({map:s,depthTest:!1,transparent:!0}));return r.scale.set(2.4,.6,1),r.position.y=3.35,r.renderOrder=10,r}let xu=20;class __{constructor(t,e,n,s,r){this.scene=t,this.physics=e,this.skill=n,this.hazards=r,this.stage=0,this.k=0,this.blocks=[],this.clock=0,this.builtFor=-1,this.buildQueue=[],this.buildT=0,this.stuckT=0,this.waitT=Math.random()*3,this.sloppy=!1,this.jump=!1,this.teleports=0,this.falls=0,this.pace=.55+Math.random()*.4,this.lane=(Math.random()<.5?-1:1)*(1.2+Math.random()*.8),this.pushT=0,this.stageT=0,this.col=Math.random()<.5?-Te:Te,this.stages=[],this.hub=null,this.wanderT=0,this.wanderTo=new R,this.avatar=new us(g_(),!0),this.avatar.root.add(x_(s)),t.add(this.avatar.root),this.ctl=new du(this.avatar,(a,o,c)=>e.move(a,o,c,this.blocks.map(l=>l.solid)))}placeAt(t){this.stage=t,this.k=0,this.builtFor=-1,this.buildQueue=[],this.stuckT=0,this.stageT=0;const e=this.stages[t].spawn.clone();e.x+=(Math.random()-.5)*3,e.z+=(Math.random()-.5)*2,this.ctl.setSpawn(e,this.stages[t].yaw),this.ctl.respawn()}update(t,e){this.clock+=t;for(const l of this.blocks)l.mesh.visible=this.ctl.ground===l.solid||this.clock-l.born<.5;if(this.blocks.some(l=>l.dieAt<=this.clock)&&this.clear(this.blocks.filter(l=>l.dieAt<=this.clock)),!this.stages.length){this.wander(t);return}const n=this.stages[this.stage],s=n.chain;this.stage<e-h_&&this.placeAt(Math.max(0,e-1));const r=this.stage>e+c_||this.stage>=this.stages.length-1||this.waitT>0;this.waitT-=t;const a=this.ctl.ground?.box;if(a){const l=s.indexOf(a,this.k);l>this.k&&(this.k=l,this.stuckT=0,this.expireBlocks()),this.k>=s.length-1&&this.nextStage()}let o={x:0,y:0};const c=new R(0,0,-1);if(r&&this.ctl.grounded){this.jump=!1;const l=n.origin,h=this.lane>=0?2.3:-2.3,d=new R(l.x+Math.cos(n.yaw)*h,l.y,l.z-Math.sin(n.yaw)*h).sub(this.ctl.pos);d.y=0,d.length()>.3&&(c.copy(d.normalize()),o={x:0,y:.6})}if(!r&&this.k<s.length-1&&this.stage<this.stages.length-1){const l=s[this.k],h=s[this.k+1],u=this.ctl.ground?.kind,d=ih(l,h),f=h.max.y-l.max.y,g=this.stage*100+this.k,m=!this.physics.solids.some(D=>D.box===l&&D.kind==="bounce")&&(n.def?.blocks??0)>0&&(d>Qa||f>Ps);m&&this.builtFor!==g&&this.ctl.grounded&&this.onBox(l)&&this.planBuild(l,h,d,f,g);const{al:p,la:b}=Ar(this.dirTo(l,h)),w=h.max[b]-h.min[b]>=4&&!m,M=(h.min[b]+h.max[b])/2+(w?this.lane:this.colOff(l,h)),T=new R;if(T[b]=Kr.clamp(M,h.min[b]+.6,h.max[b]-.6),T[p]=Kr.clamp(this.ctl.pos[p],h.min[p]+.8,h.max[p]-.8),T.y=h.max.y,this.buildQueue.length){const D=this.edgePoint(l,h);T.copy(D),this.ctl.pos.distanceTo(D)<.6&&(this.buildT-=t,this.buildT<=0&&(this.addBlock(this.buildQueue.shift()),this.buildT=.45+Math.random()*.3),T.copy(this.ctl.pos))}const S=D=>this.physics.solids.some(U=>U.box===D&&U.delta&&U.delta.lengthSq()>1e-8),L=S(h)||S(l);if(!m&&L&&(d>Qa||f>Ps+.3)&&u!=="bounce"&&this.onBox(l)){const D=this.edgePoint(l,h);T.copy(this.ctl.pos.distanceTo(D)>.5?D:this.ctl.pos)}const _=T.clone().sub(this.ctl.pos);_.y=0;const E=u==="vanish"||u==="tile";if(_.length()>.15&&(c.copy(_.normalize()),o={x:0,y:E?1:this.pace}),this.jump=!1,this.ctl.grounded&&!this.buildQueue.length&&o.y){const D=this.ctl.pos.clone().addScaledVector(c,this.sloppy?1.4:.6),U=ih(new ze(this.ctl.pos.clone().subScalar(.4),this.ctl.pos.clone().addScalar(.4)),h)<1;((this.hazards?.spinnerNear(this.ctl.pos,2.2)??!1)||!this.supported(D)||this.blocked(c)||U&&h.max.y-this.ctl.pos.y>.4)&&(this.jump=!0,this.sloppy=Math.random()>this.skill)}this.stuckT+=t,o.y&&Math.hypot(this.ctl.vel.x,this.ctl.vel.z)<.6?this.pushT+=t:this.pushT=0,this.pushT>.7&&(this.lane=(Math.floor(Math.random()*5)-2)*2,this.pushT=0),this.stageT+=t,(this.stuckT>a_||this.stageT>l_)&&this.nextStage(!0)}this.hazards?.affect(this.ctl,t)==="kill"&&(this.falls++,this.ctl.respawn()),this.ctl.update(t,o,this.jump,c),this.ctl.pos.y<this.ctl.spawn.y-xu&&(this.falls++,this.ctl.respawn(),this.k=0,this.builtFor=-1,this.buildQueue=[])}wander(t){const e=this.hub;if(this.wanderT-=t,this.wanderT<=0){const a=Math.random()*Math.PI*2,o=Math.random()*e.r;this.wanderTo.set(e.c.x+Math.cos(a)*o,e.c.y,e.c.z+Math.sin(a)*o),this.wanderT=2+Math.random()*5}const n=this.wanderTo.clone().sub(this.ctl.pos);n.y=0;const s=n.length()>.6,r=s?n.normalize():new R(0,0,-1);this.ctl.update(t,{x:0,y:s?this.pace*.7:0},Math.random()<.004,r),this.ctl.pos.y<e.c.y-15&&this.toHub(e.c,e.r)}toHub(t,e){this.stages=[],this.hub={c:t,r:e},this.clear([...this.blocks]);const n=Math.random()*Math.PI*2,s=3+Math.random()*(e-3);this.ctl.setSpawn(new R(t.x+Math.cos(n)*s,t.y+.01,t.z+Math.sin(n)*s),Math.random()*6),this.ctl.respawn(),this.wanderT=0}toCourse(t){this.clear([...this.blocks]),this.stages=t,this.placeAt(0),this.waitT=Math.random()<.5?Math.random()*2:4+Math.random()*8}nextStage(t=!1){const e=this.blocks.filter(n=>n.stage===this.stage);this.expireBlocks(),this.stage=Math.min(this.stage+1,this.stages.length-1),this.k=0,this.builtFor=-1,this.buildQueue=[],this.stuckT=0,this.stageT=0,this.waitT=Math.random()<.4?1+Math.random()*4:0,this.ctl.setSpawn(this.stages[this.stage].spawn,this.stages[this.stage].yaw),t&&(this.teleports++,this.clear(e),this.ctl.respawn())}expireBlocks(){for(const t of this.blocks)t.dieAt===1/0&&!this.buildQueue.length&&(t.dieAt=this.clock+m_)}clear(t){for(const e of t){this.scene.remove(e.mesh);const n=this.blocks.indexOf(e);n>=0&&this.blocks.splice(n,1)}}planBuild(t,e,n,s,r){this.builtFor=r;const a=this.dirTo(t,e),o=this.stages[this.stage].origin,c=(v,m)=>m+Math.round((v-m)/Te)*Te,l=this.edgePoint(t,e),h=c(l.x+a.x*Te*.6,o.x),u=c(l.z+a.z*Te*.6,o.z),d=[],{al:f,la:g}=Ar(a);if(s>Ps){const v=Math.ceil(s-Ps),m=new R;m[g]=c((e.min[g]+e.max[g])/2+this.colOff(t,e),o[g]),m[f]=a[f]<0?e.max[f]+Te/2:e.min[f]-Te/2;for(let p=0;p<v;p++)d.push(new R(m.x,t.max.y+.5+p,m.z))}else{const v=Math.ceil((n-Qa)/Te);for(let m=0;m<v;m++)d.push(new R(h+a.x*Te*m,t.max.y-.5,u+a.z*Te*m))}this.buildQueue=d,this.buildT=.6}addBlock(t){const e=Me({x:Te,y:1,z:Te},14263146);e.material=gu,e.castShadow=!1,e.receiveShadow=!1,e.add(new zh(new Vh(new An(Te,1,Te)),p_)),e.position.copy(t),this.scene.add(e),e.updateMatrixWorld(),this.blocks.push({mesh:e,solid:{box:new ze().setFromObject(e),kind:"bot"},stage:this.stage,dieAt:1/0,born:this.clock})}dirTo(t,e){const s=e.min.x>=t.max.x-.01||e.max.x<=t.min.x+.01,r=e.min.z>=t.max.z-.01||e.max.z<=t.min.z+.01,a=t.getCenter(new R),o=e.getCenter(new R),c=o.x-a.x,l=o.z-a.z;return s&&(!r||Math.abs(c)>Math.abs(l))?new R(Math.sign(c),0,0):new R(0,0,Math.sign(l)||-1)}colOff(t,e){const{la:n}=Ar(this.dirTo(t,e));return t.max[n]-t.min[n]>=6&&e.max[n]-e.min[n]>=6?this.col:0}edgePoint(t,e){const n=this.dirTo(t,e),{al:s,la:r}=Ar(n),a=new R(0,t.max.y,0);return a[r]=(t.min[r]+t.max[r])/2+this.colOff(t,e),a[s]=n[s]<0?t.min[s]+.6:t.max[s]-.6,e.max.y-t.max.y>Ps&&(a[s]-=n[s]*Te),a}blocked(t){const e=this.ctl.pos.clone().addScaledVector(t,.75),n=new ze(new R(e.x-.25,e.y+.4,e.z-.25),new R(e.x+.25,e.y+1.4,e.z+.25));return this.physics.solids.some(s=>n.intersectsBox(s.box))||this.blocks.some(s=>n.intersectsBox(s.solid.box))}onBox(t){return this.ctl.ground?.box===t}supported(t){const e=new ze(new R(t.x-.2,t.y-.6,t.z-.2),new R(t.x+.2,t.y+.05,t.z+.2));return this.physics.solids.some(n=>e.intersectsBox(n.box))||this.blocks.some(n=>e.intersectsBox(n.solid.box))}}function v_(i,t,e){const n=e.clone();n.y+=1.6;const s=i.clone();s.y+=1.3;const r=n.clone().sub(t),a=s.clone().sub(t),o=a.dot(r)/r.lengthSq();return o<=.05||o>=.95?!1:a.sub(r.multiplyScalar(o)).length()<1.3}function Ar(i){return i.x!==0?{al:"x",la:"z"}:{al:"z",la:"x"}}function ih(i,t){return Math.hypot(Math.max(0,t.min.x-i.max.x,i.min.x-t.max.x),Math.max(0,t.min.z-i.max.z,i.min.z-t.max.z))}class M_{constructor(t,e,n=6,s){this.list=[];const r=[...r_].sort(()=>Math.random()-.5);for(let a=0;a<n;a++)this.list.push(new __(t,e,.45+Math.random()*.4,r[a%r.length],s))}set fallLimit(t){xu=t}toHub(t,e){for(const n of this.list)n.toHub(t,e)}toCourse(t){for(const e of this.list)e.toCourse(t)}shove(t,e){const n=o_*2;for(let s=0;s<t.length;s++)for(let r=s+1;r<t.length;r++){const a=t[s],o=t[r];if(Math.abs(a.pos.y-o.pos.y)>2.2)continue;const c=o.pos.x-a.pos.x,l=o.pos.z-a.pos.z,h=Math.hypot(c,l);if(h>=n)continue;const u=h>1e-4?c/h:1,d=h>1e-4?l/h:0,f=(n-h)/2;a.pos.x-=u*f,a.pos.z-=d*f,o.pos.x+=u*f,o.pos.z+=d*f;const g=Math.min(1,e*60)*1.5;a.vel.x-=u*g,a.vel.z-=d*g,o.vel.x+=u*g,o.vel.z+=d*g}}update(t,e,n,s,r){this.shove([...r?[r]:[],...this.list.map(a=>a.ctl)],t);for(const a of this.list)a.update(t,e),n&&s&&(a.avatar.root.visible=!v_(a.ctl.pos,n,s))}}const sh="button";let rh=null,ah=0;function y_(){window.__tapOn||(window.__tapOn=!0,addEventListener("pointerup",i=>{if(i.pointerType==="mouse")return;const t=i.target?.closest?.(sh);!t||t.disabled||(rh=t,ah=performance.now(),t.click())},!0),addEventListener("click",i=>{if(!i.isTrusted)return;const t=i.target?.closest?.(sh);t&&t===rh&&performance.now()-ah<800&&(i.stopImmediatePropagation(),i.preventDefault())},!0))}let _u="";const Br=()=>Math.min(innerHeight/540,innerWidth/400),ks=()=>`<img class="coin-ico" src="${_u||(_u=mu())}" alt="">`;class b_{constructor(t){this.toastTimer=0,this.muted=!1,this.skipBtn=null,this.vols={sfx:1,music:1},y_(),S_(),this.root=ge("div","hud"),this.stageEl=ge("div","hud-pill hud-stage");const e=ge("div","hud-bar");this.barFill=ge("i",""),e.appendChild(this.barFill),this.coinsEl=ge("div","hud-pill hud-coins"),this.coinsEl.style.display="none";const n=ge("button","hud-gear");n.textContent="⚙️",n.addEventListener("pointerdown",r=>{r.stopPropagation(),this.openSettings()}),this.settings=ge("div","hud-settings"),this.homeBtn=ge("button","hud-gear hud-home"),this.homeBtn.textContent="🏠",this.homeBtn.style.display="none",this.homeBtn.addEventListener("pointerdown",r=>{r.stopPropagation(),this.onHome?.()}),this.toastEl=ge("div","hud-toast"),this.hintEl=ge("div","hud-hint"),this.overlay=ge("div","hud-overlay"),this.root.append(this.stageEl,e,this.coinsEl,n,this.homeBtn,this.toastEl,this.hintEl),t.append(this.root,this.overlay,this.settings);const s=()=>{const r=Ko(),a=this.root.style;a.setProperty("--u",Br().toFixed(3)+"px"),a.setProperty("--t",r.top+"px"),a.setProperty("--l",r.left+"px"),a.setProperty("--r",r.right+"px"),a.setProperty("--b",r.bottom+"px"),this.overlay.style.setProperty("--u",Br().toFixed(3)+"px")};s(),addEventListener("resize",s)}setStage(t,e){this.stageEl.innerHTML=`<span class="hud-ico hud-flag">🚩</span>${t}`,this.barFill.style.width=Math.round(e*100)+"%"}setCoins(t){this.coinsEl.style.display=t===null?"none":"",t!==null&&(this.coinsEl.innerHTML=`<img class="hud-coinimg" src="${_u||(_u=mu())}" alt="">${t}`)}toast(t,e=1100){this.toastEl.textContent=t,this.toastEl.classList.remove("show"),this.toastEl.offsetWidth,this.toastEl.classList.add("show"),clearTimeout(this.toastTimer),this.toastTimer=window.setTimeout(()=>this.toastEl.classList.remove("show"),e)}hint(t){this.hintEl.textContent=t??"",this.hintEl.classList.toggle("show",!!t)}showHomeButton(t){this.homeBtn.style.display=t?"":"none"}showHud(t){this.root.style.display=t?"":"none"}showSkip(t,e){if(!t){this.skipBtn?.remove(),this.skipBtn=null;return}if(this.skipBtn)return;const n=ge("button","hud-skip");n.textContent=t,n.addEventListener("pointerdown",s=>{s.stopPropagation(),e?.()}),this.root.appendChild(n),this.skipBtn=n}showMenu(t,e){this.overlay.style.visibility="",this.overlay.classList.remove("finish"),this.overlay.innerHTML="";const n=ge("div","hud-menu");n.innerHTML=`<div class="hud-logo"><img src="${rt("./assets/logo.webp","./assets/logo_en.webp")}" alt="" onerror="this.remove()"><div class="l1">${t.title1}</div><div class="l2">${t.title2}</div></div>`,n.querySelector("img").addEventListener("load",r=>r.target.parentElement.classList.add("img"));const s=ge("button","hud-play");if(s.textContent=t.play,s.addEventListener("click",()=>{this.overlay.classList.remove("on"),e()}),n.appendChild(s),t.extra?.length){const r=ge("div","hud-row");for(const a of t.extra){const o=ge("button","hud-sb");o.textContent=a.label,o.style.background=a.color,o.addEventListener("click",a.onClick),r.appendChild(o)}n.appendChild(r)}if(t.sub){const r=ge("div","hud-sub");r.innerHTML=t.sub,n.appendChild(r)}this.overlay.appendChild(n),this.overlay.classList.add("on")}showFinish(t,e){this.overlay.style.visibility="",this.overlay.classList.add("finish"),this.overlay.innerHTML="";const n=ge("div","hud-card");n.innerHTML=`<h2>${t.title}</h2><div class="stars">${"⭐".repeat(t.stars)}${'<span class="off">⭐</span>'.repeat(3-t.stars)}</div><div class="line">${t.line}</div>`;const s=ge("button","hud-play");if(s.textContent=t.next,s.addEventListener("click",()=>{this.overlay.classList.remove("on"),e()}),t.bonus){const r=t.bonus,a=ge("button","hud-play hud-ad");a.textContent=r.label,a.addEventListener("click",async()=>{a.disabled=!0,await r.onClick()?a.remove():a.disabled=!1}),n.appendChild(a)}n.appendChild(s),this.overlay.appendChild(n),this.overlay.classList.add("on")}closeOverlay(){this.overlay.classList.remove("on"),this.overlay.innerHTML=""}hideMenu(){this.overlay.style.visibility="hidden"}get menuOpen(){return this.overlay.classList.contains("on")||this.settings.classList.contains("on")}setVolumes(t,e){this.vols={sfx:t,music:e}}openSettings(){const t=this.settings;t.style.setProperty("--u",Br().toFixed(3)+"px"),t.innerHTML="";const e=ge("div","hud-set-card");e.innerHTML=`<h3>${rt("НАСТРОЙКИ","SETTINGS")}</h3>`;for(const[s,r]of[["sfx",rt("🔊 Звуки","🔊 Sounds")],["music",rt("🎵 Музыка","🎵 Music")]]){const a=ge("label","hud-set-row"),o=ge("span","");o.textContent=r;const c=ge("b","");c.textContent=Math.round(this.vols[s]*100)+"%";const l=ge("input","");l.type="range",l.min="0",l.max="100",l.value=String(Math.round(this.vols[s]*100)),l.addEventListener("input",()=>{const h=+l.value/100;this.vols[s]=h,c.textContent=l.value+"%",this.onVolume?.(s,h)}),a.append(o,l,c),e.appendChild(a)}const n=ge("button","hud-play hud-set-ok");n.textContent=rt("ГОТОВО","DONE"),n.addEventListener("click",()=>t.classList.remove("on")),e.appendChild(n),t.appendChild(e),t.classList.add("on")}}function ge(i,t){const e=document.createElement(i);return t&&(e.className=t),e}let oh=!1;function S_(){if(oh)return;oh=!0;const i=document.createElement("style");i.textContent=`
.hud,.hud-overlay{font-family:Rubik,Arial,sans-serif;color:#fff;-webkit-user-select:none;user-select:none}
.hud{position:absolute;inset:0;pointer-events:none;z-index:7}
.hud-pill{position:absolute;display:flex;align-items:center;gap:calc(var(--u)*8);padding:calc(var(--u)*6) calc(var(--u)*14) calc(var(--u)*6) calc(var(--u)*8);border-radius:calc(var(--u)*14);background:rgba(20,28,40,.72);font-weight:900;font-size:max(13px,min(calc(var(--u)*22),4.4vw));text-shadow:0 2px 0 #0d1520;white-space:nowrap;max-width:calc(100vw - var(--u)*160);overflow:hidden;text-overflow:ellipsis}
.hud-ico{width:calc(var(--u)*34);height:calc(var(--u)*34);border-radius:calc(var(--u)*10);display:grid;place-items:center;font-size:max(13px,calc(var(--u)*20))}
.hud-flag{background:#3ad15a}
.hud-coinimg{width:calc(var(--u)*36);height:calc(var(--u)*36);filter:drop-shadow(0 2px 0 rgba(0,0,0,.35))}
.coin-ico{height:1.15em;width:1.15em;vertical-align:-0.22em;margin:0 .12em}
.hud-stage{left:calc(var(--l) + var(--u)*14);top:calc(var(--t) + var(--u)*12)}
.hud-bar{position:absolute;left:calc(var(--l) + var(--u)*14);top:calc(var(--t) + var(--u)*62);width:calc(var(--u)*230);height:calc(var(--u)*11);border-radius:8px;background:rgba(20,28,40,.6);overflow:hidden;border:2px solid rgba(255,255,255,.65)}
.hud-bar i{display:block;height:100%;width:0;background:linear-gradient(#7cf08f,#2fb04a);transition:width .5s}
.hud-home{top:calc(var(--t) + var(--u)*68) !important}
.hud-gear::before{content:"";position:absolute;inset:-10px}
.hud-sb,.hud-play{position:relative}.hud-sb::before,.hud-play::before{content:"";position:absolute;inset:-8px}
.hud-coins{right:calc(var(--r) + var(--u)*76);top:calc(var(--t) + var(--u)*12)}
.hud-gear{position:absolute;right:calc(var(--r) + var(--u)*14);top:calc(var(--t) + var(--u)*12);width:max(44px,calc(var(--u)*48));height:max(44px,calc(var(--u)*48));border:0;border-radius:calc(var(--u)*14);background:rgba(20,28,40,.72);font-size:max(16px,calc(var(--u)*24));pointer-events:auto;cursor:pointer}
.hud-toast{position:absolute;left:50%;top:22%;transform:translate(-50%,0) scale(.4) rotate(-3deg);opacity:0;font-weight:900;font-size:max(18px,min(calc(var(--u)*46),7vw));color:#ffe14d;text-shadow:0 calc(var(--u)*4) 0 #b05a00,0 0 18px rgba(0,0,0,.35);white-space:nowrap}
.hud-toast.show{animation:hudPop 1.1s ease-out forwards}
@keyframes hudPop{0%{opacity:0;transform:translate(-50%,0) scale(.4) rotate(-3deg)}15%{opacity:1;transform:translate(-50%,0) scale(1.15) rotate(-3deg)}25%{transform:translate(-50%,0) scale(1) rotate(-3deg)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-30%) scale(1) rotate(-3deg)}}
.hud-hint{position:absolute;left:50%;bottom:calc(var(--b) + var(--u)*22);transform:translateX(-50%);max-width:70%;text-align:center;padding:calc(var(--u)*10) calc(var(--u)*20);border-radius:calc(var(--u)*14);background:rgba(20,28,40,.72);font-weight:700;font-size:max(13px,calc(var(--u)*18));opacity:0;visibility:hidden;transition:opacity .4s,visibility 0s .4s}
.hud-hint.show{opacity:1;visibility:visible;transition:opacity .4s}
.hud-settings{position:absolute;inset:0;z-index:25;display:none;align-items:center;justify-content:center;background:rgba(10,20,40,.45);font-family:Rubik,Arial,sans-serif}
.hud-settings.on{display:flex}
.hud-set-card{width:min(86vw,calc(var(--u)*380));padding:calc(var(--u)*18);border-radius:calc(var(--u)*22);background:#fff;color:#1b2433;box-shadow:0 calc(var(--u)*8) 0 #c9d3e3;display:flex;flex-direction:column;gap:calc(var(--u)*14);align-items:stretch}
.hud-set-card h3{margin:0;text-align:center;font-weight:900;font-size:max(18px,calc(var(--u)*26));color:#2a74e8}
.hud-set-row{display:grid;grid-template-columns:auto 1fr auto;gap:calc(var(--u)*10);align-items:center;font-weight:900;font-size:max(14px,calc(var(--u)*17))}
.hud-set-row b{min-width:3.2em;text-align:right}
.hud-set-row input{width:100%;height:max(28px,calc(var(--u)*30));accent-color:#3ad15a;cursor:pointer}
.hud-set-ok{min-width:0 !important;align-self:center;font-size:max(16px,calc(var(--u)*22)) !important;min-height:max(44px,calc(var(--u)*52)) !important}
.hud-overlay{position:absolute;inset:0;z-index:20;display:none;align-items:center;justify-content:center;background:linear-gradient(rgba(30,90,200,.35),rgba(10,20,40,.55))}
.hud-overlay.on{display:flex}
/* карточка финиша: фон не ловит нажатия — 🏠 под ним остаётся рабочей (перекрывал её) */
.hud-overlay.finish{pointer-events:none}.hud-overlay.finish .hud-card{pointer-events:auto}
.hud-menu{display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*18)}
.hud-logo{text-align:center;transform:rotate(-2deg);margin-bottom:calc(var(--u)*10)}
.hud-logo img{display:block;width:min(calc(var(--u)*620),86vw);max-height:38vh;object-fit:contain;filter:drop-shadow(0 calc(var(--u)*8) calc(var(--u)*10) rgba(0,0,0,.35))}.hud-logo:not(.img) img,.hud-logo.img .l1,.hud-logo.img .l2{display:none}
.hud-logo .l1{font-weight:900;font-size:max(18px,min(calc(var(--u)*40),7vw));text-shadow:0 calc(var(--u)*4) 0 #1b3a7a}
.hud-logo .l2{font-weight:900;font-size:max(26px,min(calc(var(--u)*68),11vw));line-height:1;color:#ffd23a;text-shadow:0 calc(var(--u)*6) 0 #b0520a,0 10px 20px rgba(0,0,0,.35)}
.hud-play{min-width:calc(var(--u)*280);min-height:max(48px,calc(var(--u)*80));padding:0 calc(var(--u)*28);border-radius:calc(var(--u)*22);background:linear-gradient(#5ff07a,#22b043);box-shadow:0 calc(var(--u)*8) 0 #137a2c;border:calc(var(--u)*4) solid #fff;color:#fff;font:900 max(20px,calc(var(--u)*40)) Rubik,Arial,sans-serif;text-shadow:0 3px 0 #137a2c;cursor:pointer}
.hud-ad{display:block;margin:calc(var(--u)*6) auto calc(var(--u)*14);background:linear-gradient(#ffd23a,#ff9a1f);box-shadow:0 calc(var(--u)*8) 0 #b0520a;text-shadow:0 3px 0 #b0520a;font-size:max(16px,calc(var(--u)*30))}
.hud-skip{position:absolute;left:50%;top:calc(var(--u)*120 + env(safe-area-inset-top));transform:translateX(-50%);pointer-events:auto;padding:calc(var(--u)*10) calc(var(--u)*22);min-height:44px;border:calc(var(--u)*3) solid #fff;border-radius:calc(var(--u)*16);background:linear-gradient(#ffd23a,#ff9a1f);box-shadow:0 calc(var(--u)*5) 0 #b0520a;color:#fff;font:900 max(15px,calc(var(--u)*22)) Rubik,Arial,sans-serif;text-shadow:0 2px 0 #b0520a;cursor:pointer;white-space:nowrap}
.hud-play:active{transform:translateY(calc(var(--u)*4));box-shadow:0 calc(var(--u)*4) 0 #137a2c}
.hud-row{display:flex;align-items:stretch;gap:calc(var(--u)*14);flex-wrap:wrap;justify-content:center}
.hud-sb{display:inline-flex;align-items:center;justify-content:center;gap:calc(var(--u)*8);line-height:1;min-width:calc(var(--u)*150);height:max(44px,calc(var(--u)*60));padding:calc(var(--u)*12) calc(var(--u)*20);border-radius:calc(var(--u)*18);border:3px solid #fff;color:#fff;font:900 max(14px,calc(var(--u)*20)) Rubik,Arial,sans-serif;box-shadow:0 calc(var(--u)*6) 0 rgba(0,0,0,.3);cursor:pointer}
.hud-sub{font-weight:700;font-size:max(13px,calc(var(--u)*18))}
.hud-card{width:min(92vw,calc(var(--u)*440));padding:calc(var(--u)*24);border-radius:calc(var(--u)*26);background:#fff;color:#1b2433;text-align:center;box-shadow:0 calc(var(--u)*10) 0 #c9d3e3,0 20px 40px rgba(0,0,0,.35);display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*10)}
.hud-card h2{font-weight:900;font-size:max(20px,min(calc(var(--u)*40),8vw));color:#ff9a1f;text-shadow:0 3px 0 #c55a00}
.hud-card .stars{font-size:max(26px,calc(var(--u)*46))}
.hud-card .stars .off{filter:grayscale(1) opacity(.35)}
.hud-card .line{font-weight:700;font-size:max(13px,calc(var(--u)*18))}
`,document.head.appendChild(i)}class E_{constructor(t,e){if(this.extra=e,this.box=null,this.frames=0,this.acc=0,this.worst=0,this.hitches=0,this.worstAge=0,!Lu("fps"))return;const n=document.createElement("div");n.style.cssText="position:absolute;left:calc(env(safe-area-inset-left) + 14px);top:calc(env(safe-area-inset-top) + 15.5vh);z-index:8;padding:3px 8px;border-radius:8px;background:rgba(0,0,0,.55);color:#fff;font:700 12px/1.35 monospace;pointer-events:none;white-space:pre",t.appendChild(n),this.box=n}frame(t){if(this.box&&(this.frames++,this.acc+=t,this.worst=Math.max(this.worst,t),t>.05&&this.hitches++,this.acc>=.5)){const e=this.frames/this.acc,n=e>=50?"#7cf08f":e>=30?"#ffe14d":"#ff6b6b";this.box.innerHTML=`<span style="color:${n}">FPS ${e.toFixed(0)}</span>  кадр макс ${(this.worst*1e3).toFixed(0)} мс
рывков ${this.hitches}  DPR ${Du()}${this.extra?"  "+this.extra():""}`,this.frames=0,this.acc=0,this.worstAge+=.5,this.worstAge>=2&&(this.worst=0,this.worstAge=0)}}}const w_=["jump","land","click","denied","place","remove","bounce","lava","checkpoint","coin","finish","respawn"],T_={land:.45,jump:.55,click:.6,finish:.8,coin:.5},A_=(()=>{try{return!!document.createElement("audio").canPlayType("audio/ogg; codecs=opus")}catch{return!1}})(),Bs=class Bs{constructor(){this.ctx=null,this.master=null,this.buffers=new Map,this.last=new Map,this.musicGain=null,this.sfxGain=null,this.sfxVol=1,this.musicVol=1,this.lastTrack=-1,this.musicOn=!1}async load(){try{this.ctx=new AudioContext,this.master=this.ctx.createGain(),this.master.connect(this.ctx.destination),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=this.sfxVol,this.sfxGain.connect(this.master)}catch{return}nn.audio.setHandlers({onSuspend:()=>{this.master&&(this.master.gain.value=0),this.ctx?.suspend()},onResume:()=>{this.master&&(this.master.gain.value=1),this.ctx?.resume()}});const t=()=>{this.ctx?.resume()};addEventListener("pointerdown",t,{once:!1,passive:!0}),addEventListener("keydown",t,{passive:!0}),await Promise.all(w_.map(async e=>{try{const n=await fetch(`./assets/sfx/${e}.mp3`),s=await this.ctx.decodeAudioData(await n.arrayBuffer());this.buffers.set(e,s)}catch{}}))}play(t,e=.06,n=1){const s=this.ctx,r=this.buffers.get(t);if(!s||!r||!this.master||s.state!=="running")return;const a=s.currentTime;if(a-(this.last.get(t)??-1)<.06)return;this.last.set(t,a);const o=s.createBufferSource();o.buffer=r,o.playbackRate.value=1+(Math.random()*2-1)*e;const c=s.createGain();c.gain.value=(T_[t]??1)*n,o.connect(c).connect(this.sfxGain??this.master),o.start()}setMuted(t){nn.audio.setMuted(t)}setSfxVolume(t){this.sfxVol=t,this.sfxGain&&(this.sfxGain.gain.value=t)}setMusicVolume(t){this.musicVol=t,this.musicGain&&(this.musicGain.gain.value=t*Bs.MUSIC_BASE)}async startMusic(t=6){!this.ctx||!this.master||this.musicOn||!A_||(this.musicOn=!0,this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=this.musicVol*Bs.MUSIC_BASE,this.musicGain.connect(this.master),this.nextTrack(t))}async nextTrack(t){const e=this.ctx;let n=Math.floor(Math.random()*t);t>1&&n===this.lastTrack&&(n=(n+1)%t),this.lastTrack=n;try{const s=await fetch(`./assets/music/music${n+1}.ogg`);if(!s.ok)throw new Error("нет трека");const r=await e.decodeAudioData(await s.arrayBuffer()),a=e.createBufferSource();a.buffer=r,a.connect(this.musicGain),a.onended=()=>void this.nextTrack(t),a.start()}catch{t>1&&setTimeout(()=>void this.nextTrack(t),3e4)}}};Bs.MUSIC_BASE=.256;let $o=Bs;const te=new $o,lh=.55,R_=1.3;class C_{constructor(t,e,n=[]){this.pos=[],this.taken=[],this.t=0,this.m=new ie,this.q=new On,this.s=new R,this.up=new R(0,1,0),this.at=new R,this.pick=R_;for(const c of e){const l=c.chain;for(let h=1;h<l.length-1;h++){const u=l[h];c.noCoin.includes(u)||this.pos.push(new R((u.min.x+u.max.x)/2,u.max.y+1.1,(u.min.z+u.max.z)/2))}for(let h=0;h<l.length-1;h++){const u=l[h],d=l[h+1];if(c.noCoin.includes(u)||c.noCoin.includes(d))continue;const f=Math.max(0,d.min.x-u.max.x,u.min.x-d.max.x),g=Math.max(0,d.min.z-u.max.z,u.min.z-d.max.z);if(Math.max(f,g)>3){const v=u.getCenter(new R),m=d.getCenter(new R);this.pos.push(new R((v.x+m.x)/2,Math.max(u.max.y,d.max.y)+1.6,(v.z+m.z)/2))}}}this.pos.push(...n);const s=new Di(lh,lh,.12,20);s.rotateX(Math.PI/2);const r=new Pe({color:15902976,emissive:10117632,emissiveIntensity:.3,metalness:.5,roughness:.35}),a=new mi(pu());a.colorSpace=Le,a.anisotropy=4;const o=new Pe({map:a,emissive:16777215,emissiveMap:a,emissiveIntensity:.25,metalness:.3,roughness:.4});this.mesh=new aa(s,[r,o,o],this.pos.length),this.mesh.castShadow=!0,t.add(this.mesh),this.reset(),this.mesh.computeBoundingSphere(),this.mesh.boundingSphere.radius+=2}get total(){return this.pos.length}reset(){this.taken=this.pos.map(()=>!1),this.update(0,null)}update(t,e){const n=this.pick;this.t+=t;let s=0;this.q.setFromAxisAngle(this.up,this.t*3);for(let r=0;r<this.pos.length;r++){const a=this.pos[r];!this.taken[r]&&e&&Math.abs(e.x-a.x)<n&&Math.abs(e.z-a.z)<n&&e.y+1.3>a.y-n&&e.y+1.3<a.y+n&&(this.taken[r]=!0,s++),this.s.setScalar(this.taken[r]?0:1);const o=Math.sin(this.t*2.5+r)*.12;this.m.compose(this.at.set(a.x,a.y+o,a.z),this.q,this.s),this.mesh.setMatrixAt(r,this.m)}return this.mesh.instanceMatrix.needsUpdate=!0,s}}const mn=256,ch={dust:{n:10,colors:[16777215,15263976,14078148],speed:[1.5,3],up:[.5,1.5],size:[.12,.22],life:[.35,.6],grav:4,spread:1},confetti:{n:40,colors:[15220794,16237596,3125322,2782440,10181072,16740277],speed:[2,6],up:[6,11],size:[.12,.2],life:[1.2,1.8],grav:14,spread:1},coin:{n:10,colors:[16765498,16774048,16758784],speed:[1.5,3.5],up:[2,4],size:[.08,.14],life:[.35,.55],grav:6,spread:1},wood:{n:8,colors:[13141834,14723178,9065768],speed:[1,2.5],up:[1,2.5],size:[.1,.18],life:[.3,.5],grav:10,spread:1},lava:{n:16,colors:[16734751,16761402,8002056],speed:[1.5,4],up:[3,7],size:[.12,.22],life:[.5,.9],grav:12,spread:1},trail:{n:2,colors:[16777215],speed:[.2,.6],up:[.3,.9],size:[.12,.2],life:[.45,.7],grav:0,spread:1},poof:{n:14,colors:[16777215,14674687],speed:[1,2.2],up:[.5,2],size:[.2,.35],life:[.4,.7],grav:-1,spread:1}};class P_{constructor(t){this.p=new Float32Array(mn*3),this.v=new Float32Array(mn*3),this.life=new Float32Array(mn),this.max=new Float32Array(mn),this.size=new Float32Array(mn),this.grav=new Float32Array(mn),this.spin=new Float32Array(mn),this.next=0,this.m=new ie,this.q=new On,this.e=new wn,this.s=new R,this.t=new R,this.c=new zt,this.mesh=new aa(new An(1,1,1),new _l({color:16777215}),mn),this.mesh.frustumCulled=!1,this.mesh.castShadow=!1,this.mesh.instanceColor=new Vo(new Float32Array(mn*3).fill(1),3);for(let e=0;e<mn;e++)this.mesh.setMatrixAt(e,this.m.makeScale(0,0,0));t.add(this.mesh)}emit(t,e,n=1,s){const r=s?.length?{...ch[t],colors:s}:ch[t],a=Math.round(r.n*n),o=c=>c[0]+Math.random()*(c[1]-c[0]);for(let c=0;c<a;c++){const l=this.next;this.next=(this.next+1)%mn;const h=Math.random()*Math.PI*2,u=o(r.speed);this.p[l*3]=e.x,this.p[l*3+1]=e.y,this.p[l*3+2]=e.z,this.v[l*3]=Math.cos(h)*u,this.v[l*3+1]=o(r.up),this.v[l*3+2]=Math.sin(h)*u,this.life[l]=this.max[l]=o(r.life),this.size[l]=o(r.size),this.grav[l]=r.grav,this.spin[l]=(Math.random()-.5)*12,this.mesh.setColorAt(l,this.c.setHex(r.colors[Math.random()*r.colors.length|0]))}this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}update(t){let e=!1;for(let n=0;n<mn;n++){if(this.life[n]<=0)continue;e=!0,this.life[n]-=t;const s=n*3;this.v[s+1]-=this.grav[n]*t;const r=1-Math.min(1,t*2.5);this.v[s]*=r,this.v[s+2]*=r,this.p[s]+=this.v[s]*t,this.p[s+1]+=this.v[s+1]*t,this.p[s+2]+=this.v[s+2]*t;const a=Math.max(0,this.life[n]/this.max[n]),o=this.life[n]>0?this.size[n]*(.3+.7*a):0,c=(this.max[n]-this.life[n])*this.spin[n];this.q.setFromEuler(this.e.set(c,c*.7,0)),this.mesh.setMatrixAt(n,this.m.compose(this.t.set(this.p[s],this.p[s+1],this.p[s+2]),this.q,this.s.setScalar(o)))}e&&(this.mesh.instanceMatrix.needsUpdate=!0)}}const Os=new Map;function L_(i){const t=document.createElement("canvas");t.width=180,t.height=220;const e=t.getContext("2d");return i.colors?.length?i.colors.forEach((n,s)=>{e.fillStyle="#"+n.toString(16).padStart(6,"0"),e.beginPath(),e.arc(40+s*22,150-s*16,14,0,Math.PI*2),e.fill()}):(e.font='110px "Segoe UI Emoji", "Apple Color Emoji", sans-serif',e.textAlign="center",e.textBaseline="middle",e.fillText(i.icon??"❔",90,115)),t.toDataURL("image/png")}function hh(i){const t=i.filter(l=>!Os.has(l.id));for(const l of t)!l.look&&!l.make&&Os.set(l.id,L_(l));if(!t.some(l=>l.look||l.make))return;const e=180,n=220,s=new iu({antialias:!0,alpha:!0,preserveDrawingBuffer:!0});s.setSize(e,n),s.outputColorSpace=Le,s.toneMapping=ia;const r=new hl,a=new jr(s);r.environment=a.fromScene(new su,.04).texture,r.environmentIntensity=.5,r.add(new Xh(16777215,12571647,1.6));const o=new $h(16777215,2);o.position.set(2,4,5),r.add(o);const c=new sn(30,e/n,.1,50);c.position.set(1.6,2.2,6.4),c.lookAt(0,1.45,0);for(const l of t){if(!l.look&&!l.make)continue;let h;if(l.look){const u=new us(l.look);u.update(.016),h=u.root}else h=l.make(),h.scale.multiplyScalar(2.2),h.position.y=.4;h.rotation.y=.35,r.add(h),s.render(r,c),Os.set(l.id,s.domElement.toDataURL("image/png")),r.remove(h)}a.dispose(),s.dispose(),s.forceContextLoss()}class Rr{constructor(t,e,n,s,r,a,o){this.items=e,this.state=n,this.onBuy=s,this.onSelect=r,this.onClose=a,this.t=o,this.page=0,D_(),this.el=document.createElement("div"),this.el.className="shop",t.appendChild(this.el)}prepare(){hh(this.items)}open(){hh(this.items),this.render(),this.el.classList.add("on")}close(){this.el.classList.remove("on"),this.onClose()}render(){const t=this.state();this.el.innerHTML="";const e=document.createElement("div");e.className="shop-box",e.style.setProperty("--u",Br().toFixed(3)+"px");const n=innerWidth>=innerHeight,s=n?10:9,r=Math.ceil(this.items.length/s);this.page=Math.min(this.page,r-1);const a=this.items.slice(this.page*s,this.page*s+s),o=n?Math.min(5,this.items.length):3,c=Math.ceil((r>1?s:a.length)/o);e.style.setProperty("--cols",String(o)),e.style.setProperty("--rows",String(c)),e.innerHTML=`<div class="shop-head"><span class="shop-title">${this.t.title}</span><span class="shop-coins">${ks()}${t.coins}</span></div>`;const l=document.createElement("button");if(l.className="shop-x",l.textContent="✕",l.title=this.t.close,l.addEventListener("click",()=>this.close()),e.appendChild(l),r>1){const u=document.createElement("div");u.className="shop-nav";const d=(g,v)=>{const m=document.createElement("button");return m.textContent=g,m.disabled=this.page+v<0||this.page+v>=r,m.addEventListener("click",()=>{this.page+=v,this.render()}),m},f=document.createElement("span");f.textContent=`${this.page+1} / ${r}`,u.append(d("◀",-1),f,d("▶",1)),e.querySelector(".shop-head").insertBefore(u,e.querySelector(".shop-coins"))}const h=document.createElement("div");h.className="shop-grid";for(const u of a){const d=document.createElement("div"),f=document.createElement("button");if(u.prices){const m=t.levels?.[u.id]??0,p=u.prices.length,b=Array.from({length:p},(w,M)=>`<i class="pip${M<m?" on":""}"></i>`).join("");if(d.className="shop-card",d.innerHTML=`<img src="${Os.get(u.id)}" alt=""><div class="shop-name">${u.name}</div><div class="shop-pips">${b}</div><div class="shop-desc">${u.desc?.(Math.max(1,m))??""}</div>`,m>=p)f.textContent=this.t.max??"MAX",f.className="shop-btn worn",f.disabled=!0;else{const w=u.prices[m];f.innerHTML=`${ks()}${w}`,f.className="shop-btn buy"+(t.coins<w?" poor":""),f.addEventListener("click",()=>{this.onBuy(u.id),this.render()})}d.appendChild(f),h.appendChild(d);continue}const g=t.owned?.includes(u.id)??!1,v=t.selected===u.id;d.className="shop-card"+(v?" worn":""),d.innerHTML=`<img src="${Os.get(u.id)}" alt=""><div class="shop-name">${u.name}</div>`,v?(f.textContent=this.t.worn,f.className="shop-btn worn",f.disabled=!0):g?(f.textContent=this.t.wear,f.className="shop-btn wear",f.addEventListener("click",()=>{this.onSelect(u.id),this.render()})):(f.innerHTML=`${ks()}${u.price??0}`,f.className="shop-btn buy"+(t.coins<(u.price??0)?" poor":""),f.addEventListener("click",()=>{this.onBuy(u.id)&&this.onSelect(u.id),this.render()})),d.appendChild(f),h.appendChild(d)}e.appendChild(h),this.el.appendChild(e)}}let uh=!1;function D_(){if(uh)return;uh=!0;const i=document.createElement("style");i.textContent=`
.shop{position:absolute;inset:0;z-index:30;display:none;align-items:center;justify-content:center;background:rgba(10,20,40,.55);font-family:Rubik,Arial,sans-serif}
.shop.on{display:flex}
.shop-box{position:relative;width:min(80vw,calc(var(--u)*600));height:min(72vh,calc(var(--u)*370));display:flex;flex-direction:column;padding:calc(var(--u)*16);border-radius:calc(var(--u)*24);background:#fff;box-shadow:0 calc(var(--u)*8) 0 #c9d3e3}
.shop-head{display:flex;align-items:center;justify-content:space-between;padding:0 calc(var(--u)*56) calc(var(--u)*10) calc(var(--u)*6)}
.shop-title{font-weight:900;font-size:max(18px,min(calc(var(--u)*26),6vw));color:#ff7a2f;text-shadow:0 3px 0 #c55a00}
.shop-coins,.shop-btn.buy{display:inline-flex;align-items:center;gap:6px;font-weight:900}
.shop-coins{font-size:max(16px,calc(var(--u)*24));color:#1b2433}
.shop i{font-style:normal;color:#ffb800}
.shop-x{position:absolute;right:calc(var(--u)*12);top:calc(var(--u)*12);width:max(44px,calc(var(--u)*46));height:max(44px,calc(var(--u)*46));border:0;border-radius:50%;background:#e8403a;color:#fff;font:900 max(18px,calc(var(--u)*22)) Rubik,Arial;cursor:pointer;box-shadow:0 4px 0 #a82a22}
.shop-x::before,.shop-nav button::before{content:"";position:absolute;inset:-14px}
.shop-nav{display:flex;white-space:nowrap;align-items:center;gap:calc(var(--u)*8);font-weight:900;font-size:max(14px,calc(var(--u)*18));color:#1b2433}
.shop-nav button{position:relative;width:max(40px,calc(var(--u)*42));height:max(36px,calc(var(--u)*36));border:0;border-radius:calc(var(--u)*10);background:#3d8cf0;color:#fff;font:900 max(14px,calc(var(--u)*16)) Rubik,Arial;box-shadow:0 4px 0 #1f5fb8;cursor:pointer}
.shop-nav button:disabled{opacity:.35}
.shop-grid{flex:1;min-height:0;overflow:hidden;display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));grid-template-rows:repeat(var(--rows),minmax(0,1fr));gap:calc(var(--u)*10);padding:calc(var(--u)*4)}
.shop-card{min-height:0;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*3);padding:calc(var(--u)*6);border-radius:calc(var(--u)*16);background:linear-gradient(#e9f3ff,#cfe3ff);border:3px solid transparent}
.shop-card.worn{border-color:#3ad15a;background:linear-gradient(#eafff0,#c9f5d6)}
.shop-card>img{flex:1;min-height:0;width:100%;object-fit:contain}
.shop-name{font-weight:900;font-size:max(11px,min(calc(var(--u)*13),2.4vw));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;color:#1b2433}
.shop-btn{width:100%;flex:none;min-height:max(32px,min(calc(var(--u)*32),9vw));border:0;border-radius:calc(var(--u)*10);color:#fff;font:900 max(11px,min(calc(var(--u)*14),2.6vw)) Rubik,Arial;white-space:nowrap;overflow:hidden;padding:0 4px;cursor:pointer;justify-content:center}
.shop-btn.buy{background:#ff9a1f;box-shadow:0 4px 0 #c55a00}.shop-btn.buy i{color:#fff3a8}
.shop-btn.buy.poor{background:#b9c2cf;box-shadow:0 4px 0 #8b94a1}
.shop-btn.wear{background:#2a74e8;box-shadow:0 4px 0 #17469a}
.shop-pips{display:flex;gap:4px}.shop-pips .pip{width:max(8px,calc(var(--u)*12));height:max(8px,calc(var(--u)*12));border-radius:50%;background:#c9d3e3}.shop-pips .pip.on{background:#3ad15a}
.shop-desc{font:700 max(11px,min(calc(var(--u)*12),3vw)) Rubik,Arial;color:#55627a;text-align:center;line-height:1.15;min-height:2.3em}
.shop-btn.worn{background:#3ad15a;box-shadow:0 4px 0 #23913b;cursor:default}
`,document.head.appendChild(i)}function vu(i){const t=new Ae,e=(n,s,r,a,o,c,l,h=0)=>{const u=Me({x:n,y:s,z:r},a);return u.position.set(o,c,l),u.rotation.z=h,u.castShadow=!0,t.add(u),u};e(.9,.6,1.1,i.body,0,.5,0),e(.75,.65,.7,i.body,0,.95,.55);for(const n of[-.3,.3])for(const s of[-.35,.35])e(.22,.3,.22,i.accent,n,.15,s);for(const n of[-.17,.17])e(.1,.14,.04,1381653,n,1.02,.91);if(i.kind==="cat"){for(const n of[-.22,.22])e(.18,.25,.12,i.accent,n,1.35,.55,n>0?-.3:.3);e(.15,.15,.6,i.accent,0,.75,-.75)}else if(i.kind==="dog"){for(const n of[-.42,.42])e(.12,.4,.3,i.accent,n,.95,.5);e(.3,.22,.2,i.accent,0,.85,.95),e(.12,.12,.4,i.accent,0,.8,-.7)}else{for(const n of[-.6,.6])e(.6,.08,.5,i.accent,n,.85,-.05,n>0?-.5:.5);for(const n of[-.18,.18])e(.1,.3,.1,16774048,n,1.35,.5);e(.2,.2,.7,i.body,0,.55,-.8)}return t.scale.setScalar(.85),t}class I_{constructor(t,e){this.t=0,this.yaw=0,this.group=vu(e),t.add(this.group)}update(t,e,n,s){this.t+=t;const r=new R(-Math.sin(n)*1.6+Math.cos(n)*1.1,0,-Math.cos(n)*1.6-Math.sin(n)*1.1),a=e.clone().add(r),o=1-Math.exp(-t*6);this.group.position.distanceTo(a)>12&&this.group.position.copy(a),this.group.position.x+=(a.x-this.group.position.x)*o,this.group.position.z+=(a.z-this.group.position.z)*o;const c=s?Math.abs(Math.sin(this.t*10))*.35:Math.abs(Math.sin(this.t*3))*.08;this.group.position.y+=(a.y+c-this.group.position.y)*Math.min(1,o*2);let l=n-this.yaw;l=Math.atan2(Math.sin(l),Math.cos(l)),this.yaw+=l*o,this.group.rotation.y=this.yaw}dispose(t){t.remove(this.group)}}class bl{constructor(t){this.box=t,this.was=!1}enter(t){const e=this.box.containsPoint(new R(t.x,t.y+.5,t.z)),n=e&&!this.was;return this.was=e,n}reset(){this.was=!0}}function Mu(i,t=[]){i.traverse(e=>{e.isMesh&&!t.includes(e)&&!t.includes(e.parent)&&(e.userData.static=!0)})}function Sl(i,t={}){const e=t.w??512,n=t.h??128,s=document.createElement("canvas");s.width=e,s.height=n;const r=s.getContext("2d");yu(r,e,n,i,t);const a=new mi(s);a.colorSpace=Le;const o=new ul(new ra({map:a}));return o.userData.canvas=s,o.userData.opts=t,o}function yu(i,t,e,n,s){i.clearRect(0,0,t,e),s.bg!=="none"&&(i.fillStyle=s.bg??"rgba(20,28,40,.85)",i.beginPath(),i.roundRect(4,4,t-8,e-8,26),i.fill()),i.fillStyle=s.fg??"#fff",i.textAlign="center",i.textBaseline="middle";let r=s.font??Math.min(e/n.length*.62,72);i.font=`900 ${r}px Rubik, Arial, sans-serif`;const a=Math.max(...n.map(o=>i.measureText(o).width));a>t-48&&(r*=(t-48)/a,i.font=`900 ${r}px Rubik, Arial, sans-serif`),i.lineJoin="round",i.miterLimit=2,i.lineWidth=r*.14,i.strokeStyle="rgba(0,0,0,.45)",n.forEach((o,c)=>{const l=e/2+(c-(n.length-1)/2)*r*1.15;i.strokeText(o,t/2,l),i.fillText(o,t/2,l)})}function bu(i,t){const e=i.userData.canvas;yu(e.getContext("2d"),e.width,e.height,t,i.userData.opts),i.material.map.needsUpdate=!0}class U_{constructor(t,e,n,s,r,a){this.group=new Ae;const o=this.group;for(const p of[-2.6,2.6]){const b=Me({x:1,y:5,z:1},9345190);b.position.set(p,2.5,0),o.add(b)}const c=Me({x:6.2,y:1,z:1.2},r);c.position.set(0,5.4,0),o.add(c);const l=document.createElement("canvas");l.width=l.height=256;const h=l.getContext("2d"),u="#"+r.toString(16).padStart(6,"0"),d=h.createRadialGradient(128,128,8,128,128,128);d.addColorStop(0,"#ffffff"),d.addColorStop(.35,u),d.addColorStop(1,"rgba(255,255,255,0.15)"),h.fillStyle=d,h.fillRect(0,0,256,256),h.strokeStyle="rgba(255,255,255,.55)",h.lineWidth=10;for(let p=0;p<4;p++){h.beginPath();for(let b=0;b<6;b+=.1){const w=b*20;h.lineTo(128+Math.cos(b+p*Math.PI/2)*w,128+Math.sin(b+p*Math.PI/2)*w)}h.stroke()}const f=new mi(l);f.colorSpace=Le,this.swirl=new ne(new oa(2.1,40),new ps({map:f,transparent:!0,opacity:.9,side:Mn,depthWrite:!1})),this.swirl.position.set(0,2.5,0),o.add(this.swirl),this.bars=new Ae;const g=[];for(let p=-2;p<=2;p++){const b=Me({x:.25,y:4.6,z:.25},5922667);g.push(b.geometry.clone().translate(p*.95,2.4,.3))}this.bars.add(new ne(ha(g),Me({x:.25,y:4.6,z:.25},5922667).material));const v=Me({x:1.1,y:1,z:.5},16237596);v.position.set(0,2.6,.55),this.bars.add(v),o.add(this.bars),this.title=a,this.label=Sl([a],{w:512,h:200}),this.label.scale.set(5,1.95,1),this.label.position.set(0,7,0),o.add(this.label),o.position.copy(n),o.rotation.y=s,t.add(o),o.updateMatrixWorld(!0);for(const p of o.children.slice(0,2))e.addMesh(p);Mu(o,[this.swirl,this.bars,...this.bars.children]);const m=new R(0,2.5,0).applyMatrix4(o.matrixWorld);this.trigger=new bl(new ze().setFromCenterAndSize(m,new R(4,5,4)))}setLocked(t,e=""){this.bars.visible=t,this.swirl.material.opacity=t?.35:.9,bu(this.label,e?[this.title,e]:[this.title])}update(t){this.swirl.rotation.z=-t*1.6}}class Cr{constructor(t,e,n,s,r,a,o){this.group=new Ae;const c=this.group,l=Me({x:4,y:1.2,z:1.4},13141834);l.position.set(0,.6,-1),c.add(l);for(const f of[-1.9,1.9]){const g=Me({x:.25,y:3.4,z:.25},16777215);g.position.set(f,1.7,-1.4),c.add(g)}for(let f=0;f<6;f++){const g=Me({x:.7,y:.25,z:2.2},f%2?16777215:r);g.position.set(-1.75+f*.7,3.45,-.9),g.rotation.x=.25,c.add(g)}const h=Sl([`${o} ${a}`],{w:512,h:128,bg:"#"+r.toString(16).padStart(6,"0")});h.scale.set(4.2,1.05,1),h.position.set(0,4.5,-1),c.add(h);const u=Me({x:3,y:.12,z:2},r);u.position.set(0,.06,1),c.add(u),c.position.copy(n),c.rotation.y=s,t.add(c),c.updateMatrixWorld(!0),e.addMesh(l),Mu(c);const d=new R(0,.5,1).applyMatrix4(c.matrixWorld);this.trigger=new bl(new ze().setFromCenterAndSize(d,new R(3,2.5,3)))}}class N_{constructor(t,e,n){this.group=new Ae,this.open=0;const s=this.group,r=Me({x:2,y:1.2,z:1.4},10115624);r.position.y=.6,s.add(r),this.lid=Me({x:2.1,y:.5,z:1.5},13141834),this.lid.position.y=1.45,s.add(this.lid);for(const o of[-.7,.7]){const c=Me({x:.2,y:1.75,z:1.55},16237596);c.position.set(o,.88,0),s.add(c)}const a=Me({x:.4,y:.45,z:.2},16237596);a.position.set(0,1.15,.75),s.add(a),s.position.copy(n),t.add(s),s.updateMatrixWorld(!0),e.addMesh(r),this.trigger=new bl(new ze().setFromCenterAndSize(n.clone().add(new R(0,1,0)),new R(3.6,3,3.6)))}pop(){this.open=1.2}update(t,e,n){this.open=Math.max(0,this.open-t),this.lid.rotation.x=-Math.sin(Math.min(1,this.open)*Math.PI)*1.1,this.lid.position.z=this.lid.rotation.x*.3,this.group.position.y=e?Math.abs(Math.sin(n*3))*.15:0}}const W=(i,t,e,n=6,s=4,r=1)=>({s:[n,r,s],p:[i,t-r/2,e-s/2]}),jt=(i,t=0,e=4)=>W(0,t,-3-i,6,e),ta=i=>[W(0,0,-3,6,4),W(0,i,-7,6,4,i+1)],qe=(i,t=-4)=>({s:[16,1,i],p:[0,t-.5,-3-i/2],kind:"lava"}),Fn=(i,t,e=6)=>({s:[4,1,4],p:[0,-.5,i-2],c:2782440,move:{d:[0,0,-t],t:e}}),jn=i=>({s:[4,.6,4],p:[0,-.3,i-2],c:16740277,kind:"bounce"}),Ne=(i,t=0)=>({s:[2,.6,2],p:[t,-.3,i],c:15921906,kind:"vanish"}),rn=(i,t,e,n=6)=>({s:[n,1,t],p:[0,-.5,i-t/2],kind:"conveyor",push:e}),Ke=(i,t=4,e=3,n=1.4,s=2.2,r=0)=>({s:[s,s,s],p:[-t+r,n,i],c:16732064,kind:"bumper",move:{d:[t*2,0,0],t:e}}),Ze=(i,t=8,e=.9)=>({s:[t,.6,t],p:[0,-.3,i-t/2],c:16765498,kind:"turntable",spin:e}),ds=(i,t,e=10,n=5,s=8,r=2.5)=>({s:[e,n,s],p:[0,r,i],kind:"fan",push:t}),qn=(i,t)=>[-4,-2,0,2,4].map((e,n)=>({s:[2,3.2,1],p:[e,1.6,i],kind:"door",fake:t.includes(n),c:[16732064,3854847,16765498,9071871,7208842][n]})),as=(i,t)=>t.flatMap((e,n)=>[-2,0,2].map((s,r)=>({s:[2,.6,2],p:[s,-.3,i-1-n*2],kind:"tile",fake:r!==e}))),en=(i,t=9,e=1.6)=>({s:[t,.6,.6],p:[0,.5,i],c:15220794,kind:"spinner",spin:e}),F_=[{blocks:1,hint:"hint1",parts:[jt(6)]},{blocks:2,parts:[jt(8)],turn:-1},{blocks:1,hint:"hint3",parts:ta(3)},{blocks:2,hint:"hint4",parts:ta(4),turn:1},{blocks:2,hint:"hint5",parts:[jt(6),W(0,0,-19)]},{blocks:0,check:!1,hint:"hintBelt",parts:[rn(-3,12,[2.4,0,0]),W(0,0,-15)],turn:-1},{blocks:2,parts:[jt(6),W(0,3,-13,6,4,4)]},{blocks:3,parts:[W(-2,1,-3,2,2),W(2,2,-5,2,2),W(-2,3,-7,2,2),W(0,3,-9,6,4),W(0,3,-23,6,4)]}],k_=[{blocks:0,check:!1,hint:"hint13",parts:[jn(-3),W(0,5,-7,6,4,6)]},{blocks:2,parts:[jt(8)],turn:1},{blocks:0,check:!1,hint:"hint12",parts:[Fn(-5,10),W(0,0,-21)]},{blocks:0,check:!1,hint:"hintIce",parts:[Ne(-6),Ne(-10),Ne(-14),W(0,0,-17)],turn:-1},{blocks:0,check:!1,parts:[jn(-3),W(0,3,-9,6,4)]},{blocks:0,check:!1,hint:"hintSpin",parts:[Ze(-5,8,.8),Ze(-15,8,-1),W(0,0,-25)]},{blocks:2,parts:ta(4),turn:1},{blocks:1,check:!1,parts:[Ne(-6),Ne(-10),W(0,0,-13),W(0,0,-23)]}],O_=[{blocks:2,hint:"hint11",parts:[jt(8),qe(12)]},{blocks:0,check:!1,parts:[Fn(-5,10),W(0,0,-21),qe(18)],turn:-1},{blocks:0,check:!1,hint:"hintBump",parts:[W(0,0,-3,4,14),Ke(-7,3,2.6),Ke(-12,3,3.2,1.4,2.2,6),W(0,0,-17),qe(18)]},{blocks:2,parts:[jt(6),W(0,0,-19),qe(20)],turn:1},{blocks:0,check:!1,parts:[W(0,0,-5,10,10),en(-10),qe(16)]},{blocks:1,parts:[jt(4),W(0,3,-11,6,4,4),qe(12)],turn:-1},{blocks:0,check:!1,parts:[jn(-3),W(0,3,-9,6,4),qe(12)]},{blocks:4,parts:[jt(10),W(0,3,-17,6,4,4),qe(18)]}],B_=[{blocks:0,check:!1,parts:[Fn(-5,10),W(0,0,-21),Fn(-27,10,5),W(0,0,-43)],turn:-1},{blocks:3,parts:[W(0,0,-3),W(0,3,-7,6,4,4),W(0,7,-11,6,4,8)]},{blocks:5,parts:[jt(14)],turn:1},{blocks:0,check:!1,parts:[W(0,0,-3,10,16),en(-7,9,1.4),en(-14,9,-1.9)]},{blocks:0,check:!1,parts:[jn(-3),W(0,3,-9,4,4),Ne(-17,0),W(0,0,-21)]},{blocks:1,check:!1,hint:"hint14",parts:[Ne(-6),Ne(-10),Ne(-14),W(0,0,-17,10,10),en(-22)]},{blocks:4,parts:[jt(8),W(0,4,-15,6,4,5)],turn:-1},{blocks:2,check:!1,hint:"hintFinal",parts:[jt(6),Fn(-15,8,5),W(0,0,-29),W(0,3,-33,6,4,4)]}],z_=[{blocks:0,check:!1,hint:"hintDoors",parts:[W(0,0,-3,10,10),...qn(-7.5,[1,4])]},{blocks:0,check:!1,hint:"hintTip",parts:[...as(-3,[1,0,0,1,2,2]),W(0,0,-15)],turn:1},{blocks:0,check:!1,hint:"hintBump",parts:[W(0,0,-3,4,16),Ke(-6,3,2.4),Ke(-11,3,3,1.4,2.2,6),Ke(-15,3,2.2),W(0,0,-19)]},{blocks:0,check:!1,hint:"hintSpin",parts:[Ze(-5,8,1.1),Ze(-15,8,-1.3),W(0,0,-25)],turn:-1},{blocks:1,check:!1,hint:"hintWind",parts:[W(0,0,-3,10,6),ds(-6,[2.2,0,0],10,5,6),jt(12,0,4)]},{blocks:0,check:!1,hint:"hintUp",parts:[W(0,0,-3,6,4),ds(-9,[0,9,0],4,7,4,3.5),W(0,6,-11,6,4,7)],turn:1},{blocks:2,check:!1,parts:[W(0,0,-3,10,6),...qn(-6.5,[0,3]),jt(14,0,4)]},{blocks:0,check:!1,hint:"hintFinal2",parts:[...as(-3,[2,1,1,0]),Ze(-13,8,1),W(0,0,-23,4,10),Ke(-28,3,2.6),W(0,0,-33)]}],G_=[{blocks:2,check:!1,hint:"hintBack",parts:[rn(-11,8,[0,0,2.6]),W(0,0,-19)]},{blocks:0,check:!1,hint:"hintBump",parts:[rn(-3,14,[0,0,-2]),Ke(-8,3,1.8),Ke(-13,3,2.2,1.4,2.2,6),W(0,0,-17)],turn:-1},{blocks:0,check:!1,hint:"hintSide",parts:[{s:[4,1,4],p:[-6,-.5,-7],c:3837904,move:{d:[12,0,0],t:6}},W(0,0,-11)]},{blocks:0,check:!1,hint:"hintUpLift",parts:[{s:[4,1,4],p:[0,-.5,-5],c:3837904,move:{d:[0,4,0],t:4}},W(0,4,-7,6,4,5),{s:[4,1,4],p:[0,3.5,-13],c:3837904,move:{d:[0,4,0],t:4}},W(0,8,-15,6,4,9)],turn:1},{blocks:2,check:!1,parts:[rn(-3,4,[0,0,2.2]),W(0,4,-7,6,4,5)]},{blocks:0,check:!1,hint:"hintSpin",parts:[Ze(-5,10,.9),en(-10,9,-2.2),W(0,0,-15)],turn:-1},{blocks:4,check:!1,hint:"hintWind",parts:[W(0,0,-3,10,4),ds(-13,[-2,0,0],10,5,12),jt(12,0,4)]},{blocks:2,check:!1,hint:"hintFinal",parts:[rn(-3,8,[0,0,-2.5]),...qn(-12.5,[2]),W(0,0,-11,10,4),jt(20,0,4)]}],zr=(i,t=6,e=6)=>({s:[4,1,4],p:[-t,-.5,i-2],c:3837904,move:{d:[t*2,0,0],t:e}}),Ri=(i,t,e=4,n=4)=>({s:[4,1,4],p:[0,t-.5,i-2],c:3837904,move:{d:[0,e,0],t:n}}),H_=[{blocks:3,parts:[jt(10)],turn:1},{blocks:2,parts:ta(4)},{blocks:2,parts:[jt(6),W(0,3,-13,6,4,4)]},{blocks:0,check:!1,hint:"hintBelt",parts:[rn(-3,14,[-2.6,0,0]),W(0,0,-17)],turn:-1},{blocks:2,parts:[jt(6),W(0,0,-19)]},{blocks:0,parts:[W(-2,1,-3,2,2),W(2,2,-5,2,2),W(-2,3,-7,2,2),W(2,4,-9,2,2),W(0,4,-11,6,4)],turn:1},{blocks:4,parts:[jt(8),W(0,4,-15,6,4,5)]},{blocks:5,hint:"hintFinal",parts:[jt(14)]}],V_=[{blocks:0,check:!1,parts:[jn(-3),W(0,3,-9,6,4),W(0,3,-17,6,4)]},{blocks:0,check:!1,hint:"hint12",parts:[Fn(-5,14,7),W(0,0,-25)],turn:1},{blocks:0,check:!1,hint:"hintIce",parts:[Ne(-6),Ne(-10),Ne(-14),Ne(-18),W(0,0,-21)]},{blocks:0,check:!1,hint:"hintSpin",parts:[Ze(-5,8,.9),Ze(-15,8,-1.1),Ze(-25,8,1.2),W(0,0,-35)],turn:-1},{blocks:3,parts:[jt(10)]},{blocks:2,check:!1,hint:"hintBack",parts:[rn(-3,6,[0,0,2.4]),W(0,4,-9,6,4,5)]},{blocks:0,check:!1,parts:[jn(-3),W(0,3,-9,4,4),Ne(-17),W(0,0,-21)],turn:1},{blocks:4,hint:"hintFinal",parts:[jt(8),W(0,4,-15,6,4,5)]}],W_=[{blocks:3,parts:[jt(10),qe(14)]},{blocks:0,check:!1,hint:"hintBump",parts:[W(0,0,-3,4,18),Ke(-6,3,2.4),Ke(-11,3,3,1.4,2.2,6),Ke(-16,3,2.2),W(0,0,-21),qe(22)],turn:1},{blocks:0,check:!1,hint:"hint12",parts:[Fn(-5,12,5),W(0,0,-23),qe(20)]},{blocks:2,parts:[jt(4),W(0,4,-11,6,4,5),qe(12)]},{blocks:0,check:!1,parts:[W(0,0,-5,10,14),en(-9),en(-15,9,-2),qe(18)],turn:-1},{blocks:0,check:!1,hint:"hintIce",parts:[Ne(-6),Ne(-10),Ne(-14),W(0,0,-17),qe(18)]},{blocks:0,check:!1,hint:"hintBelt",parts:[rn(-3,12,[2.2,0,0],4),W(0,0,-15),qe(16)]},{blocks:3,hint:"hintFinal",parts:[jt(8),W(0,0,-21),qe(22)]}],X_=[{blocks:0,check:!1,parts:[W(0,0,-3,10,20),en(-7,9,1.5),en(-13,9,-1.8),en(-19,9,2.1)]},{blocks:6,parts:[jt(16)],turn:1},{blocks:0,check:!1,hint:"hint12",parts:[Fn(-5,10,5),W(0,0,-21),Fn(-27,12,6),W(0,0,-45)]},{blocks:3,parts:[W(0,0,-3),W(0,3,-7,6,4,4),W(0,6,-11,6,4,7),W(0,9,-15,6,4,10)],turn:-1},{blocks:1,check:!1,hint:"hint14",parts:[Ne(-6),Ne(-10),Ne(-14),W(0,0,-17,10,10),en(-22,9,-1.7)]},{blocks:1,check:!1,parts:[jn(-3),W(0,3,-9,6,4),W(0,3,-19,6,4)],turn:1},{blocks:4,parts:[jt(8),W(0,4,-15,6,4,5)]},{blocks:2,check:!1,hint:"hintFinal",parts:[jt(6),Fn(-15,8,5),W(0,0,-29),W(0,3,-33,6,4,4)]}],Y_=[{blocks:0,check:!1,hint:"hintDoors",parts:[W(0,0,-3,10,14),...qn(-6.5,[0,2]),...qn(-12.5,[3])],turn:1},{blocks:0,check:!1,hint:"hintTip",parts:[...as(-3,[0,1,2,2,1,0,0,1]),W(0,0,-19)]},{blocks:0,check:!1,hint:"hintBump",parts:[Ze(-5,8,1),W(0,0,-15,4,10),Ke(-20,3,2.4),W(0,0,-25)],turn:-1},{blocks:2,check:!1,hint:"hintWind",parts:[W(0,0,-3,10,6),ds(-6,[-2.2,0,0],10,5,6),jt(14,0,4)]},{blocks:1,check:!1,hint:"hintUp",parts:[W(0,0,-3,6,4),ds(-9,[0,9,0],4,7,4,3.5),W(0,6,-11,6,4,7),W(0,6,-21,6,4)],turn:1},{blocks:0,check:!1,parts:[W(0,0,-3,10,4),...qn(-5.5,[1,3]),...as(-7,[1,2,1,0]),W(0,0,-15)]},{blocks:0,check:!1,hint:"hintSpin",parts:[Ze(-5,8,1.2),Ze(-15,8,-1.4),Ze(-25,8,1.6),W(0,0,-35)],turn:-1},{blocks:2,check:!1,hint:"hintFinal2",parts:[...as(-3,[1,0,1,2]),W(0,0,-11,10,6),...qn(-14.5,[1,3]),jt(22,0,4)]}],q_=[{blocks:3,check:!1,hint:"hintBack",parts:[rn(-13,8,[0,0,3]),W(0,0,-21)],turn:1},{blocks:0,check:!1,hint:"hintSide",parts:[zr(-5),W(0,0,-11),zr(-15,6,5),W(0,0,-21)]},{blocks:0,check:!1,hint:"hintUpLift",parts:[Ri(-3,0),W(0,4,-7,6,4,5),Ri(-11,4),W(0,8,-15,6,4,9),Ri(-19,8),W(0,12,-23,6,4,13)],turn:-1},{blocks:0,check:!1,hint:"hintBump",parts:[rn(-3,18,[0,0,-2]),Ke(-7,3,1.8),Ke(-12,3,2.2,1.4,2.2,6),Ke(-17,3,1.6),W(0,0,-21)]},{blocks:2,check:!1,hint:"hintBack",parts:[rn(-3,8,[0,0,2.6]),W(0,4,-11,6,4,5)],turn:1},{blocks:0,check:!1,hint:"hintSpin",parts:[Ze(-5,10,1),en(-10,9,-2.4),W(0,0,-15,6,4),Ze(-21,10,-1.2),en(-26,9,2.4),W(0,0,-31)]},{blocks:4,check:!1,hint:"hintWind",parts:[W(0,0,-3,10,4),ds(-14,[1.6,0,0],10,5,14),jt(14,0,4)],turn:-1},{blocks:2,check:!1,hint:"hintFinal",parts:[rn(-3,6,[0,0,-2.5]),...qn(-10.5,[1,3]),W(0,0,-9,10,4),jt(16,0,4),zr(-25),W(0,0,-31)]}],$_=[{blocks:0,check:!1,hint:"hintTower",parts:[W(0,1,-3,6,2),W(0,2,-7,6,2),W(0,3,-11,6,2),W(0,4,-15,6,4)],turn:-1},{blocks:0,check:!1,hint:"hint13",parts:[jn(-3),W(0,5,-7,6,4),W(0,5,-15,6,4)],turn:-1},{blocks:0,check:!1,hint:"hintUpLift",parts:[Ri(-3,0),W(0,4,-7,6,4),W(0,4,-15,6,4)],turn:-1},{blocks:1,hint:"hint3",parts:[W(0,0,-3,6,12),W(0,3,-15,6,4,4)],turn:-1},{blocks:0,check:!1,hint:"hintBelt",parts:[rn(-3,12,[2.4,0,0]),W(0,1,-15,6,4)],turn:-1},{blocks:0,check:!1,parts:[Ri(-3,0),W(0,4,-7,6,4),Ri(-11,4),W(0,8,-15,6,4)],turn:-1},{blocks:0,check:!1,hint:"hintSpin",parts:[Ze(-3,8,.9),W(0,1,-13,6,6)],turn:-1},{blocks:0,check:!1,hint:"hintBump",parts:[W(0,0,-3,4,12),Ke(-9,3,2.6),W(0,2,-15,6,4,3)],turn:-1},{blocks:0,check:!1,hint:"hintSide",parts:[zr(-5,6,5),W(0,2,-11,6,8)],turn:-1},{blocks:2,hint:"hint4",parts:[W(0,0,-3,6,12),W(0,4,-15,6,4,5)],turn:-1},{blocks:1,check:!1,hint:"hintBack",parts:[rn(-3,12,[0,0,2.2]),W(0,3,-15,6,4,4)],turn:-1},{blocks:0,check:!1,hint:"hintDoors",parts:[W(0,0,-3,10,12),...qn(-9.5,[0,3]),W(0,2,-15,6,4,3)],turn:-1},{blocks:0,check:!1,hint:"hintTip",parts:[...as(-3,[1,0,2,1]),W(0,2,-13,6,6)],turn:-1},{blocks:0,check:!1,parts:[Ri(-3,0,6,5),W(0,6,-7,6,4),W(0,8,-13,6,6)],turn:-1},{blocks:0,check:!1,parts:[W(0,0,-3,6,16),en(-8,9,1.8),en(-14,9,-2.2)],turn:-1},{blocks:0,check:!1,hint:"hintFinal",parts:[jn(-3),W(0,5,-7,6,4),W(0,7,-15,6,4)]}],K_=[[...F_,...H_],[...k_,...V_],[...O_,...W_],[...B_,...X_],[...z_,...Y_],[...G_,...q_],$_],Z_={hint1:rt("Пропасть не перепрыгнуть! Подойди к краю и поставь блок — E или 🧱","Too far to jump! Walk to the edge and place a block — E or 🧱"),hint3:rt("Стена высокая — поставь блок-ступеньку у стены","The wall is high — place a block as a step"),hint4:rt("Поставь блок на блок — получится башенка","Stack a block on a block to build a tower"),hint5:rt("Блоков ровно два — не потрать оба на первую пропасть!","Only two blocks — don't spend both on the first gap!"),hintBelt:rt("Лента сносит в сторону — беги и держись против неё","The belt pushes you sideways — run against it"),hintBack:rt("Лента тащит назад к пропасти — не стой на месте!","The belt drags you back to the gap — keep moving!"),hint11:rt("Внизу лава! Не упади","Lava below! Don't fall"),hint12:rt("Подожди платформу и запрыгивай","Wait for the platform and hop on"),hint13:rt("Прыгни на батут!","Jump on the trampoline!"),hint14:rt("Белые плиты исчезают — беги быстрее! Перепрыгни крутилку","White tiles vanish — run fast! Jump over the spinner"),hintIce:rt("Ледяные плиты исчезают — не стой на месте!","Ice tiles vanish — keep moving!"),hintFinal:rt("Последний этап! Соберись!","Final stage! Focus!"),hintFinal2:rt("Финал шоу: тропа, карусель и маятник!","Show finale: path, carousel and pendulum!"),hintSpin:rt("Карусель крутит — беги к краю в нужный момент","The carousel spins — run to the edge at the right moment"),hintBump:rt("Шары-маятники сбивают с моста — проскакивай между ними","Pendulum balls knock you off — slip between them"),hintDoors:rt("Часть дверей ненастоящие — врежься с разбега!","Some doors are fake — run right through!"),hintTip:rt("Тайная тропа: часть плит проваливается. Смотри, где прошли другие!","Secret path: some tiles drop. Watch where others walked!"),hintWind:rt("Ветер сдувает вбок — держись против ветра","Wind blows you sideways — lean into it"),hintUp:rt("Прыгни в столб ветра — он поднимет наверх","Jump into the updraft — it lifts you up"),hintSide:rt("Лифт ездит поперёк — запрыгивай, когда он рядом","The lift moves sideways — hop on when it's close"),hintTower:rt("Башня! Беги по кругу и поднимайся — упал ниже чекпоинта, начнёшь с него","The Tower! Climb round and round — fall below the checkpoint and you restart from it"),hintUpLift:rt("Лифт поднимает — встань на него и жди","The lift goes up — stand on it and wait")},ve=[{name:rt("ЛУГ","MEADOW"),id:"meadow",portal:3854682,sky:3114736,fog:14478591,track:[15220794,16237596,3125322,2782440,10181072,16742959,16740277],palette:{grass:5423674,rock:9341574,rockDark:7499370,trunk:8014374,leaf:3119685,leafLight:4569176,flower:16769357,tree:"pine"}},{name:rt("КОНФЕТЫ","CANDY"),id:"candy",portal:16740277,sky:12939248,fog:16770035,track:[16740277,8380624,16765498,12160255,16751226,9427199],palette:{grass:16752592,rock:16774118,rockDark:15915204,trunk:16777215,leaf:16736168,leafLight:8380624,flower:16777215,tree:"lolly"}},{name:rt("ЛАВА","LAVA"),id:"lava",portal:16738847,sky:10104090,fog:16757898,track:[7040888,16742959,4013893,16761402,9062954],palette:{grass:4868688,rock:3816e3,rockDark:2763311,trunk:2761248,leaf:16738847,leafLight:16757306,flower:16726554,tree:"dead"}},{name:rt("СНЕГ","SNOW"),id:"snow",portal:9427199,sky:5941488,fog:15660799,track:[9427199,16777215,2782440,12160255,1483683],palette:{grass:16055039,rock:10466504,rockDark:8361128,trunk:6965802,leaf:3111509,leafLight:15398655,flower:9427199,tree:"snowpine"}},{name:rt("ШОУ","SHOW"),id:"show",portal:16765498,sky:9071871,fog:16771323,track:[16732064,16765498,3854847,9071871,7208842],palette:{grass:16765498,rock:16748488,rockDark:15231656,trunk:16777215,leaf:3854847,leafLight:16732064,flower:16777215,tree:"lolly"}},{name:rt("ФАБРИКА","FACTORY"),id:"factory",portal:16751135,sky:2781050,fog:13164e3,track:[16758784,5923440,3837904,16742959,9081502],palette:{grass:6976126,rock:4870750,rockDark:3817804,trunk:2764598,leaf:16758784,leafLight:3837904,flower:16742959,tree:"dead"}},{name:rt("БАШНЯ","TOWER"),id:"tower",portal:12160255,sky:16747098,fog:16767416,track:[12160255,16765498,3854847,16740277,7208842],palette:{grass:10124543,rock:6969998,rockDark:5523056,trunk:3813198,leaf:16765498,leafLight:16747098,flower:16777215,tree:"pine"}}],gn={x:Te,y:1,z:Te},J_=13141834,Su=new Pe({map:Xx(),roughness:.75}),Q_=.6;class j_{constructor(t,e,n,s){this.scene=t,this.physics=e,this.ctl=n,this.left=0,this.placed=[],this.all=[],this.ghostOk=!1,this.origin=new R,this.lastFloorY=0,this.dir=new R(0,0,-1),this.keysDown=new Set,this.hidden=!1,this.ghost=new ne(new An(gn.x*.98,gn.y*.98,gn.z*.98),new ps({color:3854682,transparent:!0,opacity:.38,depthWrite:!1}));const r=new zh(new Vh(this.ghost.geometry),new fl({color:16777215}));this.ghost.add(r),t.add(this.ghost),addEventListener("keydown",l=>{this.keysDown.has(l.code)||(this.keysDown.add(l.code),l.code==="KeyE"||l.code==="Enter"?this.place():l.code==="KeyQ"?this.remove():l.code==="KeyR"&&this.reset())}),addEventListener("keyup",l=>this.keysDown.delete(l.code)),this.ui=document.createElement("div"),this.ui.className="bridge-ui",this.counter=document.createElement("div"),this.counter.className="bridge-count";const a=(l,h,u)=>{const d=document.createElement("button");return d.className="bridge-btn "+l,d.innerHTML=h,d.addEventListener("pointerdown",f=>{f.preventDefault(),f.stopPropagation(),u()}),d.addEventListener("touchstart",f=>f.stopPropagation(),{passive:!0}),d},o=document.createElement("div");o.className="bridge-btns",o.append(a("reset","⟲<span>R</span>",()=>this.reset()),a("take","↩<span>Q</span>",()=>this.remove()),a("put","🧱<span>E</span>",()=>this.place())),this.ui.append(this.counter,o),s.appendChild(this.ui),tv();const c=()=>{const l=Ko(),h=xh(Math.round(Math.min(innerWidth,innerHeight)*.13));o.style.setProperty("--s",h+"px"),o.style.right=l.right+12+"px",o.style.bottom=l.bottom+Math.round(Math.min(innerWidth,innerHeight)*.2)*1.6+"px";const u=Math.min(innerHeight/540,innerWidth/400);this.counter.style.top=l.top+Math.round(u*(innerWidth<innerHeight*.8?84:12))+"px",this.counter.style.fontSize=Math.max(14,Math.round(u*22))+"px"};c(),addEventListener("resize",c)}startStage(t,e){this.origin.copy(t),this.placed=[],this.left=e,this.ui.style.display=e>0?"":"none",this.refresh()}reset(){for(const t of this.placed)this.scene.remove(t.mesh),this.physics.remove(t.solid),this.left++;this.all=this.all.filter(t=>!this.placed.includes(t)),this.placed=[],this.refresh(),this.onReset?.()}setVisible(t){this.ui.style.visibility=t?"":"hidden",this.ghost.visible=t,this.hidden=!t}clearAll(){for(const t of this.all)this.scene.remove(t.mesh),this.physics.remove(t.solid);this.all=[],this.placed=[]}place(){if(!this.ghostOk||this.left<=0){this.onSound?.("denied",this.ghost.position);return}this.onSound?.("place",this.ghost.position);const t=this.bodyOverlap(this.ghost.position);t>0&&this.ctl.pos.addScaledVector(this.dir,-(t+.01));const e=Me(gn,J_);e.material=Su,e.position.copy(this.ghost.position),this.scene.add(e);const n={mesh:e,solid:this.physics.addMesh(e,"placed")};this.placed.push(n),this.all.push(n),this.left--,this.refresh()}remove(){if(!this.placed.length)return;let t=this.placed.findIndex(n=>Math.abs(n.mesh.position.x-this.ghost.position.x)<.1&&Math.abs(n.mesh.position.z-this.ghost.position.z)<.1);t<0&&(t=this.placed.length-1);const e=this.placed[t];this.ctl.ground!==e.solid&&(this.onSound?.("remove",this.placed[t].mesh.position),this.scene.remove(e.mesh),this.physics.remove(e.solid),this.placed.splice(t,1),this.all.splice(this.all.indexOf(e),1),this.left++,this.refresh())}update(t){this.ghost.visible=this.left>0&&!this.hidden,this.ctl.grounded&&(this.lastFloorY=this.ctl.pos.y);const e=Math.sin(t),n=Math.cos(t),s=this.dir.set(0,0,0);Math.abs(e)>Math.abs(n)?s.x=Math.sign(e):s.z=Math.sign(n);const r=this.origin,a=(h,u)=>u+Math.round((h-u)/Te)*Te,o=a(this.ctl.pos.x,r.x)+s.x*Te,c=a(this.ctl.pos.z,r.z)+s.z*Te;let l=Math.round(this.lastFloorY-r.y)+r.y;this.ghostOk=!1;for(let h=0;h<=2;h++)if(this.ghost.position.set(o,l+h-.5,c),this.free(this.ghost.position)){this.ghostOk=this.left>0;break}this.ghost.material.color.setHex(this.ghostOk?3854682:15220794)}bodyOverlap(t){const e=this.ctl.pos,n=Math.min(e.x+Ye.halfW,t.x+gn.x/2)-Math.max(e.x-Ye.halfW,t.x-gn.x/2),s=Math.min(e.z+Ye.halfW,t.z+gn.z/2)-Math.max(e.z-Ye.halfW,t.z-gn.z/2),r=Math.min(e.y+Ye.height,t.y+.5)-Math.max(e.y+.02,t.y-.5);return n<=0||s<=0||r<=0?0:Math.min(n,s)}free(t){const e=new ze(new R(t.x-gn.x/2+.02,t.y-.48,t.z-gn.z/2+.02),new R(t.x+gn.x/2-.02,t.y+.48,t.z+gn.z/2-.02));return this.bodyOverlap(t)>Q_?!1:!this.physics.solids.some(n=>e.intersectsBox(n.box))}refresh(){this.counter.innerHTML=this.left>0?`🧱 × ${this.left}`:`🧱 × 0 <small>· ${rt("не хватает? ⟲ R — заново","not enough? ⟲ R — reset")}</small>`,this.counter.classList.toggle("empty",this.left===0),this.onChange?.()}}let dh=!1;function tv(){if(dh)return;dh=!0;const i=document.createElement("style");i.textContent=`
.bridge-ui{position:absolute;inset:0;pointer-events:none;z-index:6;font-family:Arial,sans-serif}
.bridge-count{position:absolute;left:50%;transform:translateX(-50%);padding:6px 18px;border-radius:14px;background:#c8874a;color:#fff;font-family:Rubik,Arial,sans-serif;font-weight:900;font-size:22px;text-shadow:0 2px 0 #6b3e18;box-shadow:0 3px 0 #8a5528,0 6px 12px rgba(0,0,0,.2)}
.bridge-count small{font-size:15px;font-weight:700;opacity:.95}
.bridge-count.empty{background:#8e98a6;box-shadow:0 3px 0 #5c6470}
.bridge-btns{position:absolute;display:flex;flex-direction:column;gap:10px;pointer-events:auto}
.bridge-btn{width:var(--s);height:var(--s);border-radius:16px;border:3px solid rgba(255,255,255,.8);background:rgba(200,135,74,.85);color:#fff;font-size:calc(var(--s)*.42);display:flex;align-items:center;justify-content:center;position:relative;touch-action:none;cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,.25)}
.bridge-btn span{position:absolute;right:4px;bottom:2px;font-size:13px;font-weight:700;opacity:.85}
.bridge-btn.take{background:rgba(42,116,232,.85)}
.bridge-btn.reset{background:rgba(120,128,140,.85)}
.bridge-btn:active{transform:translateY(2px)}
`,document.head.appendChild(i)}const Pr=[{id:"noob",name:rt("Нуб","Noob"),price:0,look:hu},{id:"red",name:rt("Ёжик","Spike"),price:30,look:{skin:15845280,shirt:15220794,pants:1908002,shoes:16777215,sleeve:.3,hair:"spiky",hairColor:1446416,face:"happy"}},{id:"cap",name:rt("Кепка","Cap"),price:50,look:{skin:9263675,shirt:16237596,pants:2782440,shoes:2236962,sleeve:.35,hair:"cap",hat:3125322,face:"cool"}},{id:"girl",name:rt("Настя","Nastya"),price:60,look:{skin:15845280,shirt:16740277,pants:10181072,shoes:16777215,sleeve:1,hair:"long",hairColor:15254106,face:"smile"}},{id:"winter",name:rt("Зима","Winter"),price:80,look:{skin:16767925,shirt:2782440,pants:1908002,shoes:16777215,sleeve:1,hair:"beanie",hat:15220794,face:"grin"}},{id:"ginger",name:rt("Рыжик","Ginger"),price:100,look:{skin:15845280,shirt:1447446,pants:2829107,shoes:15658734,sleeve:.4,hair:"short",hairColor:12867100,face:"grin"}},{id:"lime",name:rt("Лайм","Lime"),price:140,look:{skin:10215773,shirt:1483683,pants:1007455,shoes:16237596,sleeve:0,hair:"none",face:"happy"}},{id:"ninja",name:rt("Ниндзя","Ninja"),price:200,look:{skin:5922667,shirt:1447446,pants:1447446,shoes:15220794,sleeve:1,hair:"beanie",hat:1447446,face:"cool"}},{id:"masha",name:rt("Маша","Masha"),price:40,look:{skin:16767925,shirt:10181072,pants:2782440,shoes:16777215,sleeve:.35,hair:"ponytail",hairColor:7027230,hat:16740277,face:"smile"}},{id:"lisa",name:rt("Лиса","Foxy"),price:70,look:{skin:15845280,shirt:16747050,pants:16777215,shoes:16747050,sleeve:.35,hair:"pigtails",hairColor:12867100,hat:3854682,face:"happy"}},{id:"ballet",name:rt("Балет","Ballet"),price:90,look:{skin:16767925,shirt:16761565,pants:16761565,shoes:16777215,sleeve:0,hair:"bun",hairColor:15254106,hat:16740277,face:"smile"}},{id:"kpop",name:rt("Звезда","Star"),price:120,look:{skin:16769220,shirt:1447446,pants:16740277,shoes:1447446,sleeve:1,hair:"bob",hairColor:1446416,face:"cool"}},{id:"princess",name:rt("Белла","Bella"),price:160,look:{skin:16767925,shirt:16740277,pants:16740277,shoes:16765498,sleeve:.35,hair:"bow",hairColor:15980410,hat:16765498,face:"happy"}},{id:"mint",name:rt("Мятка","Minty"),price:180,look:{skin:15845280,shirt:7332036,pants:4033776,shoes:16777215,sleeve:1,hair:"pigtails",hairColor:8116479,hat:16777215,face:"grin"}},{id:"unicorn",name:rt("Пони","Pony"),price:250,look:{skin:16777215,shirt:13081599,pants:8116479,shoes:16740277,sleeve:.35,hair:"ponytail",hairColor:16740277,hat:16765498,face:"happy"}},{id:"emo",name:rt("Готка","Goth"),price:300,look:{skin:16773350,shirt:5909114,pants:1447446,shoes:1447446,sleeve:1,hair:"bob",hairColor:2757184,face:"cool"}},{id:"surfer",name:rt("Сёрфер","Surfer"),price:110,look:{skin:14261100,shirt:1483683,pants:16765498,shoes:16777215,sleeve:0,hair:"spiky",hairColor:15980410,face:"grin"}},{id:"gold",name:rt("Золотой","Golden"),price:400,look:{skin:16765498,shirt:16758784,pants:16765498,shoes:16758784,sleeve:0,hair:"none",face:"cool"}}].sort((i,t)=>i.price-t.price),fh=[{id:"magnet",name:rt("Магнит","Magnet"),icon:"🧲",prices:[60,150,300],desc:i=>rt(`Монеты тянутся к тебе: радиус ${(1.3+i).toFixed(1)} м`,`Pulls coins to you: radius ${(1.3+i).toFixed(1)} m`)},{id:"piggy",name:rt("Копилка","Piggy bank"),icon:"🐷",prices:[100,250,500],desc:i=>rt(`Монета на трассе стоит ${1+i}`,`Each track coin is worth ${1+i}`)},{id:"chute",name:rt("Парашют","Parachute"),icon:"🪂",prices:[80,200,400],desc:i=>rt(`Упал — вернёшься туда, где стоял, а не на чекпоинт. ${i} раз за забег`,`Fell? Return to where you stood, not the checkpoint. ${i}× per run`)},{id:"spare",name:rt("Запасной блок","Spare block"),icon:"🧱",prices:[350],desc:()=>rt("+1 блок на каждом этапе с мостом","+1 block on every bridge stage")}],Lr=[{id:"none",name:rt("Без питомца","No pet"),price:0,bonus:0,look:{kind:"cat",body:16777215,accent:16777215}},{id:"cat",name:rt("Котокуб +10%","Cat cube +10%"),price:150,bonus:.1,look:{kind:"cat",body:16751162,accent:16777215}},{id:"dog",name:rt("Пёс-блок +20%","Dog block +20%"),price:300,bonus:.2,look:{kind:"dog",body:13141834,accent:5913120}},{id:"dragon",name:rt("Дракоша +35%","Dragon +35%"),price:700,bonus:.35,look:{kind:"dragon",body:3854682,accent:12160255}}],to=[{id:"none",name:rt("Без следа","No trail"),price:0,colors:[]},{id:"rainbow",name:rt("Радуга","Rainbow"),price:200,colors:[15220794,16751135,16237596,3125322,2782440,10181072]},{id:"fire",name:rt("Огонь","Fire"),price:250,colors:[16726554,16751135,16769357]},{id:"stars",name:rt("Звёзды","Stars"),price:300,colors:[16777215,16774048,9427199]}],Dt=new Nu("blox-obby-v2",{coins:0,owned:["noob"],skin:"noob",muted:!1,best:{},runs:0,unlocked:1,upgrades:{},pets:["none"],pet:"none",trails:["none"],trail:"none",chest:"",sfxVol:1,musicVol:1});nn.ready.then(()=>{const i=nn.currentPlayer;i&&Dt.attachCloud(i)}).catch(()=>{});const ev=5,nv=50,ph=100,iv=5,sv="overallprogress",mh=1e7;function gh(i){const t=Object.values(i).filter(s=>s>0),e=t.reduce((s,r)=>s+r,0),n=Math.min(mh-1,Math.round(e*10));return{score:t.length?t.length*mh-n:0,worlds:t.length,total:e}}const rv=20;function ov(i){const t=px(i,{...ru,cloudSea:!0}),{renderer:e,scene:n,followShadow:s}=t,r=new Px,a=new Rx(i),o=new Nx,c=new s_(o),l=new b_(i),h=new E_(i,()=>`DC ${e.info.render.calls}`),u=new P_(n),d=new R,f=new R(0,0,0),g=(C,B)=>new R(Math.sin(C*Math.PI/180)*B,0,-Math.cos(C*Math.PI/180)*B),v=C=>Math.atan2(-C.x,-C.z),m=Me({x:54,y:2,z:54},5423674);m.position.set(0,-1,0),n.add(m),o.addMesh(m);const p=360/ve.length,b=C=>(C+.5)*p;for(let C=0;C<ve.length;C++){const B=Me({x:3.5,y:.1,z:19},15259824),at=g(C*p,10);B.position.set(at.x,.05,at.z),B.rotation.y=-C*p*Math.PI/180,B.receiveShadow=!0,n.add(B)}{const C=new cu(lu,77);C.root(new R(0,0,0),40);for(let B=0;B<40;B++){const at=B/40*360;if(ve.some((I,it)=>Math.abs((at-it*p+540)%360-180)<12))continue;const mt=g(at,24.5);C.tree(mt.x,0,mt.z,C.range(.8,1.2))}for(let B=0;B<8;B++)C.island(Math.cos(B*.8)*C.range(45,70),C.range(-8,6),Math.sin(B*.8)*C.range(45,70),C.range(6,12));C.tower(-65,0,-55,ve[0].track),C.flush(n,o)}const w=ve.map((C,B)=>{const at=g(B*p,20);return new U_(n,o,at,v(at),C.portal,C.name)}),M=C=>{const B=g(C,11.5);return[B,v(B)]},T={skins:new Cr(n,o,...M(b(6)),16742959,rt("Скины","Skins"),"👕"),upg:new Cr(n,o,...M(b(0)),2782440,rt("Улучшения","Upgrades"),"⚡"),pets:new Cr(n,o,...M(b(2)),10181072,rt("Питомцы","Pets"),"🐾"),trails:new Cr(n,o,...M(b(4)),16740277,rt("Следы","Trails"),"✨")},S=new N_(n,o,g(b(1),7)),L=Sl([rt("РЕКОРДЫ","RECORDS")],{w:512,h:400});L.scale.set(5,3.9,1),L.position.copy(g(b(5),19)).setY(3.6),n.add(L);{const C=Me({x:.3,y:1.6,z:.3},4475474);C.position.copy(g(b(5),19)).setY(.8),C.userData.static=!0,n.add(C)}{const C=[];n.traverse(B=>{B.isMesh&&B.userData.static&&C.push(B)}),Yo(n,C)}function _(C,B,at,mt){const I=at.reduce((bt,yt)=>bt+yt.x,0)/at.length,it=at.reduce((bt,yt)=>bt+yt.z,0)/at.length,q=Math.max(...at.map(bt=>bt.y))+12,lt=-30,ht=[];for(let bt=lt,yt=0;bt<q;bt+=4,yt++){const he=Me({x:9,y:4,z:9},mt[yt%mt.length]);he.position.set(I,bt+2,it),C.add(he),B.addMesh(he,"decor"),ht.push(he)}const et=Me({x:11,y:1,z:11},16765498);et.position.set(I,q+.5,it),C.add(et),ht.push(et),Yo(C,ht)}const E=K_.map((C,B)=>{const at=new R(1e3*(B+1),0,0),mt=Ox(C,n,o,c,{origin:at,colors:ve[B].track});return _x(n,mt,ve[B].palette,ve[B].track,100+B,o),qc(n,mt.map(I=>I.origin)),ve[B].id==="tower"&&_(n,o,mt.map(I=>I.origin),ve[B].track),{stages:mt,coins:new C_(n,mt)}});qc(n,[f,new R(30,0,0),new R(-30,0,0),new R(0,0,30),new R(0,0,-30)]);const D=C=>(Pr.find(B=>B.id===C)??Pr[0]).look;let U=new us(D(Dt.get("skin")));n.add(U.root);const P=new du(U,(C,B,at)=>o.move(C,B,at)),J=C=>{Dt.set("skin",C),n.remove(U.root),U=new us(D(C)),n.add(U.root),P.setAvatar(U)};let $=null;const z=C=>{Dt.set("pet",C),$?.dispose(n),$=null;const B=Lr.find(at=>at.id===C);B&&B.id!=="none"&&($=new I_(n,B.look),$.group.position.copy(P.pos))},Z=()=>to.find(C=>C.id===Dt.get("trail"))?.colors??[],X=new j_(n,o,P,i),nt=new M_(n,o,6,c);let st="menu",ut=0,dt=0,St=0,Wt=0,re=0,$t=0,tt=0,ft=0,ot=!1,Ut=!1;const Ft=async C=>{ot=!0,nn.gameplayStop();try{return await C()}finally{ot=!1,xt.getDelta(),st!=="menu"&&nn.gameplayStart()}},Lt=new R;let xe=0;const kt=()=>E[ut],se=()=>ve[ut].id==="tower"?7:rv,Xt=C=>Dt.get("upgrades")[C]??0,Gt=C=>{C<=0||(re+=C,Dt.set("coins",Dt.get("coins")+C),l.setCoins(Dt.get("coins")))},Se=C=>{const B=Lr.find(mt=>mt.id===Dt.get("pet"))?.bonus??0;$t+=C*(1+Xt("piggy"))*(1+B);const at=Math.floor($t);$t-=at,Gt(at)};l.setCoins(Dt.get("coins")),te.setSfxVolume(Dt.get("sfxVol")??1),te.setMusicVolume(Dt.get("musicVol")??1),l.setVolumes(Dt.get("sfxVol")??1,Dt.get("musicVol")??1),l.onVolume=(C,B)=>{C==="sfx"?(te.setSfxVolume(B),Dt.set("sfxVol",B),te.play("coin",0)):(te.setMusicVolume(B),Dt.set("musicVol",B))};const Ee=()=>{const C=gh(Dt.get("best"));C.score>0&&nn.leaderboards.submit(sv,C.score,`${C.worlds}|${Math.round(C.total)}`)};nn.ready.then(()=>setTimeout(Ee,3e3));const ye=C=>`${Math.floor(C/60)}:${String(Math.floor(C%60)).padStart(2,"0")}`,De=()=>{const C=Dt.get("unlocked"),B=Dt.get("best");w.forEach((mt,I)=>mt.setLocked(I>=C,I>=C?rt("🔒 ЗАКРЫТО","🔒 LOCKED"):B[ve[I].id]?`⏱ ${ye(B[ve[I].id])}`:rt("ВХОД","ENTER")));const at=gh(B);bu(L,[rt("РЕКОРДЫ","RECORDS"),...ve.map(mt=>`${mt.name}  ${B[mt.id]?ye(B[mt.id]):"—"}`),`${rt("ИТОГ","TOTAL")}: ${at.worlds} · ${ye(at.total)}`])},ce=C=>Dt.get("coins")<C?(te.play("denied",0),!1):(Dt.set("coins",Dt.get("coins")-C),l.setCoins(Dt.get("coins")),te.play("coin",0),!0),_e=()=>{nn.gameplayStart(),l.showHud(!0),X.setVisible(st==="run")},N={buy:rt("Купить","Buy"),wear:rt("Надеть","Wear"),worn:rt("Надето","Worn"),close:rt("Закрыть","Close"),max:rt("МАКС","MAX")},Ie={skins:new Rr(i,Pr,()=>({coins:Dt.get("coins"),owned:Dt.get("owned"),selected:Dt.get("skin")}),C=>{const B=Pr.find(at=>at.id===C);return ce(B.price)?(Dt.set("owned",[...Dt.get("owned"),C]),!0):!1},C=>{J(C),te.play("click",0)},_e,{title:rt("СКИНЫ","SKINS"),...N}),upg:new Rr(i,fh.map(C=>({id:C.id,name:C.name,icon:C.icon,prices:C.prices,desc:C.desc})),()=>({coins:Dt.get("coins"),levels:Dt.get("upgrades")}),C=>{const B=fh.find(mt=>mt.id===C),at=Xt(C);return at>=B.prices.length||!ce(B.prices[at])?!1:(Dt.set("upgrades",{...Dt.get("upgrades"),[C]:at+1}),u.emit("confetti",d.copy(P.pos).setY(P.pos.y+2),.6),!0)},()=>{},_e,{title:rt("УЛУЧШЕНИЯ","UPGRADES"),...N}),pets:new Rr(i,Lr.map(C=>({id:C.id,name:C.name,price:C.price,...C.id==="none"?{icon:"🚫"}:{make:()=>vu(C.look)}})),()=>({coins:Dt.get("coins"),owned:Dt.get("pets"),selected:Dt.get("pet")}),C=>{const B=Lr.find(at=>at.id===C);return ce(B.price)?(Dt.set("pets",[...Dt.get("pets"),C]),!0):!1},C=>{z(C),te.play("click",0)},_e,{title:rt("ПИТОМЦЫ","PETS"),...N}),trails:new Rr(i,to.map(C=>({id:C.id,name:C.name,price:C.price,...C.colors.length?{colors:C.colors}:{icon:"🚫"}})),()=>({coins:Dt.get("coins"),owned:Dt.get("trails"),selected:Dt.get("trail")}),C=>{const B=to.find(at=>at.id===C);return ce(B.price)?(Dt.set("trails",[...Dt.get("trails"),C]),!0):!1},C=>{Dt.set("trail",C),te.play("click",0)},_e,{title:rt("СЛЕДЫ","TRAILS"),...N})},Zt=C=>{nn.gameplayStop(),te.play("click",0),l.showHud(!1),X.setVisible(!1),C.open()},A=()=>!!i.querySelector(".shop.on"),x=C=>{const B=kt().stages[C],at=B.def?.blocks??0;X.startStage(B.origin,at>0?at+Xt("spare"):0);const mt=B.def?.hint;l.hint(mt?Z_[mt]??null:null),l.setStage(`${ve[ut].name} · ${C+1} / ${kt().stages.length-1}`,C/(kt().stages.length-1)),r.turnTo(B.yaw+Math.PI),ft=0,l.showSkip(null)},k=async()=>{if(st!=="run"||!await Ft(Ol))return;const C=kt().stages[dt+1];C&&(l.showSkip(null),P.pos.copy(C.spawn).setY(C.spawn.y+.3),P.vel.set(0,0,0))},G=()=>{st="hub",t.setSky(ve[0].sky,ve[0].fog),X.clearAll(),X.startStage(f,0),X.setVisible(!1),P.setSpawn(new R(0,.01,3),Math.PI),P.respawn(),nt.toHub(f,16);for(const C of w)C.trigger.reset();l.setStage(rt("ХАБ","HUB"),0),l.hint(rt("Выбери портал — или загляни в лавки 🛒","Pick a portal — or visit the shops 🛒")),l.showHomeButton(!1),l.showSkip(null),nn.gameplayStart(),r.turnTo(0),$?.group.position.copy(P.pos),De()},K=C=>{st="run",ut=C,dt=0,St=0,Wt=0,re=0,$t=0,tt=Xt("chute");const B=kt();c.resetAll(),B.coins.reset(),B.coins.pick=1.3+Xt("magnet");for(const at of B.stages)at.pad.material.color.setHex(at.index===B.stages.length-1?16237596:9345190);t.setSky(ve[C].sky,ve[C].fog),X.clearAll(),P.setSpawn(B.stages[0].spawn,B.stages[0].yaw),P.respawn(),Lt.copy(P.pos),nt.fallLimit=se(),nt.toCourse(B.stages),X.setVisible(!0),x(0),l.showHomeButton(!0),l.toast(`${rt("МИР","WORLD")}: ${ve[C].name}`,1600),te.play("checkpoint",0,.5),r.yaw=B.stages[0].yaw+Math.PI,$?.group.position.copy(P.pos)},ct=()=>{st="hub",X.startStage(kt().stages[dt].origin,0),l.hint(null),l.toast(rt("ФИНИШ!","FINISH!"),1600),te.play("finish",0),u.emit("confetti",d.copy(P.pos).setY(P.pos.y+1.5),2.5),Gt(nv+25*ut);const C=ve[ut].id,B={...Dt.get("best")};B[C]||(Gt(ph),l.toast(`${rt("ПЕРВОЕ ПРОХОЖДЕНИЕ","FIRST CLEAR")} +${ph}`,1800));const at=!B[C]||St<B[C];at&&(B[C]=St);const mt=Dt.get("unlocked");l.showSkip(null),nn.gameplayStop(),Dt.patch({best:B,runs:Dt.get("runs")+1,unlocked:Math.max(mt,Math.min(ve.length,ut+2))}),Ee();const I=Dt.get("unlocked")>mt,it=Wt<=3?3:Wt<=10?2:1;setTimeout(()=>Ut&&l.showFinish({title:at?rt("НОВЫЙ РЕКОРД!","NEW RECORD!"):rt("ТЫ ПРОШЁЛ!","YOU MADE IT!"),stars:it,line:`⏱ ${ye(St)}   💀 ${Wt}   ${ks()} +${re}${I?`<br>🔓 ${rt("Открыт мир","Unlocked")} ${ve[ut+1].name}!`:""}`,next:rt("В ХАБ","TO HUB"),bonus:{label:rt(`📺 ×2 монеты (+${re})`,`📺 ×2 coins (+${re})`),onClick:async()=>{const q=re;return await Ft(Ol)?(Gt(q),te.play("coin",0),!0):!1}}},()=>{Ut=!1,Ft(Bl).then(G)}),600),Ut=!0};l.onHome=()=>{if(Ut){Ut=!1,l.closeOverlay(),te.play("click",0),G();return}st==="run"&&(te.play("click",0),st="hub",Ft(Bl).then(G))};const pt=()=>{st="menu",nn.gameplayStop(),l.showHud(!1),X.setVisible(!1),l.showMenu({title1:rt("ОББИ:","OBBY:"),title2:rt("БЛОК ЗА БЛОКОМ","BLOCK BY BLOCK"),play:rt("ИГРАТЬ","PLAY"),sub:`${ks()} ${Dt.get("coins")}`},()=>{te.play("click",0),te.startMusic(),l.showHud(!0),G()})};X.onReset=()=>P.respawn(),X.onSound=(C,B)=>{te.play(C),C==="place"&&u.emit("wood",d.copy(B).setY(B.y+.5)),C==="remove"&&u.emit("poof",B,.6)},P.onJump=()=>te.play("jump"),P.onLand=C=>{C>9&&te.play("land"),u.emit("dust",d.copy(P.pos).setY(P.pos.y+.1),Math.min(1.6,C/12))};const Q=new R;let j=0;const gt=C=>{xe+=C,a.update();const B=l.menuOpen||A();B&&(a.state.move.x=a.state.move.y=0,a.state.jump=!1);const at=a.consumeLook();B||r.rotate(at.x,at.y,at.zoom),st==="menu"&&(r.yaw+=C*.12,r.pitch=.3),c.tick(C);const mt=c.affect(P,C);if(mt==="bounce"&&te.play("bounce",.1),mt==="bump"&&(te.play("bounce",.15),r.shake(.2),u.emit("poof",d.copy(P.pos).setY(P.pos.y+1.2),.6)),mt==="break"&&(te.play("remove",0),u.emit("wood",d.copy(P.pos).setY(P.pos.y+1.5),2)),P.update(C,a.state.move,a.state.jump,r.forward(Q)),st==="run"){St+=C;const q=P.ground;P.grounded&&q&&(!q.kind||q.kind==="checkpoint"||q.kind==="placed")&&Lt.copy(P.pos);const lt=P.pos.y<P.spawn.y-se();(mt==="kill"||lt)&&(mt==="kill"&&(u.emit("lava",d.copy(P.pos).setY(P.pos.y+.8)),r.shake(.35)),te.play(mt==="kill"?"lava":"respawn",0),Wt++,++ft>=iv&&l.showSkip(rt("⏭ Пропустить этап 📺","⏭ Skip stage 📺"),()=>void k()),tt>0?(tt--,P.pos.copy(Lt).setY(Lt.y+.5),P.vel.set(0,0,0),l.toast(`🪂 ×${tt}`,800)):P.respawn(),u.emit("poof",d.copy(P.pos).setY(P.pos.y+1.2)));const ht=q?.stage,et=kt();if(ht!==void 0&&ht>dt&&et.stages[ht]?.checkpoint===q){for(let yt=dt+1;yt<=ht;yt++)Hx(et.stages[yt]);dt=ht,P.setSpawn(et.stages[dt].spawn,et.stages[dt].yaw),dt<et.stages.length-1?(x(dt),l.toast(rt("ЧЕКПОИНТ!","CHECKPOINT!")),te.play("checkpoint",0),Gt(ev),u.emit("confetti",d.copy(P.pos).setY(P.pos.y+1.5))):ct()}const bt=et.coins.update(C,P.pos);bt&&(Se(bt),te.play("coin"),u.emit("coin",d.copy(P.pos).setY(P.pos.y+1.6)))}else kt().coins.update(C,null),P.pos.y<-15&&(P.respawn(),te.play("respawn",0));if(st==="hub"&&!B&&(w.forEach((q,lt)=>{q.trigger.enter(P.pos)&&(lt<Dt.get("unlocked")?K(lt):(te.play("denied",0),l.toast(`🔒 ${rt("Сначала пройди","First beat")} ${ve[lt-1].name}`,1500)))}),T.skins.trigger.enter(P.pos)&&Zt(Ie.skins),T.upg.trigger.enter(P.pos)&&Zt(Ie.upg),T.pets.trigger.enter(P.pos)&&Zt(Ie.pets),T.trails.trigger.enter(P.pos)&&Zt(Ie.trails),S.trigger.enter(P.pos))){const q=new Date().toISOString().slice(0,10);if(Dt.get("chest")!==q){const lt=30+Math.floor(Math.random()*31);Dt.set("chest",q),Gt(lt),S.pop(),te.play("checkpoint",0),u.emit("coin",d.copy(S.group.position).setY(1.8),3),l.toast(`🎁 +${lt}`,1500)}else te.play("denied",0),l.toast(rt("🎁 Приходи завтра!","🎁 Come back tomorrow!"),1300)}S.update(C,Dt.get("chest")!==new Date().toISOString().slice(0,10),xe);for(const q of w)q.update(xe);X.update(P.yaw),nt.update(C,dt,r.camera.position,P.pos,P),u.update(C);const I=Math.hypot(P.vel.x,P.vel.z)>1;$?.update(C,P.pos,P.yaw,I);const it=Z();j-=C,it.length&&I&&j<=0&&(u.emit("trail",d.copy(P.pos).setY(P.pos.y+.4),1,it),j=.06),r.update(C,P.pos),s(P.pos)};let At=!1;const xt=new _f;return document.addEventListener("visibilitychange",()=>{At=document.hidden,At||xt.getDelta()}),{renderer:e,resize(C,B){r.resize(C,B)},async load(C){P.setSpawn(new R(0,.01,3),Math.PI),P.respawn(),nt.toHub(f,16),z(Dt.get("pet")),De();const B=new Ae;for(const it of[Su,gu])B.add(new ne(new An(1,1,1),it));B.position.copy(P.pos),n.add(B);const at=[];n.traverse(it=>{it.visible||(at.push(it),it.visible=!0)}),n.traverse(it=>{const q=it.material;for(const lt of q?Array.isArray(q)?q:[q]:[])for(const ht of[lt.map,lt.emissiveMap])ht&&e.initTexture(ht)});for(const it of Object.values(Ie))it.prepare();C(.4),await te.load(),C(.6),await e.compileAsync(n,r.camera);const mt=[];n.traverse(it=>{it.frustumCulled&&(mt.push(it),it.frustumCulled=!1)});const I=new En(64,64);e.setRenderTarget(I),e.render(n,r.camera),e.setRenderTarget(null),I.dispose();for(const it of mt)it.frustumCulled=!0;for(const it of at)it.visible=!1;n.remove(B),C(1)},start(){nn.gameplayStart(),pt(),e.setAnimationLoop(()=>{const C=xt.getDelta(),B=Math.min(C,1/20);At||ot||(gt(B),e.render(n,r.camera),h.frame(C))})}}}export{ov as createScene};
