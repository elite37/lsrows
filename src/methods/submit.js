import { addUser } from '../methods/users/addUser'

export const submit = (table, tableDiv) => {
  // prevents what the button would have 
  addUser(table, tableDiv)
}