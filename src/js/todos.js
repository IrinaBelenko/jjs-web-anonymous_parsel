import Storage from './helpers/localStorageAPI';

const formEl = document.querySelector('.js-todos__form');
const listEl = document.querySelector('ul');
const STORAGE_KEY = 'todos';
let items = [];

const uptadeList = () => {
  const markup = items.map(item => {
    const liEl = document.createElement('li');
    const spanEl = document.createElement('span');
    spanEl.textContent = item.text;
    liEl.appendChild(spanEl);
    const btnEl = document.createElement('button');
    btnEl.setAttribute('type', 'button');
    btnEl.setAttribute('class', 'delete');
    btnEl.setAttribute('data-id', item.id);
    btnEl.textContent = 'Delete';
    liEl.appendChild(btnEl);
    return liEl;
  });
  listEl.innerHTML = '';
  listEl.append(...markup);
  Storage.save(STORAGE_KEY, items);
};

const onClickSubmit = event => {
  event.preventDefault();
  const input = event.currentTarget.elements['user-todos'];
  const todos = input.value.trim();

  if (!todos) {
    return alert('Please enter your todos');
  }

  const item = {
    id: Date.now(),
    text: todos,
  };
  items.push(item);

  uptadeList();
  input.value = '';
};

const onBtnClick = event => {
  const todosId = parseInt(event.target.dataset.id);

  items = items.filter(item => item.id !== todosId);
  uptadeList();
};

function populateTextarea() {
  const savedItems = Storage.load(STORAGE_KEY);
  console.log(savedItems);

  if (!savedItems) {
    return;
  }

  for (const item of savedItems) {
    items.push(item);
  }
  uptadeList();
}

populateTextarea();

formEl.addEventListener('submit', onClickSubmit);
listEl.addEventListener('click', onBtnClick);
