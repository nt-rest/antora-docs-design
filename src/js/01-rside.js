;(function () {
  'use strict'

  function createElementAnchor (target) {
    var anchorElement = document.createElement('a')

    anchorElement.href = 'javascript:void(0);'
    anchorElement.innerText = target.innerText
    anchorElement.addEventListener(
      'click',
      function (e) {
        if (e) {
          e.preventDefault()
        }

        window.scrollTo(0, Math.max(0, target.offsetTop - 2 * target.offsetHeight))
      })

    return anchorElement
  }

  var mainElement = document.querySelector('main')

  if (!mainElement) return

  var asideRsideElement = document.querySelector('aside.rside')

  if (!asideRsideElement) return

  var tocElement = asideRsideElement.querySelector('nav')
  var levels = parseInt(tocElement.dataset.levels || 2)

  if (levels < 0) return

  var headerLevels = {
    H2: 2,
    H3: 3,
    H4: 4,
    H5: 5,
    H6: 6,
  }
  var headerSelectors =
    ':scope h2:not(.discrete),' +
    ':scope h3:not(.discrete),' +
    ':scope h4:not(.discrete),' +
    ':scope h5:not(.discrete),' +
    ':scope h6:not(.discrete)'
  var headerElements = mainElement.querySelectorAll(headerSelectors)
  var ulStack = [document.createElement('ul')]
  var currentLevel = 2
  var currentLiElement = null
  var liElements = []

  headerElements.forEach(function (headerElement, headerElementIndex) {
    var headerLevel = headerLevels[headerElement.tagName]
    var levelDifference = headerLevel - currentLevel
    var anchorElement = headerElement.querySelector('a')
    var ulElement = null
    var liElement = null
    var aElement = null
    var levelIndex = null

    if (anchorElement) {
      headerElement.removeChild(anchorElement)
    }

    if (levelDifference === 0) {
      liElement = document.createElement('li')
      aElement = createElementAnchor(headerElement)
      liElement.appendChild(aElement)
      ulStack[ulStack.length - 1].appendChild(liElement)
      currentLiElement = liElement
      liElements[headerElementIndex] = liElement
    } else if (levelDifference > 0) {
      for (levelIndex = currentLevel; levelIndex < headerLevel; ++levelIndex) {
        ulElement = document.createElement('ul')
        liElement = document.createElement('li')
        aElement = createElementAnchor(headerElement)
        liElement.appendChild(aElement)
        ulStack.push(ulElement)
        ulStack[ulStack.length - 1].appendChild(liElement)
        currentLiElement.appendChild(ulElement)
        currentLiElement = liElement
        liElements[headerElementIndex] = liElement
      }

      currentLevel = headerLevel
    } else if (levelDifference < 0) {
      for (levelIndex = headerLevel; levelIndex < currentLevel; ++levelIndex) {
        ulStack.pop()
      }

      currentLevel = headerLevel

      liElement = document.createElement('li')
      aElement = createElementAnchor(headerElement)
      liElement.appendChild(aElement)
      ulStack[ulStack.length - 1].appendChild(liElement)
      currentLiElement = liElement
      liElements[headerElementIndex] = liElement
    }
  })

  tocElement.appendChild(ulStack[0])

  if (liElements.length > 0) {
    liElements[0].classList.add('current')
  }

  window.addEventListener(
    'scroll',
    function (e) {
      for (var headerElementIndex = 0; headerElementIndex < headerElements.length; ++headerElementIndex) {
        var headerElement = headerElements[headerElementIndex]

        if (headerElement.offsetTop > document.documentElement.scrollTop) {
          liElements.forEach(
            function (liElement) {
              liElement.classList.remove('current')
            })

          liElements[headerElementIndex].classList.add('current')
          break
        }
      }
    })
})()
