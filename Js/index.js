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
    speechSynthesis.cancel(); // Cancela qualquer leitura anterior
    const text = document.body.innerText;
    speech = new SpeechSynthesisUtterance(text);
    speech.lang = "pt-BR";

    speech.onend = () => {
      isPaused = false;
    };

    speechSynthesis.speak(speech);
  }
}

function pararLeitura() {
  speechSynthesis.cancel();
  isPaused = false;
}

function verificarFimDaPagina() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    if (speechSynthesis.speaking) {
      speechSynthesis.pause();
      isPaused = true;
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const tamanhosDeFonte = {
    "fonte-pequena": "0.8rem",
    "fonte-media": "1.6rem",
    "fonte-grande": "2rem"
  };

  const body = document.body;
  const footer = document.getElementById("pageFooter");
  const welcomeSection = document.querySelector(".welcome");

  function alterarCorDaPagina() {
    body.style.backgroundColor = "#000";
    if (footer) footer.style.backgroundColor = "#000";

    const secoes = [
      ...document.querySelectorAll("section"),
      document.querySelector(".welcome"),
      document.querySelector(".know-us"),
      document.querySelector(".historia"),
      document.querySelector(".content-container"),
      document.querySelector(".pastors-section"),
      document.querySelector(".courses"),
      document.querySelector(".eventos"),
      document.querySelector(".doacao"),
      document.querySelector("h2.sub-titulo"),
      document.querySelector("table.agenda"),
      ...document.querySelectorAll("div.course")
    ];

    secoes.forEach(secao => {
      if (secao) {
        secao.style.backgroundColor = "#000";
        secao.style.color = "#fff";

        secao
          .querySelectorAll(
            "h1, h2, h3, h4, p, span, a, strong, div, li, td, th"
          )
          .forEach(el => {
            el.style.color = "#fff";
          });

        // Se for uma tabela, aplica borda e cor também
        if (secao.tagName === "TABLE") {
          secao.style.borderColor = "#fff";
          secao.querySelectorAll("td, th").forEach(celula => {
            celula.style.borderColor = "#fff";
          });
        }
      }
    });
  }

  function alterarFonte(tamanho) {
    document.querySelectorAll("body, body *").forEach(el => {
      el.style.fontSize = tamanho;
    });
  }

  function resetarConfiguracoes() {
    body.removeAttribute("style");
    if (footer) footer.removeAttribute("style");
    if (welcomeSection) welcomeSection.removeAttribute("style");

    document.querySelectorAll("body, body *").forEach(el => {
      el.style.fontSize = "";
      el.style.backgroundColor = "";
      el.style.color = "";
    });

    document.getElementById("selecione").value = "";
  }

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

// Eventos de rolagem e botões
window.addEventListener("scroll", verificarFimDaPagina);
document.getElementById("botaoLeitor").addEventListener("click", leitorDeTexto);
document
  .getElementById("botaoPararLeitura")
  .addEventListener("click", pararLeitura);
