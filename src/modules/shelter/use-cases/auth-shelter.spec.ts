import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryShelterRepository } from "../repositories/in-memory/in-memory-shelter-repository"
import { AuthShelterUseCase } from "./auth-shelter"

let shelterRepository: InMemoryShelterRepository
let sut: AuthShelterUseCase

describe('Authenticate Use Case', _ => {
  beforeEach(() => {
    shelterRepository = new InMemoryShelterRepository()
    sut = new AuthShelterUseCase(shelterRepository)
  })

  it('Should be able to authenticate a shelter', async _ => {
    await shelterRepository.create({
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 1000,
      email: 'shelter1@example.com',
      password_hash: await hash('123456', 6)
    })

    const { shelter } = await sut.execute({
      email: 'shelter1@example.com',
      password: '123456'
    })

    expect(shelter.id).toEqual(expect.any(String))
  })

  it('Should be able to authenticate with wrong email', async _ => {
    await expect(() => sut.execute({
      email: 'shelter2@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should be able to authenticate with wrong password', async _ => {
    await shelterRepository.create({
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 1000,
      email: 'shelter1@example.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => sut.execute({
      email: 'shelter1@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})