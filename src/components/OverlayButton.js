import React, { useContext } from 'react';
import styles from '../styles/Card.module.scss';
import { SavedContext } from '../App';

const OverlayButton = ({type, property}) => {
  let buttonText = type === 'add'? 'Add Property' : 'Remove Property';
  const {saved, setSaved} = useContext(SavedContext);
  if (type === 'add' && saved.includes(property))
    buttonText = 'saved';

  const handleClick = () => {
    switch(type) {
      case 'add': 
        setSaved({type: 'add', payload: property});
        break;
      case 'remove':
        setSaved({type: 'remove', payload: property.id});
        break;
      default:
        ;
    }
  }

  return (
    <div className={styles.overlay}>
      <button role="btn" className={styles.button} onClick={handleClick} disabled={buttonText === 'saved'}>{buttonText}</button>
    </div>
  );
}

export default OverlayButton;