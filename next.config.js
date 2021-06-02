const configParams = require(`./config/${process.env.NODE_ENV}.json`);

module.exports = {
  env: {
    ...configParams,
  },
  webpack(config, options) {
    return config
  },
  distDir: 'build',
}