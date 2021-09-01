import { createEdit } from './createEdit'
import { createDelete } from './createDelete'

export const createActions = (table, row) => {
  let actions = document.createElement('div')
  actions.classList.add('actions')

  let edit = createEdit(table, row)
  let del = createDelete(table, row)

  actions.appendChild(edit)
  actions.appendChild(del)

  return actions
}