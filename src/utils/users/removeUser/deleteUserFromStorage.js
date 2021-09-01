import { storage } from "../../storage"

export const deleteUserFromStorage = (index) => {
  let users = JSON.parse(storage.getItem('users'))
  users = users.filter(u => String(u.index) !== index)
  const stringifiedUsers = JSON.stringify(users)
  storage.setItem('users', stringifiedUsers)
}