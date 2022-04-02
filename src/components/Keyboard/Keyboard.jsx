import { useEffect } from 'react';
import styles from './Keyboard.module.scss';

const Keyboard = ({ onEnter, onDelete, onKeyDown }) => {
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

  return <p>keyboard</p>;
};

export default Keyboard;
