import { removeUser } from "../users/removeUser/removeUser"

export const createDelete = (table, row) => {
  // initialized as 'del' because 'delete' is a reserved js word
  let del = document.createElement('button')

  del.addEventListener("click", (e) => {
    e.preventDefault()
    removeUser(table, row)
  })

  del.innerText = 'Delete'

  del.classList.add('button')
  del.classList.add('del')

  return del
}