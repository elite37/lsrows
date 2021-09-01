import { storage } from "../storage"
import { getDataField } from "../getDataField"
import { dataHeaders } from "../header/dataHeaders"

export const switchRowToEdit = (row) => {
  row.dataset.editing = true
  let users = JSON.parse(storage.getItem('users'))
  console.log('s users: ', users)
  let user = users.find(u => Number(u.index) === Number(row.dataset.index))
  console.log('s user', user)
  dataHeaders.forEach(field => {
      let child = getDataField(row, field)
      console.log(child, child.dataset.column)
      let childInput = document.createElement('input')
      childInput.value = user[child.dataset.column]
      child.innerHTML = ''
      child.appendChild(childInput)
  })
}