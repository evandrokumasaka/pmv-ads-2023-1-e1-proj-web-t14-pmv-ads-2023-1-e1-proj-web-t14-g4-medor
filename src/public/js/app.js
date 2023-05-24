// Inicializar a base de dados
var db = new Dexie("MedOrganizer");

// Definir o esquema das tabelas
db.version(1).stores({
  medicamentos: "++id, nome, fabricante, principioAtivo, formaFarmaceutica, efeitosColaterais",
  Farmacias: "++id, nome, contato, telefone, chavePix"
});

function Medicamento(nome, fabricante, principioAtivo, formaFarmaceutica, efeitosColaterais) {
  this.nome = nome;
  this.fabricante = fabricante;
  this.principioAtivo = principioAtivo;
  this.formaFarmaceutica = formaFarmaceutica
  this.efeitosColaterais = efeitosColaterais
}

function Farmacias(nome, contato, telefone, chavePix) {
  this.nome = nome;
  this.contato = contato;
  this.telefone = telefone;
  this.chavePix = chavePix
}

// Adicionar um medicamento
// var medicamento1 = new Medicamento("Novalgina", "Germed", "Dipirona Sódica", "Comprimido", "");
// db.medicamentos.add(medicamento1);

// Atualizar um registro
function atualizarMedicamento(id, novoNome, novoFabricante, novoPrincipioAtivo, novaFormaFarmaceutica, novoEfeitosColaterais) {
  db.medicamentos.update(id, { nome: novoNome, fabricante: novoFabricante, principioAtivo: novoPrincipioAtivo, formaFarmaceutica: novaFormaFarmaceutica, efeitosColaterais: novoEfeitosColaterais });
}

function atualizarFarmacia(id, novoNome, novoContato, novoTelefone, novaChavePix) {
  db.medicamentos.update(id, { nome: novoNome, contato: novoContato, telefone: novoTelefone, chavePix: novaChavePix });
}
// Deletar um registro
function deletarMedicamento(id) {
  db.medicamentos.delete(id);
}

// Funções para a interface do usuário
function atualizarTabelaMedicamentos() {
  var tbody = document.getElementById('tabelaMedicamentos').getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';

  db.medicamentos.toArray().then(function(medicamentos) {
    medicamentos.forEach(function(medicamento) {
      var row = tbody.insertRow();

      var cellId = row.insertCell(0);
      var cellNome = row.insertCell(1);
      var cellFabricante = row.insertCell(2);
      var cellPrincipioAtivo = row.insertCell(3);
      var cellFormaFarmaceutica = row.insertCell(4);
      var cellEfeitosColaterais = row.insertCell(5);
      var cellAcoes = row.insertCell(6);

      cellId.textContent = medicamento.id;
      cellNome.textContent = medicamento.nome;
      cellFabricante.textContent = medicamento.fabricante;
      cellPrincipioAtivo.textContent = medicamento.principioAtivo;
      cellFormaFarmaceutica.textContent = medicamento.formaFarmaceutica;
      cellEfeitosColaterais.textContent = medicamento.efeitosColaterais;

      var btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.classList.add('btn'); // Adiciona a classe 'btn'
      btnEditar.onclick = function () {
          document.getElementById('medicamentoId').value = medicamento.id;
          document.getElementById('medicamentoNome').value = medicamento.nome;
          document.getElementById('medicamentoFabricante').value = medicamento.fabricante;
          document.getElementById('medicamentoPrincipioAtivo').value = medicamento.principioAtivo;
          document.getElementById('medicamentoFormaFarmaceutica').value = medicamento.formaFarmaceutica;
          document.getElementById('medicamentoEfeitosColaterais').value = medicamento.efeitosColaterais;
      };

      var btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.classList.add('btn'); // Adiciona a classe 'btn'
      btnExcluir.onclick = async function () {
          await deletarMedicamento(medicamento.id);
          await atualizarTabelaMedicamentos();
      };
      
      cellAcoes.appendChild(btnEditar);
      cellAcoes.appendChild(btnExcluir);
      
    });
  });
}

// Event listeners
document.getElementById('btnSalvarMedicamento').addEventListener('click', function() {
  var id = parseInt(document.getElementById('medicamentoId').value) || undefined;
  var nome = document.getElementById('medicamentoNome').value;
  var fabricante = document.getElementById('medicamentoFabricante').value;
  var principioAtivo = document.getElementById('medicamentoPrincipioAtivo').value;
  var formaFarmaceutica = document.getElementById('medicamentoFormaFarmaceutica').value;
  var efeitosColaterais = document.getElementById('medicamentoEfeitosColaterais').value;

  if (id) {
    atualizarMedicamento(id, nome, fabricante, principioAtivo, formaFarmaceutica, efeitosColaterais);
  } else {
    var medicamento = new Medicamento(nome, fabricante, principioAtivo, formaFarmaceutica, efeitosColaterais);
    db.medicamentos.add(medicamento);
  }

  atualizarTabelaMedicamentos();
});

// document.getElementById('btnDeletarMedicamento').addEventListener('click', function() {
//   var id = parseInt(document.getElementById('medicamentoId').value);
//   if (id) {
//     deletarMedicamento(id);
//     atualizarTabelaMedicamentos();
//   }
// });

// Atualizar tabelas ao carregar a página
atualizarTabelaMedicamentos();