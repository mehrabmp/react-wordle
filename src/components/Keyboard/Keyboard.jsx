import { useEffect } from 'react';
import classNames from 'classnames';
import { getStatuses } from 'lib/words';
import styles from './Keyboard.module.scss';

const Keyboard = ({ onEnter, onDelete, onKeyDown, guesses }) => {
  const charStatuses = getStatuses(guesses);

  useEffect(() => {
    const listener = e => {
      const key = e.key.toUpperCase();
      if (key === 'BACKSPACE') return onDelete();
      if (key === 'ENTER') return onEnter();
      if (key.length === 1 && key >= 'A' && key <= 'Z') onKeyDown(key);
    };

    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  });

  const handleClick = key => {
    if (key === 'ENTER') return onEnter();
    if (key === 'DELETE') return onDelete();

    onKeyDown(key);
  };

  return (
    <div className={styles.keyboard}>
      <div className={styles.row}>
        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(char => (
          <Key
            key={char}
            value={char}
            status={charStatuses[char]}
            onClick={handleClick}
          />
        ))}
      </div>
      <div className={styles.row}>
        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(char => (
          <Key
            key={char}
            value={char}
            status={charStatuses[char]}
            onClick={handleClick}
          />
        ))}
      </div>
      <div className={styles.row}>
        <Key value="DELETE" onClick={handleClick} status="action" />
        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(char => (
          <Key
            key={char}
            value={char}
            status={charStatuses[char]}
            onClick={handleClick}
          />
        ))}
        <Key value="ENTER" onClick={handleClick} status="action" />
      </div>
    </div>
  );
};

const Key = ({ value, status, onClick }) => {
  const classes = classNames({
    [styles.key]: true,
    [styles.absent]: status === 'absent',
    [styles.present]: status === 'present',
    [styles.correct]: status === 'correct',
    [styles.action]: status === 'action',
  });

  return (
    <button className={classes} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Keyboard;
