(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{665:function(e,t,s){"use strict";s.r(t);s(32);var n={components:{NTextField:s(72).default},data:function(){return{query:"",focused:!1,focusIndex:0}},computed:{showSuggestions:function(){return this.focused&&this.query.length>0},suggestions:function(){var e=this,t=this.query.trim().toLowerCase();if(t){for(var s=this.$site,n=s.pages,o=s.themeConfig.searchMaxSuggestions||5,i=this.$localePath,u=function(e){return e.title&&e.title.toLowerCase().indexOf(t)>-1},r=[],a=0;a<n.length&&!(r.length>=o);a++){var c=n[a];if(this.getPageLocalePath(c)===i)if(u(c))r.push(c);else if(c.headers)for(var h=0;h<c.headers.length&&!(r.length>=o);h++){var l=c.headers[h];u(l)&&r.push(Object.assign({},c,{path:c.path+"#"+l.slug,header:l}))}}return r.map(function(t,s){return{title:t.header?t.header.title:t.title||t.path,subtitle:t.header?t.title:"",to:t.path,selected:s===e.focusIndex}})}}},methods:{getPageLocalePath:function(e){for(var t in this.$site.locales||{})if("/"!==t&&0===e.path.indexOf(t))return t;return"/"},onUp:function(){this.showSuggestions&&(this.focusIndex>0?this.focusIndex--:this.focusIndex=this.suggestions.length-1)},onDown:function(){this.showSuggestions&&(this.focusIndex<this.suggestions.length-1?this.focusIndex++:this.focusIndex=0)},go:function(e){this.showSuggestions&&(this.$router.push(this.suggestions[e].path),this.query="",this.focusIndex=0)},focus:function(e){this.focusIndex=e||0,this.focused=!0},unfocus:function(){var e=this;this.focusIndex=-1,setTimeout(function(){e.focused=!1},500)}}},o=s(0),i=Object(o.a)(n,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"search-box"},[s("n-popup",{staticClass:"suggestions",attrs:{visible:e.showSuggestions,placement:"bottom-start","open-on-click":!1,small:""},on:{click:function(e){e.stopPropagation()},mouseleave:e.unfocus}},[s("div",{attrs:{slot:"trigger"},slot:"trigger"},[s("n-text-field",{attrs:{"aria-label":"Search",autocomplete:"off",placeholder:"Search","prefix-icon":"fas fa-search",spellcheck:"false"},on:{keyup:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"])?null:e.onDown(t)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.go(e.focusIndex)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"])?null:e.onUp(t)}],focus:e.focus,blur:e.unfocus},model:{value:e.query,callback:function(t){e.query=t},expression:"query"}})],1),e._v(" "),e.suggestions&&e.suggestions.length?s("n-menu",{attrs:{accordion:!1,items:e.suggestions}}):s("n-div",{attrs:{padding:"small"}},[e._v("\n            There are not items matching your search\n        ")])],1)],1)},[],!1,null,null,null);t.default=i.exports}}]);