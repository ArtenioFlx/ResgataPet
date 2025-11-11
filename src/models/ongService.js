import { opeDB } from "idb";
const dbPromise = opeDB("resgataPetDB", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("ongs")) {
      db.createObjectStore("ongs",{kayPath: "id", autoIncremen: true})
    }
  },
});

export async function addOng(ong) {
  const db = await dbPromise;
  return db.add('ongs', ong);
}


export async function getOngs() {
  const db = await dbPromise;
  return db.getAll('ongs');
}

export async function updateOng(ong) {
  const db = await dbPromise;
  return db.put('ongs', ong);
}

export async function deleteOng(id) {
  const db = await dbPromise;
  return db.delete('ongs', id);
}

import * as OngService from '../services/ongService';

export default {
  async listar() {
    return await OngService.getOngs();
  },

  async criar(ong) {
    return await OngService.addOng(ong);
  },

  async atualizar(ong) {
    return await OngService.updateOng(ong);
  },

  async deletar(id) {
    return await OngService.deleteOng(id);
  }
};
