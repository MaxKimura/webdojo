describe('iFrame', () => {
  it('deve dar play no video iFrame', () => {
    cy.login()

    cy.contains('Video').click()
    
    cy.wait(3000)

    cy.get('iframe[title="Video Player"]')
      .should('exist')
      .its('0.contentDocument.body') //Acessa o corpo do documento dentro do iframe na primeira posição
      .then(cy.wrap) //Converte em objeto Cypress para interagir com comandos do cypress
      .as('iFramePlayer')

    cy.get('@iFramePlayer')
      .find('.play-button')
      .click()

    cy.get('@iFramePlayer')
      .find('.pause-button')
      .should('be.visible')
  })

})