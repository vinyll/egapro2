---
layout: tunnel
title: "Identification du déclarant pour tout contact ultérieur"
---
<h1>{{ page.title }}</h1>

<fieldset>
  <!-- fieldset display flex can't work in Chromium -->
  <div class=row>
    <div>{% include input.html name="declarant.nom" label="Nom" required=true %}</div>
    <div>{% include input.html name="declarant.prenom" label="Prénom" required=true %}</div>
  </div>
</fieldset>

<fieldset>
  {% include input.html name="declarant.tel" label="Téléphone professionel (10 chiffres)" %}
</fieldset>

<fieldset>
  <p>Adresse de l'entreprise déclarante ou siège de l'UES</p>
  <div class=row>
    <div>{% include select.html name="entreprise.region" label="Région" dataset="regions" required=true %}</div>
    <div>{% include select.html name="entreprise.departement" label="Département" required=true %}</div>
  </div>

  <div class=row>
    {% include input.html name="entreprise.adresse" label="Adresse" required=true %}
  </div>

  <div class=row>
    {% include input.html name="entreprise.codePostal" label="Code postal (5 car.)" required=true regex="\d[\dab]\d{3}" %}
    {% include input.html name="entreprise.commune" label="Commune" required=true %}
  </div>
</fieldset>

<script>
  document.onready = function() {
    document.getElementById('field--entreprise.region').addEventListener('change', (event) => {
      const value = event.target.value
      console.debug(`region ${value} was selected.`)
    })

    document.getElementById('field--entreprise.departement').innerHTML = `
      <option value=1>default</option>
    `
  }
</script>
