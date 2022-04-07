import styles from './Grid.module.scss';
import Cell from '../Cell';

const Grid = ({ currentGuess, guesses }) => {
  const empties = Array(5 - guesses.length).fill();

  return (
    <div className={styles.grid}>
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < 5 && <CurrentRow guess={currentGuess} />}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
};

const CurrentRow = ({ guess }) => {
  const emptyCells = Array(5 - guess.length).fill('');
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
  const cells = Array(5).fill();

  return (
    <div className={styles.row}>
      {cells.map((_, index) => (
        <Cell key={index} />
      ))}
    </div>
  );
};

export default Grid;
