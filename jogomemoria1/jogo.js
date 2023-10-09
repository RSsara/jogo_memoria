document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.startButton');
    startButton.addEventListener('click', startGame);
});

 document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('jogo.html')) {
        const jogoMemoria = document.querySelector('.jogomemoria');
        jogoMemoria.classList.remove('invisivel');
    }
});


function startGame() {
    const startScreen = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');

    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    // Agora, crie as cartas aqui
    const jogoMemoria = document.querySelector('.carta-container');

    // Crie cada par de cartas (12 cartas no total)
    for (let i = 0; i < profissoes.length; i++) {
        const profissao = profissoes[i];
        for (let j = 0; j < 2; j++) {
            const carta = createCarta(profissao, i);
            jogoMemoria.appendChild(carta);
        }
    }

    // Inicie o jogo (embaralhamento, etc.) após criar as cartas
} 


const profissoes = [
    'med', 'eng', 'prof', 'juiza', 'pol', 'jorn',
];

// Duplicar as profissões para criar pares correspondentes
const paresProfissoes = [...profissoes, ...profissoes];



function createCarta(profissao, index) {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.inerhtml = index;

    // Crie um elemento de imagem
    const image = document.createElement('img');
    image.src = 'img/' + profissao.toLowerCase() + '.png';

    // Adicione a imagem à carta
    carta.appendChild(image);

    carta.textContent = profissao; // Defina o conteúdo de texto da carta como a profissao
    carta.addEventListener('click', () => flipCarta(carta));
    return carta;
}


let cards = shuffle(paresProfissoes);
let flippedCartas = [];
let matchedCartas = [];


function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function flipCarta(carta) {
    if (flippedCartas.length < 2 && !flippedCartas.includes(carta)) {
        carta.classList.add('flipped');
        flippedCartas.push(carta);

        if (flippedCartas.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}


function checkForMatch() {
    const [carta1, carta2] = flippedCartas;
    const index1 = carta1.dataset.index;
    const index2 = carta2.dataset.index;

    if (cards[index1] === cards[index2]) {
        matchedCartas.push(carta1, carta2);
        carta1.removeEventListener('click', () => flipCarta(carta1));
        carta2.removeEventListener('click', () => flipCarta(carta2));
    } else {
        carta1.classList.remove('flipped');
        carta2.classList.remove('flipped');
    }
    flippedCartas = [];

    if (matchedCartas.length === profissoes.length * 2) {
        alert('Parabéns, você ganhou o jogo!');
        resetGame();
    }
}


function resetGame() {
    cards = shuffle([...paresProfissoes]);
    matchedCartas = [];
    flippedCartas = [];

    document.querySelectorAll('.carta').forEach(carta => {
        carta.classList.remove('flipped');
        carta.addEventListener('click', () => flipCarta(carta));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const jogomemoria = document.querySelector('.jogomemoria');

    profissoes.forEach((profissoes, index) => {
        const carta = createCarta(profissoes, index);
        jogomemoria.appendChild(carta);
    });
});
