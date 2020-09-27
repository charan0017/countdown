//Ref: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

const synth = window.speechSynthesis;
const voiceURI = 'Microsoft Zira Desktop - English (United States)';

let voices = [];

function setSpeech() {
  return new Promise(function (resolve, reject) {
    const id = setInterval(() => {
      if (synth.getVoices().length !== 0) {
        resolve(synth.getVoices());
        clearInterval(id);
      }
    }, 10);
  });
}

function speakThisText(text, vURI = voiceURI) {
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = voices.find((voice) => voice.voiceURI === vURI);
  synth.speak(utterThis);
}

(async () => {
  voices = await setSpeech();
})();
