let db = null;

// Abrir (ou criar) o banco de dados principal
export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("resgataPetDB", 2);

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // Se o store "ongs" NÃO existir, cria
      if (!db.objectStoreNames.contains("ongs")) {
        const store = db.createObjectStore("ongs", {
          keyPath: "id",
          autoIncrement: true,
        });

        store.createIndex("nome", "nome", { unique: false });
        store.createIndex("cidade", "cidade", { unique: false });
      }


    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      reject("Erro ao abrir IndexedDB: " + event.target.error);
    };
  });
}

// Salvar uma nova ONG
export async function addOng(ong) {
  const database = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["ongs"], "readwrite");
    const store = transaction.objectStore("ongs");

    const request = store.add(ong);

    request.onsuccess = () => resolve(true);
    request.onerror = (e) =>
      reject("Erro ao cadastrar ONG: " + e.target.error);
  });
}

// Listar todas as ONGs
export async function getOngs() {
  const database = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["ongs"], "readonly");
    const store = transaction.objectStore("ongs");

    const request = store.getAll();

    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = () => reject("Erro ao buscar ONGs");

  });
}
// Buscar ONG por ID
export async function getOngById(id) {
  const database = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["ongs"], "readonly")
    const store = transaction.objectStore("ongs")

    const request = store.get(Number(id))

    request.onsuccess = (e) => resolve(e.target.result)
    request.onerror = () => reject("Erro ao buscar ONG por ID")
  })
}
// Deletar ONG por ID
export async function deleteOng(id) {
  const database = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["ongs"], "readwrite");
    const store = transaction.objectStore("ongs");

    const request = store.delete(Number(id));

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject("Erro ao deletar ONG");
  });
}
// Atualizar ONG
export async function updateOng(ong) {
  const database = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["ongs"], "readwrite");
    const store = transaction.objectStore("ongs");

    const request = store.put(ong);

    request.onsuccess = () => resolve(true);
    request.onerror = () => reject("Erro ao atualizar ONG");
  });
}
