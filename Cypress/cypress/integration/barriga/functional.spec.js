/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Testes funcionais',()=>{

    before(function(){
        cy.visit('https://barrigareact.wcaquino.me')
        cy.fixture('barrigaData').as('user').then(()=>{
            cy.login(this.user.email, this.user.senha, this.user.nome)     
        })
        cy.resetApp()
    })

    beforeEach(()=>{
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })

    const contas = ['Conta de Teste 1','Conta de Teste 2','Conta de Teste 3']
    describe('1 Inserindo dados...', ()=>{
        contas.forEach(conta=>{
            it(`Inserir ${conta}`, ()=>{
                cy.acessarMenuConta()
                cy.inserirConta(conta)
                cy.get(loc.MENSAGEM).should('contain', 'Conta inserida com sucesso!')  
                cy.wait(1000)
                cy.xpath(`//td[contains(.,'${conta}')]`).should('exist')
            })        
        })
    })

    describe('2 Manipulações', ()=>{
        it('2 - Alterar conta...', ()=>{      
            cy.acessarMenuConta()
            cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
            cy.inserirConta('Conta 1')          
            cy.get(loc.MENSAGEM).should('contain', 'Conta atualizada com sucesso!')  
            cy.wait(1000)
            cy.xpath(`//td[contains(.,'Conta 1')]`).should('exist')
        })

        it('Verificar criação conta mesmo nome',()=>{
            cy.acessarMenuConta()
            cy.inserirConta('Conta mesmo nome')
            cy.get(loc.MENSAGEM).should('contain', 'Erro: Error: Request failed with status code 400')  
        })

        it('Criando movimentação', ()=>{
            cy.get(loc.MENU.MOVIMENTACAO).click()

            cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Energia')
            cy.get(loc.MOVIMENTACAO.VALOR).type('100')
            cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Cemig')
            cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
            cy.get(loc.MOVIMENTACAO.PAGA).click()
            cy.get(loc.MOVIMENTACAO.BTN_MOV).click()

            cy.get(loc.MENSAGEM).should('contain', 'sucesso')
            cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Energia','100')).should('exist')
        })

        it('Pegar o saldo', ()=>{
            cy.get(loc.MENU.HOME).click()
            cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

            cy.get(loc.MENU.EXTRATO).click()
            cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click();
            cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
            cy.get(loc.MOVIMENTACAO.PAGA).click()
            cy.get(loc.MOVIMENTACAO.BTN_MOV).click()
            cy.wait(1000)

            cy.get(loc.MENSAGEM).should('contain', 'sucesso')
            
            cy.get(loc.MENU.HOME).click()
            cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
        })

        it('Remover movimentação', ()=>{
            cy.get(loc.MENU.EXTRATO).click()
            cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click();
            cy.get(loc.MENSAGEM).should('contain', 'sucesso')
        })
    })
})