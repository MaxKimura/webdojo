import { getTodayFormatteDate } from "../support/utils"

describe('Login', () => {

  it('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.getCookie('login_date').should('exist')

    cy.getCookie('login_date').should((cookie)=> {
      expect(cookie.value).to.eq(getTodayFormatteDate())
    })

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[a-fA-F0-9]{32}$/)
    })

  })

  it('Não deve logar com senha inválida', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', '123')

    cy.get('[data-title]')
      .should('be.visible')
      .and('have.text', 'Acesso negado! Tente novamente.')
  })

  it('Não deve logar com email não cadastrado', () => {
    cy.start()
    cy.submitLoginForm('papito11111@webdojo.com', 'katana123')

    cy.get('[data-title]')
      .should('be.visible')
      .and('have.text', 'Acesso negado! Tente novamente.')
  })



})