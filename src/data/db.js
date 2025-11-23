export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("resgatapetDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("pets")) {
        db.createObjectStore("pets", { keyPath: "id", autoIncrement: true });
      }

      if (!db.objectStoreNames.contains("ongs")) {
        db.createObjectStore("ongs", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
