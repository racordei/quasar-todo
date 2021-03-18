export const selectAll = {
  bind(el) {
    let input = el.querySelector('.q-field__native')
    input.addEventListener('focus', function() {
      if (input.value.length) {
        input.select()
      }
    })
  }
}