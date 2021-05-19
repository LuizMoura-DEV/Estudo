def contador(i, f, p):
    """
    ->Faz uma contagem
    :param i: inicio
    :param f: fim
    :param p: de quanto em quanto
    :return: sem retono
    """
    c = i
    while c <= f:
        print(f'{c}', end='..')
        c += p
    print('fim')


contador(2, 10, 2)