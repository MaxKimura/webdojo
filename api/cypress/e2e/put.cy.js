import { faker } from '@faker-js/faker'
describe('PUT /api/users/:id', () => {

    context('Atualização de usuario', () => {
        let userID

        const originalUser = {
            name: 'Peter Park',
            email: 'peter@park.com',
            password: '123456'
        }

        const updateUser = {
            name: 'Peter Update',
            email: 'peterUpade@park.com',
            password: '123456'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updateUser.email)
            cy.postUser(originalUser).then(response => {
                userID = response.body.user.id
            })
        })

        it('Deve atualizar um usuario existente', () => {
            cy.putUser(userID, updateUser).then(response => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then(response => {
                const update = response.body.find(user => user.id === userID)
                expect(update).to.exist
                expect(update.name).to.eq(updateUser.name)
                expect(update.email).to.eq(updateUser.email)
            })
        })
    })

    context('Campos obrigatórios', () => {
        it('Campo name deve ser obrigatorio', () => {

            const user = {
                email: faker.internet.email(),
                password: 'pwd123'
            }


            cy.postUser(user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eql('Name is required!')
            })

        })

        it('Campo email deve ser obrigatorio', () => {

            const user = {
                name: faker.person.fullName(),
                password: 'pwd123'
            }


            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eql('Email is required!')
            })

        })

        it('Campo senha deve ser obrigatorio', () => {

            const user = {
                name: faker.person.fullName(),
                email: faker.internet.email()
            }


            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eql('Password is required!')
            })

        })

        it('Validar json mal formatado', () => {

            const user = `{
            name: faker.person.fullName(),
            email: faker.internet.email(),
            "password": 'pwd123'
            }`


            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eql('Invalid JSON format')
            })

        })
    })

    context('validacao ID inexistente', () => {
        let userId

        const originalUser = {
            name: 'Peter Valid ID',
            email: 'peterValid1@park.com',
            password: '123456'
        }

        const updateUser = {
            name: 'Peter Valid ID 2',
            email: 'peterValid2@park.com',
            password: '123456'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updateUser.email)

            cy.postUser(originalUser).then(response => {
                userId = response.body.user.id
            })

            cy.task('deleteUser', originalUser.email)
        })

        it('Deve retornar 404 - user not found', () => {
            cy.api({
                method: 'PUT',
                url: `http://localhost:3333/api/users/${userId}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: updateUser,
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found.')
            })
        })

        
    })
})
