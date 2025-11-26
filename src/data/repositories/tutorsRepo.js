import { openDB } from "../db";

export async function getAllTutors() {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("tutores", "readonly");
    const store = tx.objectStore("tutores");
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
  });
}

export async function addTutor(tutor) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("tutores", "readwrite");
    tx.objectStore("tutores").add(tutor);
    tx.oncomplete = () => resolve(true);
  });
}

export async function updateTutor(tutor) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("tutores", "readwrite");
    tx.objectStore("tutores").put(tutor); // put atualiza ou cria se tiver ID
    tx.oncomplete = () => resolve(true);
  });
}

export async function deleteTutor(id) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("tutores", "readwrite");
    tx.objectStore("tutores").delete(Number(id)); // Garante que ID seja número
    tx.oncomplete = () => resolve(true);
  });
}

export async function getTutorById(id) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("tutores", "readonly");
    const store = tx.objectStore("tutores");
    const req = store.get(Number(id));
    req.onsuccess = () => resolve(req.result);
  });
}
