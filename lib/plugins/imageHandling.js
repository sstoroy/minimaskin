const sharp = require('sharp');
const Image = require('@11ty/eleventy-img');

const THUMBNAIL_WIDTH = 300;
const THUMBNAIL_FORMAT = "jpeg";

function getImageFolder() {
    if (process.env.NODE_ENV === 'production') {
        return "/minimaskin/assets/img";
    }
    return "/assets/img";
}

async function makeThumbnail(src, size) {
    const options = {
        formats: [THUMBNAIL_FORMAT],
        widths: [size || THUMBNAIL_WIDTH],
        urlPath: `${getImageFolder()}/thumbs/`,
        outputDir: './dist/assets/img/thumbs/'
    };

    const thumbnail = await Image(src, options);
    return thumbnail[THUMBNAIL_FORMAT][0];
}

async function singleImage(image, alt, size) {
    let thumb = await makeThumbnail(`./src/posts/img/${image}`, size);
    return `
        <div>
            <a href=${getImageFolder()}/${image} target="_blank">
            <img src="${thumb.url}" alt="${alt || image}"></a>
            ${alt || ""}
        </div>
    `;
}


module.exports = function(eleventyConfig) {
    eleventyConfig.addShortcode('image', singleImage);
}