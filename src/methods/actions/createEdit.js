import { switchRowToEdit } from '../rows/switchRowToEdit'
import { updateRow } from '../rows/updateRow'

export const createEdit = (table, row) => {
  let edit = document.createElement('button')

  edit.addEventListener('click', (e) => {
      console.log('edit row: ', row)
      e.preventDefault()
      const editing = (row.dataset.editing === 'true')
      if (!editing) {
          edit.innerText = 'Save'
          switchRowToEdit(row)
      } else {
          edit.innerText = 'Edit'
          updateRow(row)
      }
  })

  edit.classList.add('button')
  edit.classList.add('edit')
  edit.innerText = 'Edit'

  return edit
}