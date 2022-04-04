import styles from './Grid.module.scss';
import Cell from '../Cell';

const Row = ({ currentGuess }) => {
  const emptyCells = Array(5 - currentGuess.length).fill('');
  const cells = [...currentGuess, ...emptyCells];

  return (
    <div className={styles.row}>
      {cells.map((letter, index) => (
        <Cell key={index} value={letter} />
      ))}
    </div>
  );
};

const Grid = ({ currentRow, currentGuess }) => {
  return (
    <div className={styles.grid}>
      <Row currentGuess={currentGuess} />
    </div>
  );
};

export default Grid;
