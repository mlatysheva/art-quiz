console.log('Time for the art quizzzz!');

const pages = document.querySelectorAll('.page');
const pageBtns = document.querySelectorAll('.page-button');
const footer = document.getElementById('footer');

pageBtns.forEach(btn => btn.addEventListener('click', function() {
  const pageName = this.dataset.page;
  this.parentNode.classList.add('hide');
  pages.forEach(page => {
    if(page.classList.contains(pageName)) {
      page.classList.remove('hide');
      // footer.classList.add('hide');
    }
  })
}))

const timeBtns = document.querySelectorAll('.time-button');

timeBtns.forEach(btn => btn.addEventListener('click', function() {
  if (btn.classList.contains('time-minus-button')) {
    decrement();
    console.log('Minus button is clicked');
  } else {
    increment();
    console.log('plus button is clicked');
  }
}))

function increment() {
  document.getElementById('seconds-to-answer').stepUp();
}
function decrement() {
  document.getElementById('seconds-to-answer').stepDown();
}
const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
startButton.addEventListener('click', startGame);

function startGame() {
  console.log('started');
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort( () => {
    Math.random() - 0.5
  });
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex]);

}

function showQuestion(question) {
  questionElement.innerText = question.question;
}

function selectAnswer() {

}

const questions =[
  {
    question: 'Who is the author of this painting?',
    answers: [
      { text: 'Fedotov', correct: true },
      { text: 'Murillo', correct: false }
    ]
  }
]