import { app } from "@/app"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate shelter', async () => {
    await request(app.server).post('/shelters').send({
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 1000,
      email: 'shelter1@example.com',
      password: '123456'
    })

    const res = await request(app.server)
      .post('/auth')
      .send({
        email: 'shelter1@example.com',
        password: '123456',
      })

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})