(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(805)}])},805:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return P}});var d=c(5893),e=c(7294),f=c(9647),g=c(5362),h=c(4622),i=c(1799),j=c(9396),k=c(797),l=c(6902),m=c(5892),n=c(6703),o=[{id:"0",type:"newSimpleData",data:{simpleData:new n.P,args:{},errorMessage:null},position:{x:0,y:0}}],p=[],q={newSimpleData:{category:"Importing"},loadDataFromUrl:{category:"Importing",arguments:[{name:"url",type:"text",optional:!1},{name:"autoType",type:"checkbox",defaultValue:!1},{name:"firstItem",type:"number",defaultValue:void 0},{name:"lastItem",type:"number",defaultValue:void 0}]},formatAllKeys:{category:"Cleaning",arguments:[]},renameKey:{category:"Cleaning",arguments:[{name:"oldKey",type:"keys",optional:!1},{name:"newKey",type:"text",optional:!1}]},checkValues:{category:"Cleaning",arguments:[{name:"nbItemsToCheck",type:"number"},{name:"randomize",type:"checkbox"}]},excludeMissingValues:{category:"Cleaning",arguments:[{name:"key",type:"keys"}]},keepMissingValues:{category:"Cleaning",arguments:[{name:"key",type:"keys"}]},removeDuplicates:{category:"Cleaning",arguments:[{name:"key",type:"keys"},{name:"nbToKeep",type:"number",defaultValue:1}]},keepDuplicates:{category:"Cleaning",arguments:[{name:"key",type:"keys"}]},valuesToString:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},]},valuesToInteger:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"thousandSeparator",type:"text",defaultValue:",",width:10},{name:"decimalSeparator",type:"text",defaultValue:".",width:10},{name:"skipErrors",type:"checkbox"}]},valuesToFloat:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"thousandSeparator",type:"text",defaultValue:",",width:10},{name:"decimalSeparator",type:"text",defaultValue:".",width:10},{name:"skipErrors",type:"checkbox"}]},valuesToDate:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"format",type:"text",optional:!1},{name:"skipErrors",type:"checkbox"}]},datesToString:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"format",type:"text",optional:!1},{name:"skipErrors",type:"checkbox"}]},replaceValues:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"oldValue",type:"text",optional:!1,jsOption:!0},{name:"newValue",type:"text",optional:!1,jsOption:!0},{name:"method",type:"select",defaultValue:void 0,options:[void 0,"entireString","partialString"]},]},roundValues:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"nbDigits",type:"number",defaultValue:1}]},modifyValues:{category:"Cleaning",maxWidth:1e3,arguments:[{name:"key",type:"keys",optional:!1},{name:"valueGenerator",type:"javascript",optional:!1,defaultValue:"(value) => {\n    \n    const modifiedValue = value\n    \n    return modifiedValue\n}"}]},modifyItems:{category:"Cleaning",maxWidth:1e3,arguments:[{name:"key",type:"keys",optional:!1},{name:"itemGenerator",type:"javascript",optional:!1,defaultValue:'(item) => {\n    \n    const modifiedValue = "Change me!"\n    \n    return modifiedValue\n}'}]},addKey:{category:"Restructuring",maxWidth:1e3,arguments:[{name:"key",type:"text",optional:!1},{name:"itemGenerator",type:"javascript",optional:!1,defaultValue:'(item) => {\n    const newValue = "Change me!"\n\n    return newValue\n}'}]},removeKey:{category:"Restructuring",arguments:[{name:"key",type:"keys",optional:!1},]},addItems:{category:"Restructuring",doubleSource:!0,arguments:[{name:"dataToBeAdded",type:"sourceB",optional:!1},{name:"fillMissingKeys",type:"checkbox"}]},mergeItems:{category:"Restructuring",doubleSource:!0,arguments:[{name:"dataToBeMerged",type:"sourceB",optional:!1},{name:"commonKey",type:"keys",optional:!1}]},keysToValues:{category:"Restructuring",arguments:[{name:"keys",type:"multipleKeys",optional:!1},{name:"newKeyForKeys",type:"text",optional:!1},{name:"newKeyForValues",type:"text",optional:!1}]},valuesToKeys:{category:"Restructuring",arguments:[{name:"newKeys",type:"keys",optional:!1},{name:"newValues",type:"keys",optional:!1}]},selectKeys:{category:"Selecting",arguments:[{name:"keys",type:"multipleKeys",optional:!1}]},filterValues:{category:"Selecting",maxWidth:1e3,arguments:[{name:"key",type:"keys",optional:!1},{name:"valueComparator",type:"javascript",defaultValue:"(value) => value > 10",optional:!1}]},filterItems:{category:"Selecting",maxWidth:1e3,arguments:[{name:"itemComparator",type:"javascript",defaultValue:"(item) => item.someNumber > 10",optional:!1}]},describe:{category:"Analyzing",arguments:[]},sortValues:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1},{name:"order",type:"select",defaultValue:"ascending",options:["ascending","descending"],optional:!1}]},addProportions:{category:"Analyzing",arguments:[{name:"method",type:"select",options:[void 0,"data","item"],defaultValue:void 0,optional:!1},{name:"key",type:"keys",condition:{name:"method",value:"data"}},{name:"newKey",type:"text",condition:{name:"method",value:"data"}},{name:"keyCategory",type:"multipleKeys",condition:{name:"method",value:"data"}},{name:"keys",type:"multipleKeys",condition:{name:"method",value:"item"}},{name:"suffix",type:"text",defaultValue:"Percent",condition:{name:"method",value:"item"}},{name:"nbDigits",type:"number",defaultValue:2}]},addVariation:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1},{name:"newKey",type:"text",optional:!1},{name:"valueGenerator",type:"javascript",optional:!1,defaultValue:"(a, b) => a - b"},{name:"order",type:"select",defaultValue:void 0,options:[void 0,"ascending","descending"]},{name:"firstValue",type:"text",jsOption:!0}]},addQuantiles:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1},{name:"newKey",type:"text",optional:!1},{name:"nbQuantiles",type:"number",optional:!1}]},addBins:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1},{name:"newKey",type:"text",optional:!1},{name:"nbBins",type:"number",optional:!1}]},addOutliers:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1},{name:"newKey",type:"text",optional:!1}]},excludeOutliers:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1}]},correlation:{category:"Analyzing",arguments:[{name:"key1",type:"keys"},{name:"key2",type:"multipleKeys"}]},summarize:{category:"Analyzing",arguments:[{name:"keyValue",type:"keys",defaultValue:void 0},{name:"keyCategory",type:"multipleKeys"},{name:"summary",type:"multipleBoxes",defaultValues:[!0,!0,!0,!0,!0,!0,!0],options:["count","min","max","sum","mean","median","deviation"]}]},getChart:{category:"Visualizing",justClone:!0,htmlOutput:!0,maxWidth:1e3,arguments:[{name:"x",type:"keys",defaultValue:void 0,optional:!1},{name:"y",type:"keys",defaultValue:void 0,optional:!1},{name:"type",type:"select",defaultValue:void 0,options:[void 0,"dot","line","bar","barVertical","barHorizontal","box","boxVertical","boxHorizontal"],optional:!1},{name:"color",type:"keys",defaultValue:void 0},{name:"marginLeft",type:"number",defaultValue:void 0}]},showTable:{category:"Visualizing",justClone:!0,maxWidth:1e3,arguments:[{name:"nbItemsInTable",type:"number",defaultValue:5}]}},r=(0,l.ZP)(function(a,b){return{nodeId:0,nodes:o,edges:p,methods:q,getNodeId:function(){b().logs&&console.log("getNodeId");var c=++b().nodeId;return a({nodeId:c}),c},generateArgId:function(a,b,c){return"node".concat(a,"method").concat(c,"Arg").concat(b)},handleStyle:{source:{height:10,width:10,bottom:-5},target:{height:10,width:10,bottom:-5,borderRadius:"0"}},onNodesChange:function(c){b().logs&&console.log("onNodesChange");var d=c.filter(function(a){return"remove"===a.type}).map(function(a){return a.id}),e=!0,f=!1,g=void 0;try{for(var h,i=d[Symbol.iterator]();!(e=(h=i.next()).done);e=!0){var j=h.value;b().updateNodeSimpleData(j,null,null)}}catch(k){f=!0,g=k}finally{try{e||null==i.return||i.return()}finally{if(f)throw g}}a({nodes:(0,m.y)(c,b().nodes)})},onEdgesChange:function(c){if(b().logs&&console.log("onEdgesChange"),a({edges:(0,m.z)(c,b().edges)}),1===c.length&&"remove"===c[0].type){var d=c[0].id.split("-"),e=d[2].replace("a","").replace("b",""),f=d[2][d[2].length-1];a({nodes:b().nodes.map(function(a){return a.id===e&&("a"===f?a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleData:null}):"b"===f&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleDataB:null}))),a})}),b().updateNodeArgs(e)}},onConnect:function(c){b().logs&&console.log("onConnect");var d,e=b().nodes,f=null===(d=e.find(function(a){return a.id===c.source}))|| void 0===d?void 0:d.data.simpleData,g=(0,m.c)(c,[])[0];g.style={strokeWidth:5};var h=b().edges,l=h.filter(function(a){return!((a.source!==g.source||a.target!==g.target)&&(a.target!==g.target||a.targetHandle!==g.targetHandle))}),n=l.map(function(a){return a.id}),o=(0,k.Z)(h.filter(function(a){return!n.includes(a.id)})).concat([g]),p=l.map(function(a){return a.target});a({edges:o,nodes:e.map(function(a){if(p.indexOf(a.id)> -1){var b=l.filter(function(b){return a.id===b.target}),d=!0,e=!1,g=void 0;try{for(var h,k=b[Symbol.iterator]();!(d=(h=k.next()).done);d=!0){var m=h.value;"a"===m.targetHandle?a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleData:null}):"b"===m.targetHandle&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleDataB:null}))}}catch(n){e=!0,g=n}finally{try{d||null==k.return||k.return()}finally{if(e)throw g}}}return a.id===c.target&&("a"===c.targetHandle?a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleData:f?f.clone():null}):"b"===c.targetHandle&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleDataB:f?f.clone():null}))),a})}),b().updateNodeArgs(c.target)},addCustomNode:function(c,d,e){b().logs&&console.log("addCustomNode");var f=c.target.value;c.target.value=e;var g=b().nodes,h=g[g.length-1];"newSimpleData"===f?a({nodes:(0,k.Z)(g).concat([{id:d,type:"newSimpleData",data:{method:f,simpleData:new n.P,args:{}},position:{x:h?h.position.x:0,y:h?h.position.y+h.height+20:0}}])}):a({nodes:(0,k.Z)(g).concat([{id:d,type:"simpleDataMethod",data:{method:f,sourceSimpleData:null,sourceSimpleDataB:null,simpleData:null,args:{}},position:{x:h?h.position.x:0,y:h?h.position.y+h.height+20:0}}])})},updateNodeArgs:function(c){b().logs&&console.log("updateNodeArgs");for(var d=b().nodes,e=d.find(function(a){return a.id===c}).data,f=e.method,g=e.sourceSimpleDataB,h={},k=null,l=b().methods,m=0;m<l[f].arguments.length;m++)if(["text","number","keys","select"].includes(l[f].arguments[m].type)){var n=document.querySelector("#".concat(b().generateArgId(c,m,f)));if(n){var o=n.value;l[f].arguments[m].jsOption&&document.querySelector("#".concat(b().generateArgId(c,m,f),"-JS")).checked&&(o=Function("return ".concat(o))()),"number"===l[f].arguments[m].type&&(o=parseInt(o),o=isNaN(o)?void 0:o),h[l[f].arguments[m].name]=""===o?void 0:o}}else if("javascript"===l[f].arguments[m].type){var p=document.querySelector("#".concat(b().generateArgId(c,m,f))).value;try{p=Function("return ".concat(p))(),h[l[f].arguments[m].name]=p}catch(q){k=q.message}}else"checkbox"===l[f].arguments[m].type?h[l[f].arguments[m].name]=document.querySelector("#".concat(b().generateArgId(c,m,f))).checked:["multipleKeys","multipleBoxes"].includes(l[f].arguments[m].type)?document.querySelectorAll(".".concat(b().generateArgId(c,m,f))).length>0&&(h[l[f].arguments[m].name]=Array.from(document.querySelectorAll(".".concat(b().generateArgId(c,m,f)))).filter(function(a){return a.checked}).map(function(a){return a.value})):"sourceB"===l[f].arguments[m].type&&(h[l[f].arguments[m].name]=g);var r=d.map(function(a){return a.id===c&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{args:h,errorMessage:k})),a});a({nodes:r})},updateNodeSimpleData:function(c,d,e){b().logs&&console.log("updateNodeSimpleData");var f=b().nodes.map(function(a){return a.id===c&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{simpleData:d,errorMessage:e})),a}),g=b().edges.filter(function(a){return a.source===c}),h=g.map(function(a){return a.target}),k=g.map(function(a){return a.targetHandle});f.map(function(a){var b=h.indexOf(a.id);return b> -1&&("a"===k[b]?a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleData:d}):"b"===k[b]&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleDataB:d}))),a}),a({nodes:f});var l=!0,m=!1,n=void 0;try{for(var o,p=h[Symbol.iterator]();!(l=(o=p.next()).done);l=!0){var q=o.value;b().updateNodeArgs(q)}}catch(r){m=!0,n=r}finally{try{l||null==p.return||p.return()}finally{if(m)throw n}}}}}),s=r;function t(){var a=s(),b=a.addCustomNode,c=a.getNodeId,f=a.methods,g=(0,e.useMemo)(function(){var a={},b=!0,c=!1,d=void 0;try{for(var e,g=Object.keys(f)[Symbol.iterator]();!(b=(e=g.next()).done);b=!0){var h=e.value;0>Object.keys(a).indexOf(f[h].category)&&(a[f[h].category]=[])}}catch(i){c=!0,d=i}finally{try{b||null==g.return||g.return()}finally{if(c)throw d}}var j=!0,k=!1,l=void 0;try{for(var m,n=Object.keys(f)[Symbol.iterator]();!(j=(m=n.next()).done);j=!0){var o=m.value;a[f[o].category].push(o)}}catch(p){k=!0,l=p}finally{try{j||null==n.return||n.return()}finally{if(k)throw l}}return a},[f]);return(0,d.jsx)("div",{style:{borderTop:"1px solid black",paddingTop:5,paddingBottom:5,paddingLeft:5,display:"flex",flexWrap:"wrap",backgroundColor:"white"},children:Object.keys(g).map(function(a){return(0,d.jsxs)("select",{onChange:function(d){return b(d,"".concat(c()),a)},children:[(0,d.jsx)("option",{children:a}),g[a].sort().map(function(b){return(0,d.jsx)("option",{children:b},"methodCategory-".concat(a,"-").concat(b))})]},"methodCategory-".concat(a))})})}function u(a){var b=a.id,c=a.data,g=(0,e.useState)(!0),h=g[0],k=g[1],l=(0,e.useState)(!1),o=l[0],p=l[1],q=(0,e.useRef)();(0,e.useEffect)(function(){o?t(b,null,null):(t(b,new n.P,""),k(!0))},[o]);var r=s(),t=r.updateNodeSimpleData,u=r.handleStyle;return(0,d.jsxs)("div",{style:{backgroundColor:"white",border:"1px solid black",borderRadius:5,padding:10},children:[(0,d.jsx)("div",{style:{fontWeight:"bold",textAlign:"center",marginBottom:10},children:"New SimpleData"}),(0,d.jsx)("button",{style:{display:"block",marginLeft:"auto",marginRight:"auto"},onClick:function(){return p(!o)},children:"Add data manually"}),o?(0,d.jsx)("div",{style:{display:"flex",flexDirection:"column",marginTop:10},children:(0,d.jsx)("textarea",{rows:"10",ref:q,style:{width:200},placeholder:"Paste a JSON array of objects",onChange:function(){try{t(b,new n.P({data:""===q.current.value?[]:JSON.parse(q.current.value)})),k(!0)}catch(a){t(b,null,a.message),k(!1)}}})}):null,c.errorMessage?(0,d.jsx)("div",{style:{maxWidth:200,color:"red",marginTop:10},children:c.errorMessage}):null,(0,d.jsx)(f.HH,{type:"source",position:m.P.Bottom,id:"a",style:(0,j.Z)((0,i.Z)({},u.source),{backgroundColor:h?"green":"#ff6666"})})]})}var v=c(7568),w=c(4051),x=c.n(w),y=c(2670),z=c(2882),A=c(4011),B=c(7906),C=c(3184),D=c(3816),E=c(7196),F=c(295),G={fontSize:"10px",padding:"5px"};function H(a){var b=a.keys,c=a.data;return(0,d.jsx)(z.Z,{component:A.Z,sx:{marginTop:"10px"},children:(0,d.jsxs)(B.Z,{size:"small",children:[(0,d.jsx)(C.Z,{children:(0,d.jsx)(D.Z,{children:b.map(function(a){return(0,d.jsx)(E.Z,{sx:(0,j.Z)((0,i.Z)({},G),{fontWeight:"bold"}),children:a},a)})})}),(0,d.jsx)(F.Z,{children:c.map(function(a,c){return(0,d.jsx)(D.Z,{children:b.map(function(b,e){return(0,d.jsx)(E.Z,{sx:(0,j.Z)((0,i.Z)({},G),{color:function(a){if("number"==typeof a)return"blue";if((0,y.Z)(a,Date))return"green";if("object"==typeof a)return"red";if("boolean"==typeof a)return"orange";if(void 0===a)return"red";else return"black"}(a[b])}),children:String(a[b])},"tc-"+c+"-"+e)})},"tb-"+c)})})]})})}function I(a){var b=a.id,c=a.method,e=a.generateArgId,f=a.updateNodeArgs,g=a.d,h=a.i,i=a.simpleData;return(0,d.jsx)("select",{id:e(b,h,c),onChange:function(){return f(b)},defaultValue:g.defaultValue,children:i?[void 0].concat((0,k.Z)(i.getKeys())).map(function(a,b){return(0,d.jsx)("option",{children:a},"".concat(c,"-option-").concat(b))}):null})}function J(a){var b=a.id,c=a.method,e=a.generateArgId,f=a.updateNodeArgs,g=a.d,h=a.i,i=a.simpleData;return(0,d.jsx)("div",{style:{display:"flex",flexWrap:"wrap"},children:i?i.getKeys().map(function(a,i){return(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",border:"1px solid grey",borderRadius:5,padding:"5px 5px",margin:3},children:[(0,d.jsx)("div",{children:a}),(0,d.jsx)("input",{type:"checkbox",className:e(b,h,c),onChange:function(){return f(b)},style:{marginBottom:0},defaultChecked:g.defaultValue,value:a})]},"".concat(b,"-").concat(c,"-arg").concat(h,"-multipleKeys").concat(i))}):null})}function K(a){var b=a.id,c=a.method,e=a.generateArgId,f=a.updateNodeArgs,g=a.d,h=a.i;return(0,d.jsx)("div",{style:{display:"flex",flexWrap:"wrap"},children:g.options.map(function(a,i){return(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",border:"1px solid grey",borderRadius:5,padding:"5px 5px",margin:3},children:[(0,d.jsx)("div",{children:a}),(0,d.jsx)("input",{type:"checkbox",className:e(b,h,c),onChange:function(){return f(b)},style:{marginBottom:0},defaultChecked:g.defaultValues[i],value:a})]},"".concat(b,"-").concat(c,"-arg").concat(h,"-multipleBoxes").concat(i))})})}function L(a){var b=a.id,c=a.method,f=a.generateArgId,g=a.updateNodeArgs,h=a.d,i=a.i,j=(0,e.useState)(h.defaultValue?h.defaultValue:""),k=j[0],l=j[1],m=(0,e.useState)(0),n=m[0],o=m[1];return(0,e.useEffect)(function(){o(k.split("\n").length)},[k]),(0,d.jsx)("textarea",{id:f(b,i,c),rows:n,value:k,style:{resize:"none",fontSize:"12px",width:"250px"},onChange:function(a){l(a.target.value),g(b)}})}function M(a){var b=a.id,c=a.data,g=(0,e.useState)(),h=g[0],k=g[1],l=(0,e.useState)(null),n=l[0],o=l[1],p=(0,e.useCallback)(function(){var a=c.simpleData.getLength(),b=a-(c.args.nbItemsInTable?c.args.nbItemsInTable:5);return"".concat(a," items in total").concat(b>0?" (".concat(b," hidden)"):"")},[c.simpleData,c.args]),q=s(),r=q.updateNodeSimpleData,t=q.updateNodeArgs,u=q.handleStyle,w=q.generateArgId,y=q.logs,z=q.methods;return(0,e.useEffect)(function(){a.apply(this,arguments);function a(){return(a=(0,v.Z)(x().mark(function a(){var d,e,f,g,h,i,j,l;return x().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(d=!1,0!==z[c.method].arguments.filter(function(a){return!1===a.optional}).length){a.next=5;break}d=!0,a.next=33;break;case 5:e=!0,f=!1,g=void 0,a.prev=6,h=z[c.method].arguments.filter(function(a){return!1===a.optional})[Symbol.iterator]();case 8:if(e=(i=h.next()).done){a.next=19;break}if(j=i.value,!c.args[j.name]){a.next=14;break}d=!0,a.next=16;break;case 14:return d=!1,a.abrupt("break",19);case 16:e=!0,a.next=8;break;case 19:a.next=25;break;case 21:a.prev=21,a.t0=a.catch(6),f=!0,g=a.t0;case 25:a.prev=25,a.prev=26,e||null==h.return||h.return();case 28:if(a.prev=28,!f){a.next=31;break}throw g;case 31:return a.finish(28);case 32:return a.finish(25);case 33:if(y&&console.log(c.method,c.sourceSimpleData,c.sourceSimpleDataB,c.method,c.args,c.errorMessage,d),!(c.sourceSimpleData&&d&&!c.errorMessage)){a.next=57;break}if(a.prev=35,!z[c.method].justClone){a.next=40;break}a.t1=c.sourceSimpleData.clone(),a.next=43;break;case 40:return a.next=42,c.sourceSimpleData.clone()[c.method](c.args);case 42:a.t1=a.sent;case 43:l=a.t1,y&&console.log("triggered",c.method),r(b,l,null),z[c.method].htmlOutput?o(c.sourceSimpleData.clone()[c.method](c.args)):o(null),k(!0),a.next=55;break;case 50:a.prev=50,a.t2=a.catch(35),r(b,c.simpleData,a.t2.message),o(null),k(!1);case 55:a.next=58;break;case 57:o(null),r(b,c.simpleData,c.errorMessage),k(!1);case 58:case"end":return a.stop()}},a,null,[[6,21,25,33],[26,,28,32],[35,50]])}))).apply(this,arguments)}},[c.method,c.sourceSimpleData,c.sourceSimpleDataB,c.args,c.errorMessage]),(0,d.jsxs)("div",{children:[z[c.method].doubleSource?(0,d.jsxs)("div",{children:[(0,d.jsx)(f.HH,{type:"target",position:m.P.Top,id:"a",style:(0,j.Z)((0,i.Z)({},u.target),{transform:"translateX(-30px)",backgroundColor:c.sourceSimpleData?"green":"#ff6666"})}),(0,d.jsx)(f.HH,{type:"target",position:m.P.Top,id:"b",style:(0,j.Z)((0,i.Z)({},u.target),{transform:"translateX(20px)",backgroundColor:c.sourceSimpleDataB?"green":"#ff6666"})})]}):(0,d.jsx)(f.HH,{type:"target",position:m.P.Top,id:"a",style:(0,j.Z)((0,i.Z)({},u.target),{backgroundColor:c.sourceSimpleData?"green":"#ff6666"})}),(0,d.jsxs)("div",{style:{backgroundColor:"white",border:"1px solid black",borderRadius:5,padding:10,maxWidth:z[c.method].maxWidth?z[c.method].maxWidth:300},children:[(0,d.jsx)("div",{style:{fontWeight:"bold",textAlign:"center",marginBottom:10},children:c.method}),(0,d.jsx)("div",{style:{marginTop:10},children:z[c.method].arguments.map(function(a,e){var f=!0;if(a.condition){var g=z[c.method].arguments.indexOf(z[c.method].arguments.find(function(b){return b.name===a.condition.name})),h=document.querySelector("#".concat(w(b,g,c.method)));f=h?h.value===a.condition.value:null}if("sourceB"===a.type||!f)return null;var i,j=(0,d.jsx)("div",{children:"".concat(a.name,":\xa0")});return"text"===a.type?(i=(0,d.jsx)("input",{id:w(b,e,c.method),onChange:function(){return t(b)},defaultValue:a.defaultValue,style:{width:a.width?a.width:void 0}}),a.jsOption&&(i=(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[i,(0,d.jsx)("div",{style:{marginLeft:4},children:"JS?"}),(0,d.jsx)("input",{id:"".concat(w(b,e,c.method),"-JS"),onChange:function(){return t(b)},type:"checkbox"})]}))):"number"===a.type?i=(0,d.jsx)("input",{id:w(b,e,c.method),onChange:function(){return t(b)},type:"number",defaultValue:a.defaultValue,style:{width:50}}):"checkbox"===a.type?i=(0,d.jsx)("input",{type:"checkbox",id:w(b,e,c.method),onChange:function(){return t(b)},style:{marginBottom:0},defaultChecked:a.defaultValue}):"keys"===a.type?i=(0,d.jsx)(I,{id:b,method:c.method,generateArgId:w,updateNodeArgs:t,d:a,i:e,simpleData:c.sourceSimpleData}):"multipleKeys"===a.type?i=(0,d.jsx)(J,{id:b,method:c.method,generateArgId:w,updateNodeArgs:t,d:a,i:e,simpleData:c.sourceSimpleData}):"multipleBoxes"===a.type?i=(0,d.jsx)(K,{id:b,method:c.method,generateArgId:w,updateNodeArgs:t,d:a,i:e}):"select"===a.type?i=(0,d.jsx)("select",{id:w(b,e,c.method),onChange:function(){return t(b)},defaultValue:a.defaultValue,children:a.options.map(function(a,b){return(0,d.jsx)("option",{children:a},"".concat(c.method,"-option-").concat(b))})}):"javascript"===a.type&&(i=(0,d.jsx)(L,{id:b,method:c.method,generateArgId:w,updateNodeArgs:t,d:a,i:e})),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",fontSize:12,marginTop:5},children:[j,i]},w(b,e,c.method))})}),"showTable"===c.method&&c.simpleData?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(H,{keys:c.simpleData.getKeys(),data:c.simpleData.getData().slice(0,c.args.nbItemsInTable?c.args.nbItemsInTable:5)}),(0,d.jsx)("div",{style:{textAlign:"right",marginTop:5,fontSize:12},children:p()})]}):null,(0,d.jsx)("div",{dangerouslySetInnerHTML:{__html:n}}),c.errorMessage?(0,d.jsx)("div",{style:{maxWidth:200,color:"red",marginTop:10},children:c.errorMessage}):null]}),(0,d.jsx)(f.HH,{style:(0,j.Z)((0,i.Z)({},u.source),{backgroundColor:h?"green":"#ff6666"}),position:m.P.Bottom,id:"a"})]})}var N=c(5923),O={i8:"0.3.0"};function P(){var a=s(),b=a.nodes,c=a.edges,i=a.onNodesChange,j=a.onEdgesChange,k=a.onConnect,l=(0,e.useMemo)(function(){return{newSimpleData:u,simpleDataMethod:M}},[u,M]);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{style:{position:"absolute",top:0,left:0,zIndex:10,width:"100vw"},children:[(0,d.jsxs)("div",{style:{padding:5,fontSize:12,backgroundColor:"white"},children:["Welcome on ",(0,d.jsx)("a",{href:"https://github.com/nshiab/simple-data-analysis-flow",children:"Simple Data Analysis Flow"}),"! The aim of this project is to allow non-coders to use the open source library ",(0,d.jsx)("a",{href:"https://github.com/nshiab/simple-data-analysis.js",children:"simple-data-analysis.js"})," with a node-based editor running in the browser. If you use this project, show off your work and tag me on ",(0,d.jsx)("a",{href:"https://twitter.com/NaelShiab",children:"Twitter"})," or ",(0,d.jsx)("a",{href:"https://www.linkedin.com/in/naelshiab/",children:"LinkedIn"}),"! Feel to start a conversation, raise an issue or contribute to the ",(0,d.jsx)("a",{href:"https://github.com/nshiab/simple-data-analysis-flow",children:"code on Github"}),". / Version ",O.i8," with simple-data-analysis@",N.i8]}),(0,d.jsx)(t,{})]}),(0,d.jsx)("div",{style:{position:"relative"},children:(0,d.jsx)("div",{style:{width:"100vw",height:"100vh"},children:(0,d.jsxs)(f.ZP,{nodeTypes:l,nodes:b,edges:c,onNodesChange:i,onEdgesChange:j,onConnect:k,fitView:!0,children:[(0,d.jsx)(g.Z,{}),(0,d.jsx)(h.Z,{})]})})})]})}}},function(a){a.O(0,[770,95,774,888,179],function(){var b;return a(a.s=8312)}),_N_E=a.O()}])