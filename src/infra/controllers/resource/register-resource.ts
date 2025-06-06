import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists-error";
import { makeRegisterResourceUseCase } from "@/modules/resource/factories/make-register-resource-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

interface UserPayload {
  sign: {
    sub: string
  }
  iat: number
  exp: number
}

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    category: z.enum(['FOOD', 'CLOTHING', 'MEDICATION', 'SHELTER', 'OTHER']),
    quantity: z.number().int().positive(),
    description: z.string().optional()
  })
  const { name, category, quantity, description } = registerBodySchema.parse(req.body)

  try {
    const resourceUseCase = makeRegisterResourceUseCase()
    const user = req.user as UserPayload
    const shelter_id = user?.sign?.sub
    if (!shelter_id) {
      return res.status(400).send({ message: 'Shelter ID not found in token' });
    }
    await resourceUseCase.execute({
      name,
      category,
      quantity,
      description,
      shelter_id
    })

  } catch (err) {
    if (err instanceof ResourceAlreadyExistsError) {
      return res.status(409).send({
        message: err.message
      })
    }

    throw err
  }
  return res.status(201).send({
    message: "Resource registered successfully"
  })
}