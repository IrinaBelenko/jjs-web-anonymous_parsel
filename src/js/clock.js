import { getTimeComponents } from './helpers/createTime.js';
import { addPad } from './helpers/addPad.js';
import { declensionNum } from './helpers/declensionNum.js';

const clockEl = document.querySelector('.js-clock-items');
const buttonsEl = document.querySelector('.js-buttons__wrapper');
const timeZone = -new Date().getTimezoneOffset() / 60;
const timeZoneName = new Date().getHours() >= 12 ? 'PM' : 'AM';

let intervalId = null;

buttonsEl.addEventListener('click', onButtonClick);

function onButtonClick(e) {
  const showBtn = e.target.matches('button.js-show');
  const hideBtn = e.target.matches('button.js-hide');
  const changeBtn = document.querySelector('button.js-change');

  if (showBtn) {
    startClock(clockEl);

    setTimeout(() => {
      document.querySelector('.clock').classList.remove('is-hidden');
      document.querySelector('.js-show').classList.add('is-hidden');
      document.querySelector('.js-hide').classList.remove('is-hidden');
      document.querySelector('.js-change').classList.remove('is-hidden');
    }, 1000);

    return;
  }

  if (hideBtn) {
    setTimeout(() => {
      document.querySelector('.clock').classList.add('is-hidden');
      document.querySelector('.js-show').classList.remove('is-hidden');
      document.querySelector('.js-hide').classList.add('is-hidden');
      document.querySelector('.js-change').classList.add('is-hidden');
      stopClock();
    }, 1000);
    return;
  }

  stopClock();

  if (changeBtn.textContent.trim() === 'Формат 12') {
    startClock(clockEl, 12);
  } else {
    startClock(clockEl, 24);
  }

  setTimeout(() => {
    clockEl.querySelector('.js-clock__timezone').classList.toggle('is-hidden');
    if (changeBtn.textContent.trim() === 'Формат 12') {
      changeBtn.textContent = 'Формат 24';
    } else {
      changeBtn.textContent = 'Формат 12';
    }
  }, 1000);
}

function startClock(rootSelect, format = 24) {
  intervalId = setInterval(() => {
    const curDateMS = Date.now();

    const { hours, minutes, seconds } = getTimeComponents(
      curDateMS,
      format,
      timeZone
    );
    rootSelect.querySelector('.js-clock__hours').textContent = addPad(hours);
    rootSelect.querySelector('.js-clock__minutes').textContent =
      addPad(minutes);
    rootSelect.querySelector('.js-clock__seconds').textContent =
      addPad(seconds);
    rootSelect.querySelector('.js-clock__timezone').textContent = timeZoneName;

    //

    rootSelect.querySelector('.js-clock__hours').dataset.title = declensionNum(
      hours,
      ['година', 'години', 'годин']
    );
    rootSelect.querySelector('.js-clock__minutes').dataset.title =
      declensionNum(minutes, ['хвилина', 'хвилини', 'хвилин']);
    rootSelect.querySelector('.js-clock__seconds').dataset.title =
      declensionNum(seconds, ['секунда', 'секунди', 'секунд']);
  }, 1000);
}

function stopClock() {
  clearInterval(intervalId);
}