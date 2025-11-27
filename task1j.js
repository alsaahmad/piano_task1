
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

document.addEventListener("keydown", function(event) {//detects when the user presses a key on the keyboard
    const key = event.key.toLowerCase();//story val of event in "key"
    if (key in keymap) {//if key is present in keymap 

      // record
       if (isRecording) {//If recording = ON. Save the pressed key
            recording.push({
                key: key,
                time: Date.now() - recordStartTime//we need to know WHEN exactly each key was pressed relative to the start of recording.
            });
        }

        
        const keyElement = document.querySelector(`[data-key="${key}"]`);//Find the HTML element whose attribute data-key equals a"

        if (keyElement) {
            keyElement.classList.add("active");//adds css class"active" to html elemnt stored in keyelement
            const audio = new Audio(`tunes/${soundmap[key]}`);//1.Looks inside your tunes folder 2.Picks correct MP3 file from soundmap 3.Creates an Audio object 
            audio.play();//Plays the sound
            audio.addEventListener("ended", function() {//remove highlight css when audio ends
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
const piano = document.querySelector(".piano");//select piano class from html


const keylist = Object.keys(keymap).slice(0, totalkeys);// take 24 keys from your keymap


const octavePattern = [// octave pattern of 1 octave
  "white", "black",
  "white", "black",
  "white", "white",
  "black", "white",
  "black", "white",
  "black", "white"
];

const whiteKeyWidth = 50;  //width of each white piano key to 50 pixels.
let whiteIndex = 0;//keeps track of how many white keys have been placed so far.

for (let i = 0; i < totalkeys; i++) {
    const key = keylist[i];
    const div = document.createElement("div");//Create a div
    const type = octavePattern[i % 12];//Every 12 keys = new octave AND After every 12 notes, the key colors repeat.

    div.className = "key " + type;//This sets the CSS classes of the key. Every key gets "key" AND type= either black or white
    div.dataset.key = key;//stores what keyboard key this piano key is linked to, so your code can find it and play the correct sound.
    div.textContent = key.toUpperCase();//displays label on key

    if (type === "white") {
        div.style.position = "relative";//relative =no overlap
        whiteIndex++;
    } else {//Black keys must sit between two white keys.
        // black key positioning
        const leftPos = whiteIndex * whiteKeyWidth - 18;// the position of the next white key and -18 is to make it sit in between
        div.style.left = leftPos + "px";
        div.style.position = "absolute";//so it can overlap
    }

    piano.appendChild(div);//adds the newly created key (div) into the piano section in your HTML.
}
//butons
let isRecording = false;
let recording = [];
let recordStartTime = 0;

document.getElementById("recordBtn").addEventListener("click", () => {//when we click button with class recordBtn
    isRecording = true;// Start recording mode
    recording = [];//Clear previous recordings
    recordStartTime = Date.now();//Remember the starting time of the recording

    document.getElementById("recordBtn").classList.add("recording");// Visually show that recording has started (turn button red)
    document.getElementById("stopBtn").disabled = false;// Enable the STOP button 
    document.getElementById("playBtn").disabled = true;//Disable the PLAY button while recording
});

document.getElementById("stopBtn").addEventListener("click", () => {////when we click button with class stopbtn
    isRecording = false;
    document.getElementById("recordBtn").classList.remove("recording");//Removes the class named "recording" css part

    document.getElementById("stopBtn").disabled = true;//stop button disabled
    document.getElementById("playBtn").disabled = false;//play button enabled
});

document.getElementById("playBtn").addEventListener("click", () => {//when play button is clicked
    let now = Date.now();// Take the current time
    // Go through every recorded note inside the 'recording' array
    // Each "event" contains: { key: "a", time: 120 }
    recording.forEach(event => {//for loop in recording array
         // Wait for the SAME delay as originally recorded
        // event.time = how many milliseconds after recording start the key was pressed
        setTimeout(() => {//function that lets you run some code after a delay.
            const keyElement = document.querySelector(`[data-key="${event.key}"]`);// Select the key div in the piano that matches this recorded key
            if (keyElement) {// If the key element exists 
                keyElement.classList.add("active");// Highlight the key 
                const audio = new Audio(`tunes/${soundmap[event.key]}`);// Create an audio object for the recorded key
                audio.play();
                audio.addEventListener("ended", () => {
                    keyElement.classList.remove("active");
                });
            }
        }, event.time);//after the time stored in recording array
    });
});


