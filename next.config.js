// module.exports = {
//   images: {
//     loader: 'imgix',
//     path: 'http://placeimg.com/640/640/animals',
//     // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640],
//   },
// }

const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})