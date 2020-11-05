const pad = (str) => `00${str}`.slice(-2);

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
  const hrs = pad(Math.floor(seconds / 60 / 60));
  const mins = pad(Math.floor((seconds - hrs * 60 * 60) / 60));
  const secs = pad(Math.floor(seconds - hrs * 60 * 60 - mins * 60));
  return { days: 0, hrs, mins, secs };
}

function getRemainingTime(inMs) {
  const remainingTime = Math.round(getIntervalSeconds(getCurrentInterval(), inMs));
  return remainingTime < 0 ? 0 : remainingTime;
}

function updateClassList(el, add, className) {
  if (!el) return;
  el.classList[add ? 'add' : 'remove'](className);
}

function getTodaysDateStr() {
  return new Date().toISOString().split('T')[0];
}

function storeItem(name, data, includeDate = true) {
  localStorage.setItem(
    name,
    includeDate
      ? JSON.stringify({
          date: getTodaysDateStr(),
          ...data,
        })
      : data
  );
}

function fetchItem(name) {
  const itemData = localStorage.getItem(name);
  if (!itemData) return itemData;
  return JSON.parse(itemData);
}

const bingUrl = 'https://www.bing.com';
const bingIndiaUrl = `${bingUrl}/?cc=in`;
const corsProxy = 'https://api.codetabs.com/v1/proxy?quest=';

function parseImageUrl(str) {
  const urlsMatch = str.match(/href="(.*?)"/g);
  if (!urlsMatch) return null;
  let imageUrl = urlsMatch.filter((url) => url.includes('1920x1080') && url.endsWith('.jpg"'))[0];
  if (!imageUrl) return null;
  imageUrl = imageUrl.replace('href=', '').replace(/"/g, '');
  return bingUrl + imageUrl;
}

async function getBingWallpaperUrl() {
  const bingImgData = fetchItem('bingImgUrl');
  if (bingImgData && bingImgData.date === getTodaysDateStr() && bingImgData.url) {
    return bingImgData.url;
  }
  const res = await fetch(corsProxy + bingIndiaUrl, { mode: 'cors' });
  const data = await res.text();
  const bingImgUrl = parseImageUrl(data);
  storeItem('bingImgUrl', { url: bingImgUrl });
  return bingImgUrl;
}

function createTaskChild(task, taskChildOnClick) {
  const taskId = task.getId();
  const taskChild = document.createElement('a');
  taskChild.setAttribute('id', `task-${taskId}`);
  taskChild.setAttribute(
    'class',
    `mb-2 rounded list-group-item list-group-item-action pointer fade-in text-dark ${
      task.isDone() ? 'text-strike' : ''
    } bg-w-lite`
  );
  taskChild.innerHTML = `<span id="task-${taskId}-simp" class="float-left mr-3"><i id="task-${taskId}-imp" class="${
    task.isImportant() ? 'fas' : 'far'
  } fa-star"></i></span>${
    task.title
  }<span id="task-${taskId}-sdel" class="float-right"><i id="task-${taskId}-del" class="fas fa-times-circle"></span>`;
  taskChild.addEventListener('click', (evt) => taskChildOnClick(evt, taskId));
  taskChild.onanimationend = () => {
    taskChild.classList.remove('fade-in');
  };
  return taskChild;
}

function saveTasks(tasks) {
  storeItem('tasksData', JSON.stringify(tasks), false);
}

function loadTasks() {
  const tasksData = fetchItem('tasksData');
  if (!Array.isArray(tasksData)) {
    saveTasks([]);
    return [];
  }
  return tasksData.map((t) => Task.fromJson(t));
}
