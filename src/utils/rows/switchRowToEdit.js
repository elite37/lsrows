import { storage } from "../storage"
import { getDataField } from "../getDataField"
import { dataHeaders } from "../header/dataHeaders"

export const switchRowToEdit = (row) => {
  row.dataset.editing = true
  let users = JSON.parse(storage.getItem('users'))
  let user = users.find(u => Number(u.index) === Number(row.dataset.index))
  dataHeaders.forEach(field => {
      let child = getDataField(row, field)
      let childInput = document.createElement('input')
      childInput.dataset.column = field
      childInput.dataset.index = row.dataset.index
      childInput.value = user[child.dataset.column]
      child.innerHTML = ''
      child.appendChild(childInput)
  })
}