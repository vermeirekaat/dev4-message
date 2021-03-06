module.exports = {

    env: {
        CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
        CONTENTFUL_TOKEN: process.env.CONTENTFUL_TOKEN,
        CONTENTFUL_ENVI: process.env.CONTENTFUL_ENVI,
        CONTENTFUL_POST: process.env.CONTENTFUL_POST,
        IMAGES_DOMAIN: process.env.IMAGES_DOMAIN,
        NEXT_PUBLIC_URL_DOMAIN: process.env.NEXT_PUBLIC_URL_DOMAIN,
        SENDGRID_TOKEN: process.env.SENDGRID_TOKEN,
    },

    images: {
        domains: [process.env.IMAGES_DOMAIN],
    },
}