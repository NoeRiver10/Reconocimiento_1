import React, { useEffect } from 'react';

function MedicionArtificial({ index, formData, handleMedicionChange, calcularHorarioConsecutivo }) {
  // Manejar los cambios de los campos de medición específicos
  const handleFieldChange = (field, value) => {
    handleMedicionChange(index, field, value);
  };

  useEffect(() => {
    if (calcularHorarioConsecutivo && index > 0) {
      const newHorario = calculateConsecutiveHorario();
      handleFieldChange('horario_0', newHorario);
    }
  }, [index, calcularHorarioConsecutivo, formData]); // Añadido formData a las dependencias

  const calculateConsecutiveHorario = () => {
    if (index === 0) {
      // El primer punto es ingresado manualmente
      return formData.mediciones[index]?.['horario_0'] || '';
    }
  
    // Obtener el horario del punto anterior
    const previousHorario = formData.mediciones[index - 1]?.['horario_0'];
    if (!previousHorario || previousHorario === '') {
      return '00:00'; // Valor por defecto si no hay horario previo
    }

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
      <h2 className="font-semibold mb-2 text-center">PUNTO {index + 1}</h2>

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

      {/* Horario */}
      <div className="mb-4">
        <label className="block mb-1">HORARIO:</label>
        <input
          type="time"
          name="horario_0"
          value={formData.mediciones[index]?.['horario_0'] || ''}
          onChange={(e) => handleFieldChange('horario_0', e.target.value)}
          className={`border p-2 w-full rounded ${calcularHorarioConsecutivo && index > 0 ? 'bg-gray-200 cursor-not-allowed' : ''}`}
          required
          readOnly={calcularHorarioConsecutivo && index > 0}
        />
      </div>

      {/* Campo E1 */}
      <div className="mb-4">
        <label className="block mb-1">E1:</label>
        <input
          type="number"
          name="e1"
          value={formData.mediciones[index]?.e1 || ''}
          onChange={(e) => handleFieldChange('e1', e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Campo E2 */}
      <div className="mb-4">
        <label className="block mb-1">E2:</label>
        <input
          type="number"
          name="e2"
          value={formData.mediciones[index]?.e2 || ''}
          onChange={(e) => handleFieldChange('e2', e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>
    </div>
  );
}

export default MedicionArtificial;
