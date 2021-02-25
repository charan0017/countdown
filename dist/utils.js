"use strict";function _await(a,b,c){return c?b?b(a):a:(a&&a.then||(a=Promise.resolve(a)),b?a.then(b):a)}function _async(a){return function(){for(var b=[],c=0;c<arguments.length;c++)b[c]=arguments[c];try{return Promise.resolve(a.apply(this,b))}catch(a){return Promise.reject(a)}}}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function refreshWinForm(){window.external&&window.external.refresh&&window.external.refresh()}var getBingWallpaperUrl=_async(function(){var a=fetchItem("bingImgUrl");return a&&a.date===getTodaysDateStr()&&a.url?a.url:_await(fetch("https://api.codetabs.com/v1/proxy?quest=https://www.bing.com/?cc=in",corsProxyHeaders),function(a){return _await(a.text(),function(a){var b=parseImageUrl(a);return storeItem("bingImgUrl",{url:b}),b})})}),pad=function(a){return"00".concat(a).slice(-2)};function getCurrentInterval(){var a=new Date,b=a.getTimezoneOffset(),c=new Date(a.getTime()+6e4*(330+b));return{days:0,hrs:22-c.getHours(),mins:59-c.getMinutes(),secs:59-c.getSeconds()}}function getIntervalSeconds(a,b){var c=a.days,d=a.hrs,e=a.mins,f=a.secs,g=(c?60*(60*(24*c)):0)+(d?60*(60*d):0)+(e?60*e:0)+(f||0);return b?1e3*g:g}function getIntervalFromSeconds(a){var b=Math.floor,c=pad(b(a/60/60)),d=pad(b((a-60*(60*c))/60)),e=pad(b(a-60*(60*c)-60*d));return{days:0,hrs:c,mins:d,secs:e}}function getRemainingTime(a){var b=Math.round(getIntervalSeconds(getCurrentInterval(),a));return 0>b?0:b}function updateClassList(a,b,c){a&&a.classList[b?"add":"remove"](c)}function getTodaysDateStr(){return new Date().toISOString().split("T")[0]}function storeItem(a,b){var c=!(2<arguments.length&&arguments[2]!==void 0)||arguments[2];localStorage.setItem(a,c?JSON.stringify(_objectSpread({date:getTodaysDateStr()},b)):b)}function fetchItem(a){var b=localStorage.getItem(a);return b?JSON.parse(b):b}var bingUrl="https://www.bing.com",bingIndiaUrl="".concat("https://www.bing.com","/?cc=in"),corsProxy="https://api.codetabs.com/v1/proxy?quest=",corsProxyHeaders={mode:"cors"};// const corsProxy = 'https://cors-anywhere.herokuapp.com/';
// const corsProxyHeaders = {
// 	'Sec-Fetch-Dest': 'empty',
// 	'Sec-Fetch-Mode': 'cors',
// 	'Sec-Fetch-Site': 'cors-site',
// 	'Origin': 'null',
// };
function parseImageUrl(a){var b=a.match(/href="(.*?)"/g);if(!b)return null;var c=b.find(function(a){return a.includes("1920x1080")&&a.endsWith(".jpg\"")});return c?(c=c.replace("href=","").replace(/"/g,""),bingUrl+c):null}function createTaskChild(a,b){var c=a.getId(),d=document.createElement("a");return d.setAttribute("id","task-".concat(c)),d.setAttribute("class","mb-2 rounded list-group-item list-group-item-action pointer fade-in text-dark ".concat(a.isDone()?"text-strike":""," bg-w-lite")),d.innerHTML="<span id=\"task-".concat(c,"-simp\" class=\"float-left mr-3\"><i id=\"task-").concat(c,"-imp\" class=\"").concat(a.isImportant()?"fas":"far"," fa-star\"></i></span>").concat(a.title,"<span id=\"task-").concat(c,"-sdel\" class=\"float-right\"><i id=\"task-").concat(c,"-del\" class=\"fas fa-times-circle\"></span>"),d.addEventListener("click",function(a){return b(a,c)}),d.onanimationend=function(){d.classList.remove("fade-in")},d}function saveTasks(a){storeItem("tasksData",JSON.stringify(a),!1)}function loadTasks(){var a=fetchItem("tasksData");return Array.isArray(a)?a.map(function(a){return Task.fromJson(a)}):(saveTasks([]),[])}