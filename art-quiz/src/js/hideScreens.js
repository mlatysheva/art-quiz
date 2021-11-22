function hideScreens() {
  const pages = document.querySelectorAll('.page');
  const pageBtns = document.querySelectorAll('.page-button');
  // console.log('pageBtns are: ' + pageBtns);


  pageBtns.forEach(btn => btn.addEventListener('click', screenchange));

  function screenchange() {
    const pageName = this.dataset.page;
    // console.log('pageName is ' + pageName);
    this.parentNode.classList.add('hide');
    pages.forEach(page => {
      if(page.classList.contains(pageName)) {
        page.classList.remove('hide');
      }
    })
  }
}

export { hideScreens }