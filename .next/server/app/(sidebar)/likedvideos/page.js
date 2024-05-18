(()=>{var e={};e.id=998,e.ids=[998],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},83122:e=>{"use strict";e.exports=require("undici")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},57310:e=>{"use strict";e.exports=require("url")},28386:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>l}),a(74790),a(35866),a(22790),a(19644);var s=a(23191),r=a(88716),i=a(37922),o=a.n(i),n=a(95231),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);a.d(t,d);let l=["",{children:["(sidebar)",{children:["likedvideos",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,74790)),"D:\\Learn Tube\\app\\(sidebar)\\likedvideos\\page.tsx"]}]},{}]},{"not-found":[()=>Promise.resolve().then(a.t.bind(a,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,22790)),"D:\\Learn Tube\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(a.bind(a,19644)),"D:\\Learn Tube\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["D:\\Learn Tube\\app\\(sidebar)\\likedvideos\\page.tsx"],u="/(sidebar)/likedvideos/page",p={require:a,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/(sidebar)/likedvideos/page",pathname:"/likedvideos",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},6136:(e,t,a)=>{Promise.resolve().then(a.bind(a,72998))},72998:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>v});var s=a(10326),r=a(17577),i=a.n(r),o=a(4829),n=a(72058),d=a(78882),l=a(10983),c=a(24293),u=a(56644),p=a(37761),m=a(98684),b=a.n(m),x=a(35047);a(45996);var h=a(14059);let f=(0,c.Ps)`

query likedVideos($email: String) {
    getLikedVideos (email: $email){
        channelLogo
        courseFees
        courseId
        videoId
        videoPublishedAt
        videoThumbnail
        videoTitle
        videoViews
      }
  }
`,v=()=>{let{isDarkMode:e}=(0,p.v)(),t=(0,x.useRouter)(),[a,c]=i().useState(!1),[m,v]=(0,r.useState)(""),[g,y]=(0,r.useState)([]),[j]=(0,l.F_)(d.I8),{loading:w,error:N,data:P}=(0,u.a)(f,{variables:{email:m}}),k=e=>{let t=parseInt(e,10);if(isNaN(t))return"Invalid timestamp";let a=new Date,s=new Date(t),r=Math.floor((a.getTime()-s.getTime())/1e3);return r<0?"Future timestamp":r<60?`${r} seconds ago`:r<3600?`${Math.floor(r/60)} minutes ago`:r<86400?`${Math.floor(r/3600)} hours ago`:`${Math.floor(r/86400)} days ago`},_=(0,r.useCallback)(async(e,a,s)=>{try{let t=await fetch("https://learntube-a08m.onrender.com/features/addtohistory",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:m,videoId:e})}),a=await t.json();console.log("Video added to history:",a)}catch(e){console.error("Failed to add video to history:",e)}null===a&&t.push(`/video/${e}`);try{let a=await fetch("https://learntube-a08m.onrender.com/api/isenroll",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:m,courseId:s})}),r=await a.json();!0===r.isEnrolled?t.push(`/video/${e}`):t.push(`/payment/${s}`)}catch(e){console.error("Failed to fetch enrollment status:",e)}},[m]);return(0,r.useEffect)(()=>{j&&v(j.email||""),P&&m&&(y(P.getLikedVideos),console.log(P.getLikedVideos))},[v,P,j,y]),(0,s.jsxs)(s.Fragment,{children:[s.jsx(b(),{}),s.jsx(o.default,{query:""}),s.jsx(n.default,{}),w?s.jsx("div",{className:`pt-52 pl-72 pb-10  min-h-screen ${e?"bg-white":"bg-black"}`,children:[...Array(6)].map((e,t)=>(0,s.jsxs)("div",{className:"flex mb-5",children:[s.jsx(h.X,{isLoaded:a,className:"w-72 mb-5 rounded-lg",children:s.jsx("div",{className:"h-36 w-full rounded-lg bg-gray-500"})}),(0,s.jsxs)("div",{className:"w-full flex items-center gap-3 ml-7",children:[s.jsx("div",{children:s.jsx(h.X,{className:"flex rounded-full w-12 h-12"})}),(0,s.jsxs)("div",{className:"w-full flex flex-col gap-2",children:[s.jsx(h.X,{className:"h-3 w-3/5 rounded-lg"}),s.jsx(h.X,{className:"h-3 w-4/5 rounded-lg"})]})]})]},t))}):s.jsx("div",{className:`${e?"bg-white text-black":"bg-black text-white"}`,children:s.jsx("div",{className:"ml-80 pt-20 pb-10",children:(0,s.jsxs)("div",{id:"description-container",className:"",style:{marginTop:"40px"},children:[s.jsx("p",{className:"text-3xl font-bold text-amber-600 mb-7",children:"Liked videos"}),g.map((e,t)=>(0,s.jsxs)("div",{id:"video-content",className:"flex mb-10",children:[s.jsx("img",{className:"transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md",height:200,width:200,src:e.videoThumbnail,alt:"",onClick:()=>{_(e.videoId,e.courseFees,e.courseId)}}),(0,s.jsxs)("div",{className:"flex mt-10 ml-5 justify-center mr-10",children:[s.jsx("div",{children:s.jsx("img",{height:30,width:30,className:"rounded-full m-1",src:e.channelLogo,alt:""})}),(0,s.jsxs)("div",{className:"ml-3",children:[s.jsx("h1",{className:"font-bold",children:e.videoTitle})," ",(0,s.jsxs)("p",{className:"text-sm text-gray-500",children:[e.videoViews," views - ",k(e.videoPublishedAt)," "]})]})]})]},t))]})})})]})}},74790:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>o,__esModule:()=>i,default:()=>n});var s=a(68570);let r=(0,s.createProxy)(String.raw`D:\Learn Tube\app\(sidebar)\likedvideos\page.tsx`),{__esModule:i,$$typeof:o}=r;r.default;let n=(0,s.createProxy)(String.raw`D:\Learn Tube\app\(sidebar)\likedvideos\page.tsx#default`)},45996:()=>{},14059:(e,t,a)=>{"use strict";a.d(t,{X:()=>u});var s=a(84521),r=(0,a(64723).tv)({slots:{base:["group","relative","overflow-hidden","bg-content3 dark:bg-content2","before:opacity-100","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-content4/30","before:bg-gradient-to-r","before:from-transparent","before:via-content4","dark:before:via-default-700/10","before:to-transparent","after:opacity-100","after:absolute","after:inset-0","after:-z-10","after:bg-content3","dark:after:bg-content2","data-[loaded=true]:!bg-transparent","data-[loaded=true]:before:opacity-0 data-[loaded=true]:before:animate-none","data-[loaded=true]:after:opacity-0"],content:["opacity-0","group-data-[loaded=true]:opacity-100"]},variants:{disableAnimation:{true:{base:"before:animate-none before:transition-none after:transition-none",content:"transition-none"},false:{base:"transition-background !duration-300 before:transition-opacity before:!duration-300",content:"transition-opacity motion-reduce:transition-none !duration-300"}}},defaultVariants:{disableAnimation:!1}}),i=a(50214),o=a(88672),n=a(17236),d=a(17577),l=a(10326),c=(0,s.Gp)((e,t)=>{let{Component:a,children:c,getSkeletonProps:u,getContentProps:p}=function(e){let[t,a]=(0,s.oe)(e,r.variantKeys),{as:l,children:c,isLoaded:u=!1,className:p,classNames:m,...b}=t,x=(0,d.useMemo)(()=>r({...a}),[(0,i.Xx)(a),c]),h=(0,o.W)(null==m?void 0:m.base,p);return{Component:l||"div",children:c,slots:x,classNames:m,getSkeletonProps:(e={})=>({"data-loaded":(0,n.PB)(u),className:x.base({class:(0,o.W)(h,null==e?void 0:e.className)}),...b}),getContentProps:(e={})=>({className:x.content({class:(0,o.W)(null==m?void 0:m.content,null==e?void 0:e.className)})})}}({...e});return(0,l.jsx)(a,{ref:t,...u(),children:(0,l.jsx)("div",{...p(),children:c})})});c.displayName="NextUI.Skeleton";var u=c}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[948,806,621,371,624,983,898,641,805,508,229,140,58],()=>a(28386));module.exports=s})();