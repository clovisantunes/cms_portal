import React, { useState } from 'react';
import MenuLateral from '../../components/MenuLateral';
import Home from '../../components/Home';
import Agendamento from '../../components/Agendamento';
import DadosCadastrais from '../../components/DadosCadastrais';
import Historico from '../../components/Historico';
import Carteirinha from '../../components/Carterinha';
import AlterarSenha from '../../components/AlterarSenha';
import styles from './styles.module.scss';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('inicio');

  const handleMenuClick = (menuId: string) => {
    console.log('Menu clicado:', menuId);
    setCurrentPage(menuId);
  };

  const handleNavigate = (page: string) => {
    console.log('Navegando para:', page);
    setCurrentPage(page);
  };

  const handleLogout = () => {
    console.log('Usuário fez logout');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'inicio':
        return <Home onNavigate={handleNavigate} />;
      case 'dados-cadastrais':
        return <DadosCadastrais />;
      case 'historico':
        return <Historico />;
      case 'agendamento':
        return <Agendamento />;
      case 'carteirinha':
        return <Carteirinha />;
      case 'alterar-senha':
        return <AlterarSenha />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={styles.app}>
      <MenuLateral 
        onMenuClick={handleMenuClick}
        onLogout={handleLogout}
        activeMenu={currentPage} 
      />
      
      <main className={styles.mainContent}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;