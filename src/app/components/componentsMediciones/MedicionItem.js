import React, { useState, useEffect } from 'react';

export default function MedicionItem({ index, formData, handleMedicionChange }) {
  const [numMediciones, setNumMediciones] = useState(0);

  // Configurar el número de mediciones según el tipo de iluminación y CCI
  useEffect(() => {
    let count = 0;

    if (formData.tipoIluminacion === 'ARTIFICIAL') {
      count = 1; // Solo una vez para el tipo de iluminación artificial
    } else if (formData.tipoIluminacion === 'COMBINADA') {
      count = formData.cci === 'SÍ' ? 4 : 3;
    }

    setNumMediciones(count);
  }, [formData.tipoIluminacion, formData.cci, formData.numeroPuntos]);

  // Manejar los cambios de los campos de medición específicos
  const handleFieldChange = (field, value) => {
    handleMedicionChange(index, field, value);
  };

  return (
    <div className="border rounded-lg shadow-sm mt-4 p-4 bg-gray-100 dark:bg-gray-800">
      <h2 className="font-semibold mb-2 text-center">MEDICIÓN {index + 1}</h2>

      {/* Campo de Puesto, editable por el usuario */}
      <div className="mb-4">
        <label className="block mb-1">PUESTO:</label>
        <input
          type="text"
          name="puesto"
          value={formData.mediciones[index]?.puesto || ''}
          onChange={(e) => handleFieldChange('puesto', e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Mostrar Identificación, Horario, E1, y E2 */}
      {Array.from({ length: numMediciones }).map((_, medIndex) => (
        <div key={medIndex} className="mb-6">
          {/* Identificación: mostrar solo una vez para la primera medición */}
          {medIndex === 0 && (
            <div className="mb-4">
              <label className="block mb-1">IDENTIFICACIÓN:</label>
              <input
                type="text"
                name={`identificacion_${medIndex}`}
                value={formData.mediciones[index]?.[`identificacion_${medIndex}`] || ''}
                onChange={(e) => handleFieldChange(`identificacion_${medIndex}`, e.target.value)}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          )}

          {/* Horario */}
          <div className="mb-4">
            <label className="block mb-1">HORARIO:</label>
            <input
              type="time"
              name={`horario_${medIndex}`}
              value={formData.mediciones[index]?.[`horario_${medIndex}`] || ''}
              onChange={(e) => handleFieldChange(`horario_${medIndex}`, e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          {/* E1 */}
          <div className="mb-4">
            <label className="block mb-1">E1:</label>
            <input
              type="number"
              name={`e1_${medIndex}`}
              value={formData.mediciones[index]?.[`e1_${medIndex}`] || ''}
              onChange={(e) => handleFieldChange(`e1_${medIndex}`, e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          {/* E2 */}
          <div className="mb-4">
            <label className="block mb-1">E2:</label>
            <input
              type="number"
              name={`e2_${medIndex}`}
              value={formData.mediciones[index]?.[`e2_${medIndex}`] || ''}
              onChange={(e) => handleFieldChange(`e2_${medIndex}`, e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        </div>
      ))}
    </div>
  );
}
