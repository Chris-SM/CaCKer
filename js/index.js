let cackes = 0;
let cackesPorClick = 1;
let cackesPorSegundo = 0;

let upgrades = [];  // Variável global para armazenar o array

// Função para carregar o JSON e atualizar a variável global
function carregarJson() {
  fetch('../js/upgrades.json')
    .then(response => response.json())
    .then(json => {
      // Verifica se o JSON é um array, senão converte
      upgrades = Array.isArray(json) ? json : Object.values(json);
      console.log('Dados carregados:', upgrades);
    })
    .catch(error => {
      console.error('Erro ao carregar o arquivo JSON:', error);
    });
}

// Chama a função para carregar os dados
carregarJson();

function atualizarContador() {
  document.querySelector('.contador').textContent = `${cackes} CaCKes`;
  document.querySelector('.por-segundo').textContent = `por segundo: ${cackesPorSegundo}`;
}

function clicarBolo() {
  cackes += cackesPorClick;
  atualizarContador();
  atualizarLoja();
  mostrarAnimacaoClick(`+${cackesPorClick}`);
}

function mostrarAnimacaoClick(texto) {
  const span = document.createElement('span');
  span.textContent = texto;
  span.classList.add('click-animation');
  const bolo = document.getElementById('boloClick');
  bolo.parentElement.appendChild(span);

  span.style.left = bolo.offsetLeft + 100 + "px";
  span.style.top = bolo.offsetTop + 50 + "px";

  setTimeout(() => {
    span.remove();
  }, 800);
}

function comprarUpgrade(index) {
  const upgrade = upgrades[index];
  if (cackes >= upgrade.custo && !upgrade.comprado) {
    cackes -= upgrade.custo;
    if (upgrade.tipo === "click") {
      cackesPorClick += upgrade.valor;
    } else if (upgrade.tipo === "segundo") {
      cackesPorSegundo += upgrade.valor;
    }

    upgrade.comprado = true;
    atualizarContador();
    atualizarLoja();
  }
}

function atualizarLoja() {
  const container = document.getElementById('upgrade-container');
  container.innerHTML = '';

  upgrades.forEach((upgrade, index) => {
    if (upgrade.comprado) return;

    const card = document.createElement('div');
    card.classList.add('upgrade-card');

    const titulo = document.createElement('h3');
    titulo.textContent = upgrade.nome;

    const desc = document.createElement('p');
    desc.textContent = upgrade.descricao;

    const bonus = document.createElement('p');
    bonus.textContent = `Bônus: ${upgrade.Bonus_Prod}`;

    const botao = document.createElement('button');
    botao.textContent = `Comprar (${upgrade.custo} CaCKes)`;
    botao.classList.add('btn-comprar');

    const podeComprar = cackes >= upgrade.custo;
    botao.disabled = !podeComprar;

    if (!podeComprar) {
      botao.classList.add('desativado');
    } else {
      botao.classList.remove('desativado');
    }

    botao.addEventListener('click', () => comprarUpgrade(index));

    card.appendChild(titulo);
    card.appendChild(desc);
    card.appendChild(bonus);
    card.appendChild(botao);

    container.appendChild(card);
  });
}

setInterval(() => {
  cackes += cackesPorSegundo;
  atualizarContador();
  atualizarLoja();
}, 1000);

document.getElementById('boloClick').addEventListener('click', clicarBolo);

atualizarContador();
atualizarLoja();
