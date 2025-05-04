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

# URL do site
url = "https://andressa-gomes.github.io/Atostech/"
driver.get(url)
driver.maximize_window()

# Rolagem até o final da página
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

# Espera até que o link do formulário esteja disponível
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "formulario-link")))

# Encontra o link do formulário
form_link = driver.find_element(By.CLASS_NAME, "formulario-link").find_element(By.TAG_NAME, "a")

# Salva a aba original
original_window = driver.current_window_handle

# Clica no link para acessar o formulário
form_link.click()

# Espera até que a nova aba seja aberta
WebDriverWait(driver, 10).until(EC.new_window_is_opened([original_window]))

# Alterna para a nova aba
new_window = [window for window in driver.window_handles if window != original_window][0]
driver.switch_to.window(new_window)

# Aguarda um tempo para verificar se a nova página foi aberta
time.sleep(3)

# Verifica se o formulário foi aberto (confirma pelo URL)
form_opened = "google.com/forms" in driver.current_url
status = "[✔️] Link para o formulário foi aberto corretamente." if form_opened else "[❌] Falha ao abrir o formulário."

# Relatório - Captura de tela
os.makedirs("prints_formulario", exist_ok=True)
driver.save_screenshot("prints_formulario/formulario_aberto.png")

# Relatório no console
print(f"[INFO] Teste concluído: Acesso ao formulário na URL: {driver.current_url}")
print(status)

# Gerando relatório em arquivo .txt com codificação UTF-8
with open("relatorio_teste_formulario.txt", "w", encoding="utf-8") as file:
    file.write(f"Relatório do Teste de Acesso ao Formulário\n")
    file.write(f"URL do site: {url}\n")
    file.write(f"Ação: Rolagem até o final da página e clique no link do formulário.\n")
    file.write(f"Status: {status}\n")
    file.write(f"URL final: {driver.current_url}\n")
    file.write(f"Captura de tela: prints_formulario/formulario_aberto.png\n")
    file.write(f"Data e Hora: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
    file.write("\n-------------------------------------------------\n")
    file.write("Observações: Teste realizado com sucesso.\n")

# Fecha o navegador
driver.quit()