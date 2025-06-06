import { app } from "@/app";
import { createJWT } from "@/utils/create-and-authenticate-shelter";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register Resource Controller (E2E)", () => {
  let token: string
  let shelter_id: string

  const resourcePayload = {
    name: "Water",
    category: "FOOD",
    quantity: 100,
    description: "Bottled water"
  }

  beforeAll(async () => {
    await app.ready()
    const jwtResponse = await createJWT(app)
    token = jwtResponse.token
    console.log("JWT Response:", jwtResponse) // debug

    const decoded = app.jwt.decode(token) as { sub: string }
    shelter_id = decoded.sub
  })

  afterAll(async () => {
    await app.close()
  })

  const postResource = (
    authToken: string,
    payload = resourcePayload,
    id?: string
  ) => {
    return request(app.server)
      .post("/shelters/resources")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ ...payload, shelter_id: id })
  }

  it("should register a resource successfully", async () => {
    const response = await postResource(token, resourcePayload, shelter_id)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: "Resource registered successfully"
    })
  })

  it("should return 400 if shelter ID is missing in token", async () => {
    const invalidToken = app.jwt.sign({}, { expiresIn: "1h" })

    const response = await postResource(invalidToken, resourcePayload)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: "Shelter ID not found in token"
    })
  })

  it("should return 401 if token is invalid", async () => {
    const response = await postResource("invalid-token", resourcePayload)

    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      message: "Unauthorized"
    })
  })

  it("should return 409 if resource already exists", async () => {
    await postResource(token, resourcePayload, shelter_id)

    const response = await postResource(token, resourcePayload, shelter_id)

    expect(response.status).toBe(409)
    expect(response.body).toEqual({
      message: "Resource already exists"
    })
  })
})