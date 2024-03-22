# instalação dos pacotes
```shell
 # criando pacote de dependência
 npm init -y

 # instala para trabalhar com typescript
 npm install typescript @types/node tsx -D

 # para trabalhar com requisições
 npm install fastify

 # padronizar o código
 npm instal eslint @rocketseat/eslint-config -d

 # vamso trabalhar com banco de dados SQLITE e um query builder
 npm install knex sqlite3 

```

# configurando o package JSON

```json
# configuração do package.json

"scripts": {
    "dev": "tsx watch ./src/server.ts",
    "lint": "eslint src --ext .ts --fix"
  },
```
