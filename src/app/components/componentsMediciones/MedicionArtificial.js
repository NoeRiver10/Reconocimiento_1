import React, { useEffect, useState } from 'react';

function MedicionArtificial({ index, formData, handleMedicionChange, calcularHorarioConsecutivo }) {
  const [medicion, setMedicion] = useState(() => formData.mediciones[index] || {});

  // Manejar los cambios de los campos de medicion especificos
  const handleFieldChange = (field, value) => {
    const updatedMedicion = { ...medicion, [field]: value };
    setMedicion(updatedMedicion);
    handleMedicionChange(index, 'mediciones', updatedMedicion);
  };

  useEffect(() => {
    if (calcularHorarioConsecutivo && index > 0 && !medicion['horario_0']) {
      const newHorario = calculateConsecutiveHorario();
      handleFieldChange('horario_0', newHorario);
    }
  }, [index, calcularHorarioConsecutivo]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updatedFormData = {
        ...formData,
        mediciones: [
          ...formData.mediciones.slice(0, index),
          medicion,
          ...formData.mediciones.slice(index + 1),
        ],
      };
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      console.log('Medicion guardada en localStorage:', updatedFormData);
    }
  }, [medicion]);

  const calculateConsecutiveHorario = () => {
    if (index === 0) {
      return formData.mediciones[index]?.['horario_0'] || '';
    }

    const previousHorario = formData.mediciones[index - 1]?.['horario_0'];
    if (!previousHorario || previousHorario === '') {
      return '00:00';
    }

    const [hours, minutes] = previousHorario.split(':').map((timePart) => parseInt(timePart, 10));
    let newMinutes = minutes + 1;
    let newHours = hours;

    if (newMinutes >= 60) {
      newMinutes = 0;
      newHours = (newHours + 1) % 24;
    }

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
          className={`border p-2 w-full rounded ${index > 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
          required
          readOnly={index > 0}
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

      {/* Nueva Pregunta: ¿Existe pared? */}
      <div className="mb-4">
        <label className="block mb-1">¿EXISTE PARED?</label>
        <select
          name="existe_pared"
          value={medicion.existe_pared || ''}
          onChange={(e) => handleFieldChange('existe_pared', e.target.value)}
          className="border p-2 w-full rounded bg-white"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="sí">Sí</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* Campos E1 y E2 adicionales solo si 'existe_pared' es 'sí' */}
      {medicion.existe_pared === 'sí' && (
        <>
          <div className="mb-4">
            <label className="block mb-1">E2 (adicional):</label>
            <input
              type="number"
              name="e2_adicional"
              value={medicion.e2_adicional || ''}
              onChange={(e) => handleFieldChange('e2_adicional', e.target.value)}
              className="border p-2 w-full rounded bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">E1 (adicional):</label>
            <input
              type="number"
              name="e1_adicional"
              value={medicion.e1_adicional || ''}
              onChange={(e) => handleFieldChange('e1_adicional', e.target.value)}
              className="border p-2 w-full rounded bg-white"
              required
            />
          </div>
        </>
      )}

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
