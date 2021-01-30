(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const t=function(){function t(e,n,r,o,i,a,c,u,s,l){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._id=e,this._name=n,this._link=r,this._likes=o,this._api=i,this._userId=a,this._ownerId=c,this._onRemove=u,this._selector=s,this._handleCardClick=l}var n,r,o;return n=t,o=[{key:"removeCard",value:function(e){document.getElementById(e).remove()}}],(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._selector).content.querySelector(".photo-card").cloneNode(!0)}},{key:"_calculateLikes",value:function(e){e.querySelector(".photo-card__like-count").textContent=this._likes.length}},{key:"_setEventListeners",value:function(e){var t=this;e.querySelector(".photo-card__image").addEventListener("click",this._handleCardClick.bind(this,this._name,this._link)),e.querySelector(".photo-card__btn-like").addEventListener("click",(function(n){n.target.classList.contains("photo-card__btn-like_active")?t._api.unLikeCard(t._id).then((function(r){n.target.classList.toggle("photo-card__btn-like_active"),t._likes=r.likes,t._calculateLikes(e)})).catch((function(e){console.log(e)})):t._api.likeCard(t._id).then((function(r){n.target.classList.toggle("photo-card__btn-like_active"),t._likes=r.likes,t._calculateLikes(e)})).catch((function(e){console.log(e)}))}));var n=e.querySelector(".photo-card__btn-remove");n&&n.addEventListener("click",this._onRemove)}},{key:"generateCard",value:function(){var e=this._getTemplate();e.id=this._id;var t=e.querySelector(".photo-card__image");t.src=this._link,t.alt=this._name,e.querySelector(".photo-card__title").textContent=this._name,e.querySelector(".photo-card__like-count").textContent=this._likes.length;for(var n=!1,r=0;r<this._likes.length;r++)this._likes[r]._id===this._userId&&(n=!0);return n&&e.querySelector(".photo-card__btn-like").classList.add("photo-card__btn-like_active"),this._userId!==this._ownerId&&e.querySelector(".photo-card__btn-remove").remove(),this._setEventListeners(e),e}}])&&e(n.prototype,r),o&&e(n,o),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const o=function(){function e(t,n){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,"_showInputError",(function(e){o._form.querySelector("#".concat(e.id,"-error")).textContent=e.validationMessage,e.classList.add(o._config.errorClass)})),r(this,"_hideInputError",(function(e){var t=o._form.querySelector("#".concat(e.id,"-error"));e.classList.remove(o._config.errorClass),t.textContent=""})),r(this,"_checkInputValidity",(function(e){e.validity.valid?o._hideInputError(e):o._showInputError(e)})),this._config=t,this._form=document.querySelector(n)}var t,o;return t=e,(o=[{key:"_setButtonState",value:function(e,t){t?(e.classList.remove(this._config.buttonInvalidClass),e.disabled=!1):(e.classList.add(this._config.buttonInvalidClass),e.disabled=!0)}},{key:"_setEventListeners",value:function(){var e=this,t=this._form.querySelectorAll(this._config.inputSelector),n=this._form.querySelector(this._config.submitButtonSelector);t.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._setButtonState(n,e._form.checkValidity())}))}))}},{key:"enableValidation",value:function(){this._setEventListeners(),this._form.addEventListener("submit",(function(e){e.preventDefault()}));var e=this._form.querySelector(this._config.submitButtonSelector);this._setButtonState(e,this._form.checkValidity()),this._form.classList.add("validated")}}])&&n(t.prototype,o),e}();function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const a=function(){function e(t,n){var r=t.items,o=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=o,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(){var e=this;this._renderedItems.forEach((function(t){return e._renderer(t)}))}},{key:"appendItem",value:function(e){this._container.append(e)}},{key:"prependItem",value:function(e){this._container.prepend(e)}}])&&i(t.prototype,n),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._btnClose=this._popup.querySelector(".popup__btn-close"),this._image=this._popup.querySelector(".popup-image__image")}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),this._popup.addEventListener("click",this._handleOverlayClose),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),this._popup.removeEventListener("click",this._handleOverlayClose),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._btnClose.addEventListener("click",(function(){return e.close()})),this._popup.addEventListener("click",(function(t){(t.target.classList.contains("popup")||t.target.classList.contains("popup__close"))&&e.close()}))}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target.classList.contains("popup")&&this.close()}}])&&c(t.prototype,n),e}();function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,t,n){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function h(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(r);if(o){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._image=t._popup.querySelector(".popup-image__image"),t._caption=t._popup.querySelector(".popup-image__caption"),t}return t=a,(n=[{key:"open",value:function(e){this._image.src=e.link,this._caption.textContent=e.name,this._image.alt=e.name,p(_(a.prototype),"open",this).call(this)}}])&&l(t.prototype,n),a}(u);function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(e,t,n){return(y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=g(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function k(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var S=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=g(r);if(o){var n=g(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._submitCallback=t,n._form=n._popup.querySelector(".popup-form"),n._submitButton=n._form.querySelector(".popup-form__btn-submit"),n._buttonText=n._submitButton.textContent,n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this._form.querySelectorAll(".popup-form__input"),t={};return e.forEach((function(e){t[e.name]=e.value})),t}},{key:"_submit",value:function(e){e.preventDefault(),this._submitButton.textContent="Сохранение...",this._submitButton.disabled=!0,this._submitCallback(this._getInputValues(),this.close.bind(this))}},{key:"setEventListeners",value:function(){this._form.addEventListener("submit",this._submit.bind(this)),y(g(a.prototype),"setEventListeners",this).call(this)}},{key:"close",value:function(){this._form.removeEventListener("submit",this._submit.bind(this)),this._form.reset(),this._submitButton.textContent=this._buttonText,this._form.classList.contains("validated")?(this._submitButton.classList.add("popup-form__btn-submit_invalid"),this._submitButton.disabled=!0):this._submitButton.disabled=!1,y(g(a.prototype),"close",this).call(this)}}])&&m(t.prototype,n),a}(u);function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const C=function(){function e(t){var n=t.nameSelector,r=t.aboutSelector,o=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameSelector=document.querySelector(n),this._aboutSelector=document.querySelector(r),this._avatarSelector=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{id:this._id,name:this._nameSelector.textContent,about:this._aboutSelector.textContent,avatar:this._avatarSelector.src}}},{key:"setUserInfo",value:function(e,t,n,r){this._id=e,this._nameSelector.textContent=t,this._aboutSelector.textContent=n,this._avatarSelector.src=r}}])&&w(t.prototype,n),e}();function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var L=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var t,n;return t=e,(n=[{key:"_checkResult",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getUser",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(t){return e._checkResult(t)}))}},{key:"getCards",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((function(t){return e._checkResult(t)}))}},{key:"setUser",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e["popup-form-name"],about:e["popup-form-about"]})}).then((function(e){return t._checkResult(e)}))}},{key:"createCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e["popup-form-mesto"],link:e["popup-form-link"]})}).then((function(e){return t._checkResult(e)}))}},{key:"removeCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._checkResult(e)}))}},{key:"likeCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then((function(e){return t._checkResult(e)}))}},{key:"unLikeCard",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t._checkResult(e)}))}},{key:"updateAvatar",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return t._checkResult(e)}))}}])&&E(t.prototype,n),e}();function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var I=document.querySelector(".profile-info__btn-edit"),q=document.querySelector(".popup-edit .popup-form__input_field_name"),j=document.querySelector(".popup-edit .popup-form__input_field_description"),P=document.querySelector(".profile__btn-add"),R=document.querySelector(".profile__wrappers"),U={inputSelector:".popup-form__input",submitButtonSelector:".popup-form__btn-submit",inputInvalidClass:".popup-form__input_type_error",buttonInvalidClass:"popup-form__btn-submit_invalid",errorClass:"popup-form__input_type_invalid"},T=new L({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-19",headers:{authorization:"0eeb4c96-bb84-4d08-b5d5-7ff8bde46738","Content-Type":"application/json"}}),x=new C({nameSelector:".profile-info__name",aboutSelector:".profile-info__description",avatarSelector:".profile__avatar"}),B=new d(".popup.popup-image");B.setEventListeners();var A=new S(".popup.popup-confirm",(function(e,n){T.removeCard(e["popup-form-id"]).then((function(r){t.removeCard(e["popup-form-id"]),n()})).catch((function(e){console.log(e)}))}));A.setEventListeners();var D=new S(".popup.popup-avatar",(function(e,t){T.updateAvatar(e["popup-form-avatar"]).then((function(e){x.setUserInfo(e._id,e.name,e.about,e.avatar),t()})).catch((function(e){console.log(e)}))}));D.setEventListeners(),R.addEventListener("click",(function(){D.open()}));var V=new S(".popup.popup-edit",(function(e,t){T.setUser(e).then((function(n){x.setUserInfo(n._id,e["popup-form-name"],e["popup-form-about"],n.avatar),t()})).catch((function(e){console.log(e)}))}));V.setEventListeners(),I.addEventListener("click",(function(e){var t=x.getUserInfo();q.value=t.name,j.value=t.about,V.open()}));var N,J=function(e,n,r,o,i){return new t(e,n,r,i,T,x.getUserInfo().id,o,(function(){document.querySelector(".popup-form__input_field_id").value=e,A.open()}),"#photo-card",(function(e,t){B.open({name:e,link:t})})).generateCard()},H=new S(".popup.popup-create",(function(e,t){T.createCard(e).then((function(n){var r=J(n._id,e["popup-form-mesto"],e["popup-form-link"],n.owner._id,n.likes);N.prependItem(r),t()})).catch((function(e){console.log(e)}))}));H.setEventListeners(),P.addEventListener("click",(function(){H.open()})),new o(U,".popup-form-profile").enableValidation(),new o(U,".popup-form-card").enableValidation(),new o(U,".popup-form-avatar").enableValidation(),Promise.all([T.getUser(),T.getCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}}(t,n)||function(e,t){if(e){if("string"==typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?O(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];x.setUserInfo(o._id,o.name,o.about,o.avatar),(N=new a({items:i,renderer:function(e){var t=J(e._id,e.name,e.link,e.owner._id,e.likes);N.appendItem(t)}},".photogallery__wrapper")).renderItems()})).catch((function(e){console.log(e)}))})();