!function(e){var t={};function n(r){if(t[r])return t[r].exports;var c=t[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(r,c,function(t){return e[t]}.bind(null,c));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=["client/6c15af06523bdce9df4f/blog.1.js","client/6c15af06523bdce9df4f/blog_$slug.2.js","client/6c15af06523bdce9df4f/index.3.js","client/6c15af06523bdce9df4f/main.js","client/6c15af06523bdce9df4f/vendors~blog~blog_$slug.0.js"].concat(["service-worker-index.html","android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","badbind.PNG","bundling-better.PNG","bundling.PNG","fancybind.PNG","favicon-16x16.png","favicon-32x32.png","favicon.ico","figure-bad.PNG","figure-bg.PNG","figure.PNG","global.css","manifest.json","me2.jpg","old-website.PNG","prettybind.PNG","ugliestbind.PNG","uglybind.PNG"]),c=new Set(r);self.addEventListener("install",e=>{e.waitUntil(caches.open("cache1595075276536").then(e=>e.addAll(r)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const t of e)"cache1595075276536"!==t&&await caches.delete(t);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const t=new URL(e.request.url);t.protocol.startsWith("http")&&(t.hostname===self.location.hostname&&t.port!==self.location.port||(t.host===self.location.host&&c.has(t.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1595075276536").then(async t=>{try{const n=await fetch(e.request);return t.put(e.request,n.clone()),n}catch(n){const r=await t.match(e.request);if(r)return r;throw n}}))))})}]);