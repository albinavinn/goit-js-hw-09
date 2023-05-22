const start = document.querySelector('[data-start]');

const stop = document.querySelector('[data-stop]');

const CHANGE_COLOR_DELAY = 1000;
let timerId = null;

stop.disabled = true;
stop.addEventListener('click', onStopBtn);
start.addEventListener('click', onStartBtn);

function onStartBtn(e) {
    e.target.disabled = true;
    stop.disabled = false;

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, CHANGE_COLOR_DELAY);
};

function onStopBtn(e) {
    start.disabled = false;
    e.target.disabled = true;

    clearInterval(timerId);
};


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
