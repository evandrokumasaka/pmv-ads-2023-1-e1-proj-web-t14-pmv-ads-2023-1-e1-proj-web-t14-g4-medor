import MedicamentoDataService from './medicamentoDataService.js';


document.addEventListener('DOMContentLoaded', () => {
    const medicamentoForm = document.querySelector('#medicamento-form');
    const medicamentoNomeInput = document.querySelector('#medicamento-nome');

    medicamentoForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const medicamento = {
            nome: medicamentoNomeInput.value
        };

        await MedicamentoDataService.save(medicamento);
        medicamentoNomeInput.value = '';
        await renderMedicamentos();
    });

    async function renderMedicamentos() {
        const medicamentosList = document.querySelector('#medicamentos-list ul');
        medicamentosList.innerHTML = '';
        const medicamentos = await MedicamentoDataService.list();

        medicamentos.forEach(medicamento => {
            const listItem = document.createElement('li');
            listItem.textContent = medicamento.nome;
            medicamentosList.appendChild(listItem);
        });
    }


});

async function renderMedicamentos() {
    const medicamentos = await MedicamentoDataService.list();
    const medicamentoList = document.getElementById('medicamentoList');
    medicamentoList.innerHTML = '';

    medicamentos.forEach((medicamento) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerText = medicamento.nome;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.innerText = 'Excluir';
        deleteButton.onclick = () => deleteMedicamento(medicamento.id);

        listItem.appendChild(deleteButton);
        medicamentoList.appendChild(listItem);
    });
}

document.getElementById('medicamentoForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const medicamentoNome = document.getElementById('medicamentoNome');
    const nome = medicamentoNome.value.trim();

    if (!nome) {
        alert('Por favor, insira o nome do medicamento.');
        return;
    }

    const medicamento = { nome };
    await MedicamentoDataService.save(medicamento);
    medicamentoNome.value = '';
    await renderMedicamentos();
});


async function init() {
    await renderMedicamentos();
}


init();