"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Task = /*#__PURE__*/function () {
  function Task(title, description) {
    var timeLimit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NaN;

    _classCallCheck(this, Task);

    this.id = '' + Date.now();
    this.title = title;
    this.description = description;
    this.timeLimit = timeLimit;
    this.important = typeof timeLimit === 'number' && timeLimit > 0;
    this.done = false;
  }

  _createClass(Task, [{
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "setTimeLimit",
    value: function setTimeLimit(timeLimit) {
      this.timeLimit = timeLimit;
      this.important = typeof timeLimit === 'number' && timeLimit > 0;
    }
  }, {
    key: "isImportant",
    value: function isImportant() {
      return this.important;
    }
  }, {
    key: "isDone",
    value: function isDone() {
      return this.done;
    }
  }, {
    key: "setDone",
    value: function setDone() {
      var done = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.done = done;
    }
  }], [{
    key: "fromJson",
    value: function fromJson(_ref) {
      var id = _ref.id,
          title = _ref.title,
          description = _ref.description,
          timeLimit = _ref.timeLimit,
          important = _ref.important,
          done = _ref.done;
      var task = new Task(title, description, timeLimit);
      task.id = id;
      task.important = important;
      task.setDone(done);
      return task;
    }
  }]);

  return Task;
}();