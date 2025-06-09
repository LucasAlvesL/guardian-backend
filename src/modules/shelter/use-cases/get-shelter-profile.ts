import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { Shelter } from "generated/prisma"
import { ShelterRepository } from "../repositories/shelter-repository"

interface GetShelterProfileRequest {
  shelter_id: string
}
interface GetShelterProfileResponse {
  shelter: Shelter
}

export class GetShelterProfile {
  constructor(private readonly shelterRepository: ShelterRepository) { }

  async execute({ shelter_id }: GetShelterProfileRequest): Promise<GetShelterProfileResponse> {
    const shelter = await this.shelterRepository.findById(shelter_id)

    if (!shelter) throw new ResourceNotFoundError()

    return { shelter }
  }

}