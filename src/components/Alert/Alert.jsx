import useAlert from 'hooks/useAlert';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import styles from './Alert.module.scss';

const Alert = () => {
  const { message, status, isVisible } = useAlert();

  const classes = classNames({
    [styles.alert]: true,
    [styles.success]: status === 'success',
    [styles.error]: status === 'error',
  });

  return (
    <div className={styles.alertContainer}>
      <CSSTransition
        in={isVisible}
        timeout={300}
        classNames={'fadeIn'}
        unmountOnExit
      >
        <span className={classes}>{message}</span>
      </CSSTransition>
    </div>
  );
};

export default Alert;
