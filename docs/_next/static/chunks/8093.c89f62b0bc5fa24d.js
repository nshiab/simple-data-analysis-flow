"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8093],{18093:function(e,a,n){n.r(a),n.d(a,{default:function(){return t}});var t=[Object.freeze({displayName:"Genie",fileTypes:["gs"],name:"genie",patterns:[{include:"#code"}],repository:{code:{patterns:[{include:"#comments"},{include:"#constants"},{include:"#strings"},{include:"#keywords"},{include:"#types"},{include:"#functions"},{include:"#variables"}]},comments:{patterns:[{captures:{0:{name:"punctuation.definition.comment.vala"}},match:"/\\*\\*/",name:"comment.block.empty.vala"},{include:"text.html.javadoc"},{include:"#comments-inline"}]},"comments-inline":{patterns:[{begin:"/\\*",captures:{0:{name:"punctuation.definition.comment.vala"}},end:"\\*/",name:"comment.block.vala"},{captures:{1:{name:"comment.line.double-slash.vala"},2:{name:"punctuation.definition.comment.vala"}},match:"\\s*((//).*$\\n?)"}]},constants:{patterns:[{match:"\\b((0(x|X)[0-9a-fA-F]*)|((\\d+\\.?\\d*)|(\\.\\d+))((e|E)(\\+|-)?\\d+)?)([LlFfUuDd]|UL|ul)?\\b",name:"constant.numeric.vala"},{match:"\\b([A-Z][A-Z0-9_]+)\\b",name:"variable.other.constant.vala"}]},functions:{patterns:[{match:"(\\w+)(?=\\s*(<[\\s\\w.]+>\\s*)?\\()",name:"entity.name.function.vala"}]},keywords:{patterns:[{match:"(?<=^|[^@\\w\\.])(as|do|if|in|is|of|or|to|and|def|for|get|isa|new|not|out|ref|set|try|var|case|dict|else|enum|init|list|lock|null|pass|prop|self|true|uses|void|weak|when|array|async|break|class|const|event|false|final|owned|print|super|raise|while|yield|assert|delete|downto|except|extern|inline|params|public|raises|return|sealed|sizeof|static|struct|typeof|default|dynamic|ensures|finally|private|unowned|virtual|abstract|continue|delegate|internal|override|readonly|requires|volatile|construct|errordomain|interface|namespace|protected|implements)\\b",name:"keyword.vala"},{match:"(?<=^|[^@\\w\\.])(bool|double|float|unichar|char|uchar|int|uint|long|ulong|short|ushort|size_t|ssize_t|string|void|signal|int8|int16|int32|int64|uint8|uint16|uint32|uint64)\\b",name:"keyword.vala"},{match:"(#if|#elif|#else|#endif)",name:"keyword.vala"}]},strings:{patterns:[{begin:'"""',end:'"""',name:"string.quoted.triple.vala"},{begin:'@"',end:'"',name:"string.quoted.interpolated.vala",patterns:[{match:"\\\\.",name:"constant.character.escape.vala"},{match:"\\$\\w+",name:"constant.character.escape.vala"},{match:"\\$\\(([^)(]|\\(([^)(]|\\([^)]*\\))*\\))*\\)",name:"constant.character.escape.vala"}]},{begin:'"',end:'"',name:"string.quoted.double.vala",patterns:[{match:"\\\\.",name:"constant.character.escape.vala"}]},{begin:"'",end:"'",name:"string.quoted.single.vala",patterns:[{match:"\\\\.",name:"constant.character.escape.vala"}]},{match:"/((\\\\/)|([^/]))*/(?=\\s*[,;)\\.\\n])",name:"string.regexp.vala"}]},types:{patterns:[{match:"(?<=^|[^@\\w\\.])(bool|double|float|unichar|char|uchar|int|uint|long|ulong|short|ushort|size_t|ssize_t|string|void|signal|int8|int16|int32|int64|uint8|uint16|uint32|uint64)\\b",name:"storage.type.primitive.vala"},{match:"\\b([A-Z]+\\w*)\\b",name:"entity.name.type.vala"}]},variables:{patterns:[{match:"\\b([_a-z]+\\w*)\\b",name:"variable.other.vala"}]}},scopeName:"source.genie"})]}}]);