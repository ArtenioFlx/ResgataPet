import * as service from "../services/ongsService";

export async function getAllOngs() {
  return await service.getOngs();
}

export async function createOng(ong) {
  if (!ong.name) throw new Error("Nome da ONG obrigatório!");
  return await service.addOng(ong);
}

export async function getOngById(id) {
    return await service.getOngById(id);
}

export async function updateOng(ong) {
  return await service.updateOng(ong);
}

export async function deleteOng(id) {
  return await service.deleteOng(id);
}
