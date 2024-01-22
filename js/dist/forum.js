/*! For license information please see forum.js.LICENSE.txt */
(()=>{var t,e,r,n,o={648:(t,e,r)=>{var n=r(288)["default"];function o(){"use strict";t.exports=o=function(){return r},t.exports.__esModule=!0,t.exports["default"]=t.exports;var e,r={},i=Object.prototype,a=i.hasOwnProperty,s=Object.defineProperty||function(t,e,r){t[e]=r.value},u="function"==typeof Symbol?Symbol:{},c=u.iterator||"@@iterator",l=u.asyncIterator||"@@asyncIterator",p=u.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(e){f=function(t,e,r){return t[e]=r}}function d(t,e,r,n){var o=e&&e.prototype instanceof w?e:w,i=Object.create(o.prototype),a=new A(n||[]);return s(i,"_invoke",{value:O(t,r,a)}),i}function m(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}r.wrap=d;var h="suspendedStart",v="suspendedYield",y="executing",b="completed",g={};function w(){}function k(){}function x(){}var _={};f(_,c,(function(){return this}));var L=Object.getPrototypeOf,N=L&&L(L(M([])));N&&N!==i&&a.call(N,c)&&(_=N);var S=x.prototype=w.prototype=Object.create(_);function B(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function P(t,e){function r(o,i,s,u){var c=m(t[o],t,i);if("throw"!==c.type){var l=c.arg,p=l.value;return p&&"object"==n(p)&&a.call(p,"__await")?e.resolve(p.__await).then((function(t){r("next",t,s,u)}),(function(t){r("throw",t,s,u)})):e.resolve(p).then((function(t){l.value=t,s(l)}),(function(t){return r("throw",t,s,u)}))}u(c.arg)}var o;s(this,"_invoke",{value:function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}})}function O(t,r,n){var o=h;return function(i,a){if(o===y)throw new Error("Generator is already running");if(o===b){if("throw"===i)throw a;return{value:e,done:!0}}for(n.method=i,n.arg=a;;){var s=n.delegate;if(s){var u=E(s,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===h)throw o=b,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var c=m(t,r,n);if("normal"===c.type){if(o=n.done?b:v,c.arg===g)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(o=b,n.method="throw",n.arg=c.arg)}}}function E(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator["return"]&&(r.method="return",r.arg=e,E(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=m(o,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function M(t){if(t||""===t){var r=t[c];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){for(;++o<t.length;)if(a.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}throw new TypeError(n(t)+" is not iterable")}return k.prototype=x,s(S,"constructor",{value:x,configurable:!0}),s(x,"constructor",{value:k,configurable:!0}),k.displayName=f(x,p,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===k||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,f(t,p,"GeneratorFunction")),t.prototype=Object.create(S),t},r.awrap=function(t){return{__await:t}},B(P.prototype),f(P.prototype,l,(function(){return this})),r.AsyncIterator=P,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new P(d(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},B(S),f(S,p,"Generator"),f(S,c,(function(){return this})),f(S,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=M,A.prototype={constructor:A,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(T),!t)for(var r in this)"t"===r.charAt(0)&&a.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var u=a.call(i,"catchLoc"),c=a.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),T(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;T(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:M(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},r}t.exports=o,t.exports.__esModule=!0,t.exports["default"]=t.exports},288:t=>{function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports["default"]=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports["default"]=t.exports},357:(t,e,r)=>{var n=r(648)();t.exports=n;try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}},i={};function a(t){var e=i[t];if(void 0!==e)return e.exports;var r=i[t]={exports:{}};return o[t].call(r.exports,r,r.exports,a),r.exports}a.m=o,a.n=t=>{var e=t&&t.__esModule?()=>t["default"]:()=>t;return a.d(e,{a:e}),e},e=Object.getPrototypeOf?t=>Object.getPrototypeOf(t):t=>t.__proto__,a.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"==typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"==typeof r.then)return r}var o=Object.create(null);a.r(o);var i={};t=t||[null,e({}),e([]),e(e)];for(var s=2&n&&r;"object"==typeof s&&!~t.indexOf(s);s=e(s))Object.getOwnPropertyNames(s).forEach((t=>i[t]=()=>r[t]));return i["default"]=()=>r,a.d(o,i),o},a.d=(t,e)=>{for(var r in e)a.o(e,r)&&!a.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},a.f={},a.e=t=>Promise.all(Object.keys(a.f).reduce(((e,r)=>(a.f[r](t,e),e)),[])),a.u=t=>"chunk~"+"modules"+".js",a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r={},n="module.exports:",a.l=(t,e,o,i)=>{if(r[t])r[t].push(e);else{var s,u;if(void 0!==o)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var p=c[l];if(p.getAttribute("src")==t||p.getAttribute("data-webpack")==n+o){s=p;break}}s||(u=!0,(s=document.createElement("script")).charset="utf-8",s.timeout=120,a.nc&&s.setAttribute("nonce",a.nc),s.setAttribute("data-webpack",n+o),s.src=t),r[t]=[e];var f=(e,n)=>{s.onerror=s.onload=null,clearTimeout(d);var o=r[t];if(delete r[t],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((t=>t(n))),e)return e(n)},d=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),u&&document.head.appendChild(s)}},a.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;a.g.importScripts&&(t=a.g.location+"");var e=a.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var r=e.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&!t;)t=r[n--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=t})(),(()=>{var t={315:0};a.f.j=(e,r)=>{var n=a.o(t,e)?t[e]:void 0;if(0!==n)if(n)r.push(n[2]);else if(1){var o=new Promise(((r,o)=>n=t[e]=[r,o]));r.push(n[2]=o);var i=a.p+a.u(e),s=new Error;a.l(i,(r=>{if(a.o(t,e)&&(0!==(n=t[e])&&(t[e]=void 0),n)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;s.message="Loading chunk "+e+" failed.\n("+o+": "+i+")",s.name="ChunkLoadError",s.type=o,s.request=i,n[1](s)}}),"chunk-"+e,e)}};var e=(e,r)=>{var n,o,[i,s,u]=r,c=0;if(i.some((e=>0!==t[e]))){for(n in s)a.o(s,n)&&(a.m[n]=s[n]);u&&u(a)}for(e&&e(r);c<i.length;c++)o=i[c],a.o(t,o)&&t[o]&&t[o][0](),t[o]=0},r=self["webpackChunkmodule_exports"]=self["webpackChunkmodule_exports"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})();var s={};(()=>{"use strict";a.r(s);const t=flarum.core.compat["common/app"];a.n(t)().initializers.add("nodeloc/friend-link",(function(){}));const e=flarum.core.compat["forum/app"];var r=a.n(e);const n=flarum.core.compat["extend"],o=flarum.core.compat["components/IndexPage"];var i=a.n(o);const u=flarum.core.compat["components/LinkButton"];var c=a.n(u);const l=flarum.core.compat["common/components/Dropdown"];var p=a.n(l);const f=flarum.core.compat["common/components/Button"];var d=a.n(f);function h(t,e){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},h(t,e)}function v(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,h(t,e)}const y=flarum.core.compat["components/Page"];var b=a.n(y);const g=flarum.core.compat["common/helpers/listItems"];var w=a.n(g);const k=flarum.core.compat["common/Component"];var x=function(t){function e(){return t.apply(this,arguments)||this}v(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.state=e.attrs.state},r.view=function(){var t=this,e=["recent","score"],r=app.search.cachedSearches.cardFilter?app.search.cachedSearches.cardFilter:"recent";return p().component({buttonClassName:"Button",label:app.translator.trans("nodeloc-friend-link.forum.filter."+r+"_label")},Object.keys(e).map((function(n){var o=e[n],i=r==o;return d().component({icon:!i||"fas fa-check",active:i,onclick:function(){"recent"==o&&(app.search.cachedSearches={cardFilter:"recent"},t.state.refreshParams({filter:{query:t.search},sort:"-created_time"})),"score"==o&&(app.search.cachedSearches={cardFilter:"score"},t.state.refreshParams({filter:{query:t.search},sort:"-like_count"}))}},app.translator.trans("nodeloc-friend-link.forum.filter."+o+"_label"))})))},e}(a.n(k)());const _=flarum.core.compat["common/components/Modal"];var L=a.n(_);const N=flarum.core.compat["common/components/Alert"];var S=a.n(N);const B=flarum.core.compat["common/helpers/icon"];var P=a.n(B);const O=flarum.core.compat["common/utils/ItemList"];var E=a.n(O);const j=flarum.core.compat["common/utils/classList"];var T=a.n(j);const A=flarum.core.compat["common/components/LoadingIndicator"];var M=a.n(A);function R(t,e,r,n,o,i,a){try{var s=t[i](a),u=s.value}catch(t){return void r(t)}s.done?e(u):Promise.resolve(u).then(n,o)}function C(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){R(i,n,o,a,s,"next",t)}function s(t){R(i,n,o,a,s,"throw",t)}a(void 0)}))}}var F=a(357),I=a.n(F);function D(t){var e=t.match(/data:([^;]+)/)[1],r=t.replace(/^[^,]+,/,"");return function(t,e){t=t||[],"string"==typeof(e=e||{})&&(e={type:e});try{return new Blob(t,e)}catch(o){if("TypeError"!==o.name)throw o;for(var r=new("undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder),n=0;n<t.length;n+=1)r.append(t[n]);return r.getBlob(e.type)}}([z(atob(r))],{type:e})}function z(t){for(var e=t.length,r=new ArrayBuffer(e),n=new Uint8Array(r),o=-1;++o<e;)n[o]=t.charCodeAt(o);return r}var U=function(){return a.p=r().forum.attribute("assetsBaseUrl")+"/extensions/flarum-ext-friend-link/"},G=function(){var t=C(I().mark((function t(){return I().wrap((function(t){for(;1;)switch(t.prev=t.next){case 0:return t.prev=0,U(),t.next=4,a.e(54).then(a.t.bind(a,558,23));case 4:return t.abrupt("return",t.sent["default"]);case 7:t.prev=7,t.t0=t["catch"](0),console.error("[nodeloc/friend-link] An error occurred while loading `cropperjs`.",t.t0);case 10:return t.abrupt("return",null);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}(),q=function(){var t=C(I().mark((function t(){return I().wrap((function(t){for(;1;)switch(t.prev=t.next){case 0:return t.prev=0,U(),t.next=4,a.e(54).then(a.bind(a,434));case 4:return t.abrupt("return",t.sent["default"]);case 7:t.prev=7,t.t0=t["catch"](0),console.error("[nodeloc/friend-link] An error occurred while loading `image-blob-reduce`.",t.t0);case 10:return t.abrupt("return",null);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}(),Y=function(t){function e(){return t.apply(this,arguments)||this}v(e,t);var n=e.prototype;return n.className=function(){return"FofProfileImageCropModal Modal--small"},n.title=function(){return r().translator.trans("core.forum.user.avatar_upload_button")},n.oninit=function(e){var r=this;t.prototype.oninit.call(this,e);var n=new FileReader;n.addEventListener("load",(function(){r.image=n.result,m.redraw()})),n.readAsDataURL(this.attrs.file)},n.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Image-container"},!this.ready&&m(M(),{size:"tiny"}),this.image&&m("img",{src:this.image,"data-ready":!!this.ready,onload:this.loadPicker.bind(this)})),m("br",null),this.ready&&this.cropper&&m("p",{className:"helpText"},r().translator.trans("nodeloc-friend-link.forum.modal.help_text",{disableResize:this.noResize?m("s",null):m("a",{onclick:this.disableResize.bind(this)}),disableCrop:this.cropper?m("a",{onclick:this.disableCrop.bind(this)}):m("s",null)})),m("div",{className:"Modal-buttons"},m(d(),{className:"Button Button--primary",loading:this.loading,onclick:this.upload.bind(this),disabled:!this.ready},r().translator.trans("nodeloc-friend-link.forum.modal."+(this.cropper?"submit_crop":"submit")+"_button")),m(d(),{className:"Button Button--icon Button--danger",icon:"fas fa-times",onclick:this.hide.bind(this)})))},n.loadPicker=function(){var t=C(I().mark((function t(e){var n,o,i=this;return I().wrap((function(t){for(;1;)switch(t.prev=t.next){case 0:return n=e.target||e.path[0],t.next=3,G();case 3:(o=t.sent)||(this.alertAttrs={type:"error",content:r().translator.trans("nodeloc-friend-link.forum.modal.error.failed_to_load_cropper")}),setTimeout((function(){i.ready=!0,o&&(i.cropper=new o(n,{aspectRatio:1,viewMode:1,guides:!1,background:!1,responsive:!0})),m.redraw()}),500);case 6:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}(),n.onbeforeupdate=function(e){var n=e.attrs.error;n&&(this.loading=!1,n.alert?delete this.alertAttrs:this.alertAttrs={type:"error",content:(null==n.toLocaleString?void 0:n.toLocaleString())||n},delete e.attrs.error,delete r().modal.modal.attrs.error),t.prototype.onbeforeupdate.call(this,e)},n.disableResize=function(){this.noResize=!0,m.redraw()},n.disableCrop=function(){this.cropper.destroy(),this.cropper=null,m.redraw()},n.upload=function(){var t=C(I().mark((function t(){var e,n,o,i;return I().wrap((function(t){for(;1;)switch(t.prev=t.next){case 0:if(!this.loading){t.next=2;break}return t.abrupt("return");case 2:if(this.loading=!0,this.cropper){t.next=5;break}return t.abrupt("return",this.submitBlob(D(this.image)));case 5:if(e=this.cropper.getCroppedCanvas(),!this.noResize){t.next=12;break}return t.t0=this,t.next=10,this.canvasToBlob(e);case 10:return t.t1=t.sent,t.abrupt("return",t.t0.submitBlob.call(t.t0,t.t1));case 12:return t.next=14,q();case 14:if(n=t.sent){t.next=19;break}return this.loaded(),this.disableResize(),t.abrupt("return",this.upload());case 19:return o=e,t.prev=20,t.next=23,this.canvasToBlob(e);case 23:return i=t.sent,t.next=26,n().toCanvas(i,{max:100});case 26:o=t.sent,t.next=36;break;case 29:return t.prev=29,t.t2=t["catch"](20),console.error("[nodeloc/friend-link] An error occurred while resizing the image.",t.t2),this.alertAttrs={type:"error",content:"ERR_GET_IMAGE_DATA"===t.t2.code?r().translator.trans("nodeloc-friend-link.forum.modal.error.get_image_data"):r().translator.trans("nodeloc-friend-link.forum.modal.error.generic_resize")},this.loaded(),this.disableCrop(),t.abrupt("return");case 36:return t.t3=this,t.next=39,this.canvasToBlob(o);case 39:return t.t4=t.sent,t.abrupt("return",t.t3.submitBlob.call(t.t3,t.t4));case 41:case"end":return t.stop()}}),t,this,[[20,29]])})));return function(){return t.apply(this,arguments)}}(),n.canvasToBlob=function(){var t=C(I().mark((function t(e){return I().wrap((function(t){for(;1;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){return e.toBlob(t)})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),n.submitBlob=function(){var t=C(I().mark((function t(e){var r;return I().wrap((function(t){for(;1;)switch(t.prev=t.next){case 0:return r=new File([e],this.attrs.file.name,{type:this.attrs.file.type}),t.abrupt("return",this.attrs.upload(r));case 2:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}(),e}(L());Y.isDismissible=!1;var H=function(t){function e(){for(var e,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))||this).savedState={},e}v(e,t);var n=e.prototype;return n.oninit=function(e){t.prototype.oninit.call(this,e),this.user=e.attrs.user||r().session.user},n.title=function(){return r().translator.trans("nodeloc-friend-link.forum.title.share_my_site")},n.className=function(){return"Modal--large"},n.oncreate=function(e){t.prototype.oncreate.call(this,e)},n.onremove=function(){},n.content=function(){if(this.user)return m("div",null,m("div",{className:"Modal-body"},m("p",{style:"margin-bottom: 20px;font-size:15px"},r().translator.trans("nodeloc-friend-link.forum.tips.upload_tips")),m("div",{style:"margin-bottom: 20px;"},m("input",{className:"FormControl",type:"text",id:"sitename",placeholder:r().translator.trans("Site Name")})),m("div",{style:"margin-bottom: 20px;"},m("input",{className:"FormControl",type:"text",id:"siteurl",placeholder:r().translator.trans("Site URL")})),m("h3",null,"上传您的图片："),m("div",null,m("div",{className:T()(["SitelogoEditor","Dropdown",this.attrs.className,this.loading&&"loading",this.isDraggedOver&&"dragover"])},m("a",{className:this.user.avatarUrl()?"Dropdown-toggle":"Dropdown-toggle AvatarEditor--noAvatar",title:r().translator.trans("core.forum.user.avatar_upload_tooltip"),"data-toggle":"dropdown",onclick:this.quickUpload.bind(this),ondragover:this.enableDragover.bind(this),ondragenter:this.enableDragover.bind(this),ondragleave:this.disableDragover.bind(this),ondragend:this.disableDragover.bind(this),ondrop:this.dropUpload.bind(this)},this.loading?m(M(),{display:"unset",size:"large"}):P()("fas fa-plus-circle")),m("ul",{className:"Dropdown-menu Menu"},w()(this.controlItems().toArray()))))),m("div",{className:"Modal-footer"},m(d(),{className:"Button Button--primary"},"确认"),m(d(),{oclassName:"Button"},"取消")))},n.controlItems=function(){var t=new(E());return t.add("upload",m(d(),{icon:"fas fa-upload",onclick:this.openPicker.bind(this)},r().translator.trans("core.forum.user.avatar_upload_button"))),t.add("remove",m(d(),{icon:"fas fa-times",onclick:this.remove.bind(this)},r().translator.trans("core.forum.user.avatar_remove_button"))),t},n.enableDragover=function(t){t.preventDefault(),t.stopPropagation(),this.isDraggedOver=!0},n.disableDragover=function(t){t.preventDefault(),t.stopPropagation(),this.isDraggedOver=!1},n.dropUpload=function(t){t.preventDefault(),t.stopPropagation(),this.isDraggedOver=!1,this.upload(t.dataTransfer.files[0])},n.quickUpload=function(t){t.preventDefault(),t.stopPropagation(),this.openPicker()},n.openPicker=function(){var t=this;this.loading||$('<input type="file" accept=".jpg, .jpeg, .png, .bmp, .gif">').appendTo("body").hide().click().on("input",(function(e){t.upload($(e.target)[0].files[0])}))},n.upload=function(t){t&&window.FileReader&&(this.loading||r().modal.show(Y,{file:t,upload:this.uploadfile}))},n.uploadfile=function(t){var n=this;if(!this.loading){var o=r().session.user,i=new FormData;i.append("avatar",t),this.loading=!0,m.redraw(),console.log(this),r().request({method:"POST",url:r().forum.attribute("apiUrl")+"/users/"+o.id()+"/avatar",serialize:function(t){return t},body:i}).then((function(t){return n.success(t)}),(function(t){return n.failure(t)}))["finally"]((function(){r().modal.show(e)}))}},n.remove=function(){this.user,this.loading=!0,m.redraw()},n.success=function(t){r().store.pushPayload(t),delete this.user.avatarColor,this.loading=!1,m.redraw(),r().modal.close()},n.failure=function(t){this.loading=!1,m.redraw(),r().modal&&r().modal.modal&&r().modal.modal.componentClass===Y&&(r().modal.modal.attrs.error=error,m.redraw())},n.onConfirmSubmit=function(t){var e=this;r().request({method:"POST",url:r().forum.attribute("apiUrl")+"/nodeloc/friend_link/add",body:{uuidList,width,height},sitename:document.getElementById("sitename").value,siteurl:document.getElementById("siteurl").value}).then((function(){r().alerts.show(S(),{type:"success"},"分享成功"),e.hide(),e.state.refresh()}))},e}(L());const K=flarum.core.compat["components/LoadingIndicator"];var W=a.n(K);flarum.core.compat["helpers/avatar"],flarum.core.compat["components/Link"];const J=flarum.core.compat["components/LogInModal"];var Q=a.n(J),V=function(t){function e(){return t.apply(this,arguments)||this}v(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.show_id=e.attrs.show_id},r.title=function(){return"是否删除您分享的卡片"},r.className=function(){return"HideCardLinkModal Modal--small"},r.content=function(){var t=this;return m("div",{className:"Modal-footer"},m(d(),{className:"Button Button--primary m-r-10",onclick:function(){return t.hideReq(t.show_id)}},"确定"),m(d(),{className:"Button",onclick:function(){t.hide()}},"取消"))},r.hideReq=function(t){var e=this;app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/nodeloc/friend_link/hide",body:{show_id:t}}).then((function(){app.alerts.show(S(),{type:"success"},"删除成功"),e.hide(),document.getElementById("card-"+t).style.display="none"}))},e}(L()),X=function(t){function e(){return t.apply(this,arguments)||this}v(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.bodyClass="App--index",app.setTitle(app.translator.trans("nodeloc-friend-link.forum.title.page_title")),app.friendLinkListState.refreshParams({filter:{},sort:"-created_time"})},r.view=function(){var t=this,e=null,r=app.friendLinkListState;return r.isInitialLoading()||r.isLoadingNext()?e=W().component({size:"large"}):r.hasNext()&&(e=d().component({className:"Button",icon:"fas fa-chevron-down",onclick:r.loadNext.bind(r)},"加载更多")),r.isInitialLoading()&&r.isEmpty()?m(W(),null):m("div",{className:"IndexPage"},i().prototype.hero(),m("div",{className:"container"},m("div",{className:"sideNavContainer"},m("nav",{className:"IndexPage-nav sideNav"},m("ul",null,w()(i().prototype.sidebarItems().toArray()))),m("div",{className:"IndexPage-results sideNavOffset"},m("div",null,m(x,{state:r}),m(d(),{className:"Button friendLink-fresh",icon:"fas fa-sync","aria-label":"刷新",onclick:function(){r.refresh()}}),m(d(),{className:"Button friendLink-upload-botton",icon:"fas fa-plus",onclick:function(){app.session.user?app.modal.show(H,{state:r}):app.modal.show(Q())}},app.translator.trans("nodeloc-friend-link.forum.button.share_my_site"))),m("ul",{className:"FriendLink-SiteList"},r.getPages().map((function(e){return e.items.map((function(e){return e.status()&&m("li",{className:"FriendLink-SiteList-item",id:"card-"+e.id()},m("a",{href:e.siteurl(),style:"text-decoration: none;"},m("div",{className:"FriendLink-SiteList-logo"},m("img",{className:"Sitelogo",loading:"lazy",src:e.img_list()[0]})),m("div",{className:"FriendLink-SiteList-site"},m("a",{href:e.siteurl(),target:"_blank",rel:"noopener noreferrer"},e.sitename())),m("div",{className:"FriendLink-SiteList-user"},m("span",{className:"username"}," ",m("a",{href:app.route("user",{username:e.uid()})},e.user().username())))),m("div",{className:"action-buttons"},t.likeButton(e,r),t.exchangeButton(e,t)))}))}))),m("div",{className:"SupportSearchList-loadMore friendLink-more"},e)))))},r.getClass=function(t,e){return t>e||e<1e3?"tall":"taller"},r.likeStatus=function(t){return t>0&&t<1e3?t:t>=1e3?t/1e3+"k":""},r.viewer=function(t){var e=t.view_count();return e>=1e3&&(e=e/1e3+"k"),m(d(),{className:"Button viewer",icon:"far fa-eye","aria-label":"浏览量",disable:!0},e)},r.likeButton=function(t,e){var r=this;return m(d(),{className:"Button like",icon:t.is_my_like()?"fas fa-thumbs-up":"far fa-thumbs-up","aria-label":"点赞",onclick:function(){app.session.user?r.like(t.id(),e):app.modal.show(Q())}},this.likeStatus(t.like_count()))},r.like=function(t,e){app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/nodeloc/friend_link/like",body:{show_id:t}}).then((function(e){if(e.status){$("#card-"+t+" .action .like i").removeClass("far fa-thumbs-up"),$("#card-"+t+" .action .like i").addClass("fas fa-thumbs-up");var r=$("#card-"+t+" .action .like span").text();r||(r=0);var n=parseInt(r)+1;return r>=1e3&&(n=r/1e3+"k"),void $("#card-"+t+" .action .like span").text(n)}}))},r.exchangeButton=function(t,e){if(app.session.user&&app.session.user.isAdmin()||app.session.user&&app.session.user.data.id===t.user().id())return m(d(),{className:"Button bulk",icon:"fas fa-trash","aria-label":"删除卡片",onclick:function(){app.session.user?app.modal.show(V,{show_id:t.id()}):app.modal.show(Q())}})},e}(b());const Z=flarum.core.compat["common/extend"],tt=flarum.core.compat["forum/states/GlobalSearchState"];var et=a.n(tt),rt=function(){function t(){this.user=null,this.files=[],this.moreResults=!1,this.loading=!1}var e=t.prototype;return e.setUser=function(t){t!==this.user&&(this.user=t,this.files=[],this.loadResults())},e.loadResults=function(t){if(void 0===t&&(t=0),this.user)return this.loading=!0,r().store.find("fof/uploads",{filter:{user:this.user.id()},page:{offset:t}}).then(this.parseResults.bind(this))},e.loadMore=function(){this.loading=!0,this.loadResults(this.files.length).then(this.parseResults.bind(this))},e.parseResults=function(t){var e;return(e=this.files).push.apply(e,t),this.loading=!1,this.moreResults=!!t.payload.links&&!!t.payload.links.next,m.redraw(),t},e.addToList=function(t){var e;Array.isArray(t)?(e=this.files).unshift.apply(e,t):this.files.unshift(t)},e.hasFiles=function(){return this.files.length>0},e.isLoading=function(){return this.loading},e.hasMoreResults=function(){return this.moreResults},e.empty=function(){return!this.hasFiles()&&!this.isLoading()},t}();function nt(t){return nt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},nt(t)}function ot(t){var e=function(t,e){if("object"!=nt(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=nt(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==nt(e)?e:String(e)}function it(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,ot(n.key),n)}}const at=flarum.core.compat["common/states/PaginatedListState"];var st=function(t){function e(e,r){var n;return void 0===r&&(r=1),(n=t.call(this,e,r,12)||this).friendLinkList=[],n}var r,n,o;return v(e,t),r=e,(n=[{key:"type",get:function(){return"friend_link_list"}}])&&it(r.prototype,n),o&&it(r,o),Object.defineProperty(r,"prototype",{writable:!1}),e}(a.n(at)());const ut=flarum.core.compat["Model"];var ct=a.n(ut);const lt=flarum.core.compat["utils/mixin"];var pt=function(t){function e(){return t.apply(this,arguments)||this}return v(e,t),e.prototype.apiEndpoint=function(){return"/friend_link_list"+(this.exists?"/"+this.data.id:"")},e}(a.n(lt)()(ct(),{id:ct().attribute("id"),img_list:ct().attribute("img_list"),created_time:ct().attribute("created_time"),user:ct().hasOne("user"),uid:ct().attribute("uid"),width:ct().attribute("cover_width"),height:ct().attribute("cover_height"),like_count:ct().attribute("like_count"),view_count:ct().attribute("view_count"),exchange_count:ct().attribute("exchange_count"),is_my_like:ct().attribute("is_my_like"),status:ct().attribute("status"),sitename:ct().attribute("sitename"),siteurl:ct().attribute("siteurl")}));const ft=flarum.core.compat["forum/components/Notification"];var dt=function(t){function e(){return t.apply(this,arguments)||this}v(e,t);var r=e.prototype;return r.icon=function(){return"fas fa-camera-retro"},r.href=function(){return app.route("friendlink")},r.content=function(){var t=this.attrs.notification.fromUser();return app.translator.trans("nodeloc-friend-link.forum.notification.like",{user:t})},r.excerpt=function(){return m("div",null)},e}(a.n(ft)());const mt=flarum.core.compat["forum/components/NotificationGrid"];var ht=a.n(mt);r().initializers.add("nodeloc/flarum-ext-friend-link",(function(){r().routes.friendlink={path:"/friendlink",component:X},r().notificationComponents.friendLinkLiked=dt,r().store.models.friendLinkList=pt,r().friendLinkListState=new st,r().fileListState=new rt,(0,n.extend)(i().prototype,"navItems",(function(t){return t.add("friendlink",m(c(),{icon:"fas fa-camera-retro",href:app.route("friendlink")},app.translator.trans("nodeloc-friend-link.forum.title.page_title")),15),t})),(0,Z.extend)(et().prototype,"params",(function(t){"friendlink"===r().current.get("routeName")&&(t.cardFilter="")})),(0,Z.extend)(ht().prototype,"notificationTypes",(function(t){t.add("friendLinkLiked",{name:"friendLinkLiked",icon:"fas fa-camera-retro",label:"有人对您分享的卡片表示很赞"})}))}))})(),module.exports=s})();
//# sourceMappingURL=forum.js.map