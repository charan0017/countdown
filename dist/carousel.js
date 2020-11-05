"use strict";function _slicedToArray(a,b){return _arrayWithHoles(a)||_iterableToArrayLimit(a,b)||_unsupportedIterableToArray(a,b)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _iterableToArrayLimit(a,b){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(a)){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}}function _arrayWithHoles(a){if(Array.isArray(a))return a}function _async(a){return function(){for(var b=[],c=0;c<arguments.length;c++)b[c]=arguments[c];try{return Promise.resolve(a.apply(this,b))}catch(a){return Promise.reject(a)}}}function _call(a,b,c){if(c)return b?b(a()):a();try{var d=Promise.resolve(a());return b?d.then(b):d}catch(a){return Promise.reject(a)}}var fetchWeather=_async(function(){var a=fetchItem("weatherData");return a&&a.date===getTodaysDateTxtStr()?a:_await(fetch(weatherAPI),function(a){return _await(a.json(),function(a){var b=_slicedToArray(a,1),c=b[0],d={date:getTodaysDateTxtStr(),temp:"".concat(c.Temperature.Metric.Value," \xB0").concat(c.Temperature.Metric.Unit),text:c.WeatherText,icon:"https://www.accuweather.com/images/weathericons/".concat(c.WeatherIcon,".svg")};return storeItem("weatherData",d),d})})});function _await(a,b,c){return c?b?b(a):a:(a&&a.then||(a=Promise.resolve(a)),b?a.then(b):a)}var loadWeather=function(){return _call(fetchWeather,function(a){dateText.textContent=a.date,weatherTemp.textContent=a.temp,weatherText.textContent=a.text,weatherIconImg.src=a.icon})},fetchQuote=_async(function(){var a=fetchItem("quoteOfTheDay");return a&&a.date===getTodaysDateStr()?a:_await(fetch("".concat(window.location.href,"/assets/quotes.json")),function(a){return _await(a.json(),function(a){var b=parseInt(localStorage.getItem("lastQuoteIndex")||"-1"),c=b>a.length-1?0:b+1,d=a[c];return localStorage.setItem("lastQuoteIndex",c),storeItem("quoteOfTheDay",d),d})})}),loadQuote=function(){return _call(fetchQuote,function(a){var b=a.quote,c=a.quoteBy;b&&c&&(quoteText.innerText="\"".concat(b,"\""),quoteByText.innerText="\u2014 ".concat(c))})},carouselDiv=document.querySelector("#carousel"),weatherInfoDiv=carouselDiv.querySelector("#weather-info"),weatherIconImg=weatherInfoDiv.querySelector("#weather-icon"),weatherTemp=weatherInfoDiv.querySelector("#weather-temp"),weatherText=weatherInfoDiv.querySelector("#weather-text"),dateText=weatherInfoDiv.querySelector("#date-text"),quoteBoxDiv=carouselDiv.querySelector("#quote-box"),quoteText=quoteBoxDiv.querySelector("#quote"),quoteByText=quoteBoxDiv.querySelector("#quote-by"),slidesEls=Array.prototype.slice.call(carouselDiv.querySelectorAll(".slides")),weatherAPI="https://dataservice.accuweather.com/currentconditions/v1/202190?apikey=yWUtuxJWjXxO7dL9cSTc0PTLoXDdYGYF",days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],slideIndex=0;function carousel(){slidesEls.forEach(function(a){a.classList.contains("slides")||a.classList.add("slides")}),slideIndex++,slideIndex>slidesEls.length&&(slideIndex=1),slidesEls[slideIndex-1].classList.remove("slides"),setTimeout(carousel,4e3)}_async(function(){carousel(),loadWeather(),loadQuote()})();function getTodaysDateTxtStr(){var a=new Date,b=a.getDate(),c=a.toLocaleString("en-GB",{month:"long"}),d=a.getFullYear();return"".concat(days[a.getDay()],", ").concat(b," ").concat(c," ").concat(d)}