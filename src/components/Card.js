import React, { useContext } from 'react';
import styles from '../styles/Card.module.scss';
import { SavedContext } from '../App';

const Card = ({details, children}) => {
  const {price, agency, mainImage} = details;
  let saved = useContext(SavedContext).saved;
  let isSaved = saved.includes(details);
  return (
    <div className={styles.card}>
      <div className={styles.header} style={{backgroundColor: agency.brandingColors.primary}}>
        <img className={styles.logo} src={agency.logo} alt="agency logo" />
      </div>
      <div className={styles.body}>
        <img className={styles.image} src={mainImage} alt="property main" />
        {isSaved? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}
      </div>
      <div className={styles.footer}>
          <span>Price </span>
          <span>{price}</span>
      </div>
      {children}
    </div>
  );
}

export default Card;