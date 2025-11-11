import React, { useState } from 'react';
import { 
  FaUser, 
  FaChevronDown, 
  FaChevronUp, 
  FaPhone, 
  FaIdCard, 
  FaFileContract, 
  FaBirthdayCake,
  FaCrown,
  FaUsers
} from 'react-icons/fa';
import styles from './styles.module.scss';

interface Dependente {
  id: string;
  nome: string;
  tipo: 'titular' | 'dependente';
  contrato: string;
  dadosCompletos?: {
    beneficiario: string;
    dataNascimento: string;
    telefones: string[];
    matricula: string;
    plano: string;
    numeroContrato: string;
  };
}

const DadosCadastrais: React.FC = () => {
  const [detalhesAbertos, setDetalhesAbertos] = useState<string | null>(null);

  const dependentes: Dependente[] = [
    {
      id: '1',
      nome: 'CLOVIS DAMAZIO ANTUNES SANTANNA',
      tipo: 'titular',
      contrato: '508499',
      dadosCompletos: {
        beneficiario: 'CLOVIS DAMAZIO ANTUNES SANTANNA',
        dataNascimento: '22-04-1999',
        telefones: ['(51) 995930496'],
        matricula: '469504',
        plano: 'COBERTURA COMPLETA COM CADASTRO',
        numeroContrato: '508499'
      }
    },
    {
      id: '2',
      nome: 'MARIA SILVA ANTUNES',
      tipo: 'dependente',
      contrato: '508499',
      dadosCompletos: {
        beneficiario: 'MARIA SILVA ANTUNES',
        dataNascimento: '15-08-1970',
        telefones: ['(51) 999998888'],
        matricula: '469505',
        plano: 'COBERTURA COMPLETA COM CADASTRO',
        numeroContrato: '508499'
      }
    }
  ];

  const toggleDetalhes = (id: string) => {
    setDetalhesAbertos(detalhesAbertos === id ? null : id);
  };

  return (
    <div className={styles.page}>
      <div className={styles.mobileHeader}>
        <h1>Dados Cadastrais</h1>
        <p>Suas informações e dependentes</p>
      </div>

      <div className={styles.listaContainer}>
        <div className={styles.listaDependentes}>
          {dependentes.map((dependente) => (
            <div key={dependente.id} className={styles.dependenteItem}>
              
              <div 
                className={styles.dependenteCard}
                onClick={() => toggleDetalhes(dependente.id)}
              >
                <div className={styles.cardContent}>
                  <div className={styles.avatarSection}>
                    <div className={`${styles.avatar} ${styles[dependente.tipo]}`}>
                      <FaUser />
                    </div>
                    <div className={styles.infoBasica}>
                      <h3 className={styles.nome}>
                        {dependente.nome}
                      </h3>
                      <div className={styles.badgeTipo}>
                        {dependente.tipo === 'titular' ? (
                          <>
                            <FaCrown /> Titular
                          </>
                        ) : (
                          <>
                            <FaUsers /> Dependente
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.contratoSection}>
                    <span className={styles.contrato}>
                      #{dependente.contrato}
                    </span>
                    <div className={styles.actions}>
                      <div className={styles.chevron}>
                        {detalhesAbertos === dependente.id ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {detalhesAbertos === dependente.id && dependente.dadosCompletos && (
                <div className={styles.detalhesAccordion}>
                  <div className={styles.detalhesContent}>
                    
                    <div className={styles.infoSection}>
                      <h4>Informações Pessoais</h4>
                      <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                          <FaUser className={styles.infoIcon} />
                          <div className={styles.infoText}>
                            <label>Beneficiário</label>
                            <span>{dependente.dadosCompletos.beneficiario}</span>
                          </div>
                        </div>
                        
                        <div className={styles.infoItem}>
                          <FaBirthdayCake className={styles.infoIcon} />
                          <div className={styles.infoText}>
                            <label>Data de nascimento</label>
                            <span>{dependente.dadosCompletos.dataNascimento}</span>
                          </div>
                        </div>
                        
                        <div className={styles.infoItem}>
                          <FaPhone className={styles.infoIcon} />
                          <div className={styles.infoText}>
                            <label>Telefone</label>
                            <span>{dependente.dadosCompletos.telefones[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.infoSection}>
                      <h4>Dados do Plano</h4>
                      <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                          <FaIdCard className={styles.infoIcon} />
                          <div className={styles.infoText}>
                            <label>Matrícula</label>
                            <span>{dependente.dadosCompletos.matricula}</span>
                          </div>
                        </div>
                        
                        <div className={styles.infoItem}>
                          <FaFileContract className={styles.infoIcon} />
                          <div className={styles.infoText}>
                            <label>Plano</label>
                            <span className={styles.plano}>{dependente.dadosCompletos.plano}</span>
                          </div>
                        </div>
                        
                        <div className={styles.infoItem}>
                          <FaFileContract className={styles.infoIcon} />
                          <div className={styles.infoText}>
                            <label>Contrato</label>
                            <span>#{dependente.dadosCompletos.numeroContrato}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DadosCadastrais;