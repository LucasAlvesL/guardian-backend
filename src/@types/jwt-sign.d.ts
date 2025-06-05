import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    shelter: {
      sub: string
    }
  }
}