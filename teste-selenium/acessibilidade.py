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
os.makedirs("prints_acessibilidade", exist_ok=True)

# Caminho para o arquivo de relatório
relatorio_path = "prints_acessibilidade/relatorio_acessibilidade.txt"

# Abre o arquivo de relatório com codificação utf-8
with open(relatorio_path, "w", encoding="utf-8") as relatorio:
    relatorio.write("Relatório de Teste de Acessibilidade\n")
    relatorio.write("-------------------------------------------------\n\n")

    # Espera o carregamento da página
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

    # Testa a funcionalidade de acessibilidade (alteração de cor e fontes)
    try:
        # Alterar cor da página
        select_cor = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "selecione")))
        select_cor.click()
        time.sleep(1)
        option_cor = driver.find_element(By.XPATH, "//option[text()='Alterar Cor Da Página']")
        option_cor.click()
        time.sleep(3)  # Aguarda a mudança de cor
        driver.save_screenshot("prints_acessibilidade/cor_alterada.png")
        relatorio.write("[✔️] Cor da página alterada. Screenshot salva.\n")

        # Alterar tamanho da fonte para pequeno
        select_cor.click()  # Reabre o menu
        time.sleep(1)
        option_fonte_pequena = driver.find_element(By.XPATH, "//option[text()='Tamanho de Fonte Pequena']")
        option_fonte_pequena.click()
        time.sleep(3)  # Aguarda a mudança no tamanho da fonte
        driver.save_screenshot("prints_acessibilidade/fonte_pequena.png")
        relatorio.write("[✔️] Fonte alterada para pequena. Screenshot salva.\n")

        # Alterar tamanho da fonte para médio
        select_cor.click()  # Reabre o menu
        time.sleep(1)
        option_fonte_media = driver.find_element(By.XPATH, "//option[text()='Tamanho de Fonte Médio']")
        option_fonte_media.click()
        time.sleep(3)  # Aguarda a mudança no tamanho da fonte
        driver.save_screenshot("prints_acessibilidade/fonte_media.png")
        relatorio.write("[✔️] Fonte alterada para média. Screenshot salva.\n")

        # Alterar tamanho da fonte para grande
        select_cor.click()  # Reabre o menu
        time.sleep(1)
        option_fonte_grande = driver.find_element(By.XPATH, "//option[text()='Tamanho de Fonte Grande']")
        option_fonte_grande.click()
        time.sleep(3)  # Aguarda a mudança no tamanho da fonte
        driver.save_screenshot("prints_acessibilidade/fonte_grande.png")
        relatorio.write("[✔️] Fonte alterada para grande. Screenshot salva.\n")

        # Resetar as alterações para o padrão
        select_cor.click()  # Reabre o menu
        time.sleep(1)
        option_reset = driver.find_element(By.XPATH, "//option[text()='Voltar ao Padrão']")
        option_reset.click()
        time.sleep(3)  # Aguarda o reset
        driver.save_screenshot("prints_acessibilidade/reset.png")
        relatorio.write("[✔️] Resetado ao padrão. Screenshot salva.\n")

    except Exception as e:
        relatorio.write(f"[⚠️] Problema ao testar acessibilidade: {e}\n")

# Fecha o navegador
driver.quit()

print(f"Testes concluídos. Relatório gerado em: {relatorio_path}")