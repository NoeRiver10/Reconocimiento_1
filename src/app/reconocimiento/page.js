"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import IdentificacionArea from '../components/componentsPrincipal/IdentificacionArea';
import DimensionesArea from '../components/componentsPrincipal/DimensionesArea';
import Luminaria from '../components/componentsPrincipal/Luminaria';
import PercepcionTrabajo from '../components/componentsPrincipal/PercepcionTrabajo';
import FormularioPuestos from '../components/componentsPrincipal/FormularioPuestos';

export default function Reconocimiento() {
  const [areas, setAreas] = useState([]);
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    identificacion: false,
    dimensiones: false,
    luminarias: false,
    percepcion: false,
    puestoGeneral: false,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAreas = localStorage.getItem('areas');
      if (savedAreas) {
        setAreas(JSON.parse(savedAreas));
      } else {
        setAreas([getNewArea(1)]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && areas.length > 0) {
      localStorage.setItem('areas', JSON.stringify(areas));
      console.log('Datos guardados en localStorage:', areas);
    }
  }, [areas]);

  const getNewArea = (id) => ({
    idArea: id,
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
    puestos: [
      {
        id: 1,
        puestoTrabajador: '',
        numTrabajadores: '',
        descripcionActividades: '',
        nivelMinimoIluminacion: '',
        tareaVisual: '',
      },
    ],
    descripcionSuperficie: '',
    mediciones: [],
  });

  const addArea = () => {
    if (!validateForm()) {
      return;
    }
    setAreas((prevAreas) => [...prevAreas, getNewArea(prevAreas.length + 1)]);
    setCurrentAreaIndex(areas.length);
    setVisibleSections({
      identificacion: false,
      dimensiones: false,
      luminarias: false,
      percepcion: false,
      puestoGeneral: false,
    });
    setSuccessMessage('');
  };

  const toggleSection = (section) => {
    setVisibleSections({
      identificacion: false,
      dimensiones: false,
      luminarias: false,
      percepcion: false,
      puestoGeneral: false,
      [section]: !visibleSections[section],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAreas((prevAreas) =>
      prevAreas.map((area, index) =>
        index === currentAreaIndex ? { ...area, [name]: value } : area
      )
    );
  };

  const handleAreaSelect = (selectedAreaId) => {
    setCurrentAreaIndex(areas.findIndex((area) => area.idArea === parseInt(selectedAreaId)));
  };

  useEffect(() => {
    if (areas[currentAreaIndex]) {
      const { altura, largo, ancho, indiceArea: prevIndiceArea } = areas[currentAreaIndex];
      const alturaParsed = parseFloat(altura) || 0;
      const largoParsed = parseFloat(largo) || 0;
      const anchoParsed = parseFloat(ancho) || 0;

      let newIndiceArea = 0;
      if (alturaParsed > 0 && (largoParsed + anchoParsed) > 0) {
        newIndiceArea = (largoParsed * anchoParsed) / (alturaParsed * (largoParsed + anchoParsed));
      }

      if (newIndiceArea !== prevIndiceArea) {
        setAreas((prevAreas) =>
          prevAreas.map((area, index) =>
            index === currentAreaIndex ? { ...area, indiceArea: newIndiceArea } : area
          )
        );
      }
    }
  }, [areas, currentAreaIndex]);

  const validateForm = () => {
    if (!areas[currentAreaIndex]) return false;
    const area = areas[currentAreaIndex];
    const requiredFields = [
      'areaIluminada',
      'numPuntosEvaluar',
      'tipoIluminacion',
      'descripcionSuperficie',
      'altura',
      'largo',
      'ancho',
      'tipoLuminaria',
      'potencia',
      'cantidad',
    ];

    for (let field of requiredFields) {
      if (!area[field] || area[field].toString().trim() === '') {
        setSuccessMessage(`Por favor, completa el campo: ${field}`);
        return false;
      }
    }
    setSuccessMessage('');
    return true;
  };

  const handleSaveAll = () => {
    if (!validateForm()) {
      return;
    }
    console.log('Datos guardados desde el botón principal:', areas);
    setSuccessMessage('Guardado con éxito');
  };

  const goToPreviousArea = () => {
    if (currentAreaIndex > 0) {
      setCurrentAreaIndex((prevIndex) => prevIndex - 1);
      setVisibleSections({
        identificacion: false,
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
        identificacion: false,
        dimensiones: false,
        luminarias: false,
        percepcion: false,
        puestoGeneral: false,
      });
    }
  };

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('areas');
      setAreas([getNewArea(1)]);
      setCurrentAreaIndex(0);
      console.log('Local storage limpiado');
    }
  };

  const calculateMinAreas = (indiceArea) => {
    if (indiceArea < 1) return 4;
    if (indiceArea < 2) return 9;
    if (indiceArea < 3) return 16;
    return 25;
  };

  const calculateMaxAreas = (indiceArea) => {
    if (indiceArea < 1) return 6;
    if (indiceArea < 2) return 12;
    if (indiceArea < 3) return 20;
    return 30;
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">RECONOCIMIENTO</h1>
      {successMessage && (
        <div className={`p-2 rounded mb-4 text-center mx-auto w-3/4 ${successMessage.includes('éxito') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {successMessage}
        </div>
      )}
      {!showSummary ? (
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
                  <FormularioPuestos
                    puestos={areas[currentAreaIndex].puestos}
                    handleSavePuestos={(updatedPuestos) => {
                      setAreas((prevAreas) =>
                        prevAreas.map((area, index) =>
                          index === currentAreaIndex ? { ...area, puestos: updatedPuestos } : area
                        )
                      );
                      console.log('Datos de puestos guardados:', updatedPuestos);
                    }}
                  />
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
              query: { areaIluminada: areas[currentAreaIndex]?.areaIluminada || '' }
            }}>
              <button className="bg-orange-500 text-white px-4 py-2 rounded">Ir a Mediciones</button>
            </Link>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleShowSummary}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Mostrar Resumen
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={clearLocalStorage}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Limpiar Datos Guardados
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-100 p-4 mt-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-black dark:text-white text-center">Resumen de Todas las Áreas</h2>
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Área</th>
                  <th className="py-2 px-4 border-b">Área Iluminada</th>
                  <th className="py-2 px-4 border-b">Núm. Puntos a Evaluar</th>
                  <th className="py-2 px-4 border-b">Tipo de Iluminación</th>
                  <th className="py-2 px-4 border-b">Altura</th>
                  <th className="py-2 px-4 border-b">Largo</th>
                  <th className="py-2 px-4 border-b">Ancho</th>
                  <th className="py-2 px-4 border-b">Tipo de Luminaria</th>
                  <th className="py-2 px-4 border-b">Potencia</th>
                  <th className="py-2 px-4 border-b">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {areas.map((area, index) => (
                  <>
                    <tr key={`area-${index}`} className="bg-gray-100">
                      <td className="py-2 px-4 border-b">Área {area.idArea}</td>
                      <td className="py-2 px-4 border-b">{area.areaIluminada}</td>
                      <td className="py-2 px-4 border-b">{area.numPuntosEvaluar}</td>
                      <td className="py-2 px-4 border-b">{area.tipoIluminacion}</td>
                      <td className="py-2 px-4 border-b">{area.altura}</td>
                      <td className="py-2 px-4 border-b">{area.largo}</td>
                      <td className="py-2 px-4 border-b">{area.ancho}</td>
                      <td className="py-2 px-4 border-b">{area.tipoLuminaria}</td>
                      <td className="py-2 px-4 border-b">{area.potencia}</td>
                      <td className="py-2 px-4 border-b">{area.cantidad}</td>
                    </tr>
                    {area.puestos.length > 0 && (
                      <tr key={`puestos-${index}`} className="bg-white">
                        <td colSpan="10" className="py-2 px-4 border-b">
                          <h4 className="text-lg font-bold mt-4">Datos del Puesto - Área {area.idArea}:</h4>
                          <div className="overflow-x-auto w-full">
                            <table className="min-w-full bg-gray-100">
                              <thead>
                                <tr>
                                  <th className="py-2 px-4 border-b">Puesto del Trabajador</th>
                                  <th className="py-2 px-4 border-b">Número de Trabajadores</th>
                                  <th className="py-2 px-4 border-b">Descripción de Actividades</th>
                                  <th className="py-2 px-4 border-b">Tarea Visual</th>
                                </tr>
                              </thead>
                              <tbody>
                                {area.puestos.map((puesto, puestoIndex) => (
                                  <tr key={`puesto-${index}-${puestoIndex}`} className="bg-white">
                                    <td className="py-2 px-4 border-b">{puesto.puestoTrabajador || 'No disponible'}</td>
                                    <td className="py-2 px-4 border-b">{puesto.numTrabajadores || 'No disponible'}</td>
                                    <td className="py-2 px-4 border-b">{puesto.descripcionActividades || 'No disponible'}</td>
                                    <td className="py-2 px-4 border-b">{puesto.tareaVisual || 'No disponible'}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowSummary(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Volver a Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}