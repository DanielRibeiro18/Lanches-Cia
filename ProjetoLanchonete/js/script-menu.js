// Função para abrir a página de cadastro
function openCadastroPage() {
    window.location.href = "cadastro.html";
}

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(item) {
    document.getElementById('carrinho').style.display = 'flex'; 

    // Tabela de preços dos itens
    const precos = {
        'Hamburger': {
            '1-carne': 20,
            '2-carnes': 30
        },
        'Misto-Quente': {
            'pao-frances': 5,
            'pao-de-forma': 7
        },
        'Lanche Natural': {
            'sem-frango': 8,
            'com-frango': 10
        },
        'Coxinha': {
            'sem-catupiry': 5,
            'com-catupiry': 7
        },
        'Pizza Enrolada': {
            'sem-catupiry': 5,
            'com-catupiry': 7
        },
        'Bebidas': {
            'agua': 6,
            'suco-natural': 6,
            'refrigerante': 7,
            'cerveja': 12
        }
    };

    const selectId = `opcoes-${item.toLowerCase().replace(' ', '-')}`;
    const select = document.getElementById(selectId);
    const selectValue = select.value;

    // Obter o preço do item selecionado
    const itemPrice = precos[item][selectValue];
    if (!itemPrice) {
        return;
    }

    // Atualizar o carrinho com o novo item e preço
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');

    const newItem = document.createElement('li');
    newItem.textContent = `${item} - R$${itemPrice.toFixed(2)}`;
    listaCarrinho.appendChild(newItem);

    let total = parseFloat(totalCarrinho.textContent.replace('R$', ''));
    if (isNaN(total)) {
        total = 0;
    }

    total += itemPrice;
    totalCarrinho.textContent = `R$${total.toFixed(2)}`;

    select.selectedIndex = 0;
}

let valorTotal = 0;

// Função para finalizar a compra
function finalizarCompra() {
    const totalCarrinho = document.getElementById('total-carrinho');
    const valorTotalString = totalCarrinho.textContent.replace('R$', '');
    valorTotal = parseFloat(valorTotalString);

    if (isNaN(valorTotal)) {
        alert('O valor total é inválido. Verifique o carrinho.');
        return;
    }

    const mensagem = `Valor total: R$${valorTotal.toFixed(2)}`;

    const mensagemPopup = document.getElementById('mensagemPopup');
    mensagemPopup.textContent = mensagem;

    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '';
    totalCarrinho.textContent = 'R$0.00';

    const carrinho = document.getElementById('carrinho');
    carrinho.style.display = 'none';
}

// Função para fechar o popup
function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

