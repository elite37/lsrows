import { switchRowToEdit } from '../rows/switchRowToEdit'
import { updateUser } from '../users/updateUser'

export const createEdit = (table, row) => {
  let edit = document.createElement('button')

  edit.addEventListener('click', (e) => {
      e.preventDefault()
      const editing = (row.dataset.editing === 'true')
      if (!editing) {
          edit.innerText = 'Save'
          switchRowToEdit(row)
      } else {
          edit.innerText = 'Edit'
          updateUser(row)
      }
  })

  edit.classList.add('button')
  edit.classList.add('edit')
  edit.innerText = 'Edit'

  return edit
}