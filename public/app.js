document.querySelectorAll('.price').forEach(node => { // vyacheslavsergin
  node.textContent = new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(node.textContent)
})

const $card = document.querySelector('#card') // vyacheslavsergin
if ($card) {
  $card.addEventListener('click', event => {
    if (event.target.classList.contains('js-remove')) { // vyacheslavsergin
      const id = event.target.dataset.id
      console.log('id', id)

      fetch('/card/remove/' + id, {
        method: 'delete'
      }).then(res => res.json()) // vyacheslavsergin
        .then(card => {
          console.log(card)
        })
    }
  })
}
