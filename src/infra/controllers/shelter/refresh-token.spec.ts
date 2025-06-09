import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
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

    const cookies = authResponse.get('Set-Cookie')

    if (cookies && cookies.length > 0) {
      const cookieString = cookies.join('; ')

      const response = await request(app.server)
        .patch('/token/refresh')
        .set('Cookie', cookieString)
        .send()

      expect(response.status).toEqual(200)
      expect(response.body).toEqual({ token: expect.any(String) })
      expect(cookies).toEqual(
        expect.arrayContaining([expect.stringContaining('refreshToken=')]),
      )
    } else {
      throw new Error('No cookies received, unable to test token refresh')
    }
  })
})