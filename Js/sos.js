async function buscarVersiculo() {
  try {
    const response = await axios.get(
      "https://bible-api.com/john+3:16?translation=almeida"
    );
    document.getElementById("versiculo").innerHTML = `"${response.data
      .text}" - ${response.data.reference}`;
  } catch (error) {
    console.error("Erro ao buscar versículo:", error);
  }
}

window.onload = buscarVersiculo;

// Chama a função assim que a página carregar
