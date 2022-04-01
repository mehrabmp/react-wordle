import styles from './Cell.module.scss';
import classNames from 'classnames';

const Cell = ({ value, status }) => {
  const classes = classNames({
    [styles.cell]: true,
    [styles.absent]: status === 'absent',
    [styles.present]: status === 'present',
    [styles.correct]: status === 'correct',
  });

  return <div className={classes}>{value}</div>;
};

export default Cell;
