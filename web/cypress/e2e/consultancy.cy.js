import {personal, inCompany} from '../fixtures/consultancy.json'

describe('Formulário de Consultaria', () => {

    beforeEach(()=> {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })
    
    it('Deve solicitar consultoria individual', () =>  {
        cy.fillConsultancyForm(personal)
        
        cy.submitConsultancyForm()
        
        cy.validateConsultancyModal()
            
    })

    it('Deve solicitar consultoria In company', () => {
        cy.fillConsultancyForm(inCompany)

        cy.submitConsultancyForm()
        
        cy.validateConsultancyModal()
            
    })

    it('Deve validar campos obrigatórios', () => {
        cy.submitConsultancyForm()

        const requireFields = [
            {name: 'Nome Completo *', message:'Campo obrigatório'},
            {name: 'Email *', message: 'Campo obrigatório'},
            {name: 'Li e aceito os', message: 'Você precisa aceitar os termos de uso'}
        ]

        requireFields.forEach(({name,message}) => {
            cy.contains('label', name)
                .parent()
                .find('p')
                .should('be.visible')
                .and('have.text', message)
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })

    })
})

