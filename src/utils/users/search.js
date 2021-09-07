import {extract} from './fuzzball.esm.min.js'
import {token_set_ratio} from './fuzzball.esm.min.js'

import { addRow } from '../rows/addRow';
import { storage } from '../storage'

let users = JSON.parse(storage.getItem('users'))

const options = {scorer: token_set_ratio}

const userFuzz = (query) => {
  users.forEach(user => {
    let scores = []
    let values = Object.values(user)
    let results = extract(query, values, options)
    results.forEach((result) => {
      scores = [...scores, result[1]]
    })
    let score = scores.reduce((a, b) => Math.max(a, b))
    user.score = score
  });
}

export const search = (table, tableDiv, query, limit) => {
  userFuzz(query)
  users.sort((u1, u2) => u2.score - u1.score)
  users.filter((u) => u.score > 70)
  const tableChildren = Array.from(table.children)
  if (limit) {
    users = users.slice(0, limit)
  }
  tableChildren.forEach((row) => {
    if (tableChildren.indexOf(row) === 0) {
      return
    }
    table.removeChild(row)
  })
  users.forEach((user) => {
    addRow(table, user, tableDiv)
  })
}