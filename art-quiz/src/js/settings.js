function settings() {
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
}

export { settings }