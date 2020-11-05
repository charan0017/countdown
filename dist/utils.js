"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pad = function pad(str) {
  return "00".concat(str).slice(-2);
};

function getCurrentInterval() {
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330; // IST offset UTC +5:30

  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
  return {
    days: 0,
    hrs: 22 - ISTTime.getHours(),
    mins: 59 - ISTTime.getMinutes(),
    secs: 59 - ISTTime.getSeconds()
  };
}

function getIntervalSeconds(interval, inMs) {
  var days = interval.days,
      hrs = interval.hrs,
      mins = interval.mins,
      secs = interval.secs;
  var seconds = (days ? days * 24 * 60 * 60 : 0) + (hrs ? hrs * 60 * 60 : 0) + (mins ? mins * 60 : 0) + (secs || 0);
  return inMs ? seconds * 1000 : seconds;
}

function getIntervalFromSeconds(seconds) {
  var hrs = pad(Math.floor(seconds / 60 / 60));
  var mins = pad(Math.floor((seconds - hrs * 60 * 60) / 60));
  var secs = pad(Math.floor(seconds - hrs * 60 * 60 - mins * 60));
  return {
    days: 0,
    hrs: hrs,
    mins: mins,
    secs: secs
  };
}

function getRemainingTime(inMs) {
  var remainingTime = Math.round(getIntervalSeconds(getCurrentInterval(), inMs));
  return remainingTime < 0 ? 0 : remainingTime;
}

function updateClassList(el, add, className) {
  if (!el) return;
  el.classList[add ? 'add' : 'remove'](className);
}

function getTodaysDateStr() {
  return new Date().toISOString().split('T')[0];
}

function storeItem(name, data) {
  var includeDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  localStorage.setItem(name, includeDate ? JSON.stringify(_objectSpread({
    date: getTodaysDateStr()
  }, data)) : data);
}

function fetchItem(name) {
  var itemData = localStorage.getItem(name);
  if (!itemData) return itemData;
  return JSON.parse(itemData);
}

var bingUrl = 'https://www.bing.com';
var bingIndiaUrl = "".concat(bingUrl, "/?cc=in");
var corsProxy = 'https://api.codetabs.com/v1/proxy?quest=';

function parseImageUrl(str) {
  var urlsMatch = str.match(/href="(.*?)"/g);
  if (!urlsMatch) return null;
  var imageUrl = urlsMatch.find(function (url) {
    return url.includes('1920x1080') && url.endsWith('.jpg"');
  });
  if (!imageUrl) return null;
  imageUrl = imageUrl.replace('href=', '').replace(/"/g, '');
  return bingUrl + imageUrl;
}

function getBingWallpaperUrl() {
  return _getBingWallpaperUrl.apply(this, arguments);
}

function _getBingWallpaperUrl() {
  _getBingWallpaperUrl = _asyncToGenerator(function* () {
    var bingImgData = fetchItem('bingImgUrl');

    if (bingImgData && bingImgData.date === getTodaysDateStr() && bingImgData.url) {
      return bingImgData.url;
    }

    var res = yield fetch(corsProxy + bingIndiaUrl, {
      mode: 'cors'
    });
    var data = yield res.text();
    var bingImgUrl = parseImageUrl(data);
    storeItem('bingImgUrl', {
      url: bingImgUrl
    });
    return bingImgUrl;
  });
  return _getBingWallpaperUrl.apply(this, arguments);
}

function createTaskChild(task, taskChildOnClick) {
  var taskId = task.getId();
  var taskChild = document.createElement('a');
  taskChild.setAttribute('id', "task-".concat(taskId));
  taskChild.setAttribute('class', "mb-2 rounded list-group-item list-group-item-action pointer fade-in text-dark ".concat(task.isDone() ? 'text-strike' : '', " bg-w-lite"));
  taskChild.innerHTML = "<span id=\"task-".concat(taskId, "-simp\" class=\"float-left mr-3\"><i id=\"task-").concat(taskId, "-imp\" class=\"").concat(task.isImportant() ? 'fas' : 'far', " fa-star\"></i></span>").concat(task.title, "<span id=\"task-").concat(taskId, "-sdel\" class=\"float-right\"><i id=\"task-").concat(taskId, "-del\" class=\"fas fa-times-circle\"></span>");
  taskChild.addEventListener('click', function (evt) {
    return taskChildOnClick(evt, taskId);
  });

  taskChild.onanimationend = function () {
    taskChild.classList.remove('fade-in');
  };

  return taskChild;
}

function saveTasks(tasks) {
  storeItem('tasksData', JSON.stringify(tasks), false);
}

function loadTasks() {
  var tasksData = fetchItem('tasksData');

  if (!Array.isArray(tasksData)) {
    saveTasks([]);
    return [];
  }

  return tasksData.map(function (t) {
    return Task.fromJson(t);
  });
}