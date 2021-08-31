export const addRow = (user) => {
  console.log(user)
  let row = document.createElement("tr")

  row.dataset.editing = false
  row.dataset.index = user.index
  
  let serialNumberField = document.createElement("td")
  serialNumberField.innerHTML = currentIndex
  row.appendChild(serialNumberField)

  requiredFields.forEach(field => {
      let dataField = document.createElement("td")
      dataField.dataset.column = field
      let textNode = document.createTextNode(user[field])
      dataField.appendChild(textNode)
      row.appendChild(dataField)
  })

  let actions = document.createElement('div')

  let edit = document.createElement('button')

  edit.addEventListener('click', (e) => {
      const editing = (row.dataset.editing === 'true')
      if (!editing) {
          row.editing = true
          let users = JSON.parse(storage.getItem('users'))
          console.log(users)
          console.log(row.dataset.index)
          let user = users.find(u => u.index === row.dataset.index)
          console.log('user: ', user)
          requiredFields.forEach(field => {
              const children = Array.from(row.children)
              children.forEach(c => console.log(c))
              let child = children.find(child => field === child.dataset.column)
              console.log('editingChild: ', child)
              let childInput = document.createElement('input')
              childInput.value = user[child.column]
              child.innerHTML = ''
              child.appendChild(childInput)
          })
      } else if (editing) {
          console.log('is')
          let users = JSON.parse(storage.getItem('users'))
          let user = {}
          row.editing = false
          requiredFields.forEach(field => {
              const children = Array.from(row.children)
              let child = children.find(child => field === child.dataset.column)
              let column = child.dataset.column
              if (requiredFields.find(field => field === column))
              user[column] = child.firstChildElement.value
              let textNode = document.createTextNode(user[column])
              child.innerHTML = ''
              child.appendChild(textNode)
          })
          users[row.dataset.index - 1] = user
          storage.setItem('users', users)
      }
  })

  edit.style.color = 'white'
  edit.style.backgroundColor = 'green'
  let editText = document.createTextNode('Edit')
  edit.appendChild(editText)

  let del = document.createElement('button')

  del.addEventListener("click", (e) => {
      table.removeChild(row)
  })

  del.style.color = 'white'
  del.style.backgroundColor = 'red'
  let delText = document.createTextNode('Delete')
  del.appendChild(delText)

  actions.appendChild(edit)
  actions.appendChild(del)
  row.appendChild(actions)

  table.appendChild(row)
  tableContainer.appendChild(table)
}