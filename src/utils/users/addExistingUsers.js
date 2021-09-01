import { addRow } from "../rows/addRow"

export const addExistingUsers = (table, users, tableDiv) => {
  users.forEach(user => {
    addRow(table, user, tableDiv)
  })
}