function notify(title, body, important, onclick, tag) {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    spawnNotification(title, body, important, onclick, tag);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        spawnNotification(title, body, important, onclick, tag);
      }
    });
  }
}

function spawnNotification(title, body, important, onclick, tag) {
  if (typeof onclick !== 'function') {
    onclick = function (evt) {
      evt.preventDefault();
      // window.open(window.location.href, '_blank');
    };
  }
  new Notification(title, {
    body,
    icon: './favicon.png',
    // image: './favicon.png',
    onclick,
    requireInteraction: !!important,
    tag: tag || 'general',
    vibrate: [200, 100, 200],
  });
}
