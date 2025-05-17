const TerserPlugin = require('terser-webpack-plugin');

module.exports = (config) => {
  if (config.optimization && config.optimization.minimizer) {
    config.optimization.minimizer.forEach((plugin) => {
      if (plugin instanceof TerserPlugin) {
        plugin.options.terserOptions.compress.drop_console = true;
      }
    });
  }

  return config;
};
  