import { Navigation } from '../components/Navigation.js';
import { ContactForm } from '../components/ContactForm.js';
import { ProjectCard } from '../components/ProjectCard.js';

/**
 * Controlador principal. Orquesta módulos y arranca la app.
 */
export class PortfolioApp {
    constructor(config = {}) {
        this.config = config;
        this.navigation = null;
        this.contactForm = null;
        this.projectCards = [];
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('PortfolioApp inicializado: OK');
            this.navigation = new Navigation();
            this.contactForm = new ContactForm('contact-form');
            this.loadProjects();
        });
    }

    applyCarousel3D() {
        const cards = document.querySelectorAll('#projects-carousel > .carousel-card-wrapper');
        cards.forEach((card, i) => {
            card.className = 'carousel-card-wrapper';
            card.style.flex = '0 0 260px';
            card.style.maxWidth = '300px';
            card.style.transformStyle = 'preserve-3d';
            if (i === 0) {
                card.classList.add('active-card');
            } else if (i === 1) {
                card.classList.add('side-card-right');
            } else if (i === 2) {
                card.classList.add('side-card-left');
            } else if (i > 2) {
                card.classList.add('hidden-stacked');
            }
        });
    }

    loadProjects() {
        const container = document.querySelector('#projects-carousel');
        if (!container) return;

        const data = [
            {
                title: 'HypeWorkout — Portfolio Full Stack',
                description: 'Portfolio full stack para entrenador online. Frontend en producción deployado en Vercel: formularios de contacto, sección de servicios y SEO básico. QA completo: cross-browser, mobile y performance.',
                tags: [{ label: 'React', accent: true }, { label: 'TypeScript' }, { label: 'Python' }, { label: 'Node.js' }],
                links: [{ text: 'Live Demo', url: 'https://hypeworkout.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAac_YpK1LGhvPxjDozF8Kd8behZaUN6cc71Cond50w6fkG59FtcyLyDuxbHLAg_aem_KMJPitS6hwPmUMT2PXE4bA', type: 'demo' }, { text: 'Repo', url: '#', type: 'repo' }],
                image: 'src/assets/hype-workout-pic.png'
            },
            {
                title: 'Financial Market Bot — Bollinger & RSI',
                description: 'Pequeño sistema de notificaciones por Telegram que analiza activos en la Bolsa de Nueva York a través de los indicadores Bollinger y RSI. Envía alertas de trade cuando algún indicador es detectado para entrar.',
                tags: [{ label: 'Python', accent: true }, { label: 'Telegram API' }, { label: 'Bollinger' }, { label: 'RSI' }],
                links: [{ text: 'Repo', url: 'https://github.com/Ivo-Bazan-IT/finantial-bot-Bollinger_RSI', type: 'repo' }],
                image: 'src/assets/Python-code-image.jpg'
            },
            {
                title: 'HypeWorkout Mobile API — Back-End Multi-Tenancy',
                description: 'Back-end completo de una aplicación web en etapa mobile-first que conecta con un frontend Flutter para Android e iOS. Incluye CRUD multi-tenancy con gestión de permisos, autenticación, módulo de facturación de ARCA con AFIP SDK.',
                tags: [{ label: 'Node.js', accent: true }, { label: 'Multi-Tenancy' }, { label: 'Auth' }, { label: 'AFIP SDK' }],
                links: [{ text: 'Repo', url: 'https://github.com/Ivo-Bazan-IT/hype-workout-mobile-API', type: 'repo' }],
                image: 'src/assets/JS-code-image.jpg'
            },
            {
                title: 'Combis a la Costa — Gestión de Viajes',
                description: 'Aplicación de gestión de viajes, combis, pasajes y pasajeros para empresa marplatense en pleno crecimiento que ahorra horas de tareas manuales en el proceso de onboarding y gestión de clientes y viajes a través de una floja de vehículos bien definida.',
                tags: [{ label: 'Node.js', accent: true }, { label: 'TypeScript' }, { label: 'Full-Stack' }, { label: 'Gestión' }],
                links: [{ text: 'Ver proyecto', url: 'https://combisalacostasrl.com.ar/', type: 'demo' }],
                image: 'src/assets/Combis-costa-image.png'
            }
        ];

        data.forEach((item, idx) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'carousel-card-wrapper';
            wrapper.innerHTML = '<div></div>';
            const inner = wrapper.querySelector('div');
            container.appendChild(wrapper);
            this.projectCards.push(new ProjectCard(inner, item));
        });

        // Sync carousel index with initial active state (first card = index 0)
        window.currentCarouselIndex = 0;

        // Initialize carousel state after cards rendered
        this.applyCarousel3D();

        // Click on any project card: inactive -> activate; active -> modal
        container.addEventListener('click', (e) => {
            const wrapper = e.target.closest('.carousel-card-wrapper');
            if (!wrapper) return;

            const link = wrapper.querySelector('a[data-project-json]');

            const allWrappers = Array.from(container.querySelectorAll('.carousel-card-wrapper'));
            const clickedIdx = allWrappers.indexOf(wrapper);
            if (clickedIdx === -1) return;

            e.preventDefault();

            if (typeof window.rotateCarousel === 'function') {
                const currentIdx = (typeof currentCarouselIndex === 'number') ? currentCarouselIndex : 0;
                if (clickedIdx === currentIdx) {
                    // Active card clicked: open modal
                    if (link && typeof window.openProjectModal === 'function') {
                        window.openProjectModal(link);
                    }
                }
            }
        });
        // Project cards rendered; carousel state managed by rotateCarousel script
    }
}
