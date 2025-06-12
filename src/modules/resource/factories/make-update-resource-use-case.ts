import { PrismaShelterRepository } from "@/modules/shelter/repositories/prisma/prisma-shelter-repository"
import { PrismaResourceRepository } from "../repositories/prisma/prisma-resource-repository"
import { UpdateResourceUseCase } from "../use-cases/update-resource"

export function makeUpdateResourceUseCase() {
  const shelterRepository = new PrismaShelterRepository()
  const resourceRepository = new PrismaResourceRepository()
  const updateResourceUseCase = new UpdateResourceUseCase(resourceRepository, shelterRepository)

  return updateResourceUseCase
}