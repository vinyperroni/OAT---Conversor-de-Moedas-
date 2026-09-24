function converterMoeda() {
    // 1. Lê o valor em reais introduzido pelo utilizador
    let inputReais = document.getElementById("valorReais").value;
    let reais = Number(inputReais);
    
    // Validação caso o campo esteja vazio
    if (inputReais === "") {
        alert("Por favor, introduza um valor para converter.");
        return;
    }

    // 2. Processamento: Calcula o valor em dólares
    let taxaDeCambio = 5.30;
    let dolares = reais / taxaDeCambio;

    // 3. Saída: Apresenta o resultado
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "Valor em Dólares: US$ " + dolares.toFixed(2);
}
