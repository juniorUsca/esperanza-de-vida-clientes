import { DateTime } from 'luxon'

/**
 * @param {object} params
 * @param {import('../infrastructure/ClientRepository').default} params.clientRepository
 * @returns {() => Promise.<Array.<{
 *  id: string, nombre: string, apellido: string, fechaNacimiento: string
 * }>>}
 */
export default ({ clientRepository }) => async () => {
  const transactionResult = await clientRepository.getAllClients()
  console.log({ transactionResult })
  return transactionResult.map(client => ({
    id: client.id,
    nombre: client.nombre,
    apellido: client.apellido,
    fechaNacimiento: DateTime.fromJSDate(client.fechaNacimiento).toFormat('yyyy-LL-dd'),
  }))
}
