export class ShelterAlreadyExistsError extends Error {
  constructor() { super("Shelter already exists.") }
}