import { images } from "./imagesEng.js";

function showModalWindow(correctImageNo) {
  // <modal> element
  const modal = document.getElementById("myModal");

  // <span> element closes the modal
  const span = document.getElementsByClassName("close")[0];

  // divs with information about the painting
  const modalPainting = document.getElementById('modal-painting');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalYear = document.getElementById('modal-year');

  // button <Continue> to close the modal window
  const modalNextBtn = document.getElementById('modal-next-btn');

  // Populate the information about the correct painting
  modalPainting.style.backgroundImage = `url(./images/square/${correctImageNo}.jpg)`;
  modalTitle.innerText = images[correctImageNo].name;
  modalAuthor.innerText = images[correctImageNo].author;
  modalYear.innerText = images[correctImageNo].year;  

  // show modal window
  modal.style.display = "block";  

  span.onclick = function() {
    modal.style.display = "none";
  }
  modalNextBtn.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

export { showModalWindow }