import html from './app.html?raw';

/**
 *
 * @param {String} elementId
 */

export const App = (elementId) => {
  console.log('App');
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
  })();

  const itemForm = document.getElementById('item-form');
  const itemInput = document.getElementById('item-input');
  const itemList = document.getElementById('item-list');
  const clearBtn = document.getElementById('clear');
  const itemFilter = document.getElementById('filter');
  const formBtn = itemForm.querySelector('button');
  let isEditMode = false;

  const displayItems = () => {
    const itemsFromStorage = getItemFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));
    checkUI();
  };

  const onAddItemSubmit = (e) => {
    e.preventDefault();

    const newItem = itemInput.value;

    //* Validate Input
    if (newItem === '') {
      alert('Please add an item');
      return;
    }

    //* Check for edit mode

    if (isEditMode) {
      const itemToEdit = itemList.querySelector('.edit-mode');
      removeItemFromStorage(itemToEdit.textContent);
      itemToEdit.classList.remove('edit-mode');
      itemToEdit.remove();
      isEditMode = false;
    } else {
      if (checkIfItemExist(newItem)) {
        alert('That item already exists!');
        return;
      }
    }

    //* Create item DOM element

    addItemToDOM(newItem);

    //* Add item to local storage

    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';
  };

  const addItemToDOM = (item) => {
    //* Create list item

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //*  Add li to the DOM
    itemList.appendChild(li);
  };

  const createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
  };
  const createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
  };

  const addItemToStorage = (item) => {
    const itemsFromStorage = getItemFromStorage();

    //* Add a new item to array

    itemsFromStorage.push(item);

    //* Convert to JSON String and set to localstorage

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  };

  const getItemFromStorage = () => {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
      itemsFromStorage = [];
    } else {
      itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
  };

  const onClickItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
      removeItem(e.target.parentElement.parentElement);
    } else {
      setItemToEdit(e.target);
    }
  };

  const checkIfItemExist = (item) => {
    const itemsFromStorage = getItemFromStorage();
    return itemsFromStorage.includes(item);
  };

  const setItemToEdit = (item) => {
    isEditMode = true;

    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen "></i> Updated item';
    formBtn.className = 'btn-update-edit';
    itemInput.value = item.textContent;
  };

  const removeItem = (item) => {
    if (confirm('Are you sure?')) {
      //* Remove item from DOM
      item.remove();

      //*Remove item from storage
      removeItemFromStorage(item.textContent);

      checkUI();
    }
  };

  const removeItemFromStorage = (item) => {
    let itemsFromStorage = getItemFromStorage();

    //* Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //* Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
  };

  const clearItems = () => {
    // itemList.innerHTML = '';
    // itemList.remove();
    if (confirm('Are you sure you want to clear all the items?')) {
      while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
      }

      //*Clear from localstorage
      localStorage.removeItem('items');

      checkUI();
    }
  };

  const filterItems = (e) => {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
      const itemName = item.firstChild.textContent.toLowerCase();
      if (itemName.indexOf(text) != -1) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  };

  const checkUI = () => {
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
      clearBtn.style.display = 'none';
      itemFilter.style.display = 'none';
    } else {
      clearBtn.style.display = 'block';
      itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.className = 'btn';

    isEditMode = false;
  };

  //! Initialize app
  const init = () => {
    //* EventListener

    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
  };

  init();
};
