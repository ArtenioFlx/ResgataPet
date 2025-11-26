export function openDB() {
  return new Promise((resolve, reject) => {
    // 1. Abre o banco
    const request = indexedDB.open("resgatapetDB", 2);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Cria todas as tabelas necessárias para o sistema completo
      if (!db.objectStoreNames.contains("pets")) {
        db.createObjectStore("pets", { keyPath: "id", autoIncrement: true });
      }

      if (!db.objectStoreNames.contains("ongs")) {
        db.createObjectStore("ongs", { keyPath: "id", autoIncrement: true });
      }

      if (!db.objectStoreNames.contains("users")) {
        const userStore = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
        userStore.createIndex("email", "email", { unique: true });
      }

      if (!db.objectStoreNames.contains("tutores")) {
        db.createObjectStore("tutores", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
