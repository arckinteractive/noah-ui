import noahConfig from './noah.config';

import Viewport from './plugins/Viewport';
import Confirm from './plugins/Confirm';
import Logger from './plugins/Logger';
import Alert from './plugins/Alert';
import Focus from './plugins/Focus';
import Popper from './plugins/Popper';

import Spinner from './directives/VSpinner';

export default {
    install (Vue, options) {
        const config = options || noahConfig;

        Vue.prototype.Vue = Vue;

        Vue.prototype.$config = config;
        Vue.prototype.$globals = {};
        Vue.prototype.$bus = new Vue();

        Vue.use(Viewport, config);
        Vue.use(Confirm, config);
        Vue.use(Logger, config);
        Vue.use(Alert, config);
        Vue.use(Focus, config);
        Vue.use(Popper, config);

        Vue.directive('spinner', Spinner(config));

        Object.keys(config.components).forEach(async (componentName) => {
            const opts = config.components[componentName];

            if (typeof opts === 'object' && opts !== null) {
                const componentDir = opts.path.replace('\\', '/');

                if (opts.loader) {
                    Vue.component(componentName, opts.loader());
                } else if (opts.async === false) {
                    Vue.component(componentName, require(`./${componentDir}/${componentName}`).default);
                } else {
                    Vue.component(componentName, () => import(`./${componentDir}/${componentName}`));
                }
            }
        });
    },
};
