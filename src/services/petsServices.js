const STORAGE_KEY = 'pets';

// Pega todos os pets
export function getPets() {
  const pets = localStorage.getItem(STORAGE_KEY);
  return pets ? JSON.parse(pets) : [];
}

// Salva pets
export function savePets(pets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
}

// Adiciona pet
export function addPet(pet) {
  const pets = getPets();
  pet.id = Date.now(); // id único
  pets.push(pet);
  savePets(pets);
}

// Busca pet por ID
export function getPetById(id) {
  const pets = getPets();
  return pets.find(p => p.id === Number(id));
}

// Atualiza pet
export function updatePet(updatedPet) {
  const pets = getPets();
  const index = pets.findIndex(p => p.id === updatedPet.id);

  if (index !== -1) {
    pets[index] = updatedPet;
    savePets(pets);
  }
}

// Remove pet
export function deletePet(id) {
  let pets = getPets();
  pets = pets.filter(p => p.id !== Number(id));
  savePets(pets);
}
