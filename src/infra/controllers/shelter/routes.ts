import { FastifyInstance } from "fastify"
import { authenticate } from "./auth-shelter"
import { register } from "./register-shelter"

export async function sheltersRoutes(app: FastifyInstance) {
  app.post('/shelters', register)
  app.post('/auth', authenticate)
} 