export const FULL_STACK_BIO = {
  en: `
Hey 👋 I'm **Sebastián Reátegui** — a 26 year-old CS student at Universidad de Ingeniería y Tecnología - UTEC. I always enjoy learning new things and giving my best to every project.

Currently looking for opportunities to keep growing
and contribute to projects.

**Interests** 🎯

AI, Fintech, Full Stack Development, Infrastructure, Systems Optimization and Computer Architecture.
`.trim(),
  es: `
Hola 👋 Soy **Sebastián Reátegui** — un estudiante de Ciencia de la Computación de 26 años en la Universidad de Ingeniería y Tecnología - UTEC. Siempre disfruto aprender cosas nuevas y dar lo mejor de mí en cada proyecto.

Actualmente buscando oportunidades para seguir creciendo
y contribuir en proyectos.

**Intereses** 🎯

IA, Fintech, Desarrollo Full Stack, Infraestructura, Optimización de Sistemas y Arquitectura de Computadores.
`.trim()
};

export const SKILLS_CONTENT = {
  en: `
CS STUDENT @ UTEC
──────────────────────────────────────────

💻 LANGUAGES & FRAMEWORKS
• C++, Python, Go, Java, JavaScript, TypeScript
• React.js, Next.js, Spring Boot, Flask, FastApi, Express.js

☁️ CLOUD & INFRASTRUCTURE
• AWS (S3, Glue, Athena, Amplify, API Gateway, EC2)
• Docker, Microservices Architecture
• SQL (PostgreSQL, MySQL, SQLite) & NoSQL (MongoDB, DynamoDB)

🛠️ TOOLS & WORKFLOW
• Git & GitHub, Postman
• Cursor, Gemini, Codex, Claude Code
• Opencode, Openrouter, Hugging Face, Groq, MCP Servers, SKILLS.MD
`.trim(),
  es: `
ESTUDIANTE DE CC @ UTEC
──────────────────────────────────────────

💻 LENGUAJES Y FRAMEWORKS
• C++, Python, Java, Go, JavaScript, TypeScript
• React.js, Next.js, Spring Boot, Flask, FastApi, Express.js

☁️ NUBE E INFRAESTRUCTURA
• AWS (S3, Glue, Athena, Amplify, API Gateway, EC2)
• Docker, Arquitectura de Microservicios
• SQL (PostgreSQL, MySQL, SQLite) y MongoDB

🛠️ HERRAMIENTAS Y FLUJO DE TRABAJO
• Git y GitHub
• Vite, Tailwind CSS
• Pipelines de Datos y ETL
`.trim()
};

