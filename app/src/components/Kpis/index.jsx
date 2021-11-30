export default function Kpis({ data, loading, error }) {
  const kpis = data?.responseDetail
  console.log(kpis)

  if (!data) return <div>Loading...</div>

  return (
    <section className="flex justify-around">
      <article className="max-w-xs w-full bg-blue-400 px-4 py-6 border rounded-lg text-center text-white">
        <p className="text-4xl font-semibold">{kpis.promedioEdades.toFixed(2)}</p>
        <h2 className="text-white">Promedio de Edades</h2>
      </article>
      <article className="max-w-xs w-full bg-pink-400 px-4 py-6 border rounded-lg text-center text-white">
        <p className="text-4xl font-semibold">{kpis.desviacionEstandarEdades.toFixed(2)}</p>
        <h2 className="text-white">Desviación Estandar</h2>
      </article>
    </section>
  )
}