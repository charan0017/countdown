const durationInput = document.querySelector('#duration');
const remainingPercentText = document.querySelector('#remaining-percent');
const remainingDuration = document.querySelector('#remaining-duration');
const remainingHrs = remainingDuration.querySelector('#hrs');
const remainingMins = remainingDuration.querySelector('#mins');
const remainingSecs = remainingDuration.querySelector('#secs');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * Math.PI * 2;
circle.setAttribute('stroke-dasharray', perimeter);

durationInput.value = getRemainingTime();

let duration;
const timer = new Timer(durationInput, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining, totalDuration, percentRemaining) {
    circle.setAttribute('stroke-dashoffset', (perimeter * timeRemaining) / totalDuration - perimeter);
    remainingPercentText.innerHTML = `${percentRemaining.toFixed(2)} %`;
    const remainingInterval = getIntervalFromSeconds(durationInput.value);
    remainingHrs.innerHTML = remainingInterval.hrs;
    remainingMins.innerHTML = remainingInterval.mins;
    remainingSecs.innerHTML = remainingInterval.secs;
  },
  onComplete() {
    console.log('complete');
  },
});
