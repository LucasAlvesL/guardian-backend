import { PrismaShelterRepository } from "../repositories/prisma/prisma-shelter-repository"
import { RegisterShelterUseCase } from "../use-cases/register-shelter"

export function makeRegisterShelterUseCase() {
  const shelterRepository = new PrismaShelterRepository()
  const registerUseCase = new RegisterShelterUseCase(shelterRepository)

  return registerUseCase
}