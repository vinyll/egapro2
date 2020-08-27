const form = document.querySelector('#page-form')
const progress = document.querySelector('progress')
const previousButton = document.querySelector('a[previous]')
const nextButton = document.querySelector('button[next]')
const steps = [
  'declaration', 'declarant', 'annee', 'entreprise', 'remuneration'
]
const pageName = location.pathname.slice(1)
const step = steps.indexOf(pageName)

progress.max = steps.length - 1
progress.value = step

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  if(typeof document.onsubmit === 'function') {
    if (!(await document.onsubmit(event.target))) return
  }
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
