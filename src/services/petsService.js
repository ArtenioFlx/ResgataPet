import * as repo from '../data/repositories/petsRepo.js';

// Pega todos os pets
export function getPets() {
  return repo.getAllPets();
}

// Adiciona pet
export function addPet(pet) {
  // Aqui futuramente pode ter regra de negócio
  return repo.addPet(pet);
}

// Busca pet por ID
export function getPetById(id) {
  return repo.getPetById(id);
}

// Atualiza pet
export function updatePet(updatedPet) {
  return repo.updatePet(updatedPet);
}

// Remove pet
export function deletePet(id) {
  return repo.deletePet(id);
}
