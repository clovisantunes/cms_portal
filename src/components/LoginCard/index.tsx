import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaIdCard, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import logo from '../../assets/logo-CMS-site.png'

interface FormData {
  login: string;
  senha: string;
  email: string;
}

type LoginType = 'cpf' | 'email' | 'usuario';
type ActiveForm = 'login' | 'recover' | 'register';

const TEST_EMAILS = {
  admin: 'admin@teste.com',
  usuario: 'usuario@teste.com',
  gestor: 'gestor@teste.com'
};

const TEST_PASSWORDS = {
  admin: '123',
  usuario: 'user123',
  gestor: 'gestor123'
};

const LoginCard: React.FC = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState<ActiveForm>('login');
  const [formData, setFormData] = useState<FormData>({
    login: '',
    senha: '',
    email: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [detectedType, setDetectedType] = useState<LoginType | null>(null);
  const [loginError, setLoginError] = useState('');

  const detectLoginType = (value: string): LoginType => {
    const cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.length === 11 && /^\d{11}$/.test(cleanValue)) {
      return 'cpf';
    }
    
    if (value.includes('@') && value.includes('.')) {
      return 'email';
    }
    
    return 'usuario';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'login') {
      const type = detectLoginType(value);
      setDetectedType(type);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (loginError) {
      setLoginError('');
    }
  };

  const getLoginPlaceholder = (): string => {
    if (!formData.login) {
      return 'Digite CPF, e-mail ou usuário';
    }
    
    switch (detectedType) {
      case 'cpf': return 'CPF';
      case 'email': return 'E-mail';
      case 'usuario': return 'Usuário';
      default: return 'CPF, e-mail ou usuário';
    }
  };

  const getLoginIcon = () => {
    switch (detectedType) {
      case 'cpf': return <FaIdCard className={styles.inputIcon} />;
      case 'email': return <FaEnvelope className={styles.inputIcon} />;
      case 'usuario': return <FaUser className={styles.inputIcon} />;
      default: return <FaUser className={styles.inputIcon} />;
    }
  };

  const validateLogin = (login: string, senha: string): boolean => {
    const email = login.toLowerCase();
    
    if (email === TEST_EMAILS.admin && senha === TEST_PASSWORDS.admin) {
      return true;
    }
    if (email === TEST_EMAILS.usuario && senha === TEST_PASSWORDS.usuario) {
      return true;
    }
    if (email === TEST_EMAILS.gestor && senha === TEST_PASSWORDS.gestor) {
      return true;
    }
    
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');

    if (validateLogin(formData.login, formData.senha)) {
      localStorage.setItem('userEmail', formData.login);
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/portal');
    } else {
      setLoginError('E-mail ou senha incorretos. Use um dos emails de teste.');
    }
  };

  const handleRecoverSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Emails de teste disponíveis:\n\nAdmin: ${TEST_EMAILS.admin}\nUsuário: ${TEST_EMAILS.usuario}\nGestor: ${TEST_EMAILS.gestor}`);
    setActiveForm('login');
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Para teste, use um dos emails pré-cadastrados:\n\n${TEST_EMAILS.admin}\n${TEST_EMAILS.usuario}\n${TEST_EMAILS.gestor}`);
    setActiveForm('login');
  };

  const handleRecoverPassword = () => {
    setActiveForm('recover');
  };

  const handleRegister = () => {
    setActiveForm('register');
  };

  const handleBackToLogin = () => {
    setActiveForm('login');
    setLoginError('');
  };


return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <div className={styles.header}>
          <img src={logo} alt='Logo CMS' className={styles.logo}/>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className={`${styles.form} ${styles.loginForm} ${
            activeForm === 'login' ? styles.active : styles.inactive
          }`}
        >
          <div className={styles.formContent}>
            <div className={styles.inputGroup}>
              <label htmlFor="login" className={styles.inputLabel}>
                {getLoginPlaceholder()}
              </label>
              <div className={styles.inputWrapper}>
                {getLoginIcon()}
                <input
                  type="text"
                  id="login"
                  name="login"
                  value={formData.login}
                  onChange={handleInputChange}
                  placeholder="CPF, e-mail ou usuário"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="senha" className={styles.inputLabel}>
                Senha
              </label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  placeholder="Digite sua senha"
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className={styles.errorMessage}>
                {loginError}
              </div>
            )}

            <button type="submit" className={styles.loginButton}>
              Entrar no Sistema
            </button>

            <div className={styles.formFooter}>
              <button
                type="button"
                className={styles.recoverButton}
                onClick={handleRecoverPassword}
              >
                Esqueci minha senha
              </button>
              
              <div className={styles.registerSection}>
                <p>Primeira vez aqui?</p>
                <button
                  type="button"
                  className={styles.registerButton}
                  onClick={handleRegister}
                >
                  Criar Conta
                </button>
              </div>
            </div>
          </div>
        </form>

        <form 
          onSubmit={handleRecoverSubmit}
          className={`${styles.form} ${styles.recoverForm} ${
            activeForm === 'recover' ? styles.active : styles.inactive
          }`}
        >
          <div className={styles.formContent}>
            <button 
              type="button" 
              className={styles.backButton}
              onClick={handleBackToLogin}
            >
              <FaArrowLeft />
              Voltar para login
            </button>

            <div className={styles.formHeader}>
              <h3>Recuperar Senha</h3>
              <p>Digite seu e-mail para receber as instruções</p>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="recoverEmail" className={styles.inputLabel}>
                E-mail
              </label>
              <div className={styles.inputWrapper}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  id="recoverEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <button type="submit" className={styles.loginButton}>
              Enviar Instruções
            </button>
          </div>
        </form>

        <form 
          onSubmit={handleRegisterSubmit}
          className={`${styles.form} ${styles.registerForm} ${
            activeForm === 'register' ? styles.active : styles.inactive
          }`}
        >
          <div className={styles.formContent}>
            <button 
              type="button" 
              className={styles.backButton}
              onClick={handleBackToLogin}
            >
              <FaArrowLeft />
              Voltar para login
            </button>

            <div className={styles.formHeader}>
              <h3>Criar Conta</h3>
              <p>Preencha os dados para se cadastrar</p>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="registerEmail" className={styles.inputLabel}>
                E-mail
              </label>
              <div className={styles.inputWrapper}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  id="registerEmail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="registerPassword" className={styles.inputLabel}>
                Senha
              </label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="registerPassword"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  placeholder="Crie uma senha segura"
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.loginButton}>
              Criar Minha Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
