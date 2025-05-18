const TerserPlugin = require('terser-webpack-plugin');

module.exports = (config, options) => {
  const isProd = options.configuration === 'production';

  config.optimization = {
    ...config.optimization,
    minimize: isProd, // ❗ só minimiza em produção
    minimizer: isProd
      ? [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              compress: {
                drop_console: true,
                pure_funcs: ['ngDevMode'], // remove ngDevMode só em prod
              },
              output: {
                comments: false,
              },
            },
          }),
        ]
      : [],
  };

  config.cache = false;

  return config;
};
