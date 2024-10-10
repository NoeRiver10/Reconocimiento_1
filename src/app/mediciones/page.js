"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import IdAreaMediciones from '../components/componentsMediciones/idareaMediciones';
import IluminacionMediciones from '../components/componentsMediciones/IluminacionMediciones';
import MedicionItem from '../components/componentsMediciones/MedicionItem';

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

  // Incluye "areaIluminada" en el estado visibleSections
  const [visibleSections, setVisibleSections] = useState({
    iluminacion: false,
    areaIluminada: false,
    medicion: true,
  });

  const [currentMedicionIndex, setCurrentMedicionIndex] = useState(0);

  useEffect(() => {
    // Obtener el valor de "areaIluminada" desde los parámetros de la URL
    const areaIluminada = searchParams.get('areaIluminada') || '';
    console.log('Área iluminada antes de establecer:', areaIluminada);

    if (areaIluminada) {
      // Establecer el valor de "area" en el estado formData
      setFormData((prev) => ({ ...prev, area: areaIluminada }));
    }

    // Recuperar las áreas del localStorage cuando se monte el componente
    if (typeof window !== 'undefined') {
      const savedAreas = window.localStorage.getItem('areas');
      if (savedAreas) {
        setAreas(JSON.parse(savedAreas));
      }
    }
  }, [searchParams]);

  // Alternar la visibilidad de las secciones
  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar cambios en la selección del área
  const handleAreaSelect = (selectedAreaId) => {
    const selectedArea = areas.find((area) => area.idArea === parseInt(selectedAreaId));
    if (selectedArea) {
      setFormData((prev) => ({
        ...prev,
        area: selectedArea.areaIluminada,
      }));
    }
  };

  // Manejar cambios en una medición específica
  const handleMedicionChange = (index, field, value) => {
    const newMediciones = [...formData.mediciones];
    newMediciones[index] = {
      ...newMediciones[index],
      [field]: value,
    };
    setFormData({ ...formData, mediciones: newMediciones });
  };

  // Navegar al siguiente punto de medición
  const siguientePunto = () => {
    if (currentMedicionIndex < parseInt(formData.numeroPuntos || 0, 10) - 1) {
      setCurrentMedicionIndex(currentMedicionIndex + 1);
    }
  };

  // Navegar al punto de medición anterior
  const anteriorPunto = () => {
    if (currentMedicionIndex > 0) {
      setCurrentMedicionIndex(currentMedicionIndex - 1);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">MEDICIONES</h1>
      <form className="space-y-4">
        {/* Componente para la iluminación */}
        <IluminacionMediciones
          formData={formData}
          handleChange={handleChange}
          toggleSection={toggleSection}
          visibleSections={visibleSections}
          areas={areas} // Pasar las áreas al componente
          handleAreaSelect={handleAreaSelect} // Pasar handleAreaSelect al componente
        />

        {/* Componente para el área y el departamento */}
        <IdAreaMediciones
          formData={formData}
          handleChange={handleChange}
          toggleSection={toggleSection}
          visibleSections={visibleSections}
        />

        {/* Mostrar solo un punto de medición a la vez */}
        {formData.numeroPuntos > 0 && (
          <MedicionItem
            key={currentMedicionIndex}
            index={currentMedicionIndex}
            formData={formData}
            handleMedicionChange={handleMedicionChange}
          />
        )}

        {/* Botones para navegar entre puntos de medición */}
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
      </form>
    </div>
  );
}
