
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
    "1": "key - 1",
    "2": "key - 2",
    "3": "key - 3",
    "4": "key - 4",
    "5": "key - 5",
    "6": "key - 6",
    "7": "key - 7",
    "8": "key - 8",
    "9": "key - 9",
    "0": "key - 0",
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


const totalkeys = 23; 
const half = Math.floor(totalkeys / 2);
const piano = document.querySelector(".piano");
const keylist = Object.keys(keymap).slice(0, totalkeys);
const pattern = [
  "white", "black",
  "white", "black",
  "white","black",
  "white", "black",
  "white", "black",
  "white", "black"
];

for (let i = 0; i < totalkeys; i++) {//create each piano key
    const k = keylist[i];
    const div = document.createElement("div");//Create a new <div> (This is one piano key.)

    // pick the correct class using the pattern
    let divclassname = pattern[i % 12];

    div.className = divclassname + " " + keymap[k];//adds CSS classes to the div.
    div.dataset.key = k; //connects piano to keyboard
    div.textContent = k.toUpperCase();
    piano.appendChild(div);//This finally puts the key inside your piano.
}
