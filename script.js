// Paragraphs
const paragraphs = [
  "JavaScript is a powerful programming language used for web development.",
  "Typing speed improves with consistent practice and focus.",
  "Modern web applications rely heavily on JavaScript and frameworks."
];

// Variables
let timerInterval;
let timeLeft = 60;
let currentText = "";

// Elements
const textDisplay = document.getElementById("text");
const inputField = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const toggleTheme = document.getElementById("toggleTheme");

const timeDisplay = document.getElementById("time");
const speedDisplay = document.getElementById("speed");
const accuracyDisplay = document.getElementById("accuracy");
const wordsDisplay = document.getElementById("words");

// Dark Mode
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Start Test
startBtn.addEventListener("click", () => {
  inputField.value = "";
  inputField.disabled = false;

  currentText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  textDisplay.textContent = currentText;

  inputField.focus();

  timeLeft = 60;
  timeDisplay.textContent = timeLeft;

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      inputField.disabled = true;
      showResult();
    }
  }, 1000);
});

// Restart
restartBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  inputField.value = "";
  inputField.disabled = false;

  timeLeft = 60;
  timeDisplay.textContent = 60;

  speedDisplay.textContent = 0;
  accuracyDisplay.textContent = 0;
  wordsDisplay.textContent = 0;

  textDisplay.textContent = "";
});

// Typing Logic
inputField.addEventListener("input", () => {
  const typedText = inputField.value;

  // Word Count
  const wordsTyped = typedText.trim().split(/\s+/).filter(word => word !== "").length;
  wordsDisplay.textContent = wordsTyped;

  // Time spent
  const timeSpent = (60 - timeLeft) / 60;

  // Speed
  const speed = timeSpent > 0 ? Math.round(wordsTyped / timeSpent) : 0;
  speedDisplay.textContent = speed;

  // Accuracy
  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentText[i]) {
      correctChars++;
    }
  }

  const accuracy = typedText.length > 0
    ? Math.round((correctChars / typedText.length) * 100)
    : 0;

  accuracyDisplay.textContent = accuracy;

  // Stop when completed
  if (typedText === currentText) {
    clearInterval(timerInterval);
    inputField.disabled = true;
    showResult();
  }
});

// Show Result
function showResult() {
  alert(
    `Test Completed!\n\nSpeed: ${speedDisplay.textContent} WPM\nAccuracy: ${accuracyDisplay.textContent}%`
  );
}