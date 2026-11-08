export type EmergencyArea = 'Organizacional' | 'Ambiental' | 'SST' | 'Seguridad de la información';

export type EmergencyPhase = {
  area: EmergencyArea;
  before: string;
  during: string;
  after: string;
};

export type EmergencyEvent = {
  id: 'terremoto' | 'inundacion' | 'deslizamiento' | 'tormenta';
  title: string;
  risk: 'Crítico' | 'Alto';
  phases: EmergencyPhase[];
  processes: string[];
};

export const EMERGENCY_EVENTS: EmergencyEvent[] = [
  {
    id: 'terremoto',
    title: 'Terremoto',
    risk: 'Crítico',
    processes: [
      'Direccionamiento estratégico',
      'Ejecución de la formación',
      'Convocatoria y matrícula',
      'Gestión del talento humano',
      'Tecnología y plataformas LMS',
    ],
    phases: [
      {
        area: 'Organizacional',
        before: 'Identificar zonas de riesgo, establecer rutas de evacuación y definir planes de continuidad.',
        during: 'Suspender actividades y evacuar ordenadamente al personal.',
        after: 'Evaluar daños, habilitar espacios alternativos y restablecer las actividades.',
      },
      {
        area: 'Ambiental',
        before: 'Identificar sustancias peligrosas y asegurar el almacenamiento de residuos.',
        during: 'Evitar derrames y controlar posibles fugas de sustancias contaminantes.',
        after: 'Gestionar escombros, separar residuos y evaluar daños ambientales.',
      },
      {
        area: 'SST',
        before: 'Capacitar al personal, realizar simulacros y revisar las condiciones estructurales.',
        during: 'Protegerse durante el movimiento sísmico, evacuar y prestar primeros auxilios.',
        after: 'Identificar lesionados, evaluar riesgos y autorizar el retorno cuando sea seguro.',
      },
      {
        area: 'Seguridad de la información',
        before: 'Realizar copias de seguridad y proteger servidores y equipos tecnológicos.',
        during: 'Desconectar equipos cuando sea seguro y activar protocolos de contingencia.',
        after: 'Recuperar bases de datos, plataformas LMS y sistemas administrativos.',
      },
    ],
  },
  {
    id: 'inundacion',
    title: 'Inundación',
    risk: 'Alto',
    processes: [
      'Ejecución de la formación',
      'Convocatoria y matrícula',
      'Tecnología y plataformas LMS',
      'Gestión documental y de datos',
      'Gestión administrativa y financiera',
    ],
    phases: [
      {
        area: 'Organizacional',
        before: 'Identificar zonas inundables, proteger documentos y establecer alternativas de formación virtual.',
        during: 'Suspender actividades presenciales y trasladar las operaciones a espacios seguros.',
        after: 'Evaluar daños, limpiar instalaciones y restablecer las actividades.',
      },
      {
        area: 'Ambiental',
        before: 'Mantener limpios los drenajes y realizar una adecuada disposición de residuos.',
        during: 'Controlar posibles derrames y evitar la contaminación del agua.',
        after: 'Retirar residuos, gestionar aguas contaminadas y evaluar daños ambientales.',
      },
      {
        area: 'SST',
        before: 'Capacitar al personal sobre evacuación y establecer zonas seguras.',
        during: 'Evitar el contacto con aguas contaminadas, evacuar y prevenir riesgos eléctricos.',
        after: 'Verificar condiciones sanitarias, prevenir enfermedades y evaluar riesgos antes del retorno.',
      },
      {
        area: 'Seguridad de la información',
        before: 'Realizar respaldos en la nube y proteger equipos tecnológicos de la humedad.',
        during: 'Apagar equipos ante riesgos eléctricos y activar contingencias tecnológicas.',
        after: 'Restaurar respaldos, verificar la integridad de los datos y recuperar los servicios.',
      },
    ],
  },
  {
    id: 'deslizamiento',
    title: 'Deslizamiento de tierra',
    risk: 'Alto',
    processes: [
      'Direccionamiento estratégico',
      'Gestión comercial y contratación',
      'Ejecución de la formación',
      'Gestión del talento humano',
      'Tecnología y plataformas LMS',
    ],
    phases: [
      {
        area: 'Organizacional',
        before: 'Identificar zonas vulnerables, establecer rutas alternas y preparar modalidades de trabajo virtual.',
        during: 'Suspender actividades en zonas amenazadas y evacuar cuando sea necesario.',
        after: 'Evaluar instalaciones y accesos, y reanudar las actividades progresivamente.',
      },
      {
        area: 'Ambiental',
        before: 'Identificar zonas susceptibles a erosión y proteger la vegetación.',
        during: 'Evitar intervenir terrenos inestables y prevenir nuevos daños ambientales.',
        after: 'Evaluar daños en el suelo, gestionar residuos y apoyar la recuperación ambiental.',
      },
      {
        area: 'SST',
        before: 'Capacitar al personal para reconocer señales de alerta y establecer protocolos de evacuación.',
        during: 'Evacuar las zonas de peligro y evitar acercarse al terreno inestable.',
        after: 'Atender lesionados y verificar que las instalaciones y rutas sean seguras.',
      },
      {
        area: 'Seguridad de la información',
        before: 'Mantener respaldos en la nube y habilitar accesos remotos a los sistemas.',
        during: 'Activar el acceso remoto y proteger los equipos ubicados en las zonas afectadas.',
        after: 'Verificar los sistemas, recuperar información y restablecer los servicios tecnológicos.',
      },
    ],
  },
  {
    id: 'tormenta',
    title: 'Tormenta eléctrica',
    risk: 'Alto',
    processes: [
      'Tecnología y plataformas LMS',
      'Ejecución de la formación',
      'Gestión documental y de datos',
      'Gestión administrativa y financiera',
      'Gestión del talento humano',
    ],
    phases: [
      {
        area: 'Organizacional',
        before: 'Establecer protocolos ante interrupciones eléctricas y disponer de alternativas para continuar las actividades.',
        during: 'Suspender actividades exteriores y detener temporalmente las operaciones si existe peligro.',
        after: 'Revisar las instalaciones y restablecer las actividades cuando existan condiciones seguras.',
      },
      {
        area: 'Ambiental',
        before: 'Realizar mantenimiento de drenajes y revisar sistemas de protección contra descargas eléctricas.',
        during: 'Controlar posibles incendios y evitar la exposición a zonas abiertas.',
        after: 'Evaluar daños en vegetación e instalaciones y gestionar los residuos generados.',
      },
      {
        area: 'SST',
        before: 'Capacitar al personal sobre riesgos eléctricos y establecer zonas seguras.',
        during: 'Permanecer en espacios cerrados y evitar el contacto con estructuras metálicas.',
        after: 'Verificar condiciones eléctricas, atender lesionados y revisar la seguridad de las instalaciones.',
      },
      {
        area: 'Seguridad de la información',
        before: 'Instalar sistemas UPS, reguladores de voltaje y protección contra sobretensiones.',
        during: 'Activar sistemas de energía de respaldo y proteger los equipos tecnológicos.',
        after: 'Revisar servidores, redes y bases de datos, y recuperar los servicios afectados.',
      },
    ],
  },
];
