"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7569],{6720:function(e,t,n){var o=n(1712),r=n(1376),i=n(5783),c=n(4354),l=n(1998),a=n(9039),s=n(7138),u=n(7975),g=n(720),p=n(2010),w=n(1372);const f=new p.Z({source:new l.Z({attributions:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',url:"https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",maxZoom:20})}),m={Point:new a.ZP({image:new s.Z({fill:new u.Z({color:"rgba(255,255,0,0.4)"}),radius:5,stroke:new g.Z({color:"#ff0",width:1})})}),LineString:new a.ZP({stroke:new g.Z({color:"#f00",width:3})}),MultiLineString:new a.ZP({stroke:new g.Z({color:"#0f0",width:3})})},h=new w.Z({source:new i.Z({url:"data/gpx/fells_loop.gpx",format:new o.Z}),style:function(e){return m[e.getGeometry().getType()]}}),y=new r.Z({layers:[f,h],target:document.getElementById("map"),view:new c.ZP({center:[-7916041.528716288,5228379.045749711],zoom:12})}),Z=function(e){const t=[];if(y.forEachFeatureAtPixel(e,(function(e){t.push(e)})),t.length>0){const e=[];let n,o;for(n=0,o=t.length;n<o;++n)e.push(t[n].get("desc"));document.getElementById("info").innerHTML=e.join(", ")||"(unknown)",y.getTarget().style.cursor="pointer"}else document.getElementById("info").innerHTML="&nbsp;",y.getTarget().style.cursor=""};y.on("pointermove",(function(e){if(e.dragging)return;const t=y.getEventPixel(e.originalEvent);Z(t)})),y.on("click",(function(e){Z(e.pixel)}))}},function(e){var t=function(t){return e(e.s=t)};t(9877),t(6720)}]);
//# sourceMappingURL=gpx.js.map