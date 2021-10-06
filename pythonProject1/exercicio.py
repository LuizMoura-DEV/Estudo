unidade = ('zero', 'um', 'dois', 'três', 'quatro', 'cinco',
        'seis', 'sete', 'oito', 'nove', 'dez',
        'onze', 'doze', 'treze', 'catorze', 'quinze',
        'dezesseis', 'dezessete', 'dezoito', 'dezenove')

dezena = ('vinte', 'trinta', 'quarenta', 'cinquenta',
        'sessenta', 'setenta', 'oitenta', 'noventa')


centena = ('cento', 'duzentos', 'trezentos', 'quatrocentos',
        'quinhentos', 'seiscentos', 'setecentos', 'oitocentos',
        'novecentos')

#Verifica se o numero digitado esta entre 0 e 999
#caso não, mantem dentro do loop ate que seja gi-
#tado um valor valido
while True:
        numero = int(input("Digite um numero entre 0 e 999: "))
        if 0 <= numero <=999:
                break
        print('Número digitado está incorreto!')

#Separa os numeros em UNIDADE, DEZENA e CENTENA
#para poder buscar na tupla seu equivalente
if numero // 1 % 100 <= 19:
        u = numero // 1 % 100
        textoU = unidade[u]
        textoD = ''
else:
        u = numero // 1 % 10
        d = numero // 10 % 10
        if numero // 1 % 10 == 0:
                textoU = ''
        else:
                textoU = unidade[u]
        if numero // 10 % 10 == 0:
                textoD = ''
        else:
                textoD = dezena[d-2] #-2 para ajusta ao texto correspondente dentro da tupla

if numero // 100 % 10 == 0:
        textoC = ''

else:
        c = numero // 100 % 10
        textoC = centena[c-1] #-1 para ajustar ao texto correspondente dentro da tupla

#Junção dos texto, verifica a inxistência de algum termo
#para deixar o texto mais coerente
if textoU == '':
        texto = textoC + ' e ' + textoD
elif textoD == '':
        texto = textoC + ' e ' + textoU
elif textoC == '':
        texto = textoD + ' e ' + textoD
if textoC == '' and textoD == '':
        texto = textoU
if textoC == '' and textoU =='':
        texto = textoD
if textoD == '' and textoU =='':
        texto = textoC
if textoC != '' and textoD != '' and textoU!= '':
        texto = textoC + ' e ' + textoD + ' e ' + textoU


print(f"Você digitou o numero {texto}")
