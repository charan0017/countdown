"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var carouselDiv = document.querySelector('#carousel');
var weatherInfoDiv = carouselDiv.querySelector('#weather-info');
var weatherIconImg = weatherInfoDiv.querySelector('#weather-icon');
var weatherTemp = weatherInfoDiv.querySelector('#weather-temp');
var weatherText = weatherInfoDiv.querySelector('#weather-text');
var dateText = weatherInfoDiv.querySelector('#date-text');
var quoteBoxDiv = carouselDiv.querySelector('#quote-box');
var quoteText = quoteBoxDiv.querySelector('#quote');
var quoteByText = quoteBoxDiv.querySelector('#quote-by');
var slidesEls = carouselDiv.querySelectorAll('.slides');
var weatherAPI = 'https://dataservice.accuweather.com/currentconditions/v1/202190?apikey=yWUtuxJWjXxO7dL9cSTc0PTLoXDdYGYF';
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var slideIndex = 0;

function carousel() {
  slidesEls.forEach(function (el) {
    if (el.classList.contains('slides')) return;
    el.classList.add('slides');
  });
  slideIndex++;

  if (slideIndex > slidesEls.length) {
    slideIndex = 1;
  }

  slidesEls[slideIndex - 1].classList.remove('slides');
  setTimeout(carousel, 4000);
}

_asyncToGenerator(function* () {
  carousel();
  loadWeather();
  loadQuote();
})();

function loadQuote() {
  return _loadQuote.apply(this, arguments);
}

function _loadQuote() {
  _loadQuote = _asyncToGenerator(function* () {
    var _yield$fetchQuote = yield fetchQuote(),
        quote = _yield$fetchQuote.quote,
        quoteBy = _yield$fetchQuote.quoteBy;

    if (!quote || !quoteBy) return;
    quoteText.innerText = "\"".concat(quote, "\"");
    quoteByText.innerText = "\u2014 ".concat(quoteBy);
  });
  return _loadQuote.apply(this, arguments);
}

function fetchQuote() {
  return _fetchQuote.apply(this, arguments);
}

function _fetchQuote() {
  _fetchQuote = _asyncToGenerator(function* () {
    var quoteOfTheDay = fetchItem('quoteOfTheDay');
    if (quoteOfTheDay && quoteOfTheDay.date === getTodaysDateStr()) return quoteOfTheDay;
    var response = yield fetch("".concat(window.location.href, "/assets/quotes.json"));
    var quotes = yield response.json();
    var lastQuoteIndex = parseInt(localStorage.getItem('lastQuoteIndex') || '-1');
    var nextQuoteIndex = lastQuoteIndex > quotes.length - 1 ? 0 : lastQuoteIndex + 1;
    var nextQuote = quotes[nextQuoteIndex];
    localStorage.setItem('lastQuoteIndex', nextQuoteIndex);
    storeItem('quoteOfTheDay', nextQuote);
    return nextQuote;
  });
  return _fetchQuote.apply(this, arguments);
}

function loadWeather() {
  return _loadWeather.apply(this, arguments);
}

function _loadWeather() {
  _loadWeather = _asyncToGenerator(function* () {
    var weather = yield fetchWeather();
    dateText.textContent = weather.date;
    weatherTemp.textContent = weather.temp;
    weatherText.textContent = weather.text;
    weatherIconImg.src = weather.icon;
  });
  return _loadWeather.apply(this, arguments);
}

function fetchWeather() {
  return _fetchWeather.apply(this, arguments);
}

function _fetchWeather() {
  _fetchWeather = _asyncToGenerator(function* () {
    var savedWeather = fetchItem('weatherData');
    if (savedWeather && savedWeather.date === getTodaysDateTxtStr()) return savedWeather;
    var response = yield fetch(weatherAPI);
    var responseData = yield response.json();

    var _responseData = _slicedToArray(responseData, 1),
        todaysForecast = _responseData[0];

    var weather = {
      date: getTodaysDateTxtStr(),
      temp: "".concat(todaysForecast.Temperature.Metric.Value, " \xB0").concat(todaysForecast.Temperature.Metric.Unit),
      text: todaysForecast.WeatherText,
      icon: "https://www.accuweather.com/images/weathericons/".concat(todaysForecast.WeatherIcon, ".svg")
    };
    storeItem('weatherData', weather);
    return weather;
  });
  return _fetchWeather.apply(this, arguments);
}

function getTodaysDateTxtStr() {
  var date = new Date();
  var dateNum = date.getDate();
  var month = date.toLocaleString('default', {
    month: 'long'
  });
  var year = date.getFullYear();
  return "".concat(days[date.getDay()], ", ").concat(dateNum, " ").concat(month, " ").concat(year);
}