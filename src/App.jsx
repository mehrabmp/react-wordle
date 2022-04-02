import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import styles from './App.module.scss';
import Keyboard from './components/Keyboard';

function App() {
  const [currentRow, setCurrentRow] = useState(1);
  const [currentGuess, setCurrentGuess] = useState('');

  const handleDelete = () =>
    setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));

  const handleKeyDown = letter =>
    currentGuess.length < 5 && setCurrentGuess(currentGuess + letter);

  const handleEnter = () => {
    console.log('Enter');
    console.log(currentGuess);
  };

  return (
    <div className={styles.container}>
      <h1>
        {currentGuess} $ {currentGuess.length}
      </h1>
      {/* <Grid /> */}
      <Keyboard
        onEnter={handleEnter}
        onDelete={handleDelete}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default App;
