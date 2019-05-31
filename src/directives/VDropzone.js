import listeners from '../utils/listeners';

export default {
    bind: (el, binding) => {
        if (typeof binding.value !== 'function') {
            throw new Error('v-dropzone directives expects a callback function');
        }

        const handlers = {
            drag (e) {
                e.preventDefault();
                e.stopPropagation();
            },

            dragover (e) {
                e.preventDefault();
                e.stopPropagation();

                el.setAttribute('data-active', true);
            },

            dragenter (e) {
                e.preventDefault();
                e.stopPropagation();

                el.setAttribute('data-active', true);
            },

            dragleave (e) {
                e.preventDefault();
                e.stopPropagation();

                el.removeAttribute('data-active');
            },

            dragend (e) {
                e.preventDefault();
                e.stopPropagation();

                el.removeAttribute('data-active');
            },

            drop (e) {
                e.preventDefault();
                e.stopPropagation();

                el.removeAttribute('data-active');

                binding.value(e.dataTransfer.files);
            },
        };

        Object.keys(handlers).forEach((event) => {
            listeners.attach(el, event, handlers[event]);
        });
    },

    unbind (el) {
        listeners.cleanup(el);
    },
};
