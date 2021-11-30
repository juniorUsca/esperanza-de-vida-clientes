import NuevoCliente from './components/NuevoCliente'
import Kpis from './components/Kpis'
import ListaClientes from './components/ListaClientes'
import useFetch from './hooks/useFetch'

import notify from 'devextreme/ui/notify';

import './App.css'

function App() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const { data: clientes, loading: loadingClientes, error: errorClientes, refetch: refetchClientes } = useFetch(baseUrl + '/client')

  const { data: kpis, loading: loadingKpis, error: errorKpis, refetch: refetchKpis } = useFetch(baseUrl + '/kpis')

  const handleNuevoCLiente = async (e) => {
    e.preventDefault()
    const cliente = {
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      fechaNacimiento: e.target.fechaNacimiento.value,
    }
    const resp = await fetch(baseUrl + '/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
    const jsonResp = await resp.json()
    if(jsonResp?.responseCode === '00') {
      notify("Cliente creado", "success", 1000)
      refetchClientes()
      refetchKpis()
      return
    }
    notify("Ocurrio un error", "error", 1000)
  }

  return (
    <div className="flex flex-col">
      <div className="mx-2 md:mx-32 xl:mx-96 my-8">
        <NuevoCliente onSubmit={handleNuevoCLiente} />
      </div>
      <div className="mx-2 md:mx-32 xl:mx-96">
        <Kpis data={kpis}/>
      </div>
      <div className="mx-2 md:mx-32 xl:mx-96">
        <ListaClientes data={clientes} loading={loadingClientes} error={errorClientes} />
      </div>
    </div>
  )
}

export default App
