import{d as e,c as t,w as o,a as n,b as r,e as a,F as s,r as l,f as c,p as d,g as i,h as u,i as p,o as m,j as g,t as f,u as h,k as v,l as x,m as y}from"./vendor.f6e3604d.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const n=new URL(e,location),r=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,a)=>{const s=new URL(e,n);if(self[t].moduleMap[s])return o(self[t].moduleMap[s]);const l=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){a(new Error(`Failed to import: ${e}`)),r(c)},onload(){o(self[t].moduleMap[s]),r(c)}});document.head.appendChild(c)})),self[t].moduleMap={}}}("/assets/");var k=e({name:"BlogHead",props:{links:{type:Array,default:()=>[]},activeIndex:{type:Number,default:0},isTransparent:{type:Boolean,default:!1},logoSrc:{type:String,default:null},logoTransparentSrc:{type:String,default:null}},setup:e=>({isLogoImgShow:t((()=>"string"==typeof e.logoSrc&&""!==e.logoSrc)),logoImgSrc:t((()=>e.isTransparent?e.logoTransparentSrc:e.logoSrc)),m:function(e){console.log(e)}})});const w=c();d("data-v-5a99373c");const S={class:"app-viewport flex flex-j-between flex-a-center"},b={class:"blog-header-nav-group flex flex-j-end margin-0"};i();const I=w(((e,t,c,d,i,h)=>{const v=u("router-link"),x=p("media");return o((m(),n("header",{class:["blog-header",{transparent:e.isTransparent}]},[r("div",S,[r(v,{class:"blog-header-logo",to:"/"},{default:w((()=>[e.isLogoImgShow?(m(),n("img",{key:0,src:e.logoImgSrc},null,8,["src"])):a("",!0)])),_:1}),r("ul",b,[(m(!0),n(s,null,l(e.links,((t,o)=>(m(),n("li",{class:["blog-header-nav",{active:o===e.activeIndex}],key:o},[r(v,{to:t.to},{default:w((()=>[g(f(t.text),1)])),_:2},1032,["to"])],2)))),128))])])],2)),[[x,{key:"max-width",val:"720px",handler:e.m}]])}));k.render=I,k.__scopeId="data-v-5a99373c";var L=e({name:"Base",components:{BlogHead:k},setup(){const e=h(),o=[{text:"首页",to:"/"},{text:"文章",to:"/blog"},{text:"实验室",to:"/projects"},{text:"留言",to:"/messages"}],n=t((()=>{const t=o.findIndex((t=>t.to===e.path));return t>=0?t:0}));return{links:o,activeIndex:n,handler:function(){console.log("触发")}}}});L.render=function(e,t,o,a,l,c){const d=u("BlogHead"),i=u("router-view");return m(),n(s,null,[r(d,{links:e.links,activeIndex:e.activeIndex,logoSrc:"/img/logo.png",logoTransparentSrc:"/img/logo-transparent.png"},null,8,["links","activeIndex"]),r(i,{onHaha:e.handler},null,8,["onHaha"])],64)};const _={components:{Base:L}};let j;_.render=function(e,t,o,r,a,s){const l=u("Base");return m(),n(l)};const $={},B=[{path:"/",component:()=>function(e,t){if(!t)return e();if(void 0===j){const e=document.createElement("link").relList;j=e&&e.supports&&e.supports("modulepreload")?"modulepreload":"preload"}return Promise.all(t.map((e=>{if(e in $)return;$[e]=!0;const t=e.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":j,t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e()))}((()=>__import__("./Index.de394303.js")),["/assets/Index.de394303.js","/assets/Index.55290b6c.css","/assets/vendor.f6e3604d.js"])}];const E=new Map,R={mounted(e,t){console.log("media-mounted",e,t);const{key:o,val:n,handler:r}=t.value,a=`(${o}: ${n})`;let s=E.get(a);s||(s=window.matchMedia(a),E.set(a,s)),r(s),s.addListener(r)},beforeUnmount(e,t){console.log("media-beforeUnmount",e,t);const{key:o,val:n,handler:r}=t.value,a=`(${o}: ${n})`;let s=E.get(a);s&&s.removeListener(r)}};const{app:U,router:M}=function(){const e=y(_),t=v({history:x(),routes:B});return e.use(t),e.directive("media",R),{app:e,router:t}}();M.isReady().then((()=>{U.mount("#app")}));