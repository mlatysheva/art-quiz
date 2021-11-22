import { images } from "./imagesEng.js";

function playArtistRound() {
  const startButton = document.getElementById('artist-start-btn');
  const nextButton = document.getElementById('artist-next-btn');
  const scoreButton = document.getElementById('artist-score-btn');
  const categoriesButton = document.getElementById('artist-categories-btn');
  const questionContainerElement = document.getElementById('artist-question-container');
  const questionElement = document.getElementById('artist-question');
  const answerButtonsElement = document.getElementById('artist-answer-buttons');
  const artistCategories = document.querySelectorAll('.artist-round');
  const artistsPage = document.querySelector('.artists-page');
  const artistRound = document.querySelector('.artist-round-page');
  const painting1 = document.getElementById('painting01');
  const painting2 = document.getElementById('painting02');
  const painting3 = document.getElementById('painting03');
  const painting4 = document.getElementById('painting04');
  const endMessageDiv = document.getElementById('artist-end-message');
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

  artistCategories.forEach(artistCategory => artistCategory.addEventListener('click', startGame));

  let categoryImages, currentQuestionIndex, roundNo;

  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion((roundNo - 1) * 10 + 120 + currentQuestionIndex);
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
    artistsPage.classList.add('hide');
    startButton.classList.add('hide');
    scoreButton.classList.remove('inline-block');
    scoreButton.classList.add('hide');
    categoriesButton.classList.remove('inline-block');
    categoriesButton.classList.add('hide');
    endMessageDiv.classList.add('hide');
    artistRound.classList.remove('hide');
    // console.log(roundNo);
    categoryImages = images.slice((roundNo - 1)*10 + 120, (roundNo - 1) * 10 + 130);
    // console.log(categoryImages);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    // console.log(`Image No. in setNextQuestion will be : ${(roundNo - 1) * 10 + currentQuestionIndex}`);
    setNextQuestion((roundNo - 1) * 10 + 120 + currentQuestionIndex);
    if (localStorage.getItem('volume') != '0') {
      attentionQuestion.play();
    }    
  }

  function setNextQuestion(imageNo) {
    resetState();    
    showQuestion(imageNo);
  }

  function showQuestion(imageNo) {
    let artist = images[imageNo].author;
    questionElement.innerText = `Which one is ${artist}'s painting?`;
    // imagesArray.push(imageNo);
    let randomPaintings = Array.from({length: 3}, () => Math.floor(Math.random() * 240));
    // painting.style.backgroundImage = `url(./images/square/${imageNo}.jpg)`;
    // let randomPaintings = [];
    randomPaintings.push(imageNo);
    // randomEntries.forEach((entry, index) => {   
    //   if (entry.author === images[imageNo].author) {
    //     randomArtists.push(images[index + Math.random() * 240]);
    //     // console.log('in if: ' + entry.author);
    //   } else {
    //     // console.log('in else: ' + images[entry].author);
    //     randomPaintings.push(images[entry].author);
    //   }
    // })
    // console.log(randomArtists);
    randomPaintings.sort(() => Math.random() - 0.5);
    console.log('randomPaintings is:' + randomPaintings);

    randomPaintings.forEach((imageNumber, index) => {
      console.log('imageNumber is: '+ imageNumber);
      const questionPainting = document.createElement('div');
      let paintingNum = imageNumber.toString();
      console.log('paintingNum is: ' + paintingNum);
      questionPainting.style.backgroundImage = `url(./images/square/${imageNumber}.jpg)`;
      questionPainting.classList.add('four-paintings');
      if (imageNumber === imageNo) {
        questionPainting.dataset.correct = questionPainting.correct;
      }
      questionPainting.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(questionPainting);
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
      let endRoundMessage = `You finished round ${roundNo} with score ${score}`;     
      endMessageDiv.innerHTML = `${endRoundMessage}`;        
      endMessageDiv.classList.remove('hide');
    
      scoreButton.classList.remove('hide');
      scoreButton.classList.add('inline-block');
      categoriesButton.classList.remove('hide');
      categoriesButton.classList.add('inline-block');
      endRound();
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

export { playArtistRound }