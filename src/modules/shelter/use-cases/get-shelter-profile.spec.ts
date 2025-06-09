import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryShelterRepository } from "../repositories/in-memory/in-memory-shelter-repository"
import { GetShelterProfile } from "./get-shelter-profile"

let sheltersRepository: InMemoryShelterRepository
let sut: GetShelterProfile

describe('Get Shelter Profile Service', _ => {
  beforeEach(() => {
    sheltersRepository = new InMemoryShelterRepository()
    sut = new GetShelterProfile(sheltersRepository)
  })
  it('Should be able to get shelter profile', async _ => {
    const createdShelter = await sheltersRepository.create({
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 1000,
      email: 'shelter1@example.com',
      password_hash: '123456'
    })

    const { shelter } = await sut.execute({
      shelter_id: createdShelter.id
    })

    expect(shelter.id).toEqual(createdShelter.id)
  })

  it('Should be able to get shelter profile with wrong id', async _ => {
    await expect(() => sut.execute({
      shelter_id: 'wrong-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
