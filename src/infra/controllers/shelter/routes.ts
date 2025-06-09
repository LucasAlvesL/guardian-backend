import { verifyJWT } from "@/infra/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { authenticate } from "./auth-shelter"
import { profile } from "./get-profile"
import { register } from "./register-shelter"

export async function sheltersRoutes(app: FastifyInstance) {
  app.post('/shelters', register)
  app.post('/auth', authenticate)

  // ** Authenticated routes **
  app.get('/profile', { onRequest: [verifyJWT] }, profile)
} 