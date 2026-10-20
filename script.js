var CITIES=[["Barranquilla",10.9639,-74.7964],["Bogotá",4.711,-74.0721],["Medellín",6.2442,-75.5812],["Quito",-0.1807,-78.4678],["Madrid",40.4168,-3.7038],["Tokio",35.6762,139.6503],["Singapur",1.3521,103.8198],["Londres",51.5074,-0.1278],["Nueva York",40.7128,-74.006],["Sídney",-33.8688,151.2093]];
var R=6371.0088,rad=function(x){return x*Math.PI/180},deg=function(x){return x*180/Math.PI};
function hav(a,b,c,d){var p1=rad(a),p2=rad(c),h=Math.sin((p2-p1)/2)**2+Math.cos(p1)*Math.cos(p2)*Math.sin(rad(d-b)/2)**2;return 2*R*Math.asin(Math.min(1,Math.sqrt(h)))}
function slc(a,b,c,d){var p1=rad(a),p2=rad(c),x=Math.sin(p1)*Math.sin(p2)+Math.cos(p1)*Math.cos(p2)*Math.cos(rad(d-b));return R*Math.acos(Math.max(-1,Math.min(1,x)))}
function vin(la1,lo1,la2,lo2){var a=6378137,f=1/298.257223563,b=(1-f)*a,L=rad(lo2-lo1),U1=Math.atan((1-f)*Math.tan(rad(la1))),U2=Math.atan((1-f)*Math.tan(rad(la2))),sU1=Math.sin(U1),cU1=Math.cos(U1),sU2=Math.sin(U2),cU2=Math.cos(U2),lam=L,ss,cs,sig,c2a,c2sm,sa,i;
for(i=0;i<200;i++){var sl=Math.sin(lam),cl=Math.cos(lam);ss=Math.hypot(cU2*sl,cU1*sU2-sU1*cU2*cl);if(ss===0)return 0;cs=sU1*sU2+cU1*cU2*cl;sig=Math.atan2(ss,cs);sa=cU1*cU2*sl/ss;c2a=1-sa*sa;c2sm=c2a?cs-2*sU1*sU2/c2a:0;var C=f/16*c2a*(4+f*(4-3*c2a)),lp=lam;lam=L+(1-C)*f*sa*(sig+C*ss*(c2sm+C*cs*(-1+2*c2sm*c2sm)));if(Math.abs(lam-lp)<1e-12)break}
if(i===200)return NaN;
var u2=c2a*(a*a-b*b)/(b*b),A=1+u2/16384*(4096+u2*(-768+u2*(320-175*u2))),B=u2/1024*(256+u2*(-128+u2*(74-47*u2))),ds=B*ss*(c2sm+B/4*(cs*(-1+2*c2sm*c2sm)-B/6*c2sm*(-3+4*ss*ss)*(-3+4*c2sm*c2sm)));return b*A*(sig-ds)/1000}
function brg(a,b,c,d){var p1=rad(a),p2=rad(c),dl=rad(d-b);return(deg(Math.atan2(Math.sin(dl)*Math.cos(p2),Math.cos(p1)*Math.sin(p2)-Math.sin(p1)*Math.cos(p2)*Math.cos(dl)))+360)%360}
function mid(a,b,c,d){var p1=rad(a),p2=rad(c),l1=rad(b),dl=rad(d-b),bx=Math.cos(p2)*Math.cos(dl),by=Math.cos(p2)*Math.sin(dl),p3=Math.atan2(Math.sin(p1)+Math.sin(p2),Math.hypot(Math.cos(p1)+bx,by)),l3=l1+Math.atan2(by,Math.cos(p1)+bx);return[deg(p3),((deg(l3)+540)%360)-180]}
function arc(a,b,c,d,n){var p1=rad(a),l1=rad(b),p2=rad(c),l2=rad(d),v1=[Math.cos(p1)*Math.cos(l1),Math.cos(p1)*Math.sin(l1),Math.sin(p1)],v2=[Math.cos(p2)*Math.cos(l2),Math.cos(p2)*Math.sin(l2),Math.sin(p2)],dot=Math.max(-1,Math.min(1,v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2])),w=Math.acos(dot),pts=[];
for(var i=0;i<=n;i++){var t=i/n,s=w?Math.sin((1-t)*w)/Math.sin(w):1-t,u=w?Math.sin(t*w)/Math.sin(w):t,x=s*v1[0]+u*v2[0],y=s*v1[1]+u*v2[1],z=s*v1[2]+u*v2[2];pts.push([deg(Math.atan2(z,Math.hypot(x,y))),deg(Math.atan2(y,x))])}return pts}
var $=function(i){return document.getElementById(i)};
function fx(lo){return(lo+180)*2}function fy(la){return(90-la)*2}
function fmt(x,d){return x.toLocaleString("es-CO",{minimumFractionDigits:d,maximumFractionDigits:d})}
function draw(a,b,c,d){var s="",i;
for(i=-180;i<=180;i+=30)s+='<line x1="'+fx(i)+'" y1="0" x2="'+fx(i)+'" y2="360" stroke="var(--grat)" stroke-width="'+(i===0?1.2:.6)+'"/>';
for(i=-90;i<=90;i+=30)s+='<line x1="0" y1="'+fy(i)+'" x2="720" y2="'+fy(i)+'" stroke="var(--grat)" stroke-width="'+(i===0?1.2:.6)+'"/>';
var p=arc(a,b,c,d,120),seg=[[]];
for(i=0;i<p.length;i++){if(i&&Math.abs(p[i][1]-p[i-1][1])>180)seg.push([]);seg[seg.length-1].push(fx(p[i][1]).toFixed(1)+","+fy(p[i][0]).toFixed(1))}
seg.forEach(function(g){if(g.length>1)s+='<polyline points="'+g.join(" ")+'" fill="none" stroke="var(--accent)" stroke-width="2.5"/>'});
s+='<circle cx="'+fx(b)+'" cy="'+fy(a)+'" r="6" fill="var(--a)"/><text x="'+(fx(b)+9)+'" y="'+(fy(a)-8)+'" fill="var(--a)" font-size="15" font-weight="600">A</text>';
s+='<circle cx="'+fx(d)+'" cy="'+fy(c)+'" r="6" fill="var(--b)"/><text x="'+(fx(d)+9)+'" y="'+(fy(c)-8)+'" fill="var(--b)" font-size="15" font-weight="600">B</text>';
$("map").innerHTML=s}
function calc(){var a=parseFloat($("la").value),b=parseFloat($("oa").value),c=parseFloat($("lb").value),d=parseFloat($("ob").value),e=$("err");
if([a,b,c,d].some(isNaN)){e.textContent="Completa las cuatro coordenadas.";return}
if(Math.abs(a)>90||Math.abs(c)>90||Math.abs(b)>180||Math.abs(d)>180){e.textContent="Revisa los rangos: latitud ±90°, longitud ±180°.";return}
e.textContent="";
var h=hav(a,b,c,d),s=slc(a,b,c,d),v=vin(a,b,c,d),rows=[["Haversine",h],["Ley esférica de cosenos",s],["Vincenty (WGS-84)",v]];
$("tb").innerHTML=rows.map(function(r,i){var df=isNaN(v)||i===2?"—":(r[1]>=v?"+":"−")+fmt(Math.abs((r[1]-v)/v*100),3)+" %";return"<tr><td>"+r[0]+"</td><td class='n'>"+(isNaN(r[1])?"sin convergencia":fmt(r[1],2))+"</td><td class='n'>"+df+"</td></tr>"}).join("");
var m=mid(a,b,c,d);
$("kv").innerHTML="<span>Rumbo inicial A→B: <b>"+fmt(brg(a,b,c,d),1)+"°</b></span><span>Rumbo inicial B→A: <b>"+fmt(brg(c,d,a,b),1)+"°</b></span><span>Punto medio: <b>"+fmt(m[0],4)+"°, "+fmt(m[1],4)+"°</b></span>";
draw(a,b,c,d)}
["pa","pb"].forEach(function(id,k){var s=$(id);s.innerHTML='<option value="">Personalizado</option>'+CITIES.map(function(c,i){return"<option value='"+i+"'>"+c[0]+"</option>"}).join("");
s.addEventListener("change",function(){if(s.value==="")return;var c=CITIES[+s.value],q=k?["lb","ob"]:["la","oa"];$(q[0]).value=c[1];$(q[1]).value=c[2];calc()})});
["la","oa","lb","ob"].forEach(function(i){$(i).addEventListener("input",function(){$(i[1]==="a"?"pa":"pb").value="";calc()})});
$("pa").value=0;$("pb").value=1;$("pa").dispatchEvent(new Event("change"));$("pb").dispatchEvent(new Event("change"));
