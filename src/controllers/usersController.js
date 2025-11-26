import * as service from "../services/usersService";

export async function registerUser(usuario) {
  if (!usuario.email || !usuario.email.includes('@')) {
    throw new Error("E-mail inválido.");
  }
  if (!usuario.senha || usuario.senha.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }

  const existingUser = await service.getUserByEmail(usuario.email);
  if (existingUser) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  return await service.createUser(usuario);
}

export async function loginUser(email, senha) {
  if (!email || !senha) throw new Error("Preencha e-mail e senha.");

  const user = await service.getUserByEmail(email);

  if (user && user.senha === senha) {
    return user;
  } else {
    throw new Error("E-mail ou senha incorretos.");
  }
}

export async function getUserByEmail(email) {
  return await service.getUserByEmail(email);
}

export async function updateUserProfile(usuario) {
  if (!usuario.id && !usuario.email) throw new Error("Usuário inválido.");
  return await service.updateUser(usuario);
}
