const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number:", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

//Capture user speech
function onSpeak(e) {
  console.log(e);
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

// Write user speech
function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You said: </div>
  <span class="box">${msg}</span>
  `;
}

// Check speech against number
function checkNumber(msg) {
  const num = +msg;

  // Check number validity
  if (Number.isNaN(num)) {
    msg.innerHTML += "<div>That is not a valid number</div>";
    return;
  }

  // Check number is within range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }

  // Check number is correct
  if (num === randomNum) {
    document.body.innerHTML = `
    <h2>Congratulation! You guessed the number! <br><br> it was ${num}</h2>
    <button class="play-again" id="play-again">Play again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>LOWER!</div>";
  } else {
    msgEl.innerHTML += "<div>HIGHER!</div>";
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result

recognition.addEventListener("result", onSpeak);

// End speech recognition service
recognition.addEventListener("end", () => recognition.start());

// Play again event

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
