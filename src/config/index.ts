export const PORT = process.env.PORT || ''
export const MONGO_DB_URI = (process.env.MONGO_DB_URI || '')
  .replace('<username>', process.env.MONGO_DB_USER || '')
  .replace('<password>', process.env.MONGO_DB_PASSWORD || '')
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || ''
