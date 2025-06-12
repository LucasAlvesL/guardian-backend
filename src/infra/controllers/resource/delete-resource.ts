import { makeDeleteResourceUseCase } from "@/modules/resource/factories/make-delete-resource-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

interface UserPayload {
  sign: {
    sub: string
  }
}

interface DeleteResourceParams {
  resource_id: string
}

export async function deleteResource(req: FastifyRequest<{ Params: DeleteResourceParams }>, res: FastifyReply) {
  const deleteResourceUseCase = makeDeleteResourceUseCase()
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
    const result = await deleteResourceUseCase.execute(shelter_id, resource_id)

    if (!result) {
      return res.status(404).send({ message: "Resource not found" })
    }

    return res.status(200).send({ message: "Resource deleted successfully" })
  } catch (error) {
    console.error("Error deleting resource:", error)
    return res.status(500).send({ message: "An internal server error occurred" })
  }
}