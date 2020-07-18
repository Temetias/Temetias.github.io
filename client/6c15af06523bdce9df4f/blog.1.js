(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{16:function(e,t,n){"use strict";var a=n(18),o=n.n(a),i=n(26),s=n.n(i);const l=["---\ntitle: Managing Event Handlers In Classes\nslug: managing-event-handlers-in-classes\ndate: 2020-07-12\nauthor: Teemu Karppinen\nauthorImg: /me2.jpg\nauthorLink: https://teemukarppinen.dev\n---\n\nIf you've worked with TypeScript, you might've noticed that many of library authors have a weird obsession of writing libraries as classes. Or even worse, write class wrappers around already nice, clean, functional API's just for the sake of that \"being the TypeScript way of doing things\". Don't get me wrong: I'm not saying the libraries are necessarily bad or shouldn't be used. There are just some pain points that pop up with the OOP approach. Especially when we're talking about an event-driven language like JavaScript.\n\n## The Problem 😬\n\nLately I've been working on a feature which needs A LOT of event handlers. I'm not going into specifics because it's work stuff, but essentially I have to:\n\n- Create a lot of class instances\n- Attach methods of those class instances to different events\n- Handle the detaching of those events in the end of the class instances' lifecycle\n\nThe class instances are [vue-class-components](https://class-component.vuejs.org/), but that's trivial to the actual problem. Just any class API where we might need to attach and detach methods to events applies here. The problem arises when you want to attach and detach class methods while retaining the correct ```this``` context.\n\nLet's think about this scenario:\n\nYou have some library with events, for example some sort of map library. You want to attach a method of the class to the event, and detach it later. Easy, right?\n\n![alt text](/badbind.PNG \"This will lose THIS\")\n\nYou wish! You see, this approach will make the ```mouseDownHandler``` lose ```this``` context, and be unable to refer to the value it wants to. So in this case, the ```console.log``` doesn't print ```\"Hey\"``` but instead we get greeted with the good ol' ```undefined```.\n\n## The Ugly Solution 🤮\n\nOkay then, let's bind the function. But then that needs to happen inside the lifecycle. And don't forget, we want to refer that bound function later to detach it! So we can't just go ```map.mouseDown.on(this.mouseDownHandler.bind(this))``` because [Function.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) creates a new function and that's the function we want to be .offing later.\n\nSo what we need to do is to have a separate variable for the function and alter that one. Something like this:\n\n![alt text](/uglybind.PNG \"Works, but is ugly\")\n\nThis works but as you can see it's not the most readable approach and gets very boilerplatey fast. And you also need to come up with a new name for the unbound funtion. I've seen some use underscore prefixes like ```_handleMouseDown``` but that already is kind of reserved for indicating the intentional hiding of implementation details.\n\nAlso, as we can see, this doesn't scale that nicely...\n![alt text](/ugliestbind.PNG \"Works, but there is soo much code\")\n\n## The (less) Ugly Solutions 😪\n\nWell, the other day it kind of hit me. Instead of focusing too much on the methods, renaming, binding and all that mess, what if we just used some sort of \"cleanup callback array\"? I tried it and in my opinion this is the least ugly solution to this problem.\n\nCheck this out:\n![alt text](/prettybind.PNG \"Works, and is much cleaner to look at\")\n\nWe introduce a new array ```cleanUps``` and we do all the bind, .on and .off handling in the mounted hook. The overall lines of code doesn't really change but that's not the point. In my opinion there is still benefits with this approach:\n\n- Less weird name suffixes like ```Unbound```\n- The logic is in one place\n- More flexible approach. The cleanUps can be used for other things and from other methods.\n\nYou could also consider implementing a utility function if you find yourself doind a lot of attaching. Something like this:\n![alt text](/fancybind.PNG \"Everything is nicer when you use a function\")\n\nUtility functions... Can't have enough of those, right? 😅\n\n## To Close Things Up \n\nWhat I showed here is not necessarily the golden solution you were looking for. But it is, in my opinion, a decent workaround to an annoying problem. Overall, all this would've been avoided by not using class based API in the first place and avoiding the use of ```this``` altogether. But we don't always have the benefit of choosing the libraries we work with. It's situations like these, when workarounds like this are valuable.\n\n","---\ntitle: The New Website\nslug: new-website\ndate: 2020-06-24\nauthor: Teemu Karppinen\nauthorImg: /me2.jpg\nauthorLink: https://teemukarppinen.dev\n---\n\nDuring my summer holidays I finally decided to improve my personal website. I had a site already but it was made back when I was just starting in webdev and, well, it shows.\n\nThe old site lacked quite a lot not only in the responsiviness department, but also in accessibility. There's barely any semantic on it and the load times overall are not really great for a page with no images, no real need for javascript and so on.\n\n*My old website... Yes that line between the div and svg was actually visible.*😅\n![alt text](/old-website.PNG \"My old Nuxt.js website\")\n\n## Tech Choices 🔨\n\nThe old site was made with [Nuxt.js](https://nuxtjs.org/). Looking back, that site could've (and should've) been just a static HTML page. Inspired by the idea of just going raw HTML, that's what I initially started with.\n\nThe further I got, the more tedious that approach became. I had already decided that I would do a multi-page site and also wanted to implement this blog. The lack of style scoping and the lack of component reuseability quickly became a burden.\n\nSo I started spinning the wheel of frameworks once again! This time I wanted something more minimal though. I found [Sapper](https://sapper.svelte.dev/) which seemed way more appealing for this usecase than the alternatives:\n\n- It's super lightweight \n- It's easy to get started\n- Svelte as a framework has close to zero boilerplate\n\nDon't get me wrong: I have nothing against Nuxt.js, Next.js, Gatsby and so on. I think they're great but for this kind of lightweight website+blog\nproject, sapper seemed like it had the best toolkit. Although [Gatsby](https://www.gatsbyjs.org/) with [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) was super tempting, doing an almost fully static page with React or Vue just seemed like a bit of an overkill.\n\nWorking with Svelte and Sapper was super nice. The initial boilerplate they give you has an amazing focus on semantic and accessibility, the dev server is super fast and overall the best parts of the framework shine in a usecase like this.\n\n## Visual Progress 💅\n\nI decided to go for a minimal look in the hopes of rapid development and small bundle sizes. Overall I think the design turned out nice enough. The only \"gimmick\" I made was the landing figure styling. I wanted to sprinkle in a little bit of that [skeuomorphic design](https://uxstudioteam.com/ux-blog/ui-trends-2019/#10Skeuomorphic_design) double shadow goodness.\n\nTo achieve the nice effect of having a light source on the top left you need to cast a shadow on the bottom right and make a white shadow on the opposite side. To make the white appear at all I needed the background to be a bit darker. Also, I quickly realized that having just a solid red border completely wrecks the whole illusion.\n\n*Not good, the red border is way too strong* 🤮\n![alt-text](/figure-bad.PNG \"Red border ruins the illusion\")\n\nTo achieve the wanted effect, the border needed a gradient. Well, that isn't really a thing so I ended up doing a ball shape behind the image and placing the image on top of it. The tricky part was to make them properly responsive. Luckily, responsive square and circle shapes are easy enough to achieve with the ol' `padding-bottom: 100%;` trick. Some absolute positioning on the image, and voilà!\n\n*The circle shape for the gradient*\n![alt-text](/figure-bg.PNG \"The circle shape for the gradient\")\n\n*Final result, looking good!* 🎉\n![alt-text](/figure.PNG \"Final result\")\n\nHaving wrestled with that problem for longer than I want to admit, I decided that this was it for the gimmicks. Rest of the design is kind of self-explanatory: Black on white, some red highlights and that's it.\n\n## The Blog 📰\n\nImplementing the blog was the only real technical problem I had to solve. Blogs are a thing that have been solved like a million times already, but hey, we're all out here learning. I wanted to solve this at least mostly by myself.\n\nI decided to go with markdown, so I could easily write blog posts and just drop them in the repo with Github. This initial version uses similar approach that the Sapper template already came with. The `_posts.js` file bundles the .md files together and we use the `[slug].svelte` file to dynamically populate it with a plog post.\n\nThe images I serve from Sappers static folder, but there's also the option to just link them from a 3rd party site.\n\nThe pain point currently is the bundling of the markdown files:\n\n*Bundling the markdown*\n![alt-text](/bundling.PNG \"Bundling the markdown files\")\n\nAs you can see, all new blogposts currently require a new entry on the file. I tried experimenting with having the metadata in the .md itself and using the [marked-metadata](https://github.com/jaydson/marked-metadata) library instead of just [marked](https://github.com/markedjs/marked) on webpack level. That part worked fine, but the issue I had was with collecting the markdown. I tried importing all the files from the folder, something like `import posts from \"../blog_content/*.md\"` but for some reason I couldn't get the [webpack-glob-entry](https://www.npmjs.com/package/webpack-glob-entry) to play nicely at all.\n\nIn the end I decided to ditch the wildcard import and webpack level .md parsing, and do it on the bundling part. This allowed me some more freedom with parsing the posts and getting some additional data from them. For example, I can now determine the estimated read time for the post! The end result is still far from perfect, but at least now the metadata comes from the .md file, and there is only two lines to add to `_posts.js` when adding new posts.\n\n*Bundling the markdown but with less manual labor*\n![alt-text](/bundling-better.PNG \"Bundling the markdown files\")\n\nIn the hopes of actually finishing the site during my holiday, I left the blog post part as is for now. But I'm most certainly coming back to the subject. Expect a new blog post soon!\n\n## Deploying 🚀\n\nGithub pages was a obvious choice here. There are some tempting alternatives, but I already had my github pages setup and my custom domain was already setup nicely with it. Github pages is also available with a great price of free!\n\nI'm planning to do some sort of fancier integration, maybe utilizing [Github actions](https://github.com/features/actions) but before I sorted how I want to proceed with the blog I didn't want to commit to a solution. It would suck to implement a fancy deployment pipeline, maybe even costing some money just to end up scrapping it.\n\nI did, however, make a [super ghetto deployment script](https://github.com/Temetias/homepage-2020/blob/master/deploy.sh) which I hooked up with npm so I can just use `npm run deploy` to push all my changes live. It's not the fanciest thing ever, but hey, it works. With this setup I might actually be able to keep myself updating the website every now and then!\n"].map((function(e){const{data:t,content:n}=o()(e);return{...t,content:s()(n),readTime:(a=n,Math.round(a.split(" ").length/256))};var a}));t.a=l},17:function(e,t,n){"use strict";var a=n(0);function o(e){return e.author||"Teemu Karppinen"}function i(e){return e.authorImg||"/me2.jpg"}function s(e){return e.authorLink||"/"}function l(e){let t,n,l,c,r,h,d,b,u,m,p,g,j,f,O,w,v,y,k,I,x,T=o(e[0])+"",q=new Date(e[0].date).toLocaleDateString()+"",N=e[0].readTime+"";return{c(){t=Object(a.q)("header"),n=Object(a.q)("div"),l=Object(a.q)("img"),h=Object(a.K)(),d=Object(a.q)("div"),b=Object(a.q)("a"),u=Object(a.N)(T),p=Object(a.K)(),g=Object(a.q)("span"),j=Object(a.q)("span"),f=Object(a.N)(q),O=Object(a.K)(),w=Object(a.q)("span"),v=Object(a.N)("•"),y=Object(a.K)(),k=Object(a.q)("span"),I=Object(a.N)(N),x=Object(a.N)(" min read"),this.h()},l(e){t=Object(a.i)(e,"HEADER",{class:!0});var o=Object(a.g)(t);n=Object(a.i)(o,"DIV",{class:!0});var i=Object(a.g)(n);l=Object(a.i)(i,"IMG",{src:!0,alt:!0,class:!0}),h=Object(a.j)(i),d=Object(a.i)(i,"DIV",{class:!0});var s=Object(a.g)(d);b=Object(a.i)(s,"A",{href:!0,class:!0});var c=Object(a.g)(b);u=Object(a.k)(c,T),c.forEach(a.p),p=Object(a.j)(s),g=Object(a.i)(s,"SPAN",{class:!0});var r=Object(a.g)(g);j=Object(a.i)(r,"SPAN",{class:!0});var m=Object(a.g)(j);f=Object(a.k)(m,q),m.forEach(a.p),O=Object(a.j)(r),w=Object(a.i)(r,"SPAN",{class:!0});var E=Object(a.g)(w);v=Object(a.k)(E,"•"),E.forEach(a.p),y=Object(a.j)(r),k=Object(a.i)(r,"SPAN",{class:!0});var P=Object(a.g)(k);I=Object(a.k)(P,N),x=Object(a.k)(P," min read"),P.forEach(a.p),r.forEach(a.p),s.forEach(a.p),i.forEach(a.p),o.forEach(a.p),this.h()},h(){l.src!==(c=i(e[0]))&&Object(a.e)(l,"src",c),Object(a.e)(l,"alt",r=o(e[0])),Object(a.e)(l,"class","svelte-1jdubmn"),Object(a.e)(b,"href",m=s(e[0])),Object(a.e)(b,"class","svelte-1jdubmn"),Object(a.e)(j,"class","divider svelte-1jdubmn"),Object(a.e)(w,"class","divider-dot svelte-1jdubmn"),Object(a.e)(k,"class","divider svelte-1jdubmn"),Object(a.e)(g,"class","svelte-1jdubmn"),Object(a.e)(d,"class","post-info-inner svelte-1jdubmn"),Object(a.e)(n,"class","post-info svelte-1jdubmn"),Object(a.e)(t,"class","svelte-1jdubmn")},m(e,o){Object(a.z)(e,t,o),Object(a.c)(t,n),Object(a.c)(n,l),Object(a.c)(n,h),Object(a.c)(n,d),Object(a.c)(d,b),Object(a.c)(b,u),Object(a.c)(d,p),Object(a.c)(d,g),Object(a.c)(g,j),Object(a.c)(j,f),Object(a.c)(g,O),Object(a.c)(g,w),Object(a.c)(w,v),Object(a.c)(g,y),Object(a.c)(g,k),Object(a.c)(k,I),Object(a.c)(k,x)},p(e,[t]){1&t&&l.src!==(c=i(e[0]))&&Object(a.e)(l,"src",c),1&t&&r!==(r=o(e[0]))&&Object(a.e)(l,"alt",r),1&t&&T!==(T=o(e[0])+"")&&Object(a.J)(u,T),1&t&&m!==(m=s(e[0]))&&Object(a.e)(b,"href",m),1&t&&q!==(q=new Date(e[0].date).toLocaleDateString()+"")&&Object(a.J)(f,q),1&t&&N!==(N=e[0].readTime+"")&&Object(a.J)(I,N)},i:a.D,o:a.D,d(e){e&&Object(a.p)(t)}}}function c(e,t,n){let{post:a}=t;return e.$set=e=>{"post"in e&&n(0,a=e.post)},[a]}class r extends a.a{constructor(e){var t;super(),document.getElementById("svelte-1jdubmn-style")||((t=Object(a.q)("style")).id="svelte-1jdubmn-style",t.textContent="header.svelte-1jdubmn.svelte-1jdubmn{margin-bottom:1em}a.svelte-1jdubmn.svelte-1jdubmn{font-weight:600}span.svelte-1jdubmn.svelte-1jdubmn{color:rgba(0, 0, 0, 0.6)}.post-info.svelte-1jdubmn.svelte-1jdubmn{display:flex}.post-info.svelte-1jdubmn img.svelte-1jdubmn{margin:0;border:1px solid white;border-radius:50%;width:4em;height:4em}.post-info-inner.svelte-1jdubmn.svelte-1jdubmn{margin-left:1em}.post-info-inner.svelte-1jdubmn span.svelte-1jdubmn{display:block}.divider.svelte-1jdubmn.svelte-1jdubmn,.divider-dot.svelte-1jdubmn.svelte-1jdubmn{display:inline !important}@media(max-width: 480px){.divider.svelte-1jdubmn.svelte-1jdubmn{display:block !important}.divider-dot.svelte-1jdubmn.svelte-1jdubmn{display:none !important;color:red}}",Object(a.c)(document.head,t)),Object(a.y)(this,e,c,l,a.H,{post:0})}}t.a=r},19:function(e,t){},27:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=[],o="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z";t.definition={prefix:"fas",iconName:"link",icon:[512,512,a,"f0c1",o]},t.faLink=t.definition,t.prefix="fas",t.iconName="link",t.width=512,t.height=512,t.ligatures=a,t.unicode="f0c1",t.svgPathData=o},63:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n(1),i=n(27);const{document:s}=a.w;function l(e){let t,n,s,l,c;return n=new o.a({props:{icon:i.faLink}}),{c(){t=Object(a.q)("div"),Object(a.l)(n.$$.fragment),this.h()},l(e){t=Object(a.i)(e,"DIV",{class:!0});var o=Object(a.g)(t);Object(a.h)(n.$$.fragment,o),o.forEach(a.p),this.h()},h(){Object(a.e)(t,"class","svelte-11ojm7k")},m(o,i){Object(a.z)(o,t,i),Object(a.C)(n,t,null),s=!0,l||(c=Object(a.B)(t,"click",e[0]),l=!0)},p:a.D,i(e){s||(Object(a.O)(n.$$.fragment,e),s=!0)},o(e){Object(a.P)(n.$$.fragment,e),s=!1},d(e){e&&Object(a.p)(t),Object(a.n)(n),l=!1,c()}}}function c(e,t,n){let{link:a}=t;return e.$set=e=>{"link"in e&&n(1,a=e.link)},[function(){const e=document.createElement("textarea");e.value=window.location.host+a,e.setAttribute("readonly",""),e.style.position="absolute",e.style.left="-9999px",document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e)},a]}class r extends a.a{constructor(e){var t;super(),s.getElementById("svelte-11ojm7k-style")||((t=Object(a.q)("style")).id="svelte-11ojm7k-style",t.textContent='div.svelte-11ojm7k{display:inline;cursor:pointer;transition:color 1s 1s, transform 1s 1s;position:relative}div.svelte-11ojm7k::after{opacity:0;transition:opacity 0.5s 0.5s;pointer-events:none;display:block;content:"Copied!";position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background-color:white;color:black;padding:0.1em 0.2em;border:1px solid rgba(0, 0, 0, 0.12);border-radius:0.1em;box-shadow:1px 1px 8px 0px rgba(0, 0, 0, 0.05)}div.svelte-11ojm7k:active{transition:color 0s 0s, transform 0s 0s;transform:scale(1.2);color:green}div.svelte-11ojm7k:active::after{transition:opacity 0s 0s;opacity:1}',Object(a.c)(s.head,t)),Object(a.y)(this,e,c,l,a.H,{link:1})}}var h=r,d=n(16),b=n(17);function u(e,t,n){const a=e.slice();return a[0]=t[n],a}function m(e){let t,n,o,i,s,l,c,r,d,u,m,p,g=e[0].title+"";return c=new b.a({props:{post:e[0]}}),u=new h({props:{link:"/blog/"+e[0].slug}}),{c(){t=Object(a.q)("li"),n=Object(a.q)("h2"),o=Object(a.q)("a"),i=Object(a.N)(g),l=Object(a.K)(),Object(a.l)(c.$$.fragment),r=Object(a.K)(),d=Object(a.q)("footer"),Object(a.l)(u.$$.fragment),m=Object(a.K)(),this.h()},l(e){t=Object(a.i)(e,"LI",{class:!0});var s=Object(a.g)(t);n=Object(a.i)(s,"H2",{});var h=Object(a.g)(n);o=Object(a.i)(h,"A",{rel:!0,href:!0});var b=Object(a.g)(o);i=Object(a.k)(b,g),b.forEach(a.p),h.forEach(a.p),l=Object(a.j)(s),Object(a.h)(c.$$.fragment,s),r=Object(a.j)(s),d=Object(a.i)(s,"FOOTER",{class:!0});var p=Object(a.g)(d);Object(a.h)(u.$$.fragment,p),p.forEach(a.p),m=Object(a.j)(s),s.forEach(a.p),this.h()},h(){Object(a.e)(o,"rel","prefetch"),Object(a.e)(o,"href",s="blog/"+e[0].slug),Object(a.e)(d,"class","svelte-182nqxt"),Object(a.e)(t,"class","svelte-182nqxt")},m(e,s){Object(a.z)(e,t,s),Object(a.c)(t,n),Object(a.c)(n,o),Object(a.c)(o,i),Object(a.c)(t,l),Object(a.C)(c,t,null),Object(a.c)(t,r),Object(a.c)(t,d),Object(a.C)(u,d,null),Object(a.c)(t,m),p=!0},p:a.D,i(e){p||(Object(a.O)(c.$$.fragment,e),Object(a.O)(u.$$.fragment,e),p=!0)},o(e){Object(a.P)(c.$$.fragment,e),Object(a.P)(u.$$.fragment,e),p=!1},d(e){e&&Object(a.p)(t),Object(a.n)(c),Object(a.n)(u)}}}function p(e){let t,n,o,i,s,l,c,r,h,b,p=d.a,g=[];for(let t=0;t<p.length;t+=1)g[t]=m(u(e,p,t));const j=e=>Object(a.P)(g[e],1,1,()=>{g[e]=null});return{c(){t=Object(a.K)(),n=Object(a.q)("header"),o=Object(a.q)("h1"),i=Object(a.N)("The Blog"),s=Object(a.K)(),l=Object(a.q)("span"),c=Object(a.N)("Nuggets of knowledge, ramblings of a dev and maybe someday some content from\n    friends too!"),r=Object(a.K)(),h=Object(a.q)("ul");for(let e=0;e<g.length;e+=1)g[e].c();this.h()},l(e){Object(a.F)('[data-svelte="svelte-bf7ml0"]',document.head).forEach(a.p),t=Object(a.j)(e),n=Object(a.i)(e,"HEADER",{});var d=Object(a.g)(n);o=Object(a.i)(d,"H1",{});var b=Object(a.g)(o);i=Object(a.k)(b,"The Blog"),b.forEach(a.p),s=Object(a.j)(d),l=Object(a.i)(d,"SPAN",{});var u=Object(a.g)(l);c=Object(a.k)(u,"Nuggets of knowledge, ramblings of a dev and maybe someday some content from\n    friends too!"),u.forEach(a.p),d.forEach(a.p),r=Object(a.j)(e),h=Object(a.i)(e,"UL",{class:!0});var m=Object(a.g)(h);for(let e=0;e<g.length;e+=1)g[e].l(m);m.forEach(a.p),this.h()},h(){document.title="Teemu Karppinen - Blog",Object(a.e)(h,"class","svelte-182nqxt")},m(e,d){Object(a.z)(e,t,d),Object(a.z)(e,n,d),Object(a.c)(n,o),Object(a.c)(o,i),Object(a.c)(n,s),Object(a.c)(n,l),Object(a.c)(l,c),Object(a.z)(e,r,d),Object(a.z)(e,h,d);for(let e=0;e<g.length;e+=1)g[e].m(h,null);b=!0},p(e,[t]){if(0&t){let n;for(p=d.a,n=0;n<p.length;n+=1){const o=u(e,p,n);g[n]?(g[n].p(o,t),Object(a.O)(g[n],1)):(g[n]=m(o),g[n].c(),Object(a.O)(g[n],1),g[n].m(h,null))}for(Object(a.x)(),n=p.length;n<g.length;n+=1)j(n);Object(a.f)()}},i(e){if(!b){for(let e=0;e<p.length;e+=1)Object(a.O)(g[e]);b=!0}},o(e){g=g.filter(Boolean);for(let e=0;e<g.length;e+=1)Object(a.P)(g[e]);b=!1},d(e){e&&Object(a.p)(t),e&&Object(a.p)(n),e&&Object(a.p)(r),e&&Object(a.p)(h),Object(a.o)(g,e)}}}class g extends a.a{constructor(e){var t;super(),document.getElementById("svelte-182nqxt-style")||((t=Object(a.q)("style")).id="svelte-182nqxt-style",t.textContent="ul.svelte-182nqxt.svelte-182nqxt{margin:2em 0 1em 0;line-height:1.5;padding:0}li.svelte-182nqxt.svelte-182nqxt{display:block;border-bottom:1px solid rgba(0, 0, 0, 0.12);padding:0.5em 2.5em}li.svelte-182nqxt.svelte-182nqxt:first-child{border-top:1px solid rgba(0, 0, 0, 0.12)}@media(max-width: 480px){li.svelte-182nqxt.svelte-182nqxt{padding:0.3em 1.5em}li.svelte-182nqxt footer.svelte-182nqxt{padding:0 1em}}li.svelte-182nqxt footer.svelte-182nqxt{margin:0em -1.5em 0.5em -1.5em;display:flex;justify-content:flex-end}",Object(a.c)(document.head,t)),Object(a.y)(this,e,null,p,a.H,{})}}t.default=g}}]);