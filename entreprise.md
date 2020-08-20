---
layout: tunnel
title: "Vous êtes une entreprise"
---
<h1>{{ page.title }}</h1>

<fieldset>
  <div class=row>
    <div>{% include input.html name='nom' label='Raison Sociale' required=true %}</div>
  </div>
</fieldset>

<fieldset>
  <div class=row>
    <div>{% include select.html name='naf' label='Code NAF' required=true %}</div>
  </div>
</fieldset>

<script>
  document.onready = function() {
    const select = document.querySelector('#field--naf')
    const options = [{ value: '1', label: 'Yes' }]
    buildSelectOptions(select, options)
  }
</script>
