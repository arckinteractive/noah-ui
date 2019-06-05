const resolveDevtool = () => {
    switch (process.env.NODE_ENV) {
        case 'test':
            return '#eval';

        case 'production':
            return '#source-map';

        default:
            return '#eval-source-map';
    }
};

module.exports = {
    configureWebpack: {
        devtool: resolveDevtool(),
    },
};
