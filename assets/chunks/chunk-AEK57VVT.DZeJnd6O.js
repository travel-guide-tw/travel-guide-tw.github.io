var re=Object.defineProperty;var ae=(t,e,s)=>e in t?re(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var It=(t,e,s)=>ae(t,typeof e!="symbol"?e+"":e,s);import{g as ne,s as le}from"./chunk-RZ5BOZE2.Bf_MzBep.js";import{_ as f,l as D,c as x,r as oe,u as ce,aa as he,k as V,z as ue,a as de,b as fe,g as pe,s as Se,q as ye,t as ge}from"../app.BgLWeAYi.js";var bt=(function(){var t=f(function(w,l,c,a){for(c=c||{},a=w.length;a--;c[w[a]]=l);return c},"o"),e=[1,2],s=[1,3],n=[1,4],o=[2,4],p=[1,9],r=[1,11],u=[1,16],d=[1,17],g=[1,18],E=[1,19],m=[1,32],L=[1,20],S=[1,21],A=[1,22],I=[1,23],P=[1,24],B=[1,26],O=[1,27],N=[1,28],Q=[1,29],Z=[1,30],tt=[1,31],et=[1,34],st=[1,35],it=[1,36],rt=[1,37],z=[1,33],y=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],at=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],xt=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],pt={trace:f(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,styleStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,classDef:38,CLASSDEF_ID:39,CLASSDEF_STYLEOPTS:40,DEFAULT:41,style:42,STYLE_IDS:43,STYLEDEF_STYLEOPTS:44,class:45,CLASSENTITY_IDS:46,STYLECLASS:47,direction_tb:48,direction_bt:49,direction_rl:50,direction_lr:51,eol:52,";":53,EDGE_STATE:54,STYLE_SEPARATOR:55,left_of:56,right_of:57,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"classDef",39:"CLASSDEF_ID",40:"CLASSDEF_STYLEOPTS",41:"DEFAULT",42:"style",43:"STYLE_IDS",44:"STYLEDEF_STYLEOPTS",45:"class",46:"CLASSENTITY_IDS",47:"STYLECLASS",48:"direction_tb",49:"direction_bt",50:"direction_rl",51:"direction_lr",53:";",54:"EDGE_STATE",55:"STYLE_SEPARATOR",56:"left_of",57:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[10,3],[10,3],[11,3],[12,3],[32,1],[32,1],[32,1],[32,1],[52,1],[52,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1]],performAction:f(function(l,c,a,T,_,i,H){var h=i.length-1;switch(_){case 3:return T.setRootDoc(i[h]),i[h];case 4:this.$=[];break;case 5:i[h]!="nl"&&(i[h-1].push(i[h]),this.$=i[h-1]);break;case 6:case 7:this.$=i[h];break;case 8:this.$="nl";break;case 12:this.$=i[h];break;case 13:const W=i[h-1];W.description=T.trimColon(i[h]),this.$=W;break;case 14:this.$={stmt:"relation",state1:i[h-2],state2:i[h]};break;case 15:const St=T.trimColon(i[h]);this.$={stmt:"relation",state1:i[h-3],state2:i[h-1],description:St};break;case 19:this.$={stmt:"state",id:i[h-3],type:"default",description:"",doc:i[h-1]};break;case 20:var G=i[h],U=i[h-2].trim();if(i[h].match(":")){var lt=i[h].split(":");G=lt[0],U=[U,lt[1]]}this.$={stmt:"state",id:G,type:"default",description:U};break;case 21:this.$={stmt:"state",id:i[h-3],type:"default",description:i[h-5],doc:i[h-1]};break;case 22:this.$={stmt:"state",id:i[h],type:"fork"};break;case 23:this.$={stmt:"state",id:i[h],type:"join"};break;case 24:this.$={stmt:"state",id:i[h],type:"choice"};break;case 25:this.$={stmt:"state",id:T.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:i[h-1].trim(),note:{position:i[h-2].trim(),text:i[h].trim()}};break;case 29:this.$=i[h].trim(),T.setAccTitle(this.$);break;case 30:case 31:this.$=i[h].trim(),T.setAccDescription(this.$);break;case 32:case 33:this.$={stmt:"classDef",id:i[h-1].trim(),classes:i[h].trim()};break;case 34:this.$={stmt:"style",id:i[h-1].trim(),styleClass:i[h].trim()};break;case 35:this.$={stmt:"applyClass",id:i[h-1].trim(),styleClass:i[h].trim()};break;case 36:T.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 37:T.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 38:T.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 39:T.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 42:case 43:this.$={stmt:"state",id:i[h].trim(),type:"default",description:""};break;case 44:this.$={stmt:"state",id:i[h-2].trim(),classes:[i[h].trim()],type:"default",description:""};break;case 45:this.$={stmt:"state",id:i[h-2].trim(),classes:[i[h].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:e,5:s,6:n},{1:[3]},{3:5,4:e,5:s,6:n},{3:6,4:e,5:s,6:n},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,42,45,48,49,50,51,54],o,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:p,5:r,8:8,9:10,10:12,11:13,12:14,13:15,16:u,17:d,19:g,22:E,24:m,25:L,26:S,27:A,28:I,29:P,32:25,33:B,35:O,37:N,38:Q,42:Z,45:tt,48:et,49:st,50:it,51:rt,54:z},t(y,[2,5]),{9:38,10:12,11:13,12:14,13:15,16:u,17:d,19:g,22:E,24:m,25:L,26:S,27:A,28:I,29:P,32:25,33:B,35:O,37:N,38:Q,42:Z,45:tt,48:et,49:st,50:it,51:rt,54:z},t(y,[2,7]),t(y,[2,8]),t(y,[2,9]),t(y,[2,10]),t(y,[2,11]),t(y,[2,12],{14:[1,39],15:[1,40]}),t(y,[2,16]),{18:[1,41]},t(y,[2,18],{20:[1,42]}),{23:[1,43]},t(y,[2,22]),t(y,[2,23]),t(y,[2,24]),t(y,[2,25]),{30:44,31:[1,45],56:[1,46],57:[1,47]},t(y,[2,28]),{34:[1,48]},{36:[1,49]},t(y,[2,31]),{39:[1,50],41:[1,51]},{43:[1,52]},{46:[1,53]},t(at,[2,42],{55:[1,54]}),t(at,[2,43],{55:[1,55]}),t(y,[2,36]),t(y,[2,37]),t(y,[2,38]),t(y,[2,39]),t(y,[2,6]),t(y,[2,13]),{13:56,24:m,54:z},t(y,[2,17]),t(xt,o,{7:57}),{24:[1,58]},{24:[1,59]},{23:[1,60]},{24:[2,46]},{24:[2,47]},t(y,[2,29]),t(y,[2,30]),{40:[1,61]},{40:[1,62]},{44:[1,63]},{47:[1,64]},{24:[1,65]},{24:[1,66]},t(y,[2,14],{14:[1,67]}),{4:p,5:r,8:8,9:10,10:12,11:13,12:14,13:15,16:u,17:d,19:g,21:[1,68],22:E,24:m,25:L,26:S,27:A,28:I,29:P,32:25,33:B,35:O,37:N,38:Q,42:Z,45:tt,48:et,49:st,50:it,51:rt,54:z},t(y,[2,20],{20:[1,69]}),{31:[1,70]},{24:[1,71]},t(y,[2,32]),t(y,[2,33]),t(y,[2,34]),t(y,[2,35]),t(at,[2,44]),t(at,[2,45]),t(y,[2,15]),t(y,[2,19]),t(xt,o,{7:72}),t(y,[2,26]),t(y,[2,27]),{4:p,5:r,8:8,9:10,10:12,11:13,12:14,13:15,16:u,17:d,19:g,21:[1,73],22:E,24:m,25:L,26:S,27:A,28:I,29:P,32:25,33:B,35:O,37:N,38:Q,42:Z,45:tt,48:et,49:st,50:it,51:rt,54:z},t(y,[2,21])],defaultActions:{5:[2,1],6:[2,2],46:[2,46],47:[2,47]},parseError:f(function(l,c){if(c.recoverable)this.trace(l);else{var a=new Error(l);throw a.hash=c,a}},"parseError"),parse:f(function(l){var c=this,a=[0],T=[],_=[null],i=[],H=this.table,h="",G=0,U=0,lt=2,W=1,St=i.slice.call(arguments,1),b=Object.create(this.lexer),Y={yy:{}};for(var yt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,yt)&&(Y.yy[yt]=this.yy[yt]);b.setInput(l,Y.yy),Y.yy.lexer=b,Y.yy.parser=this,typeof b.yylloc>"u"&&(b.yylloc={});var gt=b.yylloc;i.push(gt);var se=b.options&&b.options.ranges;typeof Y.yy.parseError=="function"?this.parseError=Y.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ie(k){a.length=a.length-2*k,_.length=_.length-k,i.length=i.length-k}f(ie,"popStack");function At(){var k;return k=T.pop()||b.lex()||W,typeof k!="number"&&(k instanceof Array&&(T=k,k=T.pop()),k=c.symbols_[k]||k),k}f(At,"lex");for(var v,F,C,Tt,j={},ot,R,Lt,ct;;){if(F=a[a.length-1],this.defaultActions[F]?C=this.defaultActions[F]:((v===null||typeof v>"u")&&(v=At()),C=H[F]&&H[F][v]),typeof C>"u"||!C.length||!C[0]){var _t="";ct=[];for(ot in H[F])this.terminals_[ot]&&ot>lt&&ct.push("'"+this.terminals_[ot]+"'");b.showPosition?_t="Parse error on line "+(G+1)+`:
`+b.showPosition()+`
Expecting `+ct.join(", ")+", got '"+(this.terminals_[v]||v)+"'":_t="Parse error on line "+(G+1)+": Unexpected "+(v==W?"end of input":"'"+(this.terminals_[v]||v)+"'"),this.parseError(_t,{text:b.match,token:this.terminals_[v]||v,line:b.yylineno,loc:gt,expected:ct})}if(C[0]instanceof Array&&C.length>1)throw new Error("Parse Error: multiple actions possible at state: "+F+", token: "+v);switch(C[0]){case 1:a.push(v),_.push(b.yytext),i.push(b.yylloc),a.push(C[1]),v=null,U=b.yyleng,h=b.yytext,G=b.yylineno,gt=b.yylloc;break;case 2:if(R=this.productions_[C[1]][1],j.$=_[_.length-R],j._$={first_line:i[i.length-(R||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(R||1)].first_column,last_column:i[i.length-1].last_column},se&&(j._$.range=[i[i.length-(R||1)].range[0],i[i.length-1].range[1]]),Tt=this.performAction.apply(j,[h,U,G,Y.yy,C[1],_,i].concat(St)),typeof Tt<"u")return Tt;R&&(a=a.slice(0,-1*R*2),_=_.slice(0,-1*R),i=i.slice(0,-1*R)),a.push(this.productions_[C[1]][0]),_.push(j.$),i.push(j._$),Lt=H[a[a.length-2]][a[a.length-1]],a.push(Lt);break;case 3:return!0}}return!0},"parse")},ee=(function(){var w={EOF:1,parseError:f(function(c,a){if(this.yy.parser)this.yy.parser.parseError(c,a);else throw new Error(c)},"parseError"),setInput:f(function(l,c){return this.yy=c||this.yy||{},this._input=l,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:f(function(){var l=this._input[0];this.yytext+=l,this.yyleng++,this.offset++,this.match+=l,this.matched+=l;var c=l.match(/(?:\r\n?|\n).*/g);return c?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),l},"input"),unput:f(function(l){var c=l.length,a=l.split(/(?:\r\n?|\n)/g);this._input=l+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-c),this.offset-=c;var T=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),a.length-1&&(this.yylineno-=a.length-1);var _=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:a?(a.length===T.length?this.yylloc.first_column:0)+T[T.length-a.length].length-a[0].length:this.yylloc.first_column-c},this.options.ranges&&(this.yylloc.range=[_[0],_[0]+this.yyleng-c]),this.yyleng=this.yytext.length,this},"unput"),more:f(function(){return this._more=!0,this},"more"),reject:f(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:f(function(l){this.unput(this.match.slice(l))},"less"),pastInput:f(function(){var l=this.matched.substr(0,this.matched.length-this.match.length);return(l.length>20?"...":"")+l.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:f(function(){var l=this.match;return l.length<20&&(l+=this._input.substr(0,20-l.length)),(l.substr(0,20)+(l.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:f(function(){var l=this.pastInput(),c=new Array(l.length+1).join("-");return l+this.upcomingInput()+`
`+c+"^"},"showPosition"),test_match:f(function(l,c){var a,T,_;if(this.options.backtrack_lexer&&(_={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(_.yylloc.range=this.yylloc.range.slice(0))),T=l[0].match(/(?:\r\n?|\n).*/g),T&&(this.yylineno+=T.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:T?T[T.length-1].length-T[T.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+l[0].length},this.yytext+=l[0],this.match+=l[0],this.matches=l,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(l[0].length),this.matched+=l[0],a=this.performAction.call(this,this.yy,this,c,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a)return a;if(this._backtrack){for(var i in _)this[i]=_[i];return!1}return!1},"test_match"),next:f(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var l,c,a,T;this._more||(this.yytext="",this.match="");for(var _=this._currentRules(),i=0;i<_.length;i++)if(a=this._input.match(this.rules[_[i]]),a&&(!c||a[0].length>c[0].length)){if(c=a,T=i,this.options.backtrack_lexer){if(l=this.test_match(a,_[i]),l!==!1)return l;if(this._backtrack){c=!1;continue}else return!1}else if(!this.options.flex)break}return c?(l=this.test_match(c,_[T]),l!==!1?l:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:f(function(){var c=this.next();return c||this.lex()},"lex"),begin:f(function(c){this.conditionStack.push(c)},"begin"),popState:f(function(){var c=this.conditionStack.length-1;return c>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:f(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:f(function(c){return c=this.conditionStack.length-1-Math.abs(c||0),c>=0?this.conditionStack[c]:"INITIAL"},"topState"),pushState:f(function(c){this.begin(c)},"pushState"),stateStackSize:f(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:f(function(c,a,T,_){switch(T){case 0:return 41;case 1:return 48;case 2:return 49;case 3:return 50;case 4:return 51;case 5:break;case 6:break;case 7:return 5;case 8:break;case 9:break;case 10:break;case 11:break;case 12:return this.pushState("SCALE"),17;case 13:return 18;case 14:this.popState();break;case 15:return this.begin("acc_title"),33;case 16:return this.popState(),"acc_title_value";case 17:return this.begin("acc_descr"),35;case 18:return this.popState(),"acc_descr_value";case 19:this.begin("acc_descr_multiline");break;case 20:this.popState();break;case 21:return"acc_descr_multiline_value";case 22:return this.pushState("CLASSDEF"),38;case 23:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";case 24:return this.popState(),this.pushState("CLASSDEFID"),39;case 25:return this.popState(),40;case 26:return this.pushState("CLASS"),45;case 27:return this.popState(),this.pushState("CLASS_STYLE"),46;case 28:return this.popState(),47;case 29:return this.pushState("STYLE"),42;case 30:return this.popState(),this.pushState("STYLEDEF_STYLES"),43;case 31:return this.popState(),44;case 32:return this.pushState("SCALE"),17;case 33:return 18;case 34:this.popState();break;case 35:this.pushState("STATE");break;case 36:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),25;case 37:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),26;case 38:return this.popState(),a.yytext=a.yytext.slice(0,-10).trim(),27;case 39:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),25;case 40:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),26;case 41:return this.popState(),a.yytext=a.yytext.slice(0,-10).trim(),27;case 42:return 48;case 43:return 49;case 44:return 50;case 45:return 51;case 46:this.pushState("STATE_STRING");break;case 47:return this.pushState("STATE_ID"),"AS";case 48:return this.popState(),"ID";case 49:this.popState();break;case 50:return"STATE_DESCR";case 51:return 19;case 52:this.popState();break;case 53:return this.popState(),this.pushState("struct"),20;case 54:break;case 55:return this.popState(),21;case 56:break;case 57:return this.begin("NOTE"),29;case 58:return this.popState(),this.pushState("NOTE_ID"),56;case 59:return this.popState(),this.pushState("NOTE_ID"),57;case 60:this.popState(),this.pushState("FLOATING_NOTE");break;case 61:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";case 62:break;case 63:return"NOTE_TEXT";case 64:return this.popState(),"ID";case 65:return this.popState(),this.pushState("NOTE_TEXT"),24;case 66:return this.popState(),a.yytext=a.yytext.substr(2).trim(),31;case 67:return this.popState(),a.yytext=a.yytext.slice(0,-8).trim(),31;case 68:return 6;case 69:return 6;case 70:return 16;case 71:return 54;case 72:return 24;case 73:return a.yytext=a.yytext.trim(),14;case 74:return 15;case 75:return 28;case 76:return 55;case 77:return 5;case 78:return"INVALID"}},"anonymous"),rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:style\s+)/i,/^(?:[\w,]+\s+)/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[9,10],inclusive:!1},struct:{rules:[9,10,22,26,29,35,42,43,44,45,54,55,56,57,71,72,73,74,75],inclusive:!1},FLOATING_NOTE_ID:{rules:[64],inclusive:!1},FLOATING_NOTE:{rules:[61,62,63],inclusive:!1},NOTE_TEXT:{rules:[66,67],inclusive:!1},NOTE_ID:{rules:[65],inclusive:!1},NOTE:{rules:[58,59,60],inclusive:!1},STYLEDEF_STYLEOPTS:{rules:[],inclusive:!1},STYLEDEF_STYLES:{rules:[31],inclusive:!1},STYLE_IDS:{rules:[],inclusive:!1},STYLE:{rules:[30],inclusive:!1},CLASS_STYLE:{rules:[28],inclusive:!1},CLASS:{rules:[27],inclusive:!1},CLASSDEFID:{rules:[25],inclusive:!1},CLASSDEF:{rules:[23,24],inclusive:!1},acc_descr_multiline:{rules:[20,21],inclusive:!1},acc_descr:{rules:[18],inclusive:!1},acc_title:{rules:[16],inclusive:!1},SCALE:{rules:[13,14,33,34],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[48],inclusive:!1},STATE_STRING:{rules:[49,50],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[9,10,36,37,38,39,40,41,46,47,51,52,53],inclusive:!1},ID:{rules:[9,10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,10,11,12,15,17,19,22,26,29,32,35,53,57,68,69,70,71,72,73,74,76,77,78],inclusive:!0}}};return w})();pt.lexer=ee;function nt(){this.yy={}}return f(nt,"Parser"),nt.prototype=pt,pt.Parser=nt,new nt})();bt.parser=bt;var Xe=bt,Te="TB",Mt="TB",Rt="dir",ut="state",Dt="relation",_e="classDef",Ee="style",me="applyClass",J="default",Ut="divider",jt="fill:none",zt="fill: #333",Ht="c",Wt="text",Xt="normal",Et="rect",mt="rectWithTitle",be="stateStart",De="stateEnd",Ot="divider",Nt="roundedWithTitle",ve="note",ke="noteGroup",q="statediagram",Ce="state",xe=`${q}-${Ce}`,Kt="transition",Ae="note",Le="note-edge",Ie=`${Kt} ${Le}`,Re=`${q}-${Ae}`,Oe="cluster",Ne=`${q}-${Oe}`,we="cluster-alt",$e=`${q}-${we}`,Jt="parent",qt="note",Pe="state",Ct="----",Be=`${Ct}${qt}`,wt=`${Ct}${Jt}`,Qt=f((t,e=Mt)=>{if(!t.doc)return e;let s=e;for(const n of t.doc)n.stmt==="dir"&&(s=n.value);return s},"getDir"),Ge=f(function(t,e){return e.db.getClasses()},"getClasses"),Ye=f(async function(t,e,s,n){D.info("REF0:"),D.info("Drawing state diagram (v2)",e);const{securityLevel:o,state:p,layout:r}=x();n.db.extract(n.db.getRootDocV2());const u=n.db.getData(),d=ne(e,o);u.type=n.type,u.layoutAlgorithm=r,u.nodeSpacing=p?.nodeSpacing||50,u.rankSpacing=p?.rankSpacing||50,u.markers=["barb"],u.diagramId=e,await oe(u,d);const g=8;ce.insertTitle(d,"statediagramTitleText",p?.titleTopMargin??25,n.db.getDiagramTitle()),le(d,g,q,p?.useMaxWidth??!0)},"draw"),Ke={getClasses:Ge,draw:Ye,getDir:Qt},dt=new Map,$=0;function ft(t="",e=0,s="",n=Ct){const o=s!==null&&s.length>0?`${n}${s}`:"";return`${Pe}-${t}${o}-${e}`}f(ft,"stateDomId");var Fe=f((t,e,s,n,o,p,r,u)=>{D.trace("items",e),e.forEach(d=>{switch(d.stmt){case ut:K(t,d,s,n,o,p,r,u);break;case J:K(t,d,s,n,o,p,r,u);break;case Dt:{K(t,d.state1,s,n,o,p,r,u),K(t,d.state2,s,n,o,p,r,u);const g={id:"edge"+$,start:d.state1.id,end:d.state2.id,arrowhead:"normal",arrowTypeEnd:"arrow_barb",style:jt,labelStyle:"",label:V.sanitizeText(d.description,x()),arrowheadStyle:zt,labelpos:Ht,labelType:Wt,thickness:Xt,classes:Kt,look:r};o.push(g),$++}break}})},"setupDoc"),$t=f((t,e=Mt)=>{let s=e;if(t.doc)for(const n of t.doc)n.stmt==="dir"&&(s=n.value);return s},"getDir");function X(t,e,s){if(!e.id||e.id==="</join></fork>"||e.id==="</choice>")return;e.cssClasses&&(Array.isArray(e.cssCompiledStyles)||(e.cssCompiledStyles=[]),e.cssClasses.split(" ").forEach(o=>{if(s.get(o)){const p=s.get(o);e.cssCompiledStyles=[...e.cssCompiledStyles,...p.styles]}}));const n=t.find(o=>o.id===e.id);n?Object.assign(n,e):t.push(e)}f(X,"insertOrUpdateNode");function Zt(t){return t?.classes?.join(" ")??""}f(Zt,"getClassesFromDbInfo");function te(t){return t?.styles??[]}f(te,"getStylesFromDbInfo");var K=f((t,e,s,n,o,p,r,u)=>{const d=e.id,g=s.get(d),E=Zt(g),m=te(g);if(D.info("dataFetcher parsedItem",e,g,m),d!=="root"){let L=Et;e.start===!0?L=be:e.start===!1&&(L=De),e.type!==J&&(L=e.type),dt.get(d)||dt.set(d,{id:d,shape:L,description:V.sanitizeText(d,x()),cssClasses:`${E} ${xe}`,cssStyles:m});const S=dt.get(d);e.description&&(Array.isArray(S.description)?(S.shape=mt,S.description.push(e.description)):S.description?.length>0?(S.shape=mt,S.description===d?S.description=[e.description]:S.description=[S.description,e.description]):(S.shape=Et,S.description=e.description),S.description=V.sanitizeTextOrArray(S.description,x())),S.description?.length===1&&S.shape===mt&&(S.type==="group"?S.shape=Nt:S.shape=Et),!S.type&&e.doc&&(D.info("Setting cluster for XCX",d,$t(e)),S.type="group",S.isGroup=!0,S.dir=$t(e),S.shape=e.type===Ut?Ot:Nt,S.cssClasses=`${S.cssClasses} ${Ne} ${p?$e:""}`);const A={labelStyle:"",shape:S.shape,label:S.description,cssClasses:S.cssClasses,cssCompiledStyles:[],cssStyles:S.cssStyles,id:d,dir:S.dir,domId:ft(d,$),type:S.type,isGroup:S.type==="group",padding:8,rx:10,ry:10,look:r};if(A.shape===Ot&&(A.label=""),t&&t.id!=="root"&&(D.trace("Setting node ",d," to be child of its parent ",t.id),A.parentId=t.id),A.centerLabel=!0,e.note){const I={labelStyle:"",shape:ve,label:e.note.text,cssClasses:Re,cssStyles:[],cssCompilesStyles:[],id:d+Be+"-"+$,domId:ft(d,$,qt),type:S.type,isGroup:S.type==="group",padding:x().flowchart.padding,look:r,position:e.note.position},P=d+wt,B={labelStyle:"",shape:ke,label:e.note.text,cssClasses:S.cssClasses,cssStyles:[],id:d+wt,domId:ft(d,$,Jt),type:"group",isGroup:!0,padding:16,look:r,position:e.note.position};$++,B.id=P,I.parentId=P,X(n,B,u),X(n,I,u),X(n,A,u);let O=d,N=I.id;e.note.position==="left of"&&(O=I.id,N=d),o.push({id:O+"-"+N,start:O,end:N,arrowhead:"none",arrowTypeEnd:"",style:jt,labelStyle:"",classes:Ie,arrowheadStyle:zt,labelpos:Ht,labelType:Wt,thickness:Xt,look:r})}else X(n,A,u)}e.doc&&(D.trace("Adding nodes children "),Fe(e,e.doc,s,n,o,!p,r,u))},"dataFetcher"),Ve=f(()=>{dt.clear(),$=0},"reset"),vt="[*]",Pt="start",Bt=vt,Gt="end",Yt="color",Ft="fill",Me="bgFill",Ue=",";function kt(){return new Map}f(kt,"newClassesList");var Vt=f(()=>({relations:[],states:new Map,documents:{}}),"newDoc"),ht=f(t=>JSON.parse(JSON.stringify(t)),"clone"),M,Je=(M=class{constructor(e){this.clear(),this.version=e,this.setRootDoc=this.setRootDoc.bind(this),this.getDividerId=this.getDividerId.bind(this),this.setDirection=this.setDirection.bind(this),this.trimColon=this.trimColon.bind(this)}version;nodes=[];edges=[];rootDoc=[];classes=kt();documents={root:Vt()};currentDocument=this.documents.root;startEndCount=0;dividerCnt=0;setRootDoc(e){D.info("Setting root doc",e),this.rootDoc=e,this.version===1?this.extract(e):this.extract(this.getRootDocV2())}getRootDoc(){return this.rootDoc}docTranslator(e,s,n){if(s.stmt===Dt)this.docTranslator(e,s.state1,!0),this.docTranslator(e,s.state2,!1);else if(s.stmt===ut&&(s.id==="[*]"?(s.id=n?e.id+"_start":e.id+"_end",s.start=n):s.id=s.id.trim()),s.doc){const o=[];let p=[],r;for(r=0;r<s.doc.length;r++)if(s.doc[r].type===Ut){const u=ht(s.doc[r]);u.doc=ht(p),o.push(u),p=[]}else p.push(s.doc[r]);if(o.length>0&&p.length>0){const u={stmt:ut,id:he(),type:"divider",doc:ht(p)};o.push(ht(u)),s.doc=o}s.doc.forEach(u=>this.docTranslator(s,u,!0))}}getRootDocV2(){return this.docTranslator({id:"root"},{id:"root",doc:this.rootDoc},!0),{id:"root",doc:this.rootDoc}}extract(e){let s;e.doc?s=e.doc:s=e,D.info(s),this.clear(!0),D.info("Extract initial document:",s),s.forEach(r=>{switch(D.warn("Statement",r.stmt),r.stmt){case ut:this.addState(r.id.trim(),r.type,r.doc,r.description,r.note,r.classes,r.styles,r.textStyles);break;case Dt:this.addRelation(r.state1,r.state2,r.description);break;case _e:this.addStyleClass(r.id.trim(),r.classes);break;case Ee:{const u=r.id.trim().split(","),d=r.styleClass.split(",");u.forEach(g=>{let E=this.getState(g);if(E===void 0){const m=g.trim();this.addState(m),E=this.getState(m)}E.styles=d.map(m=>m.replace(/;/g,"")?.trim())})}break;case me:this.setCssClass(r.id.trim(),r.styleClass);break}});const n=this.getStates(),p=x().look;Ve(),K(void 0,this.getRootDocV2(),n,this.nodes,this.edges,!0,p,this.classes),this.nodes.forEach(r=>{if(Array.isArray(r.label)){if(r.description=r.label.slice(1),r.isGroup&&r.description.length>0)throw new Error("Group nodes can only have label. Remove the additional description for node ["+r.id+"]");r.label=r.label[0]}})}addState(e,s=J,n=null,o=null,p=null,r=null,u=null,d=null){const g=e?.trim();if(this.currentDocument.states.has(g)?(this.currentDocument.states.get(g).doc||(this.currentDocument.states.get(g).doc=n),this.currentDocument.states.get(g).type||(this.currentDocument.states.get(g).type=s)):(D.info("Adding state ",g,o),this.currentDocument.states.set(g,{id:g,descriptions:[],type:s,doc:n,note:p,classes:[],styles:[],textStyles:[]})),o&&(D.info("Setting state description",g,o),typeof o=="string"&&this.addDescription(g,o.trim()),typeof o=="object"&&o.forEach(E=>this.addDescription(g,E.trim()))),p){const E=this.currentDocument.states.get(g);E.note=p,E.note.text=V.sanitizeText(E.note.text,x())}r&&(D.info("Setting state classes",g,r),(typeof r=="string"?[r]:r).forEach(m=>this.setCssClass(g,m.trim()))),u&&(D.info("Setting state styles",g,u),(typeof u=="string"?[u]:u).forEach(m=>this.setStyle(g,m.trim()))),d&&(D.info("Setting state styles",g,u),(typeof d=="string"?[d]:d).forEach(m=>this.setTextStyle(g,m.trim())))}clear(e){this.nodes=[],this.edges=[],this.documents={root:Vt()},this.currentDocument=this.documents.root,this.startEndCount=0,this.classes=kt(),e||ue()}getState(e){return this.currentDocument.states.get(e)}getStates(){return this.currentDocument.states}logDocuments(){D.info("Documents = ",this.documents)}getRelations(){return this.currentDocument.relations}startIdIfNeeded(e=""){let s=e;return e===vt&&(this.startEndCount++,s=`${Pt}${this.startEndCount}`),s}startTypeIfNeeded(e="",s=J){return e===vt?Pt:s}endIdIfNeeded(e=""){let s=e;return e===Bt&&(this.startEndCount++,s=`${Gt}${this.startEndCount}`),s}endTypeIfNeeded(e="",s=J){return e===Bt?Gt:s}addRelationObjs(e,s,n){let o=this.startIdIfNeeded(e.id.trim()),p=this.startTypeIfNeeded(e.id.trim(),e.type),r=this.startIdIfNeeded(s.id.trim()),u=this.startTypeIfNeeded(s.id.trim(),s.type);this.addState(o,p,e.doc,e.description,e.note,e.classes,e.styles,e.textStyles),this.addState(r,u,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),this.currentDocument.relations.push({id1:o,id2:r,relationTitle:V.sanitizeText(n,x())})}addRelation(e,s,n){if(typeof e=="object")this.addRelationObjs(e,s,n);else{const o=this.startIdIfNeeded(e.trim()),p=this.startTypeIfNeeded(e),r=this.endIdIfNeeded(s.trim()),u=this.endTypeIfNeeded(s);this.addState(o,p),this.addState(r,u),this.currentDocument.relations.push({id1:o,id2:r,title:V.sanitizeText(n,x())})}}addDescription(e,s){const n=this.currentDocument.states.get(e),o=s.startsWith(":")?s.replace(":","").trim():s;n.descriptions.push(V.sanitizeText(o,x()))}cleanupLabel(e){return e.substring(0,1)===":"?e.substr(2).trim():e.trim()}getDividerId(){return this.dividerCnt++,"divider-id-"+this.dividerCnt}addStyleClass(e,s=""){this.classes.has(e)||this.classes.set(e,{id:e,styles:[],textStyles:[]});const n=this.classes.get(e);s?.split(Ue).forEach(o=>{const p=o.replace(/([^;]*);/,"$1").trim();if(RegExp(Yt).exec(o)){const u=p.replace(Ft,Me).replace(Yt,Ft);n.textStyles.push(u)}n.styles.push(p)})}getClasses(){return this.classes}setCssClass(e,s){e.split(",").forEach(n=>{let o=this.getState(n);if(o===void 0){const p=n.trim();this.addState(p),o=this.getState(p)}o.classes.push(s)})}setStyle(e,s){const n=this.getState(e);n!==void 0&&n.styles.push(s)}setTextStyle(e,s){const n=this.getState(e);n!==void 0&&n.textStyles.push(s)}getDirectionStatement(){return this.rootDoc.find(e=>e.stmt===Rt)}getDirection(){return this.getDirectionStatement()?.value??Te}setDirection(e){const s=this.getDirectionStatement();s?s.value=e:this.rootDoc.unshift({stmt:Rt,value:e})}trimColon(e){return e&&e[0]===":"?e.substr(1).trim():e.trim()}getData(){const e=x();return{nodes:this.nodes,edges:this.edges,other:{},config:e,direction:Qt(this.getRootDocV2())}}getConfig(){return x().state}getAccTitle=de;setAccTitle=fe;getAccDescription=pe;setAccDescription=Se;setDiagramTitle=ye;getDiagramTitle=ge},f(M,"StateDB"),It(M,"relationType",{AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3}),M),je=f(t=>`
defs #statediagram-barbEnd {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel {
  background-color: ${t.edgeLabelBackground};
  p {
    background-color: ${t.edgeLabelBackground};
  }
  rect {
    opacity: 0.5;
    background-color: ${t.edgeLabelBackground};
    fill: ${t.edgeLabelBackground};
  }
  text-align: center;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
  // line-height: 1;
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}
`,"getStyles"),qe=je;export{Je as S,Xe as a,Ke as b,qe as s};
