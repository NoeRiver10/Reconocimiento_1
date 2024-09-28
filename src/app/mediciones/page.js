"use client"; // Asegúrate de que esta línea está presente para usar hooks de estado

import { useState } from 'react';
export default function Mediciones() {

  const [campo1, setCampo1] = useState('');
  const [campo2, setCampo2] = useState('');
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log({ campo1, campo2, opcionSeleccionada });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6"> {/* Fondo y padding */}
      <h1 className="text-3xl font-bold mb-6 text-center">Mediciones</h1> {/* Título con estilo */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 mx-auto max-w-lg"> {/* Formulario con estilo */}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campo1">
            Campo 1
          </label>
          <input
            type="text"
            id="campo1"
            value={campo1}
            onChange={(e) => setCampo1(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa el valor de campo 1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="campo2">
            Campo 2
          </label>
          <input
            type="text"
            id="campo2"
            value={campo2}
            onChange={(e) => setCampo2(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa el valor de campo 2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="opcionSeleccionada">
            Selecciona una opción
          </label>
          <select
            id="opcionSeleccionada"
            value={opcionSeleccionada}
            onChange={(e) => setOpcionSeleccionada(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Seleccione...</option>
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
