<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-4">
    <div class="card w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">

        <h2 class="text-3xl font-bold text-center text-secondary mb-6">Criar Conta</h2>

        <form @submit.prevent="fazerCadastro">

          <div class="flex flex-col items-center mb-4">
             <div class="w-24 h-24 rounded-full bg-base-200 overflow-hidden mb-2 border-2 border-secondary">
                <img v-if="fotoPerfil" :src="fotoPerfil" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  </svg>
                </div>
             </div>
             <label class="btn btn-xs btn-outline btn-secondary">
                Escolher Foto
                <input type="file" class="hidden" @change="processarImagem" accept="image/*" />
             </label>
          </div>

          <div class="form-control mb-4">
            <label class="label"><span class="label-text">Nome Completo</span></label>
            <input
              v-model="nome"
              type="text"
              placeholder="Seu Nome"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control mb-4">
            <label class="label"><span class="label-text">Função no Resgata Pet</span></label>
            <select v-model="funcao" class="select select-bordered w-full" required>
                <option disabled value="">Selecione sua função</option>
                <option v-for="role in funcoesDisponiveis" :key="role" :value="role">{{ role }}</option>
            </select>
          </div>

          <div class="form-control mb-4">
            <label class="label"><span class="label-text">E-mail</span></label>
            <input
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="form-control mb-6">
            <label class="label"><span class="label-text">Senha</span></label>
            <input
              v-model="senha"
              type="password"
              placeholder="Crie uma senha forte"
              class="input input-bordered w-full"
              required
            />
          </div>

          <button type="submit" class="btn btn-secondary w-full text-lg" :disabled="carregando">
            {{ carregando ? 'Salvando...' : 'Cadastrar-se' }}
          </button>
        </form>

        <div class="divider">ou</div>

        <p class="text-center">
          Já tem uma conta?
          <RouterLink to="/login" class="link link-primary font-bold">
            Faça Login
          </RouterLink>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { converterParaBase64 } from '@/utils/imageUtils'
// IMPORTANTE: Usando o novo controller usersController e a função registerUser
import { registerUser } from '@/controllers/usersController'

const router = useRouter()
const nome = ref('')
const email = ref('')
const senha = ref('')
const funcao = ref('')
const fotoPerfil = ref('')
const carregando = ref(false)

const funcoesDisponiveis = [
    'TUTOR',
    'REPRESENTANTE ONG',
    'PROTETOR INDEPENDENTE',
    'VOLUNTÁRIO GERAL'
];

const processarImagem = async (event) => {
  const arquivo = event.target.files[0]
  if (arquivo) {
    fotoPerfil.value = await converterParaBase64(arquivo)
  }
}

const fazerCadastro = async () => {
  if (nome.value && email.value && senha.value && funcao.value) {
    carregando.value = true

    const novoUsuario = {
        nome: nome.value,
        email: email.value,
        senha: senha.value,
        foto: fotoPerfil.value,
        funcao: funcao.value,
        desde: new Date().toLocaleDateString('pt-BR')
    };

    try {
      // CORREÇÃO: Usando registerUser em vez de cadastrarUsuario
      await registerUser(novoUsuario);

      alert(`Conta criada com sucesso para ${nome.value}!`)
      router.push('/login')
    } catch (error) {
      console.error(error)
      alert(error.message || "Erro ao criar conta.")
    } finally {
      carregando.value = false
    }
  } else {
    alert("Por favor, preencha todos os campos e selecione sua função.")
  }
}
</script>
