const main = document.querySelector('main')
const progress = document.querySelector('progress')
const previousButton = document.querySelector('a[previous]')
const nextButton = document.querySelector('a[next]')
const template404 = document.querySelector('template[name="404"]')

const steps = [
  '', 'declarant', 'annee'
]

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
  previousButton.onclick = function() {page.redirect(`/${steps[step - 1]}`)}
  nextButton.onclick = function() {page.redirect(`/${steps[step + 1]}`)}
  step <= 0 ? previousButton.setAttribute('disabled', 'disabled') : previousButton.removeAttribute('disabled')
}

function loadTemplate(name) {
  const template = document.querySelector(`[name=${name}]`)
  try {
    main.innerHTML = template.innerHTML
  }
  catch {
    main.innerHTML = template404.innerHTML
  }
}
