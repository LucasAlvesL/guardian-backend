import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { ShelterRepository } from "@/modules/shelter/repositories/shelter-repository"
import { ResourceRepository } from "../repositories/resource-repository"

export class DeleteResourceUseCase {
  constructor(private resourceRepository: ResourceRepository, private shelterRepository: ShelterRepository) { }

  async execute(resource_id: string, shelter_id: string) {
    const resource = await this.resourceRepository.findById(resource_id)
    const shelter = await this.shelterRepository.findById(shelter_id)

    if (!resource || resource.shelter_id !== shelter?.id || !shelter) {
      throw new ResourceNotFoundError()
    }
    return this.resourceRepository.delete(resource_id)
  }
}
