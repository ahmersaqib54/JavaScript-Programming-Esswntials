const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink']; 
let cards = [];
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;

const startbtn = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

// Shuffle function
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Generate card elements
function generateCards() {
    cards.forEach(color => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.dataset.color = color;
        div.textContent = '?';
        gameContainer.appendChild(div);
    });
}

// Handle card click
function handleCardClick(event) {
    const card = event.target;
    if (!card.classList.contains('card') || card.classList.contains('matched')) return;

    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;

    selectedCards.push(card);

    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Check match
function checkMatch() {
    const [card1, card2] = selectedCards;

    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += 2;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        card1.textContent = '?';
        card2.textContent = '?';
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }

    selectedCards = [];
}

// Start the game
function startGame() {
    clearInterval(gameInterval);
    timeLeft = 30;
    selectedCards = [];
    score = 0;

    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time Left: ${timeLeft}`;
    startbtn.disabled = true;

    cards = shuffle(colors.concat(colors)); // correct pairs
    gameContainer.innerHTML = '';
    generateCards();

    gameContainer.addEventListener('click', handleCardClick);

    startTimer();
}

// Game timer
function startTimer() {
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert("Game Over!");
            startbtn.disabled = false;
        }
    }, 1000);
}

startbtn.addEventListener('click', startGame);
