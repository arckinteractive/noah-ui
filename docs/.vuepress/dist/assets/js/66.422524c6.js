(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{858:function(e,t,n){"use strict";n.r(t);var s={components:{NCheckbox:n(75).default},data:function(){return{model:{username:"",password:"",persistent:!1}}},methods:{sendData:function(){return new Promise(function(e){setTimeout(function(){e()},2e3)})},onDone:function(){this.$alert("Data has been sent")}}},o=n(0),a=Object(o.a)(s,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("n-div",{attrs:{flex:"","center-center":""}},[n("n-form",{staticClass:"col-12 md:col-6",on:{done:e.onDone,submit:e.sendData},scopedSlots:e._u([{key:"footer",fn:function(e){var t=e.saving;return n("n-div",{attrs:{"margin-top":"medium"}},[n("n-div",{attrs:{flex:"","left-center":""}},[n("n-button",{staticClass:"col-12",attrs:{loading:t,icon:"fas fa-shield-alt",large:"",secondary:"",text:"Login Securely",type:"submit"}})],1)],1)}}])},[n("n-div",{attrs:{flex:"",stacked:"",stretched:"",gap:"small"}},[n("n-text-field",{attrs:{large:"",placeholder:"Username","prefix-icon":"fas fa-user",required:"",autocomplete:"off"},model:{value:e.model.username,callback:function(t){e.$set(e.model,"username",t)},expression:"model.username"}}),e._v(" "),n("n-text-field",{attrs:{large:"",placeholder:"Password","prefix-icon":"fas fa-lock",required:"",type:"password",autocomplete:"off"},model:{value:e.model.password,callback:function(t){e.$set(e.model,"password",t)},expression:"model.password"}}),e._v(" "),n("n-checkbox",{model:{value:e.model.persistent,callback:function(t){e.$set(e.model,"persistent",t)},expression:"model.persistent"}},[e._v("Remember Me\n            ")])],1)],1)],1)},[],!1,null,null,null);t.default=a.exports}}]);