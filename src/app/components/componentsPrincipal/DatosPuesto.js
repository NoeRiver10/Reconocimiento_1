import React, { useState } from 'react';

const DatosPuesto = ({ formData = {}, handleChange, visible, toggleSection }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState('');
  const [visualTask, setVisualTask] = useState('');

  const illuminationDescriptions = {
    20: {
      visualTask: 'En exteriores: distinguir el área de tránsito, desplazarse caminando, vigilancia, movimiento de vehículos.',
      workArea: 'Exteriores generales: patios y estacionamientos.'
    },
    50: {
      visualTask: 'En interiores: distinguir el área de tránsito, desplazarse caminando, vigilancia, movimiento de vehículos.',
      workArea: 'Interiores generales: almacenes de poco movimiento, pasillos, escaleras, estacionamientos cubiertos, labores en minas subteráneas, iluminación de emergencia.'
    },
    100: {
      visualTask: 'En interiores. ',
      workArea: 'Areas de circulación y pasillos; salas de espera; salas de descanso; cuartos de almacén; plataformas; cuartos de calderas.'
    },
    200: {
      visualTask: 'Requerimiento visual simple: inspección visual, recuento de piezas, trabajo en banco y máquina.',
      workArea: 'Servicios al personal: almacenaje rudo, recepción y despacho, casetas de vigilancia, cuartos de compresores y pailería.'
    },
    300: {
      visualTask: 'Distinción moderada de detalles: ensamble simple, trabajo medio en banco y máquina, inspección simple, empaque y trabajos de oficina.',
      workArea: 'Talleres: áreas de empaque y ensamble, aulas y oficinas.'
    },
    500: {
      visualTask: 'Distinción clara de detalles: maquinado y acabados delicados, ensamble de inspección moderadamente difícil, captura y procesamiento de información, manejo de instrumentos y equipo de laboratorio.',
      workArea: 'Talleres de precisión: salas de cómputo, áreas de dibujo, laboratorios.'
    },
    750: {
      visualTask: 'Distinción fina de detalles: maquinado de precisión, ensamble e inspección de trabajos delicados, manejo de instrumentos y equipo de precisión, manejo de piezas pequeñas.',
      workArea: 'Talleres de alta precisión: de pintura y acabado de superficies y laboratorios de control de calidad.'
    },
    1000: {
      visualTask: 'Alta exactitud en la distinción de detalles: ensamble, proceso e inspección de piezas pequeñas y complejas, acabado con pulidos finos.',
      workArea: 'Proceso: ensamble e inspección de piezas complejas y acabados con pulidos finos.'
    },
    2000: {
      visualTask: 'Alto grado de especialización en la distinción de detalles.',
      workArea: 'Proceso de gran exactitud. Ejecución de tareas visuales: -de bajo contraste y tamaño muy pequeño por periodos prolongados; exactas y muy prolongadas, y muy especiales de extremadamente bajo contraste y pequeño tamaño.'
    },
  };

  const validateForm = () => {
    setErrorMessage(''); // Resetear mensaje de error
    if (!formData.puestoTrabajador || !formData.numTrabajadores || !formData.descripcionActividades || !formData.nivelMinimoIluminacion) {
      setErrorMessage('Por favor, completa todos los campos obligatorios.');
      return false;
    }
    if (formData.numTrabajadores < 0) { // Validación de número de trabajadores
      setErrorMessage('El número de trabajadores debe ser mayor o igual que cero.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Datos guardados:', formData);
    }
  };

  const handleNumTrabajadoresChange = (e) => {
    let value = e.target.value.replace(/^0+(?!$)/, ''); // Remover ceros iniciales excepto cuando es "0"
    value = value === '' ? '' : Math.max(0, parseInt(value, 10)); // Asegurar que el valor sea >= 0
    handleChange('numTrabajadores', value);
  };

  const handleNivelMinimoIluminacionChange = (e) => {
    const value = e.target.value;
    handleChange('nivelMinimoIluminacion', value);
    if (illuminationDescriptions[value]) {
      setDescription(illuminationDescriptions[value].workArea); // Establecer la descripción del área de trabajo
      setVisualTask(illuminationDescriptions[value].visualTask); // Establecer la tarea visual correspondiente
    } else {
      setDescription('');
      setVisualTask('');
    }
  };

  return (
    <div className="border rounded-lg shadow-sm">
      <button
        type="button"
        className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg"
        onClick={toggleSection}
      >
        Datos del Puesto
      </button>
      {visible && (
        <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
          <h2 className="font-semibold mb-2 text-center">DATOS DEL PUESTO</h2>
          {errorMessage && (
            <div className="bg-red-500 text-white p-2 rounded mb-4 text-center">{errorMessage}</div>
          )}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="puestoTrabajador">PUESTO DEL TRABAJADOR:</label>
              <input
                type="text"
                id="puestoTrabajador"
                name="puestoTrabajador"
                value={formData.puestoTrabajador || ''}
                onChange={(e) => handleChange('puestoTrabajador', e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="numTrabajadores">NÚMERO DE TRABAJADORES:</label>
              <input
                type="number"
                id="numTrabajadores"
                name="numTrabajadores"
                value={formData.numTrabajadores || ''}
                onChange={handleNumTrabajadoresChange}
                className="border p-2 rounded w-full"
                required
                min="0"
              />
            </div>
            <div>
              <label htmlFor="descripcionActividades">DESCRIPCIÓN DE ACTIVIDADES:</label>
              <textarea
                id="descripcionActividades"
                name="descripcionActividades"
                value={formData.descripcionActividades || ''}
                onChange={(e) => handleChange('descripcionActividades', e.target.value)}
                className="border p-2 rounded w-full"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="nivelMinimoIluminacion">NIVEL MÍNIMO DE ILUMINACIÓN (lux):</label>
              <select
                id="nivelMinimoIluminacion"
                name="nivelMinimoIluminacion"
                value={formData.nivelMinimoIluminacion || ''}
                onChange={handleNivelMinimoIluminacionChange}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Selecciona un nivel</option>
                {Object.keys(illuminationDescriptions).map((key) => (
                  <option key={key} value={key}>{`${key} lux`}</option>
                ))}
              </select>
            </div>

            {/* Subtítulos y descripciones */}
            <div className="mt-4">
              <h3 className="font-semibold">TAREA VISUAL DEL PUESTO DE TRABAJO:</h3>
              <p>{visualTask}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">ÁREA DE TRABAJO:</h3>
              <p>{description}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar Datos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatosPuesto;