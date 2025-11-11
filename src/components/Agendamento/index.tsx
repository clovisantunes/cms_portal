import React, { useState } from 'react';
import styles from './styles.module.scss';

interface Paciente {
  id: string;
  nome: string;
}

interface Medico {
  id: string;
  nome: string;
  endereco: string;
  proximoHorario: string;
  data: string;
  horarios: string[];
}

const Agendamento: React.FC = () => {
  const [etapa, setEtapa] = useState<'selecao' | 'resultados'>('selecao');
  const [pacienteSelecionado, setPacienteSelecionado] = useState<string>('');
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState<string>('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>('');

  const pacientes: Paciente[] = [
    { id: '1', nome: 'João Silva' },
    { id: '2', nome: 'Maria Santos' },
    { id: '3', nome: 'Pedro Oliveira' },
  ];

  const tiposProcedimento = [
    'Fonoaudiólogo',
    'Nutricionista',
    'Cardiologista',
    'Cirurgia vascular',
    'Endocrinologista',
    'Ginecologista',
    'Neurologista',
    'Oftalmologista',
    'Traumatologista',
    'Otorrinolaringologista',
    'Médico na Empresa',
    'Cirurgiao geral',
    'Cirurgiao plastico',
    'Medico do trabalho',
    'Pediatra',
    'Pneumologista',
    'Psiquiatra',
    'Urologista',
    'Dermatologista',
    'Reumatologista',
    'Pericia Medica',
    'Clínico geral',
    'Clínica Geral Integrativa',
    'Consulta em consultório (no horário normal ou preestabelecido)'
  ];

  const cidades = ['Sapiranga'];

  const medicos: Medico[] = [
    {
      id: '1',
      nome: 'NATACHA ROCHA GUTERRES',
      endereco: 'Av: João Correa N°:683, CENTRO - Sapiranga',
      proximoHorario: '18:15',
      data: '10/11/2025',
      horarios: ['18:15', '18:45', '19:15', '19:45']
    },
    {
      id: '2',
      nome: 'GABRIEL PORTO DE SOUZA',
      endereco: 'Av: João Correa N°:683, CENTRO - Sapiranga',
      proximoHorario: '20:30',
      data: '10/11/2025',
      horarios: ['20:30', '21:00', '21:30']
    },
    {
      id: '3',
      nome: 'JOSY REICHERT MONTEIRO',
      endereco: 'Av: João Correa N°:683, CENTRO - Sapiranga',
      proximoHorario: '07:45',
      data: '11/11/2025',
      horarios: ['07:45', '08:15', '08:45', '09:15', '09:45']
    },
    {
      id: '4',
      nome: 'MAURO CESAR SILVEIRA LIMA',
      endereco: 'Av: João Correa N°:683, CENTRO - Sapiranga',
      proximoHorario: '12:00',
      data: '11/11/2025',
      horarios: ['12:00', '12:30', '13:00', '13:30', '14:00']
    }
  ];

  const handlePesquisar = () => {
    if (pacienteSelecionado && procedimentoSelecionado && cidadeSelecionada) {
      setEtapa('resultados');
    }
  };

  const handleVoltarPesquisa = () => {
    setEtapa('selecao');
    setPacienteSelecionado('');
    setProcedimentoSelecionado('');
    setCidadeSelecionada('');
  };

  const handleAgendar = (medico: Medico, horario: string) => {
    alert(`Agendamento confirmado com ${medico.nome} para ${medico.data} às ${horario}`);
  };

  const [horariosExpandidos, setHorariosExpandidos] = useState<Set<string>>(new Set());

  const toggleHorarios = (medicoId: string) => {
    const novosExpandidos = new Set(horariosExpandidos);
    if (novosExpandidos.has(medicoId)) {
      novosExpandidos.delete(medicoId);
    } else {
      novosExpandidos.add(medicoId);
    }
    setHorariosExpandidos(novosExpandidos);
  };

  const podePesquisar = pacienteSelecionado && procedimentoSelecionado && cidadeSelecionada;

  return (
    <div className={styles.page}>
      <h1>Agendamento Online</h1>
      <p>Selecione a especialidade, data e horário para seu agendamento</p>

      {etapa === 'selecao' ? (
        <div className={styles.formularioAgendamento}>
          <div className={styles.campoGrupo}>
            <label htmlFor="paciente">Selecionar Paciente</label>
            <select
              id="paciente"
              value={pacienteSelecionado}
              onChange={(e) => setPacienteSelecionado(e.target.value)}
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

          <div className={styles.campoGrupo}>
            <label htmlFor="tipoAtendimento">Tipo de Atendimento</label>
            <select className={styles.select} disabled>
              <option>Consulta</option>
            </select>
            <small className={styles.textoAjuda}>Somente consultas disponíveis</small>
          </div>

          <div className={styles.campoGrupo}>
            <label htmlFor="procedimento">Procedimento</label>
            <select
              id="procedimento"
              value={procedimentoSelecionado}
              onChange={(e) => setProcedimentoSelecionado(e.target.value)}
              className={styles.select}
            >
              <option value="">Selecione um procedimento</option>
              {tiposProcedimento.map((procedimento, index) => (
                <option key={index} value={procedimento}>
                  {procedimento}
                </option>
              ))}
            </select>
          </div>

          {procedimentoSelecionado && (
            <div className={styles.campoGrupo}>
              <label htmlFor="cidade">Cidade</label>
              <select
                id="cidade"
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                className={styles.select}
              >
                <option value="">Selecione uma cidade</option>
                {cidades.map((cidade, index) => (
                  <option key={index} value={cidade}>
                    {cidade}
                  </option>
                ))}
              </select>
            </div>
          )}

          {cidadeSelecionada && (
            <div className={styles.campoGrupo}>
              <button
                onClick={handlePesquisar}
                disabled={!podePesquisar}
                className={`${styles.botao} ${styles.botaoPrimario} ${!podePesquisar ? styles.botaoDesabilitado : ''}`}
              >
                Pesquisar Horários
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.resultadosAgendamento}>
          <div className={styles.cabecalhoResultados}>
            <button
              onClick={handleVoltarPesquisa}
              className={styles.botaoVoltar}
            >
              ← Voltar para Nova Pesquisa
            </button>
            
            <div className={styles.infoPesquisa}>
              <h2>Resultados da Pesquisa</h2>
              <p>
                <strong>Data:</strong> 10/11/2025 até 13/11/2025
              </p>
              <p className={styles.textoInfo}>
                Abaixo os horários disponíveis online. Para mais horários contate a rede credenciada ou nosso atendimento telefônico.
              </p>
            </div>
          </div>

          <div className={styles.listaMedicos}>
            {medicos.map((medico) => {
              const horariosVisiveis = horariosExpandidos.has(medico.id) 
                ? medico.horarios 
                : [medico.proximoHorario];

              return (
                <div key={medico.id} className={styles.cardMedico}>
                  <div className={styles.infoMedico}>
                    <h3 className={styles.nomeMedico}>{medico.nome}</h3>
                    <p className={styles.enderecoMedico}>{medico.endereco}</p>
                    <p className={styles.proximoHorario}>
                      Próximo horário: {medico.data} - {medico.proximoHorario}
                    </p>
                  </div>

                  <div className={styles.horarios}>
                    <div className={styles.listaHorarios}>
                      {horariosVisiveis.map((horario, index) => (
                        <div key={index} className={styles.itemHorario}>
                          <span className={styles.horario}>{horario}</span>
                          <button
                            onClick={() => handleAgendar(medico, horario)}
                            className={styles.botaoAgendar}
                          >
                            Agendar
                          </button>
                        </div>
                      ))}
                    </div>

                    {medico.horarios.length > 1 && (
                      <button
                        onClick={() => toggleHorarios(medico.id)}
                        className={styles.botaoMaisHorarios}
                      >
                        {horariosExpandidos.has(medico.id) ? 'Menos horários' : 'Mais horários'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Agendamento;