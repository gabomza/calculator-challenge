import { getDatabaseCollection } from '../database'
import { ObjectId } from 'mongodb'

import { PRODUCTS_COLLECTION } from '../common/variables'

export interface IProduct {
  id: string
}

const getAll = async () => {
  const collection = await getDatabaseCollection(PRODUCTS_COLLECTION)
  return collection.find({}).toArray()
}

const getById = async (id: string) => {
  const collection = await getDatabaseCollection(PRODUCTS_COLLECTION)
  return collection.findOne({ _id: new ObjectId(id) })
}

const create = async (product: IProduct) => {
  const collection = await getDatabaseCollection(PRODUCTS_COLLECTION)
  const result = await collection.insertOne(product)
  return result.insertedId
}

const update = async (id: string, product: IProduct) => {
  const collection = await getDatabaseCollection(PRODUCTS_COLLECTION)
  const filter = { _id: new ObjectId(id) }

  const updateDoc = {
    $set: product
  }

  const result = await collection.updateOne(filter, updateDoc)
  const { matchedCount, modifiedCount } = result
  return {
    matchedCount,
    modifiedCount
  }
}

const remove = async (id: string) => {
  const collection = await getDatabaseCollection(PRODUCTS_COLLECTION)
  const filter = { _id: new ObjectId(id) }
  const result = await collection.deleteOne(filter)
  return result.deletedCount
}

export const ProductsService = {
  getAll,
  getById,
  create,
  update,
  remove
}
