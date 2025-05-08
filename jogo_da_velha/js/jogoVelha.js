// Pegando as propriedades do elemento que tem a classe "board"
const celulas = document.querySelectorAll('.board > div');

// Obtém o elemento HTML que exibirá as mensagens do jogo
const elementoMensagem = document.querySelector('.message');

// Pegando as propriedades do botão usado para reiniciar o jogo
const botaoReiniciar = document.querySelector('.reset-button');

// Define qual jogador começa (regra: 'x' sempre começa)
let jogadorAtual = 'x';

// Variável para controlar se o jogo terminou ou não
let jogoAcabou = false;

// Cria um array (matriz) com 9 posições, uma para cada célula
// Inicialmente, todas as posições estão vazias ('')
const tabuleiro = ['', '', '', '', '', '', '', '', ''];

// Array (matriz) que contém todas as combinações de células que levam à vitória
const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];


// Função para verificar se o jogador atual venceu o jogo
function verificaVitoria() {
    for (const combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return true; // Se as três células forem iguais, o jogador venceu
        }
    }
    return false; // Se nenhuma combinação vencedora for encontrada, retorna falso
}

// Função para verificar se o jogo empatou
function verificaEmpate() {
    return tabuleiro.every(celula => celula !== ''); // Verifica se todas as células estão preenchidas
}

// Função chamada quando uma célula é clicada
function tratarCliqueCelula(evento) {
    if (jogoAcabou) return; // Se o jogo acabou, não faz nada

    const celula = evento.target;
    const indiceCelula = Array.from(celulas).indexOf(celula);

    // Se a célula já estiver preenchida, não faz nada
    if (tabuleiro[indiceCelula] !== '') {
        return;
    }

    // Marca a célula no tabuleiro com o símbolo do jogador atual
    tabuleiro[indiceCelula] = jogadorAtual;

    // Adiciona a classe 'x' ou 'o' ao elemento HTML da célula para mostrar visualmente o símbolo
    celula.classList.add(jogadorAtual);

    // Verifica se o jogador atual venceu após a jogada
    if (verificaVitoria()) {
        elementoMensagem.textContent = `Jogador ${jogadorAtual} venceu!`;
        jogoAcabou = true;
        return; // Sai da função, pois o jogo acabou
    }

    // Verifica se o jogo empatou após a jogada
    if (verificaEmpate()) {
        elementoMensagem.textContent = 'Empate!';
        jogoAcabou = true;
        return; // Sai da função
    }

    // Altera para o próximo jogador ('x' vira 'o', 'o' vira 'x')
    jogadorAtual = jogadorAtual === 'x' ? 'o' : 'x';
}

// Função para adicionar o evento de clique a cada célula
function anexarOuvintesClique() {
    celulas.forEach(celula => {
        celula.addEventListener('click', tratarCliqueCelula);
    });
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Limpa o tabuleiro (o array 'tabuleiro')
    for (let i = 0; i < tabuleiro.length; i++) {
        tabuleiro[i] = ''; // Define cada célula como vazia
        celulas[i].classList.remove('x', 'o'); // Remove as classes 'x' e 'o' de cada célula
    }

    // Reinicia o jogador atual para 'x'
    jogadorAtual = 'x';

    // Define 'jogoAcabou' como falso (o jogo recomeça)
    jogoAcabou = false;

    // Limpa a mensagem de vitória/empate
    elementoMensagem.textContent = '';
}

// Adiciona um ouvinte de evento ao botão de reiniciar
botaoReiniciar.addEventListener('click', reiniciarJogo);

// Chama a função para adicionar os ouvintes de clique às células (inicia o jogo)
anexarOuvintesClique();
