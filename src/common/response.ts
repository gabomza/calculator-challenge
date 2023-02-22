import { Response } from 'express'
import httpErrors, { HttpError } from 'http-errors'

export const DefaultResponse = {
  succes: (res: Response, status = 200, message = 'OK', body = {}) => {
    res.status(status).json({
      message,
      body
    })
  },
  error: (res: Response, error?: HttpError) => {
    const internalServerError = new httpErrors.InternalServerError()
    let statusCode: number = internalServerError.statusCode
    let message: string = internalServerError.message
    if (error) {
      statusCode = error.statusCode
      message = error.message
      if (!statusCode) {
        statusCode = 500
      }
      if (!message && error.Error) {
        message = error.error
      }
    }
    res.status(statusCode).json({ message })
  }
}
