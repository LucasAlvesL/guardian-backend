import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists-error"
import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { ShelterRepository } from "@/modules/shelter/repositories/shelter-repository"
import { Resource, ResourceItemCategory } from "generated/prisma"
import { ResourceRepository } from "../repositories/resource-repository"

interface RegisterResourceUseCaseRequest {
  name: string
  category: ResourceItemCategory
  quantity: number
  description?: string | null
  shelter_id: string
}
interface RegisterResourceUseCaseResponse {
  resource: Resource
}

export class RegisterResourceUseCase {
  constructor(private resourceRepository: ResourceRepository, private shelterRepository: ShelterRepository) { }

  async execute({ name, category, quantity, description, shelter_id }: RegisterResourceUseCaseRequest): Promise<RegisterResourceUseCaseResponse> {
    const shelterExists = await this.shelterRepository.findById(shelter_id)

    if (!shelterExists) { throw new ResourceNotFoundError() }

    const existingResource = await this.resourceRepository.findByNameAndShelterId(name, shelter_id)

    if (existingResource) {
      throw new ResourceAlreadyExistsError()
    }

    const resource = await this.resourceRepository.create({
      name,
      category,
      quantity,
      description,
      shelter_id
    })
    return { resource }
  }
}