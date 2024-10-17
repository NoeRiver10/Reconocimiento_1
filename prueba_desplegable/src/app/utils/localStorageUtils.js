// src/app/utils/localStorageUtils.js

// Verificar si estamos en un entorno de navegador (para usar localStorage)
const isBrowser = typeof window !== 'undefined';

// Función para obtener las áreas desde localStorage
export const getAreasFromLocalStorage = () => {
  if (!isBrowser) return [];

  try {
    const areas = localStorage.getItem('areas');
    return areas ? JSON.parse(areas) : [];
  } catch (error) {
    console.error('Error al obtener las áreas desde localStorage:', error);
    return [];
  }
};

// Función para guardar las áreas en localStorage
export const setAreasToLocalStorage = (areas) => {
  if (!isBrowser) return;

  try {
    localStorage.setItem('areas', JSON.stringify(areas));
    console.log('Áreas guardadas en localStorage:', areas);
  } catch (error) {
    console.error('Error al guardar las áreas en localStorage:', error);
  }
};

// Función para limpiar las áreas en localStorage
export const clearAreasFromLocalStorage = () => {
  if (!isBrowser) return;

  try {
    localStorage.removeItem('areas');
    console.log('Áreas eliminadas del localStorage');
  } catch (error) {
    console.error('Error al eliminar las áreas de localStorage:', error);
  }
};
