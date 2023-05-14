const clockEl = document.querySelector('.js-clock-items');
const buttonsEl = document.querySelector('.js-buttons__wrapper');
let intervalId = null;
const timeZone = -new Date().getTimezoneOffset() / 60;

buttonsEl.addEventListener('click', onButtonClick);

function onButtonClick(e) {
  document.querySelector('.clock').classList.remove('is-hidden');
  document.querySelector('.js-show').classList.add('is-hidden');
  document.querySelector('.js-hide').classList.remove('is-hidden');
  document.querySelector('.js-change').classList.remove('is-hidden');

  startClock(clockEl);
}

function startClock(rootSelect) {
  intervalId = setInterval(() => {
    const curDateMS = Date.now();

    const { hours, minutes, seconds } = getTimeComponents(curDateMS);
    rootSelect.querySelector('.js-clock__hours').textContent = addPad(hours);
    rootSelect.querySelector('.js-clock__minutes').textContent =
      addPad(minutes);
    rootSelect.querySelector('.js-clock__seconds').textContent =
      addPad(seconds);
  }, 1000);
}

function getTimeComponents(time) {
  let hours = Math.floor((time / 1000 / 60 / 60) % 24) + timeZone;
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const seconds = Math.floor(time / 1000) % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

function addPad(value) {
  return String(value).padStart(2, 0);
}
