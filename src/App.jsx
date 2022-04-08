import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Keyboard from './components/Keyboard';
import useLocalStorage from './hooks/useLocalStorage';
import { solution } from './lib/words';
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
      guesses,
      solution,
    });
    // eslint-disable-next-line
  }, [guesses]);

  const handleKeyDown = letter =>
    currentGuess.length < 5 && setCurrentGuess(currentGuess + letter);

  const handleDelete = () =>
    setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));

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
