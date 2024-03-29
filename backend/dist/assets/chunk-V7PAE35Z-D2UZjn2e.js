import{A as I,j as t,q as c,aj as w,r as j,f as E,N as F,w as P,y as M,E as R,M as O}from"./index-JVrb99rO.js";var[B,T]=I({name:"AvatarStylesContext",hookName:"useAvatarStyles",providerName:"<Avatar/>"});function W(r){var a;const e=r.split(" "),s=(a=e[0])!=null?a:"",o=e.length>1?e[e.length-1]:"";return s&&o?`${s.charAt(0)}${o.charAt(0)}`:s.charAt(0)}function C(r){const{name:a,getInitials:e,...s}=r,o=T();return t.jsx(c.div,{role:"img","aria-label":a,...s,__css:o.label,children:a?e==null?void 0:e(a):null})}C.displayName="AvatarName";var p=r=>t.jsxs(c.svg,{viewBox:"0 0 128 128",color:"#fff",width:"100%",height:"100%",className:"chakra-avatar__svg",...r,children:[t.jsx("path",{fill:"currentColor",d:"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"}),t.jsx("path",{fill:"currentColor",d:"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"})]});function N(r){const{src:a,srcSet:e,onError:s,onLoad:o,getInitials:d,name:l,borderRadius:m,loading:v,iconLabel:i,icon:h=t.jsx(p,{}),ignoreFallback:u,referrerPolicy:g,crossOrigin:n}=r,f=w({src:a,onError:s,crossOrigin:n,ignoreFallback:u})==="loaded";return!a||!f?l?t.jsx(C,{className:"chakra-avatar__initials",getInitials:d,name:l}):j.cloneElement(h,{role:"img","aria-label":i}):t.jsx(c.img,{src:a,srcSet:e,alt:l,onLoad:o,referrerPolicy:g,crossOrigin:n??void 0,className:"chakra-avatar__img",loading:v,__css:{width:"100%",height:"100%",objectFit:"cover",borderRadius:m}})}N.displayName="AvatarImage";var $={display:"inline-flex",alignItems:"center",justifyContent:"center",textAlign:"center",textTransform:"uppercase",fontWeight:"medium",position:"relative",flexShrink:0},q=E((r,a)=>{const e=F("Avatar",r),[s,o]=j.useState(!1),{src:d,srcSet:l,name:m,showBorder:v,borderRadius:i="full",onError:h,onLoad:u,getInitials:g=W,icon:n=t.jsx(p,{}),iconLabel:x=" avatar",loading:f,children:A,borderColor:y,ignoreFallback:_,crossOrigin:L,referrerPolicy:k,...S}=P(r),b={borderRadius:i,borderWidth:v?"2px":void 0,...$,...e.container};return y&&(b.borderColor=y),t.jsx(c.span,{ref:a,...S,className:M("chakra-avatar",r.className),"data-loaded":R(s),__css:b,children:t.jsxs(B,{value:e,children:[t.jsx(N,{src:d,srcSet:l,loading:f,onLoad:O(u,()=>{o(!0)}),onError:h,getInitials:g,name:m,borderRadius:i,icon:n,iconLabel:x,ignoreFallback:_,crossOrigin:L,referrerPolicy:k}),A]})})});q.displayName="Avatar";export{q as A,T as u};
