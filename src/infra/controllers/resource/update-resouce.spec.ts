import { app } from "@/app"
import { createJWT } from "@/utils/create-and-authenticate-shelter"
import request from "supertest"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Update Resource Controller (E2E)", () => {
  let token: string
  let shelter_id: string
  let resource_id: string

  const resourcePayload = {
    name: "Water",
    category: "FOOD",
    quantity: 100,
    description: "Bottled water",
  }

  const updatedResourcePayload = {
    name: "Updated Water",
    category: "FOOD",
    quantity: 150,
    description: "Updated bottled water",
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
      .send(resourcePayload)

    resource_id = resourceResponse.body.id
  })

  afterAll(async () => {
    await app.close()
  })

  const updateResource = (
    authToken: string,
    payload = updatedResourcePayload,
    id?: string
  ) => {
    return request(app.server)
      .put(`/shelters/resources/${id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(payload)
  }

  it("should update a resource successfully", async () => {
    const response = await updateResource(token, updatedResourcePayload, resource_id)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      message: "Resource updated successfully",
    })
  })

  it("should return 404 if resource does not exist", async () => {
    const response = await updateResource(token, updatedResourcePayload, "non-existent-id")

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      message: "Resource not found or shelter mismatch",
    })
  })

  it("should return 400 if shelter ID is missing in token", async () => {
    const invalidToken = app.jwt.sign({}, { expiresIn: "1h" })

    const response = await updateResource(invalidToken, updatedResourcePayload, resource_id)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: "Shelter ID not found in token",
    })
  })

  it("should return 401 if token is invalid", async () => {
    const response = await updateResource("invalid-token", updatedResourcePayload, resource_id)

    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      message: "Unauthorized",
    })
  })
})