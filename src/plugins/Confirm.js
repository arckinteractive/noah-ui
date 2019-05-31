import ConfirmComponent from './NConfirm.vue';

export default {
    install (Vue) {
        Vue.prototype.$confirm = function (msg, title, config = {}) {
            let data;

            if (typeof msg === 'object') {
                data = Object.assign(msg, config);
            } else {
                data = config;
                data.title = title;
                data.message = msg;
            }

            const Constructor = Vue.extend(ConfirmComponent);
            const instance = new Constructor({
                propsData: data,
            });

            const vm = instance.$mount();

            this.$root.$el.append(instance.$el);

            instance.open();

            return new Promise((resolve, reject) => {
                vm.$on('confirm', () => {
                    resolve();

                    vm.$nextTick(() => {
                        vm.$destroy(true);
                    });
                });

                vm.$on('cancel', () => {
                    reject(new Error('Cancelled'));

                    vm.$nextTick(() => {
                        vm.$destroy(true);
                    });
                });
            });
        };
    },
};
