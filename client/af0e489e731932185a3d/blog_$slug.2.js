(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{16:function(e,t,n){"use strict";var o=n(18),a=n.n(o),i=n(26),s=n.n(i);const r=["---\ntitle: Iterative Adoption Of A Frontend Framework\nslug: iterative-adoption-of-a-frontend-framework\ndate: 2020-08-09\nauthor: Teemu Karppinen\nauthorImg: /me2.jpg\nauthorLink: https://teemukarppinen.dev\n---\n\nWhen starting a new frontend project in 2020 you're greeted with multiple nice tools and prebuilt configurations. Create-react-app, next.js, vue-cli, sapper... the list goes on. All of these tools provide brilliant DX and usually in the right hands yield an amazing end result. But what if we don't have the option to start from scratch?\n\n## Enchancing an old frontend ⚡\n\nSome frameworks advertise the ability to be iteratively adopted more than the other. One framework which usually pops up in these discussions is Vue.js. They claim to be \"incrementally adoptable\" which I personally can say is true, but there is surprisingly little material about journeys of that incremental adoption online.\n\nVue.js docs guide you to just drop a script tag into your page, type ```new Vue({ ... })``` and start hacking. That'll get you started for sure, but for a larger scale you might want to know a little more than that. Let's say you're working in an environment where the backend has some say how it serves the front end code and you don't really have a complicated build phase for your frontend. Something like a typical Wordpress / Drupal site, with some js/css files sprinkled on top.\n\nFor example, single file components (SFC) are not really a thing without going through the hassle of setting up some sort of custom build phase with webpack. Also the magical part of your app just appering into the DOM you'll also have to manage by yourself. This isn't as hard as it sounds though.\n\n## Serving and mounting 🔌\n\nAs previously said, Vue.js (and most other non-compiled frameworks) only require you to have the script loaded on the page. If you have any sort of library management already going on in your page, this is likely a non-issue. Just load the script before the rest of your code and that's it.\n\nThe next part is the mounting of the Vue.js component / app. This is where you'll have to consider some variables. Usually, the smartest move is to pick a separated functionality from the rest of your app. Say a data-panel, a navigation element, or something along those lines. The main thing you want to avoid is excessive communication between your existing frontend and your new Vue.js component. That is also completely possible, but it can get messy real fast.\n\nThe actual mounting is super easy, Vue.js provides a ```$mount``` -function, which can target any element from the DOM. You can think it kind of like jQuerys ```.appendTo```. In the react world the same functionality is achieved with ```ReactDOM.render```. The cool part about Vue.js' ```$mount``` is that you can omit the element from the function which starts the vue instance without visually mounting it, and you can just access the vue element with ```$el``` and mount it when you're ready. This can prove useful sometimes.\n\n## Templating 📐\n\nWithout single file components, you're most likely left wondering: \"What about my templates?\". Well, in react you'll want to use JSX / TSX but that'll require you to compile that down to plain js. In Vue.js you'll have the ```template``` property, which allows you to just use a html as a string as the template of the element! This sound a bit sketchy, but it works super nicely.\n\nMy personal preferred way is to use template literals. This allows for some funky little tricks that might not even be possible with SFC's like injecting variables like translated strings into the UI on the fly with ```${someVariable}``` -syntax without even passing it to the vue's vm! You can even have some syntax highlighting on your templates with vs-code extension comment-tagged-templates.\n\nI've also seen setups where people generate templates with PHP on the backend, inline that generated template into the js script and pass that into the vue instance. I can't really comment on that approach without trying it myself but I can see the template on the PHP side looking a bit wild with all the vue syntax sprinkled in. But there's no doubt you can do some pretty powerful things like that.\n\n## Styling 💅\n\nThis is the not so pretty part in my opinion. Single file components and modern build tools provide amazing tools for scoping, theming and for other style related stuff. But if you're doing iterative adoption you'll likely have to be still working with regular stylesheets. This is where you'll just have to figure out the best way for your specific stack yourself. The most effective way to style components from a global stylesheet for me has been using SASS with BEM, but your mileage may vary.\n\n## First component / feature is shipped, now what? 🥇🥈🥉\n\nKeep hammering! Add more elements to your page or start moving your existing root deeper in to the app. Adding more components to your page isn't something you'll have to worry about. I've seen people saying that multiple roots in a page is bad but actually there isn't that much to worry about. The recursive nature of the DOM means that most of the frontend frameworks are built so that nested components are basically just a new instance but with some optimisations. Sprinkling a lot of roots to your page is not necessarily that much of a performance hit in comparison. I've personally worked in a codebase where there is more than a 100 vue roots in the same page and it worked just fine.\n\nThere is also a surprising amount of ways to programmatically communicate between outside and inside of the components and even between 2 different roots. If you feel like it, you can even throw in a store like Vuex and have multiple vue roots link to that.\n\nOf course, if you have the possibility to just start moving the root of your framework deeper into the app and not create more roots, that's good. That'll save you the time of handling the complexity of creating and mounting multiple vue instances. Just go with whatever works for you, as long as you can get stuff done there and feel like you're moving towards an improved piece of software there are no \"wrong ways\" to go about iterative adoption!\n","---\ntitle: Managing Event Handlers In Classes\nslug: managing-event-handlers-in-classes\ndate: 2020-07-12\nauthor: Teemu Karppinen\nauthorImg: /me2.jpg\nauthorLink: https://teemukarppinen.dev\n---\n\nIf you've worked with TypeScript, you might've noticed that many of library authors have a weird obsession of writing libraries as classes. Or even worse, write class wrappers around already nice, clean, functional API's just for the sake of that \"being the TypeScript way of doing things\". Don't get me wrong: I'm not saying the libraries are necessarily bad or shouldn't be used. There are just some pain points that pop up with the OOP approach. Especially when we're talking about an event-driven language like JavaScript.\n\n## The Problem 😬\n\nLately I've been working on a feature which needs A LOT of event handlers. I'm not going into specifics because it's work stuff, but essentially I have to:\n\n- Create a lot of class instances\n- Attach methods of those class instances to different events\n- Handle the detaching of those events in the end of the class instances' lifecycle\n\nThe class instances are [vue-class-components](https://class-component.vuejs.org/), but that's trivial to the actual problem. Just any class API where we might need to attach and detach methods to events applies here. The problem arises when you want to attach and detach class methods while retaining the correct ```this``` context.\n\nLet's think about this scenario:\n\nYou have some library with events, for example some sort of map library. You want to attach a method of the class to the event, and detach it later. Easy, right?\n\n![alt text](/badbind.PNG \"This will lose THIS\")\n\nYou wish! You see, this approach will make the ```mouseDownHandler``` lose ```this``` context, and be unable to refer to the value it wants to. So in this case, the ```console.log``` doesn't print ```\"Hey\"``` but instead we get greeted with the good ol' ```undefined```.\n\n## The Ugly Solution 🤮\n\nOkay then, let's bind the function. But then that needs to happen inside the lifecycle. And don't forget, we want to refer that bound function later to detach it! So we can't just go ```map.mouseDown.on(this.mouseDownHandler.bind(this))``` because [Function.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) creates a new function and that's the function we want to be .offing later.\n\nSo what we need to do is to have a separate variable for the function and alter that one. Something like this:\n\n![alt text](/uglybind.PNG \"Works, but is ugly\")\n\nThis works but as you can see it's not the most readable approach and gets very boilerplatey fast. And you also need to come up with a new name for the unbound funtion. I've seen some use underscore prefixes like ```_handleMouseDown``` but that already is kind of reserved for indicating the intentional hiding of implementation details.\n\nAlso, as we can see, this doesn't scale that nicely...\n![alt text](/ugliestbind.PNG \"Works, but there is soo much code\")\n\n## The (less) Ugly Solutions 😪\n\nWell, the other day it kind of hit me. Instead of focusing too much on the methods, renaming, binding and all that mess, what if we just used some sort of \"cleanup callback array\"? I tried it and in my opinion this is the least ugly solution to this problem.\n\nCheck this out:\n![alt text](/prettybind.PNG \"Works, and is much cleaner to look at\")\n\nWe introduce a new array ```cleanUps``` and we do all the bind, .on and .off handling in the mounted hook. The overall lines of code doesn't really change but that's not the point. In my opinion there is still benefits with this approach:\n\n- Less weird name suffixes like ```Unbound```\n- The logic is in one place\n- More flexible approach. The cleanUps can be used for other things and from other methods.\n\nYou could also consider implementing a utility function if you find yourself doind a lot of attaching. Something like this:\n![alt text](/fancybind.PNG \"Everything is nicer when you use a function\")\n\nUtility functions... Can't have enough of those, right? 😅\n\n## To Close Things Up \n\nWhat I showed here is not necessarily the golden solution you were looking for. But it is, in my opinion, a decent workaround to an annoying problem. Overall, all this would've been avoided by not using class based API in the first place and avoiding the use of ```this``` altogether. But we don't always have the benefit of choosing the libraries we work with. It's situations like these, when workarounds like this are valuable.\n\n","---\ntitle: The New Website\nslug: new-website\ndate: 2020-06-24\nauthor: Teemu Karppinen\nauthorImg: /me2.jpg\nauthorLink: https://teemukarppinen.dev\n---\n\nDuring my summer holidays I finally decided to improve my personal website. I had a site already but it was made back when I was just starting in webdev and, well, it shows.\n\nThe old site lacked quite a lot not only in the responsiviness department, but also in accessibility. There's barely any semantic on it and the load times overall are not really great for a page with no images, no real need for javascript and so on.\n\n*My old website... Yes that line between the div and svg was actually visible.*😅\n![alt text](/old-website.PNG \"My old Nuxt.js website\")\n\n## Tech Choices 🔨\n\nThe old site was made with [Nuxt.js](https://nuxtjs.org/). Looking back, that site could've (and should've) been just a static HTML page. Inspired by the idea of just going raw HTML, that's what I initially started with.\n\nThe further I got, the more tedious that approach became. I had already decided that I would do a multi-page site and also wanted to implement this blog. The lack of style scoping and the lack of component reuseability quickly became a burden.\n\nSo I started spinning the wheel of frameworks once again! This time I wanted something more minimal though. I found [Sapper](https://sapper.svelte.dev/) which seemed way more appealing for this usecase than the alternatives:\n\n- It's super lightweight \n- It's easy to get started\n- Svelte as a framework has close to zero boilerplate\n\nDon't get me wrong: I have nothing against Nuxt.js, Next.js, Gatsby and so on. I think they're great but for this kind of lightweight website+blog\nproject, sapper seemed like it had the best toolkit. Although [Gatsby](https://www.gatsbyjs.org/) with [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) was super tempting, doing an almost fully static page with React or Vue just seemed like a bit of an overkill.\n\nWorking with Svelte and Sapper was super nice. The initial boilerplate they give you has an amazing focus on semantic and accessibility, the dev server is super fast and overall the best parts of the framework shine in a usecase like this.\n\n## Visual Progress 💅\n\nI decided to go for a minimal look in the hopes of rapid development and small bundle sizes. Overall I think the design turned out nice enough. The only \"gimmick\" I made was the landing figure styling. I wanted to sprinkle in a little bit of that [skeuomorphic design](https://uxstudioteam.com/ux-blog/ui-trends-2019/#10Skeuomorphic_design) double shadow goodness.\n\nTo achieve the nice effect of having a light source on the top left you need to cast a shadow on the bottom right and make a white shadow on the opposite side. To make the white appear at all I needed the background to be a bit darker. Also, I quickly realized that having just a solid red border completely wrecks the whole illusion.\n\n*Not good, the red border is way too strong* 🤮\n![alt-text](/figure-bad.PNG \"Red border ruins the illusion\")\n\nTo achieve the wanted effect, the border needed a gradient. Well, that isn't really a thing so I ended up doing a ball shape behind the image and placing the image on top of it. The tricky part was to make them properly responsive. Luckily, responsive square and circle shapes are easy enough to achieve with the ol' `padding-bottom: 100%;` trick. Some absolute positioning on the image, and voilà!\n\n*The circle shape for the gradient*\n![alt-text](/figure-bg.PNG \"The circle shape for the gradient\")\n\n*Final result, looking good!* 🎉\n![alt-text](/figure.PNG \"Final result\")\n\nHaving wrestled with that problem for longer than I want to admit, I decided that this was it for the gimmicks. Rest of the design is kind of self-explanatory: Black on white, some red highlights and that's it.\n\n## The Blog 📰\n\nImplementing the blog was the only real technical problem I had to solve. Blogs are a thing that have been solved like a million times already, but hey, we're all out here learning. I wanted to solve this at least mostly by myself.\n\nI decided to go with markdown, so I could easily write blog posts and just drop them in the repo with Github. This initial version uses similar approach that the Sapper template already came with. The `_posts.js` file bundles the .md files together and we use the `[slug].svelte` file to dynamically populate it with a plog post.\n\nThe images I serve from Sappers static folder, but there's also the option to just link them from a 3rd party site.\n\nThe pain point currently is the bundling of the markdown files:\n\n*Bundling the markdown*\n![alt-text](/bundling.PNG \"Bundling the markdown files\")\n\nAs you can see, all new blogposts currently require a new entry on the file. I tried experimenting with having the metadata in the .md itself and using the [marked-metadata](https://github.com/jaydson/marked-metadata) library instead of just [marked](https://github.com/markedjs/marked) on webpack level. That part worked fine, but the issue I had was with collecting the markdown. I tried importing all the files from the folder, something like `import posts from \"../blog_content/*.md\"` but for some reason I couldn't get the [webpack-glob-entry](https://www.npmjs.com/package/webpack-glob-entry) to play nicely at all.\n\nIn the end I decided to ditch the wildcard import and webpack level .md parsing, and do it on the bundling part. This allowed me some more freedom with parsing the posts and getting some additional data from them. For example, I can now determine the estimated read time for the post! The end result is still far from perfect, but at least now the metadata comes from the .md file, and there is only two lines to add to `_posts.js` when adding new posts.\n\n*Bundling the markdown but with less manual labor*\n![alt-text](/bundling-better.PNG \"Bundling the markdown files\")\n\nIn the hopes of actually finishing the site during my holiday, I left the blog post part as is for now. But I'm most certainly coming back to the subject. Expect a new blog post soon!\n\n## Deploying 🚀\n\nGithub pages was a obvious choice here. There are some tempting alternatives, but I already had my github pages setup and my custom domain was already setup nicely with it. Github pages is also available with a great price of free!\n\nI'm planning to do some sort of fancier integration, maybe utilizing [Github actions](https://github.com/features/actions) but before I sorted how I want to proceed with the blog I didn't want to commit to a solution. It would suck to implement a fancy deployment pipeline, maybe even costing some money just to end up scrapping it.\n\nI did, however, make a [super ghetto deployment script](https://github.com/Temetias/homepage-2020/blob/master/deploy.sh) which I hooked up with npm so I can just use `npm run deploy` to push all my changes live. It's not the fanciest thing ever, but hey, it works. With this setup I might actually be able to keep myself updating the website every now and then!\n"].map((function(e){const{data:t,content:n}=a()(e);return{...t,content:s()(n),readTime:(o=n,Math.round(o.split(" ").length/256))};var o}));t.a=r},17:function(e,t,n){"use strict";var o=n(0);function a(e){return e.author||"Teemu Karppinen"}function i(e){return e.authorImg||"/me2.jpg"}function s(e){return e.authorLink||"/"}function r(e){let t,n,r,l,h,c,d,u,m,p,b,g,f,y,w,j,v,O,k,I,T,x=a(e[0])+"",S=new Date(e[0].date).toLocaleDateString()+"",N=e[0].readTime+"";return{c(){t=Object(o.q)("header"),n=Object(o.q)("div"),r=Object(o.q)("img"),c=Object(o.K)(),d=Object(o.q)("div"),u=Object(o.q)("a"),m=Object(o.N)(x),b=Object(o.K)(),g=Object(o.q)("span"),f=Object(o.q)("span"),y=Object(o.N)(S),w=Object(o.K)(),j=Object(o.q)("span"),v=Object(o.N)("•"),O=Object(o.K)(),k=Object(o.q)("span"),I=Object(o.N)(N),T=Object(o.N)(" min read"),this.h()},l(e){t=Object(o.i)(e,"HEADER",{class:!0});var a=Object(o.g)(t);n=Object(o.i)(a,"DIV",{class:!0});var i=Object(o.g)(n);r=Object(o.i)(i,"IMG",{src:!0,alt:!0,class:!0}),c=Object(o.j)(i),d=Object(o.i)(i,"DIV",{class:!0});var s=Object(o.g)(d);u=Object(o.i)(s,"A",{href:!0,class:!0});var l=Object(o.g)(u);m=Object(o.k)(l,x),l.forEach(o.p),b=Object(o.j)(s),g=Object(o.i)(s,"SPAN",{class:!0});var h=Object(o.g)(g);f=Object(o.i)(h,"SPAN",{class:!0});var p=Object(o.g)(f);y=Object(o.k)(p,S),p.forEach(o.p),w=Object(o.j)(h),j=Object(o.i)(h,"SPAN",{class:!0});var q=Object(o.g)(j);v=Object(o.k)(q,"•"),q.forEach(o.p),O=Object(o.j)(h),k=Object(o.i)(h,"SPAN",{class:!0});var A=Object(o.g)(k);I=Object(o.k)(A,N),T=Object(o.k)(A," min read"),A.forEach(o.p),h.forEach(o.p),s.forEach(o.p),i.forEach(o.p),a.forEach(o.p),this.h()},h(){r.src!==(l=i(e[0]))&&Object(o.e)(r,"src",l),Object(o.e)(r,"alt",h=a(e[0])),Object(o.e)(r,"class","svelte-1jdubmn"),Object(o.e)(u,"href",p=s(e[0])),Object(o.e)(u,"class","svelte-1jdubmn"),Object(o.e)(f,"class","divider svelte-1jdubmn"),Object(o.e)(j,"class","divider-dot svelte-1jdubmn"),Object(o.e)(k,"class","divider svelte-1jdubmn"),Object(o.e)(g,"class","svelte-1jdubmn"),Object(o.e)(d,"class","post-info-inner svelte-1jdubmn"),Object(o.e)(n,"class","post-info svelte-1jdubmn"),Object(o.e)(t,"class","svelte-1jdubmn")},m(e,a){Object(o.z)(e,t,a),Object(o.c)(t,n),Object(o.c)(n,r),Object(o.c)(n,c),Object(o.c)(n,d),Object(o.c)(d,u),Object(o.c)(u,m),Object(o.c)(d,b),Object(o.c)(d,g),Object(o.c)(g,f),Object(o.c)(f,y),Object(o.c)(g,w),Object(o.c)(g,j),Object(o.c)(j,v),Object(o.c)(g,O),Object(o.c)(g,k),Object(o.c)(k,I),Object(o.c)(k,T)},p(e,[t]){1&t&&r.src!==(l=i(e[0]))&&Object(o.e)(r,"src",l),1&t&&h!==(h=a(e[0]))&&Object(o.e)(r,"alt",h),1&t&&x!==(x=a(e[0])+"")&&Object(o.J)(m,x),1&t&&p!==(p=s(e[0]))&&Object(o.e)(u,"href",p),1&t&&S!==(S=new Date(e[0].date).toLocaleDateString()+"")&&Object(o.J)(y,S),1&t&&N!==(N=e[0].readTime+"")&&Object(o.J)(I,N)},i:o.D,o:o.D,d(e){e&&Object(o.p)(t)}}}function l(e,t,n){let{post:o}=t;return e.$set=e=>{"post"in e&&n(0,o=e.post)},[o]}class h extends o.a{constructor(e){var t;super(),document.getElementById("svelte-1jdubmn-style")||((t=Object(o.q)("style")).id="svelte-1jdubmn-style",t.textContent="header.svelte-1jdubmn.svelte-1jdubmn{margin-bottom:1em}a.svelte-1jdubmn.svelte-1jdubmn{font-weight:600}span.svelte-1jdubmn.svelte-1jdubmn{color:rgba(0, 0, 0, 0.6)}.post-info.svelte-1jdubmn.svelte-1jdubmn{display:flex}.post-info.svelte-1jdubmn img.svelte-1jdubmn{margin:0;border:1px solid white;border-radius:50%;width:4em;height:4em}.post-info-inner.svelte-1jdubmn.svelte-1jdubmn{margin-left:1em}.post-info-inner.svelte-1jdubmn span.svelte-1jdubmn{display:block}.divider.svelte-1jdubmn.svelte-1jdubmn,.divider-dot.svelte-1jdubmn.svelte-1jdubmn{display:inline !important}@media(max-width: 480px){.divider.svelte-1jdubmn.svelte-1jdubmn{display:block !important}.divider-dot.svelte-1jdubmn.svelte-1jdubmn{display:none !important;color:red}}",Object(o.c)(document.head,t)),Object(o.y)(this,e,l,r,o.H,{post:0})}}t.a=h},19:function(e,t){},61:function(e,t,n){"use strict";n.r(t),n.d(t,"preload",(function(){return r}));var o=n(0),a=n(16),i=n(17);function s(e){let t,n,a,s,r,h,c,d,u,m,p,b,g,f,y,w,j,v=e[0].title+"",O=e[0].content+"";return document.title=t=e[0].title,c=new i.a({props:{post:e[0]}}),{c(){n=Object(o.K)(),a=Object(o.q)("h1"),s=Object(o.N)(v),h=Object(o.K)(),Object(o.l)(c.$$.fragment),d=Object(o.K)(),u=Object(o.q)("div"),m=Object(o.K)(),p=Object(o.q)("div"),b=Object(o.q)("span"),g=Object(o.N)("Hey! If you're looking for a comment section I'm sorry to disappoint you: I\n    haven't had time to make one yet. 🤐 But if you wanna call me out on my\n    bull💩, just ping me\n    "),f=Object(o.q)("a"),y=Object(o.N)("@Twitter"),w=Object(o.N)("\n    meanwhile!"),this.h()},l(e){Object(o.F)('[data-svelte="svelte-iu3vwn"]',document.head).forEach(o.p),n=Object(o.j)(e),a=Object(o.i)(e,"H1",{id:!0,class:!0});var t=Object(o.g)(a);s=Object(o.k)(t,v),t.forEach(o.p),h=Object(o.j)(e),Object(o.h)(c.$$.fragment,e),d=Object(o.j)(e),u=Object(o.i)(e,"DIV",{class:!0}),Object(o.g)(u).forEach(o.p),m=Object(o.j)(e),p=Object(o.i)(e,"DIV",{class:!0});var i=Object(o.g)(p);b=Object(o.i)(i,"SPAN",{});var r=Object(o.g)(b);g=Object(o.k)(r,"Hey! If you're looking for a comment section I'm sorry to disappoint you: I\n    haven't had time to make one yet. 🤐 But if you wanna call me out on my\n    bull💩, just ping me\n    "),f=Object(o.i)(r,"A",{href:!0});var l=Object(o.g)(f);y=Object(o.k)(l,"@Twitter"),l.forEach(o.p),w=Object(o.k)(r,"\n    meanwhile!"),r.forEach(o.p),i.forEach(o.p),this.h()},h(){Object(o.e)(a,"id",r=l(e[0].title)),Object(o.e)(a,"class","svelte-1r59cqt"),Object(o.e)(u,"class","content svelte-1r59cqt"),Object(o.e)(f,"href","https://twitter.com/Temetias"),Object(o.e)(p,"class","blog-disclaimer svelte-1r59cqt")},m(e,t){Object(o.z)(e,n,t),Object(o.z)(e,a,t),Object(o.c)(a,s),Object(o.z)(e,h,t),Object(o.C)(c,e,t),Object(o.z)(e,d,t),Object(o.z)(e,u,t),u.innerHTML=O,Object(o.z)(e,m,t),Object(o.z)(e,p,t),Object(o.c)(p,b),Object(o.c)(b,g),Object(o.c)(b,f),Object(o.c)(f,y),Object(o.c)(b,w),j=!0},p(e,[n]){(!j||1&n)&&t!==(t=e[0].title)&&(document.title=t),(!j||1&n)&&v!==(v=e[0].title+"")&&Object(o.J)(s,v),(!j||1&n&&r!==(r=l(e[0].title)))&&Object(o.e)(a,"id",r);const i={};1&n&&(i.post=e[0]),c.$set(i),(!j||1&n)&&O!==(O=e[0].content+"")&&(u.innerHTML=O)},i(e){j||(Object(o.O)(c.$$.fragment,e),j=!0)},o(e){Object(o.P)(c.$$.fragment,e),j=!1},d(e){e&&Object(o.p)(n),e&&Object(o.p)(a),e&&Object(o.p)(h),Object(o.n)(c,e),e&&Object(o.p)(d),e&&Object(o.p)(u),e&&Object(o.p)(m),e&&Object(o.p)(p)}}}async function r({params:e}){const t=a.a.filter(t=>t.slug===e.slug)[0];if(t)return{post:t};this.error(404,"Not found")}function l(e){return e.toLowerCase().split(" ").join("-")}function h(e,t,n){let{post:o}=t;return e.$set=e=>{"post"in e&&n(0,o=e.post)},[o]}class c extends o.a{constructor(e){var t;super(),document.getElementById("svelte-1r59cqt-style")||((t=Object(o.q)("style")).id="svelte-1r59cqt-style",t.textContent="h1.svelte-1r59cqt{margin-bottom:1em}.content.svelte-1r59cqt{margin:2em 0}.blog-disclaimer.svelte-1r59cqt{display:block;border-bottom:1px solid rgba(0, 0, 0, 0.12);border-top:1px solid rgba(0, 0, 0, 0.12);padding:2em 0;margin-top:5em;font-weight:600}",Object(o.c)(document.head,t)),Object(o.y)(this,e,h,s,o.H,{post:0})}}t.default=c}}]);