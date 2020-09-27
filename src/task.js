class Task {
  constructor(title, description, timeLimit = NaN) {
    this.id = '' + Date.now();
    this.title = title;
    this.description = description;
    this.timeLimit = timeLimit;
    this.important = typeof timeLimit === 'number' && timeLimit > 0;
    this.done = false;
  }

  getId() {
    return this.id;
  }

  setTimeLimit(timeLimit) {
    this.timeLimit = timeLimit;
    this.important = typeof timeLimit === 'number' && timeLimit > 0;
  }

  isImportant() {
    return this.important;
  }

  isDone() {
    return this.done;
  }

  setDone(done = true) {
    this.done = done;
  }

  static fromJson({ id, title, description, timeLimit, important, done }) {
    const task = new Task(title, description, timeLimit);
    task.id = id;
    task.important = important;
    task.setDone(done);
    return task;
  }
}
