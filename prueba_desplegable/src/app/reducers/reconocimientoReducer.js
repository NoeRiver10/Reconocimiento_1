export const initialState = {
    areas: [],
    currentAreaIndex: 0,
    activeSection: null,
    successMessage: '',
    showSummary: false,
  };
  
  export function reconocimientoReducer(state, action) {
    switch (action.type) {
      case 'SET_AREAS':
        return { ...state, areas: action.payload };
      case 'ADD_AREA':
        return {
          ...state,
          areas: [...state.areas, getNewArea(state.areas.length + 1)],
          currentAreaIndex: state.areas.length,
          activeSection: null,
          successMessage: '',
        };
      case 'DELETE_AREA':
        return {
          ...state,
          areas: state.areas.filter((area) => area.idArea !== action.payload),
          currentAreaIndex: state.currentAreaIndex > 0 ? state.currentAreaIndex - 1 : 0,
          successMessage: 'Área eliminada con éxito',
        };
      case 'UPDATE_AREA':
        return {
          ...state,
          areas: state.areas.map((area, index) =>
            index === state.currentAreaIndex ? { ...area, ...action.payload } : area
          ),
        };
      case 'SET_SUCCESS_MESSAGE':
        return { ...state, successMessage: action.payload };
      case 'TOGGLE_SECTION':
        return { ...state, activeSection: state.activeSection === action.payload ? null : action.payload };
      case 'SET_SHOW_SUMMARY':
        return { ...state, showSummary: action.payload };
      case 'SET_CURRENT_AREA_INDEX':
        return { ...state, currentAreaIndex: action.payload };
      default:
        return state;
    }
  }
  
  export const getNewArea = (id) => ({
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
  