export const addSerialNumberField = (user, row) => {
  const serialNumberField = document.createElement('td')
  serialNumberField.innerHTML = user.index
  row.appendChild(serialNumberField)
}