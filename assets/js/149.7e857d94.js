(window.webpackJsonp=window.webpackJsonp||[]).push([[149],{999:function(t,e,i){"use strict";i.r(e);i(5),i(6);var s={computed:{viewportProps:function(){return Object.keys(this.$viewport).filter(function(t){return"size"!==t})}},methods:{boxColor:function(t){return this.$viewport[t]?"success-fade":"danger-fade"}},watch:{"$viewport.size":{handler:function(){this.$alert("Viewport size has changed to ".concat(this.$viewport.size))}}}},r=i(1),o=Object(r.a)(s,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("n-div",{attrs:{"margin-bottom":"large"}},[t._v("Resize the window to recompute the props")]),t._v(" "),i("n-div",{attrs:{flex:""}},[i("n-div",{attrs:{padding:"medium",large:"",bg:"primary-fade",col:"","sm:12":""}},[i("div",{staticClass:"cm-attribute"},[t._v(t._s("$viewport.size"))]),t._v(" "),i("div",{staticClass:"cm-atom"},[i("strong",[t._v(t._s(t.$viewport.size))])])]),t._v(" "),t._l(t.viewportProps,function(e){return i("n-div",{key:e,attrs:{padding:"medium",bg:t.boxColor(e),col:"","sm:12":"","lg:4":""}},[i("div",{staticClass:"cm-attribute"},[t._v(t._s("$viewport."+e))]),t._v(" "),i("div",{staticClass:"cm-atom"},[i("strong",[t._v(t._s(t.$viewport[e]))])])])})],2)],1)},[],!1,null,null,null);e.default=o.exports}}]);