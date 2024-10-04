import React from 'react';

export default function IluminacionMediciones({ formData, handleChange, toggleSection, visibleSections }) {
  return (
    <div className="border rounded-lg shadow-sm">
      <button
        type="button"
        className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg"
        onClick={() => toggleSection('iluminacion')}
      >
        Iluminación
      </button>
      {visibleSections.iluminacion && (
        <div className="bg-gray-100 p-4 mt-2 dark:bg-gray-800">
          <h2 className="font-semibold mb-2 text-center">TIPO DE ILUMINACIÓN</h2>
          <div className="mb-4">
            <label className="block mb-1">TIPO DE ILUMINACIÓN:</label>
            <select
              name="tipoIluminacion"
              value={formData.tipoIluminacion}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="ARTIFICIAL">ARTIFICIAL</option>
              <option value="COMBINADA">COMBINADA</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">¿EXISTE CCI?:</label>
            <select
              name="cci"
              value={formData.cci}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${formData.tipoIluminacion === 'ARTIFICIAL' ? 'bg-gray-200 cursor-not-allowed' : ''}`}
              disabled={formData.tipoIluminacion === 'ARTIFICIAL'}
            >
              <option value="SÍ">SÍ</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
