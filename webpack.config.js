const TerserPlugin = require('terser-webpack-plugin');

module.exports = (config) => {
  console.log('📦 Configuração Webpack original:', JSON.stringify(config, null, 2));

  // Personalização da configuração
  config.optimization = {
    ...config.optimization,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: false, // economiza RAM
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  };

  // Opcional: desativar cache do webpack (em tempo de build)
  config.cache = false;

  return config;
};
