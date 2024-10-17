import React from 'react';
import MedicionArtificial from './MedicionArtificial';
import MedicionCombinada from './MedicionCombinada';

function MedicionItem({ index, formData, handleMedicionChange }) {
  if (formData.tipoIluminacion === 'ARTIFICIAL') {
    return (
      <MedicionArtificial
        index={index}
        formData={formData}
        handleMedicionChange={handleMedicionChange}
        calcularHorarioConsecutivo={true} // Propagamos esta propiedad
      />
    );
  } else if (formData.tipoIluminacion === 'COMBINADA') {
    return (
      <MedicionCombinada
        index={index}
        formData={formData}
        handleMedicionChange={handleMedicionChange}
        calcularHorarioConsecutivo={true} // Propagamos esta propiedad aquí también
      />
    );
  }
  return null;
}

export default MedicionItem;
