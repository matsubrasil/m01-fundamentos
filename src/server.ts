import fastify from 'fastify'
import { knex } from './database'

const app = fastify({
  logger: true,
})

app.get('/', (request, reply) => {
  return reply.send({ hello: 'world' })
})
app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})

// app
//   .listen({
//     port: 3333,
//   })
//   .then(() => {
//     console.log('HTTP Server running....')
//   })

const start = async () => {
  try {
    await app.listen({ port: 3333 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
