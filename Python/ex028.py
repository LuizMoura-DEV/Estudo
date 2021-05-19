salario = float(input('Digite o valor do salario do funcionario: '))
print('Seu aumento foi de R${:.2f}'.format(salario+(salario*0.10) if salario >= 1250 else salario+(salario * 0.15)))
