(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{740:function(e,t,s){"use strict";s.r(t);var n=s(77),a={name:"ComponentSlots",props:{data:{type:Array}},computed:{headers:function(){return[{prop:"name",label:"Name",width:"20%"},{prop:"description",label:"Description / Props",width:"80%"}]},propHeaders:function(){return[{prop:"name",label:"Name",width:"20%"},{prop:"type",label:"Type",width:"15%"},{prop:"description",label:"Description",width:"40%"}]}},methods:{normalize:function(e){return"__undefined__"!==e?e:"--"},markdown:n.default}},r=s(2),o=Object(r.a)(a,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("n-table",{attrs:{headers:e.headers,items:e.data}},[s("n-table-body",{attrs:{headers:e.headers,items:e.data},scopedSlots:e._u([{key:"name",fn:function(t){var n=t.item;return[s("span",{staticClass:"cm-attribute"},[e._v(e._s(e.normalize(n.name)))])]}},{key:"description",fn:function(t){var n=t.item;return[s("p",{domProps:{innerHTML:e._s(e.markdown(n.description))}}),e._v(" "),s("n-table",{attrs:{headers:e.propHeaders,items:n.props}},[s("div",{attrs:{slot:"headers"},slot:"headers"}),e._v(" "),s("n-table-body",{attrs:{headers:e.propHeaders,items:n.props},scopedSlots:e._u([{key:"name",fn:function(t){var n=t.item;return[s("span",{staticClass:"cm-attribute"},[e._v(e._s(e.normalize(n.name)))])]}},{key:"type",fn:function(t){var n=t.item;return[s("span",{staticClass:"cm-type"},[e._v(e._s(e.normalize(n.type)))])]}}],null,!0)},[s("template",{slot:"noResults"},[s("span",{staticClass:"n-help"},[e._v("This slot has no scoped props")])])],2)],1)]}}])},[s("template",{slot:"noResults"},[s("span",{staticClass:"n-help"},[e._v("This component does not render any parent slots")])])],2)],1)},[],!1,null,null,null);t.default=o.exports}}]);