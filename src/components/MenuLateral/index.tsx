import React, { useState, useEffect } from 'react';
import { 
  FaHome, 
  FaUser, 
  FaCalendarAlt, 
  FaCalendarCheck, 
  FaIdCard, 
  FaKey, 
  FaSignOutAlt,
  FaTimes,
  FaBars
} from 'react-icons/fa';
import styles from './styles.module.scss';

interface MenuLateralProps {
  onMenuClick?: (menuId: string) => void;
  onLogout?: () => void;
  activeMenu?: string;
}

const MenuLateral: React.FC<MenuLateralProps> = ({ 
  onMenuClick, 
  onLogout,
  activeMenu = 'inicio'
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: <FaHome /> },
    { id: 'dados-cadastrais', label: 'Meus Dados', icon: <FaUser /> },
    { id: 'historico', label: 'Histórico', icon: <FaCalendarAlt /> },
    { id: 'agendamento', label: 'Agendar', icon: <FaCalendarCheck /> },
    { id: 'carteirinha', label: 'Carteirinha', icon: <FaIdCard /> },
    { id: 'alterar-senha', label: 'Segurança', icon: <FaKey /> },
  ];

  const userInfo = {
    name: 'Clovis Antunes',
    email: 'clovis.antunes@email.com',
  };

  const handleMenuClick = (menuId: string) => {
    onMenuClick?.(menuId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    onLogout?.();
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const Overlay = () => (
    <div 
      className={styles.overlay}
      onClick={() => setSidebarOpen(false)}
    />
  );

  return (
    <>
      {isMobile && (
        <header className={styles.mobileHeader}>
          <button 
            className={styles.hamburgerButton}
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
          <h1 className={styles.mobileTitle}>Portal Médico</h1>
          <div className={styles.headerSpacer}></div>
        </header>
      )}
      {isMobile && sidebarOpen && <Overlay />}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''} ${isMobile ? styles.mobile : ''}`}>
        <div className={styles.sidebarContent}>
          <div className={styles.menuHeader}>
            <div className={styles.userInfoCompact}>
              <div className={styles.userAvatar}>
                <FaUser />
              </div>
              <div className={styles.userDetails}>
                <p className={styles.userName}>{userInfo.name}</p>
                <p className={styles.userEmail}>{userInfo.email}</p>
              </div>
            </div>
            {isMobile && (
              <button 
                className={styles.closeButton}
                onClick={() => setSidebarOpen(false)}
              >
                <FaTimes />
              </button>
            )}
          </div>
          <nav className={styles.nav}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`${styles.menuItem} ${
                  activeMenu === item.id ? styles.active : ''
                }`}
                onClick={() => handleMenuClick(item.id)}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuLabel}>{item.label}</span>
                {activeMenu === item.id && <div className={styles.activeIndicator} />}
              </button>
            ))}
          </nav>
          <div className={styles.menuFooter}>
            <button 
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              <span>Sair do App</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuLateral;