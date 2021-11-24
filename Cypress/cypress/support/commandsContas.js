import loc from './locators'

Cypress.Commands.add('acessarMenuConta', (locator, message)=>{
    cy.get(loc.MENU.CONFIG).click()
    cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirConta', conta =>{
    cy.get(loc.CONTAS.NOME).clear().type(conta)        
    cy.get(loc.CONTAS.BTN_SALVAR).click()  
})