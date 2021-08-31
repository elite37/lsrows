let requiredFields = ['First Name', 'Last Name', 'Phone Number', 'Tech Stack']

const switchRowToEdit = (row) => {
    row.dataset.editing = true
    let users = JSON.parse(storage.getItem('users'))
    let user = users.find(u => Number(u.index) === Number(row.dataset.index))
    requiredFields.forEach(field => {
        const children = Array.from(row.children)

        // why do i have to cast them to String to use strict comparison?
        let child = children.find(child => String(field) === String(child.dataset.column))
        let childInput = document.createElement('input')
        childInput.value = user[child.dataset.column]
        child.innerHTML = ''
        child.appendChild(childInput)
    })
}

const updateRow = (row) => {
    row.dataset.editing = false
    let users = JSON.parse(storage.getItem('users'))
    let user = {}
    // let user = users.find(u => String(u.index) === row.dataset.index)
    requiredFields.forEach(field => {
        const children = Array.from(row.children)
        let child = children.find(child => String(field) === String(child.dataset.column))
        let column = child.dataset.column
        console.log('update child: ', child)
        console.log('update child firstCE: ', child.childNodes[0])
        user[column] = child.childNodes[0].value
        let textNode = document.createTextNode(user[column])
        child.innerHTML = ''
        child.appendChild(textNode)
    })
    let storageItem = users.find(u => String(u.index) === row.dataset.index)
    let storageIndex = users.indexOf(storageItem)
    users[storageIndex] = user
    storage.setItem('users', JSON.stringify(users))
}

const addUser = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
    let user = { index: currentIndex }
    
    // populate the user object with the values in the input elements
    allFormInputElements.forEach(inputNode =>{
        user[inputNode.placeholder] = inputNode.value
    })

    let users = JSON.parse(storage.getItem('users'))
    users = [...users, user]
    storage.setItem('users', JSON.stringify(users))

    addRow(user)

    currentIndex += 1
}

const addRow = (user) => {
    let row = document.createElement("tr")
  
    row.dataset.editing = false
    row.dataset.index = user.index
    
    let serialNumberField = document.createElement("td")
    serialNumberField.innerHTML = user.index
    row.appendChild(serialNumberField)
  
    requiredFields.forEach(field => {
        let dataField = document.createElement("td")
        dataField.classList.add('text-field')
        dataField.dataset.column = field
        let textNode = document.createTextNode(user[field])
        dataField.appendChild(textNode)
        row.appendChild(dataField)
    })
  
    let actions = document.createElement('div')

    actions.classList.add('actions')
  
    let edit = document.createElement('button')
  
    edit.addEventListener('click', (e) => {
        const editing = (row.dataset.editing === 'true')
        if (!editing) {
            edit.innerText = 'Save'
            switchRowToEdit(row)
        } else {
            edit.innerText = 'Edit'
            updateRow(row)
        }
    })
  
    edit.style.color = 'white'
    edit.style.backgroundColor = 'green'
    let editText = document.createTextNode('Edit')
    edit.appendChild(editText)
  
    let del = document.createElement('button')
  
    del.addEventListener("click", (e) => {
        users = JSON.parse(storage.getItem('users'))
        let user = users.find(u => String(u.index) === row.dataset.index)
        let userIndex = users.indexOf(user)
        users = users.filter(u => String(u.index) !== row.dataset.index)
        const usersString = JSON.stringify(users)
        storage.setItem('users', usersString)
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

let headerFields = ["SN", "First Name", "Last Name", "Phone Number", "Tech Stack", "Action"]

let storage = window.localStorage

let btn = document.querySelector(".btn")
let tableContainer = document.querySelector(".table")
let allFormInputElements = document.querySelectorAll("input")

let table = document.createElement("table")
let headerRow = document.createElement("tr")

let currentIndex

let users = JSON.parse(storage.getItem('users'))

table.appendChild(headerRow)
tableContainer.appendChild(table)

// create header
headerFields.forEach(headtext =>{
    let head = document.createElement("th")
    let textNode = document.createTextNode(headtext)
    head.appendChild(textNode)
    headerRow.appendChild(head)
})

if (!users) {
    currentIndex = 1
    storage.setItem('users', JSON.stringify([]))
} else {
    currentIndex = users.length + 1

    // add already existing users from localStorage
    users.forEach(user => {
        addRow(user)
    })
}

const submit = (e) => {
    // prevents what the button would have 
    e.preventDefault()
    addUser()
}

btn.addEventListener('click', submit)