---
layout: intro
title: "A propos de la transmission des indicateurs et du niveau de résultat"
---
<h1>{{ page.title }}</h1>

<p>Les informations recueillies sur ce formulaire répondent à l’obligation de transmission aux services du ministre chargé du travail des indicateurs et du niveau de résultat en matière d’écart de rémunération entre les femmes et les hommes prévue à l’article D.1142-5 du code du travail au 1er mars 2020.</p>

<p class=warning>Attention, si vous avez déjà fait votre déclaration sur le site Index Egapro, vous ne devez pas faire une nouvelle déclaration ici.</p>

<div>
  {% include input.html type="email" name="email" label="Adresse email de déclaration" required=true value="test@example.org" %}
</div>

<nav>
  <button rel=next>Recevoir le lien de déclaration</button>
</nav>

<script>
  const tokenParam = '?token='
  if(location.search.startsWith(tokenParam)) {
    localStorage.token = location.search.slice(tokenParam.length)
    redirect('/declaration')
  }

  document.getElementById('page-form').addEventListener('submit', async (event) => {
    event.preventDefault()
    const form = event.target
    const response = await request('post', '/token', {
      email: form.elements.email.value
    })
    if(response.ok) redirect('/validation-email')
  })
</script>
