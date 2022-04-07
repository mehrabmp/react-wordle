import styles from './Grid.module.scss';
import Cell from '../Cell';
import { MAX_CHALLENGES, MAX_WORD_LENGTH } from '../../constants/settings';

const Grid = ({ currentGuess, guesses }) => {
  const empties = Array(MAX_CHALLENGES - guesses.length - 1).fill();

  return (
    <div className={styles.grid}>
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < MAX_CHALLENGES && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
};

const CurrentRow = ({ guess }) => {
  const emptyCells = Array(MAX_WORD_LENGTH - guess.length).fill('');
  const cells = [...guess, ...emptyCells];

  return (
    <div className={styles.row}>
      {cells.map((letter, index) => (
        <Cell key={index} value={letter} />
      ))}
    </div>
  );
};

const CompletedRow = ({ guess }) => {
  const cells = guess.split('');
  const statuses = ['absent', 'present', 'correct', 'absent', 'absent'];

  return (
    <div className={styles.row}>
      {cells.map((letter, index) => (
        <Cell
          key={index}
          position={index}
          value={letter}
          isCompleted
          status={statuses[index]}
        />
      ))}
    </div>
  );
};

const EmptyRow = () => {
  const cells = Array(MAX_WORD_LENGTH).fill();

  return (
    <div className={styles.row}>
      {cells.map((_, index) => (
        <Cell key={index} />
      ))}
    </div>
  );
};

export default Grid;
