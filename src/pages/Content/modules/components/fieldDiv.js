function createDiv(title) {
  const fieldDiv = document.createElement('div')
  fieldDiv.style.cssText = `
    margin: 16px 32px 0 0;
    border: solid 1px #e0ded9;
    padding: 5px 5px 5px 0;
    border-radius: 6px;
  `
  return fieldDiv
}

function createLabel(title) {
  const labelSpan = document.createElement('span')
  labelSpan.style.cssText = `
    background-color:#0f6378;
    color: white;
    border: #0f6378 1px solid;
    border-radius: 6px 0 0 6px;
    padding: 4px 10px 7px;
  `
  labelSpan.innerText = title
  return labelSpan
}

function createValueSpan(value, borderLeft) {
  const valueSpan = document.createElement('span')
  valueSpan.style.padding = '5px'
  if (borderLeft) valueSpan.style.borderLeft = 'solid 1px #e0ded9'
  valueSpan.innerText = value
  return valueSpan
}

export function createFieldDiv(title, ...values) {
  const container = createDiv()
  container.append(createLabel(title))

  values.forEach((value, index) => {
    if (!value) return
    container.append(createValueSpan(value, index))
  })

  return container
}
