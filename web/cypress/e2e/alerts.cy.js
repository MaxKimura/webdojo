describe('Validações de alertas em Javascript', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta', () => {
        cy.on('window:alert', (msgAlert) => {
            expect(msgAlert).to.equal('Olá QA, eu sou um Alert Box!')
        })
        
        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msgAlert) => {
            expect(msgAlert).to.equal('Aperte um botão!')
            return true //simular clique no 'ok'
        })

        cy.on('window:alert', (msgAlert) => {
            expect(msgAlert).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve confirmar um diálogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msgAlert) => {
            expect(msgAlert).to.equal('Aperte um botão!')
            return false //simular clique no 'ok'
        })

        cy.on('window:alert', (msgAlert) => {
            expect(msgAlert).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve interagir com o prompt e inserir um texto e validar a msg', () => {
        let name = 'Maxwell'
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns(name) //simula um promptbox
        })

        cy.on('window:alert', (msgAlert) => {
            expect(msgAlert).to.equal(`Olá ${name}! Boas-vindas ao WebDojo!`)
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })
})