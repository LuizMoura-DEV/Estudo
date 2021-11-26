/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Testes frontend',()=>{

    after(()=>{
        cy.clearLocalStorage()
    })

    beforeEach(()=>{
        buildEnv()
        cy.login('luiz@moura.com', '12345678')    
        cy.get(loc.MENU.HOME).click()
    })

    

    it('X - Teste responsividade', ()=>{
        cy.get('[data-test=menu-home]').should('exist').and('be.visible')
        cy.viewport(500,700)
        cy.get('[data-test=menu-home]').should('exist').and('be.not.visible')
        cy.viewport('iphone-5')
        cy.get('[data-test=menu-home]').should('exist').and('be.not.visible')
        cy.viewport('ipad-2')
        cy.get('[data-test=menu-home]').should('exist').and('be.visible')
    })

    it(`1 -Inserir conta`, ()=>{

        cy.intercept('POST', '/contas', {
            id: 3,
            nome: 'Conta de teste',
            visivel :true,
            usuario_id: 26343
        }).as('saveConta')

        cy.acessarMenuConta()
        

        cy.intercept('GET', '/contas',[{
            id: 1,
            nome:'Carteira',
            visivel: true,
            usuario_id: 1
        },{
            id: 2,
            nome:'Banco',
            visivel: true,
            usuario_id: 1
        },{
            id: 3,
            nome:'Conta de teste',
            visivel: true,
            usuario_id: 1
        }]
        ).as('contasSave')

        cy.inserirConta("Conta de teste")

        cy.get(loc.MENSAGEM).should('contain', 'Conta inserida com sucesso!')  
        cy.wait(1000)
        cy.xpath(`//td[contains(.,'Conta de teste')]`).should('exist')
    })  

    it('2 - Alterar conta...', ()=>{  

        cy.intercept('PUT', '/contas/**',{
            id: 1,
            nome:'Conta Alterada',
            visivel: true,
            usuario_id: 1
        }).as('insertConta')

        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        
        
        cy.intercept('GET', '/contas',[{
                id: 1,
                nome:'Conta Alterada',
                visivel: true,
                usuario_id: 1
            },{
                id: 2,
                nome:'Banco',
                visivel: true,
                usuario_id: 1
            }]
        ).as('contasAtt')  

        cy.inserirConta('Conta Alterada')
        cy.get(loc.MENSAGEM).should('contain', 'Conta atualizada com sucesso!')  
        cy.wait(1000) 

        cy.xpath(`//td[contains(.,'Conta Alterada')]`).should('exist')
    })

    it('3 - Verificar criação conta mesmo nome',()=>{
        cy.intercept('POST', '/contas', {
            statusCode: 400,
            error: 'Já existe uma conta com esse nome!'
        },).as('saveConta')

        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MENSAGEM).should('contain', 'Erro: Error: Request failed with status code 400')  
    })

    it('4 - Criando movimentação', ()=>{
        cy.intercept('POST' , '/transacoes',{
            id: 1,
            descricao: 'Energia',
            envolvido: 'Cemig',
            observacao:null,
            tipo: 'REC',data_transacao:"2021-11-25T03:00:00.000Z",data_pagamento:"2021-11-25T03:00:00.000Z",
            valor: '100.00',
            status:true,
            conta_id:948512,
            usuario_id:26343,
            transferencia_id:null,
            parcelamento_id:null
        })

        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Energia')
        cy.get(loc.MOVIMENTACAO.VALOR).type('100')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Cemig')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.PAGA).click()

        cy.intercept('GET', '/extrato/**', {fixture:'movimentacaoSalva'}
        )

        cy.get(loc.MOVIMENTACAO.BTN_MOV).click()

        cy.get(loc.MENSAGEM).should('contain', 'sucesso')

        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Energia','100')).should('exist')
    })

    it('5 - Pegar o saldo', ()=>{
        cy.intercept('GET', '/transacoes/**',
            {
                "conta":"Conta para saldo",
                "id":882375,
                "descricao":"Movimentacao 1, calculo saldo",
                "envolvido":"CCC",
                "observacao":null,
                "tipo":"REC",
                "data_transacao":"2021-11-25T03:00:00.000Z",
                "data_pagamento":"2021-11-25T03:00:00.000Z",
                "valor":"3500.00",
                "status":false,
                "conta_id":948612,
                "usuario_id":26343,
                "transferencia_id":null,
                "parcelamento_id":null
            }
        )

        
        cy.intercept('PUT', '/transacoes/**',
            {
                "conta":"Conta para saldo",
                "id":882375,
                "descricao":"Movimentacao 1, calculo saldo",
                "envolvido":"CCC",
                "observacao":null,
                "tipo":"REC",
                "data_transacao":"2021-11-25T03:00:00.000Z",
                "data_pagamento":"2021-11-25T03:00:00.000Z",
                "valor":"3500.00",
                "status":false,
                "conta_id":948612,
                "usuario_id":26343,
                "transferencia_id":null,
                "parcelamento_id":null
            }
        )

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click();
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.PAGA).click()

        cy.intercept('GET', '/saldo', [
            {conta_id :999,
            conta:'Carteira',
            saldo:'4034.00'} ,
            {conta_id :1000,
            conta:'Banco',
            saldo:'1000000.00'}
        ]).as('saldoFinal')

        cy.get(loc.MOVIMENTACAO.BTN_MOV).click()
        cy.wait(1000)

        cy.get(loc.MENSAGEM).should('contain', 'sucesso')
        
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
    })

    it('6 - Remover movimentação', ()=>{
        cy.intercept('DELETE', '/transacoes/**', {statusCode: 204,}).as('delete')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click();
        cy.get(loc.MENSAGEM).should('contain', 'sucesso')
    })

    it(`7 -Validar rota de inserir conta`, ()=>{
        cy.intercept('POST', '/contas', {
            id: 3,
            nome: 'Conta de teste',
            visivel :true,
            usuario_id: 26343,
        }).as('saveConta')

        cy.acessarMenuConta()
        

        cy.intercept('GET', '/contas',[{
            id: 1,
            nome:'Carteira',
            visivel: true,
            usuario_id: 1
        },{
            id: 2,
            nome:'Banco',
            visivel: true,
            usuario_id: 1
        },{
            id: 3,
            nome:'Conta de teste',
            visivel: true,
            usuario_id: 1
        }]
        ).as('contasSave')
        
        cy.inserirConta('Conta de teste')
        cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')

        cy.get(loc.MENSAGEM).should('contain', 'Conta inserida com sucesso!')  
        cy.wait(1000)
        cy.xpath(`//td[contains(.,'Conta de teste')]`).should('exist')
    })

    it('8 - Teste cores tela extrato', ()=>{

        cy.intercept('GET', '/extrato/**',
        [{
            conta:'Conta para movimentacoes',   //Conta 1 
            id:882373,
            descricao: 'Receita paga',
            envolvido: 'AAA',
            observacao: null,
            tipo: 'REC',
            data_transacao: '2021-11-25T03:00:00.000Z',
            data_pagamento: '2021-11-25T03:00:00.000Z',
            valor: '-1500.00',
            status: true,
            conta_id: 948610,
            usuario_id: 26343,
            transferencia_id: null,
            parcelamento_id: null
            },{
            conta: 'Conta com movimentacao',    //Conta 2
            id: 882374,
            descricao: 'Receita pendente',
            envolvido: 'BBB',
            observacao: null,
            tipo: 'REC',
            data_transacao: '2021-11-25T03:00:00.000Z',
            data_pagamento: '2021-11-25T03:00:00.000Z',
            valor: '-1500.00',
            status: false,
            conta_id: 948611,
            usuario_id: 26343,
            transferencia_id: null,
            parcelamento_id: null
            },{
            conta: 'Conta para saldo',          //Conta 3
            id: 882375,
            descricao: 'Despesa paga',
            envolvido: 'CCC',
            observacao: null,
            tipo: 'DESP',
            data_transacao: '2021-11-25T03:00:00.000Z',
            data_pagamento: '2021-11-25T03:00:00.000Z',
            valor: '3500.00',
            status: true,
            conta_id: 948612,
            usuario_id: 26343,
            transferencia_id: null,
            parcelamento_id: null
            },{
            conta: 'Conta para saldo',          //Conta 4
            id: 882376,
            descricao: 'Despesa pendente',
            envolvido: 'DDD',
            observacao: null,
            tipo: 'DESP',
            data_transacao: '2021-11-25T03:00:00.000Z',
            data_pagamento: '2021-11-25T03:00:00.000Z',
            valor: '-1000.00',
            status: false,
            conta_id: 948612,
            usuario_id: 26343,
            transferencia_id: null,
            parcelamento_id: null
        }]
        )
        
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')

    })
})