export const email = "pabloleonweb@gmail.com";
export const instagramUrl = "https://instagram.com/pabloleoonn_";
export const instagramHandle = "@pabloleoonn_";

export const services: [string, string][] = [
  [
    "Páginas web y landing pages",
    "Sitios rápidos, responsive y pensados para convertir, desde una landing hasta una web corporativa completa.",
  ],
  [
    "Tiendas online",
    "Ecommerce a medida, con pasarela de pago y una gestión de catálogo sencilla para ti.",
  ],
  [
    "Experiencias 3D",
    "Webs inmersivas con animaciones y modelos 3D que destacan sobre cualquier competencia.",
  ],
  [
    "Automatización de procesos",
    "Reservas, gestión de citas y tareas repetitivas resueltas con flujos automáticos a medida.",
  ],
  [
    "Chatbots y asistentes virtuales",
    "Atención al cliente y llamadas gestionadas por IA, disponible los 7 días de la semana.",
  ],
  [
    "Tarjetas NFC y QR",
    "Tarjetas físicas con NFC y QR para reseñas de Google, cartas digitales o contacto instantáneo.",
  ],
];

export const steps: [string, string, string, string[]][] = [
  [
    "01 · Punto de partida",
    "Cuéntanos tu idea",
    "Web, tienda online o experiencia 3D. Empezamos con una charla sin compromiso para entender tu negocio y lo que necesitas.",
    ["Reunión inicial sin compromiso", "Presupuesto claro y cerrado", "Sin letra pequeña"],
  ],
  [
    "02 · Diseño",
    "Diseñamos tu web a medida",
    "Nada de plantillas genéricas. Cada proyecto se diseña desde cero, con una identidad visual coherente con tu marca.",
    [
      "Diseño 100% personalizado",
      "Identidad visual coherente",
      "Responsive: móvil, tablet y escritorio",
    ],
  ],
  [
    "03 · Desarrollo",
    "Construimos y probamos cada detalle",
    "Código limpio, rápido y probado en todos los dispositivos antes de que tu web vea la luz.",
    [
      "Código limpio y optimizado",
      "Pruebas en todos los dispositivos",
      "Velocidad de carga y SEO cuidados",
    ],
  ],
];

export const plans: [string, string, string, string[], string][] = [
  [
    "Landing Page",
    "200 €",
    "Una página que presenta tu negocio y convierte visitas en clientes.",
    [
      "Landing page profesional",
      "Diseño personalizado",
      "Responsive",
      "Enlaces y redirecciones",
    ],
    "Solicitar",
  ],
  [
    "Página Web 3D",
    "400 €",
    "Una web inmersiva que se recuerda.",
    ["Experiencia inmersiva", "Animaciones", "Modelos 3D", "Diseño personalizado"],
    "Solicitar",
  ],
  [
    "Tarjeta NFC + QR",
    "50 €",
    "Comparte tu negocio con un solo toque.",
    [
      "Tarjeta física",
      "NFC programado",
      "Código QR",
      "Ideal para reseñas Google o cartas digitales",
    ],
    "Solicitar",
  ],
  [
    "Automatizaciones",
    "",
    "Reservas, gestión y tareas repetitivas resueltas a medida.",
    ["Consultar con el equipo para obtener presupuesto según las necesidades."],
    "Consultar",
  ],
  [
    "Proyecto personalizado",
    "",
    "",
    [
      "Si tu idea no encaja en ninguno de los servicios anteriores, contacta con nosotros y prepararemos una solución personalizada.",
    ],
    "Contactar",
  ],
];

export const automation = [
  "Gestión empresarial",
  "Reservas",
  "Tratamiento de datos",
  "Procesos repetitivos",
  "Generación de documentos",
  "Respuestas automáticas",
  "Mensajes entrantes",
  "Mensajes salientes",
  "Atención al cliente",
  "Análisis semanales",
  "Informes automáticos",
  "Paneles de estadísticas",
  "Sincronización entre plataformas",
  "CRM",
  "Email",
  "WhatsApp",
  "Calendarios",
  "IA integrada",
  "Flujos personalizados",
];

export const sectors = [
  "Hostelería",
  "Clínicas y salud",
  "Comercio local",
  "Inmobiliarias",
  "Servicios profesionales",
  "Ecommerce",
  "Fitness y bienestar",
  "Eventos",
  "Restaurantes y cafeterías",
  "Despachos y asesorías",
  "Academias y formación",
  "Belleza y estética",
  "Turismo y alojamientos",
  "Talleres y automoción",
  "Construcción y reformas",
  "Marcas personales",
];

export const reasons: [string, string][] = [
  [
    "Trato directo, sin intermediarios",
    "Hablas siempre con la persona que diseña y desarrolla tu proyecto.",
  ],
  [
    "Precios claros y cerrados",
    "Sabes lo que pagas desde el primer momento, sin sorpresas al final.",
  ],
  [
    "Entrega rápida sin perder calidad",
    "Plazos realistas y cumplidos, sin atajos en el resultado final.",
  ],
  [
    "Soporte tras la entrega",
    "Seguimos disponibles después del lanzamiento para lo que necesites.",
  ],
];

/** Zonas de la sala inmersiva de automatización. */
export const rooms: {
  id: string;
  tag: string;
  title: string;
  text: string;
  cta: string;
  plan: string;
}[] = [
  {
    id: "reservas",
    tag: "ZONA 01",
    title: "Reservas y citas automatizadas",
    text: "Tu web gestiona citas y reservas sola, sin llamadas ni mensajes perdidos.",
    cta: "Automatizar mis reservas",
    plan: "Automatizaciones",
  },
  {
    id: "chatbots",
    tag: "ZONA 02",
    title: "Chatbots y atención 24/7",
    text: "Un asistente responde dudas frecuentes y capta clientes potenciales las 24 horas del día.",
    cta: "Quiero atención 24/7",
    plan: "Automatizaciones",
  },
  {
    id: "nfc",
    tag: "ZONA 03",
    title: "NFC, QR y captación de reseñas",
    text: "Tarjetas físicas con NFC y QR para reseñas de Google, cartas digitales o contacto instantáneo.",
    cta: "Quiero mi tarjeta NFC",
    plan: "Tarjeta NFC + QR",
  },
  {
    id: "procesos",
    tag: "ZONA 04",
    title: "Procesos internos, CRM, email y WhatsApp",
    text: "Conectamos tus herramientas para que las tareas repetitivas se resuelvan solas.",
    cta: "Conectar mis herramientas",
    plan: "Automatizaciones",
  },
  {
    id: "dashboard",
    tag: "ZONA 05",
    title: "Dashboard de resultados y ahorro",
    text: "Paneles que muestran horas recuperadas y coste operativo evitado, en un solo sitio.",
    cta: "Ver mi potencial de ahorro",
    plan: "Proyecto personalizado",
  },
];
