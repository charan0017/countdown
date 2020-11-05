"use strict";function _call(a,b,c){if(c)return b?b(a()):a();try{var d=Promise.resolve(a());return b?d.then(b):d}catch(a){return Promise.reject(a)}}var checkNighModeEnabled=_async(function(){var a="true"===localStorage.getItem(NightModeEnabled);return nightModeCheckbox.checked=!!a,_awaitIgnored(nightMode(!!a))});function _invoke(a,b){var c=a();return c&&c.then?c.then(b):b(c)}var nightMode=_async(function(){var a=!!(0<arguments.length&&void 0!==arguments[0])&&arguments[0];return updateClassList(rootDiv,a,"nightmode-background"),_invoke(function(){return a?void(rootDiv.style.backgroundImage=null):_call(getBingWallpaperUrl,function(a){rootDiv.style.backgroundImage="url('".concat(a,"')"),sleepDiv.style.backgroundImage="url('".concat(a,"')")})},function(){updateClassList(carouselDiv,!a,"bg-lite"),updateClassList(carouselDiv,a,"bg-w-drk"),updateClassList(remainingDurationDiv,!a,"bg-drk"),updateClassList(remainingDurationDiv,a,"bg-w-drk"),updateClassList(nightModeDiv,!a,"bg-drk"),updateClassList(nightModeDiv,a,"bg-w-drk"),updateClassList(sleepDiv,a,"nightmode-background"),updateClassList(sleepDiv,a,"nightmode-text")})});function _async(a){return function(){for(var b=[],c=0;c<arguments.length;c++)b[c]=arguments[c];try{return Promise.resolve(a.apply(this,b))}catch(a){return Promise.reject(a)}}}var nightModeDiv=rootDiv.querySelector("#night-mode");function _empty(){}var nightModeCheckbox=nightModeDiv.querySelector("#night-mode-input");function _awaitIgnored(a,b){if(!b)return a&&a.then?a.then(_empty):Promise.resolve()}var NightModeEnabled="NightModeEnabled";nightModeCheckbox.addEventListener("change",function(){this.checked?(nightMode(!0),localStorage.setItem(NightModeEnabled,!0)):(nightMode(!1),localStorage.setItem(NightModeEnabled,!1)),refreshWinForm()}),checkNighModeEnabled();