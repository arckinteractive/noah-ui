import NoahUi from '../../src/main.js';
import './docs.scss';
import NRecaptcha from '../../src/extensions/NRecaptcha';
import NCodemirror from '../../src/extensions/NCodemirror';

export default (
    {
        Vue, // the version of Vue being used in the VuePress app
        options, // the options for the root Vue instance
        router, // the router instance for the app
        siteData, // site metadata
    },
) => {
    if (process.env.NODE_ENV !== 'production') {
        Vue.config.devtools = true;
        Vue.config.performance = true;
    }

    Vue.use(NoahUi);

    Vue.use(NCodemirror);

    Vue.use(NRecaptcha, {
        siteKey: '6LcoUKIUAAAAABUikWoT_q3KF21LiPhU4g7rKL6O',
    });
}
