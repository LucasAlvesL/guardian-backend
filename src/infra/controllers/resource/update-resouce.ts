import { makeUpdateResourceUseCase } from "@/modules/resource/factories/make-update-resource-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

interface UserPayload {
  sign: {
    sub: string
  }
}

interface UpdateResourceParams {
  resource_id: string
}

export async function update(req: FastifyRequest<{ Params: UpdateResourceParams }>, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    category: z.enum(["FOOD", "CLOTHING", "MEDICATION", "SHELTER", "OTHER"]),
    quantity: z.number().int().positive(),
    description: z.string().optional(),
  })

  const { name, category, quantity, description } = registerBodySchema.parse(req.body)

  if (!name || !category || !quantity) {
    return res.status(400).send({ message: "Invalid request body" })
  }

  const resourceUseCase = makeUpdateResourceUseCase()
  const user = req.user as UserPayload
  const shelter_id = user?.sign?.sub
  const { resource_id } = req.params

  if (!shelter_id) {
    return res.status(400).send({ message: "Shelter ID not found in token" })
  }

  if (!resource_id) {
    return res.status(400).send({ message: "Resource ID is missing or invalid" })
  }

  try {
    await resourceUseCase.execute(resource_id, {
      name,
      category,
      quantity,
      description,
      shelter_id,
    })

    return res.status(200).send({
      message: "Resource updated successfully",
    })
  } catch (error) {
    console.error("Error updating resource:", error)
    return res.status(500).send({ message: "An internal server error occurred" })
  }
}