import { storage } from "../storage";
import { getUsers } from "./getUsers"

export const reassignIndexes = () => {
  let users = getUsers()
  users.forEach((user, index) => {
    let newIndex = index + 1
    let rows = Array.from(window.table.children)
    let row = rows.find((row) => Number(row.dataset.index) === user.index)
    if (row) {
      row.childNodes[0].innerText = newIndex
      row.dataset.index = newIndex
    }
    user.index = newIndex
  });
  storage.setItem('users', JSON.stringify(users))
}