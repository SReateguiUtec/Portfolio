export const translations = {
  en: {
    nav: {
      about: "About Me",
      projects: "Projects",
      education: "Education",
      skills: "Stack & Workflow",
      contact: "Contact"
    },
    hero: {
      portfolio: "Portfolio",
      downloadResume: "Download Resume",
      role: "CS Student @ UTEC.",
      description: "Passionate about AI & ML Engineering, Full Stack Development, Systems Optimization and Cloud-Native Infrastructure.",
      metrics: {
        metric1: { value: "3rd", label: "YEAR CS" },
        metric2: { value: "5+", label: "FEATURED PROJECTS" },
        metric3: { value: "AI & SW", label: "FOCUSED ENG." }
      }
    },
    intro: {
      readme: "README.md",
      hi: "Hi there 👋, I'm Sebastian!",
      bio: "I'm a 26 year old Computer Science student living in Lima, Peru. I always enjoy learning new things and giving my best to every project and challenge.",
      bullet1: "I'm currently a <span className=\"text-[#60a5fa] font-semibold\">3rd-year CS Student</span> at UTEC",
      bullet2: "I'm currently learning new languages and technologies like <span className=\"text-[#60a5fa] font-semibold\">Rust, Angular & NestJS</span>",
      bullet3: "Fun fact: <span className=\"text-[#60a5fa] font-semibold\">I was inspired by Blue Lock's pentagon for the hero design!</span>",
      bullet4: "Focused on <span className=\"text-[#60a5fa] font-semibold\">clean code, modern infrastructure, and AI.</span>",
      bullet5: "<span className=\"text-[#60a5fa] font-semibold\">Open to internships</span> and freelance projects!",
      activity: "ACTIVITY",
      less: "Less",
      more: "More"
    },
    projects: {
      title: "Projects",
      featured: "Featured_Projects",
      list: [
        {
          id: 1,
          title: "FinTrend AI",
          description: "Cloud-Native Financial Data Pipeline & Analytics developed with a microservices architecture. Designed and built an end-to-end serverless data pipeline using AWS Glue to automate ETL workflows and structured analytical querying.",
          tech: ["AWS Glue", "Athena", "S3", "Flask", "Spring Boot", "Express.js", "React.js", "MongoDB", "Postgres", "MySQL"],
          github: "https://github.com/SReateguiUtec/FinTrendAI",
          live: "#",
          image: "/fintrend-compressed.mp4",
          year: "2026"
        },
        {
          id: 2,
          title: "MediGO",
          description: "Full-Stack Telemedicine Platform. Architected a secure REST API with JWT authentication. Developed a responsive SPA using React 19, integrated real-time video via Whereby SDK, Stripe sandbox payments, an AI chatbot powered by Gemini, and real-time WebSocket chat between patients and doctors.",
          tech: ["Spring Boot", "Postgres", "React.js", "TypeScript", "Stripe", "Gemini", "WebSockets"],
          github: "https://github.com/SReateguiUtec/MediGO-Repository",
          live: "#",
          image: "/medigo-compressed.mp4",
          year: "2025"
        },
        {
          id: 3,
          title: "SparseExcel",
          description: "Memory-Optimized Spreadsheet Engine. Implemented a memory-efficient backend in C++ leveraging custom Sparse Matrix representations, paired with a frontend featuring dual 2D and 3D data visualization.",
          tech: ["C++", "Javascript", "React.js", "Data Structures"],
          github: "https://github.com/SReateguiUtec/SparseExcel",
          live: "#",
          image: "/sparse-compressed.mp4",
          year: "2026"
        }
      ]
    },
    education: {
      title: "Education",
      background: "Academic_Background",
      utec: "Universidad de Ingeniería y Tecnología (UTEC)",
      degree: "Bachelor of Science in Computer Science",
      award: "Tim Berners Lee Contest Finalist - CS2031 Platform-Based Development",
      inProgress: "IN_PROGRESS"
    },
    skills: {
      title: "Skills & Technologies",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools & Cloud"
    },
    logoCloud: {
      title: "Stack & Workflow",
      badge: "Tech_Stack_&_Tools",
      description: "Languages, frameworks, tools and infrastructure I use to build scalable applications."
    },
    contact: {
      title: "Contact",
      getInTouch: "Get_In_Touch",
      heading: "Let's build something great.",
      desc: "Currently open for new opportunities, collaborations, and interesting projects. Feel free to reach out!",
      email: "Email me",
      github: "GitHub",
      formNamePlaceholder: "Your Name",
      formEmailPlaceholder: "your@email.com",
      formMessagePlaceholder: "How can I help you?",
      formSubmit: "Send Message",
      formSubmitting: "Sending...",
      formSuccess: "Message sent successfully!",
      formError: "Failed to send message. Please try again."
    },
    copilot: {
      placeholder: "Ask SR Copilot..."
    },
    banner: {
      text: "Have more questions about me? SR Copilot is here to help!"
    },
    agentic: {
      title: "Agentic Development Workflow",
      subtitle: "10x PRODUCTIVITY MULTIPLIER",
      desc: "Prototyping and scaling complex systems through parallel agent orchestration, MCP Servers, and custom Skills.",
      bullet1: "AI-Pair Programming",
      bullet2: "Automated Code Generation",
      bullet3: "Rapid Prototyping & CI/CD"
    }
  },
  es: {
    nav: {
      about: "Sobre Mí",
      projects: "Proyectos",
      education: "Educación",
      skills: "Stack & Workflow",
      contact: "Contacto"
    },
    hero: {
      portfolio: "Portafolio",
      downloadResume: "Descargar CV",
      role: "Estudiante de CC @ UTEC.",
      description: "Apasionado por Ingeniería en IA y ML, Desarrollo Full Stack, Optimización de Sistemas e Infraestructura Nube-Nativa.",
      metrics: {
        metric1: { value: "3er", label: "AÑO DE CS" },
        metric2: { value: "5+", label: "PROYECTOS DESTACADOS" },
        metric3: { value: "IA & SW", label: "ENFOQUE PRINCIPAL" }
      }
    },
    intro: {
      readme: "README.md",
      hi: "¡Hola 👋, soy Sebastian!",
      bio: "Soy un estudiante de Ciencia de la Computación de 26 años viviendo en Lima, Perú. Siempre disfruto aprender cosas nuevas y dar lo mejor de mí en cada proyecto y desafío.",
      bullet1: "Actualmente soy un <span className=\"text-[#60a5fa] font-semibold\">Estudiante de 3er año de CC</span> en UTEC",
      bullet2: "Actualmente estoy aprendiendo tecnologías como <span className=\"text-[#60a5fa] font-semibold\">Rust, Angular y NestJS</span>",
      bullet3: "Dato curioso: <span className=\"text-[#60a5fa] font-semibold\">¡Me inspiré en el pentágono de Blue Lock para el diseño!</span>",
      bullet4: "Enfocado en <span className=\"text-[#60a5fa] font-semibold\">código limpio, infraestructura moderna e IA.</span>",
      bullet5: "¡<span className=\"text-[#60a5fa] font-semibold\">Abierto a prácticas</span> y proyectos freelance!",
      activity: "ACTIVIDAD",
      less: "Menos",
      more: "Más"
    },
    projects: {
      title: "Proyectos",
      featured: "Proyectos_Destacados",
      list: [
        {
          id: 1,
          title: "FinTrend AI",
          description: "Analítica Financiera Nube-Nativa desarrollada con una arquitectura de microservicios. Diseñé y construí un pipeline de datos serverless usando AWS Glue para automatizar flujos ETL y consultas analíticas estructuradas.",
          tech: ["AWS Glue", "Athena", "S3", "Flask", "Spring Boot", "Express.js", "React.js", "MongoDB", "Postgres", "MySQL"],
          github: "https://github.com/SReateguiUtec/FinTrendAI",
          live: "#",
          image: "/fintrend-compressed.mp4",
          year: "2026"
        },
        {
          id: 2,
          title: "MediGO",
          description: "Plataforma Full-Stack de Telemedicina. Diseñé una API REST segura con autenticación JWT. Desarrollé la SPA usando React 19, integrando consultas por video vía Whereby SDK, pagos en modo sandbox con Stripe, un chatbot con Gemini y chat en tiempo real con WebSockets entre pacientes y médicos.",
          tech: ["Spring Boot", "Postgres", "React.js", "TypeScript", "Stripe", "Gemini", "WebSockets"],
          github: "https://github.com/SReateguiUtec/MediGO-Repository",
          live: "#",
          image: "/medigo-compressed.mp4",
          year: "2025"
        },
        {
          id: 3,
          title: "SparseExcel",
          description: "Motor de Hoja de Cálculo Optimizado en Memoria. Implementé un backend eficiente en C++ utilizando representaciones personalizadas de Matrices Dispersas, junto a un frontend con visualización de datos dual en 2D y 3D.",
          tech: ["C++", "Javascript", "React.js", "Estructuras de Datos"],
          github: "https://github.com/SReateguiUtec/SparseExcel",
          live: "#",
          image: "/sparse-compressed.mp4",
          year: "2026"
        }
      ]
    },
    education: {
      title: "Educación",
      background: "Historial_Académico",
      utec: "Universidad de Ingeniería y Tecnología (UTEC)",
      degree: "Bachiller en Ciencia de la Computación",
      award: "Finalista Concurso Tim Berners Lee - CS2031 Desarrollo Basado en Plataformas",
      inProgress: "EN_CURSO"
    },
    skills: {
      title: "Habilidades y Tecnologías",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Herramientas y Nube"
    },
    logoCloud: {
      title: "Stack & Workflow",
      badge: "Tecnologías_y_Herramientas",
      description: "Lenguajes, frameworks, herramientas e infraestructura que uso para construir aplicaciones escalables."
    },
    contact: {
      title: "Contacto",
      getInTouch: "Contáctame",
      heading: "Construyamos algo increíble.",
      desc: "Actualmente abierto a nuevas oportunidades, colaboraciones y proyectos interesantes. ¡No dudes en contactarme!",
      email: "Escríbeme",
      github: "GitHub",
      formNamePlaceholder: "Tu Nombre",
      formEmailPlaceholder: "tu@correo.com",
      formMessagePlaceholder: "¿En qué te puedo ayudar?",
      formSubmit: "Enviar Mensaje",
      formSubmitting: "Enviando...",
      formSuccess: "¡Mensaje enviado con éxito!",
      formError: "Error al enviar el mensaje. Intenta de nuevo."
    },
    copilot: {
      placeholder: "Pregúntale a SR Copilot..."
    },
    banner: {
      text: "¿Tienes más preguntas sobre mí? ¡SR Copilot está aquí para ayudarte!"
    },
    agentic: {
      title: "Agentic Development Workflow",
      subtitle: "MULTIPLICADOR DE PRODUCTIVIDAD 10X",
      desc: "Prototipando y escalando sistemas complejos mediante orquestación de agentes en paralelo, MCP Servers y Skills personalizados.",
      bullet1: "Programación en Pareja con IA",
      bullet2: "Generación de Código Automatizada",
      bullet3: "Prototipado Rápido y CI/CD"
    }
  }
};
