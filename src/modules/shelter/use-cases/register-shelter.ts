import { UserAlreadyExistsError } from "@/errors/user-already-exists-error"
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

    if (shelterAlreadyExists) {
      throw new UserAlreadyExistsError()
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