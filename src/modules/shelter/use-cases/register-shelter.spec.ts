import { ShelterAlreadyExistsError } from "@/errors/shelter-already-exists-error"
import { compare } from "bcryptjs"
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryShelterRepository } from "../repositories/in-memory/in-memory-shelter-repository"
import { RegisterShelterUseCase } from "./register-shelter"

let shelterRepository: InMemoryShelterRepository
let sut: RegisterShelterUseCase

describe('Register Use Case', _ => {
  beforeEach(() => {
    shelterRepository = new InMemoryShelterRepository()
    sut = new RegisterShelterUseCase(shelterRepository)
  })

  it('Should hash shelter password upon registration', async _ => {
    const { shelter } = await sut.execute({
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 1000,
      email: 'shelter1@example.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = await compare('123456', shelter.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not allow duplicate emails', async _ => {
    const email = 'shelter1@example.com'

    await sut.execute({
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 1000,
      email: 'shelter1@example.com',
      password: '123456'
    })

    await expect(() => sut.execute({
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 1000,
      email: 'shelter1@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(ShelterAlreadyExistsError)
  })

  it('Should be able to register a shelter', async _ => {
    const { shelter } = await sut.execute({
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 1000,
      email: 'shelter1@example.com',
      password: '123456'
    })

    expect(shelter.id).toEqual(expect.any(String))
  })

  it('Should not allow duplicate latitude and longitude', async _ => {
    await sut.execute({
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 1000,
      email: 'shelter1@example.com',
      password: '123456'
    })

    await expect(() => sut.execute({
      name: 'Shelter 2',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 500,
      email: 'shelter2@example.com',
      password: '654321'
    })).rejects.toThrowError('Shelter already exists at this location')
  })

  it('Should not be able to register a shelter if capacity is less than 1', async _ => {
    await expect(() => sut.execute({
      name: 'Shelter 1',
      latitude: 1.234,
      longitude: 5.678,
      capacity: 0,
      email: 'shelter1@example.com',
      password: '123456'
    })).rejects.toThrowError('Capacity must be greater than zero')
  })
})