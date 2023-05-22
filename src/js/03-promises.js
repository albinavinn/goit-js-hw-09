import { Notify } from 'notiflix/build/notiflix-notify-aio';

document.body.style.backgroundColor = 'rgb(3 169 244 / 32%)';

const notifyOptions = {position: 'left-left', timeout: 10000};
const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  let inputDel = Number(delay.value);
  const inputAmount = Number(amount.value);
  const inputStep = Number(step.value);

  for (let i = 1; i <= inputAmount; i+=1) {
    inputDel += inputStep;
    createPromise(i, inputDel)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, notifyOptions);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, notifyOptions);
    });
  }
  evt.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);
  }
)};