// 1. Mapeamento de Elementos

const inputReais = document.getElementById("valorReais");
const btnConverter = document.getElementById("btnConverter");
const divResultado = document.getElementById("resultado");
const areaHistorico = document.getElementById("areaHistorico");
const listaHistorico = document.getElementById("listaHistorico");

// 2. Estado da aplicação
let historico = []; // Array para guardar as conversões
const TaxaDeCambio = 5.30;

// 3. Formatando os valores
const formatadorUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const formatadorBRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

// 4. Função principal de conversão

function realizarConversao() {
    let valorDigitado = inputReais.value;
    let reais = Number(valorDigitado);
    
    // Validação visual (Sistema exibe uma mensagem caso o valor seja branco ou nulo)
    if (valorDigitado === "" || reais <= 0) {
        divResultado.textContent = "Por favor, digite um valor maior que zero.";
        divResultado.classList.add("erro"); // Aplica o estilo vermelho
        inputReais.focus(); // Mantém o usuário lá para corrigir
        return;
    }

    // Se passou na validação, removemos a classe de erro (caso exista)
    divResultado.classList.remove("erro");

    // Calculo Matemático 
    let dolares = reais / TaxaDeCambio;

    // Formatando os valores com a API nativa
    let reaisFormatado = formatadorBRL.format(reais);
    let dolaresFormatado = formatadorUSD.format(dolares);

    // Saída na tela principal
    divResultado.textContent = `Resultado: ${dolaresFormatado}`;

    // Adicionando ao histórico e atualizando a interface
    atualizarHistorico(reaisFormatado, dolaresFormatado);

    // UX: Limpa o campo e foca novamente para a próxima conversão.
    inputReais.value = "";
    inputReais.focus();
}

// 5. Função bônus: Gerenciamento de Histórico
function atualizarHistorico(valorBr, valorUs) {
    // Adiciona o novo texto no início do array
    historico.unshift(`${valorBr} ➔ ${valorUs}`);

    // Limita o histórico aos 5 últimos cálculos
    if (historico.length > 5) {
        historico.pop();
    }

    // Mostra a área de histórico
    areaHistorico.classList.remove("escondido");

    // Atualiza a lista no HTML
    listaHistorico.innerHTML = "";
    historico.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        listaHistorico.appendChild(li);
    });
}

// 6. Configuração de Eventos

// Evento de clique no botão
btnConverter.addEventListener("click", realizarConversao);

// Evento de apertar "Enter" dentro do input
inputReais.addEventListener("keypress", function(evento) {
    if (evento.key === "Enter") {
        realizarConversao();
    }
});
