import { addRow } from "../rows/addRow"

export const addExistingUsers = (table, users, tableDiv) => {
  console.log('tdau', tableDiv)
  users.forEach(user => {
    addRow(table, user, tableDiv)
  })
}