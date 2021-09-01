(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  let storage = localStorage;

  const dataHeaders = [
    'First Name',
    'Last Name',
    'Phone Number',
    'Tech Stack'
  ];

  const addFields = (user, row) => {
    dataHeaders.forEach((field) => {
      const dataField = document.createElement('td');
      dataField.classList.add('text-field');
      dataField.dataset.column = field;

      /*
      *  Faster than appendChild
      * https://stackoverflow.com/questions/2305654/innerhtml-vs-appendchildtxtnode
      */
      dataField.innerText = user[field];

      row.appendChild(dataField);
    });
  };

  const addSerialNumberField = (user, row) => {
    const serialNumberField = document.createElement('td');
    serialNumberField.innerHTML = user.index;
    row.appendChild(serialNumberField);
  };

  const getDataField = (row, field) => {
    const children = Array.from(row.children);
    return children.find(child => String(field) === String(child.dataset.column))
  };

  const switchRowToEdit = (row) => {
    row.dataset.editing = true;
    let users = JSON.parse(storage.getItem('users'));
    console.log('s users: ', users);
    let user = users.find(u => Number(u.index) === Number(row.dataset.index));
    console.log('s user', user);
    dataHeaders.forEach(field => {
        let child = getDataField(row, field);
        console.log(child, child.dataset.column);
        let childInput = document.createElement('input');
        childInput.value = user[child.dataset.column];
        child.innerHTML = '';
        child.appendChild(childInput);
    });
  };

  const updateRow = (row) => {
      row.dataset.editing = false;
      const users = JSON.parse(storage.getItem('users')),
          user = users.find(u => String(u.index) === row.dataset.index);
      
      dataHeaders.forEach(field => {
          const child = getDataField(row, field),
              {column} = child.dataset;
          user[column] = child.childNodes[0].value;
          child.innerHTML = user[column];
      });
      storage.setItem('users', JSON.stringify(users));
  };

  const createEdit = (table, row) => {
    let edit = document.createElement('button');

    edit.addEventListener('click', (e) => {
        console.log('edit row: ', row);
        e.preventDefault();
        const editing = (row.dataset.editing === 'true');
        if (!editing) {
            edit.innerText = 'Save';
            switchRowToEdit(row);
        } else {
            edit.innerText = 'Edit';
            updateRow(row);
        }
    });

    edit.classList.add('button');
    edit.classList.add('edit');
    edit.innerText = 'Edit';

    return edit
  };

  const deleteUserFromStorage = (index) => {
    let users = JSON.parse(storage.getItem('users'));
    users = users.filter(u => String(u.index) !== index);
    const stringifiedUsers = JSON.stringify(users);
    storage.setItem('users', stringifiedUsers);
  };

  const removeUser = (table, row) => {
      deleteUserFromStorage(row.dataset.index);
      table.removeChild(row);
  };

  const createDelete = (table, row) => {
    // initialized as 'del' because 'delete' is a reserved js word
    let del = document.createElement('button');

    del.addEventListener("click", (e) => {
      e.preventDefault();
      removeUser(table, row);
    });

    del.innerText = 'Delete';

    del.classList.add('button');
    del.classList.add('del');

    return del
  };

  const createActions = (table, row) => {
    let actions = document.createElement('div');
    actions.classList.add('actions');

    let edit = createEdit(table, row);
    let del = createDelete(table, row);

    actions.appendChild(edit);
    actions.appendChild(del);

    return actions
  };

  const addRow = (table, user, tableDiv) => {
    let row = document.createElement("tr");

    let actions = createActions(table, row);

    row.dataset.editing = false;
    row.dataset.index = user.index;

    addSerialNumberField(user, row);
    addFields(user, row);
    row.appendChild(actions);

    table.appendChild(row);
    // why ?
    if (tableDiv) tableDiv.appendChild(table);
    console.log('tdar', tableDiv);
    tableDiv.style.display = 'block';
  };

  const getCurrentIndex = () => {
    return Number(storage.getItem('currentIndex'))
  };

  const setCurrentIndex = (index) => {
    return storage.setItem('currentIndex', index)
  };

  const incrementCurrentIndex = () => {
    const newIndex = getCurrentIndex() + 1;
    setCurrentIndex(newIndex);
  };

  let allFormInputElements = document.querySelectorAll("input");

  const addUser = (table, tableDiv) => {

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
    let user = { index: getCurrentIndex() };
    
    // populate the user object with the values in the input elements
    allFormInputElements.forEach(inputNode =>{
        user[inputNode.placeholder] = inputNode.value;
    });

    let users = JSON.parse(storage.getItem('users'));
    users = [...users, user];
    storage.setItem('users', JSON.stringify(users));

    addRow(table, user, tableDiv);

    incrementCurrentIndex();
  };

  const submit = (table, tableDiv) => {
    // prevents what the button would have 
    addUser(table, tableDiv);
  };

  const headers = [
    "SN",
    "First Name",
    "Last Name",
    "Phone Number",
    "Tech Stack",
    "Action"
  ];

  const createElement = (elementName) => {
    return document.createElement(elementName);
  };

  const createHeader = () => {
    let header = createElement('tr');
    headers.forEach((headtext) =>{
      let head = document.createElement("th");
      let textNode = document.createTextNode(headtext);
      head.appendChild(textNode);
      header.appendChild(head);
    });
    return header
  };

  const addExistingUsers = (table, users, tableDiv) => {
    console.log('tdau', tableDiv);
    users.forEach(user => {
      addRow(table, user, tableDiv);
    });
  };

  const initUsers = (table, tableDiv) => {
    console.log('tdi', tableDiv);
    const users = JSON.parse(storage.getItem('users'));
    console.log('users: ', users);

    if (!Array.isArray(users) || !users.length) {
      console.log('nope, setting new');
      storage.setItem('users', JSON.stringify([]));
      setCurrentIndex(1);
    } else {
      const newIndex = users.length + 1;
      setCurrentIndex(newIndex);

      // add already existing users from localStorage
      addExistingUsers(table, users, tableDiv);
    }
  };

  let tableDiv = document.querySelector(".table");

  let submitButton = document.querySelector(".btn");

  let table = document.createElement("table");
  const header = createHeader();

  table.appendChild(header);
  tableDiv.appendChild(table);

  console.log('tdm', tableDiv);
  initUsers(table, tableDiv);

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    submit(table, tableDiv);
  });

})));
