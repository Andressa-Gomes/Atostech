const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    cache: false, // desativa cache, pesa menos em RAM
    minimizer: [
      new TerserPlugin({
        parallel: false, // desativa múltiplos threads, pesa menos em RAM
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};
