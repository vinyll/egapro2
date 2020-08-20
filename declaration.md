---
layout: tunnel
title: "Commencer la déclaration"
---
<h1>{{ page.title }}</h1>
  <div>
    {% include select.html name='annee' label='Année de déclaration' required=true %}
  </div>
  <div>
    {% include input.html type='regex' name='siren' label='Numéro SIREN' required="true" pattern='[0-9]{9}' placeholder='9 chiffres' value='123456789' %}
  </div>

<script>
  window.addEventListener('DOMContentLoaded', () => {
    const year = (new Date()).getFullYear()
    buildSelectOptions(
      document.querySelector('[name=annee]'),
      [{ value: year-1, label: year-1 }, { value: year, label: year }],
      null
    )

    document.querySelector('button[next]').disabled = !localStorage.token
    window.validateForm = async function(form) {
      if(localStorage.token) return true
    }
  })
</script>
