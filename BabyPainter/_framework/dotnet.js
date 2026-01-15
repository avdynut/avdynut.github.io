//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",noCache:!0,useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"fad253f51b461736dfd3cd9c15977bb7493becef",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "BabyPainter.Browser",
  "resources": {
    "hash": "sha256-bLNsSSPURv5FQlEXNsOyihL1RbxfhJyFVKkJoTCfv1w=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.6ffcncxmzj.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.0j6ezsi0n0.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.irt422j02s.wasm",
        "integrity": "sha256-rinsIa+wjHdeugl+2o4DnvnLnroQLZkcKdMGRqPQ/VQ="
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.tjcz0u77k5.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk="
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.tptq2av103.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc="
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.lfu7j35m59.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs="
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.xtvge34kar.wasm",
        "integrity": "sha256-2wDemXRXkPawH5zg0JKtyEl3XSjw5XAU+Vi3ahvpF6M="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.cpwokbc5jc.wasm",
        "integrity": "sha256-kFvmkcgdmVYRtmEaELKBFFHyCDwEbH2rdEx2RI0otqg="
      }
    ],
    "assembly": [
      {
        "virtualPath": "BabyPainter.Browser.wasm",
        "name": "BabyPainter.Browser.8q2h10301e.wasm",
        "integrity": "sha256-EPmrk5nvgy4juMWIO3uhGbEeVy2HNZ8qHnQsa8azBWs="
      },
      {
        "virtualPath": "BabyPainter.wasm",
        "name": "BabyPainter.zyhbegq9bm.wasm",
        "integrity": "sha256-ReLbezwGfLu5fG0CvJ1/g6hU1GtJ/u5T4r+Dhlab+gw="
      },
      {
        "virtualPath": "CommunityToolkit.Mvvm.wasm",
        "name": "CommunityToolkit.Mvvm.489xgllggd.wasm",
        "integrity": "sha256-DH9K+c6gWHHMnlD9A7th0wjwbnPKYJt2IFX84S/UuGo="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.ha76mz3uwp.wasm",
        "integrity": "sha256-aVyJ5PAaZfFQUPV6gTfyMKJ7XEVSCtniCD3qQaXPyn0="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.t1z4wo8g9z.wasm",
        "integrity": "sha256-cYoI3gqfQ+s01rQQ8NvyASe2q8M9iNY7MlNS+BXAIRs="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.cl9mz1xe3o.wasm",
        "integrity": "sha256-8O7I8GyJvR+1ZewWLOsGGlPHkdU2/edkWv7fnjmbcxM="
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.4gqxp54114.wasm",
        "integrity": "sha256-JHGph9W98qVWjWenNUsb4O165kOYuIWSHtwf3XA1QcU="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.vydvg25cgq.wasm",
        "integrity": "sha256-if+LK/X2QiubYZTpryZvRrMyTu2U2TFOuAkbwh3zGOA="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.dsinhvif0g.wasm",
        "integrity": "sha256-I9RchUtUIR389BC9FoYb+kicxmt1RhJha7WRlbfEbBQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.33kpvunugc.wasm",
        "integrity": "sha256-EScOvyLYbGHyXzhFvrjRm2JZrZ6rIDhmUXRvPgDTopY="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.wzc74awgek.wasm",
        "integrity": "sha256-dNb1W8s4Zn2zP7HJzEk1M8NM3WcmrLvodHpEPPNcdWk="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.3snpc8ocur.wasm",
        "integrity": "sha256-o3DZ22g4zto3RmLtosapeKSFHJzL3VXoNJfcMmtGWGk="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.qqmv2j63mh.wasm",
        "integrity": "sha256-Hu2MjLPZLBKV+cEj1/HeT9wXN2iKtKFeDehUgyhZTmc="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.efb40z18hz.wasm",
        "integrity": "sha256-2o41anbTbxpSDCdgiXgltHqZusjWuT1+M9amuIjDsAM="
      },
      {
        "virtualPath": "Microsoft.Extensions.ObjectPool.wasm",
        "name": "Microsoft.Extensions.ObjectPool.ojtr8l9akz.wasm",
        "integrity": "sha256-rKV5OsgPdT/dziClKx+rXomN3MiipX217V7XqBJvlts="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.hpxn5zhjfy.wasm",
        "integrity": "sha256-ZWvLi4uD1DhpugB3wdKLcFn2yjTRZKmZhg7SRHhNgxE="
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.ggysv59g1w.wasm",
        "integrity": "sha256-kB+vcJr9OWqlhFNDqdl4hrCesoHelSc6j+I64ymVhe0="
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.58jjh3bwur.wasm",
        "integrity": "sha256-FTVJx7gilBV/VWu+ibz7K8ueo7JUXPGj94aH0rf2FXQ="
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.betqyv1awt.wasm",
        "integrity": "sha256-rRq61G5+VpvRhc2RdIUOJdMTUibtZislv30ocJcRdV0="
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.8m1225bit8.wasm",
        "integrity": "sha256-UOWim5DzjNCTCkxC9yd29dMsDE/bzc6Aejie/iaa1Qs="
      },
      {
        "virtualPath": "OpenSilver.wasm",
        "name": "OpenSilver.57qcg9oco4.wasm",
        "integrity": "sha256-X5zAIy0RRnv03nuqHq4AfL1mszuig+4ogcxY7M3VEas="
      },
      {
        "virtualPath": "OpenSilver.Browser.wasm",
        "name": "OpenSilver.Browser.8ewv9ixvkf.wasm",
        "integrity": "sha256-QEkYVDHHPYLjOTRwZtEgqSAz+Z1FYZRzNrwoY/+MQTM="
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.DataForm.Toolkit.wasm",
        "name": "OpenSilver.Controls.Data.DataForm.Toolkit.ijpkm9np3t.wasm",
        "integrity": "sha256-Tgj4XxN96eM7VOtVBOZ4tZpzY6P1QuqZ3lCLTISDTbM="
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.Input.wasm",
        "name": "OpenSilver.Controls.Data.Input.abgjlk88b2.wasm",
        "integrity": "sha256-Vl5a+ZSmf2EJQ7M7DFR81JHlEE4aF7IZvp4OVane8qc="
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.Toolkit.wasm",
        "name": "OpenSilver.Controls.Data.Toolkit.r94wdtnxio.wasm",
        "integrity": "sha256-n06b3NtzcTpczKdkW/axegaLxKX8vSbcC+dOGbetOuc="
      },
      {
        "virtualPath": "OpenSilver.Controls.Data.wasm",
        "name": "OpenSilver.Controls.Data.hsoal152za.wasm",
        "integrity": "sha256-AUVvtCtt8vxsnka/+30g48az9Smjgj9Z1fQ/AXdDSVM="
      },
      {
        "virtualPath": "OpenSilver.Controls.DataVisualization.Toolkit.wasm",
        "name": "OpenSilver.Controls.DataVisualization.Toolkit.452tcb4eyt.wasm",
        "integrity": "sha256-GAgXLHOrE4UfThEnekL6N789q5+HsZfaYq/zxZjl2UA="
      },
      {
        "virtualPath": "OpenSilver.Controls.Input.Toolkit.wasm",
        "name": "OpenSilver.Controls.Input.Toolkit.is3vw38ahe.wasm",
        "integrity": "sha256-Ds9lHOiYwVuxJY96LoVQWUUsmOxHaUNx4aKPxUiKZoI="
      },
      {
        "virtualPath": "OpenSilver.Controls.Input.wasm",
        "name": "OpenSilver.Controls.Input.t2dnmuqp8y.wasm",
        "integrity": "sha256-9Y8vXJEmzWJCrA5S/oBg7DLVuFnqkN5hxiyrd3bKSpM="
      },
      {
        "virtualPath": "OpenSilver.Controls.Layout.Toolkit.wasm",
        "name": "OpenSilver.Controls.Layout.Toolkit.xfpvkphoa8.wasm",
        "integrity": "sha256-jToBsAadJMdgnAkgC8ObcJHwthihSvU0d+tFDeRuSh0="
      },
      {
        "virtualPath": "OpenSilver.Controls.Navigation.wasm",
        "name": "OpenSilver.Controls.Navigation.n8f9wot4ic.wasm",
        "integrity": "sha256-ZwVqonwCle0F9xVfhp8Uy+dIwirB9jQU2bOmUedJHlQ="
      },
      {
        "virtualPath": "OpenSilver.Controls.Theming.Toolkit.wasm",
        "name": "OpenSilver.Controls.Theming.Toolkit.l4k6wcz2l0.wasm",
        "integrity": "sha256-m9Q2W+8xRRm4ZeTPpeKrSJUys6Tb/983Qj0lPi/wSKI="
      },
      {
        "virtualPath": "OpenSilver.Controls.Toolkit.wasm",
        "name": "OpenSilver.Controls.Toolkit.g26m4d6cnm.wasm",
        "integrity": "sha256-yP/6RJrQs56OwDVuKeOajpJaSpLbgv8q7zAqV1pJWXk="
      },
      {
        "virtualPath": "OpenSilver.Controls.wasm",
        "name": "OpenSilver.Controls.vpcvg5bgnb.wasm",
        "integrity": "sha256-I0ZyNdaO/fMRulPxkM4LNALncg3KwLYGHDMp1VyXf60="
      },
      {
        "virtualPath": "OpenSilver.Data.wasm",
        "name": "OpenSilver.Data.ol7if4o4wu.wasm",
        "integrity": "sha256-/HWy5R5tXd4qFhWr85qmGVVZ45EGlyG290Q53k+C6/E="
      },
      {
        "virtualPath": "OpenSilver.Expression.Effects.wasm",
        "name": "OpenSilver.Expression.Effects.hi7be0hw5c.wasm",
        "integrity": "sha256-ydgbXBDCJspLLUe5CioAwANMJOkMTqLjV5YSaq9pf4I="
      },
      {
        "virtualPath": "OpenSilver.Expression.Interactions.wasm",
        "name": "OpenSilver.Expression.Interactions.p71dffvzqx.wasm",
        "integrity": "sha256-m/3yWcMbCrfETBXPi9e+uaTuEBvdKPfz6Vtz7YJS5ao="
      },
      {
        "virtualPath": "OpenSilver.Interactivity.wasm",
        "name": "OpenSilver.Interactivity.6icwj0xkfr.wasm",
        "integrity": "sha256-svVolOTHG/ua/WNy2QCccx9FxF9d9myVujZowbTGx8Q="
      },
      {
        "virtualPath": "OpenSilver.Themes.Modern.wasm",
        "name": "OpenSilver.Themes.Modern.5uqsdl39yn.wasm",
        "integrity": "sha256-3YdMWHaohmN58quQmgVlvTGmxOuFQwI+Z4+jb7UlaKc="
      },
      {
        "virtualPath": "OpenSilver.WebAssembly.wasm",
        "name": "OpenSilver.WebAssembly.8bksrusjt5.wasm",
        "integrity": "sha256-LPfSYSvdUeTule8/L+mtdrecoVVCMXfJtmyrIkAsTzI="
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.0rjii1srtc.wasm",
        "integrity": "sha256-hFUXSZrGMpGzVJiVUXosiKJDEzee8T58DnNTCaMu6+Q="
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.okvni5feen.wasm",
        "integrity": "sha256-aArpzlpbB/6eA2La6eNTkE33/tETOf4GmGTq1qihnLI="
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.g3gh9icisy.wasm",
        "integrity": "sha256-vNwriAw1VEJCozzjwzw731cgt77EKLTEKmjKxTHZxTQ="
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.zrdsrxgz9k.wasm",
        "integrity": "sha256-Qez7qXDAOO3frCJsdNC1xiuuR7qR/6pcTdfxLnCgXzA="
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.apyoju1ch2.wasm",
        "integrity": "sha256-Uv90AexS0/LaK4rFrRlGluHn34AtX12j2pxf1CAEk/0="
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.cdcclkitux.wasm",
        "integrity": "sha256-oC6Gv9UGostemV3nwdu4CM7FvqGB4Cz6E9eo2f9xZcI="
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.frlf6qvmcw.wasm",
        "integrity": "sha256-FQZeBmWJVz3fLbQ/sHKJ58xzB69H+jtyaoQyZwjFFc4="
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.2uqy32hlru.wasm",
        "integrity": "sha256-psiWcz+YrUjwT8cR/Jj2/Xw6ITusITJF1xyLbBxPy8U="
      },
      {
        "virtualPath": "System.ComponentModel.Composition.Initialization.wasm",
        "name": "System.ComponentModel.Composition.Initialization.awkpv5wm0e.wasm",
        "integrity": "sha256-9pbKvBPvgGWA3NHlAUBzhelnZEAyH8uo7CTiz3Qu+3I="
      },
      {
        "virtualPath": "System.ComponentModel.Composition.wasm",
        "name": "System.ComponentModel.Composition.icmt9k6km8.wasm",
        "integrity": "sha256-Yu8NBJS2Eqh45MuVCw92ihg5vfkQ6WodkpucJbL+Rgg="
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.u9q9qdoqwr.wasm",
        "integrity": "sha256-QpvTOBgPdwZlEDO0afshRQpxIpI9KvTWxFQl6Du1uKg="
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.q9j6ukf89s.wasm",
        "integrity": "sha256-8rq4F6Mdu+34/JR85sTP1WqNIKIdPtmpi7ToPKssMc0="
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.zsx0lvoxsw.wasm",
        "integrity": "sha256-I3zwWdOdlE0cDCcO6sWTv+yaJXmeXmxJY0wNZAF6LEg="
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.sdbahhrjb5.wasm",
        "integrity": "sha256-4KLL8QiQhozQgMMlgq9bVbwwG4S8QOxzn9Br50tRu5Y="
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.vuddzflgup.wasm",
        "integrity": "sha256-mYmzuk03Y33Smysre50fxaCGhBjIpdVFH17vcIxQnF4="
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.bu990bzp7n.wasm",
        "integrity": "sha256-ExbyMDs59aYsMfGK99y5BYdSiwouXsEOns5zJoiQLvM="
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.oakgewjy9t.wasm",
        "integrity": "sha256-QDdp05tHO/f/1gySPqq4pAqWQml36TWxOI3rji3lqPI="
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.s7dbo9szdt.wasm",
        "integrity": "sha256-WIyHTu47p8CstzRbrNbl/gSIpnZfetaI7jbGxwqv9B0="
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.7sz6q59vz0.wasm",
        "integrity": "sha256-WSenoU4OMDyjXTfSQVfbCerB4ukLDEIe7mNCtEAlR7M="
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.r7u3lvoatq.wasm",
        "integrity": "sha256-t8yz5hNrb25LQlfmsi/xSLrTUB4Tx3BJvyJkrm0qwV8="
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.s0y5d69zl6.wasm",
        "integrity": "sha256-hG9XeR3oD6OpfrsXFvDg18sixcNKPCqQKvgqkoTvu0k="
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.q2smtnx4p0.wasm",
        "integrity": "sha256-Xr+Q7Dh3UcmDZfCsUqhR7GRCwGjH5mb2gVCpWFtZSUU="
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.4f8vg2rcxi.wasm",
        "integrity": "sha256-YETgkYsSCpN1j8iN/kykAr/xvo1Wj21YdTdxzCtB1LQ="
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.7f0jmt19da.wasm",
        "integrity": "sha256-40JKZsLJ3rVFEXWjK8aBQdgbLhhql1Fvxxmde/iUYoM="
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.dcx1h2jdhz.wasm",
        "integrity": "sha256-DcieCMruYh8Tbchpo6UmpEPR8mOI84i3Rz4BLMX60Ug="
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.dbl90sfow9.wasm",
        "integrity": "sha256-10uz6XEhT3OkdnV0hJahozc7rNZwOtZt5loyokIlRnc="
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.h4owo5mutz.wasm",
        "integrity": "sha256-IW7z3pmHWPEl3jO0XqxPTRCkTWU7rTYvSl+JnixJbp4="
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.hyfcdqjume.wasm",
        "integrity": "sha256-yWCyxJpQ2O4I+/dzw62cgIYo7UNuZc478Elu1qiOXsg="
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.6pk6o5e2of.wasm",
        "integrity": "sha256-tqUbj0rwpg28m9eYNXv3A5Uiqb2yIQjxsJKdimXaiX0="
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.xo2n3w9xn5.wasm",
        "integrity": "sha256-YaDKmApqB9ww+YkwZfckX2S9i9tr+C1d4gChShmoYpg="
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.1wo8vbpv0e.wasm",
        "integrity": "sha256-AQtQnOqfLMF0VGx+AatM/hrC2ldzN4IUrQC6Ek8MH3w="
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.7l2jd3g006.wasm",
        "integrity": "sha256-JVO8GhKcAAXV9OLieDVVNw99mU3OM1DCKCZJcKSjqck="
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.v4u8lis8q1.wasm",
        "integrity": "sha256-cTh63SW5LhHiuKIs/Bl4Gt0xKOfq4apmCqYLp3Sykyc="
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.2dxoq15y1f.wasm",
        "integrity": "sha256-5oxjSu7NTUF3ZevZ6ayxMmQqEvVz7xKruC69/rF9kk4="
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.tfxtg3xqk0.wasm",
        "integrity": "sha256-dyUZfQYGLjTt5CAtlEaOEA+dSoM7PttE8xl8O1DElLM="
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.j7aud7n1w0.wasm",
        "integrity": "sha256-L+hFmIgy0ZN49DRhg//eFGdfvCRLQ7B2qBruEeKNGdI="
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.oc2qi3h58p.wasm",
        "integrity": "sha256-aByjC8ug5/ZRabIKeoEFVj0X3uly8QzaQ3ghpCfOrXY="
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.or76vv2o84.wasm",
        "integrity": "sha256-LBjLns3DXfvriz7Vh91KvG0ZKwxulNjYrs9lxIvKU8s="
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.zwhghpcz15.wasm",
        "integrity": "sha256-TQxaA9tihniqHdUFUg2Zo66Dn2i/kPKHP2pzHH6zmK0="
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.gdndtxn7ev.wasm",
        "integrity": "sha256-bLcX6bpH+hWhdnDZr58iK7FCNTeYHGZBFFYSoZCUdxs="
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.6dkep9az7o.wasm",
        "integrity": "sha256-ZsREkoGCSo3RlAfr4hyjQQMRyhK0bPXuvoSa24Mjk3o="
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.bz1ucydll8.wasm",
        "integrity": "sha256-h8l23/KLt3MRZPapJHm/NGuwjVkMg2/zppGoeGAbxHs="
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.gep9eginc1.wasm",
        "integrity": "sha256-2NaObkwoP7Agp2ayvIKSgzJtWIeWP1z5fp4koewJLPA="
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.i45e8uze45.wasm",
        "integrity": "sha256-jv76fyILMzSXbX8UMc2Mr/JE0/lZfCCttsNCsAEldzI="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.gjlzj0lo0m.wasm",
        "integrity": "sha256-zJo6g1jH/ZNpgUalIIWNspjgOKPQiHKjZ/LMOW95y3A="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.z9qwgdpwe7.wasm",
        "integrity": "sha256-B0HmAPLlYhtbb/PbPbMXTmUHy1hFPF775qNiSDElbmY="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.ocwgxadidg.wasm",
        "integrity": "sha256-OH/aLex9MbjdT9haHVkdaxt35NZ71nRbgI6d4RlwX3o="
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.qqm0tgsj4t.wasm",
        "integrity": "sha256-InCOoppJsT8bSf1qROWRgF5FcOxvhn/ogpvi5Vue2T8="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.5lnbtm8ynj.wasm",
        "integrity": "sha256-KaFpAIpSBmwtAXA0t92ohWvUiRqOYkNs5JcqTFqxmKQ="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.1uoujpte5v.wasm",
        "integrity": "sha256-OSAUuVxSBH5v8RUppxTxBgL6bZxyJ/7/kVZjk0sPyn0="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.8p0tiw5c0c.wasm",
        "integrity": "sha256-NDUjDAWPearUpzYrEjcCxxj+eg82uZ4XAiwZBXh0H3s="
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.w3dv23azma.wasm",
        "integrity": "sha256-5B1v3kmmTYCcY5QyJHyQv6r2FE+DqpSgZ/Fd25n+wAY="
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.ptpsrnvdrl.wasm",
        "integrity": "sha256-Q6cnwBpBv5jcG6Bg3sjfrHGqqrtGUjpzccuCKGitlbU="
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.fpr05ucg91.wasm",
        "integrity": "sha256-Q6m1WVgacAFr3zXtnGXlpVc6nIMtiTGKzj5H47IrXds="
      },
      {
        "virtualPath": "System.Security.Cryptography.Xml.wasm",
        "name": "System.Security.Cryptography.Xml.a7ehdxlqz4.wasm",
        "integrity": "sha256-2nxlBo4SkjueaARWxO2aKeDWzsZVSCZCxQ9Gfe35tjI="
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.9bi905u420.wasm",
        "integrity": "sha256-9diaSpvuonB+XZHBckQdPKGOsryQoIKwT4cjX4bNwTs="
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.vcmku9bbie.wasm",
        "integrity": "sha256-L8DLT8DvRsdAjjICkllNy7IOwyQTsVf8SGmspGZVIJI="
      },
      {
        "virtualPath": "System.ServiceModel.wasm",
        "name": "System.ServiceModel.3dk0gfdu13.wasm",
        "integrity": "sha256-F2OmgVYoVKp5oHZdWMWo2O7Z+Wvr1JWNeT+pZQAGRK4="
      },
      {
        "virtualPath": "System.ServiceModel.Duplex.wasm",
        "name": "System.ServiceModel.Duplex.hccdd63tc3.wasm",
        "integrity": "sha256-wfRorSMSt9wIaS9zk7pYl/e2It/TZfdmPhk1+scMSRs="
      },
      {
        "virtualPath": "System.ServiceModel.Primitives.wasm",
        "name": "System.ServiceModel.Primitives.874s3i2p9d.wasm",
        "integrity": "sha256-vDAA10tGmlzJj7xBew1hL/SR9MmKhY/RZE+wGxwVAqw="
      },
      {
        "virtualPath": "System.ServiceModel.Security.wasm",
        "name": "System.ServiceModel.Security.8pkegjgj07.wasm",
        "integrity": "sha256-TFy6toELDkw0m7PVdpXroCdXUOp+5tVGcxpHBmXbYrM="
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.x98uzfezfg.wasm",
        "integrity": "sha256-mzvF6YD1bkeW0pDutvF+xE+1uVuZvA0LVHLm+oKdnFc="
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.imlv6nv0qk.wasm",
        "integrity": "sha256-OvEBMYP3m6YFPp/NJCvAnsJA09AWIOxl2eIGdIvP8+g="
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.36oaae3kyv.wasm",
        "integrity": "sha256-2wqFWg4w5BgvCUBdVHNtJC6MH3TvpJp3fKrUwsOf88w="
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.1mnsgfhgj9.wasm",
        "integrity": "sha256-iSL5M8Y12ykGDkGX5+2D7Gv+ITH5y85xYYSHg/5kscA="
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.c93yzlkyjc.wasm",
        "integrity": "sha256-AIRSmtjc0M2nlIhPjyfAJ+mF5I0IXNaff4KZqG5dbRs="
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.njiifxjbt4.wasm",
        "integrity": "sha256-Y7Gkqp24oXkFHPWUrsc53bKZZpdDIdorQWM6pYM1w/Q="
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.78p1e9tu9l.wasm",
        "integrity": "sha256-9xdVzwyZFhlnPGy3COXwOhqxT+0uy4u9Ns5/OjRJBUo="
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.gurof5j9fm.wasm",
        "integrity": "sha256-CEqT+i7reDephcPcrOWZ0i8ALZTYrx/I7Dkj4Ob38Qo="
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.p4r6mofj68.wasm",
        "integrity": "sha256-2bQuQUyPNtRzYw2xE5zAQdAk1lPIAw4xTudeCzOTv2g="
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.5yuqihgprm.wasm",
        "integrity": "sha256-02rCOZRO4HL09jNh0+VZFhSrfGMjO344nq2/WdEjkuQ="
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.ezielfqkzx.wasm",
        "integrity": "sha256-msiP+hhmOL4pxMsH0pIsueaLh78LNDe1D7Gz60N0jvk="
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.6zjo9kpf8t.wasm",
        "integrity": "sha256-IkTnKvR5T6w4EtSNlBrPDlfXiyV3wPQj4XNSvA9CDds="
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.tzaqgy6ds7.wasm",
        "integrity": "sha256-1839i1igOPmzBYA5CnkGWTAReeLXYJG3xIDYywCaAzU="
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.73436igil7.wasm",
        "integrity": "sha256-cwWOZaOlWiAEvO+KvJwrGbZmVGU/y9yYgansWdR1DsQ="
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.jj5f48nyxw.wasm",
        "integrity": "sha256-MaJ5jP3kPOmV/AZrZ6j9lFRbSi/cSTdn05qTCenjX08="
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.kuc5xjgr0q.wasm",
        "integrity": "sha256-TH11pnlmL8daPKFPd52VqjnsRbv1Sd2VleyaDNIodps="
      }
    ],
    "satelliteResources": {
      "es": [
        {
          "virtualPath": "BabyPainter.resources.wasm",
          "name": "BabyPainter.resources.cw9a2ne4r2.wasm",
          "integrity": "sha256-ZNGxYTnnQAW07F8b+4x6TW9t4HO1/te6K0U2CjYaMTg="
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.9x9e8vpihg.wasm",
          "integrity": "sha256-Q+IEo6Y3ep+Yq3dGoNv+dONx+vbGjZWxMpZXpRNErfI="
        }
      ],
      "fr": [
        {
          "virtualPath": "BabyPainter.resources.wasm",
          "name": "BabyPainter.resources.gq9a9q211j.wasm",
          "integrity": "sha256-yAD8crl5va41RyP016Z9EnGtZ//Wz5kcKfQ4IrXusZw="
        },
        {
          "virtualPath": "OpenSilver.resources.wasm",
          "name": "OpenSilver.resources.5s51e1jf2p.wasm",
          "integrity": "sha256-hTXMEZxli/F0PNLtWFIAYq5/keEOHldLKIn+718XvAk="
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.uzoepk1yy0.wasm",
          "integrity": "sha256-Co/FgGAC4oUBaOKCXGTGERxAzccQSoSd+jDV0zItEpE="
        }
      ],
      "ru": [
        {
          "virtualPath": "BabyPainter.resources.wasm",
          "name": "BabyPainter.resources.j93gpmr6di.wasm",
          "integrity": "sha256-eYoIF6GLuojwjhjPVBM7ZKomz7/3hsTyqVpyfEX6gcw="
        },
        {
          "virtualPath": "System.ServiceModel.Primitives.resources.wasm",
          "name": "System.ServiceModel.Primitives.resources.r2qyztjans.wasm",
          "integrity": "sha256-fQAeCI4Ux+XEPUlsPnMTjYRqiVhEV3VSdvFu4B+xccY="
        }
      ]
    }
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "MVVMTOOLKIT_ENABLE_INOTIFYPROPERTYCHANGING_SUPPORT": true,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
