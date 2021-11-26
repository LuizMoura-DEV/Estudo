const buildEnv = ()=>{

    cy.intercept({
        method: 'POST',
        path: '/signin'
    },{
        id:1111,
        nome:'iaiafhds',
        token:'qualquer coisa'
    }).as('login')

    cy.intercept('GET', '/saldo', [
        {conta_id :999,
        conta:'Carteira',
        saldo:'100.00'} ,
        {conta_id :1000,
        conta:'Banco',
        saldo:'1000000.00'}
    ]).as('saldo')

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
        }]
    ).as('contas')

    cy.intercept('GET', '/extrato/**',
    [{
        conta:'Conta para movimentacoes',
        id:882373,
        descricao: 'Movimentacao para exclusao',
        envolvido: 'AAA',
        observacao: null,
        tipo: 'DESP',
        data_transacao: '2021-11-25T03:00:00.000Z',
        data_pagamento: '2021-11-25T03:00:00.000Z',
        valor: '-1500.00',
        status: true,
        conta_id: 948610,
        usuario_id: 26343,
        transferencia_id: null,
        parcelamento_id: null
        },{
        conta: 'Conta com movimentacao',
        id: 882374,
        descricao: 'Movimentacao de conta',
        envolvido: 'BBB',
        observacao: null,
        tipo: 'DESP',
        data_transacao: '2021-11-25T03:00:00.000Z',
        data_pagamento: '2021-11-25T03:00:00.000Z',
        valor: '-1500.00',
        status: true,
        conta_id: 948611,
        usuario_id: 26343,
        transferencia_id: null,
        parcelamento_id: null
        },{
        conta: 'Conta para saldo',
        id: 882375,
        descricao: 'Movimentacao 1, calculo saldo',
        envolvido: 'CCC',
        observacao: null,
        tipo: 'REC',
        data_transacao: '2021-11-25T03:00:00.000Z',
        data_pagamento: '2021-11-25T03:00:00.000Z',
        valor: '3500.00',
        status: false,
        conta_id: 948612,
        usuario_id: 26343,
        transferencia_id: null,
        parcelamento_id: null
        },{
        conta: 'Conta para saldo',
        id: 882376,
        descricao: 'Movimentacao 2, calculo saldo',
        envolvido: 'DDD',
        observacao: null,
        tipo: 'DESP',
        data_transacao: '2021-11-25T03:00:00.000Z',
        data_pagamento: '2021-11-25T03:00:00.000Z',
        valor: '-1000.00',
        status: true,
        conta_id: 948612,
        usuario_id: 26343,
        transferencia_id: null,
        parcelamento_id: null
        },{
        conta: 'Conta para saldo',
        id: 882377,
        descricao: 'Movimentacao 3, calculo saldo',
        envolvido: 'EEE',
        observacao: null,
        tipo: 'REC',
        data_transacao: '2021-11-25T03:00:00.000Z',
        data_pagamento: '2021-11-25T03:00:00.000Z',
        valor: '1534.00',
        status: true,
        conta_id: 948612,
        usuario_id: 26343,
        transferencia_id: null,
        parcelamento_id: null
        },{
        conta: 'Conta para extrato',
        id: 882378,
        descricao: 'Movimentacao para extrato',
        envolvido: 'FFF',
        observacao: null,
        tipo: 'DESP',
        data_transacao: '2021-11-25T03:00:00.000Z',
        data_pagamento: '2021-11-25T03:00:00.000Z',
        valor: '-220.00',
        status: true,
        conta_id: 948613,
        usuario_id: 26343,
        transferencia_id: null,
        parcelamento_id: null
    }]
    )

}

export default buildEnv