module.exports = {
    title: 'Noah UI',
    description: 'Vue.js Framework for Web Artisans',
    base: process.env.BUILD_BASE || '/',
    plugins: [
        [
            '@vuepress/pwa',
            {
                serviceWorker: true,
                updatePopup: {
                    message: 'Docs have been updated since your last visit',
                    buttonText: 'Refresh',
                },
            },

        ],
        [
            '@vuepress/google-analytics',
            {
                'ga': 'UA-143382419-1',
            },
        ],
    ],
};
