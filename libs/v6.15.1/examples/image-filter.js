"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8628],{1722:function(t,e,n){var a=n(1376),r=n(2010),o=n(4354),s=n(1998),c=n(2810);const l=new r.Z({source:new s.Z({attributions:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',url:"https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",maxZoom:20,crossOrigin:""})}),i=new a.Z({layers:[l],target:"map",view:new o.ZP({center:(0,c.mi)([-120,50]),zoom:6})}),h={none:[0,0,0,0,1,0,0,0,0],sharpen:[0,-1,0,-1,5,-1,0,-1,0],sharpenless:[0,-1,0,-1,10,-1,0,-1,0],blur:[1,1,1,1,1,1,1,1,1],shadow:[1,2,1,0,1,0,-1,-2,-1],emboss:[-2,1,0,-1,1,1,0,1,2],edge:[0,1,0,1,-4,1,0,1,0]};function p(t){const e=t.length,n=new Array(e);let a,r=0;for(a=0;a<e;++a)r+=t[a];for(r<=0?(n.normalized=!1,r=1):n.normalized=!0,a=0;a<e;++a)n[a]=t[a]/r;return n}const u=document.getElementById("kernel");let m=p(h[u.value]);u.onchange=function(){m=p(h[u.value]),i.render()},l.on("postrender",(function(t){!function(t,e){const n=t.canvas,a=n.width,r=n.height,o=Math.sqrt(e.length),s=Math.floor(o/2),c=t.getImageData(0,0,a,r).data,l=t.createImageData(a,r),i=l.data;for(let t=0;t<r;++t){const n=t*a;for(let l=0;l<a;++l){let h=0,p=0,u=0,m=0;for(let n=0;n<o;++n)for(let i=0;i<o;++i){const g=e[n*o+i],f=4*(Math.min(r-1,Math.max(0,t+n-s))*a+Math.min(a-1,Math.max(0,l+i-s)));h+=c[f]*g,p+=c[f+1]*g,u+=c[f+2]*g,m+=c[f+3]*g}const g=4*(n+l);i[g]=h,i[g+1]=p,i[g+2]=u,i[g+3]=e.normalized?m:255}}t.putImageData(l,0,0)}(t.context,m)}))}},function(t){var e=function(e){return t(t.s=e)};e(9877),e(1722)}]);
//# sourceMappingURL=image-filter.js.map