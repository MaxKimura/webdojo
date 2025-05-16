//precisa utilizar a biblioteca 'cypress-real-events'

describe('cenario de mouse hover', () => {
  it('fazer mouse hover ao passar mouse no instagram', () => {
    cy.login()

    cy.contains('Isso é Mouseover!').should('not.exist')
    cy.get('[data-cy="instagram-link"]').realHover()
    cy.contains('Isso é Mouseover!').should('exist')
      
  })

})