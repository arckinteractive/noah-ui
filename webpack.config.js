module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    devtool: process.env.NODE_ENV === 'production' ? '#source-map' : '#eval-source-map',
};
