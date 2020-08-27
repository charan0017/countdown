const rootDiv = document.querySelector('#root');
const sleepDiv = document.querySelector('#sleep');
const remainingPercentP = document.querySelector('#remaining-percent');
const remainingDuration = document.querySelector('#remaining-duration');
const remainingHrsP = remainingDuration.querySelector('#hrs');
const remainingMinsP = remainingDuration.querySelector('#mins');
const remainingSecsP = remainingDuration.querySelector('#secs');
const circle = document.querySelector('#circle');

const perimeter = circle.getAttribute('r') * Math.PI * 2;
circle.setAttribute('stroke-dasharray', perimeter);

let timer;

function createNewTimer() {
  timer = new Timer(getRemainingTime(), {
    onStart(totalDuration) {
      console.log(`A new coutdown has started, totalSeconds: ${totalDuration}`);
      rootDiv.classList.remove('d-none');
    },
    onTick(timeRemaining, totalDuration, percentRemaining) {
      circle.setAttribute('stroke-dashoffset', (perimeter * timeRemaining) / totalDuration - perimeter);
      const percentageText = `${percentRemaining.toFixed(2)} %`;
      remainingPercentP.innerHTML = percentageText;
      const remainingInterval = getIntervalFromSeconds(timeRemaining);
      remainingHrsP.innerHTML = remainingInterval.hrs;
      remainingMinsP.innerHTML = remainingInterval.mins;
      remainingSecsP.innerHTML = remainingInterval.secs;
      document.title = `${remainingInterval.hrs}.${remainingInterval.mins}.${remainingInterval.secs} - ${percentageText}`;
    },
    onComplete() {
      console.log('complete');
      rootDiv.classList.add('d-none');
      sleepDiv.classList.remove('d-none');
      sleepDiv.classList.add('h-100');
      sleepDiv.classList.add('d-flex');
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
