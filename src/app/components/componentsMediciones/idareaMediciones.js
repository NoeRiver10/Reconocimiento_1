import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function IdAreaMediciones({ formData, handleChange }) {
  useEffect(() => {
    console.log('IdAreaMediciones se ha renderizado');
    console.log('formData:', formData);
  }, [formData]);

  return (
    <div className="border rounded-lg shadow-sm mt-4">
      <h2 className="font-semibold mb-2 text-center">ÁREA ILUMINADA</h2>
      <div>
        <label>ÁREA:</label>
        <input
          type="text"
          name="area"
          value={formData.area || ''} // Asegúrate de usar formData.area aquí
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>DEPARTAMENTO:</label>
        <input
          type="text"
          name="departamento"
          value={formData.departamento}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>NÚMERO DE PUNTOS:</label>
        <input
          type="number"
          name="numeroPuntos"
          value={formData.numeroPuntos}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
    </div>
  );
}
