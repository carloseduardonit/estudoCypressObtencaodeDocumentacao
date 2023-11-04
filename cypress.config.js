/*const { defineConfig } = require('cypress')*/

module.exports = /*defineConfig(*/{
  e2e: {

    setupNodeEvents(on, config) {
      // implement node event listeners 
    

      /*video: true,
      experimentalOriginDependencies = */
    },
    baseUrl: 'https://dhs000001xj0cmau-dev-ed.develop.lightning.force.com',
    chromeWebSecurity: false,
    video: true,
    experimentalOriginDependencies: true,
    specPattern: 'cypress/e2e/**/*.cy.js'
  },
};/*)*/