export default {
    install (Vue, { version, publishableKey }) {
        Vue.prototype.$stripe = {
            publishableKey,
            load () {
                return new Promise((resolve, reject) => {
                    if (typeof window.Stripe === 'undefined') {
                        const script = document.createElement('script');

                        script.src = `https://js.stripe.com/${version}/`;
                        script.async = true;
                        script.defer = true;

                        script.onload = () => {
                            resolve(window.Stripe);
                        };

                        script.onerror = reject;
                        script.onabort = reject;

                        document.head.appendChild(script);
                    } else {
                        resolve(window.Stripe);
                    }
                });
            },
        };

        Vue.component('n-stripe-card', () => import('./NStripeCard.vue'));
    },
};
