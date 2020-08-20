async function request(method, uri, body, options = {}) {
  if(!['get', 'head'].includes(method.toLowerCase()))
    options.body = body ? JSON.stringify(body) : ""
  options.method = method
  options.headers = { 'API-KEY': localStorage.token }
  const response = await fetch(`http://localhost:2626${uri}`, options)
  try {
    response.data = await response.json()
  }
  catch {
    response.data = null
  }
  if(!response.ok && response.data) alert(response.data.error)
  return response
}

function redirect(url) {
  location.href = url
}

function buildSelectOptions(select, list, value) {
  const options = list.forEach((val) => {
    const option = document.createElement('option')
    option.value = val.value
    option.textContent = val.label
    if(option.value == value) option.selected = 'selected'
    select.appendChild(option)
  })
}

function buildRadioOptions(optgroup, list, value) {
  optgroup.innerHTML = list.map((val, i) => {
    const content = `<label for="radio--${optgroup.name}--${i}">
    <input type="radio" value="${val.value}" ${val.value == value ? 'checked' : ''}>
    ${val.label}
    </label>`
    const wrapped = optgroup.hasAttribute('option-block') ? `<div>${content}</div>` : content
    return wrapped
  }).join('')
}

// Shortcut event
window.addEventListener('DOMContentLoaded', () => {
  document.onready && document.onready()
})
