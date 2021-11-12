console.log('Time for the art quizzzz!');

const pages = document.querySelectorAll('.page');
const pageBtns = document.querySelectorAll('.page-button');

pageBtns.forEach(btn => btn.addEventListener('click', function() {
  const pageName = this.dataset.page;
  this.parentNode.classList.add('hide');
  pages.forEach(page => {
    if(page.classList.contains(pageName)) {
      page.classList.remove('hide')
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