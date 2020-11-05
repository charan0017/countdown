"use strict";

function _call(body, then, direct) {
  if (direct) {
    return then ? then(body()) : body();
  }

  try {
    var result = Promise.resolve(body());
    return then ? result.then(then) : result;
  } catch (e) {
    return Promise.reject(e);
  }
}

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

(function () {
  return _call(setSpeech, function (_setSpeech) {
    voices = _setSpeech;
  });
})();