import React from 'react';

const Luminarias = ({ formData, handleChange, visible, toggleSection }) => {
  return (
    <div className="border rounded-lg shadow-sm">
      <button
        type="button"
        className="bg-red-500 text-white w-full px-4 py-2 rounded-t-lg"
        onClick={toggleSection}
      >
        Luminarias
      </button>
      {visible && (
        <div className="bg-gray-100 p-4 dark:bg-gray-800 rounded-b-lg">
          <h2 className="font-semibold mb-2 text-center">LUMINARIAS</h2>
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
                className="border p-2 rounded w-full"
              >
                <option value="LINEAL">LINEAL</option>
                <option value="PUNTUAL">PUNTUAL</option>
              </select>
            </div>
            <div>
              <label>ILUMINACIÓN LOCALIZADA:</label>
              <select
                name="iluminacionLocalizada"
                value={formData.iluminacionLocalizada}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="SÍ">SÍ</option>
                <option value="NO">NO</option>
              </select>
            </div>
            {formData.iluminacionLocalizada === 'SÍ' && (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Luminarias;
