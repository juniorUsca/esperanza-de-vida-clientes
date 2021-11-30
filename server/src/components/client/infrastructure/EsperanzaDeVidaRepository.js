import axios from 'axios'

export default class ClientRepository {
  constructor () {
    this.rangos = [
      [0, 1],
      [1, 4],
      [95, 115],
    ]
    for (let i = 5; i < 95; i += 5) {
      this.rangos.push([i, i + 4])
    }
  }

  /**
   * Esperanza de vida obtenida de la base de datos de la BBC
   * https://www.bbc.com/mundo/noticias-44124466
   *
   * @param {object} data
   * @param {number} data.edad
   */
  async findByEdad ({ edad }) {
    if (edad < 0 || edad > 115) throw new Error('Edad fuera de rango')
    // buscar rango
    const rangoEdad = this.rangos.find(rango => {
      if (edad >= rango[0] && edad <= rango[1]) {
        return true
      }
      return false
    })

    // obtener esperanza
    const inicio = rangoEdad[0]
    const fin = rangoEdad[1] === 115 ? 'plus' : rangoEdad[1]
    const { data } = await axios.get(`https://news.files.bbci.co.uk/include/newsspec/11349-life-expectancy/assets/project-assets/data/age-bands/${inicio}-${fin}.json`)

    return data.south_america.PER.n.le
  }
}
