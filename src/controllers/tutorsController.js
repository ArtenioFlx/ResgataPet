import * as service from "../services/tutorsService";

export async function getAllTutors() {
  return await service.getAllTutors();
}

export async function createTutor(tutor) {
  // CORREÇÃO: Valida 'nome' e não 'nomeCompleto'
  if (!tutor.nome) throw new Error("Nome é obrigatório.");

  // Limpa o objeto (remove proxies do Vue)
  const novoTutor = JSON.parse(JSON.stringify(tutor));
  return await service.addTutor(novoTutor);
}

export async function getTutorById(id) {
  return await service.getTutorById(id);
}

export async function updateTutor(tutor) {
  if (!tutor.id) throw new Error("ID necessário para atualizar.");
  const tutorAtualizado = JSON.parse(JSON.stringify(tutor));
  return await service.updateTutor(tutorAtualizado);
}

export async function deleteTutor(id) {
  return await service.deleteTutor(id);
}
