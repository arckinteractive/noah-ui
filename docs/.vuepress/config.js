module.exports = {
    title: 'Noah UI',
    description: 'Vue Framework for Apocalyptic Schedules',
    base: process.env.BUILD_BASE || '/',

    //If you are running into difficulties debugging code, uncomment this
    chainWebpack: (config, isServer) => {
        config.devtool('#eval-source-map');

        return config;
    }
};
