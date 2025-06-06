import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createJWT(app: FastifyInstance) {
  await request(app.server).post('/shelters').send({
    name: 'Shelter 1',
    latitude: 1.234,
    longitude: 5.678,
    capacity: 1000,
    email: 'shelter1@example.com',
    password: '123456'
  })

  const authResponse = await request(app.server).post('/auth').send({
    email: 'shelter1@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}