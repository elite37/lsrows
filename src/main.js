let tableDiv = document.querySelector(".table")

import { isNumber } from './utils/helpers/isNumber'
import { submit } from './utils/submit'
import { createHeader } from './utils/header/createHeader'
import { initUsers } from './utils/users/initUsers'
import { search } from './utils/users/search'

let reassignIndexesButton = document.querySelector('#reassignIndexesButton')
let limitWarning = document.querySelector('#limitWarning')
let searchField = document.querySelector("#searchField")
let limitField = document.querySelector("#limitField")
let submitButton = document.querySelector(".btn")

let table = document.createElement("table")
const header = createHeader()

const startSearch = () => {
  let limit = limitField.value
  if (limit === '') {
    limit = Infinity
  } else {
    limit = isNumber(limit)
    if (!limit) {
      limitWarning.innerText = 'the limit provided is not a number'
      limitWarning.style.display = 'block'
      return
    }
  }
  limitWarning.style.display = 'none'
  search(table, tableDiv, searchField.value, limit)
}

reassignIndexesButton.addEventListener('click', (e) => {
  e.preventDefault()
})

limitField.addEventListener('input', (e) => {
  e.preventDefault()
  startSearch()
})

searchField.addEventListener('input', (e) => {
  e.preventDefault()
  startSearch()
})

table.appendChild(header)
tableDiv.appendChild(table)

initUsers(table, tableDiv, searchField.value)

submitButton.addEventListener('click', (e) => {
  e.preventDefault()
  submit(table, tableDiv)
})