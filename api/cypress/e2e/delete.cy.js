describe('DELETE /api/users/:id', () => {

    context('remoção de usuario', () => {
        let userId

        const user = {
            name: 'Bruce Banner',
            email: 'bruce@banner.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                userId = response.body.user.id
            })
        })

        it('Deve deletar um usuario', () => {
            cy.deleteUser(userId).then(response => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then(response => {
                const findDeleteUser = response.body.find(user => user.id === userId)
                expect(findDeleteUser).to.be.undefined
            })
        })
    })

    context('validacao ID inexistente', () => {
        let userId

        const user = {
            name: 'Tony Banner',
            email: 'tony@banner.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                userId = response.body.user.id
            })

            cy.task('deleteUser', user.email)
        })

        it('Deve retornar 404 - user not found', () => {
            cy.deleteUser(userId).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found.')
            })
        })

        
    })
})

    
