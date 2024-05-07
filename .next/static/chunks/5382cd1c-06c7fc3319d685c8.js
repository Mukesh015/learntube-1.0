"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4050],{56645:function(e,t,i){i.d(t,{R:function(){return tK},X:function(){return e9},a5:function(){return tl},aa:function(){return tc},ab:function(){return tu},ac:function(){return th},ag:function(){return td},ak:function(){return tf},am:function(){return tm},c:function(){return t9},o:function(){return iM},s:function(){return tJ},y:function(){return tv}});var r,n=i(99279),s=i(71028),a=i(19053),o=i(11735),l=i(42680);function c(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}let u=new s.LL("auth","Firebase",c()),h=new a.Yd("@firebase/auth");function d(e,...t){h.logLevel<=a.in.ERROR&&h.error(`Auth (${n.Jn}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p(e,...t){throw v(e,...t)}function f(e,...t){return v(e,...t)}function m(e,t,i){let r=Object.assign(Object.assign({},c()),{[t]:i});return new s.LL("auth","Firebase",r).create(t,{appName:e.name})}function g(e){return m(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function v(e,...t){if("string"!=typeof e){let i=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(i,...r)}return u.create(e,...t)}function _(e,t,...i){if(!e)throw v(t,...i)}function I(e){let t="INTERNAL ASSERTION FAILED: "+e;throw d(t),Error(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function w(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.href)||""}function y(){return"http:"===T()||"https:"===T()}function T(){var e;return"undefined"!=typeof self&&(null===(e=self.location)||void 0===e?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k{constructor(e,t){var i;this.shortDelay=e,this.longDelay=t,i="Short delay should be less than long delay!",t>e||I(i),this.isMobile=(0,s.uI)()||(0,s.b$)()}get(){return!("undefined"!=typeof navigator&&navigator&&"onLine"in navigator&&"boolean"==typeof navigator.onLine&&(y()||(0,s.ru)()||"connection"in navigator))||navigator.onLine?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function E(e,t){var i,r;i=e.emulator,r="Emulator should always be set here",i||I(r);let{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){return this.fetchImpl?this.fetchImpl:"undefined"!=typeof self&&"fetch"in self?self.fetch:"undefined"!=typeof globalThis&&globalThis.fetch?globalThis.fetch:"undefined"!=typeof fetch?fetch:void I("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){return this.headersImpl?this.headersImpl:"undefined"!=typeof self&&"Headers"in self?self.Headers:"undefined"!=typeof globalThis&&globalThis.Headers?globalThis.Headers:"undefined"!=typeof Headers?Headers:void I("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){return this.responseImpl?this.responseImpl:"undefined"!=typeof self&&"Response"in self?self.Response:"undefined"!=typeof globalThis&&globalThis.Response?globalThis.Response:"undefined"!=typeof Response?Response:void I("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let R={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"},P=new k(3e4,6e4);function C(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function b(e,t,i,r,n={}){return O(e,n,async()=>{let n={},a={};r&&("GET"===t?a=r:n={body:JSON.stringify(r)});let o=(0,s.xO)(Object.assign({key:e.config.apiKey},a)).slice(1),l=await e._getAdditionalHeaders();return l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode),S.fetch()(A(e,e.config.apiHost,i,o),Object.assign({method:t,headers:l,referrerPolicy:"no-referrer"},n))})}async function O(e,t,i){e._canInitEmulator=!1;let r=Object.assign(Object.assign({},R),t);try{let t=new L(e),n=await Promise.race([i(),t.promise]);t.clearNetworkTimeout();let s=await n.json();if("needConfirmation"in s)throw D(e,"account-exists-with-different-credential",s);if(n.ok&&!("errorMessage"in s))return s;{let[t,i]=(n.ok?s.errorMessage:s.error.message).split(" : ");if("FEDERATED_USER_ID_ALREADY_LINKED"===t)throw D(e,"credential-already-in-use",s);if("EMAIL_EXISTS"===t)throw D(e,"email-already-in-use",s);if("USER_DISABLED"===t)throw D(e,"user-disabled",s);let a=r[t]||t.toLowerCase().replace(/[_\s]+/g,"-");if(i)throw m(e,a,i);p(e,a)}}catch(t){if(t instanceof s.ZR)throw t;p(e,"network-request-failed",{message:String(t)})}}async function N(e,t,i,r,n={}){let s=await b(e,t,i,r,n);return"mfaPendingCredential"in s&&p(e,"multi-factor-auth-required",{_serverResponse:s}),s}function A(e,t,i,r){let n=`${t}${i}?${r}`;return e.config.emulator?E(e.config,n):`${e.config.apiScheme}://${n}`}class L{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(f(this.auth,"network-request-failed")),P.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function D(e,t,i){let r={appName:e.name};i.email&&(r.email=i.email),i.phoneNumber&&(r.phoneNumber=i.phoneNumber);let n=f(e,t,r);return n.customData._tokenResponse=i,n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U(e){return void 0!==e&&void 0!==e.getResponse}function M(e){return void 0!==e&&void 0!==e.enterprise}class x{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],void 0===e.recaptchaKey)throw Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||0===this.recaptchaEnforcementState.length)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return function(e){switch(e){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}(t.enforcementState);return null}isProviderEnabled(e){return"ENFORCE"===this.getProviderEnforcementState(e)||"AUDIT"===this.getProviderEnforcementState(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function V(e){return(await b(e,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function F(e,t){return b(e,"GET","/v2/recaptchaConfig",C(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function j(e,t){return b(e,"POST","/v1/accounts:delete",t)}async function z(e,t){return b(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch(e){}}async function W(e,t=!1){let i=(0,s.m9)(e),r=await i.getIdToken(t),n=q(r);_(n&&n.exp&&n.auth_time&&n.iat,i.auth,"internal-error");let a="object"==typeof n.firebase?n.firebase:void 0,o=null==a?void 0:a.sign_in_provider;return{claims:n,token:r,authTime:H($(n.auth_time)),issuedAtTime:H($(n.iat)),expirationTime:H($(n.exp)),signInProvider:o||null,signInSecondFactor:(null==a?void 0:a.sign_in_second_factor)||null}}function $(e){return 1e3*Number(e)}function q(e){let[t,i,r]=e.split(".");if(void 0===t||void 0===i||void 0===r)return d("JWT malformed, contained fewer than 3 sections"),null;try{let e=(0,s.tV)(i);if(!e)return d("Failed to decode base64 JWT payload"),null;return JSON.parse(e)}catch(e){return d("Caught error parsing JWT payload as JSON",null==e?void 0:e.toString()),null}}function K(e){let t=q(e);return _(t,"internal-error"),_(void 0!==t.exp,"internal-error"),_(void 0!==t.iat,"internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G(e,t,i=!1){if(i)return t;try{return await t}catch(t){throw t instanceof s.ZR&&function({code:e}){return"auth/user-disabled"===e||"auth/user-token-expired"===e}(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,null!==this.timerId&&clearTimeout(this.timerId))}getInterval(e){var t;if(!e)return this.errorBackoff=3e4,Math.max(0,(null!==(t=this.user.stsTokenManager.expirationTime)&&void 0!==t?t:0)-Date.now()-3e5);{let e=this.errorBackoff;return this.errorBackoff=Math.min(2*this.errorBackoff,96e4),e}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(null==e?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=H(this.lastLoginAt),this.creationTime=H(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Y(e){var t;let i=e.auth,r=await e.getIdToken(),n=await G(e,z(i,{idToken:r}));_(null==n?void 0:n.users.length,i,"internal-error");let s=n.users[0];e._notifyReloadListener(s);let a=(null===(t=s.providerUserInfo)||void 0===t?void 0:t.length)?Q(s.providerUserInfo):[],o=[...e.providerData.filter(e=>!a.some(t=>t.providerId===e.providerId)),...a],l=e.isAnonymous,c=!(e.email&&s.passwordHash)&&!(null==o?void 0:o.length);Object.assign(e,{uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new B(s.createdAt,s.lastLoginAt),isAnonymous:!!l&&c})}async function X(e){let t=(0,s.m9)(e);await Y(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Q(e){return e.map(e=>{var{providerId:t}=e,i=(0,o._T)(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Z(e,t){let i=await O(e,{},async()=>{let i=(0,s.xO)({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:n}=e.config,a=A(e,r,"/v1/token",`key=${n}`),o=await e._getAdditionalHeaders();return o["Content-Type"]="application/x-www-form-urlencoded",S.fetch()(a,{method:"POST",headers:o,body:i})});return{accessToken:i.access_token,expiresIn:i.expires_in,refreshToken:i.refresh_token}}async function ee(e,t){return b(e,"POST","/v2/accounts:revokeToken",C(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){_(e.idToken,"internal-error"),_(void 0!==e.idToken,"internal-error"),_(void 0!==e.refreshToken,"internal-error");let t="expiresIn"in e&&void 0!==e.expiresIn?Number(e.expiresIn):K(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){_(0!==e.length,"internal-error");let t=K(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return t||!this.accessToken||this.isExpired?(_(this.refreshToken,e,"user-token-expired"),this.refreshToken)?(await this.refresh(e,this.refreshToken),this.accessToken):null:this.accessToken}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:i,refreshToken:r,expiresIn:n}=await Z(e,t);this.updateTokensAndExpiration(i,r,Number(n))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+1e3*i}static fromJSON(e,t){let{refreshToken:i,accessToken:r,expirationTime:n}=t,s=new et;return i&&(_("string"==typeof i,"internal-error",{appName:e}),s.refreshToken=i),r&&(_("string"==typeof r,"internal-error",{appName:e}),s.accessToken=r),n&&(_("number"==typeof n,"internal-error",{appName:e}),s.expirationTime=n),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new et,this.toJSON())}_performRefresh(){return I("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ei(e,t){_("string"==typeof e||void 0===e,"internal-error",{appName:t})}class er{constructor(e){var{uid:t,auth:i,stsTokenManager:r}=e,n=(0,o._T)(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new J(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=n.displayName||null,this.email=n.email||null,this.emailVerified=n.emailVerified||!1,this.phoneNumber=n.phoneNumber||null,this.photoURL=n.photoURL||null,this.isAnonymous=n.isAnonymous||!1,this.tenantId=n.tenantId||null,this.providerData=n.providerData?[...n.providerData]:[],this.metadata=new B(n.createdAt||void 0,n.lastLoginAt||void 0)}async getIdToken(e){let t=await G(this,this.stsTokenManager.getToken(this.auth,e));return _(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return W(this,e)}reload(){return X(this)}_assign(e){this!==e&&(_(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>Object.assign({},e)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new er(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){_(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Y(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if((0,n.rh)(this.auth.app))return Promise.reject(g(this.auth));let e=await this.getIdToken();return await G(this,j(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,r,n,s,a,o,l,c;let u=null!==(i=t.displayName)&&void 0!==i?i:void 0,h=null!==(r=t.email)&&void 0!==r?r:void 0,d=null!==(n=t.phoneNumber)&&void 0!==n?n:void 0,p=null!==(s=t.photoURL)&&void 0!==s?s:void 0,f=null!==(a=t.tenantId)&&void 0!==a?a:void 0,m=null!==(o=t._redirectEventId)&&void 0!==o?o:void 0,g=null!==(l=t.createdAt)&&void 0!==l?l:void 0,v=null!==(c=t.lastLoginAt)&&void 0!==c?c:void 0,{uid:I,emailVerified:w,isAnonymous:y,providerData:T,stsTokenManager:k}=t;_(I&&k,e,"internal-error");let E=et.fromJSON(this.name,k);_("string"==typeof I,e,"internal-error"),ei(u,e.name),ei(h,e.name),_("boolean"==typeof w,e,"internal-error"),_("boolean"==typeof y,e,"internal-error"),ei(d,e.name),ei(p,e.name),ei(f,e.name),ei(m,e.name),ei(g,e.name),ei(v,e.name);let S=new er({uid:I,auth:e,email:h,emailVerified:w,displayName:u,isAnonymous:y,photoURL:p,phoneNumber:d,tenantId:f,stsTokenManager:E,createdAt:g,lastLoginAt:v});return T&&Array.isArray(T)&&(S.providerData=T.map(e=>Object.assign({},e))),m&&(S._redirectEventId=m),S}static async _fromIdTokenResponse(e,t,i=!1){let r=new et;r.updateFromServerResponse(t);let n=new er({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:i});return await Y(n),n}static async _fromGetAccountInfoResponse(e,t,i){let r=t.users[0];_(void 0!==r.localId,"internal-error");let n=void 0!==r.providerUserInfo?Q(r.providerUserInfo):[],s=!(r.email&&r.passwordHash)&&!(null==n?void 0:n.length),a=new et;a.updateFromIdToken(i);let o=new er({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:s});return Object.assign(o,{uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:n,metadata:new B(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(null==n?void 0:n.length)}),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let en=new Map;function es(e){var t,i;t="Expected a class definition",e instanceof Function||I(t);let r=en.get(e);return r?(i="Instance stored in cache mismatched with class",r instanceof e||I(i)):(r=new e,en.set(e,r)),r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return void 0===t?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(e,t,i){return`firebase:${e}:${t}:${i}`}ea.type="NONE";class el{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;let{config:r,name:n}=this.auth;this.fullUserKey=eo(this.userKey,r.apiKey,n),this.fullPersistenceKey=eo("persistence",r.apiKey,n),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?er._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new el(es(ea),e,i);let r=(await Promise.all(t.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),n=r[0]||es(ea),s=eo(i,e.config.apiKey,e.name),a=null;for(let i of t)try{let t=await i._get(s);if(t){let r=er._fromJSON(e,t);i!==n&&(a=r),n=i;break}}catch(e){}let o=r.filter(e=>e._shouldAllowMigration);return n._shouldAllowMigration&&o.length&&(n=o[0],a&&await n._set(s,a.toJSON()),await Promise.all(t.map(async e=>{if(e!==n)try{await e._remove(s)}catch(e){}}))),new el(n,e,i)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(e){let t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(ep(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";{if(t.includes("edge/"))return"Edge";if(eu(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(em(t))return"Blackberry";if(eg(t))return"Webos";if(eh(t))return"Safari";if((t.includes("chrome/")||ed(t))&&!t.includes("edge/"))return"Chrome";if(ef(t))return"Android";let i=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if((null==i?void 0:i.length)===2)return i[1]}return"Other"}function eu(e=(0,s.z$)()){return/firefox\//i.test(e)}function eh(e=(0,s.z$)()){let t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ed(e=(0,s.z$)()){return/crios\//i.test(e)}function ep(e=(0,s.z$)()){return/iemobile/i.test(e)}function ef(e=(0,s.z$)()){return/android/i.test(e)}function em(e=(0,s.z$)()){return/blackberry/i.test(e)}function eg(e=(0,s.z$)()){return/webos/i.test(e)}function ev(e=(0,s.z$)()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function e_(e=(0,s.z$)()){return ev(e)||ef(e)||eg(e)||em(e)||/windows phone/i.test(e)||ep(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eI(e,t=[]){let i;switch(e){case"Browser":i=ec((0,s.z$)());break;case"Worker":i=`${ec((0,s.z$)())}-${e}`;break;default:i=e}let r=t.length?t.join(","):"FirebaseCore-web";return`${i}/JsCore/${n.Jn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ew{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let i=t=>new Promise((i,r)=>{try{let r=e(t);i(r)}catch(e){r(e)}});i.onAbort=t,this.queue.push(i);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(e){for(let e of(t.reverse(),t))try{e()}catch(e){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:null==e?void 0:e.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ey(e,t={}){return b(e,"GET","/v2/passwordPolicy",C(e,t))}class eT{constructor(e){var t,i,r,n;let s=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=null!==(t=s.minPasswordLength)&&void 0!==t?t:6,s.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=s.maxPasswordLength),void 0!==s.containsLowercaseCharacter&&(this.customStrengthOptions.containsLowercaseLetter=s.containsLowercaseCharacter),void 0!==s.containsUppercaseCharacter&&(this.customStrengthOptions.containsUppercaseLetter=s.containsUppercaseCharacter),void 0!==s.containsNumericCharacter&&(this.customStrengthOptions.containsNumericCharacter=s.containsNumericCharacter),void 0!==s.containsNonAlphanumericCharacter&&(this.customStrengthOptions.containsNonAlphanumericCharacter=s.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,"ENFORCEMENT_STATE_UNSPECIFIED"===this.enforcementState&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=null!==(r=null===(i=e.allowedNonAlphanumericCharacters)||void 0===i?void 0:i.join(""))&&void 0!==r?r:"",this.forceUpgradeOnSignin=null!==(n=e.forceUpgradeOnSignin)&&void 0!==n&&n,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,r,n,s,a;let o={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,o),this.validatePasswordCharacterOptions(e,o),o.isValid&&(o.isValid=null===(t=o.meetsMinPasswordLength)||void 0===t||t),o.isValid&&(o.isValid=null===(i=o.meetsMaxPasswordLength)||void 0===i||i),o.isValid&&(o.isValid=null===(r=o.containsLowercaseLetter)||void 0===r||r),o.isValid&&(o.isValid=null===(n=o.containsUppercaseLetter)||void 0===n||n),o.isValid&&(o.isValid=null===(s=o.containsNumericCharacter)||void 0===s||s),o.isValid&&(o.isValid=null===(a=o.containsNonAlphanumericCharacter)||void 0===a||a),o}validatePasswordLengthOptions(e,t){let i=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){let i;this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);for(let r=0;r<e.length;r++)i=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,r,n){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ek{constructor(e,t,i,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new eS(this),this.idTokenSubscription=new eS(this),this.beforeStateQueue=new ew(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=u,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=es(t)),this._initializationPromise=this.queue(async()=>{var i,r;if(!this._deleted&&(this.persistenceManager=await el.create(this,e),!this._deleted)){if(null===(i=this._popupRedirectResolver)||void 0===i?void 0:i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(e){}await this.initializeCurrentUser(t),this.lastNotifiedUid=(null===(r=this.currentUser)||void 0===r?void 0:r.uid)||null,this._deleted||(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(this.currentUser||e){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await z(this,{idToken:e}),i=await er._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(e){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if((0,n.rh)(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let i=await this.assertedPersistence.getCurrentUser(),r=i,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let i=null===(t=this.redirectUser)||void 0===t?void 0:t._redirectEventId,n=null==r?void 0:r._redirectEventId,a=await this.tryRedirectSignIn(e);(!i||i===n)&&(null==a?void 0:a.user)&&(r=a.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(e){r=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return(_(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId)?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Y(e)}catch(e){if((null==e?void 0:e.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=function(){if("undefined"==typeof navigator)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if((0,n.rh)(this.app))return Promise.reject(g(this));let t=e?(0,s.m9)(e):null;return t&&_(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&_(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(0,n.rh)(this.app)?Promise.reject(g(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return(0,n.rh)(this.app)?Promise.reject(g(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(es(e))})}_getRecaptchaConfig(){return null==this.tenantId?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return null===this.tenantId?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=new eT(await ey(this));null===this.tenantId?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new s.LL("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:await this.currentUser.getIdToken()};null!=this.tenantId&&(t.tenantId=this.tenantId),await ee(this,t)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:null===(e=this._currentUser)||void 0===e?void 0:e.toJSON()}}async _setRedirectUser(e,t){let i=await this.getOrInitRedirectPersistenceManager(t);return null===e?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&es(e)||this._popupRedirectResolver;_(t,this,"argument-error"),this.redirectPersistenceManager=await el.create(this,[es(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return(this._isInitialized&&await this.queue(async()=>{}),(null===(t=this._currentUser)||void 0===t?void 0:t._redirectEventId)===e)?this._currentUser:(null===(i=this.redirectUser)||void 0===i?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let i=null!==(t=null===(e=this.currentUser)||void 0===e?void 0:e.uid)&&void 0!==t?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,r){if(this._deleted)return()=>{};let n="function"==typeof t?t:t.next.bind(t),s=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(_(a,this,"internal-error"),a.then(()=>{s||n(this.currentUser)}),"function"==typeof t){let n=e.addObserver(t,i,r);return()=>{s=!0,n()}}{let i=e.addObserver(t);return()=>{s=!0,i()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return _(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=eI(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let i=await (null===(e=this.heartbeatServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);let r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var e;let t=await (null===(e=this.appCheckServiceProvider.getImmediate({optional:!0}))||void 0===e?void 0:e.getToken());return(null==t?void 0:t.error)&&function(e,...t){h.logLevel<=a.in.WARN&&h.warn(`Auth (${n.Jn}): ${e}`,...t)}(`Error while retrieving App Check token: ${t.error}`),null==t?void 0:t.token}}function eE(e){return(0,s.m9)(e)}class eS{constructor(e){this.auth=e,this.observer=null,this.addObserver=(0,s.ne)(e=>this.observer=e)}get next(){return _(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let eR={async loadJS(){throw Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function eP(e){return eR.loadJS(e)}function eC(e){return`__${e}${Math.floor(1e6*Math.random())}`}class eb{constructor(e){this.type="recaptcha-enterprise",this.auth=eE(e)}async verify(e="verify",t=!1){async function i(e){if(!t){if(null==e.tenantId&&null!=e._agentRecaptchaConfig)return e._agentRecaptchaConfig.siteKey;if(null!=e.tenantId&&void 0!==e._tenantRecaptchaConfigs[e.tenantId])return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,i)=>{F(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(r=>{if(void 0===r.recaptchaKey)i(Error("recaptcha Enterprise site key undefined"));else{let i=new x(r);return null==e.tenantId?e._agentRecaptchaConfig=i:e._tenantRecaptchaConfigs[e.tenantId]=i,t(i.siteKey)}}).catch(e=>{i(e)})})}function r(t,i,r){let n=window.grecaptcha;M(n)?n.enterprise.ready(()=>{n.enterprise.execute(t,{action:e}).then(e=>{i(e)}).catch(()=>{i("NO_RECAPTCHA")})}):r(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((e,n)=>{i(this.auth).then(i=>{if(!t&&M(window.grecaptcha))r(i,e,n);else{if("undefined"==typeof window){n(Error("RecaptchaVerifier is only supported in browser"));return}let t=eR.recaptchaEnterpriseScript;0!==t.length&&(t+=i),eP(t).then(()=>{r(i,e,n)}).catch(e=>{n(e)})}}).catch(e=>{n(e)})})}}async function eO(e,t,i,r=!1){let n;let s=new eb(e);try{n=await s.verify(i)}catch(e){n=await s.verify(i,!0)}let a=Object.assign({},t);return r?Object.assign(a,{captchaResp:n}):Object.assign(a,{captchaResponse:n}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function eN(e,t,i,r){var n;if(null===(n=e._getRecaptchaConfig())||void 0===n||!n.isProviderEnabled("EMAIL_PASSWORD_PROVIDER"))return r(e,t).catch(async n=>{if("auth/missing-recaptcha-token"!==n.code)return Promise.reject(n);{console.log(`${i} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let n=await eO(e,t,i,"getOobCode"===i);return r(e,n)}});{let n=await eO(e,t,i,"getOobCode"===i);return r(e,n)}}function eA(e){let t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function eL(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eD{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return I("not implemented")}_getIdTokenResponse(e){return I("not implemented")}_linkToIdToken(e,t){return I("not implemented")}_getReauthenticationResolver(e){return I("not implemented")}}async function eU(e,t){return b(e,"POST","/v1/accounts:update",t)}async function eM(e,t){return b(e,"POST","/v1/accounts:signUp",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ex(e,t){return N(e,"POST","/v1/accounts:signInWithPassword",C(e,t))}async function eV(e,t){return b(e,"POST","/v1/accounts:sendOobCode",C(e,t))}async function eF(e,t){return eV(e,t)}async function ej(e,t){return eV(e,t)}async function ez(e,t){return eV(e,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eH(e,t){return N(e,"POST","/v1/accounts:signInWithEmailLink",C(e,t))}async function eW(e,t){return N(e,"POST","/v1/accounts:signInWithEmailLink",C(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e$ extends eD{constructor(e,t,i,r=null){super("password",i),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new e$(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new e$(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e;if((null==t?void 0:t.email)&&(null==t?void 0:t.password)){if("password"===t.signInMethod)return this._fromEmailAndPassword(t.email,t.password);if("emailLink"===t.signInMethod)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return eN(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signInWithPassword",ex);case"emailLink":return eH(e,{email:this._email,oobCode:this._password});default:p(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return eN(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",eM);case"emailLink":return eW(e,{idToken:t,email:this._email,oobCode:this._password});default:p(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eq(e,t){return N(e,"POST","/v1/accounts:signInWithIdp",C(e,t))}class eK extends eD{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new eK(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):p("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t="string"==typeof e?JSON.parse(e):e,{providerId:i,signInMethod:r}=t,n=(0,o._T)(t,["providerId","signInMethod"]);if(!i||!r)return null;let s=new eK(i,r);return s.idToken=n.idToken||void 0,s.accessToken=n.accessToken||void 0,s.secret=n.secret,s.nonce=n.nonce,s.pendingToken=n.pendingToken||null,s}_getIdTokenResponse(e){return eq(e,this.buildRequest())}_linkToIdToken(e,t){let i=this.buildRequest();return i.idToken=t,eq(e,i)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,eq(e,t)}buildRequest(){let e={requestUri:"http://localhost",returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=(0,s.xO)(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eG(e,t){return b(e,"POST","/v1/accounts:sendVerificationCode",C(e,t))}async function eJ(e,t){return N(e,"POST","/v1/accounts:signInWithPhoneNumber",C(e,t))}async function eB(e,t){let i=await N(e,"POST","/v1/accounts:signInWithPhoneNumber",C(e,t));if(i.temporaryProof)throw D(e,"account-exists-with-different-credential",i);return i}let eY={USER_NOT_FOUND:"user-not-found"};async function eX(e,t){return N(e,"POST","/v1/accounts:signInWithPhoneNumber",C(e,Object.assign(Object.assign({},t),{operation:"REAUTH"})),eY)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eQ extends eD{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new eQ({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new eQ({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return eJ(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return eB(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return eX(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:i,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:i,code:r}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){"string"==typeof e&&(e=JSON.parse(e));let{verificationId:t,verificationCode:i,phoneNumber:r,temporaryProof:n}=e;return i||t||r||n?new eQ({verificationId:t,verificationCode:i,phoneNumber:r,temporaryProof:n}):null}}class eZ{constructor(e){var t,i,r,n,a,o;let l=(0,s.zd)((0,s.pd)(e)),c=null!==(t=l.apiKey)&&void 0!==t?t:null,u=null!==(i=l.oobCode)&&void 0!==i?i:null,h=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}(null!==(r=l.mode)&&void 0!==r?r:null);_(c&&u&&h,"argument-error"),this.apiKey=c,this.operation=h,this.code=u,this.continueUrl=null!==(n=l.continueUrl)&&void 0!==n?n:null,this.languageCode=null!==(a=l.languageCode)&&void 0!==a?a:null,this.tenantId=null!==(o=l.tenantId)&&void 0!==o?o:null}static parseLink(e){let t=function(e){let t=(0,s.zd)((0,s.pd)(e)).link,i=t?(0,s.zd)((0,s.pd)(t)).deep_link_id:null,r=(0,s.zd)((0,s.pd)(e)).deep_link_id;return(r?(0,s.zd)((0,s.pd)(r)).link:null)||r||i||t||e}(e);try{return new eZ(t)}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e0{constructor(){this.providerId=e0.PROVIDER_ID}static credential(e,t){return e$._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let i=eZ.parseLink(t);return _(i,"argument-error"),e$._fromEmailAndCode(e,i.code,i.tenantId)}}e0.PROVIDER_ID="password",e0.EMAIL_PASSWORD_SIGN_IN_METHOD="password",e0.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e1{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e2 extends e1{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e3 extends e2{constructor(){super("facebook.com")}static credential(e){return eK._fromParams({providerId:e3.PROVIDER_ID,signInMethod:e3.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return e3.credentialFromTaggedObject(e)}static credentialFromError(e){return e3.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return e3.credential(e.oauthAccessToken)}catch(e){return null}}}e3.FACEBOOK_SIGN_IN_METHOD="facebook.com",e3.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e9 extends e2{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return eK._fromParams({providerId:e9.PROVIDER_ID,signInMethod:e9.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return e9.credentialFromTaggedObject(e)}static credentialFromError(e){return e9.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return e9.credential(t,i)}catch(e){return null}}}e9.GOOGLE_SIGN_IN_METHOD="google.com",e9.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e4 extends e2{constructor(){super("github.com")}static credential(e){return eK._fromParams({providerId:e4.PROVIDER_ID,signInMethod:e4.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return e4.credentialFromTaggedObject(e)}static credentialFromError(e){return e4.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return e4.credential(e.oauthAccessToken)}catch(e){return null}}}e4.GITHUB_SIGN_IN_METHOD="github.com",e4.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e5 extends e2{constructor(){super("twitter.com")}static credential(e,t){return eK._fromParams({providerId:e5.PROVIDER_ID,signInMethod:e5.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return e5.credentialFromTaggedObject(e)}static credentialFromError(e){return e5.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return e5.credential(t,i)}catch(e){return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function e6(e,t){return N(e,"POST","/v1/accounts:signUp",C(e,t))}e5.TWITTER_SIGN_IN_METHOD="twitter.com",e5.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e8{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,r=!1){return new e8({user:await er._fromIdTokenResponse(e,i,r),providerId:e7(i),_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){return await e._updateTokensIfNecessary(i,!0),new e8({user:e,providerId:e7(i),_tokenResponse:i,operationType:t})}}function e7(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te extends s.ZR{constructor(e,t,i,r){var n;super(t.code,t.message),this.operationType=i,this.user=r,Object.setPrototypeOf(this,te.prototype),this.customData={appName:e.name,tenantId:null!==(n=e.tenantId)&&void 0!==n?n:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,r){return new te(e,t,i,r)}}function tt(e,t,i,r){return("reauthenticate"===t?i._getReauthenticationResolver(e):i._getIdTokenResponse(e)).catch(i=>{if("auth/multi-factor-auth-required"===i.code)throw te._fromErrorAndOperation(e,i,t,r);throw i})}async function ti(e,t,i=!1){let r=await G(e,t._linkToIdToken(e.auth,await e.getIdToken()),i);return e8._forOperation(e,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tr(e,t,i=!1){let{auth:r}=e;if((0,n.rh)(r.app))return Promise.reject(g(r));let s="reauthenticate";try{let n=await G(e,tt(r,s,t,e),i);_(n.idToken,r,"internal-error");let a=q(n.idToken);_(a,r,"internal-error");let{sub:o}=a;return _(e.uid===o,r,"user-mismatch"),e8._forOperation(e,s,n)}catch(e){throw(null==e?void 0:e.code)==="auth/user-not-found"&&p(r,"user-mismatch"),e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tn(e,t,i=!1){if((0,n.rh)(e.app))return Promise.reject(g(e));let r="signIn",s=await tt(e,r,t),a=await e8._fromIdTokenResponse(e,r,s);return i||await e._updateCurrentUser(a.user),a}async function ts(e,t){return tn(eE(e),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ta(e,t,i){var r;_((null===(r=i.url)||void 0===r?void 0:r.length)>0,e,"invalid-continue-uri"),_(void 0===i.dynamicLinkDomain||i.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain"),t.continueUrl=i.url,t.dynamicLinkDomain=i.dynamicLinkDomain,t.canHandleCodeInApp=i.handleCodeInApp,i.iOS&&(_(i.iOS.bundleId.length>0,e,"missing-ios-bundle-id"),t.iOSBundleId=i.iOS.bundleId),i.android&&(_(i.android.packageName.length>0,e,"missing-android-pkg-name"),t.androidInstallApp=i.android.installApp,t.androidMinimumVersionCode=i.android.minimumVersion,t.androidPackageName=i.android.packageName)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function to(e){let t=eE(e);t._getPasswordPolicyInternal()&&await t._updatePasswordPolicy()}async function tl(e,t,i){let r=eE(e),n={requestType:"PASSWORD_RESET",email:t,clientType:"CLIENT_TYPE_WEB"};i&&ta(r,n,i),await eN(r,n,"getOobCode",ej)}async function tc(e,t,i){if((0,n.rh)(e.app))return Promise.reject(g(e));let r=eE(e),s=eN(r,{returnSecureToken:!0,email:t,password:i,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",e6),a=await s.catch(t=>{throw"auth/password-does-not-meet-requirements"===t.code&&to(e),t}),o=await e8._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(o.user),o}function tu(e,t,i){return(0,n.rh)(e.app)?Promise.reject(g(e)):ts((0,s.m9)(e),e0.credential(t,i)).catch(async t=>{throw"auth/password-does-not-meet-requirements"===t.code&&to(e),t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function th(e,t,i){let r=eE(e),n={requestType:"EMAIL_SIGNIN",email:t,clientType:"CLIENT_TYPE_WEB"};_(i.handleCodeInApp,r,"argument-error"),i&&ta(r,n,i),await eN(r,n,"getOobCode",ez)}async function td(e,t){let i=(0,s.m9)(e),r={requestType:"VERIFY_EMAIL",idToken:await e.getIdToken()};t&&ta(i.auth,r,t);let{email:n}=await eF(i.auth,r);n!==e.email&&await e.reload()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tp(e,t){return b(e,"POST","/v1/accounts:update",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tf(e,{displayName:t,photoURL:i}){if(void 0===t&&void 0===i)return;let r=(0,s.m9)(e),n=await r.getIdToken(),a=await G(r,tp(r.auth,{idToken:n,displayName:t,photoUrl:i,returnSecureToken:!0}));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;let o=r.providerData.find(({providerId:e})=>"password"===e);o&&(o.displayName=r.displayName,o.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function tm(e,t){return tg((0,s.m9)(e),null,t)}async function tg(e,t,i){let{auth:r}=e,n={idToken:await e.getIdToken(),returnSecureToken:!0};t&&(n.email=t),i&&(n.password=i);let s=await G(e,eU(r,n));await e._updateTokensIfNecessary(s,!0)}function tv(e,t,i,r){return(0,s.m9)(e).onAuthStateChanged(t,i,r)}new WeakMap;let t_="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{if(!this.storage)return Promise.resolve(!1);return this.storage.setItem(t_,"1"),this.storage.removeItem(t_),Promise.resolve(!0)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}class tw extends tI{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(){let e=(0,s.z$)();return eh(e)||ev(e)}()&&function(){try{return!!(window&&window!==window.top)}catch(e){return!1}}(),this.fallbackToPolling=e_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let i=this.storage.getItem(t),r=this.localCache[t];i!==r&&e(t,r,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,i)=>{this.notifyListeners(e,i)});return}let i=e.key;if(t?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){let r=this.storage.getItem(i);if(e.newValue!==r)null!==e.newValue?this.storage.setItem(i,e.newValue):this.storage.removeItem(i);else if(this.localCache[i]===e.newValue&&!t)return}let r=()=>{let e=this.storage.getItem(i);(t||this.localCache[i]!==e)&&this.notifyListeners(i,e)},n=this.storage.getItem(i);(0,s.w1)()&&10===document.documentMode&&n!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,10):r()}notifyListeners(e,t){this.localCache[e]=t;let i=this.listeners[e];if(i)for(let e of Array.from(i))e(t?JSON.parse(t):t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},1e3)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){0===Object.keys(this.listeners).length&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}tw.type="LOCAL";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ty extends tI{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}ty.type="SESSION";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tT{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(t=>t.isListeningto(e));if(t)return t;let i=new tT(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let{eventId:t,eventType:i,data:r}=e.data,n=this.handlersMap[i];if(!(null==n?void 0:n.size))return;e.ports[0].postMessage({status:"ack",eventId:t,eventType:i});let s=Array.from(n).map(async t=>t(e.origin,r)),a=await Promise.all(s.map(async e=>{try{let t=await e;return{fulfilled:!0,value:t}}catch(e){return{fulfilled:!1,reason:e}}}));e.ports[0].postMessage({status:"done",eventId:t,eventType:i,response:a})}_subscribe(e,t){0===Object.keys(this.handlersMap).length&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),t&&0!==this.handlersMap[e].size||delete this.handlersMap[e],0===Object.keys(this.handlersMap).length&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tk(e="",t=10){let i="";for(let e=0;e<t;e++)i+=Math.floor(10*Math.random());return e+i}tT.receivers=[];/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){let r,n;let s="undefined"!=typeof MessageChannel?new MessageChannel:null;if(!s)throw Error("connection_unavailable");return new Promise((a,o)=>{let l=tk("",20);s.port1.start();let c=setTimeout(()=>{o(Error("unsupported_event"))},i);n={messageChannel:s,onMessage(e){if(e.data.eventId===l)switch(e.data.status){case"ack":clearTimeout(c),r=setTimeout(()=>{o(Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(e.data.response);break;default:clearTimeout(c),clearTimeout(r),o(Error("invalid_response"))}}},this.handlers.add(n),s.port1.addEventListener("message",n.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{n&&this.removeMessageHandler(n)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tS(){return window}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tR(){return void 0!==tS().WorkerGlobalScope&&"function"==typeof tS().importScripts}async function tP(){if(!(null==navigator?void 0:navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(e){return null}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tC="firebaseLocalStorageDb",tb="firebaseLocalStorage",tO="fbase_key";class tN{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function tA(e,t){return e.transaction([tb],t?"readwrite":"readonly").objectStore(tb)}function tL(){let e=indexedDB.open(tC,1);return new Promise((t,i)=>{e.addEventListener("error",()=>{i(e.error)}),e.addEventListener("upgradeneeded",()=>{let t=e.result;try{t.createObjectStore(tb,{keyPath:tO})}catch(e){i(e)}}),e.addEventListener("success",async()=>{let i=e.result;i.objectStoreNames.contains(tb)?t(i):(i.close(),await new tN(indexedDB.deleteDatabase(tC)).toPromise(),t(await tL()))})})}async function tD(e,t,i){return new tN(tA(e,!0).put({[tO]:t,value:i})).toPromise()}async function tU(e,t){let i=tA(e,!1).get(t),r=await new tN(i).toPromise();return void 0===r?null:r.value}function tM(e,t){return new tN(tA(e,!0).delete(t)).toPromise()}class tx{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db||(this.db=await tL()),this.db}async _withRetries(e){let t=0;for(;;)try{let t=await this._openDb();return await e(t)}catch(e){if(t++>3)throw e;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return tR()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=tT._getInstance(tR()?self:null),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await tP(),!this.activeServiceWorker)return;this.sender=new tE(this.activeServiceWorker);let i=await this.sender._send("ping",{},800);i&&(null===(e=i[0])||void 0===e?void 0:e.fulfilled)&&(null===(t=i[0])||void 0===t?void 0:t.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){var t;if(this.sender&&this.activeServiceWorker&&((null===(t=null==navigator?void 0:navigator.serviceWorker)||void 0===t?void 0:t.controller)||null)===this.activeServiceWorker)try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await tL();return await tD(e,t_,"1"),await tM(e,t_),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>tD(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>tU(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>tM(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>new tN(tA(e,!1).getAll()).toPromise());if(!e||0!==this.pendingWrites)return[];let t=[],i=new Set;if(0!==e.length)for(let{fbase_key:r,value:n}of e)i.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(n)&&(this.notifyListeners(r,n),t.push(r));for(let e of Object.keys(this.localCache))this.localCache[e]&&!i.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let i=this.listeners[e];if(i)for(let e of Array.from(i))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),800)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){0===Object.keys(this.listeners).length&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),0===this.listeners[e].size&&delete this.listeners[e]),0===Object.keys(this.listeners).length&&this.stopPolling()}}tx.type="LOCAL";class tV{constructor(e){this.auth=e,this.counter=1e12,this._widgets=new Map}render(e,t){let i=this.counter;return this._widgets.set(i,new tF(e,this.auth.name,t||{})),this.counter++,i}reset(e){var t;let i=e||1e12;null===(t=this._widgets.get(i))||void 0===t||t.delete(),this._widgets.delete(i)}getResponse(e){var t;return(null===(t=this._widgets.get(e||1e12))||void 0===t?void 0:t.getResponse())||""}async execute(e){var t;return null===(t=this._widgets.get(e||1e12))||void 0===t||t.execute(),""}}class tF{constructor(e,t,i){this.params=i,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};let r="string"==typeof e?document.getElementById(e):e;_(r,"argument-error",{appName:t}),this.container=r,this.isVisible="invisible"!==this.params.size,this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),this.timerId||(this.timerId=window.setTimeout(()=>{this.responseToken=function(e){let t=[],i="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let e=0;e<50;e++)t.push(i.charAt(Math.floor(Math.random()*i.length)));return t.join("")}(0);let{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch(e){}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch(e){}this.isVisible&&this.execute()},6e4)},500))}checkIfDeleted(){if(this.deleted)throw Error("reCAPTCHA mock was already deleted!")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tj=eC("rcb"),tz=new k(3e4,6e4);class tH{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(null===(e=tS().grecaptcha)||void 0===e?void 0:e.render)}load(e,t=""){return(_(t.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(t),e,"argument-error"),this.shouldResolveImmediately(t)&&U(tS().grecaptcha))?Promise.resolve(tS().grecaptcha):new Promise((i,r)=>{let n=tS().setTimeout(()=>{r(f(e,"network-request-failed"))},tz.get());tS()[tj]=()=>{tS().clearTimeout(n),delete tS()[tj];let s=tS().grecaptcha;if(!s||!U(s)){r(f(e,"internal-error"));return}let a=s.render;s.render=(e,t)=>{let i=a(e,t);return this.counter++,i},this.hostLanguage=t,i(s)},eP(`${eR.recaptchaV2Script}?${(0,s.xO)({onload:tj,render:"explicit",hl:t})}`).catch(()=>{clearTimeout(n),r(f(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(null===(t=tS().grecaptcha)||void 0===t?void 0:t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}class tW{async load(e){return new tV(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t$="recaptcha",tq={theme:"light",type:"image"};class tK{constructor(e,t,i=Object.assign({},tq)){this.parameters=i,this.type=t$,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=eE(e),this.isInvisible="invisible"===this.parameters.size,_("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment");let r="string"==typeof t?document.getElementById(t):t;_(r,this.auth,"argument-error"),this.container=r,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new tW:new tH,this.validateStartingState()}async verify(){this.assertNotDestroyed();let e=await this.render(),t=this.getAssertedRecaptcha();return t.getResponse(e)||new Promise(i=>{let r=e=>{e&&(this.tokenChangeListeners.delete(r),i(e))};this.tokenChangeListeners.add(r),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise||(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e})),this.renderPromise}_reset(){this.assertNotDestroyed(),null!==this.widgetId&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){_(!this.parameters.sitekey,this.auth,"argument-error"),_(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),_("undefined"!=typeof document,this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(e=>e(t)),"function"==typeof e)e(t);else if("string"==typeof e){let i=tS()[e];"function"==typeof i&&i(t)}}}assertNotDestroyed(){_(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){let t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){let e;_(y()&&!tR(),this.auth,"internal-error"),await (e=null,new Promise(t=>{if("complete"===document.readyState){t();return}e=()=>t(),window.addEventListener("load",e)}).catch(t=>{throw e&&window.removeEventListener("load",e),t})),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);let t=await V(this.auth);_(t,this.auth,"internal-error"),this.parameters.sitekey=t}getAssertedRecaptcha(){return _(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tG{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){let t=eQ._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function tJ(e,t,i){if((0,n.rh)(e.app))return Promise.reject(g(e));let r=eE(e);return new tG(await tB(r,t,(0,s.m9)(i)),e=>ts(r,e))}async function tB(e,t,i){var r,n,s;let a=await i.verify();try{let o;if(_("string"==typeof a,e,"argument-error"),_(i.type===t$,e,"argument-error"),o="string"==typeof t?{phoneNumber:t}:t,"session"in o){let t=o.session;if("phoneNumber"in o)return _("enroll"===t.type,e,"internal-error"),(await (n={idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:o.phoneNumber,recaptchaToken:a}},b(e,"POST","/v2/accounts/mfaEnrollment:start",C(e,n)))).phoneSessionInfo.sessionInfo;{_("signin"===t.type,e,"internal-error");let i=(null===(r=o.multiFactorHint)||void 0===r?void 0:r.uid)||o.multiFactorUid;return _(i,e,"missing-multi-factor-info"),(await (s={mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{recaptchaToken:a}},b(e,"POST","/v2/accounts/mfaSignIn:start",C(e,s)))).phoneResponseInfo.sessionInfo}}{let{sessionInfo:t}=await eG(e,{phoneNumber:o.phoneNumber,recaptchaToken:a});return t}}finally{i._reset()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tY{constructor(e){this.providerId=tY.PROVIDER_ID,this.auth=eE(e)}verifyPhoneNumber(e,t){return tB(this.auth,e,(0,s.m9)(t))}static credential(e,t){return eQ._fromVerification(e,t)}static credentialFromResult(e){return tY.credentialFromTaggedObject(e)}static credentialFromError(e){return tY.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:i}=e;return t&&i?eQ._fromTokenResponse(t,i):null}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tX(e,t){return t?es(t):(_(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}tY.PROVIDER_ID="phone",tY.PHONE_SIGN_IN_METHOD="phone";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tQ extends eD{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return eq(e,this._buildIdpRequest())}_linkToIdToken(e,t){return eq(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return eq(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function tZ(e){return tn(e.auth,new tQ(e),e.bypassAuthState)}function t0(e){let{auth:t,user:i}=e;return _(i,t,"internal-error"),tr(i,new tQ(e),e.bypassAuthState)}async function t1(e){let{auth:t,user:i}=e;return _(i,t,"internal-error"),ti(i,new tQ(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t2{constructor(e,t,i,r,n=!1){this.auth=e,this.resolver=i,this.user=r,this.bypassAuthState=n,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:i,postBody:r,tenantId:n,error:s,type:a}=e;if(s){this.reject(s);return}let o={auth:this.auth,requestUri:t,sessionId:i,tenantId:n||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(o))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tZ;case"linkViaPopup":case"linkViaRedirect":return t1;case"reauthViaPopup":case"reauthViaRedirect":return t0;default:p(this.auth,"internal-error")}}resolve(e){var t,i;t=this.pendingPromise,i="Pending promise was never set",t||I(i),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){var t,i;t=this.pendingPromise,i="Pending promise was never set",t||I(i),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let t3=new k(2e3,1e4);async function t9(e,t,i){if((0,n.rh)(e.app))return Promise.reject(f(e,"operation-not-supported-in-this-environment"));let r=eE(e);!function(e,t,i){if(!(t instanceof i))throw i.name!==t.constructor.name&&p(e,"argument-error"),m(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}(e,t,e1);let s=tX(r,i);return new t4(r,"signInViaPopup",t,s).executeNotNull()}class t4 extends t2{constructor(e,t,i,r,n){super(e,t,r,n),this.provider=i,this.authWindow=null,this.pollId=null,t4.currentPopupAction&&t4.currentPopupAction.cancel(),t4.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return _(e,this.auth,"internal-error"),e}async onExecution(){var e,t;e=1===this.filter.length,t="Popup operations only handle one event",e||I(t);let i=tk();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],i),this.authWindow.associatedEvent=i,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(f(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return(null===(e=this.authWindow)||void 0===e?void 0:e.associatedEvent)||null}cancel(){this.reject(f(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,t4.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,i;if(null===(i=null===(t=this.authWindow)||void 0===t?void 0:t.window)||void 0===i?void 0:i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(f(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,t3.get())};e()}}t4.currentPopupAction=null;let t5=new Map;class t6 extends t2{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=t5.get(this.auth._key());if(!e){try{let t=await t8(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}t5.set(this.auth._key(),e)}return this.bypassAuthState||t5.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if("signInViaRedirect"===e.type)return super.onAuthEvent(e);if("unknown"===e.type){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function t8(e,t){let i=eo("pendingRedirect",t.config.apiKey,t.name),r=es(e._redirectPersistence);if(!await r._isAvailable())return!1;let n=await r._get(i)==="true";return await r._remove(i),n}function t7(e,t){t5.set(e._key(),t)}async function ie(e,t,i=!1){if((0,n.rh)(e.app))return Promise.reject(g(e));let r=eE(e),s=tX(r,t),a=new t6(r,s,i),o=await a.execute();return o&&!i&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}class it{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!function(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ir(e);default:return!1}}(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!ir(e)){let r=(null===(i=e.error.code)||void 0===i?void 0:i.split("auth/")[1])||"internal-error";t.onError(f(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let i=null===t.eventId||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=6e5&&this.cachedEventUids.clear(),this.cachedEventUids.has(ii(e))}saveEventToCache(e){this.cachedEventUids.add(ii(e)),this.lastProcessedEventTime=Date.now()}}function ii(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function ir({type:e,error:t}){return"unknown"===e&&(null==t?void 0:t.code)==="auth/no-auth-event"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function is(e,t={}){return b(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ia=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,io=/^https?/;async function il(e){if(e.config.emulator)return;let{authorizedDomains:t}=await is(e);for(let e of t)try{if(function(e){let t=w(),{protocol:i,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){let n=new URL(e);return""===n.hostname&&""===r?"chrome-extension:"===i&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):"chrome-extension:"===i&&n.hostname===r}if(!io.test(i))return!1;if(ia.test(e))return r===e;let n=e.replace(/\./g,"\\.");return RegExp("^(.+\\."+n+"|"+n+")$","i").test(r)}(e))return}catch(e){}p(e,"unauthorized-domain")}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ic=new k(3e4,6e4);function iu(){let e=tS().___jsl;if(null==e?void 0:e.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}let ih=null,id=new k(5e3,15e3),ip={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},im=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);async function ig(e){let t=await (ih=ih||new Promise((t,i)=>{var r,n,s;function a(){iu(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{iu(),i(f(e,"network-request-failed"))},timeout:ic.get()})}if(null===(n=null===(r=tS().gapi)||void 0===r?void 0:r.iframes)||void 0===n?void 0:n.Iframe)t(gapi.iframes.getContext());else if(null===(s=tS().gapi)||void 0===s?void 0:s.load)a();else{let t=eC("iframefcb");return tS()[t]=()=>{gapi.load?a():i(f(e,"network-request-failed"))},eP(`${eR.gapiScript}?onload=${t}`).catch(e=>i(e))}}).catch(e=>{throw ih=null,e})),i=tS().gapi;return _(i,e,"internal-error"),t.open({where:document.body,url:function(e){let t=e.config;_(t.authDomain,e,"auth-domain-config-required");let i=t.emulator?E(t,"emulator/auth/iframe"):`https://${e.config.authDomain}/__/auth/iframe`,r={apiKey:t.apiKey,appName:e.name,v:n.Jn},a=im.get(e.config.apiHost);a&&(r.eid=a);let o=e._getFrameworks();return o.length&&(r.fw=o.join(",")),`${i}?${(0,s.xO)(r).slice(1)}`}(e),messageHandlersFilter:i.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ip,dontclear:!0},t=>new Promise(async(i,r)=>{await t.restyle({setHideOnLeave:!1});let n=f(e,"network-request-failed"),s=tS().setTimeout(()=>{r(n)},id.get());function a(){tS().clearTimeout(s),i(t)}t.ping(a).then(a,()=>{r(n)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let iv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};class i_{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}}let iI=encodeURIComponent("fac");async function iw(e,t,i,r,a,o){_(e.config.authDomain,e,"auth-domain-config-required"),_(e.config.apiKey,e,"invalid-api-key");let l={apiKey:e.config.apiKey,appName:e.name,authType:i,redirectUrl:r,v:n.Jn,eventId:a};if(t instanceof e1)for(let[i,r]of(t.setDefaultLanguage(e.languageCode),l.providerId=t.providerId||"",(0,s.xb)(t.getCustomParameters())||(l.customParameters=JSON.stringify(t.getCustomParameters())),Object.entries(o||{})))l[i]=r;if(t instanceof e2){let e=t.getScopes().filter(e=>""!==e);e.length>0&&(l.scopes=e.join(","))}for(let t of(e.tenantId&&(l.tid=e.tenantId),Object.keys(l)))void 0===l[t]&&delete l[t];let c=await e._getAppCheckToken(),u=c?`#${iI}=${encodeURIComponent(c)}`:"";return`${function({config:e}){return e.emulator?E(e,"emulator/auth/handler"):`https://${e.authDomain}/__/auth/handler`}(e)}?${(0,s.xO)(l).slice(1)}${u}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let iy="webStorageSupport";class iT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ty,this._completeRedirectFn=ie,this._overrideRedirectResult=t7}async _openPopup(e,t,i,r){var n,a,o;a=null===(n=this.eventManagers[e._key()])||void 0===n?void 0:n.manager,o="_initialize() not called before _openPopup()",a||I(o);let l=await iw(e,t,i,w(),r);return function(e,t,i,r=500,n=600){let a=Math.max((window.screen.availHeight-n)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),l="",c=Object.assign(Object.assign({},iv),{width:r.toString(),height:n.toString(),top:a,left:o}),u=(0,s.z$)().toLowerCase();i&&(l=ed(u)?"_blank":i),eu(u)&&(t=t||"http://localhost",c.scrollbars="yes");let h=Object.entries(c).reduce((e,[t,i])=>`${e}${t}=${i},`,"");if(function(e=(0,s.z$)()){var t;return ev(e)&&!!(null===(t=window.navigator)||void 0===t?void 0:t.standalone)}(u)&&"_self"!==l)return function(e,t){let i=document.createElement("a");i.href=e,i.target=t;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),i.dispatchEvent(r)}(t||"",l),new i_(null);let d=window.open(t||"",l,h);_(d,e,"popup-blocked");try{d.focus()}catch(e){}return new i_(d)}(e,l,tk())}async _openRedirect(e,t,i,r){var n;return await this._originValidation(e),n=await iw(e,t,i,w(),r),tS().location.href=n,new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){var i;let{manager:e,promise:r}=this.eventManagers[t];return e?Promise.resolve(e):(i="If manager is not set, promise should be",r||I(i),r)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await ig(e),i=new it(e);return t.register("authEvent",t=>(_(null==t?void 0:t.authEvent,e,"invalid-auth-event"),{status:i.onEvent(t.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(iy,{type:iy},i=>{var r;let n=null===(r=null==i?void 0:i[0])||void 0===r?void 0:r[iy];void 0!==n&&t(!!n),p(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=il(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return e_()||eh()||ev()}}class ik{constructor(e){this.factorId=e}_process(e,t,i){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,i);case"signin":return this._finalizeSignIn(e,t.credential);default:return I("unexpected MultiFactorSessionType")}}}class iE extends ik{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new iE(e)}_finalizeEnroll(e,t,i){return b(e,"POST","/v2/accounts/mfaEnrollment:finalize",C(e,{idToken:t,displayName:i,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}_finalizeSignIn(e,t){return b(e,"POST","/v2/accounts/mfaSignIn:finalize",C(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()}))}}class iS{constructor(){}static assertion(e){return iE._fromCredential(e)}}iS.FACTOR_ID="phone";class iR{static assertionForEnrollment(e,t){return iP._fromSecret(e,t)}static assertionForSignIn(e,t){return iP._fromEnrollmentId(e,t)}static async generateSecret(e){var t,i;_(void 0!==(null===(t=e.user)||void 0===t?void 0:t.auth),"internal-error");let r=await b(i=e.user.auth,"POST","/v2/accounts/mfaEnrollment:start",C(i,{idToken:e.credential,totpEnrollmentInfo:{}}));return iC._fromStartTotpMfaEnrollmentResponse(r,e.user.auth)}}iR.FACTOR_ID="totp";class iP extends ik{constructor(e,t,i){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=i}static _fromSecret(e,t){return new iP(t,void 0,e)}static _fromEnrollmentId(e,t){return new iP(t,e)}async _finalizeEnroll(e,t,i){return _(void 0!==this.secret,e,"argument-error"),b(e,"POST","/v2/accounts/mfaEnrollment:finalize",C(e,{idToken:t,displayName:i,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)}))}async _finalizeSignIn(e,t){_(void 0!==this.enrollmentId&&void 0!==this.otp,e,"argument-error");let i={verificationCode:this.otp};return b(e,"POST","/v2/accounts/mfaSignIn:finalize",C(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:i}))}}class iC{constructor(e,t,i,r,n,s,a){this.sessionInfo=s,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=i,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=n}static _fromStartTotpMfaEnrollmentResponse(e,t){return new iC(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var i;let r=!1;return(ib(e)||ib(t))&&(r=!0),r&&(ib(e)&&(e=(null===(i=this.auth.currentUser)||void 0===i?void 0:i.email)||"unknownuser"),ib(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}}function ib(e){return void 0===e||(null==e?void 0:e.length)===0}var iO="@firebase/auth",iN="1.7.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),(null===(e=this.auth.currentUser)||void 0===e?void 0:e.uid)||null}async getToken(e){return(this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser)?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e((null==t?void 0:t.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){_(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}let iL=(0,s.Pz)("authIdTokenMaxAge")||300,iD=null,iU=e=>async t=>{let i=t&&await t.getIdTokenResult(),r=i&&(new Date().getTime()-Date.parse(i.issuedAtTime))/1e3;if(r&&r>iL)return;let n=null==i?void 0:i.token;iD!==n&&(iD=n,await fetch(e,{method:n?"POST":"DELETE",headers:n?{Authorization:`Bearer ${n}`}:{}}))};function iM(e=(0,n.Mq)()){let t=(0,n.qX)(e,"auth");if(t.isInitialized())return t.getImmediate();let i=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e,t){let i=(0,n.qX)(e,"auth");if(i.isInitialized()){let e=i.getImmediate(),r=i.getOptions();if((0,s.vZ)(r,null!=t?t:{}))return e;p(e,"already-initialized")}return i.initialize({options:t})}(e,{popupRedirectResolver:iT,persistence:[tx,tw,ty]}),r=(0,s.Pz)("authTokenSyncURL");if(r&&"boolean"==typeof isSecureContext&&isSecureContext){let e=new URL(r,location.origin);if(location.origin===e.origin){var a,o;let t=iU(e.toString());a=()=>t(i.currentUser),(0,s.m9)(i).beforeAuthStateChanged(t,a),o=e=>t(e),(0,s.m9)(i).onIdTokenChanged(o,void 0,void 0)}}let l=(0,s.q4)("auth");return l&&function(e,t,i){let r=eE(e);_(r._canInitEmulator,r,"emulator-config-failed"),_(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");let n=eA(t),{host:s,port:a}=function(e){let t=eA(e),i=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!i)return{host:"",port:null};let r=i[2].split("@").pop()||"",n=/^(\[[^\]]+\])(:|$)/.exec(r);if(n){let e=n[1];return{host:e,port:eL(r.substr(e.length+1))}}{let[e,t]=r.split(":");return{host:e,port:eL(t)}}}(t),o=null===a?"":`:${a}`;r.config.emulator={url:`${n}//${s}${o}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:s,port:a,protocol:n.replace(":",""),options:Object.freeze({disableWarnings:!1})}),function(){function e(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}"undefined"!=typeof console&&"function"==typeof console.info&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",e):e())}()}(i,`http://${l}`),i}eR={loadJS:e=>new Promise((t,i)=>{var r,n;let s=document.createElement("script");s.setAttribute("src",e),s.onload=t,s.onerror=e=>{let t=f("internal-error");t.customData=e,i(t)},s.type="text/javascript",s.charset="UTF-8",(null!==(n=null===(r=document.getElementsByTagName("head"))||void 0===r?void 0:r[0])&&void 0!==n?n:document).appendChild(s)}),gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="},r="Browser",(0,n.Xd)(new l.wA("auth",(e,{options:t})=>{let i=e.getProvider("app").getImmediate(),n=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:o}=i.options;_(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});let l=new ek(i,n,s,{apiKey:a,authDomain:o,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:eI(r)});return function(e,t){let i=(null==t?void 0:t.persistence)||[],r=(Array.isArray(i)?i:[i]).map(es);(null==t?void 0:t.errorMap)&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,null==t?void 0:t.popupRedirectResolver)}(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),(0,n.Xd)(new l.wA("auth-internal",e=>new iA(eE(e.getProvider("auth").getImmediate())),"PRIVATE").setInstantiationMode("EXPLICIT")),(0,n.KN)(iO,iN,/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}(r)),(0,n.KN)(iO,iN,"esm2017")}}]);