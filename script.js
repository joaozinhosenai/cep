document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cep');
    const buscarCepBtn = document.getElementById('buscarCep');
    const mensagemErro = document.getElementById('mensagemErro');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const localidadeInput = document.getElementById('localidade');
    const ufInput = document.getElementById('uf');
    const camposEnderecoDiv = document.querySelector('.campos-endereco');

    // Função para limpar os campos de endereço
    function limparCamposEndereco() {
        logradouroInput.value = '';
        bairroInput.value = '';
        localidadeInput.value = '';
        ufInput.value = '';
        mensagemErro.textContent = '';
        camposEnderecoDiv.style.display = 'none'; // Esconde os campos quando vazios
    }

    // Limpa os campos ao carregar a página
    limparCamposEndereco();

    // Adiciona um evento de escuta para o botão de buscar CEP
    buscarCepBtn.addEventListener('click', async () => {
        const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        if (cep.length !== 8) {
            mensagemErro.textContent = 'Por favor, digite um CEP válido com 8 dígitos.';
            limparCamposEndereco(); // Limpa os campos se o CEP for inválido
            return;
        }

        mensagemErro.textContent = ''; // Limpa qualquer mensagem de erro anterior
        limparCamposEndereco(); // Limpa os campos antes de uma nova busca

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                mensagemErro.textContent = 'CEP não encontrado ou inválido. Verifique e tente novamente.';
                limparCamposEndereco();
            } else {
                logradouroInput.value = data.logradouro;
                bairroInput.value = data.bairro;
                localidadeInput.value = data.localidade;
                ufInput.value = data.uf;
                camposEnderecoDiv.style.display = 'block'; // Mostra os campos
            }
        } catch (error) {
            mensagemErro.textContent = 'Ocorreu um erro ao buscar o CEP. Tente novamente mais tarde.';
            console.error('Erro ao buscar CEP:', error);
            limparCamposEndereco();
        }
    });

    // Opcional: Permite buscar o CEP ao pressionar Enter no campo de CEP
    cepInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            buscarCepBtn.click();
        }
    });
});