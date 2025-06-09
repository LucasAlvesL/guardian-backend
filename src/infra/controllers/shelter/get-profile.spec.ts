import { app } from "@/app"
import { createJWT } from "@/utils/create-and-authenticate-shelter"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe('Profile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to get shelter profile', async () => {
    const { token } = await createJWT(app)

    const profileResponse = await request(app.server).get('/profile').set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toBe(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Shelter 1',
        email: 'shelter1@example.com',
        latitude: "1.234",
        longitude: "5.678",
        capacity: 1000,
        created_at: expect.any(String)
      }),
    )
  })
})