import{W as h,S as w,P as f,a as g,b as y,C as x,M}from"./three-vendor-8XBNpc-W.js";function b(){try{const a=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(a.getContext("webgl")||a.getContext("experimental-webgl")))}catch{return!1}}function P(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!b())return;const t=document.querySelector("[data-plane-reveal-stage]")||document.querySelector(".p-top-fv");if(!t)return;const e=document.createElement("canvas");e.setAttribute("data-plane-reveal-canvas","true"),e.style.position="absolute",e.style.inset="0",e.style.width="100%",e.style.height="100%",e.style.pointerEvents="none",e.style.zIndex="1",e.style.opacity="0.7",t.prepend(e);const o=new h({canvas:e,alpha:!0,antialias:!0,powerPreference:"high-performance"});o.setPixelRatio(Math.min(window.devicePixelRatio,2));const l=new w,i=new f(45,t.clientWidth/t.clientHeight,.1,100);i.position.z=5;const m=new g(6,3.5,32,32),r=new y({uniforms:{uTime:{value:0},uColor:{value:new x("#609aae")}},vertexShader:`
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += sin(pos.x * 2.0 + uTime * 0.8) * 0.08;
        pos.z += cos(pos.y * 2.0 + uTime * 0.6) * 0.06;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        float alpha = smoothstep(0.0, 0.8, sin(vUv.x * 3.1415) * sin(vUv.y * 3.1415)) * 0.25;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,transparent:!0,wireframe:!1}),s=new M(m,r);l.add(s);const c=()=>{if(!t)return;const n=t.clientWidth,u=t.clientHeight;i.aspect=n/u,i.updateProjectionMatrix(),o.setSize(n,u)};c(),window.addEventListener("resize",c,{passive:!0});let d;const p=performance.now(),v=()=>{const n=(performance.now()-p)*.001;r.uniforms.uTime.value=n,s.rotation.y=Math.sin(n*.2)*.05,s.rotation.x=Math.cos(n*.15)*.03,o.render(l,i),d=requestAnimationFrame(v)};return v(),()=>{cancelAnimationFrame(d),window.removeEventListener("resize",c),o.dispose(),m.dispose(),r.dispose(),e.remove()}}export{P as initWebGLPlaneReveal,b as isWebGLAvailable};
