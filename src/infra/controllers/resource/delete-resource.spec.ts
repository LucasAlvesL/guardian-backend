import { app } from "@/app"
import { createJWT } from "@/utils/create-and-authenticate-shelter"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Delete Resource Controller (E2E)", () => {
  let token: string
  let shelter_id: string
  let resource_id: string

  const resourcePayload = {
    name: "Water",
    category: "FOOD",
    quantity: 100,
    description: "Bottled water",
  }

  beforeAll(async () => {
    await app.ready()
    const jwtResponse = await createJWT(app)
    token = jwtResponse.token

    const decoded = app.jwt.decode(token) as { sub: string }
    shelter_id = decoded.sub

    const resourceResponse = await request(app.server)
      .post("/shelters/resources")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...resourcePayload, shelter_id })

    resource_id = resourceResponse.body.id
  })

  afterAll(async () => {
    await app.close()
  })

  const deleteResource = (authToken: string, id?: string) => {
    return request(app.server)
      .delete(`/shelters/resources/${id}`)
      .set("Authorization", `Bearer ${authToken}`)
  }

  it("should delete a resource successfully", async () => {
    const response = await deleteResource(token, resource_id)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: "Resource deleted successfully",
    })
  })

  it("should return 404 if resource does not exist", async () => {
    const response = await deleteResource(token, "non-existent-id")

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: "Resource not found",
    })
  })

  it("should return 400 if shelter ID is missing in token", async () => {
    const invalidToken = app.jwt.sign({}, { expiresIn: "1h" })

    const response = await deleteResource(invalidToken, resource_id)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: "Shelter ID not found in token",
    })
  })

  it("should return 401 if token is invalid", async () => {
    const response = await deleteResource("invalid-token", resource_id)

    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      message: "Unauthorized",
    })
  })
})