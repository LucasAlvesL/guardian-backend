import { prisma } from "@/lib/prisma"
import { Prisma } from "generated/prisma"
import { ShelterRepository } from "../shelter-repository"

export class PrismaShelterRepository implements ShelterRepository {
  findById(id: string) {
    return prisma.shelter.findUnique({
      where: { id }
    })
  }
  findByEmail(email: string) {
    return prisma.shelter.findUnique({
      where: { email }
    })
  }
  create(data: Prisma.ShelterCreateInput) {
    return prisma.shelter.create({
      data
    })
  }
  findByLatitudeAndLongitude(latitude: number, longitude: number) {
    return prisma.shelter.findFirst({
      where: {
        latitude,
        longitude
      }
    })
  }
}