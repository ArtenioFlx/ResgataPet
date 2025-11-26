import * as repo from '../data/repositories/usersRepo.js';

export async function createUser(user) {
  return await repo.addUser(user);
}

export async function getUserByEmail(email) {
  return await repo.getUserByEmail(email);
}

export async function updateUser(user) {
  return await repo.updateUser(user);
}
