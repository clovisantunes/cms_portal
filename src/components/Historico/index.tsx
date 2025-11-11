import React, { useState } from 'react';
import styles from './styles.module.scss';

interface Consulta {
  id: string;
  tipo: string;
  ordem: string;
  agendadoPara: string;
  prestador: string;
  realizadoEm: string;
  endereco: string;
  procedimentos: string[];
}

interface Paciente {
  id: string;
  nome: string;
}

interface ValorFatura {
  id: string;
  paciente: string;
  agendamento: string;
  procedimento: string;
  dataRealizacao: string;
  vencimento: string;
  parcela: string;
  valor: number;
}

const Historico: React.FC = () => {
  const [pacienteSelecionado, setPacienteSelecionado] = useState<string>('');
  const [mostrarCancelados, setMostrarCancelados] = useState<boolean>(false);
  const [periodo, setPeriodo] = useState<string>('');
  const [consultasExpandidas, setConsultasExpandidas] = useState<Set<string>>(new Set());
  const [modoVisualizacao, setModoVisualizacao] = useState<'consultas' | 'fatura'>('consultas');

  const pacientes: Paciente[] = [
    { id: '1', nome: 'João Silva' },
    { id: '2', nome: 'Maria Santos' },
    { id: '3', nome: 'Pedro Oliveira' },
  ];

  const todasConsultas: Consulta[] = [
    {
      id: '1',
      tipo: 'Consulta - Clínica Geral Integrativa',
      ordem: '434777',
      agendadoPara: '2025-10-03T13:00:00',
      prestador: 'RENAN LAUDELINO LEONEL',
      realizadoEm: '2025-10-03T13:06:00',
      endereco: 'Av: João Correa N°:683, CENTRO - Sapiranga',
      procedimentos: ['7 - Consulta', 'Exame de sangue', 'Aferição de pressão', 'Consulta de retorno', 'Vacinação', 'Outro procedimento']
    },
    {
      id: '2',
      tipo: 'Consulta - Cardiologia',
      ordem: '434778',
      agendadoPara: '2025-10-05T14:00:00',
      prestador: 'DR. CARLOS ALMEIDA',
      realizadoEm: '2025-10-05T14:15:00',
      endereco: 'Rua das Flores N°:123, CENTRO - Sapiranga',
      procedimentos: ['Eletrocardiograma', 'Consulta cardiológica']
    }
  ];

  const valoresFatura: ValorFatura[] = [
    {
      id: '1',
      paciente: 'próprio',
      agendamento: '874585',
      procedimento: '40302318 - Potássio - pesquisa e/ou dosagem',
      dataRealizacao: '04/10/2025',
      vencimento: 'Em aberto',
      parcela: '1 de 2',
      valor: 1.83
    },
    {
      id: '2',
      paciente: 'próprio',
      agendamento: '874585',
      procedimento: '40302318 - Potássio - pesquisa e/ou dosagem',
      dataRealizacao: '04/10/2025',
      vencimento: 'Em aberto',
      parcela: '2 de 2',
      valor: 1.83
    },
    {
      id: '3',
      paciente: 'próprio',
      agendamento: '874584',
      procedimento: '40302237 - Magnésio - pesquisa e/ou dosagem',
      dataRealizacao: '04/10/2025',
      vencimento: 'Em aberto',
      parcela: '1 de 2',
      valor: 2.10
    },
    {
      id: '4',
      paciente: 'próprio',
      agendamento: '874584',
      procedimento: '40302237 - Magnésio - pesquisa e/ou dosagem',
      dataRealizacao: '04/10/2025',
      vencimento: 'Em aberto',
      parcela: '2 de 2',
      valor: 2.10
    },
    {
      id: '5',
      paciente: 'próprio',
      agendamento: '874583',
      procedimento: '40302512 - Transaminase pirúvica (amino transferase de alanina) - pesquisa e/ou dosagem',
      dataRealizacao: '04/10/2025',
      vencimento: 'Em aberto',
      parcela: '1 de 2',
      valor: 1.83
    },
    {
      id: '6',
      paciente: 'próprio',
      agendamento: '874583',
      procedimento: '40302512 - Transaminase pirúvica (amino transferase de alanina) - pesquisa e/ou dosagem',
      dataRealizacao: '04/10/2025',
      vencimento: 'Em aberto',
      parcela: '2 de 2',
      valor: 1.83
    },
    {
      id: '7',
      paciente: 'próprio',
      agendamento: '874582',
      procedimento: '40302504 - Transaminase oxalacética (amino transferase aspartato) - pesquisa e/ou dosagem',
      dataRealizacao: '04/10/2025',
      vencimento: 'Em aberto',
      parcela: '1 de 2',
      valor: 1.83
    },
    {
      id: '8',
      paciente: 'próprio',
      agendamento: '874582',
      procedimento: '40302504 - Transaminase oxalacética (amino transferase aspartato) - pesquisa e/ou dosagem',
      dataRealizacao: '04/10/2025',
      vencimento: 'Em aberto',
      parcela: '2 de 2',
      valor: 1.83
    }
  ];

  const toggleExpandirConsulta = (consultaId: string) => {
    const novasExpandidas = new Set(consultasExpandidas);
    if (novasExpandidas.has(consultaId)) {
      novasExpandidas.delete(consultaId);
    } else {
      novasExpandidas.add(consultaId);
    }
    setConsultasExpandidas(novasExpandidas);
  };

  const formatarData = (dataString: string): string => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const formatarHora = (dataString: string): string => {
    return new Date(dataString).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const consultasFiltradas = todasConsultas.filter(consulta => {
    if (!pacienteSelecionado || !periodo) return false;
    
    const dataConsulta = new Date(consulta.agendadoPara);
    const [anoSelecionado, mesSelecionado] = periodo.split('-');
    
    return (
      dataConsulta.getFullYear() === parseInt(anoSelecionado) &&
      (dataConsulta.getMonth() + 1) === parseInt(mesSelecionado)
    );
  });

  const mostrarConteudo = pacienteSelecionado && periodo;

  const handleValoresFaturaClick = () => {
    if (pacienteSelecionado) {
      setModoVisualizacao('fatura');
    }
  };

  const handleVoltarConsultas = () => {
    setModoVisualizacao('consultas');
  };

  const totalValores = valoresFatura.reduce((sum, valor) => sum + valor.valor, 0);

  return (
    <div className={styles.page}>
      <h1>Histórico Médico</h1>
      <p>Visualize seu histórico de consultas e exames</p>

      <div className={styles.filtros}>
        <div className={styles.filtroGrupo}>
          <label htmlFor="paciente">Paciente:</label>
          <select 
            id="paciente"
            value={pacienteSelecionado}
            onChange={(e) => {
              setPacienteSelecionado(e.target.value);
              setModoVisualizacao('consultas');
            }}
            className={styles.select}
          >
            <option value="">Selecione um paciente</option>
            {pacientes.map(paciente => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filtroGrupo}>
          <label htmlFor="periodo">Período/Mês:</label>
          <input 
            type="month"
            id="periodo"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.filtroGrupo}>
          <button 
            type="button"
            onClick={() => setMostrarCancelados(!mostrarCancelados)}
            className={`${styles.botao} ${mostrarCancelados ? styles.ativo : ''}`}
          >
            {mostrarCancelados ? '✓ ' : ''}Incluir Cancelados
          </button>
        </div>

        <div className={styles.filtroGrupo}>
          <button 
            type="button"
            className={styles.botao}
            onClick={handleValoresFaturaClick}
            disabled={!pacienteSelecionado}
          >
            Valores em Fatura
          </button>
        </div>
      </div>

      {modoVisualizacao === 'fatura' && (
        <div className={styles.botaoVoltarContainer}>
          <button 
            onClick={handleVoltarConsultas}
            className={styles.botaoVoltar}
          >
            ← Voltar para Consultas
          </button>
        </div>
      )}

      {!mostrarConteudo && (
        <div className={styles.mensagemAviso}>
          <p>Selecione um paciente e um período para visualizar o histórico</p>
        </div>
      )}

      {mostrarConteudo && (
        <div className={styles.conteudo}>
          {modoVisualizacao === 'consultas' ? (
            <div className={styles.listaConsultas}>
              {consultasFiltradas.length === 0 ? (
                <div className={styles.mensagemAviso}>
                  <p>Nenhuma consulta encontrada para o paciente e período selecionados</p>
                </div>
              ) : (
                consultasFiltradas.map(consulta => {
                  const isExpandida = consultasExpandidas.has(consulta.id);
                  const procedimentosVisiveis = isExpandida 
                    ? consulta.procedimentos 
                    : consulta.procedimentos.slice(0, 5);

                  return (
                    <div key={consulta.id} className={styles.consultaCard}>
                      <div className={styles.consultaHeader}>
                        <h3>{consulta.tipo}</h3>
                        <span className={styles.ordem}>Ordem: {consulta.ordem}</span>
                      </div>

                      <div className={styles.consultaInfo}>
                        <div className={styles.infoItem}>
                          <strong>Agendado para:</strong> 
                          {formatarData(consulta.agendadoPara)} às {formatarHora(consulta.agendadoPara)}
                        </div>
                        <div className={styles.infoItem}>
                          <strong>Prestador:</strong> {consulta.prestador}
                        </div>
                        <div className={styles.infoItem}>
                          <strong>Realizado em:</strong> 
                          {formatarData(consulta.realizadoEm)} às {formatarHora(consulta.realizadoEm)}
                        </div>
                        <div className={styles.infoItem}>
                          <strong>Endereço:</strong> {consulta.endereco}
                        </div>
                      </div>

                      <div className={styles.procedimentos}>
                        <strong>Procedimentos:</strong>
                        <ul className={styles.listaProcedimentos}>
                          {procedimentosVisiveis.map((procedimento, index) => (
                            <li key={index}>{procedimento}</li>
                          ))}
                        </ul>
                        
                        {consulta.procedimentos.length > 5 && (
                          <button 
                            onClick={() => toggleExpandirConsulta(consulta.id)}
                            className={styles.botaoVerMais}
                          >
                            {isExpandida ? 'Ver menos' : 'Ver mais'}
                          </button>
                        )}
                      </div>

                      <div className={styles.acoes}>
                        <button className={styles.botaoAcao}>
                          Prescrição
                        </button>
                        <button className={styles.botaoAcao}>
                          Solicitação de Exame/Procedimento
                        </button>
                        <button className={styles.botaoAcao}>
                          Avaliar
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className={styles.tabelaFatura}>
              <div className={styles.tabelaHeader}>
                <h2>Valores em Fatura</h2>
                <div className={styles.total}>
                  Total: <span className={styles.totalValor}>{formatarMoeda(totalValores)}</span>
                </div>
              </div>

              <div className={styles.tabelaContainer}>
                <table className={styles.tabela}>
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th>Agendamento</th>
                      <th>Procedimento</th>
                      <th>Data de realização</th>
                      <th>Vencimento</th>
                      <th>Parcela</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {valoresFatura.map((valor) => (
                      <tr key={valor.id}>
                        <td>{valor.paciente}</td>
                        <td>{valor.agendamento}</td>
                        <td className={styles.procedimentoCell}>
                          <span title={valor.procedimento}>
                            {valor.procedimento}
                          </span>
                        </td>
                        <td>{valor.dataRealizacao}</td>
                        <td>
                          <span className={valor.vencimento === 'Em aberto' ? styles.vencimentoAberto : styles.vencimentoPago}>
                            {valor.vencimento}
                          </span>
                        </td>
                        <td>{valor.parcela}</td>
                        <td className={styles.valorCell}>{formatarMoeda(valor.valor)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Historico;