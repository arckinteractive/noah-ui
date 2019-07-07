export default {
    install (Vue) {
        Vue.prototype.$popper = {
            async load () {
                const Popper = import('popper.js/dist/umd/popper.js');

                return Popper.default;
            },
        };
    },
};
