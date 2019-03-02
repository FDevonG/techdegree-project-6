/*jshint esversion: 6 */

const phrase = document.querySelector('#phrase');
const qwerty = document.querySelector('#qwerty');
const overLay = document.querySelector('#overlay');

const title = document.querySelector('.title');
const resetButton = document.querySelector('.btn__reset');

let missed = 0;
const loseNumber = 5;
const phrases = [
	'A bird in the hand is worth two in the bush',
	'A chain is only as strong as its weakest link',
	'A drop in the ocean',
	'A fate worse than death',
	'A foot in the door',
	'As dead as a doornail',
	'Back to square one',
	'Bad egg',
	'Fancy pants',
	'Feeding frenzy',
	'Fiddlesticks',
	'Keen as mustard',
	'Keeping up with the Joneses',
	'Kiss and tell',
	'Know which side your bread is buttered',
	'Knuckle down',
	'Knock on wood',
	'Rack your brains',
	'Take with a grain of salt',
	'Taken for a ride',
	'A change is as good as a rest',
];

let phraseToGuess = [];


resetButton.addEventListener('click', () => {
	'use strict';
	overLay.style.display = 'none';
	missed = 0;
	phraseToGuess = getRandomPhrase(phrases);
	clearPhrase();
	resetKeyBoard();
	resetHearts();
	addPhraseToDisplay(phraseToGuess);
});

function getRandomPhrase(arr) {
	'use strict';
	const randomIndex = getRandomInt(arr.length);
	const randomPhrase = arr[randomIndex];
	const splitPhrase = randomPhrase.split('');
	return splitPhrase;
}

function getRandomInt(max) {
	'use strict';
    return Math.floor(Math.random() * Math.floor(max));
}

function addPhraseToDisplay (arr) {
	'use strict';
	//loop through phraseToGeuss array adding each index to a list item appending it to the phrase div
	for (let i = 0; i < arr.length; i++) {
		const newLetterLi = createElement('li');
		newLetterLi.textContent = arr[i];
		if (arr[i] !== ' ') {
			newLetterLi.className = 'letter';
		} 
		else 
		{
			newLetterLi.className = 'space';
		}
		appendItem(phrase, newLetterLi);
	}
}

function createElement (element) {
	'use strict';
	const newElement = document.createElement(element);
	return newElement;
}

function appendItem (parent, child) {
	'use strict';
	parent.appendChild(child);
}

function removeItem (parent, child) {
	'use strict';
	parent.removeChild(child);
}

function checkLetter (event) {
	'use strict';
	const letters = document.querySelectorAll('.letter');
	let letter = null;
	for (let i = 0; i < letters.length; i++) {
		if (letters[i].textContent.toUpperCase() === event.target.textContent.toUpperCase()) {
			letters[i].classList.add('show');
			letter = letters[i].textContent;
		}
	}
	return letter;
}

qwerty.addEventListener('click', (event) => {
	'use strict';
	if (event.target.tagName === 'BUTTON') {
		const letterFound = checkLetter(event);
		event.target.disabled = true;
		//if letterfound === null increase the missed count and remove a heart from the scoreboard
		if (letterFound === null) {
			const hearts = document.querySelectorAll('.tries');
			hearts[missed].style.opacity = 0;
			missed++;
		} 
		event.target.className = 'chosen';
		checkWin();
	}
});

function checkWin () {
	'use strict';
	if (missed >= loseNumber) {
		lostGame();
	} 
	else 
	{
		const lettersShown = document.querySelectorAll('.show');
		const letters = document.querySelectorAll('.letter');
		if (lettersShown.length === letters.length) {
			wonGame();
		}
	}
}

function clearPhrase () {
	'use strict';
	const letters = document.querySelectorAll('.letter');//remove the puzzle peices of the screen
	for (let i = 0; i < letters.length; i++) {
		removeItem(letters[i].parentNode, letters[i]);
	}
	const spaces = document.querySelectorAll('.space');//remove the puzzle peices of the screen
	for (let x = 0; x < spaces.length; x++) {
		removeItem(spaces[x].parentNode, spaces[x]);
	}
	const lettersShown = document.querySelectorAll('.show');
	for (let t = 0; t < lettersShown.length; t++) {
		removeItem(lettersShown[t].parentNode, lettersShown[t]);
	}
}

function lostGame () {
	'use strict';
	overLay.style.display = 'flex';
	overLay.className = 'lose';
	title.textContent = 'You have lost';
}

function wonGame() {
	'use strict';
	overLay.style.display = 'flex';
	overLay.className = 'win';
	title.textContent = 'Congratulations, you have won!';
}

function resetKeyBoard () {
	'use strict';
	const pressedKeys = document.querySelectorAll('.chosen');
	for (let i = 0; i < pressedKeys.length; i++) {
		pressedKeys[i].classList.remove('chosen');
		pressedKeys[i].disabled = false;
	}
}

function resetHearts () {
	'use strict';
	const tries = document.querySelectorAll('.tries');
	for (let i= 0; i < tries.length; i++) {
		tries[i].style.opacity = 1;
	}
}




