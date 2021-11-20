import { hideScreens } from './js/hideScreens.js';
import { settings } from './js/settings.js';
import { playArtistRound } from './js/playRound.js';
import { localStorageSettings, localStorageGame} from './js/localStorage.js';

console.log('Time for the art quizzzz!');

hideScreens();
settings();
playArtistRound();
localStorageSettings();
localStorageGame();
