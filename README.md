# HypeDev — Portfolio Full-Stack

Portfolio profesional de **Iván Bazán**, desarrollador Full-Stack con base sólida en backend (Python, Node.js, TypeScript) y experiencia en QA, testing y metodologías ágiles. Diseño orientado a la escalabilidad, seguridad y código mantenible.

---

## Stack Tecnológico

- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES Modules)
- **Backend**: Python (Django / FastAPI), Node.js / Express.js, TypeScript
- **Datos & Infra**: MongoDB, SQL, GitHub Actions (CI/CD)
- **Testing**: Jest, testing unitario e integración, QA / cross-browser
- **Herramientas**: Postman, Chrome DevTools, GitHub, APIs RESTful, JWT / OAuth

---

## Estructura del Proyecto

```
Portfolio-dev-propio/
├── portfolio_hype_workout.html   # Landing principal (single-page portfolio)
├── src/
│   ├── main.js                    # Entry point — instancia PortfolioApp
│   ├── core/
│   │   ├── BaseComponent.js       # Clase abstracta base (render, eventos, selectores)
│   │   └── App.js                  # Orquestador: Navigation, ProjectCard, ContactForm
│   ├── components/
│   │   ├── Navigation.js          # Navbar fijo + menú móvil + scroll
│   │   ├── ProjectCard.js          # Render dinámico de proyectos
│   │   └── ContactForm.js          # Formulario con validación visual
│   ├── assets/
│   │   ├── css/
│   │   │   └── base.css           # Estilos base y utilidades
│   │   └── ...                    # Recursos gráficos del proyecto
│   └── utils/                      # Listo para helpers / utilidades futuras
```

---

## Arquitectura (POO)

| Clase | Rol |
|---|---|
| `BaseComponent` | Abstracción con selectores, eventos y ciclo de render |
| `Navigation` | Menú fijo, navegación por scroll y menú responsive |
| `ProjectCard` | Inyección dinámica de datos de proyectos en el DOM |
| `ContactForm` | Validación visual y manejo de envío simulado |
| `PortfolioApp` | Orquestador que instancia todos los componentes |

---

## Cómo ver / ejecutar

1. Abre `portfolio_hype_workout.html` directamente en cualquier navegador.
2. El archivo carga Tailwind CSS vía CDN y el módulo `src/main.js` para la lógica interactiva (menú móvil, proyectos dinámicos, formulario de contacto).

---

## Perfil del Autor

**Iván Bazán** — Full Stack Developer / Back-End · Python · Node.js · TypeScript · React. Base en QA con enfoque en código predecible, testeable y mantenible. Trabajo remoto, entrega autónoma, sin micro-gestión constante.

- **Email**: bazan.ivan.angel@gmail.com
- **Ubicación**: Buenos Aires, Argentina (trabajo 100% remoto)
- **GitHub**: [github.com/Ivo-Bazan-IT](https://github.com/Ivo-Bazan-IT)
- **LinkedIn**: Perfil profesional vinculado en el footer del portfolio

---

## Notas

- Diseño dark / high-contrast con acento en `#D4FF00` (hype).
- Todo el contenido del portfolio es estático (HTML + JS modular) con datos inyectados dinámicamente.
- El formulario de contacto simula el envío con mensaje de confirmación.
- Proyecto orientado principalmente al **back-end** con interfaces conectadas a API, escalables y seguras.
