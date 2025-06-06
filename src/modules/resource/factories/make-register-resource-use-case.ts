import { PrismaShelterRepository } from "@/modules/shelter/repositories/prisma/prisma-shelter-repository"
import { PrismaResourceRepository } from "../repositories/prisma/prisma-resource-repository"
import { RegisterResourceUseCase } from "../use-cases/register-resource"

export function makeRegisterResourceUseCase() {
  const shelterRepository = new PrismaShelterRepository()
  const resourceRepository = new PrismaResourceRepository()
  const registerResourceUseCase = new RegisterResourceUseCase(resourceRepository, shelterRepository)

  return registerResourceUseCase
}