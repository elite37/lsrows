import { headers } from './headers'
import { createElement } from '../helpers/createElement'

export const createHeader = () => {
  let header = createElement('tr')
  headers.forEach((headtext) =>{
    let head = document.createElement("th")
    let textNode = document.createTextNode(headtext)
    head.appendChild(textNode)
    header.appendChild(head)
  })
  return header
}