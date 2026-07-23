let tarefas = [];
const form = document.getElementById('taskForm');

form.onsubmit = function(event) {
  event.preventDefault();

  const novaTarefa = {
    id: Date.now(),
    titulo: document.getElementById('titulo').value,
    responsavel: document.getElementById('responsavel').value,
    prioridade: document.getElementById('prioridade').value,
    data: document.getElementById('data').value,
    descricao: document.getElementById('descricao').value,
    status: 'aberto'
  };

  tarefas.push(novaTarefa);
  form.reset();
  mostrarTarefas();
};

function moverTarefa(id, novoStatus) {
  tarefas = tarefas.map(t => t.id === id ? {...t, status: novoStatus} : t);
  mostrarTarefas();
}

function mostrarTarefas() {
  const listAberto = document.getElementById('list-aberto');
  const listAndamento = document.getElementById('list-andamento');
  const listFinalizada = document.getElementById('list-finalizada');
  listAberto.innerHTML = '';
  listAndamento.innerHTML = '';
  listFinalizada.innerHTML = '';

  let contBaixa = 0, contMedia = 0, contAlta = 0;

  tarefas.forEach(t => {
    if (t.prioridade === 'Baixa') contBaixa++;
    if (t.prioridade === 'Média') contMedia++;
    if (t.prioridade === 'Alta') contAlta++;

    const card = document.createElement('div');
    card.className = 'task-card ' +
      (t.prioridade === 'Baixa' ? 'prioridade-baixa' :
       t.prioridade === 'Média' ? 'prioridade-media' : 'prioridade-alta');

    let links = '';
    if (t.status === 'aberto') {
      links = `<a onclick="moverTarefa(${t.id}, 'andamento')">Em Andamento</a>
               <a onclick="moverTarefa(${t.id}, 'finalizada')">Finalizar</a>`;
    } else if (t.status === 'andamento') {
      links = `<a onclick="moverTarefa(${t.id}, 'aberto')">Reabrir</a>
               <a onclick="moverTarefa(${t.id}, 'finalizada')">Finalizar</a>`;
    } else {
      links = `<a onclick="moverTarefa(${t.id}, 'aberto')">Reabrir</a>
               <a onclick="moverTarefa(${t.id}, 'andamento')">Em Andamento</a>`;
    }

    card.innerHTML = `
      <h3>${t.titulo}</h3>
      <h2>Responsável: ${t.responsavel}</h2>
      <h2>Data: ${t.data}</h2>
      <h2>Prioridade: ${t.prioridade}</h2>
      <p>${t.descricao}</p>
      <div class="task-actions">${links}</div>
    `;

    if (t.status === 'aberto') listAberto.appendChild(card);
    else if (t.status === 'andamento') listAndamento.appendChild(card);
    else listFinalizada.appendChild(card);
  });

  document.getElementById('count-baixa').textContent = contBaixa;
  document.getElementById('count-media').textContent = contMedia;
  document.getElementById('count-alta').textContent = contAlta;
}
