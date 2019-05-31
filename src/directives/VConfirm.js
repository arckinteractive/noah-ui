import listeners from '../utils/listeners';

export default {
    bind (el, binding, vnode) {
        const value = typeof binding.value === 'string' ? {
            message: binding.value,
        } : binding.value;

        const on = value.on || 'click';

        const instance = vnode.componentInstance;
        const handler = instance.$listeners[on];

        listeners.attach(el, 'click', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();

            instance.$confirm(value).then(() => {
                if (typeof handler === 'function') {
                    return handler.call(ev);
                }

                return Promise.resolve(ev);
            }).catch(() => {});
        }, true);
    },

    unbind (el) {
        listeners.cleanup(el);
    },
};
