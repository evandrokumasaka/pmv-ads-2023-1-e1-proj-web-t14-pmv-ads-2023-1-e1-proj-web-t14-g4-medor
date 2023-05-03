import db from './db.js';

class MedicamentoDataService {
    static list() {
        return db.medicamentos.toArray();
    }

    static async save(medicamento) {
        await db.medicamentos.add(medicamento);
    }

    static async delete(id) {
        await db.medicamentos.delete(id);
    }
}

export default MedicamentoDataService;
