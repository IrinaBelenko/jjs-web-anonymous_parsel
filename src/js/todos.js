import Storage from './helpers/localStorageAPI';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.js-todos__form');
const listEl = document.querySelector('ul');

const STORAGE_KEY = { InputDataTask: 'input-data-task', todos: 'todos' };

let items = [];

populateTextarea();
updateInputData();

formEl.addEventListener('submit', onClickSubmit);
listEl.addEventListener('click', onBtnsClick);
formEl.addEventListener('input', saveInputData);

function updateInputData() {
  formEl['user-todos'].value = Storage.load(STORAGE_KEY.InputDataTask) || '';
}

function saveInputData(e) {
  Storage.save(
    STORAGE_KEY.InputDataTask,
    e.currentTarget.elements['user-todos'].value
  );
}

function updateList() {
  const markup = items.map(item => {
    const liEl = document.createElement('li');
    const spanEl = document.createElement('span');
    const containerEl = document.createElement('div');
    const btnDelEl = document.createElement('button');
    const btnStatusEl = document.createElement('button');

    btnDelEl.setAttribute('type', 'button');
    btnDelEl.setAttribute('class', 'delete ');
    btnDelEl.setAttribute('data-id', item.id);
    btnDelEl.setAttribute('data-type', 'delete');
    btnDelEl.textContent = 'Видалити';

    btnStatusEl.setAttribute('type', 'button');
    btnStatusEl.setAttribute('data-id', item.id);
    btnStatusEl.setAttribute('data-type', 'status');
    btnStatusEl.setAttribute('data-status', 'false');
    btnStatusEl.textContent = item.status;

    btnStatusEl.setAttribute(
      'class',
      btnStatusEl.textContent === 'Виконано' ? 'сompleted' : ''
    );

    spanEl.textContent = item.text;

    liEl.appendChild(spanEl);
    containerEl.appendChild(btnStatusEl);
    containerEl.appendChild(btnDelEl);
    liEl.appendChild(containerEl);

    return liEl;
  });

  listEl.innerHTML = '';
  listEl.append(...markup);
  Storage.save(STORAGE_KEY.todos, items);
}

function onClickSubmit(event) {
  event.preventDefault();
  const input = event.currentTarget.elements['user-todos'];
  const todos = input.value.trim();

  if (!todos) {
    return Notify.failure('Будь ласка, введіть ваше завдання');
  }

  const item = {
    id: Date.now(),
    text: todos,
    status: 'Не виконано',
  };
  items.push(item);

  updateList();
  input.value = '';

  Storage.remove(STORAGE_KEY.InputDataTask);
}

function onBtnsClick(event) {
  const todosId = parseInt(event.target.dataset.id);
  const btnType = event.target.dataset.type;

  if (btnType === 'delete') {
    items = items.filter(item => item.id !== todosId);
    updateList();
    return;
  }

  if (btnType === 'status') {
    if (event.target.textContent === 'Не виконано') {
      event.target.textContent = 'Виконано';
      event.target.classList.add('сompleted');
      let data = Storage.load(STORAGE_KEY.todos);
      data = data.map(item => {
        if (item.id === todosId) {
          return { ...item, status: 'Виконано' };
        }
        return item;
      });
      Storage.save(STORAGE_KEY.todos, data);
    } else {
      event.target.textContent = 'Не виконано';
      event.target.classList.remove('сompleted');
      let data = Storage.load(STORAGE_KEY.todos);
      data = data.map(item => {
        if (item.id === todosId) {
          return { ...item, status: 'Не виконано' };
        }
        return item;
      });
      Storage.save(STORAGE_KEY.todos, data);
    }
  }
}

function populateTextarea() {
  const savedItems = Storage.load(STORAGE_KEY.todos);

  if (!savedItems) {
    return;
  }

  for (const item of savedItems) {
    items.push(item);
  }
  updateList();
}
