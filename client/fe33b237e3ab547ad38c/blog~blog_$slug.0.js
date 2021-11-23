(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{24:function(e,t,n){"use strict";var o=n(27),a=n.n(o),i=n(62),s=n.n(i);const r=["---\ntitle: Short code is good code\nslug: short-code-is-good-code\ndate: 2021-11-23\nauthor: Teemu Karppinen\nauthorImg: /me2.jpg\nauthorLink: https://teemukarppinen.dev\n---\n\n(Good) software developers do their best to make their code as readable as possible for the next developer. Be it adding comments, making patterns declarative or simply just organizing their code cleanly, a good coder ensures their code is nice and tidy and doesn't make the next developer want to quit their job.\n\nDue to this, there are a lot of guides and even books about the subject. Most of the authors usually inject their own approach to these practices and have their own approach to what is seen as \"clean code\". Lately I've been thinking about the subject a lot, and wanted to point out one thing that in my opinion doesn't pop often enough regarding clean code.\n\n## Relation to spoken language\n\nBack in my army days, our trainers often emphazised the importance of \"varusmiesvarma puhe\", which roughly translates to \"fool-proof speech\". One of the main points was that the wording you use should be straight to the point. Short, efficient and clear. Similar speech in my opinion is also valuable in professional life as well: \"Straight to the point\" avoids confusion and saves everyones precious time by keeping meetings short. Also it allows you to transmit more information within shorter period of time, which in my opinion in a professional setting is good.\n\nSame goes for emails and written documents. For example, the best pieces of documentation out there, are usually the ones with least noise and unnecessary filler text. Documentation isn't something people usually go to read for the fun of reading. They have stuff to do, things to fix. They only care about finding what they need.\n\n## /cry\n\nAt this stage you probably have an idea where I'm going with this: Short code is good.\n\nWhen I hop into a codebase, I usually have actual things that I need to find. I shouldn't need to scroll through unnecessary duplicate blocks of code, just to find the bug in line 664. I don't want to find variables just to see that are only used once and didn't actually serve any purpose as a variable. I don't want to find unnecessary function declarations around functions that would've fit the event handler as is.\n\n## Motivation\n\nWhy am I complaining about this? Because this effects me quite heavily. Some people are very good at reading code. They can eye through huge amounts of code fast and get a rough idea how it works. They can often hop into a codebase, ignore the parts that don't concern their current task in hand.\n\nI'm not one of those people.\n\nFor me, reading code can sometimes be a challenge. I need to understand my surroundings in the file. I don't \"browse\" code, I read code. Thus, every line in the codebase slows me down. Reading \"noisy\" code is a bit like trying to listen to a podcast that keeps buffering every 5 seconds. I've chatted with other professionals in the field and I'm not alone in this.\n\nAlso there's a thing to be said about code being a substance that requires maintenance. The more code you have, the more stuff you have to maintain. You might think the small decicions you make along the way don't matter, but if all the code you write ends up being 2 times as long as it needs to be, you're essentially doubling the size of your codebase.\n\n## Being explicit vs being implicit\n\nSome clean code influencers seem to be very much in the favor of being explicit with your code. They often emphasize being \"very clear about what you're doing\". I've also seen some hot takes like \"good code documents itself\".\n\nI strongly disagree with many of these statements.\n\nIf you're being explicit about everthing, nothing actually ends up being explicit. Your code will end up overly verbose and the actual meaning of your logic drowns in your implementation. It's much better to find the key points where you want to be explicit, and emphasize that. Rest of the implementation should be quiet, elegant, out of the way. Focus on being declarative, and there's nothing more declarative than your logic as pure as it can be.\n\nAlso the \"self-documenting code\" is in my opinion a weird approach to take. We have languages that are used for communication between humans, and languages for communication between human and the machine. Why would you use the latter for human to human communication, when all programming languages have a way to inject actual human to human conversation in them: Comments. This doesn't mean that your logic can be messy, I'm just saying that you shouldn't add extra verbosity to your code in exchange for avoiding comments.\n\nIncreasing the length of your variable names in hopes of improving it's descriptiviness is also a weird tradeoff in my opinion. If you think about variables and how you usually handle them: When you see a variable, you go see where it's declared and then start browsing the logic. Why would you invest unnecessary amount of characters into the variable name, when you can just place a comment where the variable is declared? And if the argument is \"I don't wanna scroll all the way to where the variable is declared\" then I'd say you have greater problems in the codebase.\n\n## Examples\n\nUnderneath are some very naive examples of what I'm talking about.\n\n```typescript\nasync function getCarsWithBrands() {\n  const listOfCarsOfUnknownBrands = await getCarList();\n  const listOfCarsWithBrands = listOfCarsOfUnknownBrands\n    .map(carOfUnknownBrand => {\n      const carWithBrandKnown = getCarBrand(carOfUnknownBrand);\n      return carWithBrandKnown;\n    });\n  return listOfCarsWithBrands\n}\n```\nOk, so lets start breaking this down...\n\nFirst of all, the name in line 2 is stupid. Why use something that long, when you can just use a comment? Imagine this logic being more complex and not just an arbitrary example. The code would look actually ridiculous.\n\nBetter:\n\n```typescript\nasync function getCarsWithBrands() {\n  const cars = await getCarList(); // Cars at this stage don't have brands.\n  const listOfCarsWithBrands = cars.map(carOfUnknownBrand => {\n    const carWithBrandKnown = getCarBrand(carOfUnknownBrand);\n    return carWithBrandKnown;\n  });\n  return listOfCarsWithBrands\n}\n```\n\nSo much easier on the eye. Looks a bit less like a wall of text, more like a declaration of logic.\n\nAlthough, I would argue that most of the variables are actually completely unnecessary. Why do we have variables in the first place? The serve no functional purpose whatsoever, they're noise.\n\nLet's improve:\n\n```typescript\nasync function getCarsWithBrands() {\n  const listOfCarsWithBrands = (await getCarList()).map(carOfUnknownBrand => {\n    const carWithBrandKnown = getCarBrand(carOfUnknownBrand);\n    return carWithBrandKnown;\n  });\n  return listOfCarsWithBrands\n}\n```\n\nWe got rid of the variable. Without the variable we don't even have the problem of naming it. We can do better still:\n\n```typescript\nasync function getCarsWithBrands() {\n  return (await getCarList()).map(carOfUnknownBrand => {\n    return getCarBrand(carOfUnknownBrand);\n  });\n}\n```\n\nTwo more variables gone. We are getting to a stage where I personally can now quicly read it, and see what it is about.\n\nWe can do better still though, we have an unnecessary function declaration. This is getting a bit language specific. These things come down to just being good with the language you're using and are not necessarily \"clean code\" concepts.\n\n```typescript\nasync function getCarsWithBrands() {\n  return (await getCarList()).map(getCarBrand);\n}\n```\n\nAt this stage it's kind of questionable if this even needs it's own function. Of course you can blame it on my relatively obsolete example, but suprisingly often you can find situations like these if you're actively stripping out unnecessary verbosity.\n\n## End notes\n\nPlease don't try to find some golden bullet for clean code here. Often the most frustrating code to read is when people have found their new golden bullet and overuse it everywhere. What I hope you take out from this is that think about the decicions you're taking when writing code. More text doesn't equal better readability. Often it's the exact opposite. Make your logic approachable by focusing on the logic and not hiding you logic behind some magical clean code guidelines.\n\nThink of us slow readers. 🙏",'---\ntitle: Javascript/Typescript tricks and gotchas\nslug: js-ts-tricks-and-gotchas\ndate: 2020-10-23\nauthor: Teemu Karppinen\nauthorImg: /me2.jpg\nauthorLink: https://teemukarppinen.dev\n---\n\nOk, so this is going to be a quicker and lighter one. I bundled a random mess of tricks and gotchas you might find useful when writing Javascript and Typescript! We all like our code clean and bug-free, and hopefully some of these tricks help you next time you\'re hammering code.\n\n## TRICK - Assigning class properties in constructors 🤩\n\nA nice one for you OOP fans out there. You know the annoying part of assigning the stuff from constructor to this context? You know, all this nonsense:\n![alt text](/class-bad.PNG "So much boilerplate!")\n\nWell, there\'s actually no need for all that. You can do this instead:\n![alt text](/class-good.PNG "Neat, readable, compact. 😍")\n\n## GOTCHA - Class method binding 🤮\n\nI\'ve ranted about this [before](/managing-event-handlers-in-classes): When assigning class methods as callbacks for example into events, they tend to lose their *this*-context. So, remember to either make a new arrow function callback, or bind the function.\n\n![alt text](/wroom.PNG "This context is gimmicky (and bug inviting!). Beware of (and avoid) it.")\n\n## TRICK - Spreading and destructuring everything 🤩\n\nDestructuring is one of my favourite features in Javascript. It allows you to reduce your LoC by a lot sometimes and overall results in compact and clean code. A common misconception is that it only works with objects but it also works for arrays too! I\'ve bundled some examples underneath.\n\n![alt text](/spread.PNG "Some examples of the power of spread and destructuring. Be careful not to overdo it!")\n\n## GOTCHA - Spread ordering 🤮\n\nNow that we are talking about spreading objects, be careful with the ordering. If you add a key to an object, the spread does in fact override the key! I have to admit, this bit me a couple of times before I started to get into the habit of *always spread first*.\n\n![alt text](/sad-toyota.PNG "Spread can bite you, be careful with the ordering!")\n\n## TRICK - Currying / Partial application 🤩\n\nThis is not only a JavaScript/TypeScript trick but more of a general functional programming concept. Sometimes you might want to make your function take its arguments one by one and return a new function between, instead of passing all of them at once. What this achieves is a specialization of the same functionality. The motivation behind this is to avoid duplicating code and reaching a more readable end result.\n\nLet\'s see an example:\n![alt text](/curry.PNG "Simplest example of currying")\n\nWhat happens here? "isIn" is a function which returns a function which returns a computation of some sort. What we achieve here is a specialization of the "complex computation" without actually replicating the computation elsewhere in your codebase. This results in more maintainable code without less factors when refactoring. Also, it kind of reads like normal text, doesn\'t it?\n\nTo more effectively utilize this in TypeScript, I\'ve learned that splitting your types based on the provided functionality achieves a very nice typesystem that supports currying. The types for the example above might look something like this:\n![alt text](/curry-ts.PNG "Simplest example of currying in TS")\n\nTo make the most out of this trick, make sure you order your arguments in a way that you put in the stuff you\'ll know early first and the stuff you know later last. Think about what is the needle and what is the haystack.\n\nMore stuff about currying and functional JS/TS in general can be found in [Kyle Simpsons "Functional Light JavaScript"](https://github.com/getify/Functional-Light-JS). Strong recommendation for the [video course in Frontend Masters](https://frontendmasters.com/courses/functional-javascript-v3/). Hands down one of the best online courses I\'ve ever watched.\n\n## TRICK - Ninja boolean conversions 🤩\n\nThis one is simple: You know how we often flip something to falsy with "!" operator. Well, you can chain two of them to flip to truthy. Very useful for filtering out falsy values from an array for example.\n![alt text](/bangbang.PNG "BANG BANG!")\nBe careful tho. The normal JS falsy lookup gimmicks apply here. "" is false and so on...\n\n## GOTCHA - Object evaluation when logging 🤮\n\nThis one is especially tricky for beginners. If you enjoy ```console.log``` debugging like so many of us, beware of this one. Objects work a bit differently when console.logging them. Especially on Chrome, the object tends to get evaluated when you actually see the log in the console, not when the script actually runs the console.log. This is hard to explain in image form like the other, but beware when you see the little "i" icon next to your object. It means the object was "evaluated just now". This means the state of the object might be totally different to what you\'re actually expecting.\n\nFirefox, my personal daily driver, seems to be much more predictable with this behaviour. But I remember this biting me many times back when I was still using Chrome and just learning JavaScript.\n\n![alt text](/evaluated.PNG "This object was evaluted in the time of printing, not when console log was called!")\nBeware of the icon next to the object.\n\n## TRICK - Forcing object evaluating when logging 🤩\n\n...But there\'s a way around this! You can do the goodol\' JSON.stringify JSON.parse to get around this. This kills all the references of the object and also removes a lot of the prototype -stuff that\'s not usually wanted when logging. This is, of course, a very brute force-y approach but can provide useful when you want to do some sanity checks. But let\'s face it: When debugging you often might wanna check for such things. 😅\n\n\n---\n\n## Outro\n\nThat\'s it. A couple of useful and not so useful nuggets of knowledge. Hopefully this helps you dodge a bug or clean up an expression or two. Happy hacking! 😊\n',"---\ntitle: Iterative Adoption of a Frontend Framework\nslug: iterative-adoption-of-a-frontend-framework\ndate: 2020-08-09\nauthor: Teemu Karppinen\nauthorImg: /me2.jpg\nauthorLink: https://teemukarppinen.dev\n---\n\nWhen starting a new frontend project in 2020 you're greeted with multiple nice tools and prebuilt configurations. Create-react-app, next.js, vue-cli, sapper... the list goes on. All of these tools provide brilliant DX and usually in the right hands yield an amazing end result. But what if we don't have the option to start from scratch?\n\n## Enchancing an old frontend ⚡\n\nSome frameworks advertise the ability to be iteratively adopted more than the other. One framework which usually pops up in these discussions is Vue.js. They claim to be \"incrementally adoptable\" which I personally can say is true, but there is surprisingly little material about journeys of that incremental adoption online.\n\nVue.js docs guide you to just drop a script tag into your page, type ```new Vue({ ... })``` and start hacking. That'll get you started for sure, but for a larger scale you might want to know a little more than that. Let's say you're working in an environment where the backend has some say how it serves the front end code and you don't really have a complicated build phase for your frontend. Something like a typical Wordpress / Drupal site, with some js/css files sprinkled on top.\n\nFor example, single file components (SFC) are not really a thing without going through the hassle of setting up some sort of custom build phase with webpack. Also the magical part of your app just appering into the DOM you'll also have to manage by yourself. This isn't as hard as it sounds though.\n\n## Serving and mounting 🔌\n\nAs previously said, Vue.js (and most other non-compiled frameworks) only require you to have the script loaded on the page. If you have any sort of library management already going on in your page, this is likely a non-issue. Just load the script before the rest of your code and that's it.\n\nThe next part is the mounting of the Vue.js component / app. This is where you'll have to consider some variables. Usually, the smartest move is to pick a separated functionality from the rest of your app. Say a data-panel, a navigation element, or something along those lines. The main thing you want to avoid is excessive communication between your existing frontend and your new Vue.js component. That is also completely possible, but it can get messy real fast.\n\nThe actual mounting is super easy, Vue.js provides a ```$mount``` -function, which can target any element from the DOM. You can think it kind of like jQuerys ```.appendTo```. In the react world the same functionality is achieved with ```ReactDOM.render```. The cool part about Vue.js' ```$mount``` is that you can omit the element from the function which starts the vue instance without visually mounting it, and you can just access the vue element with ```$el``` and mount it when you're ready. This can prove useful sometimes.\n\n## Templating 📐\n\nWithout single file components, you're most likely left wondering: \"What about my templates?\". Well, in react you'll want to use JSX / TSX but that'll require you to compile that down to plain js. In Vue.js you'll have the ```template``` property, which allows you to just use a html as a string as the template of the element! This sound a bit sketchy, but it works super nicely.\n\nMy personal preferred way is to use template literals. This allows for some funky little tricks that might not even be possible with SFC's like injecting variables like translated strings into the UI on the fly with ```${someVariable}``` -syntax without even passing it to the vue's vm! You can even have some syntax highlighting on your templates with vs-code extension comment-tagged-templates.\n\nI've also seen setups where people generate templates with PHP on the backend, inline that generated template into the js script and pass that into the vue instance. I can't really comment on that approach without trying it myself but I can see the template on the PHP side looking a bit wild with all the vue syntax sprinkled in. But there's no doubt you can do some pretty powerful things like that.\n\n## Styling 💅\n\nThis is the not so pretty part in my opinion. Single file components and modern build tools provide amazing tools for scoping, theming and for other style related stuff. But if you're doing iterative adoption you'll likely have to be still working with regular stylesheets. This is where you'll just have to figure out the best way for your specific stack yourself. The most effective way to style components from a global stylesheet for me has been using SASS with BEM, but your mileage may vary.\n\n## First component / feature is shipped, now what? 🥇🥈🥉\n\nKeep hammering! Add more elements to your page or start moving your existing root deeper in to the app. Adding more components to your page isn't something you'll have to worry about. I've seen people saying that multiple roots in a page is bad but actually there isn't that much to worry about. The recursive nature of the DOM means that most of the frontend frameworks are built so that nested components are basically just a new instance but with some optimisations. Sprinkling a lot of roots to your page is not necessarily that much of a performance hit in comparison. I've personally worked in a codebase where there is more than a 100 vue roots in the same page and it worked just fine.\n\nThere is also a surprising amount of ways to programmatically communicate between outside and inside of the components and even between 2 different roots. If you feel like it, you can even throw in a store like Vuex and have multiple vue roots link to that.\n\nOf course, if you have the possibility to just start moving the root of your framework deeper into the app and not create more roots, that's good. That'll save you the time of handling the complexity of creating and mounting multiple vue instances. Just go with whatever works for you, as long as you can get stuff done there and feel like you're moving towards an improved piece of software there are no \"wrong ways\" to go about iterative adoption!\n","---\ntitle: Managing Event Handlers in Classes\nslug: managing-event-handlers-in-classes\ndate: 2020-07-12\nauthor: Teemu Karppinen\nauthorImg: /me2.jpg\nauthorLink: https://teemukarppinen.dev\n---\n\nIf you've worked with TypeScript, you might've noticed that many of library authors have a weird obsession of writing libraries as classes. Or even worse, write class wrappers around already nice, clean, functional API's just for the sake of that \"being the TypeScript way of doing things\". Don't get me wrong: I'm not saying the libraries are necessarily bad or shouldn't be used. There are just some pain points that pop up with the OOP approach. Especially when we're talking about an event-driven language like JavaScript.\n\n## The Problem 😬\n\nLately I've been working on a feature which needs A LOT of event handlers. I'm not going into specifics because it's work stuff, but essentially I have to:\n\n- Create a lot of class instances\n- Attach methods of those class instances to different events\n- Handle the detaching of those events in the end of the class instances' lifecycle\n\nThe class instances are [vue-class-components](https://class-component.vuejs.org/), but that's trivial to the actual problem. Just any class API where we might need to attach and detach methods to events applies here. The problem arises when you want to attach and detach class methods while retaining the correct ```this``` context.\n\nLet's think about this scenario:\n\nYou have some library with events, for example some sort of map library. You want to attach a method of the class to the event, and detach it later. Easy, right?\n\n![alt text](/badbind.PNG \"This will lose THIS\")\n\nYou wish! You see, this approach will make the ```mouseDownHandler``` lose ```this``` context, and be unable to refer to the value it wants to. So in this case, the ```console.log``` doesn't print ```\"Hey\"``` but instead we get greeted with the good ol' ```undefined```.\n\n## The Ugly Solution 🤮\n\nOkay then, let's bind the function. But then that needs to happen inside the lifecycle. And don't forget, we want to refer that bound function later to detach it! So we can't just go ```map.mouseDown.on(this.mouseDownHandler.bind(this))``` because [Function.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) creates a new function and that's the function we want to be .offing later.\n\nSo what we need to do is to have a separate variable for the function and alter that one. Something like this:\n\n![alt text](/uglybind.PNG \"Works, but is ugly\")\n\nThis works but as you can see it's not the most readable approach and gets very boilerplatey fast. And you also need to come up with a new name for the unbound funtion. I've seen some use underscore prefixes like ```_handleMouseDown``` but that already is kind of reserved for indicating the intentional hiding of implementation details.\n\nAlso, as we can see, this doesn't scale that nicely...\n![alt text](/ugliestbind.PNG \"Works, but there is soo much code\")\n\n## The (less) Ugly Solutions 😪\n\nWell, the other day it kind of hit me. Instead of focusing too much on the methods, renaming, binding and all that mess, what if we just used some sort of \"cleanup callback array\"? I tried it and in my opinion this is the least ugly solution to this problem.\n\nCheck this out:\n![alt text](/prettybind.PNG \"Works, and is much cleaner to look at\")\n\nWe introduce a new array ```cleanUps``` and we do all the bind, .on and .off handling in the mounted hook. The overall lines of code doesn't really change but that's not the point. In my opinion there is still benefits with this approach:\n\n- Less weird name suffixes like ```Unbound```\n- The logic is in one place\n- More flexible approach. The cleanUps can be used for other things and from other methods.\n\nYou could also consider implementing a utility function if you find yourself doind a lot of attaching. Something like this:\n![alt text](/fancybind.PNG \"Everything is nicer when you use a function\")\n\nUtility functions... Can't have enough of those, right? 😅\n\n## To Close Things Up \n\nWhat I showed here is not necessarily the golden solution you were looking for. But it is, in my opinion, a decent workaround to an annoying problem. Overall, all this would've been avoided by not using class based API in the first place and avoiding the use of ```this``` altogether. But we don't always have the benefit of choosing the libraries we work with. It's situations like these, when workarounds like this are valuable.\n\n","---\ntitle: The New Website\nslug: new-website\ndate: 2020-06-24\nauthor: Teemu Karppinen\nauthorImg: /me2.jpg\nauthorLink: https://teemukarppinen.dev\n---\n\nDuring my summer holidays I finally decided to improve my personal website. I had a site already but it was made back when I was just starting in webdev and, well, it shows.\n\nThe old site lacked quite a lot not only in the responsiviness department, but also in accessibility. There's barely any semantic on it and the load times overall are not really great for a page with no images, no real need for javascript and so on.\n\n*My old website... Yes that line between the div and svg was actually visible.*😅\n![alt text](/old-website.PNG \"My old Nuxt.js website\")\n\n## Tech Choices 🔨\n\nThe old site was made with [Nuxt.js](https://nuxtjs.org/). Looking back, that site could've (and should've) been just a static HTML page. Inspired by the idea of just going raw HTML, that's what I initially started with.\n\nThe further I got, the more tedious that approach became. I had already decided that I would do a multi-page site and also wanted to implement this blog. The lack of style scoping and the lack of component reuseability quickly became a burden.\n\nSo I started spinning the wheel of frameworks once again! This time I wanted something more minimal though. I found [Sapper](https://sapper.svelte.dev/) which seemed way more appealing for this usecase than the alternatives:\n\n- It's super lightweight \n- It's easy to get started\n- Svelte as a framework has close to zero boilerplate\n\nDon't get me wrong: I have nothing against Nuxt.js, Next.js, Gatsby and so on. I think they're great but for this kind of lightweight website+blog\nproject, sapper seemed like it had the best toolkit. Although [Gatsby](https://www.gatsbyjs.org/) with [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) was super tempting, doing an almost fully static page with React or Vue just seemed like a bit of an overkill.\n\nWorking with Svelte and Sapper was super nice. The initial boilerplate they give you has an amazing focus on semantic and accessibility, the dev server is super fast and overall the best parts of the framework shine in a usecase like this.\n\n## Visual Progress 💅\n\nI decided to go for a minimal look in the hopes of rapid development and small bundle sizes. Overall I think the design turned out nice enough. The only \"gimmick\" I made was the landing figure styling. I wanted to sprinkle in a little bit of that [skeuomorphic design](https://uxstudioteam.com/ux-blog/ui-trends-2019/#10Skeuomorphic_design) double shadow goodness.\n\nTo achieve the nice effect of having a light source on the top left you need to cast a shadow on the bottom right and make a white shadow on the opposite side. To make the white appear at all I needed the background to be a bit darker. Also, I quickly realized that having just a solid red border completely wrecks the whole illusion.\n\n*Not good, the red border is way too strong* 🤮\n![alt-text](/figure-bad.PNG \"Red border ruins the illusion\")\n\nTo achieve the wanted effect, the border needed a gradient. Well, that isn't really a thing so I ended up doing a ball shape behind the image and placing the image on top of it. The tricky part was to make them properly responsive. Luckily, responsive square and circle shapes are easy enough to achieve with the ol' `padding-bottom: 100%;` trick. Some absolute positioning on the image, and voilà!\n\n*The circle shape for the gradient*\n![alt-text](/figure-bg.PNG \"The circle shape for the gradient\")\n\n*Final result, looking good!* 🎉\n![alt-text](/figure.PNG \"Final result\")\n\nHaving wrestled with that problem for longer than I want to admit, I decided that this was it for the gimmicks. Rest of the design is kind of self-explanatory: Black on white, some red highlights and that's it.\n\n## The Blog 📰\n\nImplementing the blog was the only real technical problem I had to solve. Blogs are a thing that have been solved like a million times already, but hey, we're all out here learning. I wanted to solve this at least mostly by myself.\n\nI decided to go with markdown, so I could easily write blog posts and just drop them in the repo with Github. This initial version uses similar approach that the Sapper template already came with. The `_posts.js` file bundles the .md files together and we use the `[slug].svelte` file to dynamically populate it with a plog post.\n\nThe images I serve from Sappers static folder, but there's also the option to just link them from a 3rd party site.\n\nThe pain point currently is the bundling of the markdown files:\n\n*Bundling the markdown*\n![alt-text](/bundling.PNG \"Bundling the markdown files\")\n\nAs you can see, all new blogposts currently require a new entry on the file. I tried experimenting with having the metadata in the .md itself and using the [marked-metadata](https://github.com/jaydson/marked-metadata) library instead of just [marked](https://github.com/markedjs/marked) on webpack level. That part worked fine, but the issue I had was with collecting the markdown. I tried importing all the files from the folder, something like `import posts from \"../blog_content/*.md\"` but for some reason I couldn't get the [webpack-glob-entry](https://www.npmjs.com/package/webpack-glob-entry) to play nicely at all.\n\nIn the end I decided to ditch the wildcard import and webpack level .md parsing, and do it on the bundling part. This allowed me some more freedom with parsing the posts and getting some additional data from them. For example, I can now determine the estimated read time for the post! The end result is still far from perfect, but at least now the metadata comes from the .md file, and there is only two lines to add to `_posts.js` when adding new posts.\n\n*Bundling the markdown but with less manual labor*\n![alt-text](/bundling-better.PNG \"Bundling the markdown files\")\n\nIn the hopes of actually finishing the site during my holiday, I left the blog post part as is for now. But I'm most certainly coming back to the subject. Expect a new blog post soon!\n\n## Deploying 🚀\n\nGithub pages was a obvious choice here. There are some tempting alternatives, but I already had my github pages setup and my custom domain was already setup nicely with it. Github pages is also available with a great price of free!\n\nI'm planning to do some sort of fancier integration, maybe utilizing [Github actions](https://github.com/features/actions) but before I sorted how I want to proceed with the blog I didn't want to commit to a solution. It would suck to implement a fancy deployment pipeline, maybe even costing some money just to end up scrapping it.\n\nI did, however, make a [super ghetto deployment script](https://github.com/Temetias/homepage-2020/blob/master/deploy.sh) which I hooked up with npm so I can just use `npm run deploy` to push all my changes live. It's not the fanciest thing ever, but hey, it works. With this setup I might actually be able to keep myself updating the website every now and then!\n"].map((function(e){const{data:t,content:n}=a()(e);return{...t,content:s()(n),readTime:(o=n,Math.round(o.split(" ").length/256))};var o}));t.a=r},25:function(e,t,n){"use strict";var o=n(0);function a(e){return e.author||"Teemu Karppinen"}function i(e){return e.authorImg||"/me2.jpg"}function s(e){return e.authorLink||"/"}function r(e){let t,n,r,l,h,c,d,u,m,p,g,b,f,y,w,v,k,j,I,O,T,x=a(e[0])+"",S=new Date(e[0].date).toLocaleDateString()+"",B=e[0].readTime+"";return{c(){t=Object(o.q)("header"),n=Object(o.q)("div"),r=Object(o.q)("img"),c=Object(o.L)(),d=Object(o.q)("div"),u=Object(o.q)("a"),m=Object(o.O)(x),g=Object(o.L)(),b=Object(o.q)("span"),f=Object(o.q)("span"),y=Object(o.O)(S),w=Object(o.L)(),v=Object(o.q)("span"),k=Object(o.O)("•"),j=Object(o.L)(),I=Object(o.q)("span"),O=Object(o.O)(B),T=Object(o.O)(" min read"),this.h()},l(e){t=Object(o.i)(e,"HEADER",{class:!0});var a=Object(o.g)(t);n=Object(o.i)(a,"DIV",{class:!0});var i=Object(o.g)(n);r=Object(o.i)(i,"IMG",{src:!0,alt:!0,class:!0}),c=Object(o.j)(i),d=Object(o.i)(i,"DIV",{class:!0});var s=Object(o.g)(d);u=Object(o.i)(s,"A",{href:!0,class:!0});var l=Object(o.g)(u);m=Object(o.k)(l,x),l.forEach(o.p),g=Object(o.j)(s),b=Object(o.i)(s,"SPAN",{class:!0});var h=Object(o.g)(b);f=Object(o.i)(h,"SPAN",{class:!0});var p=Object(o.g)(f);y=Object(o.k)(p,S),p.forEach(o.p),w=Object(o.j)(h),v=Object(o.i)(h,"SPAN",{class:!0});var W=Object(o.g)(v);k=Object(o.k)(W,"•"),W.forEach(o.p),j=Object(o.j)(h),I=Object(o.i)(h,"SPAN",{class:!0});var C=Object(o.g)(I);O=Object(o.k)(C,B),T=Object(o.k)(C," min read"),C.forEach(o.p),h.forEach(o.p),s.forEach(o.p),i.forEach(o.p),a.forEach(o.p),this.h()},h(){r.src!==(l=i(e[0]))&&Object(o.e)(r,"src",l),Object(o.e)(r,"alt",h=a(e[0])),Object(o.e)(r,"class","svelte-1jdubmn"),Object(o.e)(u,"href",p=s(e[0])),Object(o.e)(u,"class","svelte-1jdubmn"),Object(o.e)(f,"class","divider svelte-1jdubmn"),Object(o.e)(v,"class","divider-dot svelte-1jdubmn"),Object(o.e)(I,"class","divider svelte-1jdubmn"),Object(o.e)(b,"class","svelte-1jdubmn"),Object(o.e)(d,"class","post-info-inner svelte-1jdubmn"),Object(o.e)(n,"class","post-info svelte-1jdubmn"),Object(o.e)(t,"class","svelte-1jdubmn")},m(e,a){Object(o.z)(e,t,a),Object(o.c)(t,n),Object(o.c)(n,r),Object(o.c)(n,c),Object(o.c)(n,d),Object(o.c)(d,u),Object(o.c)(u,m),Object(o.c)(d,g),Object(o.c)(d,b),Object(o.c)(b,f),Object(o.c)(f,y),Object(o.c)(b,w),Object(o.c)(b,v),Object(o.c)(v,k),Object(o.c)(b,j),Object(o.c)(b,I),Object(o.c)(I,O),Object(o.c)(I,T)},p(e,[t]){1&t&&r.src!==(l=i(e[0]))&&Object(o.e)(r,"src",l),1&t&&h!==(h=a(e[0]))&&Object(o.e)(r,"alt",h),1&t&&x!==(x=a(e[0])+"")&&Object(o.K)(m,x),1&t&&p!==(p=s(e[0]))&&Object(o.e)(u,"href",p),1&t&&S!==(S=new Date(e[0].date).toLocaleDateString()+"")&&Object(o.K)(y,S),1&t&&B!==(B=e[0].readTime+"")&&Object(o.K)(O,B)},i:o.D,o:o.D,d(e){e&&Object(o.p)(t)}}}function l(e,t,n){let{post:o}=t;return e.$set=e=>{"post"in e&&n(0,o=e.post)},[o]}class h extends o.a{constructor(e){var t;super(),document.getElementById("svelte-1jdubmn-style")||((t=Object(o.q)("style")).id="svelte-1jdubmn-style",t.textContent="header.svelte-1jdubmn.svelte-1jdubmn{margin-bottom:1em}a.svelte-1jdubmn.svelte-1jdubmn{font-weight:600}span.svelte-1jdubmn.svelte-1jdubmn{color:rgba(0, 0, 0, 0.6)}.post-info.svelte-1jdubmn.svelte-1jdubmn{display:flex}.post-info.svelte-1jdubmn img.svelte-1jdubmn{margin:0;border:1px solid white;border-radius:50%;width:4em;height:4em}.post-info-inner.svelte-1jdubmn.svelte-1jdubmn{margin-left:1em}.post-info-inner.svelte-1jdubmn span.svelte-1jdubmn{display:block}.divider.svelte-1jdubmn.svelte-1jdubmn,.divider-dot.svelte-1jdubmn.svelte-1jdubmn{display:inline !important}@media(max-width: 480px){.divider.svelte-1jdubmn.svelte-1jdubmn{display:block !important}.divider-dot.svelte-1jdubmn.svelte-1jdubmn{display:none !important;color:red}}",Object(o.c)(document.head,t)),Object(o.y)(this,e,l,r,o.I,{post:0})}}t.a=h},28:function(e,t){}}]);