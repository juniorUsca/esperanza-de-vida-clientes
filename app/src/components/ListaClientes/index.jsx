import { DateTime } from 'luxon';

export default function ListaClientes({ data, loading, error }) {
  const clientes = data?.responseDetail

  const now = DateTime.local();
  return (
    <ul>
      {loading && <p>Cargando...</p>}
      {error && <p>Error :(</p>}
      {clientes && clientes.map(cliente => (
        <li key={cliente.id} className="bg-white border rounded-xl shadow-md p-4 m-4">
          <p><strong>Nombre:</strong> {cliente.nombre}</p>
          <p><strong>Apellido:</strong> {cliente.apellido}</p>
          <p><strong>Fecha Nacimiento:</strong> {cliente.fechaNacimiento} 👶</p>
          <p><strong>Edad:</strong> {Math.ceil(now.diff(DateTime.fromSQL(cliente.fechaNacimiento), 'years').years)}</p>
          <p><strong>Fecha Estimada Fallecimiento:</strong> {cliente.fechaEstimadaFallecimiento} ☠️</p>
          <p><strong>Edad Estimada Fallecimiento:</strong> {Math.ceil(DateTime.fromSQL(cliente.fechaEstimadaFallecimiento).diff(DateTime.fromSQL(cliente.fechaNacimiento), 'years').years)}</p>
        </li>
      ))}
    </ul>
  )
}