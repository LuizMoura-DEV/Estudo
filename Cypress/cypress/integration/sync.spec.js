/// <reference types="cypress" />

describe('Esperas...', ()=>{
    beforeEach(()=>{
        cy.visit('https://www.wcaquino.me/cypress/componentes.html') 
    })
    
    beforeEach(()=>{
        cy.reload() 
    })

    it('Deve aguardar elemento estar disponivel', ()=>{
        cy.get('#novoCampo')
            .should('not.exist')        
        cy.get('#buttonDelay')
            .click()
        cy.get('#novoCampo')
            .should('not.exist')
        cy.get('#novoCampo')
            .should('exist')  
        cy.get('#novoCampo')
            .type('Funciona')
    })

    it('Deve fazer retrys', ()=>{   
        cy.get('#novoCampo')
            .should('not.exist')   
        cy.get('#buttonDelay')
            .click()
        cy.get('#novoCampo')
            .should('not.exist')
        cy.get('#novoCampo')
            .should('exist')
            .type('Funciona')
    })

    it('Uso do find', ()=>{
        cy.get('#buttonList')
            .click()

        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
            
        /* cy.get('span')
            .should('contain', 'Item 2') */

        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('Uso do find 2', ()=>{
        cy.get('#buttonListDOM')
            .click()

        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
            
            
        /* cy.get('span')
            .should('contain', 'Item 2') */

        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('Uso do timeout', ()=>{
    /*  cy.get('#buttonDelay')
            .click()

        cy.get('#novoCampo', {timeout:1000})
            .should('exist') */
    
        //cy.get('#buttonListDOM')
        //    .click()
        //cy.wait(5000)
        //cy.get('#lista li span', {timeout: 30000})
        //    .should('contain', 'Item 2')

        cy.get('#buttonListDOM')
            .click()

        cy.get('#lista li span',)
            .should('have.length', 1)
        
        cy.get('#lista li span',)    
            .should('have.length', 2)
    })

    it('ClickRetry', ()=>{
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', '111')
    })

    it.only('Should vs then', ()=>{
        cy.get('#buttonListDOM').should($el =>{
            //console.log($el)
            expect($el).to.have.length(1)
            //cy.get('#buttonList')
        })
    })
})