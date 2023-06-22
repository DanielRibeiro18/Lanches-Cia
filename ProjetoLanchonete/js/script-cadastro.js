//CADASTRO DE CLIENTES

function abrirPopup() {
    document.getElementById("popup").style.display = "block";
    var nomeUsuario = document.getElementById("nome").value;
    document.getElementById("nomeUsuario").textContent = nomeUsuario;
    var nomeUsuario = document.getElementById("nome").value;
    var selectElement = document.getElementById("estado");

    // Limpar o formulário
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("cidade").value = "";
    selectElement.selectedIndex = 0;
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

function retornaHomepage() {
    window.location.href = "index.html";
}

// Função para tratar o evento de digitação no campo de telefone
const handlePhone = (event) => {
    let input = event.target; // Obtém a referência ao elemento de input que acionou o evento
    input.value = phoneMask(input.value); // Aplica a máscara de telefone ao valor do input
}

// Função para aplicar a máscara de telefone ao valor fornecido
const phoneMask = (value) => {
    if (!value) return ""; // Retorna uma string vazia se o valor for nulo ou vazio

    value = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do valor
    value = value.replace(/(\d{2})(\d)/, "($1) $2"); // Adiciona parênteses e espaço após os primeiros dois dígitos
    value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Adiciona um hífen após o quinto dígito

    return value; // Retorna o valor com a máscara aplicada
}

// Espera pelo evento 'DOMContentLoaded' para garantir que o DOM esteja completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', carregarEstados);

// Função responsável por carregar os estados no elemento select com o ID 'estado'
function carregarEstados() {
    const selectEstado = document.getElementById('estado'); // Obtém a referência ao elemento select com o ID 'estado'

    // Realiza uma requisição para a API do IBGE para obter a lista de estados
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => response.json()) // Converte a resposta para o formato JSON
        .then(data => {
            // Ordena os estados em ordem alfabética com base no nome
            data.sort((a, b) => a.nome.localeCompare(b.nome));

            // Itera sobre cada estado e cria uma opção para adicioná-la ao elemento select
            data.forEach(estado => {
                const option = document.createElement('option'); // Cria um elemento de opção
                option.value = estado.id; // Define o valor da opção como o ID do estado
                option.textContent = estado.nome; // Define o texto da opção como o nome do estado
                selectEstado.appendChild(option); // Adiciona a opção ao elemento select
            });
        })
        .catch(error => {
            console.log('Ocorreu um erro:', error); // Exibe uma mensagem de erro caso ocorra um problema na requisição
        });
}