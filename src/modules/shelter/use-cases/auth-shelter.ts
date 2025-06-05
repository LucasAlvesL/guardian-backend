import { InvalidCredentialsError } from "@/errors/invalid-credentials-error"
import { compare } from "bcryptjs"
import { Shelter } from "generated/prisma"
import { ShelterRepository } from "../repositories/shelter-repository"

interface AuthShelterUseCaseRequest {
  email: string
  password: string
}

interface AuthShelterUseCaseResponse {
  shelter: Shelter
}

export class AuthShelterUseCase {
  constructor(private shelterRepository: ShelterRepository) { }

  async execute({ email, password }: AuthShelterUseCaseRequest): Promise<AuthShelterUseCaseResponse> {
    const shelter = await this.shelterRepository.findByEmail(email)

    if (!shelter) throw new InvalidCredentialsError()

    const passwordMatch = await compare(password, shelter.password_hash)

    if (!passwordMatch) throw new InvalidCredentialsError()

    return { shelter }
  }
}