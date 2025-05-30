const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    watchForFileChanges: false,
    viewportWidth: 1440,
    viewportHeight: 900,
    baseUrl: 'http://localhost:3000'
  },
});
