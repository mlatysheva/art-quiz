import { images } from "./imagesEng.js";
import { showModalWindow } from "./modalWindow.js";

function playPaintingRound() {
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const scoreButton = document.getElementById('score-btn');
  const categoriesButton = document.getElementById('categories-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const paintingCategories = document.querySelectorAll('.painting-round');
  const paintingsPage = document.querySelector('.paintings-page');
  const paintingsRound = document.querySelector('.paintings-round-page');
  const painting = document.getElementById('painting');
  const endMessageDiv = document.getElementById('end-message');
  const questionsPlayed = document.getElementById('questions-played');

  const correctSound = new Audio('./sounds/correctAnswer.mp3');
  const wrongSound = new Audio('./sounds/wrongAnswer.mp3');
  const attentionQuestion = new Audio('./sounds/attentionQuestion.mp3');
  const attentionCorrectAnswer = new Audio('./sounds/attentionCorrectAnswer.mp3');
  const endOfRound = new Audio('./sounds/endOfRound.mp3');

  let correctImageNo;
  
  if (localStorage.getItem('gameResults')) {
    localStorage.removeItem('gameResults');
  }

  let score;
  let answeredQuestions;
  let imagesArray;
  let gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];

  localStorage.removeItem('gameResults');

  paintingCategories.forEach(paintingCategory => paintingCategory.addEventListener('click', startGame));

  let categoryImages, currentQuestionIndex, roundNo;

  nextButton.addEventListener('click', () => {
    showModalWindow(correctImageNo);
    currentQuestionIndex++;
    correctImageNo = (roundNo - 1) * 10 + currentQuestionIndex;
    setNextQuestion(correctImageNo);
  })

  function startGame() {
    localStorage.removeItem('score');
    localStorage.removeItem('answeredQuestions');
    console.log('Game started');
    score = 0;
    answeredQuestions = [];
    imagesArray = [];
    roundNo = parseInt(this.id.slice(-2));
    localStorage.setItem('roundNo', roundNo);
    paintingsPage.classList.add('hide');
    startButton.classList.add('hide');
    scoreButton.classList.remove('inline-block');
    scoreButton.classList.add('hide');
    categoriesButton.classList.remove('inline-block');
    categoriesButton.classList.add('hide');
    endMessageDiv.classList.add('hide');
    paintingsRound.classList.remove('hide');
    categoryImages = images.slice((roundNo - 1)*10, (roundNo - 1) * 10 + 10);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    correctImageNo = (roundNo - 1) * 10 + currentQuestionIndex
    setNextQuestion(correctImageNo);
    if (parseInt(localStorage.getItem('volume')) > 4) {
      attentionQuestion.play();
    }    
  }

  function setNextQuestion(imageNo) {
    resetState();    
    showQuestion(imageNo);
  }

  function showQuestion(imageNo) {
    questionElement.innerText = 'Who painted this painting?';
    imagesArray.push(imageNo);
    painting.style.backgroundImage = `url(./images/square/${imageNo}.jpg)`;
    let randomEntries = Array.from({length: 3}, () => Math.floor(Math.random() * 240));
    let randomArtists = [];
    randomArtists.push(images[imageNo].author);
    randomEntries.forEach((entry, index) => {   
      if (entry.author === images[imageNo].author) {
        randomArtists.push(images[index + Math.random() * 240]);
      } else {
        randomArtists.push(images[entry].author);
      }
    })
    randomArtists.sort(() => Math.random() - 0.5);

    randomArtists.forEach(artist => {
      const button = document.createElement('button');
      button.innerText = artist;
      button.classList.add('btn');
      button.classList.add('equal-height');
      if (artist === images[imageNo].author) {
        button.dataset.correct = artist.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    })
  }

  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }

  function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    })
    
    if (selectedButton.classList.contains("correct")) {
      if (parseInt(localStorage.getItem('volume')) > 3) {
        correctSound.play();
      }
      score++;
      answeredQuestions.push(1);
    }
    else {
      if (parseInt(localStorage.getItem('volume')) > 3) {
        wrongSound.play();
      }
      answeredQuestions.push(0);
    }
    
    if (categoryImages.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      let endRoundMessage = `You finished round ${roundNo} with score ${score}`;     
      endMessageDiv.innerHTML = `${endRoundMessage}`;        
      endMessageDiv.classList.remove('hide');
    
      scoreButton.classList.remove('hide');
      scoreButton.classList.add('inline-block');
      categoriesButton.classList.remove('hide');
      categoriesButton.classList.add('inline-block');
      endRound();
      scoreButton.addEventListener('click', showRoundResults);
      if (parseInt(localStorage.getItem('volume')) > 3) {
        endOfRound.play();
      }
    }
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element. classList.add('wrong');
    }
  }

  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }

  function endRound() {
    
    const round = localStorage.getItem('roundNo');
    const formattedRound = ('0' + round).slice(-2);
    const category = document.getElementById(formattedRound);
    if (category.childElementCount > 0) {
      category.removeChild(category.lastChild);
    }
    
    const roundResultsDiv = document.createElement('div');    
    const roundResults = document.createTextNode(`${score}/10`);
    
    roundResultsDiv.appendChild(roundResults);
        
    category.appendChild(roundResultsDiv);
    category.style.filter = 'grayscale(100%)';

    // update and keep results in local storage
    localStorage.removeItem('score');
    localStorage.removeItem('answeredQuestions');
    localStorage.setItem('score', score);
    localStorage.setItem('answeredQuestions', answeredQuestions);

    let roundScore = {
      "round": roundNo,
      "score": score,
      "answeredQuestions": localStorage.getItem('answeredQuestions')
    }

    gameResults.push(roundScore);
    localStorage.setItem('gameResults', JSON.stringify(gameResults)); 
  }

  function showRoundResults() {
    const roundNoSpan = document.querySelector('.round-number');
    const gamer = document.getElementById('gamer');
    const scoreSpan = document.getElementById('round-score');

    roundNoSpan.innerHTML = roundNo;
    if (localStorage.getItem('userName')) {
      gamer.innerHTML = `${localStorage.getItem('userName')}, `
    }
    scoreSpan.innerText = `${score} / 10`;

    if (parseInt(localStorage.getItem('volume')) > 4) {
      attentionCorrectAnswer.play();
    }    

    function showResults() {

      while (questionsPlayed.firstChild) {
        questionsPlayed.removeChild(questionsPlayed.firstChild);
      }
      let answersString = localStorage.getItem('answeredQuestions');
      let answersArray = answersString.split(',');

      imagesArray.forEach((image, index) => {
        const button = document.createElement('button');
        button.style.backgroundImage = `url(./images/square/${image}.jpg)`;
        button.classList.add('results-card');
        if (answersArray[index] === '0') {          
          button.style.filter = 'grayscale(100%)';
        }
        questionsPlayed.appendChild(button);
      })
      
    }
    showResults();    
  }
}

export { playPaintingRound }