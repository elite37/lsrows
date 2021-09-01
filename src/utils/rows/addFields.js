import { dataHeaders } from '../header/dataHeaders';

export const addFields = (user, row) => {
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
