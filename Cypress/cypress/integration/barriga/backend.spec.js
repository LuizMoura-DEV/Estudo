/// <reference types="cypress" />

describe('Testes restApi',()=>{

    before(() =>{
        cy.getToken('luiz@moura.com', '123456')
    })

    beforeEach(()=>{
        cy.resetRest()
    })

    const contas = ['Conta de Teste 1','Conta de Teste 2','Conta de Teste 3']
    
    it(`Inserir conta`, ()=>{

        cy.request({
            method: 'POST',
            url: '/contas',
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')
        
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.be.property(  'id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })

    })

    it('Alterar conta...', ()=>{  
        cy.getContaNome('Conta para alterar').then(contaID => {
            cy.request({
                url: `/contas/${contaID}`,
                method: 'PUT',
                body: {
                    nome: 'Conta alterada via rest'
                }
            }).as('response')

            cy.get('@response').its('status').should('be.equal', 200)                
        })

        
    })

    it('Verificar criação conta mesmo nome',()=>{
        cy.request({
            method: 'POST',
            url: '/contas',
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')
        
        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })

    })

    it('Criando movimentação', ()=>{
        cy.getContaNome('Conta para movimentacoes').then(contaID =>{
            cy.request({
                method: 'POST',
                url: '/transacoes',
                body: {
                    conta_id: contaID,
                    data_pagamento: '24/11/2021',
                    data_transacao: '24/11/2021',
                    descricao: 'desc',
                    envolvido: 'inter',
                    status: true,
                    tipo: 'REC',
                    valor: '123'
                }
            }).as('response') 
        })  
        cy.get('@response').its('status').should('be.equal', 201) 
        cy.get('@response').its('body').should('exist')      
    })

    it('Pegar o saldo', ()=>{
        cy.request({
            url: '/saldo',
            method: 'GET',
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo'){
                    saldoConta = c.saldo
                } 
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: { descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res =>{   
            let data = require('dayjs')    
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                body: {
                    status: true,
                    data_transacao: data(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: data(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)          
        }) 

        cy.request({
            url: '/saldo',
            method: 'GET',
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c =>{
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
            
    })

    it('Remover movimentação', ()=>{
        
        cy.request({
            method: 'GET',
            url: '/transacoes',
            qs: { descricao: 'Movimentacao para exclusao'}
        }).then(res=>{{
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
            }).its('status').should('be.equal', 204)
        }})

    })
})