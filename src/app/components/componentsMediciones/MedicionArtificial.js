import React, { useEffect, useState } from 'react';

function MedicionArtificial({ index, formData, handleMedicionChange, calcularHorarioConsecutivo }) {
  const [medicion, setMedicion] = useState(formData.mediciones[index] || {});

  // Manejar los cambios de los campos de medicion especificos
  const handleFieldChange = (field, value) => {
    const updatedMedicion = { ...medicion, [field]: value };
    setMedicion(updatedMedicion);
    handleMedicionChange(index, field, value);
  };

  useEffect(() => {
    if (calcularHorarioConsecutivo && index > 0) {
      const newHorario = calculateConsecutiveHorario();
      handleFieldChange('horario_0', newHorario);
    }
  }, [index, calcularHorarioConsecutivo]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`medicion_${index}`, JSON.stringify(medicion));
      console.log('Medicion guardada en localStorage:', medicion);
    }
  }, [medicion]);

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

    // Formatear el nuevo horario con dos digitos para las horas y minutos
    const formattedHours = String(newHours).padStart(2, '0');
    const formattedMinutes = String(newMinutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  const handleSaveMedicion = () => {
    console.log('Medicion guardada:', medicion);
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
          value={medicion.puesto || ''}
          onChange={(e) => handleFieldChange('puesto', e.target.value)}
          className="border p-2 w-full rounded bg-white"
        />
      </div>

      {/* Campo de Identificacion, editable por el usuario */}
      <div className="mb-4">
        <label className="block mb-1">IDENTIFICACION:</label>
        <input
          type="text"
          name="identificacion"
          value={medicion.identificacion || ''}
          onChange={(e) => handleFieldChange('identificacion', e.target.value)}
          className="border p-2 w-full rounded bg-white"
          required
        />
      </div>

      {/* Horario */}
      <div className="mb-4">
        <label className="block mb-1">HORARIO:</label>
        <input
          type="time"
          name="horario_0"
          value={medicion['horario_0'] || ''}
          onChange={(e) => handleFieldChange('horario_0', e.target.value)}
          className={`border p-2 w-full rounded ${calcularHorarioConsecutivo && index > 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
          required
          readOnly={calcularHorarioConsecutivo && index > 0}
        />
      </div>
      {/* Campo E2 */}
      <div className="mb-4">
        <label className="block mb-1">E2:</label>
        <input
          type="number"
          name="e2"
          value={medicion.e2 || ''}
          onChange={(e) => handleFieldChange('e2', e.target.value)}
          className="border p-2 w-full rounded bg-white"
          required
        />
      </div>
      {/* Campo E1 */}
      <div className="mb-4">
        <label className="block mb-1">E1:</label>
        <input
          type="number"
          name="e1"
          value={medicion.e1 || ''}
          onChange={(e) => handleFieldChange('e1', e.target.value)}
          className="border p-2 w-full rounded bg-white"
          required
        />
      </div>

      {/* Boton para guardar la medicion */}
      <div className="mt-4 text-center">
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleSaveMedicion}
        >
          Guardar Medicion
        </button>
      </div>
    </div>
  );
}

export default MedicionArtificial;