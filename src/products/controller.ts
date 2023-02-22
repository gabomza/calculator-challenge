import { ProductsService } from './services'

import Debug from 'debug'
const debug = Debug('app:productsController')

import { DefaultResponse } from '../common/response'

import httpErrors from 'http-errors'
import { Request, Response } from 'express'

export const ProductsController = {
  getProducts: async (_req: Request, res: Response) => {
    try {
      const products = await ProductsService.getAll()
      DefaultResponse.succes(res, 200, 'Products List', products)
    } catch (error) {
      debug('Error retrieving products', error)
      DefaultResponse.error(res)
    }
  },
  getProduct: async (req: Request, res: Response) => {
    try {
      const { params } = req
      const product = await ProductsService.getById(params.id)
      if (!product) {
        // Response.error(res, { statusCode: 404, message: "Product not found." });
        DefaultResponse.error(res, new httpErrors.NotFound())
        return
      }
      DefaultResponse.succes(res, 200, `Product id ${product._id}`, product)
    } catch (error) {
      console.log('catch')
      debug(error)
      DefaultResponse.error(res)
    }
  },
  createProduct: async (req: Request, res: Response) => {
    try {
      const { body } = req
      if (!body || Object.keys(body).length !== 3) {
        DefaultResponse.error(res, new httpErrors.BadRequest())
      } else {
        const insertedId = await ProductsService.create(body)
        DefaultResponse.succes(res, 201, 'Inserted ID', insertedId)
      }
    } catch (error) {
      debug(error)
      DefaultResponse.error(res)
    }
  },
  updateProduct: async (req: Request, res: Response) => {
    try {
      const { body, params } = req
      if (!body || Object.keys(body).length !== 3 || !params?.id) {
        DefaultResponse.error(res, new httpErrors.BadRequest())
      } else {
        const result = await ProductsService.update(params.id, body)
        DefaultResponse.succes(res, 200, `Updated product ${params.id}`, result)
      }
    } catch (error) {
      debug(error)
      DefaultResponse.error(res)
    }
  },
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { params } = req
      if (!params?.id) {
        DefaultResponse.error(res, new httpErrors.BadRequest())
      } else {
        const deletedCount = await ProductsService.remove(params.id)
        if (deletedCount === 1) {
          DefaultResponse.succes(res, 200, `Product ${params.id} successfully removed.`)
        } else {
          DefaultResponse.error(res, new httpErrors.NotFound())
        }
      }
    } catch (error) {
      debug(error)
      DefaultResponse.error(res)
    }
  }
}
