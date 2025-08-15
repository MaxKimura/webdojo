const { defineConfig } = require("cypress");

const {deleteByEmail} = require('./cypress/support/database')
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        deleteUser(email){
          deleteByEmail(email)
            return deleteByEmail(email)
        }
      })
    },
    watchForFileChanges: false,
    baseUrl: 'http://localhost:3333'
  },
});
