import React from 'react';
import styles from '../styles/Card.module.scss';

const Card = ({details}) => {
  const {price, agency, mainImage} = details;
  return (
    <div className={styles.card}>
      <div className={styles.header} style={{backgroundColor: agency.brandingColors.primary}}>
        <img className={styles.logo} src={agency.logo} alt="agency logo" />
      </div>
      <div className={styles.body}>
        <img className={styles.image} src={mainImage} alt="property main" />
      </div>
      <div className={styles.footer}>
          <span>Price</span>
          <span>{price}</span>
      </div>
    </div>
  );
}

export default Card;