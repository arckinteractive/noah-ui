(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{732:function(e,t,n){"use strict";n.r(t);var i={methods:{archive:function(){var e=this;this.$confirm("Are you sure want to archive this post?","Archive",{type:"warning"}).then(function(){e.$alert("Item archived")}).catch(function(){e.$alert("Archiving has been cancelled")})},deletePermanently:function(){var e=this;this.$confirm("Are you sure want to permanently delete this post?","Delete",{type:"danger",cancelButton:{text:"Never Mind",outlined:!0},confirmButton:{text:"Delete",color:"danger"}}).then(function(){e.$alert("Item deleted")}).catch(function(){e.$alert("Delete has been cancelled")})}}},r=n(2),c=Object(r.a)(i,function(){var e=this.$createElement,t=this._self._c||e;return t("n-div",{attrs:{flex:"","left-center":""}},[t("n-button",{attrs:{"prefix-icon":"fas fa-archive"},on:{click:this.archive}},[this._v("Archive\n    ")]),this._v(" "),t("n-button",{attrs:{danger:"","prefix-icon":"fas fa-trash"},on:{click:this.deletePermanently}},[this._v("Delete\n    ")])],1)},[],!1,null,null,null);t.default=c.exports}}]);