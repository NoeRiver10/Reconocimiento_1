import React, { useState } from 'react';

const IdentificacionArea = ({ formData, handleChange, visible, toggleSection }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    setErrorMessage(''); // Resetear mensaje de error
    if (formData.numPuntosEvaluar < 0) {
      setErrorMessage('El número de puntos a evaluar debe ser mayor o igual que cero.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Aquí iría la lógica de guardar datos
      console.log('Datos guardados:', formData);
    }
  };

  const handleNumPuntosEvaluarChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10)); // Asegurar que el valor sea >= 0
    handleChange({ target: { name: 'numPuntosEvaluar', value } });
  };

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
          {errorMessage && (
            <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">{errorMessage}</div>
          )}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label>ID DE ÁREA:</label>
              <input
                type="number"
                name="idArea"
                value={formData.idArea}
                onChange={handleChange}
                disabled
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
                onChange={handleNumPuntosEvaluarChange} // Usar la función modificada
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
            {/* Nuevo campo: Descripción de la Superficie */}
            <div>
              <label>DESCRIPCIÓN DE LA SUPERFICIE:</label>
              <textarea
                name="descripcionSuperficie"
                value={formData.descripcionSuperficie}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentificacionArea;
