describe('Teste de navegação no site Atostech', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes("Cannot read properties of null (reading 'addEventListener')")) {
        return false;
      }
    });

    cy.visit('https://projetointegrador3comreact.vercel.app');
  });

  it('Deve rolar até a seção "sos"', () => {
    cy.contains('Quem Somos').scrollIntoView().should('be.visible');
  });
});