"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import IdAreaMediciones from '../components/componentsMediciones/idareaMediciones';
import IluminacionMediciones from '../components/componentsMediciones/IluminacionMediciones';
import MedicionItem from '../components/componentsMediciones/MedicionItem';
import MedicionCombinada from '../components/componentsMediciones/MedicionCombinada';
import MedicionArtificial from '../components/componentsMediciones/MedicionArtificial';

export default function Mediciones() {
  const searchParams = useSearchParams();
  const [areas, setAreas] = useState([]);
  const [formData, setFormData] = useState({
    tipoIluminacion: 'ARTIFICIAL',
    cci: 'SÍ',
    area: '',
    departamento: '',
    numeroPuntos: '',
    mediciones: [],
  });

  const [visibleSections, setVisibleSections] = useState({
    iluminacion: false,
    areaIluminada: false,
    medicion: true,
  });

  const [currentMedicionIndex, setCurrentMedicionIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState('');

  useEffect(() => {
    const areaIluminada = searchParams.get('areaIluminada') || '';
    console.log('Área iluminada antes de establecer:', areaIluminada);

    if (areaIluminada) {
      setFormData((prev) => ({ ...prev, area: areaIluminada }));
    }

    if (typeof window !== 'undefined') {
      const savedAreas = window.localStorage.getItem('areas');
      if (savedAreas) {
        setAreas(JSON.parse(savedAreas));
      }
    }
  }, [searchParams]);

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAreaSelect = (selectedAreaId) => {
    const selectedArea = areas.find((area) => area.idArea === parseInt(selectedAreaId));
    if (selectedArea) {
      setFormData((prev) => ({
        ...prev,
        area: selectedArea.areaIluminada,
        departamento: selectedArea.departamento || '',
        numeroPuntos: selectedArea.numPuntosEvaluar || '',
        tipoIluminacion: selectedArea.tipoIluminacion || 'ARTIFICIAL',
        cci: selectedArea.cci || 'SÍ',
        mediciones: selectedArea.mediciones || [],
      }));
    }
  };

  const handleMedicionChange = (index, field, value) => {
    const newMediciones = [...formData.mediciones];
    if (!newMediciones[index]) {
      newMediciones[index] = { mediciones: [] };
    }
    if (typeof newMediciones[index] === 'object' && !Array.isArray(newMediciones[index])) {
      newMediciones[index][field] = value;
    }
    setFormData({ ...formData, mediciones: newMediciones });
  };

  const handleSaveMediciones = () => {
    const updatedAreas = areas.map((area) => {
      if (area.areaIluminada === formData.area) {
        return {
          ...area,
          mediciones: formData.mediciones,
          departamento: formData.departamento,
          numPuntosEvaluar: formData.numeroPuntos,
        };
      }
      return area;
    });

    setAreas(updatedAreas);
    if (typeof window !== 'undefined') {
      localStorage.setItem('areas', JSON.stringify(updatedAreas));
    }
    setShowSummary(true);
  };

  const siguientePunto = () => {
    if (currentMedicionIndex < parseInt(formData.numeroPuntos || 0, 10) - 1) {
      setCurrentMedicionIndex(currentMedicionIndex + 1);
    }
  };

  const anteriorPunto = () => {
    if (currentMedicionIndex > 0) {
      setCurrentMedicionIndex(currentMedicionIndex - 1);
    }
  };

  const handleSummaryAreaSelect = (e) => {
    setSelectedAreaId(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">MEDICIONES</h1>
      {!showSummary ? (
        <form className="space-y-4">
          <IluminacionMediciones
            formData={formData}
            handleChange={handleChange}
            toggleSection={toggleSection}
            visibleSections={visibleSections}
            areas={areas}
            handleAreaSelect={handleAreaSelect} // Pasar la función handleAreaSelect como prop
          />

          <IdAreaMediciones
            formData={formData}
            handleChange={handleChange}
            toggleSection={toggleSection}
            visibleSections={visibleSections}
          />

          {formData.numeroPuntos > 0 && (
            formData.tipoIluminacion === 'COMBINADA' ? (
              <MedicionCombinada
                key={currentMedicionIndex}
                index={currentMedicionIndex}
                formData={formData}
                handleMedicionChange={handleMedicionChange}
                calcularHorarioConsecutivo={true}
              />
            ) : (
              <MedicionArtificial
                key={currentMedicionIndex}
                index={currentMedicionIndex}
                formData={formData}
                handleMedicionChange={handleMedicionChange}
              />
            )
          )}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={anteriorPunto}
              className="bg-gray-500 text-white px-4 py-2 rounded"
              disabled={currentMedicionIndex === 0}
            >
              Anterior Punto
            </button>
            <button
              type="button"
              onClick={siguientePunto}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={currentMedicionIndex >= parseInt(formData.numeroPuntos || 0, 10) - 1}
            >
              Siguiente Punto
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleSaveMediciones}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Resumen de Mediciones
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-center">Resumen Completo</h2>
          <div className="mb-4">
            <label className="block mb-1 text-center">Seleccionar Área para Ver Detalles:</label>
            <select
              value={selectedAreaId}
              onChange={handleSummaryAreaSelect}
              className="border p-2 w-full rounded"
            >
              <option value="">Selecciona un área</option>
              {areas.map((area) => (
                <option key={area.idArea} value={area.idArea}>
                  Área {area.idArea} - {area.areaIluminada || 'Sin nombre'}
                </option>
              ))}
            </select>
          </div>
          {selectedAreaId && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-700">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Campo</th>
                    <th className="py-2 px-4 border-b">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {areas
                    .filter((area) => area.idArea === parseInt(selectedAreaId))
                    .map((area, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td className="py-2 px-4 border-b">Área Iluminada</td>
                          <td className="py-2 px-4 border-b">{area.areaIluminada}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Número de Puntos a Evaluar</td>
                          <td className="py-2 px-4 border-b">{area.numPuntosEvaluar}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Tipo de Iluminación</td>
                          <td className="py-2 px-4 border-b">{area.tipoIluminacion}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Dimensiones</td>
                          <td className="py-2 px-4 border-b">Altura: {area.altura}, Largo: {area.largo}, Ancho: {area.ancho}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Índice de Área</td>
                          <td className="py-2 px-4 border-b">{area.indiceArea}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Tipo de Luminaria</td>
                          <td className="py-2 px-4 border-b">{area.tipoLuminaria}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Potencia</td>
                          <td className="py-2 px-4 border-b">{area.potencia}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Distribución</td>
                          <td className="py-2 px-4 border-b">{area.distribucion}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Iluminación Localizada</td>
                          <td className="py-2 px-4 border-b">{area.iluminacionLocalizada}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Cantidad</td>
                          <td className="py-2 px-4 border-b">{area.cantidad}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Nombre del Trabajador</td>
                          <td className="py-2 px-4 border-b">{area.nombreTrabajador}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Descripción</td>
                          <td className="py-2 px-4 border-b">{area.descripcion}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 border-b">Reportes</td>
                          <td className="py-2 px-4 border-b">{area.reportes}</td>
                        </tr>
                        {area.mediciones && area.mediciones.length > 0 && (
                          <tr>
                            <td colSpan="2" className="py-2 px-4 border-b">
                              <h4 className="font-semibold text-lg mt-4">Mediciones:</h4>
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
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {area.mediciones.map((medicion, idx) => (
                                      <tr key={idx}>
                                        <td className="py-2 px-4 border-b">Punto {idx + 1}</td>
                                        <td className="py-2 px-4 border-b">{medicion.puesto}</td>
                                        <td className="py-2 px-4 border-b">{medicion.identificacion}</td>
                                        <td className="py-2 px-4 border-b">{medicion['horario_0']}</td>
                                        <td className="py-2 px-4 border-b">{medicion.e2}</td>
                                        <td className="py-2 px-4 border-b">{medicion.e1}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowSummary(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Volver a la Edición
            </button>
          </div>
        </div>
      )}
    </div>
  );
}