function localStorageSettings() {
  const userName = document.querySelector('.user-name');
  const volume = document.querySelector('.volume-setting');
  const time = document.querySelector('.time-setting');
  const seconds = document.querySelector('.seconds-input');
  const resetBtn = document.querySelector('.reset-button');
  const saveBtn = document.querySelector('.save-button');

  function setLocalStorage() {
    localStorage.setItem('volume', volume.value);
    localStorage.setItem('userName', userName.value);
    localStorage.setItem('time', time.value);
    localStorage.setItem('seconds', seconds.value);
  }
  saveBtn.addEventListener('click', setLocalStorage);
  // window.addEventListener('beforeunload', setLocalStorage);
  resetBtn.addEventListener('click', clearSettings);

  function getLocalStorage() {
    if (localStorage.getItem('userName')) {
      userName.value = localStorage.getItem('userName');
    }
    if (localStorage.getItem('volume')) {
      volume.value = localStorage.getItem('volume');
    }
    if (localStorage.getItem('time')) {
      time.value = localStorage.getItem('time');
    }
    if (localStorage.getItem('seconds')) {
      seconds.value = localStorage.getItem('seconds');
    }
  }
  window.addEventListener('load', getLocalStorage);

  function clearSettings() {
    localStorage.clear();
  }
}

function localStorageGame() {
  
  
}

export { localStorageSettings, localStorageGame  }