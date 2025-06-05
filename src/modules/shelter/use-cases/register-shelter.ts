import { ShelterAlreadyExistsError } from "@/errors/shelter-already-exists-error"
import { hash } from "bcryptjs"
import { Shelter } from "generated/prisma"
import { ShelterRepository } from "../repositories/shelter-repository"

interface RegisterShelterRequest {
  name: string
  email: string
  password: string
  latitude: number
  longitude: number
  capacity: number
}
interface RegisterShelterResponse {
  shelter: Shelter
}

export class RegisterShelterUseCase {
  constructor(private shelterRepository: ShelterRepository) { }

  async execute({ name, email, password, latitude, longitude, capacity }: RegisterShelterRequest): Promise<RegisterShelterResponse> {
    const password_hash = await hash(password, 6)
    const shelterAlreadyExists = await this.shelterRepository.findByEmail(email)
    const shelterWithSameLocation = await this.shelterRepository.findByLatitudeAndLongitude(latitude, longitude)

    if (shelterAlreadyExists) {
      throw new ShelterAlreadyExistsError()
    }

    if (shelterWithSameLocation) {
      throw new Error('Shelter already exists at this location')
    }

    if (capacity <= 0) {
      throw new Error('Capacity must be greater than zero')
    }

    const shelter = await this.shelterRepository.create({
      name,
      email,
      password_hash,
      latitude,
      longitude,
      capacity
    })

    return { shelter }
  }
}