import NoahUi from '../../src/main.js';
import './docs.scss';

export default (
    {
        Vue, // the version of Vue being used in the VuePress app
        options, // the options for the root Vue instance
        router, // the router instance for the app
        siteData, // site metadata
    },
) => {
    Vue.use(NoahUi);

    Vue.component('codemirror', async () => {
        const install = await import('./codemirror.js');

        await import('../../node_modules/codemirror/mode/htmlmixed/htmlmixed.js');
        await import('../../node_modules/codemirror/mode/vue/vue.js');

        return install.default({
            // options go here
        });
    });
}
