const professions = [
    'Médico', 'Engenheiro', 'Professor', 'Advogado', 'policial' ,
    'Médico', 'Engenheiro', 'Professor', 'Advogado', 'policial' ,
];


function createCard(profession, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;

    // Crie um elemento de imagem
    const image = document.createElement('img');
    image.src = 'img/medica.png'

    // Adicione a imagem à carta
    card.appendChild(image);

    card.addEventListener('click', () => flipCard(card));
    return card;
}



let cards = shuffle([...professions]);
let flippedCards = [];
let matchedCards = [];

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

function createCard(profession, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.textContent = profession;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.textContent === card2.textContent) {
        matchedCards.push(card1, card2);
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];

    if (matchedCards.length === cards.length) {
        alert('Parabéns, você ganhou o jogo!');
        resetGame();
    }
}

function resetGame() {
    cards = shuffle([...professions]);
    matchedCards = [];
    flippedCards = [];

    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped');
        card.addEventListener('click', () => flipCard(card));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    
    cards.forEach((profession, index) => {
        const card = createCard(profession, index);
        gameContainer.appendChild(card);
    });
});