import classNames from 'classnames';
import { useRef } from 'react';
import styles from './Switch.module.scss';

const Switch = ({ isOn, onToggle }) => {
  const ref = useRef();

  const classes = classNames({
    [styles.label]: true,
    [styles.isOn]: isOn,
  });

  return (
    <>
      <input
        className={styles.switch}
        type="checkbox"
        ref={ref}
        checked={isOn}
        onChange={onToggle}
      />
      <label className={classes} onClick={() => ref.current.click()}>
        <span className={styles.button} />
      </label>
    </>
  );
};

export default Switch;
