import classNames from 'classnames';
import styles from './Cell.module.scss';

const Cell = ({ value, status }) => {
  const classes = classNames({
    [styles.cell]: true,
    [styles.absent]: status === 'absent',
    [styles.present]: status === 'present',
    [styles.correct]: status === 'correct',
    [styles['cell-fill-animation']]: value,
    [styles['cell-reveal-animation']]: value,
  });

  return (
    <div className={classes}>
      <span className={styles.letter}>{value}</span>
    </div>
  );
};

export default Cell;
