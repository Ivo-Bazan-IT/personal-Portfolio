/**
 * Clase base abstracta para todos los componentes del portfolio.
 * Provee encapsulamiento de elementos, eventos y ciclo de vida.
 */
export class BaseComponent {
    constructor(selectorOrId) {
        if (!selectorOrId) throw new Error('Selector/Id requerido');
        this.root = (typeof selectorOrId === 'string')
            ? document.querySelector(selectorOrId)
            : selectorOrId;
        if (!this.root) console.warn(`Elemento no encontrado: ${selectorOrId}`);
    }

    /** Atar un listener con referencia de eliminación */
    on(el, event, handler, opts) {
        const target = (typeof el === 'string') ? this.root.querySelector(el) : el;
        if (!target) return;
        target.addEventListener(event, handler, opts);
        return () => target.removeEventListener(event, handler, opts);
    }

    toggleClass(el, cls) {
        const target = (typeof el === 'string') ? this.root.querySelector(el) : el;
        target?.classList.toggle(cls);
    }

    addClass(el, cls) {
        const target = (typeof el === 'string') ? this.root.querySelector(el) : el;
        target?.classList.add(...cls.split(' '));
    }

    removeClass(el, cls) {
        const target = (typeof el === 'string') ? this.root.querySelector(el) : el;
        target?.classList.remove(...cls.split(' '));
    }

    html(el, content) {
        const target = (typeof el === 'string') ? (this.root.querySelector(el) || this.root) : el;
        if (content !== undefined) target.innerHTML = content;
        return target.innerHTML;
    }
}
