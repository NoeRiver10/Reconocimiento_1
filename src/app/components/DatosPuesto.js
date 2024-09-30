import React from 'react';

const DatosPuesto = ({ formData, handleChange, visible, toggleSection }) => {
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
              ></textarea>
            </div>
            <div>
              <label>TAREA VISUAL:</label>
              <input
                type="text"
                name="tareaVisual"
                value={formData.tareaVisual}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label>NIVEL MÍNIMO DE ILUMINACIÓN (watts):</label>
              <select
                name="nivelMinimoIluminacion"
                value={formData.nivelMinimoIluminacion}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              >
                {/* Rango de 20 a 100 en incrementos de 5 */}
                {[...Array(17).keys()].map((i) => {
                  const value = 20 + i * 5; // Crea valores: 20, 25, 30, ..., 100
                  return (
                    <option key={value} value={value}>
                      {value} W
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatosPuesto;
