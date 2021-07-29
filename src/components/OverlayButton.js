import React, { useContext } from 'react';
import styles from '../styles/Card.module.scss';
import { SavedContext } from '../App';

const OverlayButton = ({type, property}) => {
  const buttonText = type === 'add'? 'Add Property' : 'Remove Property';
  const setSaved = useContext(SavedContext).setSaved;
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
      <button className={styles.button} onClick={handleClick}>{buttonText}</button>
    </div>
  );
}

export default OverlayButton;