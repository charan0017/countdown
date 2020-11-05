"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }

  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}

var fetchWeather = _async(function () {
  var savedWeather = fetchItem('weatherData');
  return savedWeather && savedWeather.date === getTodaysDateTxtStr() ? savedWeather : _await(fetch(weatherAPI), function (response) {
    return _await(response.json(), function (responseData) {
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
  });
});

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var loadWeather = function loadWeather() {
  return _call(fetchWeather, function (weather) {
    dateText.textContent = weather.date;
    weatherTemp.textContent = weather.temp;
    weatherText.textContent = weather.text;
    weatherIconImg.src = weather.icon;
  });
};

var fetchQuote = _async(function () {
  var quoteOfTheDay = fetchItem('quoteOfTheDay');
  return quoteOfTheDay && quoteOfTheDay.date === getTodaysDateStr() ? quoteOfTheDay : _await(fetch("".concat(window.location.href, "/assets/quotes.json")), function (response) {
    return _await(response.json(), function (quotes) {
      var lastQuoteIndex = parseInt(localStorage.getItem('lastQuoteIndex') || '-1');
      var nextQuoteIndex = lastQuoteIndex > quotes.length - 1 ? 0 : lastQuoteIndex + 1;
      var nextQuote = quotes[nextQuoteIndex];
      localStorage.setItem('lastQuoteIndex', nextQuoteIndex);
      storeItem('quoteOfTheDay', nextQuote);
      return nextQuote;
    });
  });
});

var loadQuote = function loadQuote() {
  return _call(fetchQuote, function (_ref) {
    var quote = _ref.quote,
        quoteBy = _ref.quoteBy;
    if (!quote || !quoteBy) return;
    quoteText.innerText = "\"".concat(quote, "\"");
    quoteByText.innerText = "\u2014 ".concat(quoteBy);
  });
};

var carouselDiv = document.querySelector('#carousel');
var weatherInfoDiv = carouselDiv.querySelector('#weather-info');
var weatherIconImg = weatherInfoDiv.querySelector('#weather-icon');
var weatherTemp = weatherInfoDiv.querySelector('#weather-temp');
var weatherText = weatherInfoDiv.querySelector('#weather-text');
var dateText = weatherInfoDiv.querySelector('#date-text');
var quoteBoxDiv = carouselDiv.querySelector('#quote-box');
var quoteText = quoteBoxDiv.querySelector('#quote');
var quoteByText = quoteBoxDiv.querySelector('#quote-by');
var slidesEls = Array.prototype.slice.call(carouselDiv.querySelectorAll('.slides'));
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

_async(function () {
  carousel();
  loadWeather();
  loadQuote();
})();

function getTodaysDateTxtStr() {
  var date = new Date();
  var dateNum = date.getDate();
  var month = date.toLocaleString('en-GB', {
    month: 'long'
  });
  var year = date.getFullYear();
  return "".concat(days[date.getDay()], ", ").concat(dateNum, " ").concat(month, " ").concat(year);
}