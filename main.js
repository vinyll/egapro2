const main = document.querySelector('main')
const progress = document.querySelector('progress')
const previousButton = document.querySelector('a[previous]')
const nextButton = document.querySelector('button[next]')
const template404 = document.querySelector('template[name="404"]')

const steps = [
  '', 'validation-email', 'commencer', 'declarant', 'annee'
]

const components = {
  group: function(children) {
    if(!Array.isArray(children)) children = [children]
    return `<div>${children.join('')}</div>`
  },

  label: function({ name, label }) {
    return `<label for="field--${name}">${label}</label>`
  },

  input: function({ type, name, label, required, value, placeholder, pattern }) {
    return `
      ${ this.label({ name, label }) }
      <input id="field--${name}" value="${value || ''}" type="${type || 'text'}" name="${name}" placeholder="${placeholder || label}" ${required ? 'required' : ''} pattern="${pattern || '.*'}">
    `
  },

  select: function({ name, label, required, options, value }) {
    return `
      ${ this.label({ name, label }) }
      <select id="field--${name}" name="${name}" ${required ? 'required' : ''}>
        ${options.map((option) => `<option value="${option.value}" ${value == option.value ? 'selected' : ''}>${option.label}</option>`).join('\n')}
      </select>
    `
  }
}
const c = components // shorthand alias

progress.max = steps.length - 1

page('/', function (req) {
  changePage('')
})

page('/login/:token', function (req) {
  localStorage.setItem('token', req.params.token)
  page.redirect('/')
})

page('/:name', function (req) {
  changePage(req.params.name)
})

page({ hashbang: true })


function changePage(name) {
  loadTemplate(name || 'intro')

  const step = steps.indexOf(name)
  progress.value = step

  // "Previous" button
  if (step > 0) {
    previousButton.onclick = function() {
      page.redirect(`/${steps[step - 1]}`)
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

function loadTemplate(name) {
  const dummy = document.createElement('div')
  const template = document.querySelector(`[name=${name}]`)
  dummy.innerHTML = template ? template.innerHTML : template404.innerHTML
  setPageTitle(dummy.querySelector('h1').innerHTML)
  const script = dummy.querySelector('script')
  if(script) {
    eval(script.innerText)
    dummy.removeChild(script)
  }
  main.innerHTML = (new Function('return `'+dummy.innerHTML+'`'))()
}

function setPageTitle(title) {
  document.title = `Egapro – ${title}`
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
