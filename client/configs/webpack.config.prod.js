const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const common = require('./webpack.config.base.js');

const pathsConfig = require('./paths.config');

const pjson = require('../package.json');

console.log(`
  => Starting Webpack for ${pjson.name}
  * Environment NODE_ENV: ${process.env.NODE_ENV}
  * Environment BASE_URL: ${process.env.BASE_URL}
  * Defined paths: ${Object.keys(pathsConfig).reduce((acc, path) => {
    let content = `\n    - ${path}: `;

    if (typeof pathsConfig[path] === 'string') {
      content += pathsConfig[path];
    } else if (Array.isArray(pathsConfig[path])) {
      content += pathsConfig[path].reduce(
        (acc1, key) => acc1.concat(`\n      > ${key}`),
        ''
      );
    } else {
      content += Object.keys(pathsConfig[path]).reduce(
        (acc1, key) =>
          acc1.concat(`\n      > ${key}: ${pathsConfig[path][key]}`),
        ''
      );
    }

    return acc.concat(content);
  }, '')}
  `);

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!.keep'],
    }),
  ],
});
