import { BaseComponent } from '../core/BaseComponent.js';

/**
 * Componente de formulario de contacto con simulación de envío.
 */
export class ContactForm extends BaseComponent {
    constructor(formId) {
        super('#' + formId);
        this.form = this.root ? document.getElementById(formId) : null;
        if (this.form) this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(event) {
        event.preventDefault();
        const btn = this.form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = `<span>Procesando...</span>`;
        btn.disabled = true;
        btn.classList.add('opacity-90');

        setTimeout(() => this.showSuccess(btn, originalText), 1500);
    }

    showSuccess(btn, originalText) {
        btn.classList.remove('bg-black', 'text-hype-accent');
        btn.classList.add('bg-green-500', 'text-white');
        btn.innerHTML = `<span>¡Sistema Notificado!</span>`;
        this.form.reset();

        setTimeout(() => {
            btn.classList.add('bg-black', 'text-hype-accent');
            btn.classList.remove('bg-green-500', 'text-white');
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.classList.remove('opacity-90');
        }, 3000);
    }
}
