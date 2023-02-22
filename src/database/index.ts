import { MongoClient } from 'mongodb'
import { MONGO_DB_NAME, MONGO_DB_URI } from '../config'
import Debug from 'debug'
const debug = Debug('app:module-database')

export const getDatabaseCollection = async (collection: string) => {
  const client = new MongoClient(MONGO_DB_URI)
  await client.connect()
  debug('DB connecton established')
  const db = client.db(MONGO_DB_NAME)
  const selectedCollection = db.collection(collection)
  return selectedCollection
}
