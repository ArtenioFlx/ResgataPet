<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-full max-w-sm shadow-xl bg-base-100">
      <div class="card-body">
        <h2 class="text-2xl font-bold text-center text-primary mb-4">Login</h2>

        <form @submit.prevent="fazerLogin">
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">E-mail</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="Digite seu e-mail"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control mb-6">
            <label class="label">
              <span class="label-text">Senha</span>
            </label>
            <input
              v-model="senha"
              type="password"
              placeholder="Digite sua senha"
              class="input input-bordered w-full"
              required
            />
            <label class="label">
              <RouterLink to="/forgot-password" class="label-text-alt link link-hover text-primary">
                Esqueceu a senha?
              </RouterLink>
            </label>
          </div>

          <div class="form-control">
            <button type="submit" class="btn btn-primary w-full" :disabled="carregando">
                {{ carregando ? 'Entrando...' : 'Entrar' }}
            </button>
          </div>
        </form>

        <div class="divider">ou</div>

        <p class="text-center text-sm">
          Não tem uma conta?
          <RouterLink to="/register" class="text-primary font-semibold link-hover">Cadastre-se</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/controllers/usersController';

const router = useRouter();
const email = ref('');
const senha = ref('');
const carregando = ref(false);

const fazerLogin = async () => {
    carregando.value = true;
    try {
        const usuario = await loginUser(email.value, senha.value);

        if (usuario) {
            localStorage.setItem('usuarioSessao', JSON.stringify(usuario));
            window.dispatchEvent(new Event('storage'));
            alert(`Bem-vindo, ${usuario.nome}!`);
            router.push('/minha-conta');
        }
    } catch (error) {
        console.error(error);
        alert(error.message || "Erro ao realizar login.");
    } finally {
        carregando.value = false;
    }
}
</script>
