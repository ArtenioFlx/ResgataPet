import * as service from "../services/petsService";

export async function getAllPets() {
  return await service.getPets();
}

export async function createPet(pet) {
  if (!pet.name) throw new Error("Nome obrigatório!");

  // CORREÇÃO: Remove o Proxy do Vue criando uma cópia limpa do objeto
  const novoPet = JSON.parse(JSON.stringify(pet));

  return await service.addPet(novoPet);
}

export async function getPetById(id) {
    return await service.getPetById(id);
}

export async function updatePet(pet) {
  // CORREÇÃO: Mesma limpeza aqui para evitar o DataCloneError na edição
  const petAtualizado = JSON.parse(JSON.stringify(pet));

  return await service.updatePet(petAtualizado);
}

export async function deletePet(id) {
  return await service.deletePet(id);
}
