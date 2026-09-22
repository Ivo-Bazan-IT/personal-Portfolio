import { BaseComponent } from '../core/BaseComponent.js';

/**
 * Tarjeta de proyecto: imagen 60% superior, info 40% inferior,
 * puntas redondeadas simétricas y botón con flecha derecha.
 */
export class ProjectCard extends BaseComponent {
    constructor(container, data) {
        super(container);
        this.data = data || {};
        this.render();
    }

    render() {
        const imgUrl = this.data.image || 'https://placehold.co/600x400/111111/D4FF00?text=' + encodeURIComponent(this.data.title || 'Project');

        const tags = (this.data.tags || []).map(t =>
            `<span class="px-2 py-1 text-[10px] font-bold uppercase ${t.accent ? 'bg-hype-accent/10 text-hype-accent border border-hype-accent/20' : 'bg-white/5 text-hype-muted border border-white/10'}">${t.label}</span>`
        ).join('');

        const link = (this.data.links && this.data.links.length > 0) ? this.data.links[0] : null;

        const fullData = JSON.stringify(this.data);
        this.root.innerHTML = `
            <a href="#" data-project-json="${encodeURIComponent(fullData)}" class="group block bg-hype-card rounded-lg overflow-hidden border-[3px] border-white/10 hover:border-hype-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-hype-accent/10 cursor-pointer">
                <div class="relative w-full overflow-hidden" style="height: 60%; min-height: 220px; max-height: 260px;">
                    <img src="${imgUrl}" alt="${this.data.title || 'Proyecto'}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
                </div>
                <div class="p-6" style="height: 40%; min-height: 150px;">
                    <div class="flex flex-wrap gap-2 mb-3">${tags}</div>
                    <h3 class="font-display font-bold text-xl text-white mb-2 leading-snug truncate">${this.data.title || 'Proyecto'}</h3>
                    <p class="text-hype-muted text-sm mb-4 line-clamp-2">${this.data.description || ''}</p>
                    <div class="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                        <span class="text-xs text-hype-muted font-medium uppercase tracking-wide">Ver proyecto</span>
                        <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-hype-accent text-black transition-transform duration-300 group-hover:translate-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </span>
                    </div>
                </div>
            </a>`;
    }
}
