const form = document.querySelector('#page-form')
const progress = document.querySelector('progress')
const previousButton = document.querySelector('a[previous]')
const nextButton = document.querySelector('button[next]')
const steps = [
  'declaration', 'declarant', 'annee'
]
const step = steps.indexOf(name)
let stepIndex = steps.findIndex(s => s === location.pathname.slice(1))

progress.max = steps.length - 1
progress.value = step

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  if(typeof validateForm === 'function') {
    if (!(await validateForm(event.target))) return
  }
  redirect(`/${steps[stepIndex + 1]}`)
})

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
