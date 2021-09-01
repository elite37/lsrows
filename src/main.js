let tableDiv = document.querySelector(".table")

import { submit } from './methods/submit'
import { createHeader } from './methods/header/createHeader'
import { initUsers } from './methods/users/initUsers'

let submitButton = document.querySelector(".btn")

let table = document.createElement("table")
const header = createHeader()

table.appendChild(header)
tableDiv.appendChild(table)

console.log('tdm', tableDiv)
initUsers(table, tableDiv)

submitButton.addEventListener('click', (e) => {
  e.preventDefault()
  submit(table, tableDiv)
})