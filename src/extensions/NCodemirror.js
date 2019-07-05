export default {
    install (Vue) {
        Vue.prototype.$codemirror = {
            async load (options) {
                await import('codemirror/lib/codemirror.css');

                const module = await import('codemirror/lib/codemirror.js');
                const CodeMirror = module.default;

                const modes = options.modes || [];

                const modeImports = modes.map((mode) => {
                    return import(`codemirror/mode/${mode}/${mode}.js`);
                });

                await Promise.all(modeImports);

                return CodeMirror;
            },
        };

        Vue.component('n-codemirror', () => import('./NCodemirror.vue'));
    },
};
