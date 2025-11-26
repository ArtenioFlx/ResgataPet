import * as repo from '../data/repositories/tutorsRepo.js';

// Lista todos
export async function getAllTutors() {
  return await repo.getAllTutors();
}

// Cria novo
export async function addTutor(tutor) {
  return await repo.addTutor(tutor);
}

// Atualiza
export async function updateTutor(tutor) {
  return await repo.updateTutor(tutor);
}

// Deleta
export async function deleteTutor(id) {
  return await repo.deleteTutor(id);
}

// Busca por ID
export async function getTutorById(id) {
  return await repo.getTutorById(id);
}
