export default {
    install (Vue, { siteKey }) {
        Vue.prototype.$recaptcha = {
            siteKey,
            load () {
                return new Promise((resolve, reject) => {
                    if (typeof window.grecaptcha === 'undefined') {
                        const script = document.createElement('script');

                        script.src = 'https://www.google.com/recaptcha/api.js';
                        script.async = true;
                        script.defer = true;

                        script.onload = () => {
                            window.grecaptcha.ready(() => {
                                resolve(window.grecaptcha);
                            });
                        };

                        script.onerror = reject;
                        script.onabort = reject;

                        document.head.appendChild(script);
                    } else {
                        window.grecaptcha.ready(() => {
                            resolve(window.grecaptcha);
                        });
                    }
                });
            },
        };

        Vue.component('n-recaptcha', () => import('./NRecaptcha.vue'));
    },
};
