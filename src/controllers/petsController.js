import * as service from "../services/petsService";

export async function getAllPets() {
  return await service.getPets();
}

export async function createPet(pet) {
  if (!pet.name) throw new Error("Nome obrigatório!");
  return await service.addPet(pet);
}

export async function getPetById(id) {
    return await service.getPetById(id);
}

export async function updatePet(pet) {
  return await service.updatePet(pet);
}

export async function deletePet(id) {
  return await service.deletePet(id);
}

// Segue a mesma lógica do ongsController.js
