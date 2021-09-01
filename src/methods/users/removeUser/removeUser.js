import { deleteUserFromStorage } from "./deleteUserFromStorage"

export const removeUser = (table, row) => {
    deleteUserFromStorage(row.dataset.index)
    table.removeChild(row)
}