from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

# Caminho para o chromedriver
service = Service(executable_path=r"C:\Users\cris-\Downloads\chromedriver-win64\chromedriver.exe")

# Inicializa o navegador
driver = webdriver.Chrome(service=service)
driver.get("https://andressa-gomes.github.io/Atostech/")
driver.maximize_window()

# Pasta onde os prints serão salvos
os.makedirs("prints_menu", exist_ok=True)

# Espera o menu carregar
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "nav")))

# Itens do menu e partes esperadas da URL
menus = {
    "Home": "index.html",
    "Quem Somos": "html/quem%20somos.html",
    "CNT": "cnt.html",
    "EBNT": "ebnt.html",
    "Eventos": "eventos.html",
    "Assista Agora": "on.html",
    "Sabedoria": "html/sabedoria.html",
    "Localização": "html/localiza%C3%A7%C3%A3o.html",
    "Generosidade": "generosidade.html"
}

# Testa os menus e tira print
for nome, parte_url in menus.items():
    try:
        link = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.LINK_TEXT, nome)))
        link.click()
        time.sleep(5)

        # Salva o print da página
        nome_arquivo = f"prints_menu/{nome.replace(' ', '_')}.png"
        driver.save_screenshot(nome_arquivo)

        # Verifica se a URL está correta
        if parte_url in driver.current_url:
            print(f"[✔️] '{nome}' OK | URL: {driver.current_url} | Print: {nome_arquivo}")
        else:
            print(f"[❌] '{nome}' ERRO | URL inesperada: {driver.current_url} | Print: {nome_arquivo}")

        driver.back()
        time.sleep(5)
    except Exception as e:
        print(f"[⚠️] Problema ao testar '{nome}': {e}")

# Fecha o navegador
driver.quit()





