import React, { useState, useEffect } from 'react';
import { 
  FaCalendarCheck, 
  FaHistory, 
  FaUserEdit, 
  FaIdCard,
  FaHandPeace
} from 'react-icons/fa';
import styles from './styles.module.scss';
import img1 from '../../assets/Banner-1.jpg'

interface HomeProps {
  onNavigate?: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCardClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const features = [
    {
      id: 'agendamento',
      icon: <FaCalendarCheck />,
      title: 'Fazer Agendamento',
      description: 'Marque consultas e exames rapidamente',
      color: '#dc2626'
    },
    {
      id: 'historico',
      icon: <FaHistory />,
      title: 'Ver Histórico',
      description: 'Acesse suas consultas e resultados',
      color: '#059669'
    },
    {
      id: 'dados-cadastrais',
      icon: <FaUserEdit />,
      title: 'Meus Dados',
      description: 'Atualize informações pessoais',
      color: '#7c3aed'
    },
    {
      id: 'carteirinha',
      icon: <FaIdCard />,
      title: 'Carteirinha',
      description: 'Carteira digital de saúde',
      color: '#0369a1'
    }
  ];


  return (
    <div className={styles.home}>
      {showModal && (
        <div className={styles.promoModal}>
          <div className={styles.promoContent}>
            <button 
              className={styles.promoClose}
              onClick={closeModal}
            >
              ×
            </button>
            <div className={styles.promoImage}>
              <img src={img1} alt="Promoção especial" />
            </div>
            <div className={styles.promoActions}>
              <button className={styles.promoButton}>
                Ver Oferta
              </button>
              <button 
                className={styles.promoSkip}
                onClick={closeModal}
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      )}

      <main className={styles.mainContent}>
        <section className={styles.welcomeSection}>
          <div className={styles.welcomeAvatar}>
            <FaHandPeace />
          </div>
          <div className={styles.welcomeText}>
            <h1>Olá, Clovis!</h1>
            <p>Como posso ajudar hoje?</p>
          </div>
        </section>

        <section className={styles.quickActions}>
          <h2 className={styles.sectionTitle}>Ações Rápidas</h2>
          <div className={styles.actionsGrid}>
            {features.map((feature) => (
              <button
                key={feature.id}
                className={styles.actionCard}
                onClick={() => handleCardClick(feature.id)}
                style={{ '--accent-color': feature.color } as React.CSSProperties}
              >
                <div 
                  className={styles.actionIcon}
                  style={{ color: feature.color }}
                >
                  {feature.icon}
                </div>
                <div className={styles.actionContent}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <div className={styles.actionArrow}>›</div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;