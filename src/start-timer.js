const rootDiv = document.querySelector('#root');
const loadingDiv = document.querySelector('#loading');
const sleepDiv = document.querySelector('#sleep');
const countdownDiv = rootDiv.querySelector('#countdown');
const remainingPercentP = countdownDiv.querySelector('#remaining-percent');
const remainingDurationDiv = countdownDiv.querySelector('#remaining-duration');
const remainingHrsP = remainingDurationDiv.querySelector('#hrs');
const remainingMinsP = remainingDurationDiv.querySelector('#mins');
const remainingSecsP = remainingDurationDiv.querySelector('#secs');
const circle = countdownDiv.querySelector('#circle');

const perimeter = circle.getAttribute('r') * Math.PI * 2;
circle.setAttribute('stroke-dasharray', perimeter);

let timer;

function createNewTimer() {
  timer = new Timer(getRemainingTime(), {
    onStart(totalDuration) {
      console.log(`A new coutdown has started, totalSeconds: ${totalDuration}`);
    },
    onTick(timeRemaining, totalDuration, percentRemaining) {
      circle.setAttribute('stroke-dashoffset', (perimeter * timeRemaining) / totalDuration - perimeter);
      const percentageText = `${percentRemaining.toFixed(2)} %`;
      remainingPercentP.innerHTML = percentageText;
      const remainingInterval = getIntervalFromSeconds(timeRemaining);
      remainingHrsP.innerHTML = remainingInterval.hrs;
      remainingMinsP.innerHTML = remainingInterval.mins;
      remainingSecsP.innerHTML = remainingInterval.secs;
      document.title = `${unDoneTasksCount ? `(${unDoneTasksCount}) ` : ''}${remainingInterval.hrs}:${
        remainingInterval.mins
      }:${remainingInterval.secs} - ${percentageText}`;
    },
    onComplete() {
      console.log('complete');
      // rootDiv.classList.add('d-none');
      // sleepDiv.classList.remove('d-none');
      document.title = 'Sleeptime!! 💤';
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
