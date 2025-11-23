import { openDB } from "../db";

export async function getAllOngs() {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("ongs", "readonly");
    const store = tx.objectStore("ongs");
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
  });
}

export async function addOng(ong) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("ongs", "readwrite");
    tx.objectStore("ongs").add(ong);
    tx.oncomplete = () => resolve(true);
  });
}

export async function updateOng(ong) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("ongs", "readwrite");
    tx.objectStore("ongs").put(ong);
    tx.oncomplete = () => resolve(true);
  });
}

export async function deleteOng(id) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("ongs", "readwrite");
    tx.objectStore("ongs").delete(id);
    tx.oncomplete = () => resolve(true);
  });
}

export async function getOngById(id) {
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction("ongs", "readonly");
    const store = tx.objectStore("ongs");
    const req = store.get(Number(id));
    req.onsuccess = () => resolve(req.result);
  });
}
