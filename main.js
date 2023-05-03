let score = 20;
let highScore = 0;
let secretNumber;
let gameOver = false;
const againBtn = document.getElementById("again");
const checkBtn = document.getElementById("check");
const finalScore = document.querySelector(".score");
const inputNumber = document.getElementById("input-text");
const responseBox = document.querySelector(".response-box");
const scoreText = document.getElementById("score-text");
const highScoreText = document.getElementById("highscore-text");
const overlay = document.querySelector(".game-over-overlay");
function guessRandomNumber() {
  return Math.trunc(Math.random() * 20 + 1);
}
function init() {
  score = 20;
  finalScore.innerHTML = "?";
  inputNumber.value = "";
  scoreText.innerHTML = score;
  highScoreText.innerHTML = highScore;
  responseBox.innerHTML = "Start guessing...";
  secretNumber = guessRandomNumber();
  checkBtn.disabled = false;
  document.body.style.background = "var(--bg-color)";
  if (gameOver) {
    gameOver = false;
    overlay.classList.add("hidden");
  }
}
window.onload = function () {
  init();
};

againBtn.addEventListener("click", function (event) {
  init();
});

checkBtn.addEventListener("click", function (event) {
  // if score is is less then 20
  let inputValue;
  if (score >= 1) {
    let inputValue = getInputText();
    // if the input equal to zero return
    if (inputValue === 0) {
      // alert("Please enter a valid number!");
      return;
    }
    console.log(inputValue, secretNumber);
    if (inputValue < secretNumber) {
      const content = `
        <span class="response-icon">📈</span>
        <span class="response-text">Too Low</span> 
      `;
      responseBox.innerHTML = content;
      score--;
      scoreText.innerHTML = score;
    } else if (inputValue > secretNumber) {
      const content = `
      <span class="response-icon">📉</span>
      <span class="response-text">Too Heigh</span> 
      `;
      responseBox.innerHTML = content;
      score--;
      scoreText.innerHTML = score;
    } else {
      document.body.style.background = "var(--success-color)";
      finalScore.innerHTML = secretNumber;
      const content = `
      <span class="response-icon">🎉</span>
      <span class="response-text">Correct Number</span> 
      `;
      responseBox.innerHTML = content;
      if (score > highScore) {
        highScore = score;
        highScoreText.innerHTML = highScore;
      }
      checkBtn.disabled = true;
    }
  } else {
    // alert("Game over");
    gameOver = true;
    overlay.classList.remove("hidden");
  }
});

function showText(element, output) {
  element.innerHTML = output;
}

function getInputText() {
  return Number(inputNumber.value);
}

window.addEventListener("keydown", function (event) {
  if (gameOver) {
    if (event.key == "Enter") {
      overlay.classList.add("hidden");
      init();
    }
  }
});
