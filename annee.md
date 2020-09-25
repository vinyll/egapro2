---
layout: tunnel
title: "Année et périmètre retenus pour le calcul et la publication des indicateurs"
---

<h1>{{ page.title }}</h1>

<fieldset>
  <div class=row>
    {% include input.html name="declaration.annee" label="Année au titre de laquelle vous transmettez vos indicateurs" readonly="true" disabled="true" %}
  </div>
</fieldset>

<fieldset>
  <div class=row>
    <h4>Vous êtes une</h4>
    <label><input type=radio name="entreprise.structure" value="entreprise"> Entreprise</label>
    <label><input type=radio name="entreprise.structure" value="ues"> Unité Économique et Sociale (UES)</label>
  </div>
</fieldset>

<fieldset>
  <div class=row>
    <h4>Tranches d'effectifs</h4>
    <label><input type=radio name="informations.effectifs" value="50"> De 50 à 100 inclus</label>
    <label><input type=radio name="informations.effectifs" value="250"> De 251 à 999 inclus</label>
    <label><input type=radio name="informations.effectifs" value="1000"> 1000 ou plus</label>
  </div>
</fieldset>

<h1>Période de référence considérée pour le calcul des indicateurs</h1>

<fieldset>
  <div class=row>
    <h4>Période de référence</h4>
    <label><input type=radio name="periode.type" value="civile"> Année civile</label>
    <label><input type=radio name="periode.type" value="autre"> Autre période de référence</label>
  </div>
</fieldset>

<fieldset class="periode-reference">
  <div class=row>
    {% include input.html type="date" label="Date de début de la période de référence" name="periode.debut" min="2019-01-01" max="2019-12-31" %}
  </div>
</fieldset>

<fieldset>
  <div class=row>
    {% include input.html type=number name="effectif.nombre" min=0 label="Nombre de salariés pris en compte pour le calcul des indicateurs sur la période de référence" %}
  </div>
</fieldset>

<script>
  document.onready = () => {
    const annee = selectField('declaration.annee')
    const date = new Date()
    annee.min = `${date.getFullYear() - 1}-01-01`
    annee.max = `${date.getFullYear() - 1}-12-31`
    annee.value = date.getFullYear() - 1
    Array.from(document.querySelectorAll('[name=periode]')).forEach(function(radio) {
      radio.addEventListener('change', function(event) {
        const value = event.target.value
        selectField('periode.type').disabled = value !== 'autre'
      })
    })
  }
</script>
