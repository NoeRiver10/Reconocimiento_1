import React from 'react';

export default function IluminacionMediciones({ formData, handleChange, toggleSection, visibleSections }) {
  return (
    <div className="border rounded-lg shadow-sm">
      <button type="button" className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('tipoIluminaria')}>
        Iluminación 
      </button>
      {visibleSections.tipoIluminaria && (
        <div className="bg-gray-100 p-4 mt-2 dark:bg-gray-800">
          <h2 className="font-semibold mb-2 text-center">TIPO DE ILUMINACIÓN</h2>
          <div>
            <label>TIPO DE ILUMINACIÓN:</label>
            <select
              name="tipoIluminacion" // Cambiado a 'tipoIluminacion'
              value={formData.tipoIluminacion} // Cambiado a 'tipoIluminacion'
              onChange={handleChange}
              className="border p-2 w-full">
              <option value="ARTIFICIAL">ARTIFICIAL</option>
              <option value="COMBINADA">COMBINADA</option>
            </select>
          </div>
          <div>
            <label>¿EXISTE CCI?:</label>
            <select
              name="cci" // Cambiado a 'cci'
              value={formData.cci} // Cambiado a 'cci'
              onChange={formData.tipoIluminacion === 'ARTIFICIAL' ? undefined : handleChange} 
              className="border p-2 rounded w-full"
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
