import throttle from 'lodash.throttle';
const formFeed = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

let data = {};

loadForm();

formFeed.addEventListener('input', throttle(onFormData, 500));

formFeed.addEventListener('submit', onFormSubmit);

function onFormData(e) {
  data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

  data[e.target.name] = e.target.value;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (!e.target.email.value || !e.target.message.value) {
    alert('Enter all data');
    return;
  }

  e.target.reset();
  console.log(data);
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function loadForm() {
  try {
    let formLoad = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (!formLoad) {
      return;
    }

    data = formLoad;
    formFeed.email.value = data.email || '';
    formFeed.message.value = data.message || '';
  } catch (error) {
    console.error('Error.message ', error.message);
  }
}