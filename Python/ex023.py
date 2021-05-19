velocidade = float(input('Digite sua velocidade: '))
if velocidade <= 80:
    print('Tenha um bom dia! Dirija com segurança!')
else:
    print('MULTADO! Voce ultrapassou o limite de 80km/h')
    multa = (velocidade-80)*7
    print('O valor da multa é R${:.2f}'.format(multa))
