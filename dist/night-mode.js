"use strict";

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

var checkNighModeEnabled = _async(function () {
  var nightModeEnabled = localStorage.getItem(NightModeEnabled) === 'true';
  nightModeCheckbox.checked = !!nightModeEnabled;
  return _awaitIgnored(nightMode(!!nightModeEnabled));
});

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
}

var nightMode = _async(function () {
  var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  updateClassList(rootDiv, enabled, 'nightmode-background');
  return _invoke(function () {
    if (enabled) {
      rootDiv.style.backgroundImage = null;
    } else {
      return _call(getBingWallpaperUrl, function (imageUrl) {
        rootDiv.style.backgroundImage = "url('".concat(imageUrl, "')");
        sleepDiv.style.backgroundImage = "url('".concat(imageUrl, "')");
      });
    }
  }, function () {
    updateClassList(carouselDiv, !enabled, 'bg-lite');
    updateClassList(carouselDiv, enabled, 'bg-w-drk');
    updateClassList(remainingDurationDiv, !enabled, 'bg-drk');
    updateClassList(remainingDurationDiv, enabled, 'bg-w-drk');
    updateClassList(nightModeDiv, !enabled, 'bg-drk');
    updateClassList(nightModeDiv, enabled, 'bg-w-drk');
    updateClassList(sleepDiv, enabled, 'nightmode-background');
    updateClassList(sleepDiv, enabled, 'nightmode-text');
  });
});

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

var nightModeDiv = rootDiv.querySelector('#night-mode');

function _empty() {}

var nightModeCheckbox = nightModeDiv.querySelector('#night-mode-input');

function _awaitIgnored(value, direct) {
  if (!direct) {
    return value && value.then ? value.then(_empty) : Promise.resolve();
  }
}

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
checkNighModeEnabled();