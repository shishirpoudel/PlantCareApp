const { getDefaultConfig } = require('metro-config')

module.exports = (async () => {
    const {
        resolver: { sourceExts },
    } = await getDefaultConfig()
    return {
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: false,
                },
            }),
        },
        resolver: {
            sourceExts: [...sourceExts, 'cjs'],
        },
    }
})()