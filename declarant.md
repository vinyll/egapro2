---
layout: tunnel
title: "Identification du déclarant pour tout contact ultérieur"
---
<h1>{{ page.title }}</h1>

<fieldset>
  <!-- fieldset display flex can't work in Chromium -->
  <div class=row>
    <div>{% include input.html name='nom' label='Nom' required=true %}</div>
    <div>{% include input.html name='prenom' label='Prénom' required=true %}</div>
  </div>
</fieldset>

<fieldset>
  {% include input.html name='tel' label='Téléphone professionel (10 chiffres)' %}
</fieldset>

<fieldset>
  <p>Adresse de l'entreprise déclarante ou siège de l'UES</p>
  <div class=row>
    <div>{% include select.html name='region' label='Région' %}</div>
    <div>{% include select.html name='departement' label='Département' %}</div>
  </div>

  <div class=row>
    {% include input.html name='adresse' label='Adresse' %}
  </div>

  <div class=row>
    {% include input.html name='code-postal' label='Code postal (5 car.)' regex='\d[\dab]\d{3}' %}
    {% include input.html name='commune' label='Commune' %}
  </div>
</fieldset>
