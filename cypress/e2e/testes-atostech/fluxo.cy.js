
Cypress.on('uncaught:exception', (err, runnable) => {
    return false; 
  });

describe('Fluxo completo no site da Igreja Novo Tempo', () => {
    it('Executa ações e navega por todas as páginas', () => {
      // Visita a página principal
      cy.visit('https://andressa-gomes.github.io/Atostech/index.html');
  
      // Clica no botão "Ouvir Página"
      cy.contains('button', 'Ouvir Página').click();
      cy.wait(2000);
  
      // Define as rotas das páginas para navegar
      const paginas = [
        { nome: 'Quem Somos', caminho: 'html/quem somos.html' },
        { nome: 'CNT', caminho: 'html/cnt.html' },
        { nome: 'EBNT', caminho: 'html/ebnt.html' },
        { nome: 'Eventos', caminho: 'html/eventos.html' },
        { nome: 'Assista Agora', caminho: 'html/on.html' },
        { nome: 'Sabedoria', caminho: 'html/sabedoria.html' },
        { nome: 'Localização', caminho: 'html/localização.html' },
        { nome: 'Generosidade', caminho: 'html/generosidade.html' }
      ];
  
      // Navega por cada página do menu
      paginas.forEach(pagina => {
        cy.contains('a', pagina.nome).click();
        cy.wait(2000); // Espera para captar a página no vídeo
        cy.go('back'); // Volta para a página inicial
        cy.wait(1000); // Espera para garantir que carregou
      });
  
      // Retorna para a home ao final
      cy.visit('https://andressa-gomes.github.io/Atostech/index.html');
      cy.wait(1000);
    });
  });