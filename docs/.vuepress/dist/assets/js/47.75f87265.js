(window.webpackJsonp=window.webpackJsonp||[]).push([[47,63],{763:function(t,e,r){"use strict";r.r(e);r(12),r(5),r(7);var n=r(4);r(118),r(179);function i(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}var a={name:"Sidebar",computed:{items:function(){var t=this;return this.$site.pages.filter(function(t){return!!t.frontmatter.label}).map(function(e){var r=e.frontmatter,a=function(t){var e=(t.path||"/").substr(1).split("/"),r=e.pop().replace(/.html$/gi,"");return{parentId:e.join("::"),id:r}}(e),o=a.id,l=a.parentId;return function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(r,!0).forEach(function(e){Object(n.a)(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}({},r,{title:r.label||r.title||e.title,to:{path:e.path},expanded:!1,selected:t.$route.path===e.path,badge:r.badge?{title:r.badge,value:r.badge.substr(0,1),color:r.badgeColor||"neutral",circle:!0}:null,parentId:l,id:o})})}}},o=r(1),l=Object(o.a)(a,function(){var t=this.$createElement,e=this._self._c||t;return e("n-div",{attrs:{bg:"white"}},[e("n-menu",{attrs:{items:this.items}})],1)},[],!1,null,null,null);e.default=l.exports},975:function(t,e,r){"use strict";r.r(e);var n={components:{Sidebar:r(763).default}},i=r(1),a=Object(i.a)(n,function(){var t=this.$createElement,e=this._self._c||t;return e("n-popup",{attrs:{placement:{sm:"right-start"}}},[e("n-button",{attrs:{slot:"trigger",primary:"",circle:"",icon:"fas fa-ellipsis-h"},slot:"trigger"}),this._v(" "),e("Sidebar")],1)},[],!1,null,null,null);e.default=a.exports}}]);