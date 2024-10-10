"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import IdentificacionArea from '../components/componentsPrincipal/IdentificacionArea';
import DimensionesArea from '../components/componentsPrincipal/DimensionesArea';
import Luminaria from '../components/componentsPrincipal/Luminaria';
import PercepcionTrabajo from '../components/componentsPrincipal/PercepcionTrabajo';
import FormularioPuestos from '../components/componentsPrincipal/FormularioPuestos';

export default function Reconocimiento() {
  const [areas, setAreas] = useState(() => {
    // Recuperar áreas del localStorage si existen
    if (typeof window !== 'undefined') {
      const savedAreas = localStorage.getItem('areas');
      return savedAreas ? JSON.parse(savedAreas) : [
        {
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
          puestoTrabajador: '',
          numTrabajadores: '',
          descripcionActividades: '',
          tareaVisual: '',
          nivelMinimoIluminacion: '1',
          descripcionSuperficie: '',
        },
      ];
    } else {
      return [
        {
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
          puestoTrabajador: '',
          numTrabajadores: '',
          descripcionActividades: '',
          tareaVisual: '',
          nivelMinimoIluminacion: '1',
          descripcionSuperficie: '',
        },
      ];
    }
  });

  const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    identificacion: false,
    dimensiones: false,
    luminarias: false,
    percepcion: false,
    puestoGeneral: false,
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Guardar áreas en localStorage cada vez que cambien
    if (typeof window !== 'undefined') {
      localStorage.setItem('areas', JSON.stringify(areas));
    }
  }, [areas]);

  const addArea = () => {
    if (!validateForm()) {
      return;
    }
    const newArea = {
      idArea: areas.length + 1,
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
      puestoTrabajador: '',
      numTrabajadores: '',
      descripcionActividades: '',
      tareaVisual: '',
      nivelMinimoIluminacion: '1',
      descripcionSuperficie: '',
    };

    setAreas((prevAreas) => [...prevAreas, newArea]);
    setCurrentAreaIndex(areas.length); // Cambiar al nuevo área
    setVisibleSections({
      identificacion: true,
      dimensiones: false,
      luminarias: false,
      percepcion: false,
      puestoGeneral: false,
    });
    setSuccessMessage(''); // Limpiar el mensaje de éxito al agregar una nueva área
  };

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    setAreas((prevAreas) => {
      const updatedAreas = [...prevAreas];
      updatedAreas[currentAreaIndex] = {
        ...updatedAreas[currentAreaIndex],
        [e.target.name]: e.target.value,
      };
      return updatedAreas;
    });
  };

  const handleAreaSelect = (selectedAreaId) => {
    setCurrentAreaIndex(areas.findIndex((area) => area.idArea === parseInt(selectedAreaId)));
  };

  useEffect(() => {
    setAreas((prevAreas) =>
      prevAreas.map((area, index) => {
        if (index === currentAreaIndex) {
          const altura = parseFloat(area.altura) || 0;
          const largo = parseFloat(area.largo) || 0;
          const ancho = parseFloat(area.ancho) || 0;

          let indiceArea = 0;
          if (altura > 0 && (largo + ancho) > 0) {
            indiceArea = (largo * ancho) / (altura * (largo + ancho));
          }

          return {
            ...area,
            indiceArea,
          };
        }
        return area;
      })
    );
  }, [areas[currentAreaIndex]?.altura, areas[currentAreaIndex]?.largo, areas[currentAreaIndex]?.ancho]);

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
    const area = areas[currentAreaIndex];
    const requiredFields = {
      areaIluminada: area.areaIluminada,
      numPuntosEvaluar: area.numPuntosEvaluar,
      tipoIluminacion: area.tipoIluminacion,
      descripcionSuperficie: area.descripcionSuperficie,
      altura: area.altura,
      largo: area.largo,
      ancho: area.ancho,
      tipoLuminaria: area.tipoLuminaria,
      potencia: area.potencia,
      cantidad: area.cantidad,
    };

    for (let field in requiredFields) {
      const value = requiredFields[field];
      if (!value || value.toString().trim() === "") {
        console.log(`El campo '${field}' está vacío o es inválido. Valor actual: '${value}'`);
        setSuccessMessage(`Por favor, completa el campo: ${field}`);
        return false;
      }
    }
    setSuccessMessage('');
    return true;
  };

  const handleSaveAll = () => {
    if (!validateForm()) {
      console.log('Formulario no válido, faltan campos por completar.');
      return;
    }

    console.log('Datos guardados:', areas);
    setSuccessMessage('Guardado con éxito');
  };

  const goToPreviousArea = () => {
    if (currentAreaIndex > 0) {
      setCurrentAreaIndex((prevIndex) => prevIndex - 1);
      setVisibleSections({
        identificacion: true,
        dimensiones: false,
        luminarias: false,
        percepcion: false,
        puestoGeneral: false,
      });
    }
  };

  const goToNextArea = () => {
    if (currentAreaIndex < areas.length - 1) {
      setCurrentAreaIndex((prevIndex) => prevIndex + 1);
      setVisibleSections({
        identificacion: true,
        dimensiones: false,
        luminarias: false,
        percepcion: false,
        puestoGeneral: false,
      });
    }
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
        {areas.length > 0 && currentAreaIndex < areas.length && (
          <>
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white text-center">Área {areas[currentAreaIndex].idArea}</h2>
            <IdentificacionArea
              formData={areas[currentAreaIndex]}
              handleChange={handleChange}
              visible={visibleSections.identificacion}
              toggleSection={() => toggleSection('identificacion')}
            />
            <DimensionesArea
              formData={areas[currentAreaIndex]}
              handleChange={handleChange}
              visible={visibleSections.dimensiones}
              toggleSection={() => toggleSection('dimensiones')}
              calculateMinAreas={calculateMinAreas}
              calculateMaxAreas={calculateMaxAreas}
            />
            <Luminaria
              formData={areas[currentAreaIndex]}
              handleChange={handleChange}
              visible={visibleSections.luminarias}
              toggleSection={() => toggleSection('luminarias')}
            />
            <PercepcionTrabajo
              formData={areas[currentAreaIndex]}
              handleChange={handleChange}
              visible={visibleSections.percepcion}
              toggleSection={() => toggleSection('percepcion')}
            />
            <div className="mb-4">
              <button
                type="button"
                className="bg-red-500 text-white w-full px-4 py-2 rounded-lg"
                onClick={() => toggleSection('puestoGeneral')}
              >
                Datos del Puesto
              </button>
              {visibleSections.puestoGeneral && (
                <FormularioPuestos formData={areas[currentAreaIndex]} handleChange={handleChange} />
              )}
            </div>
          </>
        )}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={goToPreviousArea}
            className="bg-gray-500 text-white px-4 py-2 rounded"
            disabled={currentAreaIndex === 0}
          >
            Área Anterior
          </button>
          <button
            type="button"
            onClick={goToNextArea}
            className="bg-gray-500 text-white px-4 py-2 rounded"
            disabled={currentAreaIndex === areas.length - 1}
          >
            Siguiente Área
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={addArea}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Agregar Nueva Área
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleSaveAll}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar Todos los Datos
          </button>
        </div>
        <div className="mt-4 text-center">
          <Link href={{
            pathname: '/mediciones',
            query: { areaIluminada: areas[currentAreaIndex].areaIluminada }
          }}>
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Ir a Mediciones</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
