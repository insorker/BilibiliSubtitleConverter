(function(B){typeof define=="function"&&define.amd?define(B):B()})(function(){"use strict";var B=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},U={exports:{}};(function(e,l){(function(i,t){e.exports=t()})(B,function(){return function i(t,n,c){var a=window,f="application/octet-stream",d=c||f,o=t,b=!n&&!c&&o,s=document.createElement("a"),R=function(r){return String(r)},u=a.Blob||a.MozBlob||a.WebKitBlob||R,h=n||"download",p,x;if(u=u.call?u.bind(a):Blob,String(this)==="true"&&(o=[o,d],d=o[0],o=o[1]),b&&b.length<2048&&(h=b.split("/").pop().split("?")[0],s.href=b,s.href.indexOf(b)!==-1)){var y=new XMLHttpRequest;return y.open("GET",b,!0),y.responseType="blob",y.onload=function(r){i(r.target.response,h,f)},setTimeout(function(){y.send()},0),y}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(o))if(o.length>1024*1024*1.999&&u!==R)o=k(o),d=o.type||f;else return navigator.msSaveBlob?navigator.msSaveBlob(k(o),h):v(o);else if(/([\x80-\xff])/.test(o)){var w=0,C=new Uint8Array(o.length),z=C.length;for(w;w<z;++w)C[w]=o.charCodeAt(w);o=new u([C],{type:d})}p=o instanceof u?o:new u([o],{type:d});function k(r){var m=r.split(/[:;,]/),S=m[1],G=m[2]=="base64"?atob:decodeURIComponent,F=G(m.pop()),I=F.length,T=0,L=new Uint8Array(I);for(T;T<I;++T)L[T]=F.charCodeAt(T);return new u([L],{type:S})}function v(r,m){if("download"in s)return s.href=r,s.setAttribute("download",h),s.className="download-js-link",s.innerHTML="downloading...",s.style.display="none",document.body.appendChild(s),setTimeout(function(){s.click(),document.body.removeChild(s),m===!0&&setTimeout(function(){a.URL.revokeObjectURL(s.href)},250)},66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(r)&&(r="data:"+r.replace(/^data:([\w\/\-\+]+)/,f)),window.open(r)||confirm(`Displaying New Document

Use Save As... to download, then click back to return to this page.`)&&(location.href=r),!0;var S=document.createElement("iframe");document.body.appendChild(S),!m&&/^data:/.test(r)&&(r="data:"+r.replace(/^data:([\w\/\-\+]+)/,f)),S.src=r,setTimeout(function(){document.body.removeChild(S)},333)}if(navigator.msSaveBlob)return navigator.msSaveBlob(p,h);if(a.URL)v(a.URL.createObjectURL(p),!0);else{if(typeof p=="string"||p.constructor===R)try{return v("data:"+d+";base64,"+a.btoa(p))}catch{return v("data:"+d+","+encodeURIComponent(p))}x=new FileReader,x.onload=function(r){v(this.result)},x.readAsDataURL(p)}return!0}})})(U);const _=U.exports;let E={font_size:.4,font_color:"#FFFFFF",background_alpha:.5,background_color:"#9C27B0",Stroke:"none"};function M(e){return JSON.parse(e)}function O(e){return JSON.stringify(e)}function j(e){let l={},t=e.replace(/\n$/,"").split(`

`);for(let n of t){let c=n.split(`
`),a=parseInt(c[0]),f=c[1].split(" --> "),d=c.slice(2).join();l[a]={from:f[0],to:f[1],content:d}}return l}function D(e){let l="";for(let i in e){let t=e[i].from+" --> "+e[i].to,n=e[i].content;l+=[i,t,n].join(`
`)+`

`}return l}function N(e,l){let i={...E,...l,body:[]},t=n=>{let c=n.split(":"),a=parseInt(c[0]),f=parseInt(c[1]),d=parseFloat(c[2].replace(",","."));return a*60*60+f*60+d};for(let n in e)i.body[n]={from:t(e[n].from),to:t(e[n].to),location:2,content:e[n].content};return i}function q(e){let l={},i=t=>[[Math.trunc(t/60/60),Math.trunc(t/60),Math.trunc(t%60)].map(n=>n.toString().padEnd(2,"0")).join(":"),(t%1).toString().slice(2).padEnd(3,"0")].join(",");return e.body.forEach((t,n)=>{l[n]={from:i(t.from),to:i(t.to),content:t.content}}),l}let A=_,g=document.getElementById("bsc-converter");g!=null&&(g.onchange=()=>{let e=new FileReader,l=g.value.split(".").pop(),i="result";e.readAsText(g.files[0],"utf-8"),e.onload=()=>{let t=e.result;if(l=="bcc"){let n=M(t),c=q(n),a=D(c);A(a,i+".srt","text/plain")}else if(l=="srt"){let n=j(t),c=N(n),a=O(c);A(a,i+".bcc","text/plain")}else alert("文件缺少.srt/.bcc后缀")},g.value=""})});
