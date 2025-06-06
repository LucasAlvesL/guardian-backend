import { prisma } from "@/lib/prisma"
import { Prisma } from "generated/prisma"
import { ResourceRepository } from "../resource-repository"

export class PrismaResourceRepository implements ResourceRepository {
  async create(data: Prisma.ResourceUncheckedCreateInput) {
    return prisma.resource.create({
      data
    })
  }

  async findById(id: string) {
    return prisma.resource.findUnique({
      where: { id }
    })
  }

  async update(id: string, data: Prisma.ResourceUpdateInput) {
    return prisma.resource.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return prisma.resource.delete({
      where: { id }
    })
  }

  async findByNameAndShelterId(name: string, shelter_id: string) {
    return prisma.resource.findFirst({
      where: {
        name,
        shelter_id
      }
    })
  }
}