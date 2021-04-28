module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/cf_tracker/' : '/',
    pwa: {
        name: 'MyApp',
        iconPaths: {
            favicon32: null,
            favicon16: null,
            appleTouchIcon: null,
            maskIcon: null,
            msTileImage: null
        }
    }
};