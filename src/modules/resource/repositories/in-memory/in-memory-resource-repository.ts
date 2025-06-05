import { Prisma, Resource } from "generated/prisma"
import { randomUUID } from "node:crypto"
import { ResourceRepository } from "../resource-repository"

export class InMemoryResourceRepository implements ResourceRepository {
  private resources: Resource[] = []

  async create(data: Prisma.ResourceUncheckedCreateInput) {
    const resource: Resource = {
      id: data.id ?? randomUUID(),
      name: data.name,
      category: data.category,
      quantity: data.quantity,
      description: data.description || null,
      created_at: new Date(),
      updated_at: new Date(),
      shelter_id: data.shelter_id
    }

    this.resources.push(resource)
    return resource
  }
  async findById(id: string) {
    return this.resources.find(resource => resource.id === id) || null
  }

  async update(id: string, data: Prisma.ResourceUncheckedUpdateInput) {
    const resourceIndex = this.resources.findIndex(resource => resource.id === id)
    if (resourceIndex === -1) return null

    const existingResource = this.resources[resourceIndex]

    const updatedResource: Resource = {
      ...existingResource,
      name: typeof data.name === 'string' ? data.name : existingResource.name,
      category: typeof data.category === 'string' ? data.category : existingResource.category,
      quantity: typeof data.quantity === 'number' ? data.quantity : existingResource.quantity,
      description: typeof data.description === 'string' || data.description === null ? data.description : existingResource.description,
      updated_at: new Date(),
      shelter_id: existingResource.shelter_id,
    }

    this.resources[resourceIndex] = updatedResource
    return updatedResource
  }

  async delete(id: string) {
    const resourceIndex = this.resources.findIndex(resource => resource.id === id)
    if (resourceIndex === -1) return null

    const [deletedResource] = this.resources.splice(resourceIndex, 1)
    return deletedResource
  }
}