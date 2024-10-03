"use client"; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importar desde 'next/navigation'
import IdAreaMediciones from '../components/componentsMediciones/idareaMediciones';
import IluminacionMediciones from '../components/componentsMediciones/IluminacionMediciones';
import MedicionItem from '../components/componentsMediciones/medicionItem';

export default function Mediciones() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tipoIluminacion: 'ARTIFICIAL',
    cci: 'SÍ',
    area: '',
    departamento: '',
    numeroPuntos: '',
    mediciones: [],
  });
  
  const [visibleSections, setVisibleSections] = useState({
    tipoIluminaria: true,
    medicion: true,
  });

  useEffect(() => {
    const areaIluminada = router.query?.areaIluminada || ''; // Usar el operador de encadenamiento opcional
    console.log('router.query:', router.query); // Verifica el contenido de router.query
    console.log('Área iluminada antes de establecer:', areaIluminada); // Verificar el valor
    if (areaIluminada) {
      setFormData((prev) => ({ ...prev, area: areaIluminada })); // Aquí estás actualizando el estado
    }
  }, [router.query]);
  
  // Alternar la visibilidad de las secciones
  const toggleSection = (section) => {
    setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Agregar una nueva medición
  const addMedicion = () => {
    const newMedicion = { puesto: '', identificacion: '', horario: '', e1: '', e2: '' };
    setFormData((prev) => ({ ...prev, mediciones: [...prev.mediciones, newMedicion] }));
  };

  // Manejar cambios en una medición específica
  const handleMedicionChange = (index, e) => {
    const { name, value } = e.target;
    const newMediciones = [...formData.mediciones];
    newMediciones[index] = { ...newMediciones[index], [name]: value };
    setFormData({ ...formData, mediciones: newMediciones });
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
        />
        
        {/* Componente para el área y el departamento */}
        <IdAreaMediciones
         formData={formData} // Asegúrate de que formData se pase aquí
         handleChange={handleChange}
        />

        {/* Mostrar tantas mediciones como el número de puntos ingresado */}
        {Array.from({ length: parseInt(formData.numeroPuntos || 0, 10) }).map((_, index) => (
          <MedicionItem 
            key={index} 
            index={index} 
            formData={formData} // Pasar formData completo
            handleMedicionChange={handleMedicionChange} 
          />
        ))}

        {/* Botón para agregar más mediciones */}
        <button 
          type="button" 
          onClick={addMedicion} 
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Agregar Medición
        </button>
      </form>
    </div>
  );
}
