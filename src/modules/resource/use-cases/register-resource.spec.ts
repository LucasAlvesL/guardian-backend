import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { InMemoryShelterRepository } from "@/modules/shelter/repositories/in-memory/in-memory-shelter-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryResourceRepository } from "../repositories/in-memory/in-memory-resource-repository"
import { RegisterResourceUseCase } from "./register-resource"

let resourcesRepository: InMemoryResourceRepository
let shelterRepository: InMemoryShelterRepository
let sut: RegisterResourceUseCase

describe('Create Resource Service', _ => {
  beforeEach(async () => {
    resourcesRepository = new InMemoryResourceRepository()
    shelterRepository = new InMemoryShelterRepository()
    sut = new RegisterResourceUseCase(resourcesRepository, shelterRepository)

    await shelterRepository.create({
      id: 'shelter-1',
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 1000,
      email: 'shelter1@example.com',
      password_hash: '123456'
    })
  })

  it('Should not be able to create a resource without a shelter', async _ => {
    await expect(() => sut.execute({
      name: 'Resource A',
      category: 'FOOD',
      quantity: 10,
      description: 'Description A',
      shelter_id: 'non-existing-shelter'
    })).rejects.toThrow(ResourceNotFoundError)
  })

  it('Should be able to create a resource', async _ => {
    const { resource } = await sut.execute({
      name: 'Resource A',
      category: 'FOOD',
      quantity: 10,
      description: 'Description A',
      shelter_id: 'shelter-1'
    })

    expect(resource.id).toEqual(expect.any(String))
  })
})