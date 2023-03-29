import { defineEventHandler, getHeader, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'Authorization')

  if (!token) {
    return createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  } else {
    return {
      token
    }
  }
})
