import { openDB } from "../db";

export async function getAllPets() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("pets", "readonly");
    const store = tx.objectStore("pets");
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error); // Adicionado
  });
}

export async function addPet(pet) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("pets", "readwrite");
    const store = tx.objectStore("pets");
    const req = store.add(pet); // Retorna o ID gerado
    tx.oncomplete = () => resolve(req.result);
    tx.onerror = () => reject(tx.error); // Adicionado
  });
}

export async function updatePet(pet) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("pets", "readwrite");
    tx.objectStore("pets").put(pet);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error); // Adicionado
  });
}

export async function deletePet(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("pets", "readwrite");
    // CORREÇÃO: Forçar Number(id) para evitar falha silenciosa se vier string
    tx.objectStore("pets").delete(Number(id));
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error); // Adicionado
  });
}

export async function getPetById(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("pets", "readonly");
    const store = tx.objectStore("pets");
    // CORREÇÃO: Forçar Number(id)
    const req = store.get(Number(id));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error); // Adicionado
  });
}
