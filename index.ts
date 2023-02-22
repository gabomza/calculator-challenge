import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

import express from 'express'
import { PORT } from './src/config'
import { IndexAPI, NotFoundAPI } from './src/base/index'
import { ProductsAPI } from './src/products'

import Debug from 'debug'
const debug = Debug('app:main')

const app = express()

app.use(express.json())

app.use('/', IndexAPI())
app.use('/api/products', ProductsAPI())
app.use('/', NotFoundAPI())

app.listen(PORT, () => {
  debug(`Server started in port ${PORT}`)
})
