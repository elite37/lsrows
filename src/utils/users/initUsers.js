import { storage } from '../storage';
import { addExistingUsers } from './addExistingUsers';
import { setCurrentIndex } from '../currentIndex/setCurrentIndex';

export const initUsers = (table, tableDiv) => {
  const users = JSON.parse(storage.getItem('users'));

  if (!Array.isArray(users) || !users.length) {
    storage.setItem('users', JSON.stringify([]));
    setCurrentIndex(1);
  } else {
    const newIndex = users.length + 1;
    setCurrentIndex(newIndex);

    // add already existing users from localStorage
    addExistingUsers(table, users, tableDiv);
  }
};
