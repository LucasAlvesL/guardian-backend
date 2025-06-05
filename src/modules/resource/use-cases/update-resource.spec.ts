import { ResourceNotFoundError } from "@/errors/resource-not-found-error"
import { InMemoryShelterRepository } from "@/modules/shelter/repositories/in-memory/in-memory-shelter-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryResourceRepository } from "../repositories/in-memory/in-memory-resource-repository"
import { UpdateResourceUseCase } from "./update-resource"

let resourceRepository: InMemoryResourceRepository
let shelterRepository: InMemoryShelterRepository
let sut: UpdateResourceUseCase

describe("Update Resource Use Case", () => {
  beforeEach(async () => {
    resourceRepository = new InMemoryResourceRepository()
    shelterRepository = new InMemoryShelterRepository()
    sut = new UpdateResourceUseCase(resourceRepository, shelterRepository)

    await shelterRepository.create({
      id: "shelter-123",
      name: "Main Shelter",
      latitude: 0,
      longitude: 0,
      capacity: 100,
      email: "main@shelter.com",
      password_hash: "123456",
    })

    await resourceRepository.create({
      id: "resource-1",
      name: "Water",
      category: "FOOD",
      quantity: 100,
      description: "Bottled water",
      shelter_id: "shelter-123",
    })
  })

  it("should update a resource successfully", async () => {
    const updatedResource = await sut.execute("resource-1", {
      name: "Updated Water",
      category: "FOOD",
      quantity: 150,
      description: "Updated bottled water",
      shelter_id: "shelter-123",
    })

    expect(updatedResource).not.toBeNull()
    expect(updatedResource?.name).toBe("Updated Water")
    expect(updatedResource?.quantity).toBe(150)
    expect(updatedResource?.description).toBe("Updated bottled water")
    expect(updatedResource?.shelter_id).toBe("shelter-123")
  })

  it("should throw if the resource does not exist", async () => {
    await expect(() =>
      sut.execute("non-existent-id", {
        name: "Updated Resource",
        category: "FOOD",
        quantity: 50,
        description: "Updated description",
        shelter_id: "shelter-123",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it("should throw if the shelter does not exist", async () => {
    await expect(() =>
      sut.execute("resource-1", {
        shelter_id: "non-existent-shelter",
        name: "Updated Resource",
        category: "FOOD",
        quantity: 50,
        description: "Updated description",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})