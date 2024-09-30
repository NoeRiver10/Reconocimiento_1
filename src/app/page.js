"use client"; // Esto marca el componente como un Client Component

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Asegúrate de importar Link
import './globals.css'; // Asegúrate de que la ruta sea correcta

import IdentificacionArea from './components/IdentificacionArea';
import DimensionesArea from './components/DimensionesArea'; // Ajusta la ruta según tu estructura de carpetas
import Luminaria from './components/Luminaria'; // Ajusta la ruta según tu estructura de carpetas
import PercepcionTrabajo from './components/PercepcionTrabajo'; // Importa tu nuevo componente
import DatosPuesto from './components/DatosPuesto'; // Asegúrate de que la ruta sea correcta

export default function Reconocimiento() {
  const [areaCount, setAreaCount] = useState(1); // Estado para contar las áreas agregadas
  const [formData, setFormData] = useState({
    idArea: 1, // Iniciar siempre con ID 1
    areaIluminada: '',
    numPuntosEvaluar: '',
    tipoIluminacion: 'ARTIFICIAL',
    color: '',
    tipoSuperficie: '',
    altura: '',
    largo: '',
    ancho: '',
    indiceArea: 0,
    tipoLuminaria: '',
    potencia: '',
    distribucion: 'LINEAL',
    iluminacionLocalizada: 'SÍ',
    cantidad: '',
    nombreTrabajador: '',
    descripcion: '',
    reportes: '',
    tieneNombreTrabajador: 'NO',
    puestoTrabajador: '',
    numTrabajadores: '',
    descripcionActividades: '',
    tareaVisual: '',
    nivelMinimoIluminacion: '1',
  });

  const [visibleSections, setVisibleSections] = useState({
    identificacion: false,
    descripcion: false,
    dimensiones: false,
    luminarias: false,
    percepcion: false,
    puesto: false,
  });

  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const altura = parseFloat(formData.altura) || 0; 
    const largo = parseFloat(formData.largo) || 0; 
    const ancho = parseFloat(formData.ancho) || 0; 

    let indiceArea = 0; 
    if (altura > 0 && (largo + ancho) > 0) { 
      indiceArea = (largo * ancho) / (altura * (largo + ancho)); 
    }

    setFormData((prev) => ({
      ...prev,
      indiceArea 
    }));
  }, [formData.altura, formData.largo, formData.ancho]);

  const calculateMinAreas = (ic) => {
    if (ic < 1) return 4;
    if (ic < 2) return 9;
    if (ic < 3) return 16;
    return 25;
  };

  const calculateMaxAreas = (ic) => {
    if (ic < 1) return 6;
    if (ic < 2) return 12;
    if (ic < 3) return 20;
    return 30;
  };

  const handleSave = () => {
    // Guardar la información actual en la consola
    console.log('Datos guardados:', formData);
    console.log(`ID de área: ${formData.idArea}`);
    setSuccessMessage('Guardado con éxito'); // Mostrar mensaje de éxito
  };

  const handleAddAnotherArea = () => {
    // Incrementar el ID de área y resetear el formulario para una nueva área
    setAreaCount((prev) => prev + 1);
    setFormData({
      idArea: areaCount + 1, // Utilizar el nuevo valor del ID
      areaIluminada: '',
      numPuntosEvaluar: '',
      tipoIluminacion: 'ARTIFICIAL',
      color: '',
      tipoSuperficie: '',
      altura: '',
      largo: '',
      ancho: '',
      indiceArea: 0,
      tipoLuminaria: '',
      potencia: '',
      distribucion: 'LINEAL',
      iluminacionLocalizada: 'SÍ',
      cantidad: '',
      nombreTrabajador: '',
      descripcion: '',
      reportes: '',
      tieneNombreTrabajador: 'NO',
      puestoTrabajador: '',
      numTrabajadores: '',
      descripcionActividades: '',
      tareaVisual: '',
      nivelMinimoIluminacion: '1',
    });
    setSuccessMessage(''); // Reiniciar mensaje de éxito al agregar otra área
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">RECONOCIMIENTO</h1>
      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4 text-center mx-auto w-3/4">
          {successMessage}
        </div>
      )}
      <form className="space-y-4">
        <IdentificacionArea
          formData={formData}
          handleChange={handleChange}
          visible={visibleSections.identificacion}
          toggleSection={() => toggleSection('identificacion')}
        />
        <DimensionesArea
          formData={formData}
          handleChange={handleChange}
          visible={visibleSections.dimensiones}
          toggleSection={() => toggleSection('dimensiones')}
          calculateMinAreas={calculateMinAreas}
          calculateMaxAreas={calculateMaxAreas}
        />
        <Luminaria
          formData={formData}
          handleChange={handleChange}
          visible={visibleSections.luminarias}
          toggleSection={() => toggleSection('luminarias')}
        />
        <PercepcionTrabajo
          formData={formData}
          handleChange={handleChange}
          visible={visibleSections.percepcion}
          toggleSection={() => toggleSection('percepcion')}
        />
        <DatosPuesto
          formData={formData}
          handleChange={handleChange}
          visible={visibleSections.puesto}
          toggleSection={() => toggleSection('puesto')}
        />
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleAddAnotherArea}
            className="bg-blue-500 text-white px-2 py-1 text-sm rounded">
            Agregar Área
          </button>
          <Link href="/mediciones">
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Ir a Mediciones</button>
          </Link>
          <button
            type="button"
            onClick={handleSave}
            className="bg-green-500 text-white px-2 py-1 text-sm rounded">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
