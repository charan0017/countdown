const durationInput = document.querySelector('#duration');
const remainingPercentText = document.querySelector('#remaining-percent');
const remainingDuration = document.querySelector('#remaining-duration');
const remainingHrs = remainingDuration.querySelector('#hrs');
const remainingMins = remainingDuration.querySelector('#mins');
const remainingSecs = remainingDuration.querySelector('#secs');
const circle = document.querySelector('#circle');

const perimeter = circle.getAttribute('r') * Math.PI * 2;
circle.setAttribute('stroke-dasharray', perimeter);

let timer;

function createNewTimer() {
  durationInput.value = getRemainingTime();
  timer = new Timer(durationInput, {
    onStart(totalDuration) {
      console.log(`A new coutdown has started, totalSeconds: ${totalDuration}`);
    },
    onTick(timeRemaining, totalDuration, percentRemaining) {
      circle.setAttribute('stroke-dashoffset', (perimeter * timeRemaining) / totalDuration - perimeter);
      const percentageText = `${percentRemaining.toFixed(2)} %`;
      remainingPercentText.innerHTML = percentageText;
      const remainingInterval = getIntervalFromSeconds(durationInput.value);
      remainingHrs.innerHTML = remainingInterval.hrs;
      remainingMins.innerHTML = remainingInterval.mins;
      remainingSecs.innerHTML = remainingInterval.secs;
      document.title = `${percentageText} - ${remainingInterval.hrs}.${remainingInterval.mins}.${remainingInterval.secs}`;
    },
    onComplete() {
      console.log('complete');
    },
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
