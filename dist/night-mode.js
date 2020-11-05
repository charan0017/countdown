"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var nightModeDiv = rootDiv.querySelector('#night-mode');
var nightModeCheckbox = nightModeDiv.querySelector('#night-mode-input');
var NightModeEnabled = 'NightModeEnabled';
nightModeCheckbox.addEventListener('change', function () {
  if (this.checked) {
    // console.log('night mode enabled');
    nightMode(true);
    localStorage.setItem(NightModeEnabled, true);
  } else {
    // console.log('night mode disabled');
    nightMode(false);
    localStorage.setItem(NightModeEnabled, false);
  }
});

function nightMode() {
  return _nightMode.apply(this, arguments);
}

function _nightMode() {
  _nightMode = _asyncToGenerator(function* () {
    var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    updateClassList(rootDiv, enabled, 'nightmode-background');

    if (enabled) {
      rootDiv.style.backgroundImage = null;
    } else {
      var imageUrl = yield getBingWallpaperUrl();
      rootDiv.style.backgroundImage = "url('".concat(imageUrl, "')");
      sleepDiv.style.backgroundImage = "url('".concat(imageUrl, "')");
    }

    updateClassList(carouselDiv, !enabled, 'bg-lite');
    updateClassList(carouselDiv, enabled, 'bg-w-drk');
    updateClassList(remainingDurationDiv, !enabled, 'bg-drk');
    updateClassList(remainingDurationDiv, enabled, 'bg-w-drk');
    updateClassList(nightModeDiv, !enabled, 'bg-drk');
    updateClassList(nightModeDiv, enabled, 'bg-w-drk');
    updateClassList(sleepDiv, enabled, 'nightmode-background');
    updateClassList(sleepDiv, enabled, 'nightmode-text');
  });
  return _nightMode.apply(this, arguments);
}

function checkNighModeEnabled() {
  return _checkNighModeEnabled.apply(this, arguments);
}

function _checkNighModeEnabled() {
  _checkNighModeEnabled = _asyncToGenerator(function* () {
    var nightModeEnabled = localStorage.getItem(NightModeEnabled) === 'true';
    nightModeCheckbox.checked = !!nightModeEnabled;
    yield nightMode(!!nightModeEnabled);
  });
  return _checkNighModeEnabled.apply(this, arguments);
}

checkNighModeEnabled();