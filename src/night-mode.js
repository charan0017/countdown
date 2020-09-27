const nightModeDiv = rootDiv.querySelector('#nightModeDiv');
const nightModeCheckbox = nightModeDiv.querySelector('#nightMode');
const circleEdge = countdownDiv.querySelector('#circle-edge');
const badge = countdownDiv.querySelector('.badge');
const borders = Array.from(countdownDiv.querySelectorAll('#remaining-duration .border-right'));

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

function nightMode(enabled = false) {
  updateClassList(rootDiv, enabled, 'nightmode-background');
  updateClassList(remainingDuration, enabled, 'nightmode-background-light');
  updateClassList(remainingPercentP, enabled, 'nightmode-text');
  updateClassList(remainingDuration, enabled, 'nightmode-text');
  updateClassList(badge, !enabled, 'badge-dark');
  updateClassList(badge, enabled, 'badge-light');
  borders.forEach((bordr) => updateClassList(bordr, enabled, 'border-dark'));
  circle.setAttribute('fill', enabled ? '#243447' : '#f3f3f3');
  circleEdge.setAttribute('fill', enabled ? '#d3d3d3' : 'grey');
  updateClassList(nightModeDiv, enabled, 'nightmode-text');
  updateClassList(sleepDiv, enabled, 'nightmode-text');
}

function checkNighModeEnabled() {
  const nightModeEnabled = window.localStorage.getItem(NightModeEnabled) === 'true';
  if (!nightModeEnabled) return;
  nightMode(!!nightModeEnabled);
  nightModeCheckbox.checked = !!nightModeEnabled;
}

checkNighModeEnabled();
