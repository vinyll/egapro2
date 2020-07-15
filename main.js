const main = document.querySelector('main')
const progress = document.querySelector('progress')
const previousButton = document.querySelector('a[previous]')
const nextButton = document.querySelector('button[next]')
const template404 = document.querySelector('template[name="404"]')

const steps = [
  '', 'declarant', 'annee'
]

const components = {
  group: function(children) {
    if(!Array.isArray(children)) children = [children]
    return `<div>${children.join('')}</div>`
  },

  label: function({ name, label }) {
    return `<label for="field--${name}">${label}</label>`
  },

  input: function({ type, name, label, required, value }) {
    return `
      ${ this.label({ name, label }) }
      <input id="field--${name}" value="${value || ''}" type="${type || 'text'}" name="${name}" placeholder="${label}" ${required ? 'required' : ''}>
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
    document.forms[0].onsubmit = function(event) {
      event.preventDefault()
      if(validateForm && !validateForm()) return
      page.redirect(`/${steps[step + 1]}`)
    }
    nextButton.removeAttribute('disabled')
  }
  else {
    nextButton.setAttribute('disabled', 'disabled')
  }
}

function loadTemplate(name) {
  const template = document.querySelector(`[name=${name}]`)
  const content = template ? template.innerHTML : template404.innerHTML
  main.innerHTML = (new Function('return `'+content+'`'))()
  setPageTitle(main.querySelector('h1').innerHTML)
  const script = main.querySelector('script')
  if(script) eval(script.innerText)
}

function setPageTitle(title) {
  document.title = `Egapro – ${title}`
}
