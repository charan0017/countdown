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
  refreshWinForm();
});

async function nightMode(enabled = false) {
  updateClassList(rootDiv, enabled, 'nightmode-background');
  if (enabled) {
    rootDiv.style.backgroundImage = null;
  } else {
    const imageUrl = await getBingWallpaperUrl();
    rootDiv.style.backgroundImage = `url('${imageUrl}')`;
    sleepDiv.style.backgroundImage = `url('${imageUrl}')`;
  }
  updateClassList(carouselDiv, !enabled, 'bg-lite');
  updateClassList(carouselDiv, enabled, 'bg-w-drk');
  updateClassList(remainingDurationDiv, !enabled, 'bg-drk');
  updateClassList(remainingDurationDiv, enabled, 'bg-w-drk');
  updateClassList(nightModeDiv, !enabled, 'bg-drk');
  updateClassList(nightModeDiv, enabled, 'bg-w-drk');
  updateClassList(sleepDiv, enabled, 'nightmode-background');
  updateClassList(sleepDiv, enabled, 'nightmode-text');
}

async function checkNighModeEnabled() {
  const nightModeEnabled = localStorage.getItem(NightModeEnabled) === 'true';
  nightModeCheckbox.checked = !!nightModeEnabled;
  await nightMode(!!nightModeEnabled);
}

checkNighModeEnabled();
