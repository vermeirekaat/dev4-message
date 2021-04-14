module.exports = {

    env: {
        STRAPI_URL: process.env.STRAPI_URL,
        IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
    },
    publicRuntimeConfig: {
        STRAPI_URL: process.env.STRAPI_URL,
        IMAGES_DOMAIN: process.env.IMAGES_DOMAIN
    },

    images: {
        domains: [process.env.IMAGES_DOMAIN],
    },
}