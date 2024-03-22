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

 # vamos trabalhar com banco de dados SQLITE e um query builder
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

# migrate
```shell
# criar a primeira migration
# tem que configurar o package.json pq o tsx não conversa com knex, logo, temos que fazer um load
"knex": "node --no-warnings --import tsx ./node_modules/.bin/knex",
# executar, os "--~abaixo, serve para indicar que estes parâmetros são do knex
npm run knex -- migrate:make create-transactions

# criar a tabela
npm run knex -- migrate:latest

# roll-back
npm run knex -- migrate:rollback 

# add 
npm run knex -- migrate:make add-session-id-to-transactions

```
```javascript
# npm run knex -- migrate:make create-transactions
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}

```


```javascript
# npm run knex -- migrate:make add-session-id-to-transactions
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.uuid('session_id').after('id').index('')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id')
  })
}
```