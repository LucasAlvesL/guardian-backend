import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { ShelterRepository } from "@/modules/shelter/repositories/shelter-repository"
import { ResourceRepository } from "../repositories/resource-repository"

export class UpdateResourceUseCase {
  constructor(private resourceRepository: ResourceRepository, private shelterRepository: ShelterRepository) { }

  async execute(resource_id: string, data: any) {
    const { shelter_id } = data
    const resource = await this.resourceRepository.findById(resource_id)
    const shelter = await this.shelterRepository.findById(shelter_id)

    if (!resource || resource.shelter_id !== shelter?.id || !shelter) {
      throw new ResourceNotFoundError()
    }

    return this.resourceRepository.update(resource_id, data)
  }
}