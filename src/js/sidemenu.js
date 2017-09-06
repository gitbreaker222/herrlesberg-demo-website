app.toggleMenu = function () {
  var element = document.querySelector('aside.menu')
  if (!element.classList.contains('open')) {
    element.classList.add('open')
  } else {
    element.classList.remove('open')
  }
}
