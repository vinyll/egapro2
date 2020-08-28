const form = document.querySelector('#page-form')
const progress = document.querySelector('progress')
const previousButton = document.querySelector('a[previous]')
const nextButton = document.querySelector('button[next]')
const steps = [
  'declaration', 'declarant', 'annee', 'entreprise', 'remuneration'
]
const pageName = location.pathname.slice(1)
const step = steps.indexOf(pageName)

window.data = JSON.parse(localStorage.data)

loadFormValues(form, data)

progress.max = steps.length - 1
progress.value = step

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const form = event.target
  const data = formToData(form)

  if(typeof document.onsend === 'function') {
    try {
      await document.onsend(data)
    } catch(e) {
      alert(e)
      return
    }
  }

  const response = await sendData(data)
  if(!response.ok) return

  redirect(`/${steps[step + 1]}`)
})

// "Previous" button
if (step > 0) {
  previousButton.href = `/${steps[step - 1]}`
}
else {
  previousButton.setAttribute('disabled', 'disabled')
}

// "Next" button
if(step >= steps.length - 1) {
  nextButton.setAttribute('disabled', 'disabled')
}

function formToData(form) {
  const data = Array.from(form.elements).reduce((data, node) => {
    if(node.name) data[node.name] = node.value
    return data
  }, {})
  return data
}

async function sendData(data) {
  const response = await request('PUT', `/declaration/${localStorage.siren}/${localStorage.annee}`, data)
  if(response.ok) localStorage.data = JSON.stringify(Object.assign(window.data, data))
  return response
}

function loadFormValues(form, data) {
  Object.keys(data).forEach((prop) => {
    const node = form.elements[prop]
    if(node) node.value = data[prop]
  })
}
