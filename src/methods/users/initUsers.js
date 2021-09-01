import { storage } from '../storage';
import { addExistingUsers } from './addExistingUsers';
import { setCurrentIndex } from '../currentIndex/setCurrentIndex';

export const initUsers = (table, tableDiv) => {
  console.log('tdi', tableDiv)
  const users = JSON.parse(storage.getItem('users'));
  console.log('users: ', users)

  if (!Array.isArray(users) || !users.length) {
    console.log('nope, setting new')
    storage.setItem('users', JSON.stringify([]));
    setCurrentIndex(1);
  } else {
    const newIndex = users.length + 1;
    setCurrentIndex(newIndex);

    // add already existing users from localStorage
    addExistingUsers(table, users, tableDiv);
  }
};
