(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(1742)}])},1742:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return ad}});var d=c(5893),e=c(7294),f=c(9647),g=c(5362),h=c(4622),i=c(1799),j=c(9396),k=c(797),l=c(6902),m=c(5892),n={newSimpleData:{category:"Importing",arguments:[]},dropFile:{category:"Importing",arguments:[{name:"autoType",type:"checkbox"},{name:"firstItem",type:"number"},{name:"lastItem",type:"number"},{name:"fillMissingKeys",type:"checkbox"}]},loadDataFromUrl:{category:"Importing",arguments:[{name:"url",type:"text",optional:!1},{name:"autoType",type:"checkbox"},{name:"firstItem",type:"number"},{name:"lastItem",type:"number"},{name:"fillMissingKeys",type:"checkbox"}]},formatAllKeys:{category:"Cleaning",arguments:[]},renameKey:{category:"Cleaning",arguments:[{name:"oldKey",type:"keys",optional:!1},{name:"newKey",type:"text",optional:!1}]},checkValues:{category:"Cleaning",arguments:[{name:"nbItemsToCheck",type:"number"},{name:"randomize",type:"checkbox"}]},excludeMissingValues:{category:"Cleaning",arguments:[{name:"key",type:"keys"}]},keepMissingValues:{category:"Cleaning",arguments:[{name:"key",type:"keys"}]},removeDuplicates:{category:"Cleaning",arguments:[{name:"key",type:"keys"},{name:"nbToKeep",type:"number"}]},keepDuplicates:{category:"Cleaning",arguments:[{name:"key",type:"keys"}]},valuesToString:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},]},valuesToInteger:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"thousandSeparator",type:"text",width:10},{name:"decimalSeparator",type:"text",width:10},{name:"skipErrors",type:"checkbox"}]},valuesToFloat:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"thousandSeparator",type:"text",width:10},{name:"decimalSeparator",type:"text",width:10},{name:"skipErrors",type:"checkbox"}]},valuesToDate:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"format",type:"text",optional:!1},{name:"skipErrors",type:"checkbox"}]},datesToString:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"format",type:"text",optional:!1},{name:"skipErrors",type:"checkbox"}]},replaceValues:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"oldValue",type:"text",optional:!1,jsOption:!0},{name:"newValue",type:"text",optional:!1,jsOption:!0},{name:"method",type:"select",options:[void 0,"entireString","partialString"]},{name:"skipErrors",type:"checkbox"}]},roundValues:{category:"Cleaning",arguments:[{name:"key",type:"keys",optional:!1},{name:"nbDigits",type:"number"},{name:"skipErrors",type:"checkbox"}]},modifyValues:{category:"Cleaning",maxWidth:400,arguments:[{name:"key",type:"keys",optional:!1},{name:"valueGenerator",type:"javascript",optional:!1,defaultValue:"(value) => {\n    \n    const modifiedValue = value\n    \n    return modifiedValue\n}"}]},modifyItems:{category:"Cleaning",maxWidth:400,arguments:[{name:"key",type:"keys",optional:!1},{name:"itemGenerator",type:"javascript",optional:!1,defaultValue:'(item) => {\n    \n    const modifiedValue = "Change me!"\n    \n    return modifiedValue\n}'}]},addKey:{category:"Restructuring",maxWidth:400,arguments:[{name:"key",type:"text",optional:!1},{name:"itemGenerator",type:"javascript",optional:!1,defaultValue:'(item) => {\n    const newValue = "Change me!"\n\n    return newValue\n}'}]},removeKey:{category:"Restructuring",arguments:[{name:"key",type:"keys",optional:!1},]},addItems:{category:"Restructuring",doubleSource:!0,arguments:[{name:"dataToBeAdded",type:"sourceB",optional:!1},{name:"fillMissingKeys",type:"checkbox"}]},mergeItems:{category:"Restructuring",doubleSource:!0,arguments:[{name:"dataToBeMerged",type:"sourceB",optional:!1},{name:"commonKey",type:"keys",optional:!1}]},keysToValues:{category:"Restructuring",arguments:[{name:"keys",type:"multipleKeys",optional:!1},{name:"newKeyForKeys",type:"text",optional:!1},{name:"newKeyForValues",type:"text",optional:!1}]},valuesToKeys:{category:"Restructuring",arguments:[{name:"newKeys",type:"keys",optional:!1},{name:"newValues",type:"keys",optional:!1}]},selectKeys:{category:"Selecting",arguments:[{name:"keys",type:"multipleKeys",optional:!1}]},filterValues:{category:"Selecting",maxWidth:400,arguments:[{name:"key",type:"keys",optional:!1},{name:"valueComparator",type:"javascript",defaultValue:"(value) => value > 10",optional:!1}]},filterItems:{category:"Selecting",maxWidth:400,arguments:[{name:"itemComparator",type:"javascript",defaultValue:"(item) => item.someNumber > 10",optional:!1}]},describe:{category:"Analyzing",arguments:[]},sortValues:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1},{name:"order",type:"select",options:["ascending","descending"],optional:!1}]},addProportions:{category:"Analyzing",arguments:[{name:"method",type:"select",options:[void 0,"data","item"],optional:!1},{name:"key",type:"keys",condition:{name:"method",value:"data"}},{name:"newKey",type:"text",condition:{name:"method",value:"data"}},{name:"keyCategory",type:"multipleKeys",condition:{name:"method",value:"data"}},{name:"keys",type:"multipleKeys",condition:{name:"method",value:"item"}},{name:"suffix",type:"text",condition:{name:"method",value:"item"}},{name:"nbDigits",type:"number"}]},addVariation:{category:"Analyzing",maxWidth:400,arguments:[{name:"key",type:"keys",optional:!1},{name:"newKey",type:"text",optional:!1},{name:"valueGenerator",type:"javascript",optional:!1,defaultValue:"(a, b) => a - b"},{name:"order",type:"select",options:[void 0,"ascending","descending"]},{name:"firstValue",type:"text",jsOption:!0}]},addQuantiles:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1},{name:"newKey",type:"text",optional:!1},{name:"nbQuantiles",type:"number",optional:!1}]},addBins:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1},{name:"newKey",type:"text",optional:!1},{name:"nbBins",type:"number",optional:!1}]},addOutliers:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1},{name:"newKey",type:"text",optional:!1}]},excludeOutliers:{category:"Analyzing",arguments:[{name:"key",type:"keys",optional:!1}]},correlation:{category:"Analyzing",arguments:[{name:"key1",type:"keys"},{name:"key2",type:"multipleKeys"}]},summarize:{category:"Analyzing",arguments:[{name:"keyValue",type:"keys"},{name:"keyCategory",type:"multipleKeys"},{name:"summary",type:"multipleBoxes",options:["count","min","max","sum","mean","median","deviation"]},{name:"nbDigits",type:"number"}]},getChart:{category:"Visualizing",justClone:!0,htmlOutput:!0,maxWidth:600,arguments:[{name:"x",type:"keys",optional:!1},{name:"y",type:"keys",optional:!1},{name:"type",type:"select",options:[void 0,"dot","line","bar","barVertical","barHorizontal","box","boxVertical","boxHorizontal"],optional:!1},{name:"color",type:"keys"},{name:"marginLeft",type:"number"},{name:"marginBottom",type:"number"},{name:"width",type:"number"},{name:"height",type:"number"},{name:"trend",type:"checkbox"},{name:"showTrendEquation",type:"checkbox"},{name:"title",type:"text"}]},showTable:{category:"Visualizing",justClone:!0,maxWidth:5e3,arguments:[{name:"nbItemsInTable",type:"number"}]},getKeys:{category:"Others",arguments:[]},getData:{category:"Others",arguments:[]},getLength:{category:"Others",arguments:[]},getDataAsArrays:{category:"Others",arguments:[]},getArray:{category:"Others",arguments:[{name:"key",type:"keys",optional:!1}]},getUniqueValues:{category:"Others",arguments:[{name:"key",type:"keys",optional:!1}]},getItem:{category:"Others",maxWidth:400,arguments:[{name:"conditions",type:"javascript",optional:!1,defaultValue:'{someKey: "someValue"}'}]},getMin:{category:"Others",arguments:[{name:"key",type:"keys",optional:!1}]},getMax:{category:"Others",arguments:[{name:"key",type:"keys",optional:!1}]},getMean:{category:"Others",arguments:[{name:"key",type:"keys",optional:!1}]},getMedian:{category:"Others",arguments:[{name:"key",type:"keys",optional:!1}]},getSum:{category:"Others",arguments:[{name:"key",type:"keys",optional:!1}]}},o=c(8322),p=(0,l.ZP)(function(a,b){return{logs:!1,startNodeId:0,setStartNodeId:function(b){a({startNodeId:b})},nodes:null,edges:null,setNodes:function(b){a({nodes:b})},setEdges:function(b){a({edges:b})},methods:n,getNodeId:function(){b().logs&&console.log("getNodeId");var c=++b().startNodeId;return a({nodeId:c}),c},generateArgId:function(a,b,c){return"node".concat(a,"method").concat(c,"Arg").concat(b)},handleStyle:{source:{height:10,width:10,bottom:-5},target:{height:10,width:10,bottom:-5,borderRadius:"0"}},onNodesChange:function(c){b().logs&&console.log("onNodesChange");var d=c.filter(function(a){return"remove"===a.type}).map(function(a){return a.id}),e=!0,f=!1,g=void 0;try{for(var h,i=d[Symbol.iterator]();!(e=(h=i.next()).done);e=!0){var j=h.value;b().updateNodeSimpleData(j,null,null)}}catch(k){f=!0,g=k}finally{try{e||null==i.return||i.return()}finally{if(f)throw g}}a({nodes:(0,m.y)(c,b().nodes)})},onEdgesChange:function(c){if(b().logs&&console.log("onEdgesChange"),a({edges:(0,m.z)(c,b().edges)}),1===c.length&&"remove"===c[0].type){var d=c[0].id.split("-"),e=d[2].replace("a","").replace("b",""),f=d[2][d[2].length-1];a({nodes:b().nodes.map(function(a){return a.id===e&&("a"===f?a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleData:null}):"b"===f&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleDataB:null}))),a})}),b().updateNodeArgs(e)}},onConnect:function(c){b().logs&&console.log("onConnect");var d,e=b().nodes,f=null===(d=e.find(function(a){return a.id===c.source}))|| void 0===d?void 0:d.data.simpleData,g=(0,m.c)(c,[])[0];g.style={strokeWidth:5};var h=b().edges,l=h.filter(function(a){return!((a.source!==g.source||a.target!==g.target)&&(a.target!==g.target||a.targetHandle!==g.targetHandle))}),n=l.map(function(a){return a.id}),o=(0,k.Z)(h.filter(function(a){return!n.includes(a.id)})).concat([g]),p=l.map(function(a){return a.target});a({edges:o,nodes:e.map(function(a){if(p.indexOf(a.id)> -1){var b=l.filter(function(b){return a.id===b.target}),d=!0,e=!1,g=void 0;try{for(var h,k=b[Symbol.iterator]();!(d=(h=k.next()).done);d=!0){var m=h.value;"a"===m.targetHandle?a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleData:null}):"b"===m.targetHandle&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleDataB:null}))}}catch(n){e=!0,g=n}finally{try{d||null==k.return||k.return()}finally{if(e)throw g}}}return a.id===c.target&&("a"===c.targetHandle?a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleData:f?f.clone():null}):"b"===c.targetHandle&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleDataB:f?f.clone():null}))),a})}),b().updateNodeArgs(c.target)},addCustomNode:function(c,d,e){b().logs&&console.log("addCustomNode");var f=c.target.value;c.target.value=e;var g=b().nodes,h=g[g.length-1];m="newSimpleData"===f?{id:d,type:"newSimpleData",category:"Importing",data:{method:f,simpleData:new o.P,args:{}},position:{x:h?h.position.x:0,y:h?h.position.y+h.height+20:0}}:"dropFile"===f?{id:d,type:"dropFile",category:"Importing",data:{method:f,simpleData:null,args:{}},position:{x:h?h.position.x:0,y:h?h.position.y+h.height+20:0}}:"loadDataFromUrl"===f?{id:d,type:"loadDataFromUrl",category:"Importing",data:{method:f,simpleData:null,args:{}},position:{x:h?h.position.x:0,y:h?h.position.y+h.height+20:0}}:{id:d,type:"simpleDataMethod",data:{method:f,sourceSimpleData:null,sourceSimpleDataB:null,simpleData:null,args:{}},position:{x:h?h.position.x:0,y:h?h.position.y+h.height+20:0}};var i=!0,j=!1,l=void 0;try{for(var m,p,q=n[f].arguments[Symbol.iterator]();!(i=(p=q.next()).done);i=!0){var r=p.value;m.data.args[r.name]=""}}catch(s){j=!0,l=s}finally{try{i||null==q.return||q.return()}finally{if(j)throw l}}a({nodes:(0,k.Z)(g).concat([m])})},testNodeArgs:function(a){var c=b().methods,d=!1;if(0===c[a.method].arguments.filter(function(a){return!1===a.optional}).length)d=!0;else{var e=!0,f=!1,g=void 0;try{for(var h,i=c[a.method].arguments.filter(function(a){return!1===a.optional})[Symbol.iterator]();!(e=(h=i.next()).done);e=!0){var j=h.value;if(a.args[j.name])d=!0;else{d=!1;break}}}catch(k){f=!0,g=k}finally{try{e||null==i.return||i.return()}finally{if(f)throw g}}}return d},updateNodeArgs:function(c){b().logs&&console.log("updateNodeArgs");for(var d=b().nodes,e=d.find(function(a){return a.id===c}).data,f=e.method,g=e.sourceSimpleDataB,h={},k=null,l=b().methods,m=0;m<l[f].arguments.length;m++)if(["text","number","keys","select"].includes(l[f].arguments[m].type)){var n=document.querySelector("#".concat(b().generateArgId(c,m,f)));if(n){var o=n.value;l[f].arguments[m].jsOption&&document.querySelector("#".concat(b().generateArgId(c,m,f),"JS")).checked&&(h["".concat(b().generateArgId(c,m,f),"JS")]=!0,o=Function("return ".concat(o))()),"number"===l[f].arguments[m].type&&(o=parseInt(o),o=isNaN(o)?void 0:o),o=""===o?void 0:o,h[l[f].arguments[m].name]=o}}else if("javascript"===l[f].arguments[m].type){var p=document.querySelector("#".concat(b().generateArgId(c,m,f))).value;try{p=Function("return ".concat(p))(),h[l[f].arguments[m].name]=p}catch(q){k=q.message}}else if("checkbox"===l[f].arguments[m].type)h[l[f].arguments[m].name]=document.querySelector("#".concat(b().generateArgId(c,m,f))).checked;else if(["multipleKeys","multipleBoxes"].includes(l[f].arguments[m].type)){if(document.querySelectorAll(".".concat(b().generateArgId(c,m,f))).length>0){var r=Array.from(document.querySelectorAll(".".concat(b().generateArgId(c,m,f)))).filter(function(a){return a.checked}).map(function(a){return a.value});h[l[f].arguments[m].name]=r.length>0?r:void 0}}else"sourceB"===l[f].arguments[m].type&&(h[l[f].arguments[m].name]=g);var s=d.map(function(a){return a.id===c&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{args:h,errorMessage:k})),a});a({nodes:s})},updateNodeSimpleData:function(c,d,e,f){b().logs&&console.log("updateNodeSimpleData");var g=b().nodes.map(function(a){return a.id===c&&(a.data=(0,i.Z)((0,j.Z)((0,i.Z)({},a.data),{simpleData:d,errorMessage:e}),f)),a}),h=b().edges.filter(function(a){return a.source===c}),k=h.map(function(a){return a.target}),l=h.map(function(a){return a.targetHandle});g.map(function(a){var b=k.indexOf(a.id);return b> -1&&("a"===l[b]?a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleData:d}):"b"===l[b]&&(a.data=(0,j.Z)((0,i.Z)({},a.data),{sourceSimpleDataB:d}))),a}),a({nodes:g});var m=!0,n=!1,o=void 0;try{for(var p,q=k[Symbol.iterator]();!(m=(p=q.next()).done);m=!0){var r=p.value;b().updateNodeArgs(r)}}catch(s){n=!0,o=s}finally{try{m||null==q.return||q.return()}finally{if(n)throw o}}},remainingItemsShowTable:function(a){var b=a.simpleData.getLength(),c=b-(a.args.nbItemsInTable?a.args.nbItemsInTable:5);return"".concat(b," items in total").concat(c>0?" (".concat(c," hidden)"):"")}}}),q=p;function r(){var a=q(),b=a.addCustomNode,c=a.getNodeId,f=a.methods,g=(0,e.useMemo)(function(){var a={},b=!0,c=!1,d=void 0;try{for(var e,g=Object.keys(f)[Symbol.iterator]();!(b=(e=g.next()).done);b=!0){var h=e.value;0>Object.keys(a).indexOf(f[h].category)&&(a[f[h].category]=[])}}catch(i){c=!0,d=i}finally{try{b||null==g.return||g.return()}finally{if(c)throw d}}var j=!0,k=!1,l=void 0;try{for(var m,n=Object.keys(f)[Symbol.iterator]();!(j=(m=n.next()).done);j=!0){var o=m.value;a[f[o].category].push(o)}}catch(p){k=!0,l=p}finally{try{j||null==n.return||n.return()}finally{if(k)throw l}}return a},[f]);return(0,d.jsx)("div",{children:(0,d.jsx)("div",{style:{paddingBottom:5,paddingLeft:5,display:"flex",flexWrap:"wrap",backgroundColor:"white"},children:Object.keys(g).map(function(a){return(0,d.jsxs)("select",{onChange:function(d){return b(d,"".concat(c()),a)},children:[(0,d.jsx)("option",{children:a}),g[a].sort().map(function(b){return(0,d.jsx)("option",{children:b},"methodCategory-".concat(a,"-").concat(b))})]},"methodCategory-".concat(a))})})})}function s(a){var b=a.id,c=a.data,g=(0,e.useState)(!0),h=g[0],k=g[1],l=(0,e.useRef)();(0,e.useEffect)(function(){if(!c.errorMessage)try{p(b,new o.P({data:c.manualData}),null,{}),k(!0)}catch(a){p(b,null,a.message)}},[c.manualData,c.errorMessage,b,p]);var n=q(),p=n.updateNodeSimpleData,r=n.handleStyle;return(0,d.jsxs)("div",{style:{backgroundColor:"white",border:"1px solid black",borderRadius:5,padding:10},children:[(0,d.jsx)("div",{style:{fontWeight:"bold",textAlign:"center",marginBottom:10},children:"New SimpleData"}),(0,d.jsx)("button",{style:{display:"block",marginLeft:"auto",marginRight:"auto"},onClick:function(){return p(b,c.simpleData,c.errorMessage,{openManualData:!c.openManualData||!c.openManualData})},children:"Add data manually"}),c.openManualData?(0,d.jsx)("div",{style:{display:"flex",flexDirection:"column",marginTop:10},children:(0,d.jsx)("textarea",{rows:"10",ref:l,style:{width:200},placeholder:"Paste a JSON array of objects",onChange:function(){try{var a=l.current.value;p(b,null,null,{manualData:""===a?[]:JSON.parse(a),manualDataString:a})}catch(c){p(b,null,c.message,{}),k(!1)}},defaultValue:c.manualDataString})}):null,c.errorMessage?(0,d.jsx)("div",{style:{maxWidth:200,color:"red",marginTop:10},children:c.errorMessage}):null,(0,d.jsx)(f.HH,{type:"source",position:m.P.Bottom,id:"a",style:(0,j.Z)((0,i.Z)({},r.source),{backgroundColor:h?"green":"#ff6666"})})]})}var t=c(2670),u=c(2882),v=c(4011),w=c(7906),x=c(3184),y=c(3816),z=c(3252),A=c(295),B={fontSize:"10px",padding:"5px"};function C(a){var b=a.keys,c=a.data;return(0,d.jsx)(u.Z,{component:v.Z,sx:{marginTop:"10px"},children:(0,d.jsxs)(w.Z,{size:"small",children:[(0,d.jsx)(x.Z,{children:(0,d.jsx)(y.Z,{children:b.map(function(a){return(0,d.jsx)(z.Z,{sx:(0,j.Z)((0,i.Z)({},B),{fontWeight:"bold"}),children:a},a)})})}),(0,d.jsx)(A.Z,{children:c.map(function(a,c){return(0,d.jsx)(y.Z,{children:b.map(function(b,e){return(0,d.jsx)(z.Z,{sx:(0,j.Z)((0,i.Z)({},B),{color:function(a){if("number"==typeof a)return"blue";if((0,t.Z)(a,Date))return"green";if("object"==typeof a)return"red";if("boolean"==typeof a)return"orange";if(void 0===a)return"red";else return"black"}(a[b])}),children:String(a[b])},"tc-"+c+"-"+e)})},"tb-"+c)})})]})})}var D=c(3441),E=c(6348);function F(a){var b=a.data,c=(0,e.useState)(!1),f=c[0],g=c[1],h=(0,e.useState)(".csv"),i=h[0],j=h[1],k=(0,e.useState)("data"),l=k[0],m=k[1],n=(0,e.useCallback)(function(){".json"==i?a=JSON.stringify(b.simpleData.getData()):".csv"===i&&(a=(0,E.Sf)(b.simpleData.getData()));var a,c=document.createElement("a"),d=new Blob([a],{type:"text/plain"});c.href=URL.createObjectURL(d),c.download="".concat(l).concat(i),c.click()},[b.simpleData,i,l]);return(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",borderLeft:"1px solid grey",marginLeft:8,paddingLeft:5},children:[f?null:(0,d.jsx)("div",{style:{cursor:"pointer",display:"flex",alignItems:"center"},onClick:function(){g(!0)},children:(0,d.jsx)(D.Z,{sx:{height:18,width:18,fill:"grey"}})}),f?(0,d.jsxs)("div",{style:{fontSize:12,marginLeft:4,marginRight:4},children:[(0,d.jsx)("input",{type:"text",defaultValue:"data",style:{textAlign:"right",maxWidth:100},onChange:function(a){return m(a.target.value)}}),(0,d.jsxs)("select",{defaultValue:".csv",onChange:function(a){return j(a.target.value)},children:[(0,d.jsx)("option",{value:".csv",children:".csv"}),(0,d.jsx)("option",{value:".json",children:".json"})]})]}):null,f?(0,d.jsx)("div",{style:{cursor:"pointer",display:"flex",alignItems:"center"},onClick:function(){n()},children:(0,d.jsx)(D.Z,{sx:{height:18,width:18,fill:"grey"}})}):null]})}function G(a){var b=a.id,c=a.i,f=a.method,g=a.d,h=a.args,i=a.sourceSimpleData,j=(0,e.useState)(null),l=j[0],m=j[1],n=q(),o=n.generateArgId,p=n.updateNodeArgs;return(0,e.useEffect)(function(){var a=o(b,c,f),e=(0,d.jsx)("select",{id:a,onChange:function(){return p(b)},value:h[g.name],children:i?[void 0].concat((0,k.Z)(i.getKeys())).map(function(a,c){return(0,d.jsx)("option",{children:a},"".concat(b,"-").concat(f,"-option-").concat(c))}):null});m(e)},[b,c,f,g,h,i]),l}function H(a){var b=a.id,c=a.method,f=a.d,g=a.i,h=a.sourceSimpleData,i=a.args,j=(0,e.useState)(null),k=j[0],l=j[1],m=q(),n=m.generateArgId,o=m.updateNodeArgs;return(0,e.useEffect)(function(){var a=n(b,g,c),e=(0,d.jsx)("div",{style:{display:"flex",flexWrap:"wrap"},children:h?h.getKeys().map(function(e,h){return(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",border:"1px solid grey",borderRadius:5,padding:"5px 5px",margin:3},children:[(0,d.jsx)("div",{children:e}),(0,d.jsx)("input",{type:"checkbox",className:a,onChange:function(){return o(b)},style:{marginBottom:0},value:e,checked:!!i[f.name]&&i[f.name].includes(e)})]},"".concat(b,"-").concat(c,"-arg").concat(g,"-multipleKeys").concat(h))}):null});l(e)},[b,c,f,g,h,i]),k}function I(a){var b=a.id,c=a.method,f=a.d,g=a.i,h=a.args,i=(0,e.useState)(null),j=i[0],k=i[1],l=q(),m=l.generateArgId,n=l.updateNodeArgs;return(0,e.useEffect)(function(){var a=m(b,g,c),e=(0,d.jsx)("div",{style:{display:"flex",flexWrap:"wrap"},children:f.options.map(function(e,i){return(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",border:"1px solid grey",borderRadius:5,padding:"5px 5px",margin:3},children:[(0,d.jsx)("div",{children:e}),(0,d.jsx)("input",{type:"checkbox",className:a,onChange:function(){return n(b)},style:{marginBottom:0},value:e,checked:!!h[f.name]&&h[f.name].includes(e)})]},"".concat(b,"-").concat(c,"-arg").concat(g,"-multipleBoxes").concat(i))})});k(e)},[b,c,f,g,h]),j}function J(a){var b=a.id,c=a.method,f=a.generateArgId,g=a.updateNodeArgs,h=a.d,i=a.i,j=(0,e.useState)(h.defaultValue?h.defaultValue:""),k=j[0],l=j[1],m=(0,e.useState)(0),n=m[0],o=m[1];return(0,e.useEffect)(function(){o(k.split("\n").length+1)},[k]),(0,d.jsx)("textarea",{id:f(b,i,c),rows:n,value:k,style:{resize:"none",fontSize:"12px",width:"250px"},onChange:function(a){l(a.target.value),g(b)}})}function K(a){var b=a.id,c=a.i,f=a.method,g=a.d,h=a.args,i=(0,e.useState)(null),j=i[0],k=i[1],l=q(),m=l.generateArgId,n=l.updateNodeArgs;return(0,e.useEffect)(function(){var a=m(b,c,f),e=(0,d.jsx)("input",{id:a,onChange:function(){return n(b)},style:{width:g.width?g.width:void 0},value:void 0===h[g.name]?"":h[g.name]});g.jsOption&&(e=(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[e,(0,d.jsx)("div",{style:{marginLeft:4},children:"JS?"}),(0,d.jsx)("input",{id:"".concat(a,"JS"),onChange:function(){return n(b)},type:"checkbox",checked:void 0!==h["".concat(a,"JS")]&&h["".concat(a,"JS")]})]})),k(e)},[b,c,f,g,h]),j}function L(a){var b=a.id,c=a.i,f=a.method,g=a.d,h=a.args,i=(0,e.useState)(null),j=i[0],k=i[1],l=q(),m=l.generateArgId,n=l.updateNodeArgs;return(0,e.useEffect)(function(){var a=m(b,c,f),e=(0,d.jsx)("input",{id:a,onChange:function(){return n(b)},type:"number",style:{width:50},value:void 0===h[g.name]?"":h[g.name]});k(e)},[b,c,f,g,h]),j}function M(a){var b=a.id,c=a.i,f=a.method,g=a.d,h=a.args,i=(0,e.useState)(null),j=i[0],k=i[1],l=q(),m=l.generateArgId,n=l.updateNodeArgs;return(0,e.useEffect)(function(){var a=m(b,c,f),e=(0,d.jsx)("input",{type:"checkbox",id:a,onChange:function(){return n(b)},style:{marginBottom:0},checked:h[g.name]});k(e)},[b,c,f,g,h]),j}function N(a){var b=a.id,c=a.i,f=a.method,g=a.d,h=a.args,i=(0,e.useState)(null),j=i[0],k=i[1],l=q(),m=l.generateArgId,n=l.updateNodeArgs;return(0,e.useEffect)(function(){var a=m(b,c,f),e=(0,d.jsx)("select",{id:a,onChange:function(){return n(b)},value:h[g.name],children:g.options.map(function(a,c){return(0,d.jsx)("option",{children:a},"".concat(b,"-").concat(f,"-option-").concat(c))})});k(e)},[b,c,f,g,h]),j}function O(a){var b=a.id,c=a.data,e=q(),f=e.methods,g=e.generateArgId,h=e.updateNodeArgs;return(0,d.jsx)("div",{style:{marginTop:f[c.method].arguments.length>0?10:0,display:"flex",flexWrap:"wrap",width:"100%"},children:f[c.method].arguments.map(function(a,e){var i=!0;if(a.condition){var j=f[c.method].arguments.indexOf(f[c.method].arguments.find(function(b){return b.name===a.condition.name})),k=document.querySelector("#".concat(g(b,j,c.method)));i=k?k.value===a.condition.value:null}if("sourceB"===a.type||!i)return null;var l,m=(0,d.jsx)("div",{children:"".concat(a.name,":\xa0")});return"text"===a.type?l=(0,d.jsx)(K,{id:b,i:e,method:c.method,d:a,args:c.args}):"number"===a.type?l=(0,d.jsx)(L,{id:b,i:e,method:c.method,d:a,args:c.args}):"checkbox"===a.type?l=(0,d.jsx)(M,{id:b,i:e,method:c.method,d:a,args:c.args}):"keys"===a.type?l=(0,d.jsx)(G,{id:b,method:c.method,generateArgId:g,updateNodeArgs:h,d:a,i:e,sourceSimpleData:c.sourceSimpleData,args:c.args}):"multipleKeys"===a.type?l=(0,d.jsx)(H,{id:b,method:c.method,generateArgId:g,updateNodeArgs:h,d:a,i:e,sourceSimpleData:c.sourceSimpleData,args:c.args}):"multipleBoxes"===a.type?l=(0,d.jsx)(I,{id:b,method:c.method,generateArgId:g,updateNodeArgs:h,d:a,i:e,args:c.args}):"select"===a.type?l=(0,d.jsx)(N,{id:b,i:e,method:c.method,d:a,args:c.args}):"javascript"===a.type&&(l=(0,d.jsx)(J,{id:b,method:c.method,generateArgId:g,updateNodeArgs:h,d:a,i:e})),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",fontSize:12,borderRight:"1px solid gray",padding:"0 10px",margin:"5px 0"},children:[m,l]},g(b,e,c.method))})})}function P(a){var b=a.id,c=a.data,g=(0,e.useState)(),h=g[0],k=g[1],l=(0,e.useState)(null),n=l[0],o=l[1],p=(0,e.useState)(300),r=p[0],s=p[1],t=q(),u=t.updateNodeSimpleData,v=t.testNodeArgs,w=t.handleStyle,x=t.logs,y=t.methods,z=t.remainingItemsShowTable;return(0,e.useEffect)(function(){var a=v(c);if(x&&console.log(c.method,c.sourceSimpleData,c.sourceSimpleDataB,c.method,c.args,c.errorMessage,a),c.sourceSimpleData&&a&&!c.errorMessage){if("Others"!==y[c.method].category)try{var d=y[c.method].justClone?c.sourceSimpleData.clone():c.sourceSimpleData.clone()[c.method](c.args);x&&console.log("triggered",c.method),u(b,d,null),y[c.method].htmlOutput?o(c.sourceSimpleData.clone()[c.method](c.args)):o(null),k(!0)}catch(e){u(b,c.simpleData,e.message),o(null),k(!1)}else try{var f=c.sourceSimpleData[c.method](c.args),g=JSON.stringify(f,null,1);u(b,null,null),o(g)}catch(h){u(b,null,h.message)}}else o(null),u(b,c.simpleData,c.errorMessage),k(!1)},[c.method,c.sourceSimpleData,c.sourceSimpleDataB,c.args,c.errorMessage,u,x,y,v,b]),(0,d.jsxs)("div",{children:[y[c.method].doubleSource?(0,d.jsxs)("div",{children:[(0,d.jsx)(f.HH,{type:"target",position:m.P.Top,id:"a",style:(0,j.Z)((0,i.Z)({},w.target),{transform:"translateX(-30px)",backgroundColor:c.sourceSimpleData?"green":"#ff6666"})}),(0,d.jsx)(f.HH,{type:"target",position:m.P.Top,id:"b",style:(0,j.Z)((0,i.Z)({},w.target),{transform:"translateX(20px)",backgroundColor:c.sourceSimpleDataB?"green":"#ff6666"})})]}):(0,d.jsx)(f.HH,{type:"target",position:m.P.Top,id:"a",style:(0,j.Z)((0,i.Z)({},w.target),{backgroundColor:c.sourceSimpleData?"green":"#ff6666"})}),(0,d.jsxs)("div",{style:{backgroundColor:"white",border:"1px solid black",borderRadius:5,padding:10,maxWidth:y[c.method].maxWidth?y[c.method].maxWidth:300},children:[(0,d.jsx)("div",{style:{fontWeight:"bold",textAlign:"center"},children:c.method}),(0,d.jsx)(O,{id:b,data:c}),"Others"===y[c.method].category&&n&&n.length>300?(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",fontSize:12,borderRight:"1px solid gray",padding:"0 10px",margin:"5px 0"},children:[(0,d.jsx)("div",{children:"Shown characters:\xa0"}),(0,d.jsx)("input",{type:"number",style:{width:50},onChange:function(a){return s(a.target.value)},defaultValue:300})]}):null,"showTable"===c.method&&c.simpleData?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(C,{keys:c.simpleData.getKeys(),data:c.simpleData.getData().slice(0,c.args.nbItemsInTable?c.args.nbItemsInTable:5)}),(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:5},children:[(0,d.jsx)("div",{style:{fontSize:12},children:z(c)}),(0,d.jsx)(F,{data:c})]})]}):null,n?(0,d.jsx)("div",{style:{marginTop:15},dangerouslySetInnerHTML:{__html:"Others"===y[c.method].category?"".concat(n.length>r?n.slice(0,r).trim()+"...":n):n}}):null,c.errorMessage?(0,d.jsx)("div",{style:{width:"100%",color:"red",marginTop:10},children:c.errorMessage}):null]}),"Others"!==y[c.method].category?(0,d.jsx)(f.HH,{style:(0,j.Z)((0,i.Z)({},w.source),{backgroundColor:h?"green":"#ff6666"}),position:m.P.Bottom,id:"a"}):null]})}var Q=c(7568),R=c(4051),S=c.n(R),T=c(6531);function U(a){var b,c=a.id,g=a.data,h=q(),k=h.updateNodeSimpleData,l=h.handleStyle,n=h.testNodeArgs,p=(0,e.useState)(!1),r=p[0],s=p[1],t=(0,e.useCallback)(function(a){return new Promise(function(b,c){var d=new FileReader;d.onload=function(){b(d.result)},d.onerror=c,d.readAsText(a)})},[]);return(0,e.useEffect)(function(){try{var a=n(g);if(g.file&&g.file.content&&a){"text/csv"===g.file.type?b=g.args.autoType?(0,E.ue)(g.file.content,T.Z):(0,E.ue)(g.file.content):"application/json"===g.file.type&&(b=JSON.parse(g.file.content)),g.args.firstItem=""===g.args.firstItem?void 0:g.args.firstItem,g.args.lastItem=""===g.args.lastItem?void 0:g.args.lastItem;var b,d=new o.P((0,i.Z)({data:b},g.args));k(c,d,null),s(!0)}}catch(e){k(c,g.simpleData,e.message),s(!1)}},[g.args,c,n,k,g.file]),(0,d.jsxs)("div",{style:{backgroundColor:"white",border:"1px solid black",borderRadius:5,padding:10,width:300},children:[(0,d.jsx)("div",{style:{fontWeight:"bold",textAlign:"center",marginBottom:10},children:"dropFile"}),(0,d.jsx)("div",{style:{width:"100%",height:100,border:"1px solid #D3D3D3",borderRadius:5,display:"flex",alignItems:"center"},onDrop:(b=(0,Q.Z)(S().mark(function a(b){var d,e,f;return S().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(b.preventDefault(),d=b.dataTransfer.items,a.prev=2,!(d.length>1)){a.next=5;break}throw Error("Multiple files dropped. You can only drop one.");case 5:if(["text/csv","application/json"].includes(d[0].type)){a.next=7;break}throw Error("Only CSV and JSON files are accepted.");case 7:return e=d[0].getAsFile(),a.next=10,t(e);case 10:f=a.sent,k(c,g.simpleData,null,{file:{content:f,name:null==e?void 0:e.name,type:null==e?void 0:e.type}}),a.next=18;break;case 14:a.prev=14,a.t0=a.catch(2),k(c,g.simpleData,a.t0.message,{file:{content:null,name:null}}),s(!1);case 18:case"end":return a.stop()}},a,null,[[2,14]])})),function(a){return b.apply(this,arguments)}),onDragOver:function(a){return a.preventDefault()},children:(0,d.jsx)("div",{style:{fontSize:12,width:150,textAlign:"center",margin:"0 auto"},children:"Drop a CSV or JSON file (array of objects)"})}),g.file?(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{fontSize:12,textAlign:"center",marginTop:10},children:[(0,d.jsx)("b",{children:"File:\xa0"}),"".concat(g.file.name)]}),(0,d.jsx)(O,{id:c,data:g})]}):null,g.errorMessage?(0,d.jsx)("div",{style:{maxWidth:200,color:"red",marginTop:10},children:g.errorMessage}):null,(0,d.jsx)(f.HH,{type:"source",position:m.P.Bottom,id:"a",style:(0,j.Z)((0,i.Z)({},l.source),{backgroundColor:r?"green":"#ff6666"})})]})}function V(a){var b=a.id,c=a.data,g=q(),h=g.updateNodeSimpleData,k=g.testNodeArgs,l=g.handleStyle,n=(0,e.useState)(!1),p=n[0],r=n[1];return(0,e.useEffect)(function(){a.apply(this,arguments);function a(){return(a=(0,Q.Z)(S().mark(function a(){var d,e;return S().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(a.prev=0,!((d=k(c))&&!c.errorMessage)){a.next=8;break}return a.next=5,new o.P().loadDataFromUrl(c.args);case 5:h(b,e=a.sent,null),r(!0);case 8:a.next=14;break;case 10:a.prev=10,a.t0=a.catch(0),h(b,c.simpleData,a.t0.message),r(!1);case 14:case"end":return a.stop()}},a,null,[[0,10]])}))).apply(this,arguments)}},[c.args,c.errorMessage,h,k,b]),(0,d.jsxs)("div",{style:{backgroundColor:"white",border:"1px solid black",borderRadius:5,padding:10,maxWidth:300},children:[(0,d.jsx)("div",{style:{fontWeight:"bold",textAlign:"center",marginBottom:10},children:"loadDataFromUrl"}),(0,d.jsx)(O,{id:b,data:c}),c.errorMessage?(0,d.jsx)("div",{style:{maxWidth:200,color:"red",marginTop:10},children:c.errorMessage}):null,(0,d.jsx)(f.HH,{type:"source",position:m.P.Bottom,id:"a",style:(0,j.Z)((0,i.Z)({},l.source),{backgroundColor:p?"green":"#ff6666"})})]})}var W=c(3465),X=c.n(W),Y=c(7957),Z=c(6638);function $(a){var b=a.flowInstance,c=a.setHome,f=a.name,g=a.setName,h=(0,e.useState)(!1),i=h[0],j=h[1],k=(0,e.useRef)(),l=q().startNodeId,m=(0,e.useCallback)(function(){if(b){for(var a=X()(b.toObject()),c=0;c<a.nodes.length;c++)"Importing"===a.nodes[c].category&&(a.nodes[c].data.dataSaved=a.nodes[c].data.simpleData?a.nodes[c].data.simpleData.getData():[]),a.nodes[c].data.simpleData=null,a.nodes[c].data.sourceSimpleData=null,a.nodes[c].data.sourceSimpleDataB=null;a.name=f,a.startNodeId=l;var d=JSON.stringify(a),e=document.createElement("a"),g=new Blob([d],{type:"application/json"});e.href=URL.createObjectURL(g),e.download="".concat(f,".json"),e.click()}},[b,f]);return(0,d.jsx)("div",{style:{backgroundColor:"white",paddingTop:5,paddingBottom:5},children:(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,d.jsx)(Z.Z,{style:{fontSize:20,cursor:"pointer"},onClick:function(){return c(!0)}}),(0,d.jsxs)("div",{style:{display:"flex"},children:[i?null:(0,d.jsx)("div",{style:{fontWeight:"bold",fontSize:16},children:f}),i?(0,d.jsx)("input",{ref:k,style:{fontWeight:"bold",width:400,textAlign:"center",fontSize:16},defaultValue:f,onKeyUp:function(a){"Enter"===a.key&&(g(a.target.value),j(!1))}}):null,(0,d.jsx)(Y.Z,{style:{fill:i?"black":"grey",height:18,cursor:"pointer"},onClick:function(){i?(j(!1),g(k.current.value)):j(!0)}})]}),(0,d.jsx)(D.Z,{style:{fill:i?"grey":"black",height:18,cursor:"pointer"},onClick:function(){i||m()}})]})})}function _(a){var b,c=a.home,f=a.setHome,g=a.setName,h=q(),i=h.setNodes,j=h.setEdges,k=h.updateNodeSimpleData,l=h.setStartNodeId,m=(0,e.useState)(null),n=m[0],p=m[1],r=(0,e.useCallback)(function(a){return new Promise(function(b,c){var d=new FileReader;d.onload=function(){b(d.result)},d.onerror=c,d.readAsText(a)})},[]),s=(0,e.useCallback)(function(a){var b;(b=(0,Q.Z)(S().mark(function a(b){var c,d;return S().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:for(g((c=JSON.parse(b)).name),l(c.startNodeId),c&&(i(c.nodes||[]),j(c.edges||[])),d=0;d<c.nodes.length;d++)"Importing"===c.nodes[d].category&&k(c.nodes[d].id,new o.P({data:c.nodes[d].data.dataSaved,fillMissingKeys:!0}),null);case 5:case"end":return a.stop()}},a)})),function(a){return b.apply(this,arguments)})(a)},[i,j]);return c?(0,d.jsxs)("div",{children:[(0,d.jsx)("h1",{style:{textAlign:"center"},children:"Simple Data Analysis Flow"}),(0,d.jsxs)("div",{style:{padding:"0 10px",fontSize:16,lineHeight:1.4,backgroundColor:"white",maxWidth:600,margin:"0 auto"},children:["Welcome! The aim of this project is to allow non-coders to use the open source library ",(0,d.jsx)("a",{href:"https://github.com/nshiab/simple-data-analysis.js",children:"simple-data-analysis.js"})," with a node-based editor running in the browser. If you use this project, show off your work and tag me on ",(0,d.jsx)("a",{href:"https://twitter.com/NaelShiab",children:"Twitter"})," or ",(0,d.jsx)("a",{href:"https://www.linkedin.com/in/naelshiab/",children:"LinkedIn"}),"! Feel to start a conversation, raise an issue or contribute to the ",(0,d.jsx)("a",{href:"https://github.com/nshiab/simple-data-analysis-flow",children:"code on Github"}),"."]}),(0,d.jsx)("button",{style:{fontSize:18,marginTop:40,marginLeft:"auto",marginRight:"auto",display:"block"},onClick:function(){f(!1),i([]),j([])},children:"Start a new flow"}),(0,d.jsx)("div",{style:{width:200,height:200,border:"1px solid #D3D3D3",borderRadius:5,display:"flex",alignItems:"center",margin:"30px  auto 0 auto"},onDrop:(b=(0,Q.Z)(S().mark(function a(b){var c,d,e;return S().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(b.preventDefault(),c=b.dataTransfer.items,a.prev=2,!(c.length>1)){a.next=5;break}throw Error("Multiple files dropped. You can only drop one.");case 5:if(!("application/json"!==c[0].type)){a.next=7;break}throw Error("Only JSON files are accepted.");case 7:return d=c[0].getAsFile(),a.next=10,r(d);case 10:s(e=a.sent),f(!1),p(null),a.next=19;break;case 16:a.prev=16,a.t0=a.catch(2),p(a.t0.message);case 19:case"end":return a.stop()}},a,null,[[2,16]])})),function(a){return b.apply(this,arguments)}),onDragOver:function(a){return a.preventDefault()},children:(0,d.jsx)("div",{style:{fontSize:14,width:150,textAlign:"center",margin:"0 auto"},children:"Or drop a flow here "})}),n?(0,d.jsx)("div",{style:{maxWidth:400,color:"red",marginTop:10,marginLeft:"auto",marginRight:"auto",textAlign:"center"},children:n}):null]}):null}var aa=c(5923),ab={i8:"0.7.0"};function ac(){return(0,d.jsx)("div",{style:{position:"absolute",bottom:14,right:0,paddingRight:3,fontSize:10,color:"#555",background:"hsla(0,0%,100%,.5)",zIndex:1e3},children:(0,d.jsxs)("div",{children:["SDA-Flow v",ab.i8," / SDA v",aa.i8]})})}function ad(){var a=q(),b=a.nodes,c=a.edges,i=a.onNodesChange,j=a.onEdgesChange,k=a.onConnect,l=(0,e.useMemo)(function(){return{newSimpleData:s,simpleDataMethod:P,dropFile:U,loadDataFromUrl:V}},[]),m=(0,e.useState)(null),n=m[0],o=m[1],p=(0,e.useState)(!0),t=p[0],u=p[1],v=(0,e.useState)("SDA-Flow ".concat(new Date().toDateString()," ").concat(new Date().toLocaleTimeString()).replaceAll(" ","_")),w=v[0],x=v[1];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(_,{home:t,setHome:u,setName:x}),!t&&b&&c?(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{position:"absolute",top:0,left:0,right:0,margin:"0 auto",zIndex:5,width:"100%",maxWidth:800},children:[(0,d.jsx)($,{flowInstance:n,setHome:u,name:w,setName:x}),(0,d.jsx)(r,{})]}),(0,d.jsx)("div",{style:{position:"relative"},children:(0,d.jsxs)("div",{style:{width:"100vw",height:"100vh"},children:[(0,d.jsxs)(f.ZP,{onInit:o,nodeTypes:l,nodes:b,edges:c,onNodesChange:i,onEdgesChange:j,onConnect:k,fitView:!0,children:[(0,d.jsx)(g.Z,{}),(0,d.jsx)(h.Z,{})]}),(0,d.jsx)(ac,{})]})})]}):null]})}}},function(a){a.O(0,[770,801,774,888,179],function(){var b;return a(a.s=8312)}),_N_E=a.O()}])