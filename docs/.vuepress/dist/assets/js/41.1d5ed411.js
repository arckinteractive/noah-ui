(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{479:function(e,t,n){"use strict";var a=n(739)({});t.a=function(e){return"string"==typeof e&&e?a.render(e):""}},947:function(e,t,n){"use strict";n.r(t);var a=n(479),r={name:"ComponentConfig",props:{data:{type:Array}},computed:{headers:function(){return[{prop:"name",label:"Name",width:"15%"},{prop:"type",label:"Type",width:"15%"},{prop:"value",label:"Value",width:"40%"}]}},methods:{normalize:function(e){return"__undefined__"!==e?e:"--"},markdown:a.a}},s=n(1),o=Object(s.a)(r,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("n-table",{attrs:{headers:e.headers,items:e.data},scopedSlots:e._u([{key:"name",fn:function(t){var a=t.item;return[n("span",{staticClass:"cm-attribute component-meta__item"},[e._v(e._s(e.normalize(a.name)))])]}},{key:"type",fn:function(t){var a=t.item;return[n("span",{staticClass:"cm-type"},[e._v(e._s(e.normalize(a.type)))])]}},{key:"value",fn:function(t){var a=t.item;return[n("span",{staticClass:"cm-atom"},[e._v(e._s(e.normalize(a.value)))])]}},{key:"description",fn:function(t){var a=t.item;return[n("span",{staticClass:"cm-atom",domProps:{innerHTML:e._s(e.markdown(a.description))}})]}}])},[n("template",{slot:"noResults"},[n("span",{staticClass:"n-help"},[e._v("This component has no configuration options")])])],2)},[],!1,null,null,null);t.default=o.exports}}]);