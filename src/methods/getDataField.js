export const getDataField = (row, field) => {
  const children = Array.from(row.children)
  return children.find(child => String(field) === String(child.dataset.column))
}