import express from 'express'

import {
  createClient, getAllClients, getKpis,
} from '../components/client/controller'

const router = express.Router()

router.post(
  '/client',
  // mapperHandler(createClientMapper),
  createClient,
)

router.get(
  '/client',
  // validateRequest
  getAllClients,
)

router.get(
  '/kpis',
  // validateRequest
  getKpis,
)

export default router
