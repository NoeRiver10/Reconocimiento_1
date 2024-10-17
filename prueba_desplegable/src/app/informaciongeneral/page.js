'use client';

import Head from 'next/head';
import InformacionGeneralForm from '../components/componentsPrincipal/InformacionGeneralForm'; // Ruta corregida
import '../globals.css'; // Importación de estilos globales

export default function InformacionGeneralPage() {
  return (
    <div>
      <Head>
        <title>Información General - Norma 025</title>
      </Head>
      <InformacionGeneralForm />
    </div>
  );
}
