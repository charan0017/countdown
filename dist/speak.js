"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//Ref: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
var synth = window.speechSynthesis;
var voiceURI = 'Microsoft Zira Desktop - English (United States)';
var voices = [];

function setSpeech() {
  return new Promise(function (resolve, reject) {
    var id = setInterval(function () {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
}

function speakThisText(text) {
  var vURI = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : voiceURI;
  var utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = voices.find(function (voice) {
    return voice.voiceURI === vURI;
  });
  synth.speak(utterThis);
}

_asyncToGenerator(function* () {
  voices = yield setSpeech();
})();