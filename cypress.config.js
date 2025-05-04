const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true, // garante que o vídeo será gravado
  videoUploadOnPasses: false, // não apaga vídeos se os testes passarem
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
