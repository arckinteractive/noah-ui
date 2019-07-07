export default {
    install (Vue) {
        Vue.prototype.$popper = {
            async load () {
                const Popper = await import('popper.js');

                return Popper.default;
            },
        };
    },
};
