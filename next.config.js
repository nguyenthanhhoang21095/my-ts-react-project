const configParams = require(`./config/production.json`);
const path = require('path');

module.exports = {
  // env: {
  //   ...configParams,
  // },
  experimental: {
    styledComponents: true
  },
  webpack(config, options) {
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}