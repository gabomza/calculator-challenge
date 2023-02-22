import express from 'express'
import { DefaultResponse } from '../common/response'
import httpErrors from 'http-errors'

export const IndexAPI = () => {
  const router = express.Router()
  router.get('/', (req, res) => {
    const apis = {
      products: `https://${req.headers.host}/api/products`
    }
    DefaultResponse.succes(res, 200, 'Products Management API', apis)
  })
  return router
}

export const NotFoundAPI = () => {
  const router = express.Router()
  router.all('*', (_req, res) => {
    DefaultResponse.error(res, new httpErrors.NotFound())
  })
  return router
}
