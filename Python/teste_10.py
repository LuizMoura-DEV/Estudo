n1 = float(input('Digite a nota 1: '))
n2 = float(input('Digite a nota 2: '))
m = (n1 + n2) / 2
print('A sua média foi: {:.2f}'.format(m))
if m >= 6:
    print('Sua média foi boa. Parabens!')
else:
    print('Sua média foi ruim')

print('PARABENS!!!' if m >= 6 else 'ESTUDE MAIS')
