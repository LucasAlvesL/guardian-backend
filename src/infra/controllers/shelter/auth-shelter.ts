import { InvalidCredentialsError } from "@/errors/invalid-credentials-error"
import { makeAuthShelterUseCase } from "@/modules/shelter/factories/make-auth-shelter-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = registerBodySchema.parse(req.body)
  try {
    const authShelterUseCase = makeAuthShelterUseCase()

    const { shelter } = await authShelterUseCase.execute({
      email,
      password,
    })

    const token = await res.jwtSign(
      {
        sign: {
          sub: shelter.id,
        },
      },
    )

    return res.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }
}