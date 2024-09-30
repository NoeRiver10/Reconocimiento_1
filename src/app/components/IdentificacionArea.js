// src/app/components/IdentificacionArea.js

import React from 'react';

const IdentificacionArea = ({ formData, handleChange, visible, toggleSection }) => {
  return (
    <div className="border rounded-lg shadow-sm">
      <button
        type="button"
        className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg"
        onClick={toggleSection}
      >
        Identificación del Área
      </button>
      {visible && (
        <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
          <h2 className="font-semibold mb-2 text-center">IDENTIFICACIÓN DEL ÁREA</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label>ID DE ÁREA:</label>
              <input
                type="number"
                name="idArea"
                value={formData.idArea}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>ÁREA ILUMINADA:</label>
              <input
                type="text"
                name="areaIluminada"
                value={formData.areaIluminada}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>NÚMERO DE PUNTOS A EVALUAR:</label>
              <input
                type="number"
                name="numPuntosEvaluar"
                value={formData.numPuntosEvaluar}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>TIPO DE ILUMINACIÓN:</label>
              <select
                name="tipoIluminacion"
                value={formData.tipoIluminacion}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="ARTIFICIAL">ARTIFICIAL</option>
                <option value="COMBINADA">COMBINADA</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentificacionArea;
