
const keymap = {
    "a": "key - a",
    "b": "key - b",
    "c": "key - c",
    "d": "key - d",
    "e": "key - e",
    "f": "key - f",
    "g": "key - g",
    "h": "key - h",
    "i": "key - i",
    "j": "key - j",
    "k": "key - k",
    "l": "key - l",
    "m": "key - m",
    "n": "key - n",
    "o": "key - o",
    "p": "key - p",
    "q": "key - q",
    "r": "key - r",
    "s": "key - s",
    "t": "key - t",
    "u": "key - u",
    "v": "key - v",
    "w": "key - w",
    "x": "key - x",
    "y": "key - y",
    "z": "key - z",
    
};
const soundmap = {
    "a": "a.wav",
    "b": "l.wav",
    "c": "y.wav",
    "d": "d.wav",
    "e": "e.wav",
    "f": "f.wav",
    "g": "g.wav",
    "h": "h.wav",
    "i": "i.wav",
    "j": "j.wav",
    "k": "k.wav",
    "l": "l.wav",
    "m": "a.wav",
    "n": "g.wav",
    "o": "a.wav",
    "p": "d.wav",
    "q": "e.wav",
    "r": "f.wav",
    "s": "g.wav",
    "t": "h.wav",
    "u": "i.wav",
    "v": "j.wav",
    "w": "k.wav",
    "x": "l.wav",
    "y": "a.wav",
    "z": "g.wav",
    "1": "y.wav",
    "2": "d.wav",
    "3": "e.wav",
    "4": "f.wav",
    "5": "g.wav",
    "6": "h.wav",
    "7": "i.wav",
    "8": "j.wav",
    "9": "k.wav",
    "0": "l.wav"
};

document.addEventListener("keydown", function(event) {
    const key = event.key.toLowerCase();
    if (key in keymap) {

      // record
       if (isRecording) {
            recording.push({
                key: key,
                time: Date.now() - recordStartTime
            });
        }

        
        const keyElement = document.querySelector(`[data-key="${key}"]`);

        if (keyElement) {
            keyElement.classList.add("active");
            const audio = new Audio(`tunes/${soundmap[key]}`);//1.Looks inside your tunes folder 2.Picks correct MP3 file from soundmap 3.Creates an Audio object 
            audio.play();//Plays the sound
            audio.addEventListener("ended", function() {
                keyElement.classList.remove("active");//remove highlight when song ends,This unpresses the key visually.
            });
        }
    }
});

document.addEventListener("keyup", function(event) {//keyup- stoped pressing
    const key = event.key.toLowerCase();
    if (key in keymap) {
        const keyElement = document.querySelector(`[data-key="${key}"]`);
        if (keyElement) {
            keyElement.classList.remove("active");//remove highlight when key unpressed
        }   
    }
}
);


const totalkeys = 24; // 2 octaves
const piano = document.querySelector(".piano");

// take 24 keys from your keymap
const keylist = Object.keys(keymap).slice(0, totalkeys);

// octave pattern (C → B)
const octavePattern = [
  "white", "black",
  "white", "black",
  "white", "white",
  "black", "white",
  "black", "white",
  "black", "white"
];

const whiteKeyWidth = 50;   // <-- ADD THIS
let whiteIndex = 0;

for (let i = 0; i < totalkeys; i++) {
    const key = keylist[i];
    const div = document.createElement("div");
    const type = octavePattern[i % 12];

    div.className = "key " + type;
    div.dataset.key = key;
    div.textContent = key.toUpperCase();

    if (type === "white") {
        div.style.position = "relative";
        whiteIndex++;
    } else {
        // black key positioning
        const leftPos = whiteIndex * whiteKeyWidth - 18;
        div.style.left = leftPos + "px";
        div.style.position = "absolute";
    }

    piano.appendChild(div);
}
//butons
let isRecording = false;
let recording = [];
let recordStartTime = 0;

document.getElementById("recordBtn").addEventListener("click", () => {
    isRecording = true;
    recording = [];
    recordStartTime = Date.now();

    document.getElementById("recordBtn").classList.add("recording");
    document.getElementById("stopBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
});

document.getElementById("stopBtn").addEventListener("click", () => {
    isRecording = false;
    document.getElementById("recordBtn").classList.remove("recording");

    document.getElementById("stopBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
});

document.getElementById("playBtn").addEventListener("click", () => {
    let now = Date.now();

    recording.forEach(event => {
        setTimeout(() => {
            const keyElement = document.querySelector(`[data-key="${event.key}"]`);
            if (keyElement) {
                keyElement.classList.add("active");
                const audio = new Audio(`tunes/${soundmap[event.key]}`);
                audio.play();
                audio.addEventListener("ended", () => {
                    keyElement.classList.remove("active");
                });
            }
        }, event.time);
    });
});

