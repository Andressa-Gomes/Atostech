from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Inicia o navegador
navegador = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Acessa o site
navegador.get("https://andressa-gomes.github.io/Atostech/")

# Pega o título da página
titulo = navegador.title

# Exibe no terminal
print("Título da página:", titulo)

# Fecha o navegador
navegador.quit()