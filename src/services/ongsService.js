import * as repo from '../data/repositories/ongsRepo.js';

// Salvar uma nova ONG
export async function addOng(ong) {
  // Aqui futuramente pode ter regra de negócio
  return await repo.addOng(ong);
}

// Listar todas as ONGs
export async function getOngs() {
  return await repo.getAllOngs();
}

// Buscar ONG por ID
export async function getOngById(id) {
  return await repo.getOngById(id);
}

// Deletar ONG por ID
export async function deleteOng(id) {
  return await repo.deleteOng(id);
}

// Atualizar ONG
export async function updateOng(ong) {
  return await repo.updateOng(ong);
}
