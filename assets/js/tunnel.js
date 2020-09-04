const form = document.querySelector('#page-form')
const progress = document.querySelector('progress')
const previousButton = document.querySelector('a[previous]')
const nextButton = document.querySelector('button[next]')
const steps = [
   {name: 'declaration'},
   {name: 'declarant'},
   {name: 'annee'},
   {name: 'entreprise'},
   {name: 'remuneration', nextStep: data => {
    if (data.calcul === "coef") {
      return 'remunerationCoef'
    } else if (data.calcul === "autre") {
      return 'remunerationAutre'
    } else if (data.calcul === "csp") {
      return 'remunerationCsp'
    } else {
      return 'augmentation'
    }
  }},
  {name: 'remunerationCoef', nextStep: _ => 'remunerationFinal'},
  {name: 'remunerationAutre', nextStep: _ => 'remunerationFinal'},
  {name: 'remunerationCsp', nextStep: _ => 'remunerationFinal'},
  {name: 'remunerationFinal'},
  {name: 'augmentation'},
  {name: 'maternite'},
  {name: 'hautesremunerations'},
  {name: 'note'},
  {name: 'resultat'}
]

const pageName = location.pathname.slice(1)
const step = steps.findIndex(step => step.name === pageName)

window.data = JSON.parse(localStorage.data || '{}')

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

  const nextStep = steps[step].nextStep
  if (nextStep) {
    return redirect(`/${nextStep(data)}`)
  }
  return redirect(`/${steps[step + 1].name}`)
})

// "Previous" button
if (step > 0) {
  previousButton.onclick = (e) => {
    e.preventDefault()
    history.back()
  }
}
else {
  previousButton.setAttribute('disabled', 'disabled')
}

// "Next" button
if(step >= steps.length - 1) {
  nextButton.setAttribute('disabled', 'disabled')
}

function formToData(form) {
  const formData = new FormData(form)
  var data = {}
  formData.forEach((value, key) => {
      data[key] = value
  })
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
