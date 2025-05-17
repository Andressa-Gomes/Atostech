const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
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