export const PROJECTS_DATA = [
  {
    id: 'project-fintrend.txt',
    name: {
      en: 'FinTrendAI – Cloud-Native Financial Analytics',
      es: 'FinTrendAI – Analítica Financiera Nube-Nativa'
    },
    content: {
      en: `FINTRENDAI:
Stack: Python · Java · Node.js · AWS · React.js · TypeScript
Challenge: Build a scalable financial analytics platform on cloud infrastructure.
Solution: Architected 5 microservices (Python, Java, Node.js) deployed on AWS.
Integrated a full data pipeline: VM Ingesta → S3 → Glue → Athena → API Gateway.
Frontend on AWS Amplify with real-time market dashboards and AI-driven signals.
Repo: https://github.com/SReateguiUtec/FinTrendAI`,
      es: `FINTRENDAI:
Stack: Python · Java · Node.js · AWS · React.js · TypeScript
Desafío: Construir una plataforma de analítica financiera escalable en infraestructura cloud.
Solución: Arquitecturé 5 microservicios (Python, Java, Node.js) desplegados en AWS.
Integré un pipeline de datos completo: VM Ingesta → S3 → Glue → Athena → API Gateway.
Frontend en AWS Amplify con dashboards de mercado en tiempo real y señales impulsadas por IA.
Repo: https://github.com/SReateguiUtec/FinTrendAI`
    }
  },
  {
    id: 'project-medigo.txt',
    name: {
      en: 'MediGO – Healthcare Platform (CS 2031 @ UTEC)',
      es: 'MediGO – Plataforma de Salud (CS 2031 @ UTEC)'
    },
    content: {
      en: `MEDIGO:
Stack: Spring Boot · React.js · PostgreSQL
Challenge: Build a production-ready healthcare management platform for a university course.
Solution: Developed MediGO from scratch as a full-stack project, covering frontend,
backend, and database layers with a focus on usability and real-world constraints.
Repo: https://github.com/SReateguiUtec/MediGO-Repository`,
      es: `MEDIGO:
Stack: Spring Boot · React.js · PostgreSQL
Desafío: Construir una plataforma de gestión de salud lista para producción para un curso universitario.
Solución: Desarrollé MediGO desde cero como un proyecto full-stack, cubriendo las capas de frontend,
backend y base de datos con un enfoque en la usabilidad y restricciones del mundo real.
Repo: https://github.com/SReateguiUtec/MediGO-Repository`
    }
  },
  {
    id: 'project-sparseexcel.txt',
    name: {
      en: 'SparseExcel – Sparse Matrix Engine in C++',
      es: 'SparseExcel – Motor de Matriz Dispersa en C++'
    },
    content: {
      en: `SPARSEEXCEL:
Stack: C++ · React.js
Challenge: Implement an efficient sparse matrix from scratch for Algorithms & Data Structures.
Solution: Built a full sparse matrix engine in C++ using std::variant for type-safe cell values,
with support for formulas, memory-efficient node storage, and a visual GUI frontend
to inspect the matrix state, memory addresses, and 3D structure in real time.
Repo: https://github.com/SReateguiUtec/SparseExcel`,
      es: `SPARSEEXCEL:
Stack: C++ · React.js
Desafío: Implementar una matriz dispersa eficiente desde cero para Algoritmos y Estructuras de Datos.
Solución: Construí un motor completo de matriz dispersa en C++ usando std::variant para valores de celda seguros,
con soporte para formulas, almacenamiento de nodos eficiente en memoria y un frontend visual GUI
para inspeccionar el estado de la matriz, direcciones de memoria y la estructura 3D en tiempo real.
Repo: https://github.com/SReateguiUtec/SparseExcel`
    }
  },
  {
    id: 'project-applemusictui.txt',
    name: {
      en: 'AppleMusicTUI – Terminal Music Player in Go',
      es: 'AppleMusicTUI – Reproductor de Música de Terminal en Go'
    },
    content: {
      en: `APPLEMUSICTUI:
Stack: Go · macOS · Terminal UI
Challenge: Control Apple Music from the command line with a keyboard-driven interface.
Solution: Built a sleek TUI in Go that interfaces with the Apple Music library on macOS.
Features full keyboard navigation, a glitch-animated header, and a red-themed aesthetic.
The kind of tool you build because you can — and then actually use every day.
Repo: https://github.com/SReateguiUtec/AppleMusicTUI`,
      es: `APPLEMUSICTUI:
Stack: Go · macOS · Terminal UI
Desafío: Controlar Apple Music desde la línea de comandos con una interfaz guiada por teclado.
Solución: Construí una elegante TUI en Go que se conecta con la biblioteca de Apple Music en macOS.
Cuenta con navegación completa por teclado, un encabezado animado con glitch y una estética temática roja.
El tipo de herramienta que construyes porque puedes, y luego terminas usando todos los días.
Repo: https://github.com/SReateguiUtec/AppleMusicTUI`
    }
  }
];

export const CONTACT_INFO = {
  email: 'reateguisebastian1@gmail.com',
  github: 'github.com/SReateguiUtec',
  status: {
    en: 'Open to internships & new opportunities',
    es: 'Abierto a pasantías y nuevas oportunidades'
  }
};

export const RESUME_URL = 'https://github.com/SReateguiUtec';

export const PERSONAL_EXTRA = {
  en: `
- **Age**: 26 years old.
- **Academic Cycle**: Currently in his 3rd year / 5th semester of Computer Science at UTEC (Peru).
- **Hobbies**: Coding Terminal User Interfaces (TUI) in Go, customizing his terminal setup, watching NBA, and anime (recently he became a fan of Blue Lock!).
- **Goals**: Specialize in Artificial Intelligence (AI) and Machine Learning Engineering, design high-performance distributed systems, and join a global tech company.
  `.trim(),
  es: `
- **Edad**: 26 años.
- **Ciclo Académico**: Actualmente cursando el 3er año / 5to ciclo de Ciencia de la Computación en UTEC (Perú).
- **Hobbies**: Programar interfaces de usuario para la terminal (TUI) en Go, personalizar su entorno de desarrollo, ver NBA y anime (recientemente es fan de Blue Lock!).
- **Metas**: Especializarse en Inteligencia Artificial (IA) e Ingeniería de Aprendizaje Automático (ML), diseñar sistemas distribuidos de alto rendimiento y trabajar en una empresa tecnológica global.
  `.trim()
};
