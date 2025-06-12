import { PrismaShelterRepository } from "@/modules/shelter/repositories/prisma/prisma-shelter-repository"
import { PrismaResourceRepository } from "../repositories/prisma/prisma-resource-repository"
import { DeleteResourceUseCase } from "../use-cases/delete-resource"

export function makeDeleteResourceUseCase() {
  const shelterRepository = new PrismaShelterRepository()
  const resourceRepository = new PrismaResourceRepository()
  const deleteResourceUseCase = new DeleteResourceUseCase(resourceRepository, shelterRepository)

  return deleteResourceUseCase
}