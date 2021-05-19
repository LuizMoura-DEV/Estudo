from math import radians, sin, cos, tan
ang = float(input('Digite o valor do angulo: '))
seno = sin(radians(ang))
coseno = cos(radians(ang))
tangente = tan(radians(ang))
print('Seno: {:.2f} \nCoseno: {:.2f} \nTangente: {:.2f}'.format(seno, coseno, tangente))
