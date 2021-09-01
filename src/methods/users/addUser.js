import { storage } from '../storage'
import { addRow } from '../rows/addRow'
import { getCurrentIndex } from '../currentIndex/getCurrentIndex'
import { incrementCurrentIndex } from '../currentIndex/incrementCurrentIndex'
let allFormInputElements = document.querySelectorAll("input")

export const addUser = (table, tableDiv) => {

  // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
  let user = { index: getCurrentIndex() }
  
  // populate the user object with the values in the input elements
  allFormInputElements.forEach(inputNode =>{
      user[inputNode.placeholder] = inputNode.value
  })

  let users = JSON.parse(storage.getItem('users'))
  users = [...users, user]
  storage.setItem('users', JSON.stringify(users))

  addRow(table, user, tableDiv)

  incrementCurrentIndex()
}