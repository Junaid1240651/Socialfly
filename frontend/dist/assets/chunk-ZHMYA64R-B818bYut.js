import{r as n,ad as D,j as d,q as W,f as E,y as I}from"./index-JVrb99rO.js";function A(e){return n.Children.toArray(e).filter(t=>n.isValidElement(t))}function R(e,t){return Array.isArray(e)?e.map(r=>r===null?null:t(r)):D(e)?Object.keys(e).reduce((r,i)=>(r[i]=t(e[i]),r),{}):e!=null?t(e):null}var _=e=>d.jsx(W.div,{className:"chakra-stack__item",...e,__css:{display:"inline-block",flex:"0 0 auto",minWidth:0,...e.__css}});_.displayName="StackItem";function M(e){const{spacing:t,direction:r}=e,i={column:{my:t,mx:0,borderLeftWidth:0,borderBottomWidth:"1px"},"column-reverse":{my:t,mx:0,borderLeftWidth:0,borderBottomWidth:"1px"},row:{mx:t,my:0,borderLeftWidth:"1px",borderBottomWidth:0},"row-reverse":{mx:t,my:0,borderLeftWidth:"1px",borderBottomWidth:0}};return{"&":R(r,o=>i[o])}}var O=E((e,t)=>{const{isInline:r,direction:i,align:o,justify:g,spacing:c="0.5rem",wrap:j,children:f,divider:l,className:p,shouldWrapChildren:m,...C}=e,u=r?"row":i??"column",y=n.useMemo(()=>M({spacing:c,direction:u}),[c,u]),s=!!l,x=!m&&!s,S=n.useMemo(()=>{const h=A(f);return x?h:h.map((a,v)=>{const k=typeof a.key<"u"?a.key:v,N=v+1===h.length,b=m?d.jsx(_,{children:a},k):a;if(!s)return b;const L=n.cloneElement(l,{__css:y}),B=N?null:L;return d.jsxs(n.Fragment,{children:[b,B]},k)})},[l,y,s,x,m,f]),w=I("chakra-stack",p);return d.jsx(W.div,{ref:t,display:"flex",alignItems:o,justifyContent:g,flexDirection:u,flexWrap:j,gap:s?void 0:c,className:w,...C,children:S})});O.displayName="Stack";export{O as S,A as g};
