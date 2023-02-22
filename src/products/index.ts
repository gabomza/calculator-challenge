import express from 'express'

import { ProductsController } from './controller'

const router = express.Router()

export const ProductsAPI = () => {
  router
    .get('/', ProductsController.getProducts)
    .get('/:id', ProductsController.getProduct)
    .post('/', ProductsController.createProduct)
    .put('/:id', ProductsController.updateProduct)
    .delete('/:id', ProductsController.deleteProduct)

  // app.use("/api/products", router);
  return router
}
