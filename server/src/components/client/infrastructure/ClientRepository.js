import {
  Timestamp,
  // eslint-disable-next-line import/no-unresolved
} from 'firebase-admin/firestore'
import FirestoreDB from '../../../lib/firestore'

export default class ClientRepository {
  constructor () {
    this.collection = 'clientes'
    this.db = new FirestoreDB()
  }

  /**
   * @param {object} data
   * @param {string} data.nombre
   * @param {string} data.apellido
   * @param {Date} data.fechaNacimiento
   */
  async createClient (data) {
    const res = await this.db.create(this.collection, {
      ...data,
      fechaNacimiento: Timestamp.fromDate(data.fechaNacimiento),
    })
    return {
      id: res.id,
    }
  }

  async getAllClients () {
    const res = await this.db.getAll(this.collection)
    const clients = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })).map(client => ({
      ...client,
      ...client.fechaNacimiento && { fechaNacimiento: client.fechaNacimiento.toDate() },
      ...client.fechaEstimadaFallecimiento && {
        fechaEstimadaFallecimiento: client.fechaEstimadaFallecimiento.toDate(),
      },
    }))
    return clients
  }
}
