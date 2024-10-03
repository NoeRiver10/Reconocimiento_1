import React from 'react';

export default function MedicionItem({ index, formData, handleMedicionChange }) {
  // Obtén cci desde formData
  const numMediciones = formData.cci === 'SÍ' ? 4 : 3;

  return (
    <div className="border rounded-lg shadow-sm mt-4">
      <h2 className="font-semibold mb-2 text-center">Medición {index + 1}</h2>
      
      <div>
        <label>ÁREA:</label>
        <input
          type="text"
          name="area"
          value={formData.mediciones[index]?.area || ''} // Asegúrate de usar el índice correctamente
          onChange={(e) => handleMedicionChange(index, e)} // Usar handleMedicionChange
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>DEPARTAMENTO:</label>
        <input
          type="text"
          name="departamento"
          value={formData.mediciones[index]?.departamento || ''}
          onChange={(e) => handleMedicionChange(index, e)} // Usar handleMedicionChange
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>NÚMERO DE PUNTOS:</label>
        <input
          type="number"
          name="numeroPuntos"
          value={formData.mediciones[index]?.numeroPuntos || ''}
          onChange={(e) => handleMedicionChange(index, e)} // Usar handleMedicionChange
          className="border p-2 w-full"
          required
        />
      </div>
    </div>
  );
}
