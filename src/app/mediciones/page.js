"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import IdAreaMediciones from '../components/componentsMediciones/idareaMediciones';
import IluminacionMediciones from '../components/componentsMediciones/IluminacionMediciones';
import MedicionItem from '../components/componentsMediciones/MedicionItem';
import MedicionCombinada from '../components/componentsMediciones/MedicionCombinada';
import MedicionArtificial from '../components/componentsMediciones/MedicionArtificial';
import ResumenMediciones from '../components/componentsMediciones/ResumenMediciones';

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
    setFormData((prevFormData) => {
      const newMediciones = [...prevFormData.mediciones];
      if (!newMediciones[index]) {
        newMediciones[index] = { mediciones: [] };
      }
      newMediciones[index][field] = value;

      // Si se está cambiando el horario manualmente en el primer punto, actualizar los horarios consecutivos
      if (field === 'horario_0' && index === 0) {
        for (let i = 1; i < newMediciones.length; i++) {
          newMediciones[i]['horario_0'] = calculateConsecutiveHorario(newMediciones[i - 1]['horario_0']);
        }
      }

      return { ...prevFormData, mediciones: newMediciones };
    });
  };

  const calculateConsecutiveHorario = (previousHorario) => {
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
                calcularHorarioConsecutivo={true}
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
        <ResumenMediciones
          areas={areas}
          selectedAreaId={selectedAreaId}
          handleSummaryAreaSelect={handleSummaryAreaSelect}
          setShowSummary={setShowSummary}
        />
      )}
    </div>
  );
}