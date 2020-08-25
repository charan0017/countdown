function getCurrentInterval() {
  const currentTime = new Date();
  const currentOffset = currentTime.getTimezoneOffset();
  const ISTOffset = 330; // IST offset UTC +5:30
  const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
  return { days: 0, hrs: 22 - ISTTime.getHours(), mins: 59 - ISTTime.getMinutes(), secs: 59 - ISTTime.getSeconds() };
}

function getIntervalSeconds(interval, inMs) {
  const { days, hrs, mins, secs } = interval;
  const seconds = (days ? days * 24 * 60 * 60 : 0) + (hrs ? hrs * 60 * 60 : 0) + (mins ? mins * 60 : 0) + (secs || 0);
  return inMs ? seconds * 1000 : seconds;
}

function getIntervalFromSeconds(seconds) {
  const hrs = Math.floor(seconds / 60 / 60);
  const mins = Math.floor((seconds - hrs * 60 * 60) / 60);
  const secs = Math.floor(seconds - hrs * 60 * 60 - mins * 60);
  return { days: 0, hrs, mins, secs };
}

function getRemainingTime(inMs) {
  const remainingTime = Math.round(getIntervalSeconds(getCurrentInterval(), inMs));
  return remainingTime < 0 ? 0 : remainingTime;
}
