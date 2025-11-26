// src/data/repositories/ongsRepo.js
import { openDB } from "../db";

export async function getAllOngs() {
  const db = await openDB();
  return new Promise((resolve, reject) => { // Adicionado reject
    const tx = db.transaction("ongs", "readonly");
    const store = tx.objectStore("ongs");
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result);
    // CORREÇÃO: Tratamento de erro para evitar carregamento infinito
    req.onerror = () => reject(req.error);
  });
}

export async function addOng(ong) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("ongs", "readwrite");
    tx.objectStore("ongs").add(ong);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

export async function updateOng(ong) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("ongs", "readwrite");
    tx.objectStore("ongs").put(ong);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

export async function deleteOng(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("ongs", "readwrite");
    tx.objectStore("ongs").delete(id);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getOngById(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("ongs", "readonly");
    const store = tx.objectStore("ongs");
    const req = store.get(Number(id));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
//Serviço para gerenciamento de ONGs no banco de dados IndexedDB
// CRUD (Create, Read, Update, Delete) para entidades do tipo ONG
