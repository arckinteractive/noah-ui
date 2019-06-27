import AlertComponent from './NAlert.vue';

export default {
    install (Vue) {
        Vue.prototype.$alert = function (msg, color, config = {}) {
            let data;

            if (typeof msg === 'object') {
                data = Object.assign(msg, config);
            } else {
                data = config;
                data.color = color;
                data.message = msg;
            }

            if (!data.color && data.type) {
                data.color = data.type;

                delete data.type;
            }

            const Constructor = Vue.extend(AlertComponent);

            const instance = new Constructor({
                propsData: data,
            });

            const vm = instance.$mount();

            const { containerId, containerClass } = vm.config;

            let container = document.getElementById(containerId);

            if (!container) {
                container = document.createElement('div');
                container.setAttribute('id', containerId);
                container.setAttribute('class', containerClass);

                if (this.$root) {
                    this.$root.$el.appendChild(container);
                } else {
                    document.body.appendChild(container);
                }
            }

            container.appendChild(instance.$el);

            instance.open();

            vm.$on('close', () => {
                vm.$nextTick(() => {
                    vm.$destroy(true);
                });
            });
        };
    },
};
