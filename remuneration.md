---
layout: tunnel
title: "Ecart de rémunération entre les femmes et les hommes"
---
<h1>{{ page.title }}</h1>

<fieldset>
  <div class=row>
    <div>{% include radios.html name='calcul' label="Modalités de calcul de l'indicateur relatif à l'écart de rémunération entre les femmes et les hommes" required="true" block="true" %}</div>
  </div>
</fieldset>

<fieldset>
  <div class=row>
    {% include input.html type="date" name='cse' label='Date de consultation au CSE' required=true %}
  </div>
</fieldset>

<fieldset>
  <div class=row>{% include input.html type="number" name='niveaux' label='Nombre de coefficients ou niveaux pour les modalités de calcul' min=1 max=50 %}</div>
</fieldset>

<fieldset>
  <div class=row>{% include select.html name="motif" empty="true" label="Précision du motif de non calculabilité de l'indicateur" %}</div>
</fieldset>

<fieldset>
  <div class=row>{% include textarea.html name="motif" label="Préciser le motif" %}</div>
</fieldset>

<script>
  document.onready = () => {
    const motifOptions = [
      { value: '40', label: "Effectif des groupes valides inférieur à 40% de l'effectif total" },
      { value: 'autre', label: "Autre motif" }
    ]
    buildSelectOptions(document.querySelector('#field--motif'), motifOptions)
    const calculOptions = [
      {value: "coef", label: "Par niveau ou coefficient hiérarchique en application de la classification de branche"},
      {value: "autre", label: "Par niveau ou coefficient hiérarchique en application d'une autre méthode de cotation des postes"},
      {value: "csp", label: "Par catégorie socio-professionnelle"},
      {value: "nc", label: "L’indicateur n’est pas calculable"},
    ]
    buildRadioOptions(document.querySelector('#field--calcul'), calculOptions)
  }
</script>
