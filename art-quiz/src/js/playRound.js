// import { hideScreens } from "./hideScreens.js";
import { images } from "./imagesEng.js";

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
  
  if (localStorage.getItem('gameResults')) {
    localStorage.removeItem('gameResults');
  }

  let score;
  let answeredQuestions;
  let imagesArray;
  let gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];

  localStorage.removeItem('gameResults');

  paintingCategories.forEach(artistCategory => artistCategory.addEventListener('click', startGame));

  let categoryImages, currentQuestionIndex, roundNo;

  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion((roundNo - 1) * 10 + currentQuestionIndex);
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
    // console.log(roundNo);
    categoryImages = images.slice((roundNo - 1)*10, (roundNo - 1) * 10 + 10);
    // console.log(categoryImages);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    // console.log(`Image No. in setNextQuestion will be : ${(roundNo - 1) * 10 + currentQuestionIndex}`);
    setNextQuestion((roundNo - 1) * 10 + currentQuestionIndex);
    if (localStorage.getItem('volume') != '0') {
      attentionQuestion.play();
    }    
  }

  function setNextQuestion(imageNo) {
    resetState();    
    showQuestion(imageNo);
  }

  function showQuestion(imageNo) {
    questionElement.innerText = 'Who painted this painting?';
    // console.log('Image number is : ' + imageNo);
    imagesArray.push(imageNo);
    painting.style.backgroundImage = `url(./images/square/${imageNo}.jpg)`;
    let randomEntries = Array.from({length: 3}, () => Math.floor(Math.random() * 240));
    // console.log(randomEntries);
    let randomArtists = [];
    randomArtists.push(images[imageNo].author);
    randomEntries.forEach((entry, index) => {   
      if (entry.author === images[imageNo].author) {
        randomArtists.push(images[index + Math.random() * 240]);
        // console.log('in if: ' + entry.author);
      } else {
        // console.log('in else: ' + images[entry].author);
        randomArtists.push(images[entry].author);
      }
    })
    // console.log(randomArtists);
    randomArtists.sort(() => Math.random() - 0.5);
    // console.log(randomArtists);

    randomArtists.forEach(artist => {
      const button = document.createElement('button');
      button.innerText = artist;
      button.classList.add('btn');
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
    // console.log('event is '+ event);
    const selectedButton = event.target;
    // console.log('selectedButton inner text is: ' + selectedButton.innerText);
    const correct = selectedButton.dataset.correct;
    // console.log('correct is: ' + correct);
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
      // console.log('setStatusClass(button, button.dataset.correct) is :' + setStatusClass(button, button.dataset.correct));
    })
    
    if (selectedButton.classList.contains("correct")) {
      // console.log('selectedButton.classList is: ' + selectedButton.classList);
      if (localStorage.getItem('volume') != '0') {
        correctSound.play();
      }
      score++;
      answeredQuestions.push(1);
    }
    else {
      if (localStorage.getItem('volume') != '0') {
        wrongSound.play();
      }
      answeredQuestions.push(0);
    }
    
    if (categoryImages.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      // answerButtonsElement.children.forEach(child => {
      //   child.classList.add('hide');
      // })
      let endRoundMessage = `You finished round ${roundNo} with score ${score}`;     
      endMessageDiv.innerHTML = `${endRoundMessage}`;        
      endMessageDiv.classList.remove('hide');
    
      scoreButton.classList.remove('hide');
      scoreButton.classList.add('inline-block');
      categoriesButton.classList.remove('hide');
      categoriesButton.classList.add('inline-block');
      endRound();
      // const starButton = document.querySelector('.score-btn-nav');
      // starButton.addEventListener('click', showRoundResults);
      scoreButton.addEventListener('click', showRoundResults);
      if (localStorage.getItem('volume') != '0') {
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
    
    // add the text node to the newly created div
    roundResultsDiv.appendChild(roundResults);
    
    // add the newly created element and its content into the DOM    
    category.appendChild(roundResultsDiv);
    category.style.filter = 'grayscale(100%)';

    // keep results in local storage
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
    // showRoundResults();   
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

    if (localStorage.getItem('volume') != '0') {
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
        
        // button.addEventListener('click', showModalWindow);
        questionsPlayed.appendChild(button);
      })
      
    }
    showResults();
    
  }
}

export { playPaintingRound }