let tableDiv = document.querySelector(".table")

import { submit } from './utils/submit'
import { createHeader } from './utils/header/createHeader'
import { initUsers } from './utils/users/initUsers'

let submitButton = document.querySelector(".btn")

let table = document.createElement("table")
const header = createHeader()

table.appendChild(header)
tableDiv.appendChild(table)

initUsers(table, tableDiv)

submitButton.addEventListener('click', (e) => {
  e.preventDefault()
  submit(table, tableDiv)
})