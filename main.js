const main = document.querySelector('main')
const progress = document.querySelector('progress')
const previousButton = document.querySelector('a[previous]')
const nextButton = document.querySelector('button[next]')
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

  // "Previous" button
  if (step > 0) {
    previousButton.onclick = function() {page.redirect(`/${steps[step - 1]}`)}
    previousButton.removeAttribute('disabled')
  } else {
    previousButton.setAttribute('disabled', 'disabled')
  }
  // "Next" button
  if(step < steps.length - 1) {
    document.forms[0].onsubmit = function(event) {
      event.preventDefault()
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
  try {
    main.innerHTML = template.innerHTML
  }
  catch {
    main.innerHTML = template404.innerHTML
  }
  setPageTitle(main.querySelector('h1').innerHTML)
  const script = main.querySelector('script')
  if(script) eval(script.innerText)
}

function setPageTitle(title) {
  document.title = `Egapro – ${title}`
}
