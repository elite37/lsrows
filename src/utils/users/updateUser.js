import { storage } from '../storage.js'
import { dataHeaders } from '../header/dataHeaders';
import { getDataField } from '../getDataField';

export const updateUser = (row) => {
    row.dataset.editing = false
    const users = JSON.parse(storage.getItem('users')),
        user = users.find(u => String(u.index) === row.dataset.index);
    
    dataHeaders.forEach(field => {
        const child = getDataField(row, field)
        const {column} = child.dataset;
        user[column] = child.childNodes[0].value
        child.innerHTML = user[column]
    });
    storage.setItem('users', JSON.stringify(users));
}