import {faker} from '@faker-js/faker'

describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuario', () => {

    const user = {
      name: 'Novo User',
      email: 'novouser@novouser.com',
      password: 'pwd123'
    }
    
    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) =>{
      expect(response.status).to.eq(201)
      expect(response.body.user.id).to.match(/^[-]?\d+$/)
      expect(response.body.message).to.eql('Usuário cadastrado com sucesso!')
      expect(response.body.user.name).to.eql(user.name)
      expect(response.body.user.email).to.eql(user.email)
    })

  })

  it('Não deve cadastrar com email duplicado', () => {

    const user = {
      name: 'User Duplicado',
      email: 'userduplicado@userduplicado.com',
      password: 'pwd123'
    }
    
    cy.task('deleteUser', user.email)
    
    
    cy.postUser(user).then((response) =>{
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) =>{
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Email já está em uso!')
    })

  })

  it('Campo name deve ser obrigatorio', () => {

    const user = {
      email: faker.internet.email(),
      password: 'pwd123'
    }
    
    
    cy.postUser(user).then((response) =>{
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eql('Name is required!')
    })

  })

  it('Campo email deve ser obrigatorio', () => {

    const user = {
      name: faker.person.fullName(),
      password: 'pwd123'
    }
    
    
    cy.postUser(user).then((response) =>{
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eql('Email is required!')
    })

  })

  it('Campo senha deve ser obrigatorio', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email()
    }
    
    
    cy.postUser(user).then((response) =>{
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
    
    
    cy.postUser(user).then((response) =>{
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eql('Invalid JSON format')
    })

  })
})

