import { VALID_GUESSES } from '../constants/validGuesses';
import { WORDS } from '../constants/wordList';

export const isWordValid = word => {
  return (
    VALID_GUESSES.includes(word.toLowerCase()) ||
    WORDS.includes(word.toLowerCase())
  );
};

export const getWordOfDay = () => {
  return 'anise';
};

export const isWiningWord = word => {
  return word.toLowerCase() === getWordOfDay();
};
