"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Timer = function Timer(timeRemaining, callbacks) {
  var _this = this;

  _classCallCheck(this, Timer);

  _defineProperty(this, "status", function () {
    _this.started ? _this.pause() : _this.start();
    _this.started = !_this.started;
  });

  _defineProperty(this, "start", function () {
    _this.interval = setInterval(_this.tick, 1000);
    if (_this.onStart) _this.onStart(_this.timeRemaining);
  });

  _defineProperty(this, "pause", function () {
    clearInterval(_this.interval);
  });

  _defineProperty(this, "tick", function () {
    if (_this.timeRemaining <= 0) {
      _this.pause();

      if (_this.onComplete) _this.onComplete();
      return;
    }

    _this.timeRemaining -= 1;
    _this.remainigPercentage = _this.timeRemaining / _this.totalDuration * 100;
    if (_this.onTick) _this.onTick(_this.timeRemaining, _this.totalDuration, _this.remainigPercentage);
  });

  this.timeRemaining = timeRemaining;
  this.totalDuration = getIntervalSeconds({
    hrs: 24 - 6
  });
  this.remainigPercentage = 100;
  this.started = false;

  if (callbacks) {
    this.onStart = callbacks.onStart;
    this.onTick = callbacks.onTick;
    this.onComplete = callbacks.onComplete;
  }

  this.start();
};