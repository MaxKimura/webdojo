describe('Kanban Board', () => {
  it('deve mover uma tareda todo para done', () => {
    cy.login()
    cy.contains('Kanban').click()

    const dataTransfer = new DataTransfer()

    cy.contains('div[draggable=true]', 'Documentar API')
      .trigger('dragstart', {dataTransfer}) // Dispara o evento (trigger) de início do arrasto (dragstart)
    
    cy.get('.column-done')
      .trigger('drop', {dataTransfer}) // Dispara o evento de soltar (drop) na área destino
      .find('h3')
      .should('have.text', 'Done (4)')

    cy.get('.column-done')
      .should('include.text', 'Documentar API')
      .and('include.text', 'Criar documentação da API com Swagger')
  })

})