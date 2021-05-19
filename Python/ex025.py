distancia = int(input('Digite a distância da viagem: '))
preco = distancia * 0.50 if distancia <= 200 else distancia * 0.45
print('Sua viagem será de {}Km que custará R${:.2f}'.format(distancia, preco))