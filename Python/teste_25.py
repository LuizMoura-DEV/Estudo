teste = list()
teste.append('Luiz')
teste.append(28)
galera =list()
galera.append(teste[:])
teste[0] = 'Elane'
teste[1] = 26
galera.append(teste[:])

print(galera)
