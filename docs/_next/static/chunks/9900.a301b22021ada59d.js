"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9900],{39900:function(a,e,n){n.r(e),n.d(e,{default:function(){return t}});var t=[Object.freeze({displayName:"Ara",fileTypes:["ara"],name:"ara",patterns:[{include:"#namespace"},{include:"#named-arguments"},{include:"#comments"},{include:"#keywords"},{include:"#strings"},{include:"#numbers"},{include:"#operators"},{include:"#type"},{include:"#function-call"}],repository:{"class-name":{patterns:[{begin:"\\b(?i)(?<!\\$)(?=[\\\\a-zA-Z_])",end:"(?i)([a-z_][a-z_0-9]*)?(?=[^a-z0-9_\\\\])\\b",endCaptures:{1:{name:"support.class.ara"}},patterns:[{include:"#namespace"}]}]},comments:{patterns:[{begin:"/\\*",captures:{0:{name:"punctuation.definition.comment.ara"}},end:"\\*/",name:"comment.block.ara"},{begin:"(^[ \\t]+)?(?=//)",beginCaptures:{1:{name:"punctuation.whitespace.comment.leading.ara"}},end:"(?!\\G)",patterns:[{begin:"//",beginCaptures:{0:{name:"punctuation.definition.comment.ara"}},end:"\\n",name:"comment.line.double-slash.ara"}]}]},"function-call":{patterns:[{begin:"(?i)(?=\\\\?[a-z_0-9\\\\]+\\\\[a-z_][a-z0-9_]*\\s*(\\(|(::<)))",comment:"Functions in a user-defined namespace (overrides any built-ins)",end:"(?=\\s*(\\(|(::<)))",patterns:[{include:"#user-function-call"}]},{begin:"(?i)(\\\\)?(?=\\b[a-z_][a-z_0-9]*\\s*(\\(|(::<)))",beginCaptures:{1:{name:"punctuation.separator.inheritance.php"}},comment:"Root namespace function calls (built-in or user)",end:"(?=\\s*(\\(|(::<)))",patterns:[{include:"#user-function-call"}]}]},interpolation:{patterns:[{comment:"Interpolating octal values e.g. \\01 or \\07.",match:"\\\\[0-7]{1,3}",name:"constant.numeric.octal.ara"},{comment:"Interpolating hex values e.g. \\x1 or \\xFF.",match:"\\\\x[0-9A-Fa-f]{1,2}",name:"constant.numeric.hex.ara"},{comment:"Escaped characters in double-quoted strings e.g. \\n or \\t.",match:'\\\\[nrt\\\\$\\"]',name:"constant.character.escape.ara"}]},keywords:{patterns:[{match:"\\b(await|async|concurrently|break|continue|do|else|elseif|for|if|loop|while|foreach|match|return|try|yield|from|catch|finally|default|exit)\\b",name:"keyword.control.ara"},{match:"\\b(const|enum|class|interface|trait|namespace|type|case|function|fn)\\b",name:"storage.decl.ara"},{match:"\\b(final|abstract|static|readonly|public|private|protected)\\b",name:"storage.modifier.ara"},{match:"\\b(as|is|extends|implements|use|where|clone|new)\\b",name:"keyword.other.ara"}]},"named-arguments":{captures:{1:{name:"entity.name.variable.parameter.ara"},2:{name:"punctuation.separator.colon.ara"}},match:"(?i)(?<=^|\\(|,)\\s*([a-z_\\x{7f}-\\x{10ffff}][a-z0-9_\\x{7f}-\\x{10ffff}]*)\\s*(:)(?!:)"},namespace:{begin:"(?i)((namespace)|[a-z0-9_]+)?(\\\\)(?=.*?[^a-z_0-9\\\\])",beginCaptures:{1:{name:"entity.name.type.namespace.php"},3:{name:"punctuation.separator.inheritance.php"}},end:"(?i)(?=[a-z0-9_]*[^a-z0-9_\\\\])",name:"support.other.namespace.php",patterns:[{match:"(?i)[a-z0-9_]+(?=\\\\)",name:"entity.name.type.namespace.php"},{captures:{1:{name:"punctuation.separator.inheritance.php"}},match:"(?i)(\\\\)"}]},numbers:{patterns:[{match:"0[xX][0-9a-fA-F]+(?:_[0-9a-fA-F]+)*",name:"constant.numeric.hex.ara"},{match:"0[bB][01]+(?:_[01]+)*",name:"constant.numeric.binary.ara"},{match:"0[oO][0-7]+(?:_[0-7]+)*",name:"constant.numeric.octal.ara"},{match:"0(?:_?[0-7]+)+",name:"constant.numeric.octal.ara"},{captures:{1:{name:"punctuation.separator.decimal.period.ara"},2:{name:"punctuation.separator.decimal.period.ara"}},match:"(?:(?:\\d+(?:_\\d+)*)?(\\.)\\d+(?:_\\d+)*(?:[eE][+-]?\\d+(?:_\\d+)*)?|\\d+(?:_\\d+)*(\\.)(?:\\d+(?:_\\d+)*)?(?:[eE][+-]?\\d+(?:_\\d+)*)?|\\d+(?:_\\d+)*[eE][+-]?\\d+(?:_\\d+)*)",name:"constant.numeric.decimal.ara"},{match:"0|[1-9](?:_?\\d+)*",name:"constant.numeric.decimal.ara"}]},operators:{patterns:[{comment:"assignment operators",match:"(\\+=|-=|\\*=|/=|%=|\\^=|&&=|<=|>=|&=|\\|=|<<=|>>=|\\?\\?=)",name:"keyword.assignments.ara"},{comment:"logical operators",match:"(\\^|\\||\\|\\||&&|>>|<<|&|~|<<|>>|>|<|<=>|\\?\\?|\\?|:|\\?:)(?!=)",name:"keyword.operators.ara"},{comment:"comparison operators",match:"(==|===|!==|!=|<=|>=|<|>)(?!=)",name:"keyword.operator.comparison.ara"},{comment:"math operators",match:"(([+%]|(\\*(?!\\w)))(?!=))|(-(?!>))|(/(?!/))",name:"keyword.operator.math.ara"},{comment:"single equal assignment operator",match:"(?<![<>])=(?!=|>)",name:"keyword.operator.assignment.ara"},{captures:{1:{name:"punctuation.brackets.round.ara"},2:{name:"punctuation.brackets.square.ara"},3:{name:"punctuation.brackets.curly.ara"},4:{name:"keyword.operator.comparison.ara"},5:{name:"punctuation.brackets.round.ara"},6:{name:"punctuation.brackets.square.ara"},7:{name:"punctuation.brackets.curly.ara"}},comment:"less than, greater than (special case)",match:"(?:\\b|(?:(\\))|(\\])|(\\})))[ \\t]+([<>])[ \\t]+(?:\\b|(?:(\\()|(\\[)|(\\{)))"},{comment:"arrow method call, arrow property access",match:"(?:->|\\?->)",name:"keyword.operator.arrow.ara"},{comment:"double arrow key-value pair",match:"(?:=>)",name:"keyword.operator.double-arrow.ara"},{comment:"static method call, static property access",match:"(?:::)",name:"keyword.operator.static.ara"},{comment:"closure creation",match:"(?:\\(\\.\\.\\.\\))",name:"keyword.operator.closure.ara"},{comment:"spread operator",match:"(?:\\.\\.\\.)",name:"keyword.operator.spread.ara"},{comment:"namespace operator",match:"\\\\",name:"keyword.operator.namespace.ara"}]},strings:{patterns:[{begin:"'",end:"'",name:"string.quoted.single.ara",patterns:[{match:"\\\\[\\\\']",name:"constant.character.escape.ara"}]},{begin:'"',end:'"',name:"string.quoted.double.ara",patterns:[{include:"#interpolation"}]}]},type:{name:"support.type.php",patterns:[{match:"\\b(?:void|true|false|null|never|float|bool|int|string|dict|vec|object|mixed|nonnull|resource|self|static|parent|iterable)\\b",name:"support.type.php"},{begin:"([A-Za-z_][A-Za-z0-9_]*)<",beginCaptures:{1:{name:"support.class.php"}},end:">",patterns:[{include:"#type-annotation"}]},{begin:"(shape\\()",end:"((,|\\.\\.\\.)?\\s*\\))",endCaptures:{1:{name:"keyword.operator.key.php"}},name:"storage.type.shape.php",patterns:[{include:"#type-annotation"},{include:"#strings"},{include:"#constants"}]},{begin:"\\(",end:"\\)",patterns:[{include:"#type-annotation"}]},{begin:"\\(fn\\(",end:"\\)",patterns:[{include:"#type-annotation"}]},{include:"#class-name"},{include:"#comments"}]},"user-function-call":{begin:"(?i)(?=[a-z_0-9\\\\]*[a-z_][a-z0-9_]*\\s*\\()",end:"(?i)[a-z_][a-z_0-9]*(?=\\s*\\()",endCaptures:{0:{name:"entity.name.function.php"}},name:"meta.function-call.php",patterns:[{include:"#namespace"}]}},scopeName:"source.ara"})]}}]);