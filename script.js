// text to speech
let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value; window.speechSynthesis.speak(speech);
});



// speech to text
let form = document.querySelector("form");
let sr = window.webkitSpeechRecognition || window.SpeechRecognition;
let spRec = new sr();
spRec.lang = "hi";
spRec.continuous = true;
spRec.interimResults = true;
// console.log(spRec);
form.addEventListener("submit", e => {
    e.preventDefault();
    spRec.start();
})
spRec.onresult = res => {
    let text = Array.from(res.results).map(r => r[0]).map(txt => txt.transcript)
        .join("");
    form[0].value = text;
    // console.log(text);
}
form[2].addEventListener("click", () => {
    spRec.stop();
})