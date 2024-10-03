"use client"; // Asegúrate de incluir esta línea al inicio del archivo

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Mediciones({ areaIluminada }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tipoIluminacion: 'ARTIFICIAL',
    iluminacionLocalizada: 'SÍ',
    area: areaIluminada || '', // Inicializa con el prop
    departamento: '',
    numeroPuntos: '',
    mediciones: [],
  });
  const [visibleSections, setVisibleSections] = useState({
    tipoIluminaria: true,
    medicion: true,
  });
  useEffect(() => {
    // Log para verificar el valor de areaIluminada
    console.log('Área iluminada desde props:', areaIluminada);

    // Solo actualiza si `areaIluminada` es diferente
    if (areaIluminada && formData.area !== areaIluminada) {
      setFormData((prev) => ({
        ...prev,
        area: areaIluminada,
      }));
    }
  }, [areaIluminada, formData.area]);

  
  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  const addMedicion = () => {
    const newMedicion = {
      puesto: '',
      identificacion: '',
      horario: '',
      e1: '',
      e2: '',
    };
    setFormData((prev) => ({
      ...prev,
      mediciones: [...prev.mediciones, newMedicion],
    }));
  };

  const handleMedicionChange = (index, e) => {
    const { name, value } = e.target;
    const newMediciones = [...formData.mediciones];
    newMediciones[index] = {
      ...newMediciones[index],
      [name]: value,
    };
    setFormData({ ...formData, mediciones: newMediciones });
  };

  const renderMediciones = () => {
    const numPuntos = parseInt(formData.numeroPuntos, 10);
    const numMediciones = formData.iluminacionLocalizada === 'SÍ' ? 4 : 3;

    return Array.from({ length: numPuntos }, (_, index) => (
      <div key={index} className="mb-4 border p-4 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800">
        <h3>Medición {index + 1}</h3>
        <div>
          <label>Puesto:</label>
          <input
            type="text"
            name="puesto"
            value={formData.mediciones[index]?.puesto || ''}
            onChange={(e) => handleMedicionChange(index, e)}
            className="border p-2 mb-2 w-full"
            required
          />
        </div>
        <div>
          <label>Identificación:</label>
          <input
            type="text"
            name="identificacion"
            value={formData.mediciones[index]?.identificacion || ''}
            onChange={(e) => handleMedicionChange(index, e)}
            className="border p-2 mb-2 w-full"
            required
          />
        </div>

        {Array.from({ length: formData.tipoIluminacion === 'ARTIFICIAL' ? 1 : numMediciones }, (_, i) => (
          <div key={i} className='mb-4'>
            <h4 className="font-semibold">{formData.tipoIluminacion === 'ARTIFICIAL' ? 'Medición' : `Medición ${i + 1}`}</h4>
            <label>Horario:</label>
            <input
              type="time"
              name="horario"
              value={formData.mediciones[index]?.horario || ''}
              onChange={(e) => handleMedicionChange(index, e)}
              className="border p-2 mb-2 w-full"
            />
            <label>E2:</label>
            <input
              type="number"
              name="e2"
              value={formData.mediciones[index]?.e2 || ''}
              onChange={(e) => handleMedicionChange(index, e)}
              className="border p-2 mb-2 w-full"
            />
            <label>E1:</label>
            <input
              type="number"
              name="e1"
              value={formData.mediciones[index]?.e1 || ''}
              onChange={(e) => handleMedicionChange(index, e)}
              className="border p-2 mb-2 w-full"
            />
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white text-center">MEDICIONES</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-lg shadow-sm">
          <button type="button" className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('tipoIluminaria')}>
            Iluminación 
          </button>
          {visibleSections.tipoIluminaria && (
            <div className="bg-gray-100 p-4 mt-2 dark:bg-gray-800">
              <h2 className="font-semibold mb-2 text-center">TIPO DE ILUMINACIÓN</h2>
              <div>
                <label>TIPO DE ILUMINACIÓN:</label>
                <select
                  name="tipoIluminacion"
                  value={formData.tipoIluminacion}
                  onChange={handleChange}
                  className="border p-2 w-full">
                  <option value="ARTIFICIAL">ARTIFICIAL</option>
                  <option value="COMBINADA">COMBINADA</option>
                </select>
              </div>
              <div>
                <label>¿EXISTE CCI?:</label>
                <select
                  name="iluminacionLocalizada"
                  value={formData.iluminacionLocalizada}
                  onChange={formData.tipoIluminacion === 'ARTIFICIAL' ? undefined : handleChange} // Deshabilitar si es artificial
                  className="border p-2 rounded w-full"
                  disabled={formData.tipoIluminacion === 'ARTIFICIAL'}
                >
                  <option value="SÍ">SÍ</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg shadow-sm mt-4">
          <button type="button" className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg" onClick={() => toggleSection('medicion')}>
            Área
          </button>
          {visibleSections.medicion && (
            <div className="bg-gray-100 p-4 mt-2 dark:bg-gray-800">
              <h2 className="font-semibold mb-2 text-center">ÁREA</h2>
              <div>
                <label>ÁREA:</label>
                <input
                type="text"
                name="area"
                value={formData.area} // Este es el valor que quieres que se muestre
                onChange={handleChange}
                required
                className="border p-2 w-full"
                />
              </div>
              <div>
                <label>DEPARTAMENTO:</label>
                <input
                  type="text"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  required
                  className="border p-2 w-full"
                />
              </div>
              <div>
                <label>NÚMERO DE PUNTOS:</label>
                <input
                  type="number"
                  name="numeroPuntos"
                  value={formData.numeroPuntos}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>
            </div>
          )}
        </div>

        {/* Renderizar las mediciones según el número de puntos */}
        {renderMediciones()}

        <button type="button" onClick={addMedicion} className="bg-blue-500 text-white px-4 py-2">
          Agregar Medición
        </button>

        <button type="submit" className="bg-green-500 text-white px-4 py-2">Enviar</button>
      </form>
    </div>
  );
}
