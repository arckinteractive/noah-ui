(window.webpackJsonp=window.webpackJsonp||[]).push([[15,27],{597:function(t,e,n){"use strict";n.r(e);var r=n(4),i=(n(65),n(78),{name:"Sidebar",components:{NMenu:n(80).default},computed:{items:function(){var t=this;return this.$site.pages.filter(function(t){return!!t.frontmatter.label}).map(function(e){var n=e.frontmatter,i=function(t){var e=(t.path||"/").substr(1).split("/"),n=e.pop().replace(/.html$/gi,"");return{parentId:e.join("::"),id:n}}(e),a=i.id,l=i.parentId;return Object(r.a)({},n,{title:n.label||n.title||e.title,to:{path:e.path},expanded:!1,selected:t.$route.path===e.path,parentId:l,id:a})})}}}),a=n(2),l=Object(a.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("n-div",{attrs:{bg:"white"}},[e("n-menu",{attrs:{items:this.items}})],1)},[],!1,null,null,null);e.default=l.exports},720:function(t,e,n){"use strict";n.r(e);var r={components:{Sidebar:n(597).default}},i=n(2),a=Object(i.a)(r,function(){var t=this.$createElement,e=this._self._c||t;return e("ClientOnly",[e("n-popup",{attrs:{placement:"right-start"}},[e("n-button",{attrs:{slot:"trigger",primary:"",circle:"",icon:"fas fa-ellipsis-h"},slot:"trigger"}),this._v(" "),e("Sidebar")],1)],1)},[],!1,null,null,null);e.default=a.exports}}]);