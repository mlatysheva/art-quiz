function hideScreens() {
  const pages = document.querySelectorAll('.page');
  const pageBtns = document.querySelectorAll('.page-button');

  pageBtns.forEach(btn => btn.addEventListener('click', screenchange));

  function screenchange() {
    const pageName = this.dataset.page;
    this.parentNode.classList.add('hide');
    pages.forEach(page => {
      if(page.classList.contains(pageName)) {
        page.classList.remove('hide');
      }
    })
  }
}

export { hideScreens }