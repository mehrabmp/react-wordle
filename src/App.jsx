import { useState, useEffect } from 'react';
import Header from 'components/Header';
import Grid from 'components/Grid';
import Keyboard from 'components/Keyboard';
import Alert from 'components/Alert';
import InfoModal from 'components/InfoModal';
import useLocalStorage from 'hooks/useLocalStorage';
import useAlert from 'hooks/useAlert';
import { solution, isWordValid } from 'lib/words';
import {
  ALERT_DELAY,
  MAX_CHALLENGES,
  MAX_WORD_LENGTH,
} from 'constants/settings';
import styles from './App.module.scss';
import 'styles/_transitionStyles.scss';

function App() {
  const [boardState, setBoardState] = useLocalStorage('boardState', {});
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState(() => {
    return boardState.guesses ?? [];
  });
  const [isJiggling, setIsJiggling] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const { showAlert } = useAlert();

  // Show welcome modal
  useEffect(() => {
    if (!boardState.solution) setTimeout(() => setIsInfoModalOpen(true), 1000);
    // eslint-disable-next-line
  }, []);

  // Save gameStats to localStorage
  useEffect(() => {
    setBoardState({
      guesses,
      solution,
    });
    // eslint-disable-next-line
  }, [guesses]);

  // Check game winning or losing
  useEffect(() => {
    if (guesses.includes(solution.toUpperCase())) {
      setIsGameWon(true);
      setTimeout(() => showAlert('Well done', 'success'), ALERT_DELAY);
    } else if (guesses.length === MAX_CHALLENGES) {
      setIsGameLost(true);
      setTimeout(
        () => showAlert(`The word was ${solution}`, 'error', true),
        ALERT_DELAY
      );
    }
    // eslint-disable-next-line
  }, [guesses]);

  const handleKeyDown = letter =>
    currentGuess.length < MAX_WORD_LENGTH &&
    !isGameWon &&
    setCurrentGuess(currentGuess + letter);

  const handleDelete = () =>
    setCurrentGuess(currentGuess.slice(0, currentGuess.length - 1));

  const handleEnter = () => {
    if (isGameWon || isGameLost) return;

    if (currentGuess.length < MAX_WORD_LENGTH) {
      setIsJiggling(true);
      return showAlert('Not enough letters', 'error');
    }

    if (!isWordValid(currentGuess)) {
      setIsJiggling(true);
      return showAlert('Not in word list', 'error');
    }

    setGuesses([...guesses, currentGuess]);
    setCurrentGuess('');
  };

  return (
    <div className={styles.container}>
      <Header
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
      />
      <Alert />
      <Grid
        currentGuess={currentGuess}
        guesses={guesses}
        isJiggling={isJiggling}
        setIsJiggling={setIsJiggling}
      />
      <Keyboard
        onEnter={handleEnter}
        onDelete={handleDelete}
        onKeyDown={handleKeyDown}
        guesses={guesses}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
}

export default App;
