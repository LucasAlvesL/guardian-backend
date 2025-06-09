import { PrismaShelterRepository } from "../repositories/prisma/prisma-shelter-repository"
import { GetShelterProfile } from "../use-cases/get-shelter-profile"

export function makeGetShelterProfileUseCase() {
  const shelterRepository = new PrismaShelterRepository()
  const getShelterProfileUseCase = new GetShelterProfile(shelterRepository)

  return getShelterProfileUseCase
}