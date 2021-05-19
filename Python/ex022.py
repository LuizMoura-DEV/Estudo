from random import randint
from time import sleep
computador = randint(0, 5)
# print('Pensei no numero {}'.format(computador))
print('-=-' * 20)
print('Vou pensar em um número entre 0 e 5')
print('-=-' * 20)
jogador = int(input('Em que número eu pensei? '))
print('Processando...')
sleep(3)
if computador == jogador:
    print('Parabens! Eu pensei em {}'.format(computador))
else:
    print('Ganhei eu pensei em {} e não em {}'.format(computador, jogador))
