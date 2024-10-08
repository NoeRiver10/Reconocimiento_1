import React, { useEffect } from 'react';

function MedicionCombinada({ index, formData, handleMedicionChange, calcularHorarioConsecutivo }) {
  const numMediciones = formData.cci === 'SÍ' ? 4 : 3;

  // Manejar los cambios de los campos de medición específicos
  const handleFieldChange = (field, value) => {
    handleMedicionChange(index, field, value);
  };

  // Generar automáticamente los horarios para cada punto después del primero
  useEffect(() => {
    if (calcularHorarioConsecutivo && index > 0) {
      for (let medIndex = 0; medIndex < numMediciones; medIndex++) {
        const horarioKey = `horario_${medIndex}`;
        const previousHorario = formData.mediciones[index - 1]?.[horarioKey];
        if (previousHorario && !formData.mediciones[index]?.[horarioKey]) {
          const newHorario = calculateConsecutiveHorario(previousHorario);
          handleFieldChange(horarioKey, newHorario);
        }
      }
    }
  }, [index, calcularHorarioConsecutivo, formData.mediciones]);

  // Calcular el horario consecutivo sumando un minuto al horario anterior
  const calculateConsecutiveHorario = (previousHorario) => {
    // Extraer horas y minutos del horario anterior
    const [hours, minutes] = previousHorario.split(':').map((timePart) => parseInt(timePart, 10));

    // Calcular el nuevo horario sumando un minuto al anterior
    let newMinutes = minutes + 1;
    let newHours = hours;

    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours = (newHours + 1) % 24;
    }

    // Formatear el nuevo horario con dos dígitos para las horas y minutos
    const formattedHours = String(newHours).padStart(2, '0');
    const formattedMinutes = String(newMinutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  return (
    <div className="border rounded-lg shadow-sm mt-4 p-4 bg-gray-100 dark:bg-gray-800">
      <h2 className="font-semibold mb-2 text-center">PUNTO {index + 1} (COMBINADO)</h2>

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

      {/* Campo de Identificación, editable por el usuario */}
      <div className="mb-4">
        <label className="block mb-1">IDENTIFICACIÓN:</label>
        <input
          type="text"
          name="identificacion"
          value={formData.mediciones[index]?.identificacion || ''}
          onChange={(e) => handleFieldChange('identificacion', e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Mostrar los campos de horario, e1, e2 para cada medición */}
      {Array.from({ length: numMediciones }).map((_, medIndex) => (
        <div key={medIndex} className="mb-6">
          {/* Horario */}
          <div className="mb-4">
            <label className="block mb-1">HORARIO {medIndex + 1}:</label>
            <input
              type="time"
              name={`horario_${medIndex}`}
              value={formData.mediciones[index]?.[`horario_${medIndex}`] || ''}
              onChange={(e) => handleFieldChange(`horario_${medIndex}`, e.target.value)}
              className="border p-2 w-full rounded"
              required
              readOnly={calcularHorarioConsecutivo && index > 0} // Hacerlo solo de lectura para puntos después del primero
            />
          </div>

          {/* E1 */}
          <div className="mb-4">
            <label className="block mb-1">E1 (Medición {medIndex + 1}):</label>
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
            <label className="block mb-1">E2 (Medición {medIndex + 1}):</label>
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

export default MedicionCombinada;