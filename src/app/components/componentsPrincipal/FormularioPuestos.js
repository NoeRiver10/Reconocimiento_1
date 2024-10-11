import React, { useState, useEffect } from 'react';
import DatosPuesto from './DatosPuesto';

const FormularioPuestos = ({ puestos = [], handleSavePuestos }) => {
  const [puestosState, setPuestosState] = useState([]);

  useEffect(() => {
    if (puestos && puestos.length > 0) {
      setPuestosState(puestos);
    }
  }, [puestos]);

  const addPuesto = () => {
    setPuestosState((prevPuestos) => [
      ...prevPuestos,
      {
        id: prevPuestos.length + 1,
        puestoTrabajador: '',
        numTrabajadores: '',
        descripcionActividades: '',
        nivelMinimoIluminacion: '',
        tareaVisual: '',
        visible: true,
        isPermanent: false,
      },
    ]);
  };

  const handleChange = (id, updatedField, value) => {
    setPuestosState((prevPuestos) =>
      prevPuestos.map((puesto) =>
        puesto.id === id ? { ...puesto, [updatedField]: value } : puesto
      )
    );
  };

  const handleNivelMinimoIluminacionChange = (id, value) => {
    const illuminationDescriptions = {
      20: 'En exteriores: distinguir el área de tránsito, desplazarse caminando, vigilancia, movimiento de vehículos.',
      50: 'En interiores: distinguir el área de tránsito, desplazarse caminando, vigilancia, movimiento de vehículos.',
      100: 'En interiores.',
      200: 'Requerimiento visual simple: inspección visual, recuento de piezas, trabajo en banco y máquina.',
      300: 'Distinción moderada de detalles: ensamble simple, trabajo medio en banco y máquina, inspección simple, empaque y trabajos de oficina.',
      500: 'Distinción clara de detalles: maquinado y acabados delicados, ensamble de inspección moderadamente difícil, captura y procesamiento de información, manejo de instrumentos y equipo de laboratorio.',
      750: 'Distinción fina de detalles: maquinado de precisión, ensamble e inspección de trabajos delicados, manejo de instrumentos y equipo de precisión, manejo de piezas pequeñas.',
      1000: 'Alta exactitud en la distinción de detalles: ensamble, proceso e inspección de piezas pequeñas y complejas, acabado con pulidos finos.',
      2000: 'Alto grado de especialización en la distinción de detalles.'
    };

    setPuestosState((prevPuestos) =>
      prevPuestos.map((puesto) =>
        puesto.id === id
          ? {
              ...puesto,
              nivelMinimoIluminacion: value,
              tareaVisual: illuminationDescriptions[value] || '',
            }
          : puesto
      )
    );
  };

  const toggleSection = (id) => {
    setPuestosState((prevPuestos) =>
      prevPuestos.map((puesto) =>
        puesto.id === id ? { ...puesto, visible: !puesto.visible } : puesto
      )
    );
  };

  const deletePuesto = (id) => {
    setPuestosState((prevPuestos) => prevPuestos.filter((puesto) => puesto.id !== id || puesto.isPermanent));
  };

  const handleSaveAllPuestos = () => {
    if (handleSavePuestos) {
      handleSavePuestos(puestosState);
    }
    console.log('Datos de puestos guardados desde el botón principal:', puestosState);
  };

  return (
    <div>
      {puestosState.map((puesto) => (
        <div key={puesto.id} className="mb-4 border rounded-lg shadow-sm">
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg"
              onClick={() => toggleSection(puesto.id)}
            >
              {puesto.visible ? `Ocultar Datos del Puesto ${puesto.id}` : `Mostrar Datos del Puesto ${puesto.id}`}
            </button>
            {puesto.id !== 1 && (
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => deletePuesto(puesto.id)}
              >
                Eliminar
              </button>
            )}
          </div>
          {puesto.visible && (
            <div className="p-4">
              <DatosPuesto
                formData={puesto}
                handleChange={(field, value) =>
                  field === 'nivelMinimoIluminacion'
                    ? handleNivelMinimoIluminacionChange(puesto.id, value)
                    : handleChange(puesto.id, field, value)
                }
                visible={puesto.visible}
                toggleSection={() => toggleSection(puesto.id)}
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
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handleSaveAllPuestos}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Guardar Todos los Puestos
        </button>
      </div>
    </div>
  );
};

export default FormularioPuestos;
