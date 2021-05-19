pessoas = {'nome': 'Gustavo', 'sexo': 'M', 'idade': 28}
pessoas['peso'] = 98.5
for k, v in pessoas.items():
    print(f'{k} = {v}')
print(pessoas.keys())
print(pessoas.values())
print(pessoas.items())
print(f'O {pessoas["nome"]} tem {pessoas["idade"]} anos de idade')
