(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{145:function(t,e,n){var content=n(148);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("1450b1c2",content,!0,{sourceMap:!1})},146:function(t,e,n){var content=n(150);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("bab82136",content,!0,{sourceMap:!1})},147:function(t,e,n){"use strict";var o=n(145);n.n(o).a},148:function(t,e,n){(t.exports=n(16)(!1)).push([t.i,"html[data-v-386cdc62]{font-size:16px;word-spacing:1px;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;box-sizing:border-box;background-color:#e1e2ee}*[data-v-386cdc62],[data-v-386cdc62]:after,[data-v-386cdc62]:before{box-sizing:border-box;margin:0;letter-spacing:1px}body[data-v-386cdc62]{margin:0}h1[data-v-386cdc62],h2[data-v-386cdc62],h3[data-v-386cdc62],h4[data-v-386cdc62],h5[data-v-386cdc62],p[data-v-386cdc62],span[data-v-386cdc62]{font-family:Signika,sans-serif}.github-repo[data-v-386cdc62]{-webkit-animation:fade-data-v-386cdc62 .5s;animation:fade-data-v-386cdc62 .5s;-webkit-animation-fill-mode:both;animation-fill-mode:both;padding:2rem 0}@-webkit-keyframes fade-data-v-386cdc62{0%{opacity:0}to{opacity:1}}@keyframes fade-data-v-386cdc62{0%{opacity:0}to{opacity:1}}.github-repo h1[data-v-386cdc62]{word-break:break-all;padding-bottom:1rem}.github-repo h1 a[data-v-386cdc62]{color:#960000}.github-repo footer[data-v-386cdc62]{color:#57575a}",""])},149:function(t,e,n){"use strict";var o=n(146);n.n(o).a},150:function(t,e,n){(t.exports=n(16)(!1)).push([t.i,"html[data-v-85341e1c]{font-size:16px;word-spacing:1px;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;box-sizing:border-box;background-color:#e1e2ee}*[data-v-85341e1c],[data-v-85341e1c]:after,[data-v-85341e1c]:before{box-sizing:border-box;margin:0;letter-spacing:1px}body[data-v-85341e1c]{margin:0}h1[data-v-85341e1c],h2[data-v-85341e1c],h3[data-v-85341e1c],h4[data-v-85341e1c],h5[data-v-85341e1c],p[data-v-85341e1c],span[data-v-85341e1c]{font-family:Signika,sans-serif}.main[data-v-85341e1c]{color:#383434;width:100vw;padding:2rem 5vw}section[data-v-85341e1c]{padding:5vh 0}section h1[data-v-85341e1c]{color:#960000;font-size:3.5rem}section p[data-v-85341e1c]{padding:2vh 0;font-size:1.25rem}section .github-repo[data-v-85341e1c]{border-top:1px solid #f0361d}section .github-repo[data-v-85341e1c]:nth-child(3){border:none}",""])},151:function(t,e,n){"use strict";n.r(e);n(45);var o={props:["index","repo"],computed:{animationDelay:function(){return{"animation-delay":"".concat(this.index/8,"s")}},latestPush:function(){var t=new Date(this.repo.pushed_at);return"".concat(t.getDate(),".").concat(t.getMonth()+1,".").concat(t.getFullYear())}}},r=(n(147),n(10)),c={components:{GithubRepo:Object(r.a)(o,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"github-repo",style:t.animationDelay},[n("h1",[n("a",{attrs:{href:t.repo.html_url}},[t._v(t._s(t.repo.name))])]),t._v(" "),n("p",[t._v(t._s(t.repo.description))]),t._v(" "),n("footer",[n("span",[t._v("Latest push: "+t._s(t.latestPush))])])])},[],!1,null,"386cdc62",null).exports},data:function(){return{githubRepos:[]}},computed:{filteredAndSortedGithubRepos:function(){var t=this.githubRepos.filter(function(t){return"temetias.github.io"!==t.name.toLowerCase()});t.sort(function(a,b){return new Date(b.pushed_at)-new Date(a.pushed_at)});return t}},mounted:function(){var t=this;fetch("https://api.github.com/users/Temetias/repos").then(function(t){return t.json()}).catch(function(t){return console.error(t)}).then(function(e){return t.githubRepos=e}).catch(function(t){return console.error(t)})},head:function(){return{title:"Teemu Karppinen"}}},d=(n(149),Object(r.a)(c,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("section",[n("h1",[t._v("About me")]),t._v(" "),n("p",[t._v("\n\t\t\tMy name is Teemu Karppinen and I'm a Full Stack Developer from Joensuu, Finland.\n\t\t\tI've been working in software development for \n\t\t\t"+t._s((new Date).getFullYear()-2018)+" \n\t\t\tyear"+t._s((new Date).getFullYear()-2018>1?"s":"")+" and studied in University\n\t\t\tof Eastern Finland for 3 years. I'm also continuously learning and trying new \n\t\t\ttechnologies from online resources.\n\t\t")]),t._v(" "),n("p",[t._v("\n\t\t\tMy current title is Software Developer. My work consists of full \n\t\t\tstack development of web-based industrial IOT-solutions. Even though I do full \n\t\t\tstack, I consider my area of expertise to be front end development with \n\t\t\tfront end frameworks.\n\t\t")]),t._v(" "),n("p",[t._v("\n\t\t\tMy professonial experience consists mostly of TypeScript, JavaScript, Vue.js, \n\t\t\tCSS, SASS, HTML5, PHP and Drupal. I've also touched several other technologies \n\t\t\tand tools along the way. In my personal projects I've also used Python, Java, \n\t\t\tReact, Gatsby and pretty much every single Vue.js tool I've found.   \n\t\t")])]),t._v(" "),n("section",[n("h1",[t._v("My projects")]),t._v(" "),n("p",[t._v("\n\t\t\tFor the sake of content, here's a list of my current public Github repositories, \n\t\t\tincluding the source code for this page. You'll propably find that none of them \n\t\t\tare finished. The main goal of my hobby coding is to try out new things and gain experience about different \n\t\t\ttechnologies. Regardless, feel free to fork them and try them out!\n\t\t")]),t._v(" "),t._l(t.filteredAndSortedGithubRepos,function(t,e){return n("GithubRepo",{key:e,staticClass:"github-repo",attrs:{index:e,repo:t}})})],2)])},[],!1,null,"85341e1c",null));e.default=d.exports}}]);