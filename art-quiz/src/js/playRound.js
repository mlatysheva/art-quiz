import images from "./images";

function playArtistRound() {
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const artistCategories = document.querySelectorAll('.artist-round');
  const artistsPage = document.querySelector('.artists-page');
  const artistsRound = document.querySelector('.artists-round-page');
  const painting = document.getElementById('painting');

  artistCategories.forEach(artistCategory => artistCategory.addEventListener('click', startGame));

  let categoryImages, currentQuestionIndex, roundNo;

  startButton.addEventListener('click', startGame);

  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion((roundNo - 1) * 12 + currentQuestionIndex);
  })

  function startGame() {
    console.log('started');
    // let roundNo = parseInt(this.id.slice(-2));
    roundNo = parseInt(this.id.slice(-2));
    artistsPage.classList.add('hide');
    startButton.classList.add('hide');
    artistsRound.classList.remove('hide');
    console.log(roundNo);
    categoryImages = images.slice((roundNo - 1)*12, (roundNo - 1) * 12 + 12);
    console.log(categoryImages);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    console.log(`Image No. in setNextQuestion will be : ${(roundNo - 1) * 12 + currentQuestionIndex}`);
    setNextQuestion((roundNo - 1) * 12 + currentQuestionIndex);
  }

  function setNextQuestion(imageNo) {
    resetState();
    showQuestion(imageNo);

  }

  function showQuestion(imageNo) {
    questionElement.innerText = 'Кто написал эту картину?';
    console.log('Image number is : ' + imageNo);
    painting.style.backgroundImage = `url(./images/square/${imageNo}.jpg)`;
    let randomEntries = Array.from({length: 3}, () => Math.floor(Math.random() * 240));
    console.log(randomEntries);
    let randomArtists = [];
    randomArtists.push(images[imageNo].author);
    randomEntries.forEach((entry, index) => {   
      if (entry.author === images[imageNo].author) {
        randomArtists.push(images[index + Math.random() * 240]);
        console.log('in if: ' + entry.author);
      } else {
        console.log('in else: ' + images[entry].author);
        randomArtists.push(images[entry].author);
      }
    })
    console.log(randomArtists);
    randomArtists.sort(() => Math.random() - 0.5);
    console.log(randomArtists);

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
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
    if (categoryImages.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide');
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

  const questions =[
    {
      question: 'Who is the author of this painting?',
      answers: [
        { text: 'Fedotov', correct: true },
        { text: 'Murillo', correct: false }
      ]
    },
    {
      question: 'When did Fedotov die?',
      answers: [
        { text: '1867', correct: true },
        { text: '1845', correct: false }
      ]
    },
    {
      question: 'Where is Munk buried?',
      answers: [
        { text: 'Paris', correct: true },
        { text: 'Nante', correct: false }
      ]
    }
  ]
}
export { playArtistRound }