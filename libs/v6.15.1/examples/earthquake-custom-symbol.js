"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2148],{4520:function(e,t,n){var r=n(7103),a=n(1376),o=n(5528),s=n(4703),c=n(5783),l=n(4354),i=n(9039),u=n(7975),w=n(720),m=n(4598),Z=n(1372),f=n(2010),g=n(8164);const k=[[0,0],[4,2],[6,0],[10,5],[6,3],[4,5],[0,0]];let p;const y=function(e){return[e[0]*p,e[1]*p]},P={},b=new Z.Z({source:new c.Z({url:"data/kml/2012_Earthquakes_Mag5.kml",format:new r.ZP({extractStyles:!1})}),style:function(e){const t=e.get("name"),n=parseFloat(t.substr(2)),r=parseInt(10+40*(n-5),10);p=r/10;let a=P[r];if(!a){const e=document.createElement("canvas"),t=(0,g.Pt)(e.getContext("2d"),{size:[r,r],pixelRatio:1});t.setStyle(new i.ZP({fill:new u.Z({color:"rgba(255, 153, 0, 0.4)"}),stroke:new w.Z({color:"rgba(255, 204, 0, 0.2)",width:2})})),t.drawGeometry(new o.ZP([k.map(y)])),a=new i.ZP({image:new m.Z({img:e,imgSize:[r,r],rotation:1.2})}),P[r]=a}return a}}),d=new f.Z({source:new s.Z({layer:"toner"})});new a.Z({layers:[d,b],target:"map",view:new l.ZP({center:[0,0],zoom:2})})}},function(e){var t=function(t){return e(e.s=t)};t(9877),t(4520)}]);
//# sourceMappingURL=earthquake-custom-symbol.js.map