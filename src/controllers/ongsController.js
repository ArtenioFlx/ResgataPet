import * as service from "../services/ongsService";

// Retorna a lista completa de ONGs cadastradas.
export async function getAllOngs() {
  return await service.getOngs();
}
// Cria uma nova ONG.
export async function createOng(ong) {
  if (!ong.name) throw new Error("Nome da ONG obrigatório!");
  return await service.addOng(ong);
}
// Busca uma ONG específica pelo ID.
export async function getOngById(id) {
    return await service.getOngById(id);
}
// Atualiza os dados de uma ONG existente.
export async function updateOng(ong) {
  return await service.updateOng(ong);
}
// Remove uma ONG pelo ID.
export async function deleteOng(id) {
  return await service.deleteOng(id);
}
