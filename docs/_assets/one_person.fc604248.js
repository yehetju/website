let __VITE_CSS__=document.createElement("style");__VITE_CSS__.innerHTML="li[data-v-f86aebba]{list-style:none;float:none;width:23%;min-width:200px;display:inline-block;padding:10px;cursor:pointer}li[data-v-f86aebba]:hover{background-color:#3a8ee6;color:#fff}",document.head.appendChild(__VITE_CSS__);import{r as ref,a as reactive,h as http,j as jquery,p as pushScopeId,b as popScopeId,c as resolveComponent,o as openBlock,d as createBlock,e as createVNode,t as toDisplayString,w as withDirectives,v as vShow,F as Fragment,f as renderList,g as createCommentVNode,i as withScopeId,k as createTextVNode}from"./index.4e1d8120.js";function base64decode(e){var t,o,r,a,n,i,c,s=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);for(i=e.length,n=0,c="";n<i;){do{t=s[255&e.charCodeAt(n++)]}while(n<i&&-1==t);if(-1==t)break;do{o=s[255&e.charCodeAt(n++)]}while(n<i&&-1==o);if(-1==o)break;c+=String.fromCharCode(t<<2|(48&o)>>4);do{if(61==(r=255&e.charCodeAt(n++)))return c;r=s[r]}while(n<i&&-1==r);if(-1==r)break;c+=String.fromCharCode((15&o)<<4|(60&r)>>2);do{if(61==(a=255&e.charCodeAt(n++)))return c;a=s[a]}while(n<i&&-1==a);if(-1==a)break;c+=String.fromCharCode((3&r)<<6|a)}return c}var script={setup(){const showCategory=ref(!0),info=reactive({chapterList:[],current:0,result:[]});function goChap(index){var url=info.chapterList[index].url;info.result=[],info.current=index,http.jsonp({url:"http://m.taduo.net"+url}).then((function(res){var reg_g=/cp="(.+?)"/g,result=reg_g.exec(res),data=result[1],arrData=eval(base64decode(data).slice(4)),images=eval(arrData.substr(arrData.indexOf("[")));for(var i in images)images[i].indexOf("/c8.jpg")>-1||info.result.push("http://mh.jiduo.cc/"+images[i]);showCategory.value=!1,localStorage.oneperson_cur=JSON.stringify(info.chapterList[info.current])}))}function next(){goChap(info.current+1)}function prev(){goChap(info.current-1)}return http.jsonp({url:"http://www.taduo.net/manhua/2/",encode:"gb2312"}).then((e=>{var t=jquery(e).find(".plist").find("a");jquery("<ul></ul>");(t.each((function(e,o){let r=t.length-e-1;info.chapterList.unshift({index:r,url:o.pathname,name:o.innerText})})),console.log(info.chapterList),localStorage.oneperson_cur)&&goChap(JSON.parse(localStorage.oneperson_cur).index)})),{info:info,showCategory:showCategory,goChap:goChap,next:next,prev:prev}}};const _withId=withScopeId("data-v-f86aebba");pushScopeId("data-v-f86aebba");const _hoisted_1={id:"head",class:"region"},_hoisted_2={class:"region-head"},_hoisted_3={class:"region-content"},_hoisted_4={key:0},_hoisted_5={key:1},_hoisted_6=createTextVNode("上一章"),_hoisted_7=createTextVNode("目录"),_hoisted_8=createTextVNode("下一章");popScopeId();const render=_withId(((e,t,o,r,a,n)=>{const i=resolveComponent("el-button");return openBlock(),createBlock("div",_hoisted_1,[createVNode("div",_hoisted_2,toDisplayString(r.showCategory?"章节列表":r.info.chapterList[r.info.current].name),1),withDirectives(createVNode("div",_hoisted_3,[createVNode("ul",null,[(openBlock(!0),createBlock(Fragment,null,renderList(r.info.chapterList,((e,t)=>(openBlock(),createBlock("li",{onClick:e=>r.goChap(t)},toDisplayString(e.name),9,["onClick"])))),256))])],512),[[vShow,r.showCategory]]),r.showCategory?createCommentVNode("",!0):(openBlock(),createBlock("div",_hoisted_4,[(openBlock(!0),createBlock(Fragment,null,renderList(r.info.result,(e=>(openBlock(),createBlock("img",{src:e,width:"100%"},null,8,["src"])))),256))])),r.showCategory?createCommentVNode("",!0):(openBlock(),createBlock("div",_hoisted_5,[createVNode(i,{type:"primary",class:"btn btn-default",onClick:t[1]||(t[1]=e=>r.prev())},{default:_withId((()=>[_hoisted_6])),_:1}),createVNode(i,{type:"primary",class:"btn btn-default",onClick:t[2]||(t[2]=e=>r.showCategory=!0)},{default:_withId((()=>[_hoisted_7])),_:1}),createVNode(i,{type:"primary",class:"btn btn-default",onClick:t[3]||(t[3]=e=>r.next())},{default:_withId((()=>[_hoisted_8])),_:1})]))])}));script.render=render,script.__scopeId="data-v-f86aebba";export default script;
