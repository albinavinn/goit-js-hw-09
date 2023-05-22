// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.backgroundColor = ' rgba(253,187,45,1)';

const startButton = document.querySelector('[data-start]');
const inputCalendar = document.querySelector('input#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const SECOND_DELAY = 1000;

let selectedDate = null;
let currentDate = null;
let timerId = null;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
      if (selectedDates[0].getTime() < Date.now()) {
          alert("Please choose a date in the future");
      } else {
          startButton.disabled = false;
          selectedDate = selectedDates[0].getTime();
      }
  },
};

const flatP = flatpickr(inputCalendar, options)

const counter = {
    start() {
        timerId = setInterval(() => {
            startButton.disabled = true;
            inputCalendar.disabled = true;
            currentDate = Date.now();
            const delta = selectedDate - currentDate;
            convertMs(delta);
            updateInterfaceTimer(convertMs(delta));
            if (delta <= 1000) {
                this.stop();
            }
        }, SECOND_DELAY);
    }, 
    stop() {
        clearInterval(timerId);
        startButton.disabled = true;
        inputCalendar.disabled = false;
        return;
    },
}
startButton.addEventListener("click", onStart);
function onStart () {
    counter.start()
}

function updateInterfaceTimer ({ days, hours, minutes, seconds }) {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

