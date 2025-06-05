import { PrismaShelterRepository } from "../repositories/prisma/prisma-shelter-repository"
import { AuthShelterUseCase } from "../use-cases/auth-shelter"

export function makeAuthShelterUseCase() {
  const shelterRepository = new PrismaShelterRepository()
  const authShelterUseCase = new AuthShelterUseCase(shelterRepository)

  return authShelterUseCase
}