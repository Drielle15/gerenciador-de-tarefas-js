// ARRAY DE ARMAZENAMENTO DAS TAREFAS
let tarefas = [];

// SELEÇÃO DOS ELEMENTOS DO DOM
const taskForm = document.getElementById('taskForm');
const listAberto = document.getElementById('list-aberto');
const listAndamento = document.getElementById('list-andamento');
const listFinalizada = document.getElementById('list-finalizada');

// EVENTO AO ENVIAR O FORMULÁRIO
taskForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const novaTarefa = {
    id: Date.now(),
    titulo: document.getElementById('titulo').value,
    responsavel: document.getElementById('responsavel').value,
    prioridade: document.getElementById('prioridade').value,
    data: document.getElementById('data').value,
    descricao: document.getElementById('descricao').value,
    status: 'aberto' // Toda tarefa nova inicia como 'aberto'
  };

  tarefas.push(novaTarefa);
  taskForm.reset();
  renderizarTarefas();
});

// MUDAR STATUS DA TAREFA (ABERTO, ANDAMENTO, FINALIZADA)
function moverTarefa(id, novoStatus) {
  tarefas = tarefas.map(task => {
    if (task.id === id) {
      return { ...task, status: novoStatus };
    }
    return task;
  });
  renderizarTarefas();
}

// EXCLUIR TAREFA
function excluirTarefa(id) {
  tarefas = tarefas.filter(task => task.id !== id);
  renderizarTarefas();
}

// ATUALIZA A TELA E OS CONTADORES
function renderizarTarefas() {
  // Limpa as listas na tela
  listAberto.innerHTML = '';
  listAndamento.innerHTML = '';
  listFinalizada.innerHTML = '';

  // Zera os contadores
  let countBaixa = 0;
  let countMedia = 0;
  let countAlta = 0;

  tarefas.forEach(task => {
    // Incrementa contador pela prioridade
    if (task.prioridade === 'Baixa') countBaixa++;
    if (task.prioridade === 'Média') countMedia++;
    if (task.prioridade === 'Alta') countAlta++;

    // Formatando data para exibição no padrão brasileiro (DD/MM/AAAA)
    const dataFormatada = task.data.split('-').reverse().join('/');

    // Define a classe da borda lateral baseada na prioridade
    const prioridadeClasse = `prioridade-${task.prioridade.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;

    // Cria o elemento visual do Card
    const card = document.createElement('div');
    card.className = `task-card ${prioridadeClasse}`;

    // Estrutura exigida no enunciado:
    // Tag h3 -> Título
    // Tag h2 -> Responsável, Data e Prioridade
    // Tag p -> Descrição
    card.innerHTML = `
      <h3>${task.titulo}</h3>
      <h2><strong>Responsável:</strong> ${task.responsavel}</h2>
      <h2><strong>Data:</strong> ${dataFormatada}</h2>
      <h2><strong>Prioridade:</strong> ${task.prioridade}</h2>
      <p>${task.descricao}</p>
      <div class="task-actions" id="actions-${task.id}"></div>
    `;

    const actionsDiv = card.querySelector(`#actions-${task.id}`);

    // Ações dinâmicas dos links conforme o status atual
    if (task.status === 'aberto') {
      actionsDiv.innerHTML = `
        <a onclick="moverTarefa(${task.id}, 'andamento')">Em Andamento</a>
        <a onclick="moverTarefa(${task.id}, 'finalizada')">Finalizar</a>
        <a onclick="excluirTarefa(${task.id})" style="color: #f44336; margin-left: auto;">Excluir</a>
      `;
      listAberto.appendChild(card);
    } else if (task.status === 'andamento') {
      actionsDiv.innerHTML = `
        <a onclick="moverTarefa(${task.id}, 'aberto')">Reabrir</a>
        <a onclick="moverTarefa(${task.id}, 'finalizada')">Finalizar</a>
        <a onclick="excluirTarefa(${task.id})" style="color: #f44336; margin-left: auto;">Excluir</a>
      `;
      listAndamento.appendChild(card);
    } else if (task.status === 'finalizada') {
      actionsDiv.innerHTML = `
        <a onclick="moverTarefa(${task.id}, 'aberto')">Reabrir</a>
        <a onclick="moverTarefa(${task.id}, 'andamento')">Em Andamento</a>
        <a onclick="excluirTarefa(${task.id})" style="color: #f44336; margin-left: auto;">Excluir</a>
      `;
      listFinalizada.appendChild(card);
    }
  });

  // Atualiza os contadores de prioridade na tela
  document.getElementById('count-baixa').textContent = countBaixa;
  document.getElementById('count-media').textContent = countMedia;
  document.getElementById('count-alta').textContent = countAlta;
}