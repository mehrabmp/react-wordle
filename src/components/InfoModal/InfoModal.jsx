import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Cell from '../Cell';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { RiCloseCircleLine } from 'react-icons/ri';
import styles from './InfoModal.module.scss';
import '../../styles/_transitionStyles.scss';

const InfoModal = ({ isOpen, onClose }) => {
  const ref = useRef();

  useOnClickOutside(ref, onClose);

  return (
    <CSSTransition in={isOpen} timeout={300} classNames={'fade'} unmountOnExit>
      <div className={styles.modalContainer}>
        <div className={styles.modal} ref={ref}>
          <h2 className={styles.title}>How to play</h2>
          <button className={styles.close} onClick={onClose}>
            <RiCloseCircleLine size="1.6rem" color="#fff" />
          </button>
          <h3>
            Guess the WORDLE in six tries. Each guess must be a valid
            five-letter word. Hit the enter button to submit. After each guess,
            the color of the tiles will change to show how close your guess was
            to the word.
          </h3>
          <div className={styles.row}>
            <Cell value="W" status="correct" isCompleted />
            <Cell value="E" />
            <Cell value="A" />
            <Cell value="R" />
            <Cell value="Y" />
          </div>
          <h3>The letter W is in the word and in the correct spot.</h3>
          <div className={styles.row}>
            <Cell value="P" />
            <Cell value="I" status="present" isCompleted />
            <Cell value="L" />
            <Cell value="L" />
            <Cell value="S" />
          </div>
          <h3>The letter I is in the word but in the wrong spot.</h3>
          <div className={styles.row}>
            <Cell value="V" />
            <Cell value="A" />
            <Cell value="G" />
            <Cell value="U" status="absent" isCompleted />
            <Cell value="E" />
          </div>
          <h3>The letter U is not in the word in any spot.</h3>
        </div>
      </div>
    </CSSTransition>
  );
};

export default InfoModal;
