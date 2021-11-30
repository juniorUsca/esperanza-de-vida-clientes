import Debug from 'debug'
import { DateTime } from 'luxon'

const debug = Debug('app:CreateClient')
/**
 * @typedef {object} Data
 * @property {string} nombre
 * @property {string} apellido
 * @property {string} fechaNacimiento
 */

/**
 * @param {object} params
 * @param {import('../infrastructure/ClientRepository').default} params.clientRepository
 * @param {
 *  import('../infrastructure/EsperanzaDeVidaRepository').default
 * } params.esperanzaDeVidaRepository
 * @returns {(args: Data) => Promise.<boolean>}
 */
export default ({
  clientRepository,
  esperanzaDeVidaRepository,
}) => async data => {
  const { nombre, apellido, fechaNacimiento } = data

  const nacimiento = DateTime.fromSQL(fechaNacimiento)
  const edad = DateTime.now().diff(nacimiento, 'years').years
  debug({ edad })

  const esperanzaDeVida = await esperanzaDeVidaRepository.findByEdad({
    edad,
  })
  const fechaEstimadaFallecimiento = nacimiento.plus({ years: edad + esperanzaDeVida }).toJSDate()

  const transactionResult = await clientRepository.createClient({
    nombre,
    apellido,
    fechaNacimiento: nacimiento.toJSDate(),
    fechaEstimadaFallecimiento,
  })

  debug({ transactionResult })
  return {
    ...data,
    fechaEstimadaFallecimiento,
    id: transactionResult.id,
  }
}
