const wordDisplay = document.getElementById('word-display');
const buttons = document.querySelectorAll('.buttons input');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const scoreDisplay = document.getElementById('outScore');
const timeDisplay = document.getElementById('timer');

let score = 0;
let timeInterval;
let maxScore = 0;

// Lista de palavras para serem exibidas
function getRandomWords(){
  const words = ['Red', 'Blue', 'Green', 'Yellow', 'Purple'];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Função para obter uma cor aleatória
function getRandomColor() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Função para iniciar o jogo
function startGame() {

  // Escolhe aleatoriamente uma palavra e uma cor
  const randomWord = getRandomWords();
  const randomColor = getRandomColor();
  
  // Exibe a palavra com uma cor aleatória
  wordDisplay.textContent = randomWord;
  wordDisplay.style.color = randomColor;
  
  buttons.forEach(button => {
    button.disabled = false;
  });
  startButton.disabled = true;
}

function getCountdown(){
  let timeLeft = 19;
  timeInterval = setInterval(() => {
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      endGame();
    }
    timeDisplay.textContent = `Time: ${timeLeft}`;
    timeLeft--;
  }, 1000);
}

// Função chamada quando um botão é clicado
function checkAnswer(answer) {
  // Obtém a cor atual da palavra
  const currentWord = wordDisplay.textContent.toLowerCase();
  const clickedColor = answer.target.value.toLowerCase();
  const isMatch = clickedColor === currentWord;
  
  if (isMatch) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  } else {
    scoreDisplay.textContent = `Incorrect! Score: ${--score}`;
  }
  startGame();
}

function endRound(){
  if (score > maxScore){
    maxScore = score;
    scoreDisplay.textContent = `New High Score: ${maxScore}`;
  }
}

// Adicionar listener de clique nos botões
buttons.forEach(button => {
  button.addEventListener('click', checkAnswer); 
});

// Inicia uma nova rodada do jogo

startButton.addEventListener('click', () => {
  startGame();
  getCountdown();
});


// Redefinir jogo
resetButton.addEventListener('click', () => {
  score = 0;
  timeDisplay.textContent = 'Time: --'
  scoreDisplay.textContent = `Score: 0`;
  if (timeInterval){
  clearInterval(timeInterval);
  };
  startButton.disabled = false;
});

function endGame() {
  wordDisplay.textContent = 'Game Over';
  timeDisplay.textContent = 'Time: --'
  buttons.forEach(button => {
    button.disabled = true;
  });
  startButton.disabled = false;
  endRound();
}