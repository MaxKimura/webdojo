import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Cadastro', () => {
    beforeEach(() => {
        cy.goToSignup()

        // cy.intercept('POST', 'http://localhost:3333/api/users/register', {
        //     statusCode: 201,
        //     body: {
        //         message: 'Conta criada com sucesso!'
        //     }
        // }).as('PostUser')
    })

    it('Deve cadastrar um novo usuário', () => {
        cy.get('#name').type('Maxwell Kimura')
        cy.get('#email').type('max@email.com')
        cy.get('#password').type('123456')

        cy.contains('button', 'Criar conta').click()

        //cy.wait('@PostUser')

        cy.contains('Conta criada com sucesso!').should('be.visible')
    })

    _.times(3, () => {
        it('Deve cadastrar um usuário três vezes', () => {
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'pwd123'

            cy.get('#name').type(name)
            cy.get('#email').type(email)
            cy.get('#password').type(password)

            cy.contains('button', 'Criar conta').click()

            cy.contains('Conta criada com sucesso!').should('be.visible')
        })
    })

})