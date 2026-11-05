export type DeliverableKind = 'image' | 'pdf' | 'xlsx' | 'spreadsheet' | 'text' | 'placeholder';

export type SigSlug =
  | 'entradas-salidas'
  | 'pestel'
  | 'matriz-interesados'
  | 'mapa-de-procesos'
  | 'matriz-raci'
  | 'politica-sig'
  | 'infografia'
  | 'aspectos-impactos'
  | 'matriz-vpir'
  | 'riesgos-seguridad-informacion'
  | 'riesgos-calidad'
  | 'control-operacional'
  | 'seguimiento-medicion'
  | 'emergencias';

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
  /** Formal text deliverable (e.g. Política del SIG). Shown instead of a file viewer. */
  textContent?: string;
  sipocRows?: readonly SipocRow[];
  isoTag?: string;
  owner?: string;
  scope?: string;
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
    summary: 'Compromiso de la Alta Dirección con el Sistema Integrado de Gestión.',
    body: 'La Política del SIG es el compromiso público de Etraining S.A.S. con la calidad del servicio, el cumplimiento normativo, la mejora continua, el talento humano, la seguridad y salud en el trabajo y la responsabilidad ambiental. No hay adjunto: el texto siguiente es el entregable.',
    kind: 'text',
    files: [],
    textContent:
      'En Etraining SAS nos comprometemos a satisfacer los requisitos y expectativas de nuestros clientes, ofreciendo productos y servicios de calidad que cumplan con los requisitos legales y normativos aplicables. Promovemos la mejora continua de nuestro Sistema Integrado de Gestión mediante el establecimiento y seguimiento de objetivos medibles. Contamos con talento humano competente y gestionamos nuestros procesos con enfoque basado en riesgos. Protegemos la seguridad y salud de nuestros colaboradores y actuamos de manera responsable con el medio ambiente. La Alta Dirección asigna los recursos necesarios y comunica esta política a todos los niveles de la organización.',
  },
  {
    slug: 'infografia',
    number: 7,
    title: 'Infografía del SIG',
    summary: 'Resumen visual de Etraining y el alcance del SIG.',
    body: 'Infografía institucional del Grupo 2: identidad de Etraining, líneas de negocio, casos de impacto y alcance del Sistema Integrado de Gestión. La imagen es el entregable visual; léala como mapa rápido antes de entrar a los otros temas del SIG.',
    kind: 'image',
    files: ['/sig/infografia/5-infografia.png'],
  },
  {
    slug: 'aspectos-impactos',
    number: 8,
    title: 'Matriz de aspectos e impactos',
    summary: 'Cinco procesos de Etraining y su impacto ambiental.',
    isoTag: 'ISO 14001',
    body: 'La matriz identifica aspectos e impactos ambientales de cinco procesos. Léala de izquierda a derecha: actividad, aspecto, impacto, medio afectado y control sugerido. (1) Gestión de infraestructura tecnológica / soporte TI interno: RAEE al disponer equipos obsoletos; suelo y agua; gestor autorizado. (2) Logística de dotación de laboratorios STEAM: bus de 30 pasajeros; aire y GEI; mantenimiento, revisión de gases y rutas. (3) Gestión de infraestructura tecnológica: racks on-premise; energía; virtualización y monitoreo. (4) STEAM e innovación educativa: residuo de impresión 3D; suelo; segregación y reciclaje autorizado. (5) Desarrollo de software a la medida: Azure y GCP; energía indirecta; auto-scaling, apagado de ambientes ociosos y proveedores con energía renovable. El PDF es el entregable; no se reconstruye la tabla en HTML.',
    kind: 'pdf',
    files: ['/sig/aspectos-impactos/8-matriz-aspectos-impactos.pdf'],
  },
  {
    slug: 'matriz-vpir',
    number: 9,
    title: 'Matriz VPIR',
    summary: 'Valoración de peligros y riesgos (GTC 45) sobre las mismas actividades.',
    isoTag: 'ISO 45001',
    body: 'La VPIR valora peligros de SST con la metodología GTC 45, sobre las actividades de la matriz ambiental. Las columnas ND, NE, NP, NC y NR construyen el nivel de riesgo; «no aceptable» obliga a las medidas de intervención del PDF. Cuatro valoraciones: manejo de RAEE (químico, NR 300, II; control específico), bus STEAM (accidente de tránsito, NR 1800, I; PESV, límite de horas de conducción e inspección preoperacional), racks y UPS on-premise (eléctrico, NR 400, II; LOTO, RETIE y detección de incendio) e impresión 3D (químico y físico, NR 150, II; extracción HEPA/carbón, PLA y guantes térmicos). El PDF es la evidencia; no se transcribe la grilla numérica.',
    kind: 'pdf',
    files: ['/sig/matriz-vpir/9-matriz-vpir.pdf'],
  },
  {
    slug: 'riesgos-seguridad-informacion',
    number: 10,
    title: 'Riesgos de seguridad de la información',
    summary: 'Cuatro riesgos operativos sobre contratos, datos y Google Drive.',
    isoTag: 'ISO 27001',
    body: 'El entregable cubre cuatro riesgos de la operación diaria: acceso no autorizado, envío incorrecto de información sensible, pérdida o modificación no autorizada de documentos, y mala gestión de permisos en Google Drive. Las consecuencias tocan contratos, datos de clientes y carpetas por departamento. Los controles propuestos son acceso por roles con MFA, clasificación Pública / Interna / Confidencial / Reservada, versionado y respaldos, y revisión periódica de permisos. El PDF es el entregable.',
    kind: 'pdf',
    files: ['/sig/riesgos-seguridad-informacion/10-riesgos-seguridad-informacion.pdf'],
  },
  {
    slug: 'riesgos-calidad',
    number: 11,
    title: 'Riesgos de calidad',
    summary: 'Cinco actividades de PMO y auditoría con su control.',
    isoTag: 'ISO 9001',
    body: 'La hoja cubre revisión por fase, registro de hallazgos, acciones correctivas y preventivas, uso de plantillas institucionales y reportes de auditoría. El control insiste en un checklist único por fase, numeración consecutiva, responsables y fechas, versionado centralizado de formatos e independencia del rol de calidad frente al equipo ejecutor. El Excel es el entregable; se muestra como tabla, no como matriz RACI.',
    kind: 'spreadsheet',
    files: ['/sig/riesgos-calidad/11-riesgos-calidad.xlsx'],
  },
  {
    slug: 'control-operacional',
    number: 12,
    title: 'Control operacional',
    summary: 'Cinco procesos y tres controles por proceso (SST, SI, ambiente y calidad).',
    isoTag: '9001 / 14001 / 45001 / 27001',
    owner: 'Rebeca',
    scope:
      'Elegir cinco procesos de Etraining y asignar tres controles por proceso (SST, seguridad de la información, ambientales y calidad).',
    body: 'Este tema se publicará aquí.',
    kind: 'placeholder',
    files: [],
  },
  {
    slug: 'seguimiento-medicion',
    number: 13,
    title: 'Seguimiento y medición',
    summary: 'Doce indicadores con línea base y comparación.',
    isoTag: '9001 / 14001 / 45001 / 27001',
    owner: 'Dana, Mayra y Thomas',
    scope:
      'Definir doce indicadores (3 ambientales, 3 de SST, 3 de seguridad de la información y 3 de procesos) con línea base y comparación.',
    body: 'Este tema se publicará aquí.',
    kind: 'placeholder',
    files: [],
  },
  {
    slug: 'emergencias',
    number: 14,
    title: 'Emergencias',
    summary: 'Cuatro eventos: antes, durante, después y procesos afectados.',
    isoTag: '14001 / 45001',
    owner: 'Nicolás',
    scope:
      'Cuatro desastres o eventos naturales, qué hacer antes, durante y después, y qué procesos se afectan.',
    body: 'Este tema se publicará aquí.',
    kind: 'placeholder',
    files: [],
  },
];

export const SIG_LOBBY_INTRO =
  'El SIG de Etraining administra el diseño, desarrollo, implementación y el soporte de las soluciones integrales digitales para la educación: contenidos, experiencias de aprendizaje, plataformas SaaS y LMS, dotaciones tecnológicas y servicios a clientes institucionales del sector público o privado.';
