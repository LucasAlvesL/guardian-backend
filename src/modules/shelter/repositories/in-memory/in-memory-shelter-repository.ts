import { Prisma, Shelter } from "generated/prisma"
import { randomUUID } from "node:crypto"
import { ShelterRepository } from "../shelter-repository"

export class InMemoryShelterRepository implements ShelterRepository {
  public items: Shelter[] = []

  async findById(id: string) {
    return this.items.find(item => item.id === id) || null
  }
  async findByEmail(email: string) {
    return this.items.find(item => item.email === email) || null
  }
  async create(data: Prisma.ShelterCreateInput) {
    const shelter = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      capacity: data.capacity ?? 0,
      created_at: new Date()
    }
    this.items.push(shelter)
    return shelter
  }

}