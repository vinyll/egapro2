const form = document.querySelector('#page-form')
const progress = document.querySelector('progress')
const previousButton = document.querySelector('a[previous]')
const nextButton = document.querySelector('button[next]')

const steps = [
  '', 'validation-email', 'commencer', 'declarant', 'annee'
]
let stepIndex = steps.findIndex(s => s === location.pathname.slice(1))

progress.max = steps.length - 1

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  if(typeof validateForm === 'function') {
    if (!(await validateForm(event.target))) return
  }
  stepIndex += 1
  redirect(`/${steps[stepIndex]}`)
})

function redirect(url) {
  location.href = url
}

function changePage(name) {
  loadTemplate(name || 'intro')

  const step = steps.indexOf(name)
  progress.value = step

  // "Previous" button
  if (step > 0) {
    previousButton.onclick = function() {
      redirect(`/${steps[step - 1]}`)
    }
    previousButton.removeAttribute('disabled')
  } else {
    previousButton.setAttribute('disabled', 'disabled')
  }
  // "Next" button
  if(step < steps.length - 1) {
    nextButton.removeAttribute('disabled')
    document.forms[0].onsubmit = async function(event) {
      event.preventDefault()
      if(typeof validateForm === 'function')
        if (!(await validateForm(event.target))) return
      else validateForm = undefined // reset function
      page.redirect(`/${steps[step + 1]}`)
    }
  }
  else {
    nextButton.setAttribute('disabled', 'disabled')
  }
}

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
