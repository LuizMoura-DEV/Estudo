print('-=-' * 20)
print('Analizador de Triangulos')
print('-=-' * 20)
a = int(input('Digite o primeiro segmento: '))
b = int(input('Digite o segundo segmento: '))
c = int(input('Digite o terceiro segmento: '))

if a < b + c and b < a + c and c < a + b:
    print('Os segmentos podem formar um Triangulo')
else:
    print('Os segmentos a cima nao podem formar triangulo!')
