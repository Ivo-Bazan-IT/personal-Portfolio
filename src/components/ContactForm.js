import { BaseComponent } from '../core/BaseComponent.js';

/** Clave pública de Web3Forms (web3forms.com). Es segura de exponer en el frontend. */
const WEB3FORMS_ACCESS_KEY = 'c5b7d741-602e-40a5-9c58-4f1d2f26e5f4';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Componente de formulario de contacto. Envía los datos por mail a través de Web3Forms.
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

    async handleSubmit(event) {
        event.preventDefault();
        const btn = this.form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = `<span>Enviando...</span>`;
        btn.disabled = true;
        btn.classList.add('opacity-90');

        const payload = Object.fromEntries(new FormData(this.form));
        payload.access_key = WEB3FORMS_ACCESS_KEY;
        payload.subject = `Nuevo mensaje del portfolio de ${payload.name}`;
        payload.from_name = 'Portfolio';

        try {
            const response = await fetch(WEB3FORMS_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.message || 'Error de envío');

            this.form.reset();
            this.showResult(btn, originalText, 'bg-green-500', '¡Mensaje enviado!');
        } catch (error) {
            console.error('ContactForm:', error);
            this.showResult(btn, originalText, 'bg-red-600', 'Error al enviar, intentá de nuevo');
        }
    }

    showResult(btn, originalText, bgClass, message) {
        btn.classList.remove('bg-black', 'text-hype-accent');
        btn.classList.add(bgClass, 'text-white');
        btn.innerHTML = `<span>${message}</span>`;

        setTimeout(() => {
            btn.classList.add('bg-black', 'text-hype-accent');
            btn.classList.remove(bgClass, 'text-white');
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.classList.remove('opacity-90');
        }, 3000);
    }
}
