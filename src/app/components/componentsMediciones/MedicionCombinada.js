import React, { useEffect } from 'react';

function MedicionCombinada({ index, formData, handleMedicionChange, calcularHorarioConsecutivo }) {
  const numMediciones = formData.cci === 'SÍ' ? 4 : 3;

  // Manejar los cambios de los campos de medicion especificos
  const handleFieldChange = (medIndex, field, value) => {
    const updatedMediciones = [...formData.mediciones];
    if (!updatedMediciones[index]) {
      updatedMediciones[index] = { mediciones: [] };
    }
    if (!updatedMediciones[index].mediciones[medIndex]) {
      updatedMediciones[index].mediciones[medIndex] = {};
    }
    updatedMediciones[index].mediciones[medIndex][field] = value;

    // Actualizar el formData global
    handleMedicionChange(index, 'mediciones', updatedMediciones[index].mediciones);

    // Guardar en localStorage
    const updatedFormData = { ...formData, mediciones: updatedMediciones };
    if (typeof window !== 'undefined') {
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      console.log('Datos guardados en localStorage:', updatedFormData);
    }

    console.log('Datos de medición actualizada:', updatedMediciones[index].mediciones[medIndex]);
  };

  // Generar automaticamente los horarios para cada punto despues del primero
  useEffect(() => {
    if (calcularHorarioConsecutivo && index > 0) {
      for (let medIndex = 0; medIndex < numMediciones; medIndex++) {
        const previousHorario = formData.mediciones[index - 1]?.mediciones?.[medIndex]?.horario;
        if (previousHorario && !formData.mediciones[index]?.mediciones?.[medIndex]?.horario) {
          const newHorario = calculateConsecutiveHorario(previousHorario);
          handleFieldChange(medIndex, 'horario', newHorario);
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

    // Formatear el nuevo horario con dos digitos para las horas y minutos
    const formattedHours = String(newHours).padStart(2, '0');
    const formattedMinutes = String(newMinutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  };

  // Guardar las mediciones y mostrarlas en consola
  const handleSaveMedicion = () => {
    const formattedData = {
      puesto: formData.mediciones[index]?.puesto,
      identificacion: formData.mediciones[index]?.identificacion,
      mediciones: formData.mediciones[index]?.mediciones.map((medicion, idx) => ({
        horario: medicion.horario,
        e1: medicion.e1,
        e2: medicion.e2,
        medicionIndex: idx + 1,
      }))
    };
    console.log('Medicion guardada:', formattedData);
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
          onChange={(e) => handleMedicionChange(index, 'puesto', e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Campo de Identificacion, editable por el usuario */}
      <div className="mb-4">
        <label className="block mb-1">IDENTIFICACION:</label>
        <input
          type="text"
          name="identificacion"
          value={formData.mediciones[index]?.identificacion || ''}
          onChange={(e) => handleMedicionChange(index, 'identificacion', e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Mostrar los campos de horario, e1, e2 para cada medicion */}
      {Array.from({ length: numMediciones }).map((_, medIndex) => (
        <div key={medIndex} className="mb-6">
          <h3 className="font-semibold mb-2">Horario {medIndex + 1} y sus Mediciones</h3>
          {/* Horario */}
          <div className="mb-4">
            <label className="block mb-1">HORARIO {medIndex + 1}:</label>
            <input
              type="time"
              name={`horario_${medIndex}`}
              value={formData.mediciones[index]?.mediciones?.[medIndex]?.horario || ''}
              onChange={(e) => handleFieldChange(medIndex, 'horario', e.target.value)}
              className="border p-2 w-full rounded"
              required
              readOnly={calcularHorarioConsecutivo && index > 0} // Hacerlo solo de lectura para puntos despues del primero
            />
          </div>
          {/* E2 */}
          <div className="mb-4">
            <label className="block mb-1">E2 (Medicion {medIndex + 1}):</label>
            <input
              type="number"
              name={`e2_${medIndex}`}
              value={formData.mediciones[index]?.mediciones?.[medIndex]?.e2 || ''}
              onChange={(e) => handleFieldChange(medIndex, 'e2', e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          {/* E1 */}
          <div className="mb-4">
            <label className="block mb-1">E1 (Medicion {medIndex + 1}):</label>
            <input
              type="number"
              name={`e1_${medIndex}`}
              value={formData.mediciones[index]?.mediciones?.[medIndex]?.e1 || ''}
              onChange={(e) => handleFieldChange(medIndex, 'e1', e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        </div>
      ))}

      {/* Boton para guardar la medicion */}
      <div className="mt-4 text-center">
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={handleSaveMedicion}
        >
          Guardar Mediciones
        </button>
      </div>
    </div>
  );
}

export default MedicionCombinada;