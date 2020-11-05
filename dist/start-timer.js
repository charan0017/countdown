"use strict";

var rootDiv = document.querySelector('#root');
var loadingDiv = document.querySelector('#loading');
var sleepDiv = document.querySelector('#sleep');
var countdownDiv = rootDiv.querySelector('#countdown');
var remainingPercentP = countdownDiv.querySelector('#remaining-percent');
var remainingDurationDiv = countdownDiv.querySelector('#remaining-duration');
var remainingHrsP = remainingDurationDiv.querySelector('#hrs');
var remainingMinsP = remainingDurationDiv.querySelector('#mins');
var remainingSecsP = remainingDurationDiv.querySelector('#secs');
var circle = countdownDiv.querySelector('#circle');
var perimeter = circle.getAttribute('r') * Math.PI * 2;
circle.setAttribute('stroke-dasharray', perimeter);
var timer;

function createNewTimer() {
  timer = new Timer(getRemainingTime(), {
    onStart: function onStart(totalDuration) {
      console.log("A new coutdown has started, totalSeconds: ".concat(totalDuration));
    },
    onTick: function onTick(timeRemaining, totalDuration, percentRemaining) {
      circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / totalDuration - perimeter);
      var percentageText = "".concat(percentRemaining.toFixed(2), " %");
      remainingPercentP.innerHTML = percentageText;
      var remainingInterval = getIntervalFromSeconds(timeRemaining);
      remainingHrsP.innerHTML = remainingInterval.hrs;
      remainingMinsP.innerHTML = remainingInterval.mins;
      remainingSecsP.innerHTML = remainingInterval.secs;
      document.title = "".concat(unDoneTasksCount ? "(".concat(unDoneTasksCount, ") ") : '').concat(remainingInterval.hrs, ":").concat(remainingInterval.mins, ":").concat(remainingInterval.secs, " - ").concat(percentageText);
    },
    onComplete: function onComplete() {
      console.log('complete');
      rootDiv.classList.add('d-none');
      sleepDiv.classList.remove('d-none');
      document.title = 'Sleeptime!! 💤';
    }
  });
}

document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    // console.log('tab is now inactive');
    if (!timer) return;
    timer.pause();
    timer = null;
  } else {
    // console.log('tab is active again');
    if (timer) return;
    createNewTimer();
  }
});
if (!timer) createNewTimer();