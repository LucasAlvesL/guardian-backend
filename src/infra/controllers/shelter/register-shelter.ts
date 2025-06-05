import { ShelterAlreadyExistsError } from "@/errors/shelter-already-exists-error"
import { makeRegisterService } from "@/modules/shelter/factories/make-register-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    latitude: z.number().refine((val) => {
      return Math.abs(val) <= 90
    }),
    longitude: z.number().refine((val) => {
      return Math.abs(val) <= 180
    }),
    capacity: z.number(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, latitude, longitude, capacity, email, password } = registerBodySchema.parse(req.body)

  try {
    const shelterUseCase = makeRegisterService()

    await shelterUseCase.execute({
      name,
      latitude,
      longitude,
      capacity,
      email,
      password
    })

  } catch (err) {
    if (err instanceof ShelterAlreadyExistsError) {
      return res.status(409).send({
        message: err.message
      })
    }

    throw err
  }
  return res.status(201).send()
}