'use client';

import { useState } from 'react';

export default function InformacionGeneralForm() {
  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    idInforme: '',
    empresa: '',
    rfc: '',
    telefono: '',
    giroEmpresa: '',
    representanteLegal: '',
    direccion: '',
    tecnicoRealizo: '',
    fechaReconocimiento: '',
    fechaMuestreoInicial: '',
    fechaElaboracionReporte: '',
  });

  // Manejador para los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-900 max-w-3xl rounded-lg shadow-lg">
      <button
        type="button"
        className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg mb-4"
      >
        Información General
      </button>
      <div className="bg-gray-100 p-8 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Formulario de Información General</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-gray-700 dark:text-white">ID Informe</label>
              <input
                type="text"
                name="idInforme"
                value={formData.idInforme}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-white">Empresa</label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-white">RFC</label>
              <input
                type="text"
                name="rfc"
                value={formData.rfc}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-white">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-white">Giro de la Empresa</label>
              <input
                type="text"
                name="giroEmpresa"
                value={formData.giroEmpresa}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-white">Representante Legal</label>
              <input
                type="text"
                name="representanteLegal"
                value={formData.representanteLegal}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-gray-700 dark:text-white">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-white">Técnico Realizó</label>
              <input
                type="text"
                name="tecnicoRealizo"
                value={formData.tecnicoRealizo}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-white">Fecha de Reconocimiento</label>
              <input
                type="date"
                name="fechaReconocimiento"
                value={formData.fechaReconocimiento}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-white">Fecha de Muestreo Inicial</label>
              <input
                type="date"
                name="fechaMuestreoInicial"
                value={formData.fechaMuestreoInicial}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 dark:text-white">Fecha de Elaboración de Reporte</label>
              <input
                type="date"
                name="fechaElaboracionReporte"
                value={formData.fechaElaboracionReporte}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-8 text-center">
            <button type="submit" className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300">
              Guardar Información
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}