(window.webpackJsonp=window.webpackJsonp||[]).push([[232],{389:function(t,e,a){!function(t){"use strict";t.defineMode("ebnf",function(e){var a=0,c=1,n=0,r=1,s=2,i=null;return e.bracesMode&&(i=t.getMode(e,e.bracesMode)),{startState:function(){return{stringType:null,commentType:null,braced:0,lhs:!0,localState:null,stack:[],inDefinition:!1}},token:function(e,o){if(e){switch(0===o.stack.length&&('"'==e.peek()||"'"==e.peek()?(o.stringType=e.peek(),e.next(),o.stack.unshift(r)):e.match(/^\/\*/)?(o.stack.unshift(n),o.commentType=a):e.match(/^\(\*/)&&(o.stack.unshift(n),o.commentType=c)),o.stack[0]){case r:for(;o.stack[0]===r&&!e.eol();)e.peek()===o.stringType?(e.next(),o.stack.shift()):"\\"===e.peek()?(e.next(),e.next()):e.match(/^.[^\\\"\']*/);return o.lhs?"property string":"string";case n:for(;o.stack[0]===n&&!e.eol();)o.commentType===a&&e.match(/\*\//)?(o.stack.shift(),o.commentType=null):o.commentType===c&&e.match(/\*\)/)?(o.stack.shift(),o.commentType=null):e.match(/^.[^\*]*/);return"comment";case s:for(;o.stack[0]===s&&!e.eol();)e.match(/^[^\]\\]+/)||e.match(/^\\./)||o.stack.shift();return"operator"}var m=e.peek();if(null!==i&&(o.braced||"{"===m)){null===o.localState&&(o.localState=t.startState(i));var u=i.token(e,o.localState),h=e.current();if(!u)for(var f=0;f<h.length;f++)"{"===h[f]?(0===o.braced&&(u="matchingbracket"),o.braced++):"}"===h[f]&&(o.braced--,0===o.braced&&(u="matchingbracket"));return u}switch(m){case"[":return e.next(),o.stack.unshift(s),"bracket";case":":case"|":case";":return e.next(),"operator";case"%":if(e.match("%%"))return"header";if(e.match(/[%][A-Za-z]+/))return"keyword";if(e.match(/[%][}]/))return"matchingbracket";break;case"/":if(e.match(/[\/][A-Za-z]+/))return"keyword";case"\\":if(e.match(/[\][a-z]+/))return"string-2";case".":if(e.match("."))return"atom";case"*":case"-":case"+":case"^":if(e.match(m))return"atom";case"$":if(e.match("$$"))return"builtin";if(e.match(/[$][0-9]+/))return"variable-3";case"<":if(e.match(/<<[a-zA-Z_]+>>/))return"builtin"}return e.match(/^\/\//)?(e.skipToEnd(),"comment"):e.match(/return/)?"operator":e.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)?e.match(/(?=[\(.])/)?"variable":e.match(/(?=[\s\n]*[:=])/)?"def":"variable-2":-1!=["[","]","(",")"].indexOf(e.peek())?(e.next(),"bracket"):(e.eatSpace()||e.next(),null)}}}}),t.defineMIME("text/x-ebnf","ebnf")}(a(351))}}]);