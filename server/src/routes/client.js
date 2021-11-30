import express from 'express'
// import mapperHandler from '../utils/middlewares/mapperHandler'

import {
  createClient, getAllClients, getKpis,
} from '../components/client/controller'

// import {
//   createAccountMapper,
//   submitTransactionMapper,
//   submitBulkTransactionsMapper,
//   getAccountMapper,
//   getAccountMovementsMapper,
//   getLenderMovementsMapper,
// } from '../components/account/domain/mappers'

const router = express.Router()

router.post(
  '/client',
  // mapperHandler(createAccountMapper),
  createClient,
)

router.get(
  '/client',
  // validateRequest
  // mapperHandler(submitTransactionMapper),
  getAllClients,
)

router.get(
  '/kpis',
  // validateRequest
  // mapperHandler(submitTransactionMapper),
  getKpis,
)

export default router
