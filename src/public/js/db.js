import Dexie from 'dexie';

const db = new Dexie('MedOrganizer');

db.version(1).stores({
    medicamentos: '++id, nome',
    pacientes: '++id, nome, idade',
    medicos: '++id, nome',
    clinicasLaboratorios: '++id, nome',
    agendamentos: '++id, dataHora, tipo, medico_id, clinica_laboratorio_id'
});

export default db;
