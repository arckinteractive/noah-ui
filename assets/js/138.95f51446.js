(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{987:function(e,t,a){"use strict";a.r(t);var s={data:function(){return{model:{message:"",captcha:""}}},methods:{submitForm:function(){return new Promise(function(e){setTimeout(e,1e3)})},formSubmitted:function(){this.$alert("Thank you for your message"),this.model.message="",this.model.captcha="",this.$refs.recaptcha.reset()},verifyCaptcha:function(e){return new Promise(function(e,t){setTimeout(e,1e3)})}}},o=a(1),n=Object(o.a)(s,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("n-div",{attrs:{flex:"","center-top":""}},[a("n-div",{attrs:{col:"","sm:12":"","md:6":""}},[a("n-div",{attrs:{flex:"",stacked:"",stretched:""}},[a("n-form",{on:{submit:e.submitForm,done:e.formSubmitted},scopedSlots:e._u([{key:"footer",fn:function(e){var t=e.saving;return[a("n-div",{staticClass:"footer",attrs:{flex:"","left-center":"","margin-top":"medium"}},[a("n-button",{staticStyle:{width:"100%"},attrs:{type:"submit",color:"secondary",text:"Send Message",icon:"fas fa-paper-plane",size:"large",loading:t}})],1)]}}])},[a("n-div",{attrs:{flex:"",gap:"small",stacked:"",stretched:""}},[a("n-text-field",{attrs:{label:"Message",type:"textarea",placeholder:"Type a message to initialize captcha",required:"","validation-events":[]},model:{value:e.model.message,callback:function(t){e.$set(e.model,"message",t)},expression:"model.message"}}),e._v(" "),e.model.message?a("n-recaptcha",{ref:"recaptcha",attrs:{"verify-callback":e.verifyCaptcha},model:{value:e.model.captcha,callback:function(t){e.$set(e.model,"captcha",t)},expression:"model.captcha"}}):e._e()],1)],1)],1)],1),e._v(" "),a("n-div",{attrs:{col:"","sm:12":"","md:6":""}},[a("n-codemirror",{attrs:{label:"Model data",options:{readOnly:!0,mode:"application/json"},modes:["javascript"],value:JSON.stringify(e.model,null,2)}})],1)],1)},[],!1,null,null,null);t.default=n.exports}}]);