import Debug from 'debug'
import ClientRepository from './infrastructure/ClientRepository'
import EsperanzaDeVidaRepository from './infrastructure/EsperanzaDeVidaRepository'
import KpiRepository from './infrastructure/KpiRepository'

import CreateClient from './application/CreateClient'
import GetAllClients from './application/GetAllClients'
import GetKpis from './application/GetKpis'

/**
 * @typedef {import('express').Request & {idTrx: string}} req
 * @typedef {import('express').Response} res
 * @typedef {import('express').NextFunction} next
 */

const clientRepository = new ClientRepository()
const esperanzaDeVidaRepository = new EsperanzaDeVidaRepository()
const kpiRepository = new KpiRepository()

/**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
export const createClient = async (req, res, next) => {
  const debug = Debug(`CreateClient ${req.idTrx}`)
  try {
    debug('starterData: %o', req.body)
    const executeCreateClient = CreateClient({
      clientRepository,
      esperanzaDeVidaRepository,
    })
    const responseDetail = await executeCreateClient(req.body)
    debug('responseDetail: %o', responseDetail)
    res.status(201).json({
      responseCode: '00',
      responseDetail,
    })
  } catch (e) {
    next(e)
  }
}

/**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
export const getAllClients = async (req, res, next) => {
  const debug = Debug(`GetAllClients ${req.idTrx}`)
  try {
    debug('starterData: %o', req.body)
    const executeGetAllClients = GetAllClients({ clientRepository })
    const responseDetail = await executeGetAllClients(req.body)
    debug('responseDetail: %o', responseDetail)
    res.status(200).json({
      responseCode: '00',
      responseDetail,
    })
  } catch (e) {
    next(e)
  }
}

/**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
export const getKpis = async (req, res, next) => {
  const debug = Debug(`GetKpis ${req.idTrx}`)
  try {
    debug('starterData: %o', req.body)
    const executeGetKpis = GetKpis({ kpiRepository })
    const responseDetail = await executeGetKpis(req.body)
    debug('responseDetail: %o', responseDetail)
    res.status(200).json({
      responseCode: '00',
      responseDetail,
    })
  } catch (e) {
    next(e)
  }
}
