"use strict";

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getBingWallpaperUrl = _async(function () {
  var bingImgData = fetchItem('bingImgUrl');
  return bingImgData && bingImgData.date === getTodaysDateStr() && bingImgData.url ? bingImgData.url : _await(fetch(corsProxy + bingIndiaUrl, {
    mode: 'cors'
  }), function (res) {
    return _await(res.text(), function (data) {
      var bingImgUrl = parseImageUrl(data);
      storeItem('bingImgUrl', {
        url: bingImgUrl
      });
      return bingImgUrl;
    });
  });
});

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
  var imageUrl = urlsMatch.filter(function (url) {
    return url.indexOf('1920x1080') > -1 && url.endsWith('.jpg"');
  })[0];
  if (!imageUrl) return null;
  imageUrl = imageUrl.replace('href=', '').replace(/"/g, '');
  return bingUrl + imageUrl;
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