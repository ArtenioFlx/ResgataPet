import { openDB } from "../db";

export async function getAllPets() {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("pets", "readonly");
    const store = tx.objectStore("pets");
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
  });
}

export async function addPet(pet) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("pets", "readwrite");
    tx.objectStore("pets").add(pet);
    tx.oncomplete = () => resolve(true);
  });
}

export async function updatePet(pet) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("pets", "readwrite");
    tx.objectStore("pets").put(pet);
    tx.oncomplete = () => resolve(true);
  });
}

export async function deletePet(id) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("pets", "readwrite");
    tx.objectStore("pets").delete(id);
    tx.oncomplete = () => resolve(true);
  });
}

export async function getPetById(id) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("pets", "readonly");
    const store = tx.objectStore("pets");
    const req = store.get(Number(id));
    req.onsuccess = () => resolve(req.result);
  });
}
//Serviço para gerenciamento de Pets no banco de dados IndexedDB
// CRUD (Create, Read, Update, Delete) para entidades do tipo PetS
