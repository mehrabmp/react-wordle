import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';
import useLocalStorage from './hooks/useLocalStorage';
import { getWordOfDay } from './lib/words';
import styles from './App.module.scss';

function App() {
  const [boardState, setBoardState] = useLocalStorage('boardState', {});
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState(() => {
    return boardState.gameStats ?? [];
  });

  // Show welcome modal
  useEffect(() => {
    if (!boardState.solution) console.log('welcome');

    // eslint-disable-next-line
  }, []);

  // Save gameState to localStorage
  useEffect(() => {
    setBoardState({
      gameStats: guesses,
      solution: getWordOfDay(),
    });
    // eslint-disable-next-line
  }, [guesses]);

  const handleDelete = () =>
    setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));

  const handleKeyDown = letter =>
    currentGuess.length < 5 && setCurrentGuess(currentGuess + letter);

  const handleEnter = () => {
    setGuesses([...guesses, currentGuess]);
    setCurrentGuess('');
  };

  return (
    <div className={styles.container}>
      <Grid currentGuess={currentGuess} guesses={guesses} />
      <Keyboard
        onEnter={handleEnter}
        onDelete={handleDelete}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default App;
