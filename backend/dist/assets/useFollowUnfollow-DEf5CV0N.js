import{u as y,r as g,Z as D,d as m,e as S,j as e,L as v,F as l,B as h,T as x,W as j,b as w,s as _,c as z}from"./index-JVrb99rO.js";import{f as A,D as E,A as F}from"./formatDistanceToNow-D_iz8mLG.js";import{A as u}from"./chunk-V7PAE35Z-D2UZjn2e.js";const T=({post:s,postedBy:t})=>{const i=y(),[o,a]=g.useState(null),c=D(),n=m(r=>r.posts.setPosts),f=m(r=>r.user.userInfo),d=S(),P=async()=>{try{const r=await w.get("/api/users/profile/"+t);a(r.data)}catch(r){i("Error",r.response.data.error,"error"),a(null)}},b=async r=>{try{if(r.preventDefault(),!window.confirm("Are you sure you want to delete this post?"))return;await w.delete("/api/posts/"+s._id),i("Success","Post deleted","success"),d(_(n.filter(p=>p._id!==s._id)))}catch(p){i("Error",p.response.data.error,"error")}};return g.useEffect(()=>{P()},[t]),o?e.jsx(v,{to:`/${o.userName}/post/${s._id}`,children:e.jsxs(l,{gap:3,mb:4,py:5,children:[e.jsxs(l,{flexDirection:"column",alignItems:"center",children:[e.jsx(u,{size:"md",name:o==null?void 0:o.name,src:o==null?void 0:o.profilePic,onClick:r=>{r.preventDefault(),c(`/${o.userName}`)}}),e.jsx(h,{w:"1px",h:"full",bg:"gray.light",my:2}),e.jsxs(h,{position:"relative",w:"full",children:[s.replies.length===0&&e.jsx(x,{textAlign:"center",children:"🥱"}),s.replies[0]&&e.jsx(u,{size:"xs",name:"John doe",src:s.replies[0].userProfilePic,position:"absolute",top:"0px",left:"15px",padding:"2px"}),s.replies[1]&&e.jsx(u,{size:"xs",name:"John doe",src:s.replies[1].userProfilePic,position:"absolute",bottom:"0px",right:"-5px",padding:"2px"}),s.replies[2]&&e.jsx(u,{size:"xs",name:"John doe",src:s.replies[2].userProfilePic,position:"absolute",bottom:"0px",left:"4px",padding:"2px"})]})]}),e.jsxs(l,{flex:1,flexDirection:"column",gap:2,children:[e.jsxs(l,{justifyContent:"space-between",w:"full",children:[e.jsxs(l,{w:"full",alignItems:"center",children:[e.jsx(x,{fontSize:"sm",fontWeight:"bold",onClick:r=>{r.preventDefault(),c(`/${o.userName}`)},children:o==null?void 0:o.userName}),e.jsx(j,{src:"/verified.png",w:4,h:4,ml:1})]}),e.jsxs(l,{gap:4,alignItems:"center",children:[e.jsxs(x,{fontSize:"md",width:36,textAlign:"right",color:"gray.light",children:[A(new Date(s.createdAt))," ago"]}),(f==null?void 0:f._id)===o._id&&e.jsx(E,{cursor:"pointer",size:20,onClick:b})]})]}),e.jsx(x,{fontSize:"sm",children:s.text}),s.img&&e.jsx(h,{borderRadius:6,overflow:"hidden",border:"1px solid",borderColor:"gray.light",children:e.jsx(j,{src:s.img,w:"full"})}),e.jsx(l,{gap:3,my:1,children:e.jsx(F,{post:s})})]})]})}):null},C=s=>{const t=m(d=>d.user.userInfo),[i,o]=g.useState(s.followers.includes(t==null?void 0:t._id)),{isLoading:a,setLoading:c}=z(),n=y();return{handleFollowUnfollow:async()=>{if(!t){n("Error","Please login to follow","error");return}if(!a){c(!0);try{await w.post(`/api/users/follow/${s._id}`),i?(n("Success",`Unfollowed ${s.name}`,"success"),s.followers.pop()):(n("Success",`Followed ${s.name}`,"success"),s.followers.push(t==null?void 0:t._id)),o(!i)}catch(d){n("Error",d.response.data.error,"error")}finally{c(!1)}}},isLoading:a,following:i}};export{T as P,C as u};