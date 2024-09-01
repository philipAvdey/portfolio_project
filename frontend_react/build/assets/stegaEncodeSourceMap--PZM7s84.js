import{b as J}from"./index-Dr0Olnjv.js";const T=/_key\s*==\s*['"](.*)['"]/;function v(e){return typeof e=="string"?T.test(e.trim()):typeof e=="object"&&"_key"in e}function I(e){if(!Array.isArray(e))throw new Error("Path is not an array");return e.reduce((t,n,r)=>{const o=typeof n;if(o==="number")return`${t}[${n}]`;if(o==="string")return`${t}${r===0?"":"."}${n}`;if(v(n)&&n._key)return`${t}[_key=="${n._key}"]`;if(Array.isArray(n)){const[s,a]=n;return`${t}[${s}:${a}]`}throw new Error(`Unsupported path segment \`${JSON.stringify(n)}\``)},"")}const j={"\f":"\\f","\n":"\\n","\r":"\\r","	":"\\t","'":"\\'","\\":"\\\\"},P={"\\f":"\f","\\n":`
`,"\\r":"\r","\\t":"	","\\'":"'","\\\\":"\\"};function V(e){return`$${e.map(t=>typeof t=="string"?`['${t.replace(/[\f\n\r\t'\\]/g,n=>j[n])}']`:typeof t=="number"?`[${t}]`:t._key!==""?`[?(@._key=='${t._key.replace(/['\\]/g,n=>j[n])}')]`:`[${t._index}]`).join("")}`}function U(e){const t=[],n=/\['(.*?)'\]|\[(\d+)\]|\[\?\(@\._key=='(.*?)'\)\]/g;let r;for(;(r=n.exec(e))!==null;){if(r[1]!==void 0){const o=r[1].replace(/\\(\\|f|n|r|t|')/g,s=>P[s]);t.push(o);continue}if(r[2]!==void 0){t.push(parseInt(r[2],10));continue}if(r[3]!==void 0){const o=r[3].replace(/\\(\\')/g,s=>P[s]);t.push({_key:o,_index:-1});continue}}return t}function C(e){return e.map(t=>{if(typeof t=="string"||typeof t=="number")return t;if(t._key!=="")return{_key:t._key};if(t._index!==-1)return t._index;throw new Error(`invalid segment:${JSON.stringify(t)}`)})}function G(e){return e.map(t=>{if(typeof t=="string"||typeof t=="number")return t;if(t._index!==-1)return t._index;throw new Error(`invalid segment:${JSON.stringify(t)}`)})}function K(e,t){if(!(t!=null&&t.mappings))return;const n=V(G(e));if(t.mappings[n]!==void 0)return{mapping:t.mappings[n],matchedPath:n,pathSuffix:""};const r=Object.entries(t.mappings).filter(([d])=>n.startsWith(d)).sort(([d],[u])=>u.length-d.length);if(r.length==0)return;const[o,s]=r[0],a=n.substring(o.length);return{mapping:s,matchedPath:o,pathSuffix:a}}function z(e){return e!==null&&Array.isArray(e)}function A(e){return typeof e=="object"&&e!==null}function b(e,t,n=[]){return z(e)?e.map((r,o)=>{if(A(r)){const s=r._key;if(typeof s=="string")return b(r,t,n.concat({_key:s,_index:o}))}return b(r,t,n.concat(o))}):A(e)?Object.fromEntries(Object.entries(e).map(([r,o])=>[r,b(o,t,n.concat(r))])):t(e,n)}function B(e,t,n){return b(e,(r,o)=>{if(typeof r!="string")return r;const s=K(o,t);if(!s)return r;const{mapping:a,matchedPath:d}=s;if(a.type!=="value"||a.source.type!=="documentValue")return r;const u=t.documents[a.source.document],f=t.paths[a.source.path],h=U(d),y=U(f).concat(o.slice(h.length));return n({sourcePath:y,sourceDocument:u,resultPath:o,value:r})})}const E="drafts.";function H(e){return e.startsWith(E)?e.slice(E.length):e}function X(e){const{baseUrl:t,workspace:n="default",tool:r="default",id:o,type:s,path:a,projectId:d,dataset:u}=e;if(!t)throw new Error("baseUrl is required");if(!a)throw new Error("path is required");if(!o)throw new Error("id is required");if(t!=="/"&&t.endsWith("/"))throw new Error("baseUrl must not end with a slash");const f=n==="default"?void 0:n,h=r==="default"?void 0:r,y=H(o),_=Array.isArray(a)?I(C(a)):a,i=new URLSearchParams({baseUrl:t,id:y,type:s,path:_});f&&i.set("workspace",f),h&&i.set("tool",h),d&&i.set("projectId",d),u&&i.set("dataset",u),o.startsWith(E)&&i.set("isDraft","");const k=[t==="/"?"":t];f&&k.push(f);const p=["mode=presentation",`id=${y}`,`type=${s}`,`path=${encodeURIComponent(_)}`];return h&&p.push(`tool=${h}`),k.push("intent","edit",`${p.join(";")}?${i}`),k.join("/")}function F(e){let t=typeof e=="string"?e:e.baseUrl;return t!=="/"&&(t=t.replace(/\/$/,"")),typeof e=="string"?{baseUrl:t}:{...e,baseUrl:t}}const m=({sourcePath:e,resultPath:t,value:n})=>{if(Y(n)||Z(n))return!1;const r=e.at(-1);return!(e.at(-2)==="slug"&&r==="current"||typeof r=="string"&&r.startsWith("_")||typeof r=="number"&&e.at(-2)==="marks"||r==="href"&&typeof e.at(-2)=="number"&&e.at(-3)==="markDefs"||r==="style"||r==="listItem"||e.some(o=>o==="meta"||o==="metadata"||o==="openGraph"||o==="seo")||R(e)||R(t)||typeof r=="string"&&Q.has(r))},Q=new Set(["color","colour","currency","email","format","gid","hex","href","hsl","hsla","icon","id","index","key","language","layout","link","linkAction","locale","lqip","page","path","ref","rgb","rgba","route","secret","slug","status","tag","template","theme","type","unit","url","username","variant","website"]);function Y(e){return/^\d{4}-\d{2}-\d{2}/.test(e)?!!Date.parse(e):!1}function Z(e){try{new URL(e,e.startsWith("/")?"https://acme.com":void 0)}catch{return!1}return!0}function R(e){return e.some(t=>typeof t=="string"&&t.match(/type/i)!==null)}const w=20;function tt(e,t,n){var r,o,s,a,d,u,f,h,y;const{filter:_,logger:i,enabled:k}=n;if(!k){const l="config.enabled must be true, don't call this function otherwise";throw(r=i==null?void 0:i.error)==null||r.call(i,`[@sanity/client]: ${l}`,{result:e,resultSourceMap:t,config:n}),new TypeError(l)}if(!t)return(o=i==null?void 0:i.error)==null||o.call(i,"[@sanity/client]: Missing Content Source Map from response body",{result:e,resultSourceMap:t,config:n}),e;if(!n.studioUrl){const l="config.studioUrl must be defined";throw(s=i==null?void 0:i.error)==null||s.call(i,`[@sanity/client]: ${l}`,{result:e,resultSourceMap:t,config:n}),new TypeError(l)}const p={encoded:[],skipped:[]},L=B(e,t,({sourcePath:l,sourceDocument:g,resultPath:$,value:c})=>{if((typeof _=="function"?_({sourcePath:l,resultPath:$,filterDefault:m,sourceDocument:g,value:c}):m({sourcePath:l,resultPath:$,filterDefault:m,sourceDocument:g,value:c}))===!1)return i&&p.skipped.push({path:x(l),value:`${c.slice(0,w)}${c.length>w?"...":""}`,length:c.length}),c;i&&p.encoded.push({path:x(l),value:`${c.slice(0,w)}${c.length>w?"...":""}`,length:c.length});const{baseUrl:S,workspace:O,tool:W}=F(typeof n.studioUrl=="function"?n.studioUrl(g):n.studioUrl);if(!S)return c;const{_id:D,_type:N,_projectId:M,_dataset:q}=g;return J(c,{origin:"sanity.io",href:X({baseUrl:S,workspace:O,tool:W,id:D,type:N,path:l,...!n.omitCrossDatasetReferenceData&&{dataset:q,projectId:M}})},!1)});if(i){const l=p.skipped.length,g=p.encoded.length;if((l||g)&&((a=(i==null?void 0:i.groupCollapsed)||i.log)==null||a("[@sanity/client]: Encoding source map into result"),(d=i.log)==null||d.call(i,`[@sanity/client]: Paths encoded: ${p.encoded.length}, skipped: ${p.skipped.length}`)),p.encoded.length>0&&((u=i==null?void 0:i.log)==null||u.call(i,"[@sanity/client]: Table of encoded paths"),(f=(i==null?void 0:i.table)||i.log)==null||f(p.encoded)),p.skipped.length>0){const $=new Set;for(const{path:c}of p.skipped)$.add(c.replace(T,"0").replace(/\[\d+\]/g,"[]"));(h=i==null?void 0:i.log)==null||h.call(i,"[@sanity/client]: List of skipped paths",[...$.values()])}(l||g)&&((y=i==null?void 0:i.groupEnd)==null||y.call(i))}return L}function x(e){return I(C(e))}var nt=Object.freeze({__proto__:null,stegaEncodeSourceMap:tt});export{nt as a,B as e,tt as s};