// Função para selecionar o método de pagamento
function metodoPag(paymentMethod) {
    const mensagemPopup = document.getElementById('mensagemPopup');
    const popUpBtn = document.querySelector('.pop-up-btn');

    popUpBtn.innerHTML = '';

    let formHTML;
    switch (paymentMethod) {
        case 'pix':
            formHTML = `
        <h3>Leia o QRCode para pagamento via PIX!</h3>
        <img src="img/QRCodeIFSP.png" alt="QR Code PIX" style="width: 200px;">
        <form>
        <button type="submit" style="margin-left: 20px">Confirmar pagamento!</button>
        </form>
        `;
            break;
        case 'dinheiro':
            formHTML = `
        <h3>Informações para pagamento em dinheiro</h3>
        <form style="display: flex">
        <label for="valorPago">Valor a pagar em R$:</label>
        <input type="text" id="valorPago" name="valorPago" style="font-size: 20px">
        <label for="valorTotal">Valor Total:</label>
        <input type="text" id="valorTotal" name="valorTotal" style="font-size: 20px" readonly>
        <label for="troco">Troco:</label>
        <input type="text" id="troco" name="troco" style="font-size: 20px" readonly>
        <button type="submit" style="margin-left: 20px">Concluir pagamento!</button>
        </form>
        `;
            break;
        case 'cartao':
            formHTML = `
        <form id="formCartao" style="display: grid">
        <h3 style="margin-bottom: 10px">Informações para pagamento com cartão</h3>
        <label for="numeroCartao">Número do Cartão:</label>
        <input type="text" id="numeroCartao" name="numeroCartao" maxlength="16" style="margin-bottom: 10px">
        <label for="nomeTitular">Nome do Titular:</label>
        <input type="text" id="nomeTitular" name="nomeTitular" style="margin-bottom: 10px">
        <label for="validadeCartao">Validade do Cartão:</label>
        <input type="date" id="validadeCartao" name="validadeCartao" style="margin-bottom: 10px">
        <label for="codigoSeguranca">Código de Segurança:</label>
        <input type="text" id="codigoSeguranca" name="codigoSeguranca" maxlength="3" style="margin-bottom: 10px">
        <label for="tipoCartao">Tipo de Cartão:</label>
        <select id="tipoCartao" name="tipoCartao" style="margin-bottom: 10px">
        <option value="credito">Crédito</option>
        <option value="debito">Débito</option>
        </select>
        <button type="submit" style="margin: 0 auto">Confirmar pagamento!</button>
        </form>
        `;
            break;
        default:
            formHTML = '';
    }

    // Adiciona o formulário ao pop-up
    popUpBtn.innerHTML = formHTML;

    // Adiciona o evento de clique ao botão "Confirmar pagamento!" no formulário do PIX
    if (paymentMethod === 'pix') {
        const confirmarPagamentoBtn = document.querySelector('.pop-up-btn button');
        confirmarPagamentoBtn.addEventListener('click', function (event) {
            event.preventDefault();
            popUpBtn.innerHTML = '';
            mensagemPopup.textContent = 'PIX validado! Obrigado pela preferência.';
        });
    }

    // Adiciona a função de cálculo do troco para o pagamento em dinheiro
    if (paymentMethod === 'dinheiro') {
        const pagarBtn = document.querySelector('.pop-up-btn button');
        pagarBtn.addEventListener('click', function (event) {
            event.preventDefault();
            popUpBtn.innerHTML = '';
            mensagemPopup.textContent = 'Obrigado pela preferência! Estaremos levando seu devido troco!';
        });

        const valorPagoInput = document.getElementById('valorPago');
        const valorTotalInput = document.getElementById('valorTotal');
        const trocoInput = document.getElementById('troco');

        // Atualiza o valor total no formulário
        valorTotalInput.value = `R$${valorTotal.toFixed(2)}`;

        // Adiciona o evento de input para calcular o troco
        valorPagoInput.addEventListener('input', function () {
            const valorPagoString = valorPagoInput.value.replace('R$', '');
            const valorPago = parseFloat(valorPagoString);

            // Calcula o troco
            const troco = valorPago - valorTotal;

            // Atualiza o valor do troco no formulário
            trocoInput.value = `R$${troco.toFixed(2)}`;
        });
    }

    // Adiciona a função de pagamento com cartão
    if (paymentMethod === 'cartao') {
        const pagarBtn = document.querySelector('.pop-up-btn button');
        pagarBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const formCartao = document.getElementById('formCartao');
            formCartao.style.display = 'none';
            mensagemPopup.textContent = 'Pagamento concluído! Seu pedido chegará em breve!';
        });
    }
}

function calcularTroco() {
    const valorPagoInput = document.getElementById('valorPago');
    const valorTotalInput = document.getElementById('valorTotal');
    const trocoInput = document.getElementById('troco');

    // Obtém o valor total do carrinho
    const totalCarrinho = document.getElementById('total-carrinho');
    const valorTotalString = totalCarrinho.textContent.replace('R$', '').trim();
    const valorTotal = parseFloat(valorTotalString);

    // Atualiza o valor total no formulário
    valorTotalInput.value = `R$${valorTotal.toFixed(2)}`;

    // Calcula o troco
    const valorPagoString = valorPagoInput.value.replace('R$', '').trim();
    const valorPago = parseFloat(valorPagoString);
    const troco = valorPago - valorTotal;

    // Atualiza o valor do troco no formulário
    trocoInput.value = `R$${troco.toFixed(2)}`;
}



