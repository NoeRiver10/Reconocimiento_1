import React from 'react';

const DimensionesArea = ({ formData, handleChange, visible, toggleSection, calculateMinAreas, calculateMaxAreas }) => {
  const handleToggle = () => toggleSection('dimensiones');

  return (
    <div className="border rounded-lg shadow-sm">
      <button type="button" className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={handleToggle}>
        Dimensiones del Área
      </button>
      {visible && (
        <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
          <h2 className="font-semibold mb-2 text-center">DIMENSIONES DEL ÁREA</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label>ALTURA (mts):</label>
              <input
                type="number"
                name="altura"
                value={formData.altura}
                onChange={handleChange}
                min="0" // Asegura que la altura sea positiva
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>LARGO (mts):</label>
              <input
                type="number"
                name="largo"
                value={formData.largo}
                onChange={handleChange}
                min="0" // Asegura que el largo sea positivo
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>ANCHO (mts):</label>
              <input
                type="number"
                name="ancho"
                value={formData.ancho}
                onChange={handleChange}
                min="0" // Asegura que el ancho sea positivo
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>ÍNDICE DE ÁREA (IC):</label>
              <div className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-200 text-gray-700">
                {formData.indiceArea !== undefined ? formData.indiceArea.toFixed(2) : "0.00"}
              </div>
            </div>
            <div>
              <label>MÍNIMO DE ÁREAS:</label>
              <div className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-200 text-gray-700">
                {calculateMinAreas(formData.indiceArea) !== undefined 
                  ? Math.max(0, Math.floor(calculateMinAreas(formData.indiceArea))) : "0"}
              </div>
            </div>
            <div>
              <label>MÁXIMO DE ÁREAS:</label>
              <div className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-200 text-gray-700">
                {calculateMaxAreas(formData.indiceArea) !== undefined 
                  ? Math.max(0, Math.floor(calculateMaxAreas(formData.indiceArea))) : "0"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DimensionesArea;
