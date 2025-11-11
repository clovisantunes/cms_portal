import React from 'react';
import styles from './styles.module.scss';

const Carteirinha: React.FC = () => {
  return (
    <div className={styles.page}>
      <h1>Carteirinha Virtual</h1>
      <p>Sua carteirinha digital de saúde</p>
    </div>
  );
};

export default Carteirinha;