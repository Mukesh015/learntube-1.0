(()=>{var e={};e.id=524,e.ids=[524],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},83122:e=>{"use strict";e.exports=require("undici")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},57310:e=>{"use strict";e.exports=require("url")},45722:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d}),a(41689),a(35866),a(22790),a(19644);var r=a(23191),s=a(88716),n=a(37922),o=a.n(n),i=a(95231),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);a.d(t,l);let d=["",{children:["(sidebar)",{children:["watchlater",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,41689)),"D:\\Learn Tube\\app\\(sidebar)\\watchlater\\page.tsx"]}]},{}]},{"not-found":[()=>Promise.resolve().then(a.t.bind(a,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,22790)),"D:\\Learn Tube\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(a.bind(a,19644)),"D:\\Learn Tube\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["D:\\Learn Tube\\app\\(sidebar)\\watchlater\\page.tsx"],u="/(sidebar)/watchlater/page",p={require:a,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/(sidebar)/watchlater/page",pathname:"/watchlater",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},78800:(e,t,a)=>{Promise.resolve().then(a.bind(a,19383))},19383:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>v});var r=a(10326),s=a(17577),n=a.n(s),o=a(4829),i=a(72058),l=a(35047),d=a(14059),c=a(84011),u=a(78882),p=a(10983),m=a(24293),h=a(56644),x=a(37761),b=a(98684),f=a.n(b);a(45996);let g=(0,m.Ps)`

query playlist($email: String) {
    getWatchLater(email: $email) {
        courseID
        courseFees
        videoId
        videoTitle
        channelLogo
        videoPublishedAt
        videoViews
        videoThumbnail
    }
  }

`,v=()=>{let{isDarkMode:e}=(0,x.v)(),[t,a]=n().useState(!1),m=(0,l.useRouter)(),[b,v]=(0,s.useState)(""),[y,w]=(0,s.useState)([]),[j]=(0,p.F_)(u.I8),{loading:N,error:P,data:_}=(0,h.a)(g,{variables:{email:b}}),T=e=>{let t=parseInt(e,10);if(isNaN(t))return"Invalid timestamp";let a=new Date,r=new Date(t),s=Math.floor((a.getTime()-r.getTime())/1e3);return s<0?"Future timestamp":s<60?`${s} seconds ago`:s<3600?`${Math.floor(s/60)} minutes ago`:s<86400?`${Math.floor(s/3600)} hours ago`:`${Math.floor(s/86400)} days ago`},q=(0,s.useCallback)(async(e,t,a)=>{try{let t=await fetch("https://learntube-a08m.onrender.com/features/addtohistory",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:b,videoId:e})}),a=await t.json();console.log("Video added to history:",a)}catch(e){console.error("Failed to add video to history:",e)}null===t&&m.push(`/video/${e}`);try{let t=await fetch("https://learntube-a08m.onrender.com/api/isenroll",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:b,courseId:a})}),r=await t.json();!0===r.isEnrolled?m.push(`/video/${e}`):m.push(`/payment/${a}`)}catch(e){console.error("Failed to fetch enrollment status:",e)}},[b]);return(0,s.useEffect)(()=>{j&&v(j.email||""),_&&b&&(w(_.getWatchLater),console.log(_.getWatchLater))},[v,_,j,w]),(0,r.jsxs)(r.Fragment,{children:[r.jsx(f(),{}),r.jsx(o.default,{query:""}),r.jsx(i.default,{}),N?r.jsx("div",{className:`pt-40 pl-72 pb-10  min-h-screen ${e?"bg-white":"bg-black"}`,children:[...Array(6)].map((e,a)=>(0,r.jsxs)("div",{className:"flex mb-5",children:[r.jsx(d.X,{isLoaded:t,className:"w-72 mb-5 rounded-lg",children:r.jsx("div",{className:"h-36 w-full rounded-lg bg-gray-500"})}),(0,r.jsxs)("div",{className:"w-full flex items-center gap-3 ml-7",children:[r.jsx("div",{children:r.jsx(d.X,{className:"flex rounded-full w-12 h-12"})}),(0,r.jsxs)("div",{className:"w-full flex flex-col gap-2",children:[r.jsx(d.X,{className:"h-3 w-3/5 rounded-lg"}),r.jsx(d.X,{className:"h-3 w-4/5 rounded-lg"})]})]})]},a))}):(0,r.jsxs)("div",{className:`${e?"bg-white text-black":"bg-black text-white"} pb-10`,children:[r.jsx("nav",{className:"pt-20 pr-20 ",children:(0,r.jsxs)("ul",{className:"flex flex-row-reverse gap-10",children:[r.jsx(c.e,{color:"warning",delay:700,showArrow:!0,content:"clear all",children:r.jsx("li",{className:`flex ext-blue-500 ${e?"hover:bg-gray-300":"hover:bg-gray-700"} font-semibold rounded-full cursor-default`,children:(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"m-2",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"#e30b13",children:[r.jsx("path",{d:"M0 0h24v24H0V0z",fill:"none"}),r.jsx("path",{d:"M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"})]})})}),r.jsx("li",{className:"text-3xl font-bold text-amber-600",style:{marginRight:"820px"},children:"Watch later list"})]})}),r.jsx("div",{className:"ml-80 ",children:r.jsx("div",{id:"description-container",className:"",style:{marginTop:"40px"},children:y.map((e,t)=>(0,r.jsxs)("div",{id:"video-content",className:"flex mb-10",children:[r.jsx("img",{className:"transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150 rounded-md",height:200,width:200,src:e.videoThumbnail,onClick:()=>{q(e.videoId,e.courseFees,e.courseID)},alt:""}),(0,r.jsxs)("div",{className:"flex mt-10 ml-5 justify-center mr-10",children:[r.jsx("div",{children:r.jsx("img",{height:30,width:30,className:"rounded-full m-1",src:e.channelLogo,alt:""})}),(0,r.jsxs)("div",{className:"ml-3",children:[r.jsx("h1",{className:"font-bold",children:e.videoTitle})," ",(0,r.jsxs)("p",{className:"text-gray-500 text-sm",children:[e.videoViews," views - ",T(e.videoPublishedAt)," "]})]})]})]},t))})})]})]})}},41689:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>o,__esModule:()=>n,default:()=>i});var r=a(68570);let s=(0,r.createProxy)(String.raw`D:\Learn Tube\app\(sidebar)\watchlater\page.tsx`),{__esModule:n,$$typeof:o}=s;s.default;let i=(0,r.createProxy)(String.raw`D:\Learn Tube\app\(sidebar)\watchlater\page.tsx#default`)},45996:()=>{},14059:(e,t,a)=>{"use strict";a.d(t,{X:()=>u});var r=a(84521),s=(0,a(64723).tv)({slots:{base:["group","relative","overflow-hidden","bg-content3 dark:bg-content2","before:opacity-100","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-content4/30","before:bg-gradient-to-r","before:from-transparent","before:via-content4","dark:before:via-default-700/10","before:to-transparent","after:opacity-100","after:absolute","after:inset-0","after:-z-10","after:bg-content3","dark:after:bg-content2","data-[loaded=true]:!bg-transparent","data-[loaded=true]:before:opacity-0 data-[loaded=true]:before:animate-none","data-[loaded=true]:after:opacity-0"],content:["opacity-0","group-data-[loaded=true]:opacity-100"]},variants:{disableAnimation:{true:{base:"before:animate-none before:transition-none after:transition-none",content:"transition-none"},false:{base:"transition-background !duration-300 before:transition-opacity before:!duration-300",content:"transition-opacity motion-reduce:transition-none !duration-300"}}},defaultVariants:{disableAnimation:!1}}),n=a(50214),o=a(88672),i=a(17236),l=a(17577),d=a(10326),c=(0,r.Gp)((e,t)=>{let{Component:a,children:c,getSkeletonProps:u,getContentProps:p}=function(e){let[t,a]=(0,r.oe)(e,s.variantKeys),{as:d,children:c,isLoaded:u=!1,className:p,classNames:m,...h}=t,x=(0,l.useMemo)(()=>s({...a}),[(0,n.Xx)(a),c]),b=(0,o.W)(null==m?void 0:m.base,p);return{Component:d||"div",children:c,slots:x,classNames:m,getSkeletonProps:(e={})=>({"data-loaded":(0,i.PB)(u),className:x.base({class:(0,o.W)(b,null==e?void 0:e.className)}),...h}),getContentProps:(e={})=>({className:x.content({class:(0,o.W)(null==m?void 0:m.content,null==e?void 0:e.className)})})}}({...e});return(0,d.jsx)(a,{ref:t,...u(),children:(0,d.jsx)("div",{...p(),children:c})})});c.displayName="NextUI.Skeleton";var u=c}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[948,806,621,371,624,983,898,641,805,508,229,140,58],()=>a(45722));module.exports=r})();