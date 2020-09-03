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
    } else if (data.calcul = "csp") {
      return 'remunerationCsp'
    } else {
      return 'augmentation'
    }
  }},
  {name: 'augmentation'}
]

const pageName = location.pathname.slice(1)
const step = steps.findIndex(step => step.name.startsWith( pageName))

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

  redirect(`/${steps[step + 1].name}`)
})

// "Previous" button
if (step > 0) {
  previousButton.href = `/${steps[step - 1].name}`
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
  var data = {};
  formData.forEach(function(value, key){
      data[key] = value;
  });
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
