;(function () {
  'use strict'

  window.onload = function () {
    class OperationsLayout extends React.Component {
      render () {
        const {
          getComponent,
        } = this.props
        const Operations = getComponent('operations', true)

        return React.createElement('div', null, React.createElement(Operations, null))
      }
    }

    const OperationsLayoutPlugin = () => {
      return {
        components: {
          OperationsLayout: OperationsLayout,
        },
      }
    }

    var swaggerElements = document.querySelectorAll('div.swagger-ui')

    swaggerElements.forEach(function (swaggerElement) {
      SwaggerUIBundle({
        url: swaggerElement.dataset.url,
        domNode: swaggerElement,
        plugins: [
          OperationsLayoutPlugin,
        ],
        layout: 'OperationsLayout',
        displayOperationId: true,
        displayRequestDuration: true,
        filter: swaggerElement.dataset.filter || false,
      })
    })
  }
})()
