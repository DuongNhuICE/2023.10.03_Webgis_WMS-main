"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1950],{2742:function(e,n,t){var s=t(2739),r=t(1376),a=t(5469),o=t(1372),i=t(5783),u=t(4354),c=t(720),l=t(9039),w=t(9072),Z=t(7975);const g=new c.Z({color:"black",width:1}),d={square:new l.ZP({image:new w.Z({fill:new Z.Z({color:"blue"}),stroke:g,points:4,radius:80,angle:Math.PI/4})}),triangle:new l.ZP({image:new w.Z({fill:new Z.Z({color:"red"}),stroke:g,points:3,radius:80,rotation:Math.PI/4,angle:0})}),star:new l.ZP({image:new w.Z({fill:new Z.Z({color:"green"}),stroke:g,points:5,radius:80,radius2:4,angle:0})})};function f(e,n,t){const r=new s.Z(new a.Z(e));r.setStyle(n);const u=new i.Z({features:[r]}),c=new o.Z({source:u});return c.setZIndex(t),c}const p=f([40,40],d.star),h=f([0,0],d.square,1),k=f([0,40],d.triangle,0),m=[];m.push(h),m.push(k);const I=new r.Z({layers:m,target:"map",view:new u.ZP({center:[0,0],zoom:18})});function P(e,n){const t=document.getElementById("idx"+e);t.onchange=function(){n.setZIndex(parseInt(this.value,10)||0)},t.value=String(n.getZIndex())}p.setMap(I),P(1,h),P(2,k)}},function(e){var n=function(n){return e(e.s=n)};n(9877),n(2742)}]);
//# sourceMappingURL=layer-z-index.js.map