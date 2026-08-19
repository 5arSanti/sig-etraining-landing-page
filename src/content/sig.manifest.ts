export type DeliverableKind = 'image' | 'pdf' | 'xlsx' | 'placeholder';

export type SigSlug =
  | 'entradas-salidas'
  | 'pestel'
  | 'matriz-interesados'
  | 'mapa-de-procesos'
  | 'matriz-raci'
  | 'politica-sig'
  | 'infografia';

export type SipocRow = {
  provider: string;
  input: string;
  process: string;
  output: string;
  customer: string;
};

export type SigTopic = {
  slug: SigSlug;
  number: number;
  title: string;
  summary: string;
  body: string;
  kind: DeliverableKind;
  files: string[];
  sipocRows?: readonly SipocRow[];
};

export const SIG_TOPICS: readonly SigTopic[] = [
  {
    slug: 'entradas-salidas',
    number: 1,
    title: 'Entradas y Salidas (SIPOC)',
    summary: 'SIPOC de proveedores, entradas, procesos y clientes de Etraining.',
    body: 'El diagrama SIPOC muestra cómo entra trabajo a Etraining y qué sale al cliente. Emotions aporta hardware para kits de robótica (micro:bit) al público general. Comware aporta licitaciones que Etraining convierte en proyectos cerrados. Google Cloud aporta infraestructura; la salida es seguridad, escalabilidad y redundancia, y el cliente es la propia Etraining.',
    kind: 'image',
    files: ['/sig/entradas-salidas/1-entradas-salidas.jpg'],
    sipocRows: [
      {
        provider: 'Emotions',
        input: 'Hardware (equipos de cómputo)',
        process: 'Desarrollo de microbits',
        output: 'Kits de robótica',
        customer: 'Público general',
      },
      {
        provider: 'Comware',
        input: 'Licitación de proyectos',
        process: 'Desarrollo de proyectos',
        output: 'Proyectos finalizados',
        customer: 'Público general',
      },
      {
        provider: 'Google',
        input: 'Infraestructura nube GCP',
        process: 'Implementación y despliegue de procesos en la nube',
        output: 'Seguridad, escalabilidad y redundancia de proyectos',
        customer: 'Etraining',
      },
    ],
  },
  {
    slug: 'pestel',
    number: 2,
    title: 'Contexto PESTEL',
    summary: 'Contexto PESTEL y alcance del SIG.',
    body: 'El análisis PESTEL mapea seis factores del entorno: político (continuidad de políticas de transformación digital y contratación pública), económico (ciclo presupuestal público y TRM sobre cloud), social (brecha digital territorial y demanda de reskilling), tecnológico (IA generativa y dependencia de nube de terceros), ecológico (educación ambiental y sostenibilidad digital) y legal (Ley 1581 de 2012, Ley 80/1993 y 1150/2007). El alcance del SIG cubre el diseño, desarrollo, implementación y soporte de soluciones de educación digital (contenidos, experiencias de aprendizaje, SaaS/LMS, kits tecnológicos y clientes institucionales). Los procesos se organizan en tres capas: estratégicos (comercial, direccionamiento, licitaciones), misionales (contenidos, software, diseño pedagógico, analítica, conocimiento) y de gerencia (TH, compras, TI, jurídica, financiera, SST).',
    kind: 'pdf',
    files: ['/sig/pestel/2-pestel.pdf'],
  },
  {
    slug: 'matriz-interesados',
    number: 3,
    title: 'Matriz de Interesados',
    summary: 'Quién tiene poder e interés sobre el SIG.',
    body: 'La matriz mapea diez grupos de stakeholders: entidades públicas contratantes (MinTIC, MinEducación, SENA, Registraduría), gobernaciones y alcaldías (Barranquilla, Santa Marta, Gachancipá, Guajira, Cesar), proveedores tecnológicos globales (Microsoft Azure, AWS, Oracle, Google Cloud), docentes y funcionarios públicos beneficiarios (rama judicial, secretarías de educación), estudiantes y jóvenes beneficiarios (bootcamps, STEAM, tecnoacademias), empresarios y emprendedores (campus virtual con Cámara de Comercio), equipo directivo y accionistas de Etraining, equipo técnico y pedagógico (desarrolladores, diseñadores instruccionales, soporte LMS), organismos multilaterales y cooperación internacional (OEI, CISP) e instituciones educativas y universidades aliadas (Universidad Libre, Politécnico Grancolombiano). Los cuatro cuadrantes de la matriz son: mantener satisfechos (proveedores tecnológicos, universidades aliadas, cooperación internacional), administrar de cerca (entidades públicas contratantes, alta gerencia, gobernaciones y alcaldías, entidades beneficiarias), monitorear (empresarios y emprendedores) y mantener informados (estudiantes, docentes y formadores, equipos técnicos y pedagógicos).',
    kind: 'pdf',
    files: ['/sig/matriz-interesados/3-matriz-interesados.pdf'],
  },
  {
    slug: 'mapa-de-procesos',
    number: 4,
    title: 'Mapa de Procesos',
    summary: 'Mapa de procesos estratégicos, misionales y de soporte.',
    body: 'El mapa (PDF) es la fuente. Organiza el SIG en procesos estratégicos (dirección, comercial, licitaciones), misionales (contenidos, software, pedagogía, analítica, conocimiento) y de gerencia o soporte (talento humano, compras, TI, jurídica, financiera, SST). Léalo de arriba hacia abajo: la estrategia habilita la operación, y el soporte sostiene ambas.',
    kind: 'pdf',
    files: ['/sig/mapa-de-procesos/4-mapa-de-procesos.pdf'],
  },
  {
    slug: 'matriz-raci',
    number: 5,
    title: 'Matriz RACI',
    summary: 'Responsable, a cargo, consultado e informado por proceso.',
    body: 'La matriz asigna R (ejecuta), A (aprueba; uno por actividad), C (consultado) e I (informado) a seis roles de liderazgo. Las columnas agrupan gestión estratégica y comercial, operación misional y tecnología, y soporte y cumplimiento. El libro tiene tres hojas: la matriz, las claves desplegables y las personas con su rol.',
    kind: 'xlsx',
    files: ['/sig/matriz-raci/5-matriz-raci.xlsx'],
  },
  {
    slug: 'politica-sig',
    number: 6,
    title: 'Política del SIG',
    summary: 'Política del Sistema Integrado de Gestión.',
    body: 'Este tema se publicará aquí.',
    kind: 'placeholder',
    files: [],
  },
  {
    slug: 'infografia',
    number: 7,
    title: 'Infografía del SIG',
    summary: 'Infografía del SIG.',
    body: 'Este tema se publicará aquí.',
    kind: 'placeholder',
    files: [],
  },
];

export const SIG_LOBBY_INTRO =
  'El SIG de Etraining administra el diseño, desarrollo, implementación y el soporte de las soluciones integrales digitales para la educación: contenidos, experiencias de aprendizaje, plataformas SaaS y LMS, dotaciones tecnológicas y servicios a clientes institucionales del sector público o privado.';
