// Select elements
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

let startTime, updatedTime, elapsedTime = 0, intervalId;
let isRunning = false;

// Format time into hh:mm:ss:ms
function formatTime(time) {
    let milliseconds = Math.floor(time % 1000);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    milliseconds = milliseconds < 100 ? `0${milliseconds}` : milliseconds;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Update the stopwatch display
function updateDisplay() {
    updatedTime = Date.now() - startTime + elapsedTime;
    display.textContent = formatTime(updatedTime);
}

// Start/Stop function
startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        intervalId = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    startStopBtn.textContent = 'Start';
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    laps.innerHTML = '';  // Clear laps
});

// Record a lap time
lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(Date.now() - startTime + elapsedTime);
        laps.appendChild(lapTime);
    }
});
