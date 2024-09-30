"use client"; // Esto marca el componente como un Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter desde 'next/navigation'

export default function Mediciones() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tipoIluminacion: 'ARTIFICIAL',
    iluminacionLocalizada: 'SÍ',
    areaIluminada: '',
  });

  const [visibleSections, setVisibleSections] = useState({
    tipoIluminaria: false,
    medicion: false,
  });

  // Establecer areaIluminada a partir de la query cuando el componente se monta
  useEffect(() => {
    if (router.query && router.query.areaIluminada) { // Verifica que router.query y areaIluminada estén definidos
      setFormData((prev) => ({
        ...prev,
        areaIluminada: router.query.areaIluminada, // Establece el valor desde la query
      }));
    }
  }, [router.query]); // Dependencia de router.query

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario enviados:', formData);
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
                  className="border p-2">
                  <option value="ARTIFICIAL">ARTIFICIAL</option>
                  <option value="COMBINADA">COMBINADA</option>
                </select>
              </div>
              <div>
                <label>¿EXISTE CCI?:</label>
                <select
                  name="iluminacionLocalizada"
                  value={formData.iluminacionLocalizada}
                  onChange={handleChange}
                  className="border p-2 rounded w-full">
                  <option value="SÍ">SÍ</option>
                  <option value="NO">NO</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
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
                  name="areaIluminada"
                  value={formData.areaIluminada}
                  onChange={handleChange}
                  required
                  className="border p-2"
                />
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2">Enviar</button>
      </form>
    </div>
  );
}
