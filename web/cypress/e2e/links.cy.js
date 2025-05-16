describe('Links abrindo nova guia', () => {
  it('validando o atributo do link do instagram', () => {
    cy.login()

    cy.get('[data-cy="instagram-link"]')
      .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
      .and('have.attr', 'target', '_blank')
      
  })

  it('acessa link de termos d euso removendo o targwt blank', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.contains('Formulários').click()

    cy.contains('a', 'termos de uso')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h2', '1. Aceitação dos Termos')
      .should('be.visible')

      
  })

})