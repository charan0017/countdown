const nightModeDiv = rootDiv.querySelector('#nightModeDiv');
const nightModeCheckbox = nightModeDiv.querySelector('#nightMode');
const circleEdge = rootDiv.querySelector('#circle-edge');
const badge = rootDiv.querySelector('.badge');
const borders = [
  rootDiv.querySelector('#remaining-duration .border'),
  ...Array.from(rootDiv.querySelectorAll('#remaining-duration .border-right')),
];

const NightModeEnabled = 'NightModeEnabled';

nightModeCheckbox.addEventListener('change', function () {
  if (this.checked) {
    // console.log('night mode enabled');
    nightMode(true);
    window.localStorage.setItem(NightModeEnabled, true);
  } else {
    // console.log('night mode disabled');
    nightMode(false);
    window.localStorage.setItem(NightModeEnabled, false);
  }
});

function nightMode(enable = false) {
  rootDiv.classList[enable ? 'add' : 'remove']('nightmode-background');
  remainingPercentP.classList[enable ? 'add' : 'remove']('nightmode-text');
  remainingDuration.classList[enable ? 'add' : 'remove']('nightmode-text');
  badge.classList[enable ? 'remove' : 'add']('badge-dark');
  badge.classList[enable ? 'add' : 'remove']('badge-light');
  borders.forEach((bordr) => {
    bordr.classList[enable ? 'remove' : 'add']('border-dark');
    bordr.classList[enable ? 'add' : 'remove']('border-light');
  });
  circle.setAttribute('fill', enable ? '#224141' : '#f3f3f3');
  circleEdge.setAttribute('fill', enable ? '#d3d3d3' : 'grey');
  nightModeDiv.classList[enable ? 'add' : 'remove']('nightmode-text');
}

function checkNighModeEnabled() {
  const nightModeEnabled = window.localStorage.getItem(NightModeEnabled);
  if (!nightModeEnabled) return;
  nightMode(true);
  nightModeCheckbox.checked = true;
}

checkNighModeEnabled();
