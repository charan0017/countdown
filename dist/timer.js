"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var Timer=function a(b,c){var d=this;_classCallCheck(this,a),_defineProperty(this,"status",function(){d.started?d.pause():d.start(),d.started=!d.started}),_defineProperty(this,"start",function(){d.interval=setInterval(d.tick,1e3),d.onStart&&d.onStart(d.timeRemaining)}),_defineProperty(this,"pause",function(){clearInterval(d.interval)}),_defineProperty(this,"tick",function(){return 0>=d.timeRemaining?(d.pause(),void(d.onComplete&&d.onComplete())):void(d.timeRemaining-=1,d.remainigPercentage=100*(d.timeRemaining/d.totalDuration),d.onTick&&d.onTick(d.timeRemaining,d.totalDuration,d.remainigPercentage))}),this.timeRemaining=b,this.totalDuration=getIntervalSeconds({hrs:18}),this.remainigPercentage=100,this.started=!1,c&&(this.onStart=c.onStart,this.onTick=c.onTick,this.onComplete=c.onComplete),this.start()};