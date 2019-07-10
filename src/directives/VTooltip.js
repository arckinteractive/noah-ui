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

        import('../molecules/NPopup').then((PopupComponent) => {
            const Constructor = vnode.context.Vue.extend(PopupComponent.default);

            const instance = new Constructor({
                propsData: data,
            });

            const vm = instance.$mount();

            vnode.context.$root.$el.appendChild(instance.$el);

            const events = [
                ['mouseenter', 'mouseleave'],
                ['focus', 'blur'],
                ['touchstart', 'touchend'],
            ];

            events.forEach((pair) => {
                listeners.attach(el, pair[0], () => {
                    [vm.$data.originalEvent] = pair;
                    vm.$data.isVisible = true;
                });

                listeners.attach(el, pair[1], () => {
                    if (vm.$data.originalEvent === pair[0]) {
                        vm.$data.originalEvent = null;
                        vm.$data.isVisible = false;
                    }
                });
            });
        });
    },

    unbind (el) {
        listeners.cleanup(el);
    },
};
