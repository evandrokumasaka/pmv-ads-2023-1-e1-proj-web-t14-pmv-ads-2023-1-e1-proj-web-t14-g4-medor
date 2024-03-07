document.addEventListener("DOMContentLoaded", function () {
  // Inicializar a base de dados
  var db = new Dexie("MedOrganizer");

  // Definir o esquema das tabelas
  db.version(3).stores({
    medicamentos:
      "++id, nome, fabricante, principioAtivo, formaFarmaceutica, efeitosColaterais",
    farmacias: "++id, nome, contato, telefone, chavePix",
    medicos: "++id, nome, especialidade, telefone, endereço, valor",
  });

  function Medicamento(
    nome,
    fabricante,
    principioAtivo,
    formaFarmaceutica,
    efeitosColaterais
  ) {
    this.nome = nome;
    this.fabricante = fabricante;
    this.principioAtivo = principioAtivo;
    this.formaFarmaceutica = formaFarmaceutica;
    this.efeitosColaterais = efeitosColaterais;
  }

  function Farmacia(nome, contato, telefone, chavePix) {
    this.nome = nome;
    this.contato = contato;
    this.telefone = telefone;
    this.chavePix = chavePix;
  }

  function Medico(nome, especialidade, telefone, endereço, valor) {
    this.nome = nome;
    this.especialidade = especialidade;
    this.telefone = telefone;
    this.endereço = endereço;
    this.valor = valor;
  }

  // Adicionar um medicamento
  // var medicamento1 = new Medicamento("Novalgina", "Germed", "Dipirona Sódica", "Comprimido", "");
  // db.medicamentos.add(medicamento1);
  // Adicionar uma farmacia
  // var farmacia1 = new Farmacia("Droga Diva", "Vitor", "+55 11 99758-5472", "04952194000136");
  // db.farmacias.add(farmacia1);
  // console.log(farmacia1);
  //Adicionar um medico
  // var medico1 = new Medico("Antônio Marcos", "Cardiologista", "+55 31 9886-7643", "Afonso Pena", "400");
  // db.medicos.add(medico1);

  // Atualizar um registro
  function atualizarMedicamento(
    id,
    novoNome,
    novoFabricante,
    novoPrincipioAtivo,
    novaFormaFarmaceutica,
    novoEfeitosColaterais
  ) {
    db.medicamentos.update(id, {
      nome: novoNome,
      fabricante: novoFabricante,
      principioAtivo: novoPrincipioAtivo,
      formaFarmaceutica: novaFormaFarmaceutica,
      efeitosColaterais: novoEfeitosColaterais,
    });
  }

  function atualizarFarmacia(
    id,
    novoNome,
    novoContato,
    novoTelefone,
    novaChavePix
  ) {
    db.farmacias.update(id, {
      nome: novoNome,
      contato: novoContato,
      telefone: novoTelefone,
      chavePix: novaChavePix,
    });
  }
  function atualizarMedico(
    id,
    novoNome,
    novaEspecialidade,
    novoTelefone,
    novoEndereço,
    novoValor
  ) {
    db.medicos.update(id, {
      nome: novoNome,
      especialidade: novaEspecialidade,
      telefone: novoTelefone,
      endereço: novoEndereço,
      valor: novoValor,
    });
  }

  // Deletar um registro
  function deletarMedicamento(id) {
    db.medicamentos.delete(id);
  }

  function deletarFarmacia(id) {
    db.farmacias.delete(id);
  }

  function deletarMedico(id) {
    db.medicos.delete(id);
  }

  // Funções para a interface do usuário
  function atualizarTabelaMedicamentos() {
    var tabelaMedicamentos = document.getElementById("tabelaMedicamentos");
    if (tabelaMedicamentos) {
      var tbody = tabelaMedicamentos.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";

      db.medicamentos.toArray().then(function (medicamentos) {
        medicamentos.forEach(function (medicamento) {
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

          var btnEditar = document.createElement("button");
          btnEditar.textContent = "Editar";
          btnEditar.classList.add("btn"); // Adiciona a classe 'btn'
          btnEditar.onclick = function () {
            document.getElementById("medicamentoId").value = medicamento.id;
            document.getElementById("medicamentoNome").value = medicamento.nome;
            document.getElementById("medicamentoFabricante").value =
              medicamento.fabricante;
            document.getElementById("medicamentoPrincipioAtivo").value =
              medicamento.principioAtivo;
            document.getElementById("medicamentoFormaFarmaceutica").value =
              medicamento.formaFarmaceutica;
            document.getElementById("medicamentoEfeitosColaterais").value =
              medicamento.efeitosColaterais;
          };

          var btnExcluir = document.createElement("button");
          btnExcluir.textContent = "Excluir";
          btnExcluir.classList.add("btn"); // Adiciona a classe 'btn'
          btnExcluir.onclick = async function () {
            await deletarMedicamento(medicamento.id);
            await atualizarTabelaMedicamentos();
          };

          cellAcoes.appendChild(btnEditar);
          cellAcoes.appendChild(btnExcluir);
        });
      });
    }
  }

  function atualizarTabelaFarmacias() {
    var tabelaFarmacias = document.getElementById("tabelaFarmacias");
    if (tabelaFarmacias) {
      var tbody = tabelaFarmacias.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";

      db.farmacias.toArray().then(function (farmacias) {
        farmacias.forEach(function (farmacia) {
          var row = tbody.insertRow();

          var cellId = row.insertCell(0);
          var cellNome = row.insertCell(1);
          var cellContato = row.insertCell(2);
          var cellTelefone = row.insertCell(3);
          var cellChavePix = row.insertCell(4);
          var cellAcoes = row.insertCell(5);

          cellId.textContent = farmacia.id;
          cellNome.textContent = farmacia.nome;
          cellContato.textContent = farmacia.contato;
          cellTelefone.textContent = farmacia.telefone;
          cellChavePix.textContent = farmacia.chavePix;

          var btnEditar = document.createElement("button");
          btnEditar.textContent = "Editar";
          btnEditar.classList.add("btn"); // Adiciona a classe 'btn'
          btnEditar.onclick = function () {
            document.getElementById("farmaciaId").value = farmacia.id;
            document.getElementById("farmaciaNome").value = farmacia.nome;
            document.getElementById("farmaciaContato").value = farmacia.contato;
            document.getElementById("farmaciaTelefone").value =
              farmacia.telefone;
            document.getElementById("farmaciaChavePix").value =
              farmacia.chavePix;
          };

          var btnExcluir = document.createElement("button");
          btnExcluir.textContent = "Excluir";
          btnExcluir.classList.add("btn"); // Adiciona a classe 'btn'
          btnExcluir.onclick = async function () {
            await deletarFarmacia(farmacia.id);
            await atualizarTabelaFarmacias();
          };

          cellAcoes.appendChild(btnEditar);
          cellAcoes.appendChild(btnExcluir);
        });
      });
    }
  }
  function atualizarTabelaMedicos() {
    var tabelaMedicos = document.getElementById("tabelaMedicos");
    if (tabelaMedicos) {
      var tbody = tabelaMedicos.getElementsByTagName("tbody")[0];
      tbody.innerHTML = "";

      db.medicos.toArray().then(function (medicos) {
        medicos.forEach(function (medico) {
          var row = tbody.insertRow();

          var cellId = row.insertCell(0);
          var cellNome = row.insertCell(1);
          var cellEspecialidade = row.insertCell(2);
          var cellTelefone = row.insertCell(3);
          var cellEndereço = row.insertCell(4);
          var cellValor = row.insertCell(5);
          var cellAcoes = row.insertCell(6);

          cellId.textContent = medico.id;
          cellNome.textContent = medico.nome;
          cellEspecialidade.textContent = medico.especialidade;
          cellTelefone.textContent = medico.telefone;
          cellEndereço.textContent = medico.endereço;
          cellValor.textContent = medico.valor;

          var btnEditar = document.createElement("button");
          btnEditar.textContent = "Editar";
          btnEditar.classList.add("btn"); // Adiciona a classe 'btn'
          btnEditar.onclick = function () {
            document.getElementById("medicoId").value = medico.id;
            document.getElementById("medicoNome").value = medico.nome;
            document.getElementById("medicoEspecialidade").value =
              medico.especialidade;
            document.getElementById("medicoTelefone").value = medico.telefone;
            document.getElementById("medicoEndereço").value = medico.endereço;
            document.getElementById("medicoValor").value = medico.valor;
          };

          var btnExcluir = document.createElement("button");
          btnExcluir.textContent = "Excluir";
          btnExcluir.classList.add("btn"); // Adiciona a classe 'btn'
          btnExcluir.onclick = async function () {
            await deletarMedico(medico.id);
            await atualizarTabelaMedicos();
          };

          cellAcoes.appendChild(btnEditar);
          cellAcoes.appendChild(btnExcluir);
        });
      });
    }
  }

  // Event listeners
  var btnSalvarMedicamento = document.getElementById("btnSalvarMedicamento");
  if (btnSalvarMedicamento) {
    btnSalvarMedicamento.addEventListener("click", function () {
      console.log("clique em salvar medicamento");
      var id =
        parseInt(document.getElementById("medicamentoId").value) || undefined;
      var nome = document.getElementById("medicamentoNome").value;
      var fabricante = document.getElementById("medicamentoFabricante").value;
      var principioAtivo = document.getElementById(
        "medicamentoPrincipioAtivo"
      ).value;
      var formaFarmaceutica = document.getElementById(
        "medicamentoFormaFarmaceutica"
      ).value;
      var efeitosColaterais = document.getElementById(
        "medicamentoEfeitosColaterais"
      ).value;

      if (id) {
        atualizarMedicamento(
          id,
          nome,
          fabricante,
          principioAtivo,
          formaFarmaceutica,
          efeitosColaterais
        );
      } else {
        var medicamento = new Medicamento(
          nome,
          fabricante,
          principioAtivo,
          formaFarmaceutica,
          efeitosColaterais
        );
        db.medicamentos.add(medicamento);
      }

      atualizarTabelaMedicamentos();
    });
  }

  console.log("Antes de adicionar o listener");
  var btnSalvarFarmacia = document.getElementById("btnSalvarFarmacia");
  if (btnSalvarFarmacia) {
    btnSalvarFarmacia.addEventListener("click", function () {
      console.log("clique em salvar farmacia");
      var id =
        parseInt(document.getElementById("farmaciaId").value) || undefined;
      var nome = document.getElementById("farmaciaNome").value;
      var contato = document.getElementById("farmaciaContato").value;
      var telefone = document.getElementById("farmaciaTelefone").value;
      var chavePix = document.getElementById("farmaciaChavePix").value;

      if (id) {
        atualizarFarmacia(id, nome, contato, telefone, chavePix);
      } else {
        var farmacia = new Farmacia(nome, contato, telefone, chavePix);
        db.farmacias.add(farmacia);
      }

      atualizarTabelaFarmacias();
    });
  }

  console.log("Antes de adicionar o listener");
  var btnSalvarMedico = document.getElementById("btnSalvarMedico");
  if (btnSalvarMedico) {
    btnSalvarMedico.addEventListener("click", function () {
      console.log("clique em salvar medico");
      var id = parseInt(document.getElementById("medicoId").value) || undefined;
      var nome = document.getElementById("medicoNome").value;
      var especialidade = document.getElementById("medicoEspecialidade").value;
      var telefone = document.getElementById("medicoTelefone").value;
      var endereço = document.getElementById("medicoEndereço").value;
      var valor = document.getElementById("medicoValor").value;

      if (id) {
        atualizarMedico(id, nome, especialidade, telefone, endereço, valor);
      } else {
        var medico = new Medico(nome, especialidade, telefone, endereço, valor);
        db.medicos.add(medico);
      }

      atualizarTabelaMedicos();
    });
  }
  // Atualizar tabelas ao carregar a página
  atualizarTabelaMedicamentos();
  atualizarTabelaFarmacias();
  atualizarTabelaMedicos();
});
