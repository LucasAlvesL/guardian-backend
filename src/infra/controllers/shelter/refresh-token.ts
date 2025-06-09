import { FastifyReply, FastifyRequest } from 'fastify'

interface UserPayload {
  sign: {
    sub: string
  }
}

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const shelter = request.user as UserPayload

  if (!shelter?.sign?.sub) {
    return reply.status(400).send({ error: 'Invalid or missing shelter information in token' })
  }

  const token = await reply.jwtSign({
    sign: {
      sub: shelter.sign.sub,
    },
  })

  const refreshToken = await reply.jwtSign({
    sign: {
      sub: shelter.sign.sub,
      expiresIn: '7d',
    },
  })

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}