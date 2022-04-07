import classNames from 'classnames';
import styles from './Cell.module.scss';

const Cell = ({ value, status, position, isCompleted }) => {
  const classes = classNames({
    [styles.cell]: true,
    [styles.absent]: status === 'absent',
    [styles.present]: status === 'present',
    [styles.correct]: status === 'correct',
    [styles['cell-fill-animation']]: value,
    [styles['cell-reveal-animation']]: isCompleted,
  });

  const animationDelay = `${position * 0.35}s`;

  return (
    <div className={classes} style={{ animationDelay }}>
      <span className={styles.letter} style={{ animationDelay }}>
        {value}
      </span>
    </div>
  );
};

export default Cell;
