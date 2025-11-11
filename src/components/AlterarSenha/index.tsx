import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

const AlterarSenha: React.FC = () => {
  const [formData, setFormData] = useState({
    senhaAntiga: '',
    novaSenha: '',
    confirmarSenha: ''
  });
  const [mostrarSenhas, setMostrarSenhas] = useState({
    senhaAntiga: false,
    novaSenha: false,
    confirmarSenha: false
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleMostrarSenha = (campo: keyof typeof mostrarSenhas) => {
    setMostrarSenhas(prev => ({
      ...prev,
      [campo]: !prev[campo]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.novaSenha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      setLoading(false);
      return;
    }

    if (formData.novaSenha.length < 6) {
      alert('A nova senha deve ter pelo menos 6 caracteres!');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Senha alterada com sucesso!');
      setFormData({
        senhaAntiga: '',
        novaSenha: '',
        confirmarSenha: ''
      });
    } catch (error) {
      alert('Erro ao alterar senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const senhasCoincidem = formData.novaSenha === formData.confirmarSenha && formData.confirmarSenha !== '';
  const formularioValido = formData.senhaAntiga && formData.novaSenha && formData.confirmarSenha && senhasCoincidem;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
         
          <h1>Alterar Senha</h1>
          <p>Atualize sua senha de acesso</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.campoGrupo}>
            <label htmlFor="senhaAntiga" className={styles.label}>
              Senha Antiga
            </label>
            <div className={styles.inputContainer}>
              <input
                type={mostrarSenhas.senhaAntiga ? "text" : "password"}
                id="senhaAntiga"
                name="senhaAntiga"
                value={formData.senhaAntiga}
                onChange={handleChange}
                className={styles.input}
                placeholder="Digite sua senha atual"
                required
              />
              <button
                type="button"
                onClick={() => toggleMostrarSenha('senhaAntiga')}
                className={styles.botaoMostrarSenha}
              >
                {mostrarSenhas.senhaAntiga ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.campoGrupo}>
            <label htmlFor="novaSenha" className={styles.label}>
              Nova Senha
            </label>
            <div className={styles.inputContainer}>
              <input
                type={mostrarSenhas.novaSenha ? "text" : "password"}
                id="novaSenha"
                name="novaSenha"
                value={formData.novaSenha}
                onChange={handleChange}
                className={styles.input}
                placeholder="Digite a nova senha"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => toggleMostrarSenha('novaSenha')}
                className={styles.botaoMostrarSenha}
              >
                {mostrarSenhas.novaSenha ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            <small className={styles.textoAjuda}>
              Mínimo de 6 caracteres
            </small>
          </div>

          <div className={styles.campoGrupo}>
            <label htmlFor="confirmarSenha" className={styles.label}>
              Confirmar Nova Senha
            </label>
            <div className={styles.inputContainer}>
              <input
                type={mostrarSenhas.confirmarSenha ? "text" : "password"}
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className={`${styles.input} ${!senhasCoincidem && formData.confirmarSenha ? styles.inputErro : ''}`}
                placeholder="Confirme a nova senha"
                required
              />
              <button
                type="button"
                onClick={() => toggleMostrarSenha('confirmarSenha')}
                className={styles.botaoMostrarSenha}
              >
                {mostrarSenhas.confirmarSenha ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {formData.confirmarSenha && (
              <div className={styles.mensagemValidacao}>
                {senhasCoincidem ? (
                  <span className={styles.mensagemSucesso}>
                    <FiCheck size={14} />
                    Senhas coincidem
                  </span>
                ) : (
                  <span className={styles.mensagemErro}>
                    <FiX size={14} />
                    As senhas não coincidem
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!formularioValido || loading}
            className={`${styles.botao} ${styles.botaoPrimario} ${(!formularioValido || loading) ? styles.botaoDesabilitado : ''}`}
          >
            {loading ? (
              <>
                <div className={styles.loadingSpinner}></div>
                Alterando...
              </>
            ) : (
              'Confirmar Alteração'
            )}
          </button>
        </form>

        <div className={styles.dicasSeguranca}>
          <h3>Dicas para uma senha segura:</h3>
          <ul>
            <li>Use pelo menos 6 caracteres</li>
    <li>Combine letras maiúsculas e minúsculas</li>
            <li>Inclua números e caracteres especiais</li>
            <li>Evite senhas óbvias como "123456"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlterarSenha;