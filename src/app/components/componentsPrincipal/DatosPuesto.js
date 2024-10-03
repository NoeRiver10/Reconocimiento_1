import React, { useState } from 'react';

const DatosPuesto = ({ formData, handleChange, visible, toggleSection }) => {
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
      workArea: 'Interiores generales: almacenes de poco movimiento, pasillos, escaleras, estacionamientos cubiertos, labores en minas subterráneas, iluminación de emergencia. .'
    },
    100: {
      visualTask: 'En interiores. ',
      workArea: 'Areas de circulación y pasillos; salas de espera; salas de descanso; cuartos de almacén; plataformas; cuartos de calderas. '
    },
    200: {
      visualTask: 'Requerimiento visual simple:inspección visual, recuento de piezas, trabajo en banco y máquina.',
      workArea: 'Servicios al personal: almacenaje rudo,recepción y despacho, casetas de vigilancia, cuartos de compresores y pailería. '
    },
    300: {
      visualTask: 'Distinción moderada de detalles: ensamble simple, trabajo medio en banco y máquina, inspección simple, empaque y trabajos de oficina. ',
      workArea: 'Talleres: áreas de empaque y ensamble, aulas y oficinas. '
    },
    500: {
      visualTask: 'Distinción clara de detalles: maquinado y acabados delicados, ensamble de inspección moderadamente difícil, captura y procesamiento de información, manejo de instrumentos y equipo de laboratorio. ',
      workArea: 'Talleres de precisión: salas de cómputo, áreas de dibujo, laboratorios. '
    },
    750: {
      visualTask: 'Distinción fina de detalles: maquinado de precisión, ensamble e inspecciónde trabajos delicados, manejo de instrumentos y equipo de precisión,manejo de piezas pequeñas.',
      workArea: 'Talleres de alta precisión: de pintura y acabado de superficies y laboratorios de control de calidad.'
    },
    1000: {
      visualTask: 'Alta exactitud en la distinción de detalles: ensamble, proceso e inspección de piezas pequeñas y complejas, acabado con pulidos finos.',
      workArea: 'Proceso: ensamble e inspección de piezas complejas y acabados con pulidos finos. '
    },
    2000: {
      visualTask: 'Alto grado de especialización en la distinción de detalles. ',
      workArea: 'Proceso de gran exactitud. Ejecución de tareas visuales: -de bajo contraste y tamaño muy pequeño por periodos prolongados;• exactas y muy prolongadas, y • muy especiales de extremadamente bajo contraste y pequeño tamaño. '
    },
  };

  const validateForm = () => {
    setErrorMessage(''); // Resetear mensaje de error
    if (!formData.puestoTrabajador || !formData.numTrabajadores || !formData.descripcionActividades || !formData.tareaVisual) {
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
      // Aquí iría la lógica de guardar datos
      console.log('Datos guardados:', formData);
    }
  };

  const handleNumTrabajadoresChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value, 10)); // Asegurar que el valor sea >= 0
    handleChange({ target: { name: 'numTrabajadores', value } });
  };

  const handleNivelMinimoIluminacionChange = (e) => {
    const value = e.target.value;
    handleChange(e); // Actualizar el formData con el nuevo valor
    setDescription(illuminationDescriptions[value]?.workArea); // Establecer la descripción del área de trabajo
    setVisualTask(illuminationDescriptions[value]?.visualTask); // Establecer la tarea visual correspondiente
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
                value={formData.puestoTrabajador}
                onChange={handleChange}
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
                value={formData.numTrabajadores}
                onChange={handleNumTrabajadoresChange} // Usar la función modificada
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="descripcionActividades">DESCRIPCIÓN DE ACTIVIDADES:</label>
              <textarea
                id="descripcionActividades"
                name="descripcionActividades"
                value={formData.descripcionActividades}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="nivelMinimoIluminacion">NIVEL MÍNIMO DE ILUMINACIÓN (lux):</label>
              <select
                id="nivelMinimoIluminacion"
                name="nivelMinimoIluminacion"
                value={formData.nivelMinimoIluminacion}
                onChange={handleNivelMinimoIluminacionChange} // Usar la nueva función para manejar cambios
                className="border p-2 rounded w-full"
                required
              >
                <option value="20">20 lux</option>
                <option value="50">50 lux</option>
                <option value="100">100 lux</option>
                <option value="200">200 lux</option>
                <option value="300">300 lux</option>
                <option value="500">500 lux</option>
                <option value="750">750 lux</option>
                <option value="1000">1000 lux</option>
                <option value="2000">2000 lux</option>
              </select>
            </div>

            {/* Subtítulos y descripciones */}
            <div className="mt-4">
              <h3 className="font-semibold">TAREA VISUAL DEL PUESTO DE TRABAJO:</h3>
              <p>{visualTask}</p> {/* Mostrar tarea visual según la opción seleccionada */}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">ÁREA DE TRABAJO:</h3>
              <p>{description}</p> {/* Mostrar descripción según la opción seleccionada */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatosPuesto;