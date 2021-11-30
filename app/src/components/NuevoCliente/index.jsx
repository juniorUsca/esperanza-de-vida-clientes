import { useState } from 'react';
import { DateTime } from 'luxon';
import Button from 'devextreme-react/button';
import { TextBox } from 'devextreme-react/text-box';
import { DateBox } from 'devextreme-react/date-box';

export default function NuevoCliente({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(DateTime.local().minus({ years: 18 }).toJSDate());

  const edad = fechaNacimiento
    ? Math.ceil(DateTime.local().diff(DateTime.fromJSDate(fechaNacimiento), 'years').years)
    : '';
  const handleSubmit = async (e) => {
    await onSubmit(e)
    setNombre('')
    setApellido('')
    setFechaNacimiento(DateTime.local().minus({ years: 18 }).toJSDate())
  }
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 align-center items-center">
      <div className="form-group">
        <label>Nombre: </label>
        <TextBox
          name="nombre"
          placeholder="Nombre"
          value={nombre}
          onValueChanged={(e) => setNombre(e.value)}
        />
      </div>
      <div className="form-group">
        <label>Apellido: </label>
        <TextBox
          name="apellido"
          placeholder="Apellido"
          value={apellido}
          onValueChanged={(e) => setApellido(e.value)}
        />
      </div>
      <div className="form-group">
        <label>Fecha Nacimiento: </label>
        <DateBox
          name="fechaNacimiento"
          value={fechaNacimiento}
          onValueChanged={(e) => setFechaNacimiento(e.value)}
        />
      </div>
      <div className="form-group text-center">
        <label>Edad:</label>
        {' '}
        <span>{edad}</span>
      </div>
      <div>
        <Button
          width="100%"
          type="default"
          useSubmitBehavior
          text="Guardar"
        />
      </div>
    </form>
  )
}