describe('GET /api/users', () => {
    const usersList = [
        {
            name: 'User One',
            email: 'userone@userone.com',
            password: 'pwd123'
        },
        {
            name: 'User Two',
            email: 'usertwo@usertwo.com',
            password: 'pwd123'
        },
        {
            name: 'User Three',
            email: 'userthree@userthree.com',
            password: 'pwd123'
        },
        {
            name: 'User Four',
            email: 'userfour@userfou.com',
            password: 'pwd123'
        },
        {
            name: 'User Five',
            email: 'userfive@userfive.com',
            password: 'pwd123'
        }
    ]

    before(() => {
        usersList.forEach((hero) => {
            cy.postUser(hero)  //cadastra usuarios via api
        })
    })

    it('Deve retornar uma lista de usuarios', () => {
        cy.getUsers().then(response => {
            expect(response.status).to.eq(200)

            usersList.forEach((listUser) => { //percorre pela lista de usuarios
                const found = response.body.find((user) => user.email === listUser.email)  //quando email da resposta da api = email do usuario
                expect(found.name).to.eq(listUser.name) //compara se estão iguais
                expect(found.email).to.eq(listUser.email)
                expect(found).to.have.property('id') //verifica se tem a propriedade api
            })
        })
    })


})