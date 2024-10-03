"use client"; 

import { useState, useEffect } from 'react';
import Link from 'next/link'; 
import './globals.css'; 

import IdentificacionArea from './components/componentsPrincipal/IdentificacionArea';
import DimensionesArea from './components/componentsPrincipal/DimensionesArea'; 
import Luminaria from './components/componentsPrincipal/Luminaria'; 
import PercepcionTrabajo from './components/componentsPrincipal/PercepcionTrabajo'; 
import DatosPuesto from './components/componentsPrincipal/DatosPuesto'; 

export default function Reconocimiento() {
  const [areaCount, setAreaCount] = useState(1); 
  const [formData, setFormData] = useState({
    idArea: 1, 
    areaIluminada: '',
    numPuntosEvaluar: '',
    tipoIluminacion: 'ARTIFICIAL',
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

  const [successMessage, setSuccessMessage] = useState(''); 

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
  const validateForm = () => {
    const requiredFields = {
      areaIluminada: formData.areaIluminada,
      numPuntosEvaluar: formData.numPuntosEvaluar,
      tipoIluminacion: formData.tipoIluminacion,
      descripcionSuperficie: formData.descripcionSuperficie,
      altura: formData.altura,
      largo: formData.largo,
      ancho: formData.ancho,
      tipoLuminaria: formData.tipoLuminaria,
      potencia: formData.potencia,
      cantidad: formData.cantidad,
      puestoTrabajador: formData.puestoTrabajador,
      numTrabajadores: formData.numTrabajadores,
      descripcionActividades: formData.descripcionActividades,
      nivelMinimoIluminacion: formData.nivelMinimoIluminacion,
    };
  
    for (let field in requiredFields) {
      const value = requiredFields[field];
      
      if (!value || value.toString().trim() === "") {
        console.log(`El campo '${field}' está vacío o es inválido. Valor actual: '${value}'`);
        setSuccessMessage(`Por favor, completa el campo: ${field}`); // Mostrar mensaje específico
        return false;
      }
    }
  
    setSuccessMessage(''); // Resetear mensaje de error si pasa la validación
    return true;
  };
  
  const handleSave = () => {
    console.log('Valores del formulario antes de guardar:', formData); // Esto imprimirá todo el formData
  
    if (!validateForm()) {
      console.log('Formulario no válido, faltan campos por completar.');
      return;
    }
  
    console.log('Datos guardados:', formData);
    setSuccessMessage('Guardado con éxito');
  };
  

  const handleAddAnotherArea = () => {
    setAreaCount((prev) => prev + 1);
    setFormData({
      idArea: areaCount + 1, 
      areaIluminada: '',
      numPuntosEvaluar: '',
      tipoIluminacion: 'ARTIFICIAL',
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
    setSuccessMessage(''); 
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">RECONOCIMIENTO</h1>
      {successMessage && (
        <div className={`p-2 rounded mb-4 text-center mx-auto w-3/4 ${successMessage.includes('éxito') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
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
          <Link href={{
            pathname: '/mediciones', 
            query: { areaIluminada: formData.areaIluminada } // Pasar el valor como parámetro de consulta
           }}>
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
