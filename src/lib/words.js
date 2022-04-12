import { VALID_GUESSES } from '../constants/validGuesses';
import { WORDS } from '../constants/wordList';

export const isWordValid = word => {
  return (
    VALID_GUESSES.includes(word.toLowerCase()) ||
    WORDS.includes(word.toLowerCase())
  );
};

export const getGuessStatuses = guess => {
  const splitGuess = guess.toLowerCase().split('');
  const splitSolution = solution.split('');

  const statuses = [];
  const solutionCharsTaken = splitSolution.map(_ => false);

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct';
      solutionCharsTaken[i] = true;
      return;
    }
  });

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return;

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent';
      return;
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    );

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present';
      solutionCharsTaken[indexOfPresentChar] = true;
      return;
    } else {
      statuses[i] = 'absent';
      return;
    }
  });

  return statuses;
};

export const getStatuses = guesses => {
  const charObj = {};
  const splitSolution = solution.toUpperCase().split('');

  guesses.forEach(word => {
    word.split('').forEach((letter, i) => {
      if (!splitSolution.includes(letter)) return (charObj[letter] = 'absent');
      if (letter === splitSolution[i]) return (charObj[letter] = 'correct');
      if (charObj[letter] !== 'correct') return (charObj[letter] = 'present');
    });
  });

  return charObj;
};

export const getWordOfDay = () => {
  return { solution: 'chess' };
};

export const { solution } = getWordOfDay();
