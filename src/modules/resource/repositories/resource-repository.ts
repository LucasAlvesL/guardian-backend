import { Prisma, Resource } from "generated/prisma"

export interface ResourceRepository {
  create(data: Prisma.ResourceUncheckedCreateInput): Promise<Resource>
  findById(id: string): Promise<Resource | null>
  update(id: string, data: Prisma.ResourceUncheckedUpdateInput): Promise<Resource | null>
  delete(id: string): Promise<Resource | null>
  findByNameAndShelterId(name: string, shelter_id: string): Promise<Resource | null>
}