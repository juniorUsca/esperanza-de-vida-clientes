import express from 'express'
import cors from 'cors'

import contextHandler from './utils/middlewares/contextHandler'
import morganHandler from './utils/middlewares/morganHandler'
import notFoundHandler from './utils/middlewares/notFoundHandler'
import errorHandler from './utils/middlewares/errorHandler'

import { config } from './config'

import clientApi from './routes/client'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(contextHandler)
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://smp-clientes.web.app',
  ],
}))
app.use(morganHandler)

app.use('/api/', clientApi)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(config.port, '0.0.0.0', () => {
  console.log(`listening http://0.0.0.0:${config.port}`)
})
