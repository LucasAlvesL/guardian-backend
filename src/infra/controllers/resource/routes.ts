import { verifyJWT } from "@/infra/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { register } from "./register-resource"

export async function resourcesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/shelters/resources', register)
} 