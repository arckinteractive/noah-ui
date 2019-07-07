module.exports = {
    title: 'Noah UI',
    description: 'Vue Framework for Apocalyptic Schedules',
    base: process.env.BUILD_BASE || '/',
    plugins: [
        ['@vuepress/pwa'],
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-143382419-1',
            },
        ],
    ],

    chainWebpack: (config, isServer) => {
        if (process.env.BUILD_DEBUG) {
            config.devtool('#eval-source-map');
        }

        return config;
    },
};
