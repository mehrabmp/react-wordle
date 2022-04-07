import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import styles from './App.module.scss';
import Keyboard from './components/Keyboard';

function App() {
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);

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
