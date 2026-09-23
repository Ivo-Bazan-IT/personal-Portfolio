/**
 * Componente 3D Carousel — Programación Orientada a Objetos.
 * Encapsula la rotación del carrusel, apertura/cierre del modal
 * y eventos de teclado.
 */
export class Carrousel {
    constructor() {
        this.currentCarouselIndex = 0;
        this.cardCount = 4;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupCarousel();
            this.setupKeyboardEvents();
            this.setupModalEvents();
        });
    }

    setupCarousel() {
        setTimeout(() => {
            const wrappers = document.querySelectorAll('#projects-carousel > .carousel-card-wrapper');
            if (!wrappers.length) return;
            this.currentCarouselIndex = 0;
            wrappers.forEach((w, i) => {
                w.className = 'carousel-card-wrapper';
                w.style.display = '';
                if (i === 0) w.classList.add('active-card');
                else if (i === 1) w.classList.add('side-card-right');
                else if (i === 2) w.classList.add('side-card-left');
                else if (i > 2) w.classList.add('hidden-stacked');
            });
        }, 50);
    }

    rotateCarousel(dir) {
        const wrappers = document.querySelectorAll('#projects-carousel > .carousel-card-wrapper');
        if (!wrappers.length) return;
        this.currentCarouselIndex = (this.currentCarouselIndex + dir + this.cardCount) % this.cardCount;
        console.log('Rotando a índice:', this.currentCarouselIndex);
        wrappers.forEach((w, i) => {
            w.className = 'carousel-card-wrapper';
            w.style.display = '';
            const offset = (i - this.currentCarouselIndex + this.cardCount) % this.cardCount;
            if (offset === 0) {
                w.classList.add('active-card');
            } else if (offset === 1 || offset === this.cardCount - 1) {
                w.classList.add(offset === 1 ? 'side-card-right' : 'side-card-left');
            } else {
                w.classList.add('hidden-stacked');
            }
        });
    }

    openProjectModal(aEl) {
        const raw = aEl.getAttribute('data-project-json');
        if (!raw) return;
        let data = {};
        try { data = JSON.parse(decodeURIComponent(raw)); } catch (e) { return; }
        const title = data.title || 'Proyecto';
        const desc = data.description || '';
        const tags = data.tags || [];
        const linkUrl = (data.links && data.links.length > 0) ? data.links[0].url : '#';
        const imgUrl = data.image || 'https://placehold.co/600x400/111111/D4FF00?text=Proyecto';
        const tagsHtml = tags.map(t => `<span class="px-2 py-1 text-[10px] font-bold uppercase ${t.accent ? 'bg-hype-accent/10 text-hype-accent border border-hype-accent/20' : 'bg-white/5 text-hype-muted border border-white/10'}">${t.label}</span>`).join('');
        const content = document.getElementById('project-modal-content');
        if (!content) return;
        content.innerHTML = `
            <img src="${imgUrl}" alt="${title}" class="w-full h-64 md:h-80 object-cover rounded-md mb-6 border border-white/10">
            <div class="flex flex-wrap gap-2 mb-4">${tagsHtml}</div>
            <h3 class="font-display font-bold text-2xl md:text-3xl text-white mb-3">${title}</h3>
            <p class="text-hype-muted text-base leading-relaxed mb-6">${desc}</p>
            <a href="${linkUrl}" target="_blank" class="inline-flex items-center gap-2 bg-hype-accent text-black font-bold uppercase tracking-wide px-6 py-3 rounded-sm hover:bg-hype-accentHover transition-colors">
                Ver proyecto <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
        `;
        const modal = document.getElementById('project-modal');
        const inner = document.getElementById('project-modal-inner');
        if (!modal || !inner) return;
        modal.classList.remove('hidden');
        requestAnimationFrame(() => {
            inner.classList.remove('scale-95', 'opacity-0');
            inner.classList.add('scale-100', 'opacity-100');
        });
        document.body.style.overflow = 'hidden';
    }

    closeProjectModal() {
        const modal = document.getElementById('project-modal');
        const inner = document.getElementById('project-modal-inner');
        if (!inner) return;
        inner.classList.remove('scale-100', 'opacity-100');
        inner.classList.add('scale-95', 'opacity-0');
        setTimeout(() => {
            if (modal) modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 250);
    }

    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                if (typeof this.rotateCarousel === 'function') this.rotateCarousel(-1);
            } else if (e.key === 'ArrowRight') {
                if (typeof this.rotateCarousel === 'function') this.rotateCarousel(1);
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeProjectModal();
        });
    }

    setupModalEvents() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeProjectModal();
            });
        }

        const container = document.querySelector('#projects-carousel');
        if (container) {
            container.addEventListener('click', (e) => {
                const wrapper = e.target.closest('.carousel-card-wrapper');
                if (!wrapper) return;
                const link = wrapper.querySelector('a[data-project-json]');
                const allWrappers = Array.from(container.querySelectorAll('.carousel-card-wrapper'));
                const clickedIdx = allWrappers.indexOf(wrapper);
                if (clickedIdx === -1) return;
                e.preventDefault();
                const currentIdx = (typeof this.currentCarouselIndex === 'number') ? this.currentCarouselIndex : 0;
                if (clickedIdx === currentIdx) {
                    if (link && typeof this.openProjectModal === 'function') {
                        this.openProjectModal(link);
                    }
                }
            });
        }
    }
}

const carouselInstance = new Carrousel();
window.rotateCarousel = (dir) => carouselInstance.rotateCarousel(dir);
window.closeProjectModal = () => carouselInstance.closeProjectModal();
window.openProjectModal = (aEl) => carouselInstance.openProjectModal(aEl);
