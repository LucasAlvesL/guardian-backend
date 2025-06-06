import fastifyJwt from "@fastify/jwt"
import fastify from "fastify"
import { env } from "./env"
import { resourcesRoutes } from "./infra/controllers/resource/routes"
import { sheltersRoutes } from "./infra/controllers/shelter/routes"

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.register(sheltersRoutes)
app.register(resourcesRoutes)