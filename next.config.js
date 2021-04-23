module.exports = {

    env: {
        CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
        CONTENTFUL_TOKEN: process.env.CONTENTFUL_TOKEN,
        IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
    },

    images: {
        domains: [process.env.IMAGES_DOMAIN],
    },
}