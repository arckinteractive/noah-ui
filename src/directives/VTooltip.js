import listeners from '../utils/listeners';

export default {
    bind: (el, binding, vnode) => {
        const data = typeof binding.value === 'string' ? {
            message: binding.value,
        } : binding.value;

        data.placement = data.placement || 'top';
        data.type = 'tooltip';
        data.openOnHover = true;
        data.openOnClick = false;
        data.trigger = el;

        import('../patterns/NPopup').then((PopupComponent) => {
            const Constructor = vnode.context.Vue.extend(PopupComponent.default);

            const instance = new Constructor({
                propsData: data,
            });

            const vm = instance.$mount();

            vnode.context.$root.$el.appendChild(instance.$el);

            listeners.attach(el, 'mouseenter', () => {
                vm.$data.originalEvent = 'mouseenter';
                vm.$data.isVisible = true;
            });

            listeners.attach(el, 'mouseleave', () => {
                if (vm.$data.originalEvent === 'mouseenter') {
                    vm.$data.originalEvent = null;
                    vm.$data.isVisible = false;
                }
            });

            listeners.attach(el, 'focus', () => {
                vm.$data.originalEvent = 'focus';
                vm.$data.isVisible = true;
            });

            listeners.attach(el, 'blur', () => {
                if (vm.$data.originalEvent === 'focus') {
                    vm.$data.originalEvent = null;
                    vm.$data.isVisible = false;
                }
            });
        });
    },

    unbind (el) {
        listeners.cleanup(el);
    },
};
