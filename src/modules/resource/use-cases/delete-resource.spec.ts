import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { InMemoryShelterRepository } from "@/modules/shelter/repositories/in-memory/in-memory-shelter-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryResourceRepository } from "../repositories/in-memory/in-memory-resource-repository"
import { DeleteResourceUseCase } from "./delete-resource"

let resourceRepository: InMemoryResourceRepository
let shelterRepository: InMemoryShelterRepository
let sut: DeleteResourceUseCase

describe("Delete Resource Use Case", () => {
  beforeEach(async () => {
    resourceRepository = new InMemoryResourceRepository()
    shelterRepository = new InMemoryShelterRepository()
    sut = new DeleteResourceUseCase(resourceRepository, shelterRepository)

    await shelterRepository.create({
      id: "shelter-123",
      name: "Main Shelter",
      latitude: 0,
      longitude: 0,
      capacity: 100,
      email: "main@shelter.com",
      password_hash: "123456"
    })

    await resourceRepository.create({
      id: "resource-1",
      name: "Water",
      category: "FOOD",
      quantity: 100,
      description: "Bottled water",
      shelter_id: "shelter-123",
    })

    await resourceRepository.create({
      id: "resource-2",
      name: "Medicine",
      category: "MEDICATION",
      quantity: 50,
      description: "Basic medicine",
      shelter_id: "shelter-999",
    })
  })

  it("should delete a resource that belongs to the specified shelter", async () => {
    await sut.execute("resource-1", "shelter-123")
    const deleted = await resourceRepository.findById("resource-1")
    expect(deleted).toBeNull()
  })

  it("should throw if the resource does not exist", async () => {
    await expect(() =>
      sut.execute("non-existent-id", "shelter-123")
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("should throw if the resource belongs to another shelter", async () => {
    await expect(() =>
      sut.execute("resource-2", "shelter-123")
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("should throw if the shelter does not exist", async () => {
    await expect(() =>
      sut.execute("resource-1", "non-existent-shelter")
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})