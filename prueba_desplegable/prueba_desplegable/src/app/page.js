"use client"; // Esto marca el componente como un Client Component

import { useState, useEffect } from 'react';
import './globals.css'; // Asegúrate de que la ruta sea correcta

export default function Reconocimiento() {
  const [formData, setFormData] = useState({
    idArea: '',
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

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
    return 25; // Para IC >= 3
  };

  const calculateMaxAreas = (ic) => {
    if (ic < 1) return 6;
    if (ic < 2) return 12;
    if (ic < 3) return 20;
    return 30; // Para IC >= 3
  };

  const handleSave = () => {
    console.log('Datos guardados:', formData);
    // Aquí podrías implementar lógica para guardar en localStorage o en un estado superior
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Datos del formulario enviados:', formData);
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">RECONOCIMIENTO</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-blue-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('identificacion')}>
            Identificación del Área
          </button>
          {visibleSections.identificacion && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">IDENTIFICACIÓN DEL ÁREA</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label>ID DE ÁREA:</label>
                  <input
                    type="number"
                    name="idArea"
                    value={formData.idArea}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>ÁREA ILUMINADA:</label>
                  <input
                    type="text"
                    name="areaIluminada"
                    value={formData.areaIluminada}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>NÚMERO DE PUNTOS A EVALUAR:</label>
                  <input
                    type="number"
                    name="numPuntosEvaluar"
                    value={formData.numPuntosEvaluar}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>TIPO DE ILUMINACIÓN:</label>
                  <select
                    name="tipoIluminacion"
                    value={formData.tipoIluminacion}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  >
                    <option value="ARTIFICIAL">ARTIFICIAL</option>
                    <option value="COMBINADA">COMBINADA</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-blue-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('descripcion')}>
            Descripción del Área
          </button>
          {visibleSections.descripcion && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">DESCRIPCIÓN DEL ÁREA</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label>COLOR:</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Seleccione un color</option>
                    <option value="ROJO">Rojo</option>
                    <option value="VERDE">Verde</option>
                    <option value="AZUL">Azul</option>
                    <option value="AMARILLO">Amarillo</option>
                    <option value="NEGRO">Negro</option>
                    <option value="BLANCO">Blanco</option>
                  </select>
                </div>
                <div>
                  <label>TIPO DE SUPERFICIE:</label>
                  <input
                    type="text"
                    name="tipoSuperficie"
                    value={formData.tipoSuperficie}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-blue-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('dimensiones')}>
            Dimensiones del Área
          </button>
          {visibleSections.dimensiones && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">DIMENSIONES DEL ÁREA</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label>ALTURA (mts):</label>
                  <input
                    type="number"
                    name="altura"
                    value={formData.altura}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>LARGO (mts):</label>
                  <input
                    type="number"
                    name="largo"
                    value={formData.largo}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>ANCHO (mts):</label>
                  <input
                    type="number"
                    name="ancho"
                    value={formData.ancho}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>ÍNDICE DE ÁREA (IC):</label>
                  <input
                    type="text"
                    value={formData.indiceArea.toFixed(2)}
                    readOnly
                    className="border p-2 bg-gray-200 rounded w-full"
                  />
                </div>
                {/* Cálculo de áreas mínimas y máximas */}
                <div>
                  <label>MÍNIMO DE ÁREAS:</label>
                  <input
                    type="text"
                    value={calculateMinAreas(formData.indiceArea)}
                    readOnly
                    className="border p-2 bg-gray-200 rounded w-full"
                  />
                </div>
                <div>
                  <label>MÁXIMO DE ÁREAS:</label>
                  <input
                    type="text"
                    value={calculateMaxAreas(formData.indiceArea)}
                    readOnly
                    className="border p-2 bg-gray-200 rounded w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-blue-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('luminarias')}>
            Luminarias
          </button>
          {visibleSections.luminarias && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">LUMINARIAS</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label>TIPO DE LUMINARIA:</label>
                  <input
                    type="text"
                    name="tipoLuminaria"
                    value={formData.tipoLuminaria}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>POTENCIA (W):</label>
                  <input
                    type="number"
                    name="potencia"
                    value={formData.potencia}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>DISTRIBUCIÓN:</label>
                  <select
                    name="distribucion"
                    value={formData.distribucion}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  >
                    <option value="LINEAL">LINEAL</option>
                    <option value="PUNTO">PUNTO</option>
                  </select>
                </div>
                <div>
                  <label>ILUMINACIÓN LOCALIZADA:</label>
                  <select
                    name="iluminacionLocalizada"
                    value={formData.iluminacionLocalizada}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  >
                    <option value="SÍ">SÍ</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
                <div>
                  <label>CANTIDAD:</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-blue-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('percepcion')}>
            Percepción del Trabajo
          </button>
          {visibleSections.percepcion && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">PERCEPCIÓN DEL TRABAJO</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label>Tiene Nombre Trabajador?</label>
                  <select
                    name="tieneNombreTrabajador"
                    value={formData.tieneNombreTrabajador}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  >
                    <option value="NO">NO</option>
                    <option value="SÍ">SÍ</option>
                  </select>
                </div>
                {formData.tieneNombreTrabajador === 'SÍ' && (
                  <div>
                    <label>NOMBRE DEL TRABAJADOR:</label>
                    <input
                      type="text"
                      name="nombreTrabajador"
                      value={formData.nombreTrabajador}
                      onChange={handleChange}
                      className="border p-2 rounded w-full"
                    />
                  </div>
                )}
                <div>
                  <label>DESCRIPCIÓN:</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>REPORTES:</label>
                  <textarea
                    name="reportes"
                    value={formData.reportes}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-blue-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('puesto')}>
            Datos del Puesto
          </button>
          {visibleSections.puesto && (
            <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
              <h2 className="font-semibold mb-2">DATOS DEL PUESTO</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label>PUESTO DEL TRABAJADOR:</label>
                  <input
                    type="text"
                    name="puestoTrabajador"
                    value={formData.puestoTrabajador}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>NÚMERO DE TRABAJADORES:</label>
                  <input
                    type="number"
                    name="numTrabajadores"
                    value={formData.numTrabajadores}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>DESCRIPCIÓN DE ACTIVIDADES:</label>
                  <textarea
                    name="descripcionActividades"
                    value={formData.descripcionActividades}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>TAREA VISUAL:</label>
                  <textarea
                    name="tareaVisual"
                    value={formData.tareaVisual}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label>NIVEL MÍNIMO DE ILUMINACIÓN:</label>
                  <select
                    name="nivelMinimoIluminacion"
                    value={formData.nivelMinimoIluminacion}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded w-full"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botones para guardar y enviar */}
        <div className="flex justify-between">
          <button type="button" onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
            Guardar
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
