"use strict";function notify(a,b,c,d,e){"Notification"in window?"granted"===Notification.permission?spawnNotification(a,b,c,d,e):"denied"!==Notification.permission&&Notification.requestPermission().then(function(f){"granted"===f&&spawnNotification(a,b,c,d,e)}):alert("This browser does not support desktop notification")}function spawnNotification(a,b,c,d,e){"function"!=typeof d&&(d=function(a){a.preventDefault()}),new Notification(a,{body:b,icon:"./favicon.png",// image: './favicon.png',
onclick:d,requireInteraction:!!c,tag:e||"general",vibrate:[200,100,200]})}