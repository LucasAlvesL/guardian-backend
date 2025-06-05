import { Prisma, Shelter } from "generated/prisma"

export interface ShelterRepository {
  findById(id: string): Promise<Shelter | null>
  findByEmail(email: string): Promise<Shelter | null>
  findByLatitudeAndLongitude(latitude: number, longitude: number): Promise<Shelter | null>
  create(data: Prisma.ShelterCreateInput): Promise<Shelter>
}