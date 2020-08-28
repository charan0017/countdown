class Timer {
  constructor(timeRemaining, callbacks) {
    this.timeRemaining = timeRemaining;
    this.totalDuration = getIntervalSeconds({ hrs: 24 - 6 });
    this.remainigPercentage = 100;
    this.started = false;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    this.start();
  }

  status = () => {
    this.started ? this.pause() : this.start();
    this.started = !this.started;
  };

  start = () => {
    this.interval = setInterval(this.tick, 1000);
    if (this.onStart) this.onStart(this.timeRemaining);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) this.onComplete();
      return;
    }
    this.timeRemaining -= 1;
    this.remainigPercentage = (this.timeRemaining / this.totalDuration) * 100;
    if (this.onTick) this.onTick(this.timeRemaining, this.totalDuration, this.remainigPercentage);
  };
}
