(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{763:function(t,e,r){"use strict";r.r(e);r(12),r(5),r(7);var n=r(4);r(118),r(179);function a(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}var i={name:"Sidebar",computed:{items:function(){var t=this;return this.$site.pages.filter(function(t){return!!t.frontmatter.label}).map(function(e){var r=e.frontmatter,i=function(t){var e=(t.path||"/").substr(1).split("/"),r=e.pop().replace(/.html$/gi,"");return{parentId:e.join("::"),id:r}}(e),o=i.id,c=i.parentId;return function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(r,!0).forEach(function(e){Object(n.a)(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}({},r,{title:r.label||r.title||e.title,to:{path:e.path},expanded:!1,selected:t.$route.path===e.path,badge:r.badge?{title:r.badge,value:r.badge.substr(0,1),color:r.badgeColor||"neutral",circle:!0}:null,parentId:c,id:o})})}}},o=r(1),c=Object(o.a)(i,function(){var t=this.$createElement,e=this._self._c||t;return e("n-div",{attrs:{bg:"white"}},[e("n-menu",{attrs:{items:this.items}})],1)},[],!1,null,null,null);e.default=c.exports}}]);