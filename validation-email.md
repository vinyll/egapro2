---
layout: default
title: "Validation de l'adresse de messagerie"
---
<h1>{{ page.title }}</h1>

<p>Vous allez recevoir un mail à l'adresse que vous avez indiquée à l'étape précédente.</p>

<p>Ouvrez ce mail et cliquez sur le lien de validation afin de poursuivre votre inscription</p>

<p>Si vous ne recevez pas ce mail sous peu, il se peut que l'adresse de messagerie saisie soit incorrecte, ou bien que le mail ait été déplacé dans votre dossier de courriers indésirables ou dans le dossier SPAM.</p>

<p>En cas d'échec, la procédure devra être reprise avec une autre adresse de messagerie.</p>

<script>
  document.querySelector('button[next]').disabled = !localStorage.token
  window.validateForm = async function(form) {
    if(localStorage.token) return true
  }
</script>
