'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import './globals.css'; // Importación de estilos globales

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState({
    informacionGeneral: false,
    reconocimiento: false,
    mediciones: false,
  });

  const toggleSubmenu = (menu) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="relative h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Botón de menú para móvil */}
      <button
        className="md:hidden bg-blue-900 text-white p-4 z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Fondo oscuro cuando el menú está abierto en móvil */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Barra lateral */}
      <aside
        className={`fixed top-0 left-0 w-64 max-w-[70%] h-full bg-blue-900 text-white p-5 z-50 transform transition-transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:w-64`}
      >
        <div className="mb-8">
          <Image src="/lictus-logo-1.png" alt="Logo" width={100} height={100} />
        </div>
        <nav>
          <ul className="space-y-4">
            {/* Información General */}
            <li>
              <button
                className="w-full text-left flex items-center space-x-2 hover:text-gray-300"
                onClick={() => toggleSubmenu('informacionGeneral')}
              >
                <span>📄</span>
                <span>Información General</span>
              </button>
              {submenuOpen.informacionGeneral && (
                <ul className="pl-6 mt-2 space-y-2">
                  <li>
                    <Link href="/informaciongeneral" className="hover:text-gray-300">
                      Ir a Información General
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Reconocimiento */}
            <li>
              <button
                className="w-full text-left flex items-center space-x-2 hover:text-gray-300"
                onClick={() => toggleSubmenu('reconocimiento')}
              >
                <span>🔍</span>
                <span>Reconocimiento</span>
              </button>
              {submenuOpen.reconocimiento && (
                <ul className="pl-6 mt-2 space-y-2">
                  <li>
                    <Link href="/reconocimiento" className="hover:text-gray-300">
                      Ir a Reconocimiento
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Mediciones */}
            <li>
              <button
                className="w-full text-left flex items-center space-x-2 hover:text-gray-300"
                onClick={() => toggleSubmenu('mediciones')}
              >
                <span>📊</span>
                <span>Mediciones</span>
              </button>
              {submenuOpen.mediciones && (
                <ul className="pl-6 mt-2 space-y-2">
                  <li>
                    <Link href="/mediciones" className="hover:text-gray-300">
                      Ir a Mediciones
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out p-8 pt-16 md:pt-8 md:ml-64 ${
          menuOpen ? 'opacity-20 pointer-events-none md:opacity-100 md:pointer-events-auto' : ''
        }`}
      >
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
      <footer className="footer text-center p-4 bg-gray-100 w-full md:absolute md:bottom-0">
        <p>&copy; 2024 NOM-025-STPS-2008. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
