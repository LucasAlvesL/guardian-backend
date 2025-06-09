import { makeGetShelterProfileUseCase } from "@/modules/shelter/factories/make-get-shelter-profile-use-case"
import { FastifyReply, FastifyRequest } from "fastify"

interface UserPayload {
  sign: {
    sub: string
  }
  iat: number
  exp: number
}

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const getShelterProfile = makeGetShelterProfileUseCase()

  const user = req.user as UserPayload
  const shelter_id = user?.sign?.sub

  if (!shelter_id) {
    return res.status(400).send({ message: "Shelter ID not found in token" })
  }

  const { shelter } = await getShelterProfile.execute({
    shelter_id
  })

  return res.status(200).send({ ...shelter, password_hash: undefined })
}