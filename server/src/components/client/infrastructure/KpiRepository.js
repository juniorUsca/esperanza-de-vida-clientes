import FirestoreDB from '../../../lib/firestore'

export default class KpiRepository {
  constructor () {
    this.collection = 'kpis'
    this.db = new FirestoreDB()
  }

  async getKpis () {
    const valores = await this.db.get(this.collection, 'valores')
    const data = valores.data() ?? {
      sumaEdades: 0,
      cantidadEdades: 0,
      promedioEdades: 0,
      desviacionEstandarEdades: 0,
    }
    return {
      sumaEdades: data.sumaEdades || 0,
      cantidadEdades: data.cantidadEdades || 0,
      promedioEdades: data.promedioEdades || 0,
      desviacionEstandarEdades: data.desviacionEstandarEdades || 0,
    }
  }
}
