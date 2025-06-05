import { app } from "@/app"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Register Shelter (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register a shelter', async () => {
    const res = await request(app.server)
      .post('/shelters')
      .send({
        name: 'Shelter 1',
        latitude: 1.234,
        longitude: 5.678,
        capacity: 1000,
        email: 'shelter1@example.com',
        password: '123456'
      })

    expect(res.statusCode).toBe(201)
  })
})