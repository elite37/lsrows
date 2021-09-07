import { submit } from './submit'
import { updateUser } from './users/updateUser'

export const enter = (table, tableDiv) => {
  const children = Array.from(table.children)
  const focusedElement = document.activeElement
  if (focusedElement.dataset.column) {
    const row = children.find((child) => child.dataset.index === focusedElement.dataset.index)
    updateUser(row)
  } else if(focusedElement.id === 'main-submit-button') {
    submit(table, tableDiv)
  }
}