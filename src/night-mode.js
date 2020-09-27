const nightModeDiv = rootDiv.querySelector('#night-mode');
const nightModeCheckbox = nightModeDiv.querySelector('#night-mode-input');

const NightModeEnabled = 'NightModeEnabled';

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

async function nightMode(enabled = false) {
  updateClassList(rootDiv, enabled, 'nightmode-background');
  console.log(enabled);
  if (enabled) {
    rootDiv.style.backgroundImage = null;
  } else {
    const imageUrl = await getBingWallpaperUrl();
    rootDiv.style.backgroundImage = `url('${imageUrl}')`;
    sleepDiv.style.backgroundImage = `url('${imageUrl}')`;
  }
  updateClassList(weatherInfoDiv, !enabled, 'bg-lite');
  updateClassList(weatherInfoDiv, enabled, 'bg-w-drk');
  updateClassList(remainingDurationDiv, !enabled, 'bg-drk');
  updateClassList(remainingDurationDiv, enabled, 'bg-w-drk');
  updateClassList(nightModeDiv, !enabled, 'bg-drk');
  updateClassList(nightModeDiv, enabled, 'bg-w-drk');
  updateClassList(nightModeDiv, enabled, 'text-white');
  updateClassList(sleepDiv, enabled, 'nightmode-background');
  updateClassList(sleepDiv, enabled, 'nightmode-text');
}

function checkNighModeEnabled() {
  const nightModeEnabled = localStorage.getItem(NightModeEnabled) === 'true';
  nightMode(!!nightModeEnabled);
  nightModeCheckbox.checked = !!nightModeEnabled;
}

checkNighModeEnabled();
