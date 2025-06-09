import { verifyJWT } from "@/infra/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { authenticate } from "./auth-shelter"
import { profile } from "./get-profile"
import { refresh } from "./refresh-token"
import { register } from "./register-shelter"

export async function sheltersRoutes(app: FastifyInstance) {
  app.post('/shelters', register)
  app.post('/auth', authenticate)

  app.patch('/token/refresh', refresh)

  // ** Authenticated routes **
  app.get('/profile', { onRequest: [verifyJWT] }, profile)
} 