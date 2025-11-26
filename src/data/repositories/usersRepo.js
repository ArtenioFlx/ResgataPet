// src/data/repositories/usersRepo.js
import { openDB } from "../db";

export async function addUser(user) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    const req = store.add(user);

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getUserByEmail(email) {
  const db = await openDB();
  return new Promise((resolve, reject) => { // Adicionado reject
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const index = store.index("email");
    const req = index.get(email);

    req.onsuccess = () => resolve(req.result);
    // CORREÇÃO: Tratamento de erro essencial para não travar o login
    req.onerror = () => reject(req.error);
  });
}

export async function updateUser(user) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    const req = store.put(user);

    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}
