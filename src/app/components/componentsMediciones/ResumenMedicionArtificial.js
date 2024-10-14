import React from 'react';

function ResumenMedicionArtificial({ area }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-gray-100">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Punto</th>
            <th className="py-2 px-4 border-b">Puesto</th>
            <th className="py-2 px-4 border-b">Identificación</th>
            <th className="py-2 px-4 border-b">Horario</th>
            <th className="py-2 px-4 border-b">E2</th>
            <th className="py-2 px-4 border-b">E1</th>
            <th className="py-2 px-4 border-b">¿Existe Pared?</th>
            <th className="py-2 px-4 border-b">E2 (Adicional)</th>
            <th className="py-2 px-4 border-b">E1 (Adicional)</th>
          </tr>
        </thead>
        <tbody>
          {area.mediciones.map((medicion, idx) => (
            <tr key={idx}>
              <td className="py-2 px-4 border-b">Punto {idx + 1}</td>
              <td className="py-2 px-4 border-b">{medicion.puesto || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{medicion.identificacion || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{medicion['horario_0'] || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{medicion.e2 || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{medicion.e1 || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{medicion.existe_pared || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                {medicion.existe_pared === 'sí' ? medicion.e2_adicional : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">
                {medicion.existe_pared === 'sí' ? medicion.e1_adicional : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResumenMedicionArtificial;
