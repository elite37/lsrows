import { addFields } from './addFields'
import { addSerialNumberField } from './addSerialNumberField'
import { createActions } from '../actions/createActions'

export const addRow = (table, user, tableDiv) => {
  let row = document.createElement("tr")

  let actions = createActions(table, row)

  row.dataset.editing = false
  row.dataset.index = user.index

  addSerialNumberField(user, row)
  addFields(user, row)
  row.appendChild(actions)

  table.appendChild(row)
  // why ?
  if (tableDiv) tableDiv.appendChild(table)
  console.log('tdar', tableDiv)
  tableDiv.style.display = 'block'
}