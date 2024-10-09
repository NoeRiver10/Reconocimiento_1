'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css'; // Importación de estilos globales

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <aside className="w-64 bg-blue-900 text-white p-5 fixed h-full">
        <div className="mb-8">
          <Image src="/lictus-logo-1.png" alt="Logo" width={100} height={100} />
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/informaciongeneral" className="flex items-center space-x-2 hover:text-gray-300">
                <span>📄</span>
                <span>Información General</span>
              </Link>
            </li>
            <li>
              <Link href="/reconocimiento" className="flex items-center space-x-2 hover:text-gray-300">
                <span>🔍</span>
                <span>Reconocimiento</span>
              </Link>
            </li>
            <li>
              <Link href="/mediciones" className="flex items-center space-x-2 hover:text-gray-300">
                <span>📊</span>
                <span>Mediciones</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 ml-64 p-8">
        <Head>
          <title>Página Principal - NORMA Oficial Mexicana NOM-025-STPS-2008</title>
          <meta name="description" content="Bienvenido a la página principal de levantamiento de la Norma 025" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        {/* Encabezado */}
        <header className="bg-white shadow p-4 rounded-lg mb-8">
          <h1 className="text-2xl font-bold text-gray-800">NORMA Oficial Mexicana NOM-025-STPS-2008</h1>
        </header>

        {/* Información General */}
        <section className="generalInfo bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Levantamiento NORMA Oficial Mexicana NOM-025-STPS-2008</h2>
          <p className="text-lg text-gray-700">
            Bienvenido a la página de levantamiento de la NORMA Oficial Mexicana NOM-025-STPS-2008. Esta norma está enfocada en las condiciones de iluminación de los centros de trabajo.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer mt-8 text-center p-4 bg-gray-100 w-full absolute bottom-0">
        <p>&copy; 2024 NOM-025-STPS-2008. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
