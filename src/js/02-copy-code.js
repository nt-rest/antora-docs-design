;(function () {
  'use strict'

  var codeElements = document.querySelectorAll('pre')

  codeElements.forEach(function (codeElement) {
    var buttonElement = document.createElement('button')

    buttonElement.classList.add('copy')
    buttonElement.innerHTML = '&#61637;'
    buttonElement.addEventListener(
      'click',
      function (e) {
        if (e) {
          e.preventDefault()
        }

        navigator.clipboard.writeText(codeElement.innerText)
      })

    codeElement.parentNode.appendChild(buttonElement)
  })
})()
