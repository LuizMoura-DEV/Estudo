const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        SENHA: '[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },

    MENU: {
        HOME: '[data-test=menu-home]',
        CONFIG: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },

    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: nome => `//td[contains(.,'${nome}')]//..//i[@class='far fa-edit']`
    },

    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        PAGA: '[data-test=status]',
        BTN_MOV: '.btn-primary'
    },

    EXTRATO: {
        FN_XP_BUSCA_ELEMENTO: (desc, valor) => `//span[contains(.,'${desc}')]/following-sibling::small[contains(.,'${valor}')]`,
        FN_XP_ALTERAR_ELEMENTO: conta => `//span[contains(.,'${conta}')]/../../..//i[@class='fas fa-edit']`,
        FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(.,'${conta}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_LINHA: desc => `//span[contains(.,'${desc}')]/../../../..`
    },

    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(.,'${nome}')]/../td[2]`
    },

    MENSAGEM: '.toast-message'

}

export default locators