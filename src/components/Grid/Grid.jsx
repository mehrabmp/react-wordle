import { useEffect } from 'react';
import classNames from 'classnames';
import Cell from 'components/Cell';
import { getGuessStatuses } from 'lib/words';
import { MAX_CHALLENGES, MAX_WORD_LENGTH } from 'constants/settings';
import styles from './Grid.module.scss';

const Grid = ({ currentGuess, guesses, isJiggling, setIsJiggling }) => {
  const empties =
    MAX_CHALLENGES > guesses.length
      ? Array(MAX_CHALLENGES - guesses.length - 1).fill()
      : [];

  useEffect(() => {
    setTimeout(() => {
      if (isJiggling) setIsJiggling(false);
    }, 500);
    // eslint-disable-next-line
  }, [isJiggling]);

  return (
    <div className={styles.grid}>
      {guesses.map((guess, i) => (
        <CompletedRow key={i} guess={guess} />
      ))}
      {guesses.length < MAX_CHALLENGES && (
        <CurrentRow guess={currentGuess} isJiggling={isJiggling} />
      )}
      {empties.map((_, i) => (
        <EmptyRow key={i} />
      ))}
    </div>
  );
};

const CurrentRow = ({ guess, isJiggling }) => {
  const emptyCells = Array(MAX_WORD_LENGTH - guess.length).fill('');
  const cells = [...guess, ...emptyCells];

  const classes = classNames({
    [styles.row]: true,
    [styles.jiggle]: isJiggling,
  });

  return (
    <div className={classes}>
      {cells.map((letter, index) => (
        <Cell key={index} value={letter} />
      ))}
    </div>
  );
};

const CompletedRow = ({ guess }) => {
  const cells = guess.split('');
  const statuses = getGuessStatuses(guess);

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
