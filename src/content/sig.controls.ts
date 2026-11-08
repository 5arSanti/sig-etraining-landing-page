export type OperationalControlRow = {
  processNumber: number;
  process: string;
  type: 'SST' | 'Seguridad de la información' | 'Ambiental' | 'Calidad';
  control: string;
  evidence: string;
};

export const OPERATIONAL_CONTROLS: OperationalControlRow[] = [
  {
    processNumber: 1,
    process: 'Desarrollo de software a la medida',
    type: 'Seguridad de la información',
    control:
      'Gestión de secretos: ninguna credencial en el repositorio, llaves en el gestor del proveedor y acceso a repos por rol con MFA',
    evidence: 'Pull request aprobado y bitácora de accesos',
  },
  {
    processNumber: 1,
    process: 'Desarrollo de software a la medida',
    type: 'Calidad',
    control:
      'Checklist de paso a producción por fase (requisitos, pruebas y aceptación del cliente) antes de desplegar',
    evidence: 'Acta de cierre de fase firmada',
  },
  {
    processNumber: 1,
    process: 'Desarrollo de software a la medida',
    type: 'Ambiental',
    control: 'Auto-scaling y apagado programado de ambientes de prueba fuera de horario laboral',
    evidence: 'Reporte mensual de consumo en Azure y GCP',
  },
  {
    processNumber: 2,
    process: 'Gestión de infraestructura tecnológica y mesa de ayuda',
    type: 'SST',
    control:
      'Procedimiento LOTO y cumplimiento RETIE para intervenir racks y UPS; solo personal autorizado con EPP dieléctrico',
    evidence: 'Permiso de trabajo eléctrico',
  },
  {
    processNumber: 2,
    process: 'Gestión de infraestructura tecnológica y mesa de ayuda',
    type: 'Ambiental',
    control: 'Entrega de RAEE a gestor autorizado con certificado de disposición final',
    evidence: 'Certificado de disposición final e inventario de baja',
  },
  {
    processNumber: 2,
    process: 'Gestión de infraestructura tecnológica y mesa de ayuda',
    type: 'Seguridad de la información',
    control: 'Borrado seguro de discos antes de dar de baja o reasignar un equipo',
    evidence: 'Acta de borrado por número de serie',
  },
  {
    processNumber: 3,
    process: 'STEAM e innovación educativa',
    type: 'SST',
    control:
      'Extracción localizada con filtro HEPA/carbón activado en el área de impresión 3D, uso de filamento PLA y guantes térmicos',
    evidence: 'Inspección preoperacional del laboratorio',
  },
  {
    processNumber: 3,
    process: 'STEAM e innovación educativa',
    type: 'Ambiental',
    control: 'Segregación de residuos de filamento y empaques, con entrega a reciclador autorizado',
    evidence: 'Registro de pesaje mensual de residuos',
  },
  {
    processNumber: 3,
    process: 'STEAM e innovación educativa',
    type: 'Calidad',
    control: 'Guía de laboratorio validada por el líder pedagógico antes de cada cohorte',
    evidence: 'Guía con control de versión y visto bueno',
  },
  {
    processNumber: 4,
    process: 'Logística y dotación tecnológica',
    type: 'SST',
    control: 'PESV: inspección preoperacional del bus y límite de horas de conducción',
    evidence: 'Lista de chequeo preoperacional',
  },
  {
    processNumber: 4,
    process: 'Logística y dotación tecnológica',
    type: 'Ambiental',
    control:
      'Mantenimiento preventivo, revisión de gases y planeación de rutas para reducir viajes',
    evidence: 'Certificado de revisión técnico-mecánica y plan de rutas',
  },
  {
    processNumber: 4,
    process: 'Logística y dotación tecnológica',
    type: 'Calidad',
    control:
      'Acta de entrega y verificación de equipos con la institución (serial, estado y cantidad)',
    evidence: 'Acta firmada por el supervisor del contrato',
  },
  {
    processNumber: 5,
    process: 'Diseño de contenidos y experiencias de aprendizaje',
    type: 'Calidad',
    control:
      'Revisión pedagógica y de estilo por par, con checklist de accesibilidad y verificación de licencias y derechos de autor de recursos de terceros (Ley 23 de 1982 y Ley 1915 de 2018), antes de publicar en el LMS',
    evidence: 'Formato de revisión diligenciado y registro de licencias por recurso',
  },
  {
    processNumber: 5,
    process: 'Diseño de contenidos y experiencias de aprendizaje',
    type: 'Seguridad de la información',
    control:
      'Clasificación Pública / Interna / Confidencial / Reservada y anonimización de datos de estudiantes en materiales y analítica',
    evidence: 'Matriz de clasificación de la información',
  },
  {
    processNumber: 5,
    process: 'Diseño de contenidos y experiencias de aprendizaje',
    type: 'SST',
    control:
      'Protocolo de pausas activas y verificación ergonómica del puesto (pantalla, silla, iluminación y tiempo continuo) para diseñadores instruccionales y editores de video',
    evidence: 'Inspección de puesto y registro de pausas',
  },
];
