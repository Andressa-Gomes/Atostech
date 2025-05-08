describe('Testes de Acessibilidade', () => {
    beforeEach(() => {
      // Acessa a página onde será feito o teste
      cy.visit('https://projetointegrador3comreact.vercel.app');
    });
  
    it('Deve alterar a cor da página corretamente', () => {
      // Seleciona a opção para alterar a cor
      cy.get('#selecione').select('cor');
      
      // Verifica se a cor de fundo do body foi alterada para preto
      cy.get('body').should('have.css', 'background-color', 'rgb(0, 0, 0)');
  
      // Verifica se o fundo do footer foi alterado para #444
      cy.get('#pageFooter').should('have.css', 'background-color', 'rgb(68, 68, 68)');
  
      // Verifica se a seção welcome tem a cor de fundo alterada
      cy.get('.welcome').should('have.css', 'background-color', 'rgb(34, 34, 34)');
    });
  
    it('Deve alterar o tamanho da fonte corretamente', () => {
      // Seleciona a opção para alterar o tamanho da fonte
      cy.get('#selecione').select('fonte-grande');
      
      // Verifica se o tamanho da fonte foi alterado para 1.8rem
      cy.get('body').should('have.css', 'font-size', '18px'); // O Cypress retorna a unidade em pixels
  
      // Verifica se o tamanho da fonte foi alterado para outros elementos
      cy.get('.welcome').should('have.css', 'font-size', '18px');
    });
  
    it('Deve resetar as configurações de cor e fonte', () => {
      // Seleciona a opção de resetar as configurações
      cy.get('#selecione').select('reset');
  
      // Verifica se a cor de fundo do body voltou ao valor inicial
      cy.get('body').should('have.css', 'background-color', 'rgb(244, 244, 244)');
  
      // Verifica se o fundo do footer voltou ao valor inicial
      cy.get('#pageFooter').should('have.css', 'background-color', 'rgb(179, 229, 252)');
  
      // Verifica se o tamanho da fonte foi resetado para o valor padrão
      cy.get('body').should('have.css', 'font-size', '16px');
    });
  });