import React, { useState } from 'react';
import DatosPuesto from './DatosPuesto';

const FormularioPuestos = () => {
  const [puestos, setPuestos] = useState([
    { id: 1, data: { puestoTrabajador: '', numTrabajadores: '', descripcionActividades: '', nivelMinimoIluminacion: '' }, visible: true, isPermanent: true }
  ]);

  const addPuesto = () => {
    setPuestos([
      ...puestos,
      { id: puestos.length + 1, data: { puestoTrabajador: '', numTrabajadores: '', descripcionActividades: '', nivelMinimoIluminacion: '' }, visible: true, isPermanent: false }
    ]);
  };

  const handleChange = (id, updatedField, value) => {
    setPuestos((prevPuestos) =>
      prevPuestos.map((puesto) =>
        puesto.id === id ? { ...puesto, data: { ...puesto.data, [updatedField]: value } } : puesto
      )
    );
  };

  const toggleSection = (id) => {
    setPuestos((prevPuestos) =>
      prevPuestos.map((puesto) =>
        puesto.id === id && !puesto.isPermanent ? { ...puesto, visible: !puesto.visible } : puesto
      )
    );
  };

  const deletePuesto = (id) => {
    setPuestos((prevPuestos) => prevPuestos.filter((puesto) => puesto.id !== id || puesto.isPermanent));
  };

  return (
    <div>
      {puestos.map((puesto) => (
        <div key={puesto.id} className="mb-4 border rounded-lg shadow-sm">
          {puesto.id === 1 ? (
            <div className="flex justify-between items-center">
              <h2 className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg text-center">Datos del Puesto 1</h2>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg"
                onClick={() => toggleSection(puesto.id)}
              >
                {puesto.visible ? `Ocultar Datos del Puesto ${puesto.id}` : `Mostrar Datos del Puesto ${puesto.id}`}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => deletePuesto(puesto.id)}
              >
                Eliminar
              </button>
            </div>
          )}
          {puesto.visible && (
            <div className="p-4">
              <DatosPuesto
                formData={puesto.data}
                handleChange={(field, value) => handleChange(puesto.id, field, value)}
                visible={puesto.visible}
              />
              {puesto.id === 1 && (
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={addPuesto}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Agregar Nuevo Puesto
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormularioPuestos;
