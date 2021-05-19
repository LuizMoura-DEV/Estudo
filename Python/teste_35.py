def soma(*num):
    s = 0
    for valor in num:
        s += valor
    print(f'Soma é {s}')


soma(2, 3, 5, 4)
soma(1, 2)
soma(2, 3, 8, 9, 5, 10)
