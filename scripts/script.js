
let timerId;
let elapsedTime = 0; 
let isRunning = false;

const timeDisplay = document.querySelector('.time-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.querySelector('.laps');


function formatTime(ms) {
  const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}


function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}


function startTimer() {
  if (!isRunning) {
    const startTime = Date.now() - elapsedTime;
    timerId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
  }
}


function pauseTimer() {
  if (isRunning) {
    clearInterval(timerId);
    isRunning = false;
  }
}


function resetTimer() {
  clearInterval(timerId);
  elapsedTime = 0;
  isRunning = false;
  updateDisplay();
  lapsList.innerHTML = ''; 
}


function recordLap() {
  if (isRunning) {
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(elapsedTime);
    lapsList.appendChild(lapItem);
  }
}


startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
