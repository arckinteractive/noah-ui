(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{479:function(t,e,n){"use strict";var a=n(739)({});e.a=function(t){return"string"==typeof t&&t?a.render(t):""}},944:function(t,e,n){"use strict";n.r(e);var a=n(23),s=(n(6),n(5),n(146),n(46),n(762)),o=n(479),r={name:"ComponentMeta",props:{name:{type:String,required:!0}},data:function(){return{docs:s}},computed:{meta:function(){var t=this;return this.docs.find(function(e){return e.name===t.name})},configOptions:function(){var t=this.meta.data.find(function(t){return"localConfig"===t.name}),e=function t(e){var n,s={};return Object.keys(e).forEach(function(o){"object"===Object(a.a)(e[o].value)?(n=t(e[o].value),Object.keys(n).forEach(function(t){s[o+(isNaN(t)?"."+t:"")]=n[t]})):s[o]=e[o].value}),s}(t?t.initial.config.value:{});return Object.keys(e).map(function(t){return{name:t,value:e[t]}})},tabs:function(){return[{title:"Props",target:"props",icon:"fas fa-theater-masks",badge:{value:this.meta.props.length}},{title:"Config",target:"config",icon:"fas fa-cogs",badge:{value:this.configOptions.length}},{title:"Slots",target:"slots",icon:"fas fa-stream",badge:{value:this.meta.slots.length}},{title:"Events",target:"events",icon:"fas fa-random",badge:{value:this.meta.events.length}},{title:"Methods",target:"methods",icon:"fas fa-filter",badge:{value:this.meta.methods.length}}]}},methods:{markdown:o.a}},i=n(1),c=Object(i.a)(r,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-meta"},[n("n-text",{attrs:{level:"6"}},[t._v(t._s(t.meta.name))]),t._v(" "),n("div",[t.meta.description?n("p",{domProps:{innerHTML:t._s(t.markdown(t.meta.description))}}):t._e()]),t._v(" "),n("n-module",{staticClass:"component-meta",attrs:{type:"demo"}},[n("div",{attrs:{slot:"header"},slot:"header"}),t._v(" "),n("n-tabs",{attrs:{items:t.tabs}},[n("component-props",{attrs:{slot:"props",data:t.meta.props},slot:"props"}),t._v(" "),n("component-config",{attrs:{slot:"config",data:t.configOptions},slot:"config"}),t._v(" "),n("component-slots",{attrs:{slot:"slots",data:t.meta.slots},slot:"slots"}),t._v(" "),n("component-events",{attrs:{slot:"events",data:t.meta.events},slot:"events"}),t._v(" "),n("component-methods",{attrs:{slot:"methods",data:t.meta.methods},slot:"methods"})],1)],1)],1)},[],!1,null,null,null);e.default=c.exports}}]);