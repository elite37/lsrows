import { storage } from "../storage"

export const getUsers = () => {
  return JSON.parse(storage.getItem('users'))
}