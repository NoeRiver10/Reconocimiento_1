import { useEffect } from 'react';

export default function Mediciones() {
  useEffect(() => {
    console.log("Cargando la página de mediciones");
  }, []);

  return (
    <div>
      <h1>Mediciones</h1>
      <p>Aquí puedes ingresar las mediciones.</p>
    </div>
  );
}
