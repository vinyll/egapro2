---
layout: tunnel
title: "Niveau de résultat global"
---

<h1>{{ page.title }}</h1>

<fieldset>
  <div class=row>{% include input.html type="number" name="note-total-points-obtenus" label="Total des points obtenus" min=0 max=100 %}</div>
</fieldset>

<fieldset>
  <div class=row>{% include input.html type="number" name="note-nombre-points-maximum" label="Nombre de points maximum pouvant être obtenus" min=0 max=100 %}</div>
</fieldset>

<fieldset class=note>
  <div class=row>{% include input.html type="number" name="note-resultat-final" label="Résultat final sur 100 points" min=0 max=100 %}</div>
</fieldset>

<fieldset>
  <div class=row>{% include select.html name="note-mesures-correction" empty="true" label="Mesures de correction prévues à l'article D. 1142-6" %}</div>
</fieldset>

<script>
  document.onready = () => {
    const mesuresCorrectionOptions = [
      { value: 'mises-en-oeuvre', label: "Mesures mises en oeuvre"},
      { value: 'envisagees', label: "Mesures envisagées"},
      { value: 'non-envisagees', label: "Mesures non envisagées"},
    ]
    buildSelectOptions(selectField('note-mesures-correction'), mesuresCorrectionOptions)
  }
</script>
