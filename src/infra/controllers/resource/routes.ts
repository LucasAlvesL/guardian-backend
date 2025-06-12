import { verifyJWT } from "@/infra/middlewares/verify-jwt"
import { FastifyInstance } from "fastify"
import { deleteResource } from "./delete-resource"
import { register } from "./register-resource"
import { update } from "./update-resouce"

export async function resourcesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/shelters/resources', register)
  app.delete("/shelters/resources/:resource_id", deleteResource)
  app.put("/shelters/resources/:resource_id", update)

} 