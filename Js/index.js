// Acessibilidade  botão ouvir

let speech = null;
let isPaused = false;

function leitorDeTexto() {
  if (speechSynthesis.speaking && !isPaused) {
    speechSynthesis.pause();
    isPaused = true;
  } else if (isPaused) {
    speechSynthesis.resume();
    isPaused = false;
  } else {
    const text = document.body.innerText;
    speech = new SpeechSynthesisUtterance(text);
    speech.lang = "pt-BR";

    speech.onend = () => {
      isPaused = false;
    };

    speechSynthesis.speak(speech);
  }
}

function verificarFimDaPagina() {
  // Verifica se o usuário chegou ao final da página
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (speechSynthesis.speaking) {
      // Pausa ou para a leitura ao chegar no final da página
      speechSynthesis.pause();
      isPaused = true;
    }
  }
}

function lerPagina() {
  let texto = document.body.innerText; // Captura o texto da página
  let fala = new SpeechSynthesisUtterance(texto); // Cria a fala
  fala.lang = "pt-BR"; // Define o idioma para português
  fala.rate = 1; // Ajusta a velocidade (1 = normal)
  fala.pitch = 1; // Ajusta o tom de voz
  window.speechSynthesis.speak(fala); // Fala o texto
}

// Acessibilidade fonte/cor

document.addEventListener("DOMContentLoaded", function() {
  const tamanhosDeFonte = {
    "fonte-pequena": "0.8rem",
    "fonte-media": "1rem",
    "fonte-grande": "1.8rem"
  };

  const body = document.body;
  const footer = document.getElementById("pageFooter");
  const welcomeSection = document.querySelector(".welcome"); // Seleciona a seção Welcome

  // Função para alterar a cor de fundo da página e da seção welcome
  function alterarCorDaPagina() {
    body.style.backgroundColor = "black";
    footer.style.backgroundColor = "#444"; // Muda a cor do footer
    if (welcomeSection) {
      welcomeSection.style.backgroundColor = "#222"; // Define cor de fundo para welcome
      welcomeSection.style.color = "#fff"; // Define cor do texto para contraste
    }
  }

  // Função para alterar o tamanho da fonte em toda a página
  function alterarFonte(tamanho) {
    document.querySelectorAll("body, body *").forEach(el => {
      el.style.fontSize = tamanho;
    });
  }

  // Função para resetar as configurações para o padrão
  function resetarConfiguracoes() {
    body.style.backgroundColor = "";
    footer.style.backgroundColor = "initial";
    if (welcomeSection) {
      welcomeSection.style.backgroundColor = "";
      welcomeSection.style.color = "";
    }
    document.querySelectorAll("body, body *").forEach(el => {
      el.style.fontSize = "1em"; // Volta ao tamanho padrão
    });
  }

  // Evento 'change' para capturar a seleção do usuário
  document.getElementById("selecione").addEventListener("change", function() {
    const valorSelecionado = this.value;

    if (valorSelecionado === "cor") {
      alterarCorDaPagina();
    } else if (valorSelecionado in tamanhosDeFonte) {
      alterarFonte(tamanhosDeFonte[valorSelecionado]);
    } else if (valorSelecionado === "reset") {
      resetarConfiguracoes();
    }
  });
});

// Configura o evento de rolagem para verificar quando chega ao final da página
window.addEventListener("scroll", verificarFimDaPagina);

// Configura o evento de clique no botão para iniciar a leitura
document.getElementById("botaoLeitor").addEventListener("click", leitorDeTexto);
// 3. Adicione o evento ao botão "Parar":
