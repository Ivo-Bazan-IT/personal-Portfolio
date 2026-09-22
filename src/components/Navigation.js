import { BaseComponent } from '../core/BaseComponent.js';

/**
 * Componente de navegación: menú fijo, scroll y menú móvil.
 */
export class Navigation extends BaseComponent {
    constructor() {
        super('#navbar');
        this.btn = document.getElementById('mobile-menu-btn');
        this.menu = document.getElementById('mobile-menu');
        this.links = this.menu?.querySelectorAll('a') || [];
        this.activeLink = null;
        this.init();
    }

    init() {
        if (!this.btn || !this.menu) return;
        this.bindEvents();
    }

    bindEvents() {
        this.btn.addEventListener('click', () => this.toggleMenu());
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMenu() {
        this.menu.classList.toggle('hidden');
    }

    closeMenu() {
        this.menu.classList.add('hidden');
    }

    handleScroll() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        if (window.scrollY > 50) {
            nav.classList.add('bg-hype-bg', 'shadow-md');
            nav.classList.remove('bg-hype-bg/90');
        } else {
            nav.classList.remove('bg-hype-bg', 'shadow-md');
            nav.classList.add('bg-hype-bg/90');
        }
    }
}
