const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const questions = alphabet.split('').map(letter => ({
  letter: letter,
  question: `Con la ${letter.toUpperCase()}. (Agrega tu pregunta aquí)`,
}));

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

function displayQuestion() {
  const questionElement = document.getElementById('question');
  questionElement.textContent = questions[currentQuestionIndex].question;
}

function displayRosco() {
  const roscoElement = document.getElementById('rosco');
  roscoElement.innerHTML = '';

  for (const question of questions) {
    const listItem = document.createElement('li');
    listItem.textContent = question.letter.toUpperCase();
    roscoElement.appendChild(listItem);
  }
}

function updateRosco() {
  const roscoElement = document.getElementById('rosco');
  const listItems = roscoElement.getElementsByTagName('li');

  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] !== null) {
      listItems[i].classList.add(userAnswers[i] ? 'correct' : 'incorrect');
    }
  }
}

function checkAnswer() {
  const answerElement = document.getElementById('answer');
  const resultElement = document.getElementById('result');

  const userAnswer = answerElement.value.toLowerCase();
  const correctAnswer = questions[currentQuestionIndex].letter;

  if (userAnswer === correctAnswer) {
    resultElement.textContent = '¡Correcto!';
    userAnswers[currentQuestionIndex] = true;
  } else {
    resultElement.textContent = 'Incorrecto. La respuesta correcta era ' + correctAnswer.toUpperCase();
    userAnswers[currentQuestionIndex] = false;
  }

  answerElement.value = '';
  updateRosco();

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    resultElement.textContent = 'Fin del juego';
    document.getElementById('answer-container').style.display = 'none';
  }
}

function pass() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    document.getElementById('result').textContent = 'Fin del juego';
    document.getElementById('answer-container').style.display = 'none';
  }
}

// Iniciar el juego al cargar la página
window.onload = function () {
  displayRosco();
  displayQuestion();
};
