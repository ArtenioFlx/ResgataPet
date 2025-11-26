<template>
  <div class="min-h-full bg-base-200 p-6">

    <div v-if="usuario">
        <div class="card lg:card-side bg-base-100 shadow-xl mb-8 max-w-5xl mx-auto">
          <figure class="pl-0 lg:pl-8 pt-8 lg:pt-0">
              <div class="avatar online">
              <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img :src="usuario.foto || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'" />
              </div>
              </div>
          </figure>
          <div class="card-body">
              <h2 class="card-title text-3xl">Olá, {{ usuario.nome }}!</h2>
              <p class="opacity-70">Membro desde {{ usuario.desde }} • {{ usuario.funcao }}</p>
              <div class="card-actions justify-end items-center">
              <div class="badge badge-outline">Usuário Ativo</div>

              <button v-if="!editando" class="btn btn-primary btn-sm" @click="ativarEdicao">Editar Perfil</button>
              </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

          <div v-if="!editando" class="card bg-base-100 shadow-xl">
              <div class="card-body">
              <h2 class="card-title text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                  </svg>
                  Meus Dados
              </h2>

              <div class="space-y-3">
                  <div>
                  <span class="text-sm opacity-60 block">Nome</span>
                  <span class="font-medium">{{ usuario.nome }}</span>
                  </div>
                  <div>
                  <span class="text-sm opacity-60 block">E-mail</span>
                  <span class="font-medium">{{ usuario.email }}</span>
                  </div>
                  <div>
                  <span class="text-sm opacity-60 block">Função</span>
                  <span class="badge badge-secondary badge-outline">{{ usuario.funcao }}</span>
                  </div>
              </div>
              </div>
          </div>

          <div v-else class="card bg-base-100 shadow-xl">
              <div class="card-body">
                  <h2 class="card-title text-primary mb-4">Editando Dados</h2>
                  <form @submit.prevent="salvarPerfil" class="space-y-4">

                      <div class="form-control">
                          <label class="label"><span class="label-text">Nome</span></label>
                          <input v-model="formEdicao.nome" type="text" class="input input-bordered" required />
                      </div>

                      <div class="form-control">
                          <label class="label"><span class="label-text">E-mail (Não Editável)</span></label>
                          <input v-model="formEdicao.email" type="email" class="input input-bordered bg-gray-100 cursor-not-allowed" disabled />
                      </div>

                      <div class="form-control">
                          <label class="label"><span class="label-text">Função</span></label>
                          <select v-model="formEdicao.funcao" class="select select-bordered" required>
                              <option v-for="role in funcoesDisponiveis" :key="role" :value="role">{{ role }}</option>
                          </select>
                      </div>

                      <div class="flex gap-2 pt-4">
                          <button type="submit" class="btn btn-success flex-1" :disabled="carregando">
                              {{ carregando ? 'Salvando...' : 'Salvar Alterações' }}
                          </button>
                          <button type="button" class="btn btn-outline flex-1" @click="cancelarEdicao">Cancelar</button>
                      </div>
                  </form>
              </div>
          </div>


          <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
              <h2 class="card-title text-secondary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  Ações Rápidas
              </h2>

              <p class="opacity-70 mb-4">Bem-vindo à sua área de gerenciamento. O que deseja fazer hoje?</p>

              <div class="flex flex-col gap-2">
                  <RouterLink to="/pets/new" class="btn btn-outline btn-primary">
                      Cadastrar Novo Pet
                  </RouterLink>
                  <RouterLink to="/ongs/novo" class="btn btn-outline btn-secondary">
                      Cadastrar ONG
                  </RouterLink>
              </div>
              </div>
          </div>

        </div>
    </div>

    <div v-else class="hero min-h-[60vh]">
        <div class="hero-content text-center">
            <div class="max-w-md">
            <h1 class="text-5xl font-bold text-gray-400">Ops!</h1>
            <p class="py-6 text-xl">Você precisa fazer login para acessar seus dados.</p>
            <RouterLink to="/login" class="btn btn-primary">Ir para Login</RouterLink>
            </div>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
// CORREÇÃO: Usando as novas funções getUserByEmail e updateUserProfile
import { getUserByEmail, updateUserProfile } from '@/controllers/usersController';

const usuario = ref(null)
const editando = ref(false)
const carregando = ref(false)

const funcoesDisponiveis = [
    'TUTOR',
    'REPRESENTANTE ONG',
    'PROTETOR INDEPENDENTE',
    'VOLUNTÁRIO GERAL'
];

// Objeto reativo para o formulário
const formEdicao = reactive({
    id: null,
    nome: '',
    email: '',
    funcao: '',
    foto: '',
    desde: '',
});

// Carrega os dados do banco
const carregarPerfilCompleto = async () => {
    const sessao = localStorage.getItem('usuarioSessao');
    if (sessao) {
        try {
            const dadosSessao = JSON.parse(sessao);
            // CORREÇÃO: Chamando getUserByEmail
            const dadosCompletos = await getUserByEmail(dadosSessao.email);

            if (dadosCompletos) {
                usuario.value = dadosCompletos;

                // Verificação para usuários antigos sem função
                if (!usuario.value.funcao) {
                    alert("Bem-vindo(a) de volta! Por favor, defina sua função para acessar o perfil.");
                    ativarEdicao();
                }
            }
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
        }
    }
}

onMounted(() => {
  carregarPerfilCompleto();
})

const ativarEdicao = () => {
    if (!usuario.value) return;

    // Copia os dados atuais para o formulário
    formEdicao.id = usuario.value.id;
    formEdicao.nome = usuario.value.nome;
    formEdicao.email = usuario.value.email;
    formEdicao.funcao = usuario.value.funcao || funcoesDisponiveis[0];
    formEdicao.foto = usuario.value.foto;
    formEdicao.desde = usuario.value.desde;

    editando.value = true;
}

const cancelarEdicao = () => {
    editando.value = false;
    // Se não tiver função, força a edição novamente
    if (usuario.value && !usuario.value.funcao) {
        carregarPerfilCompleto();
    }
}

const salvarPerfil = async () => {
    if (!formEdicao.nome || !formEdicao.funcao) {
        alert("Nome e Função são obrigatórios.");
        return;
    }

    carregando.value = true;

    // Prepara objeto limpo para envio ao Controller
    // Note que usamos o spread operator para clonar os dados do form
    const dadosParaSalvar = { ...formEdicao };

    try {
        // CORREÇÃO: Chamando updateUserProfile
        await updateUserProfile(dadosParaSalvar);

        // 2. Atualiza a visualização local
        usuario.value.nome = formEdicao.nome;
        usuario.value.funcao = formEdicao.funcao;

        // 3. Atualiza a Sessão (LocalStorage) e notifica NavBar
        localStorage.setItem('usuarioSessao', JSON.stringify(dadosParaSalvar));
        window.dispatchEvent(new Event('storage'));

        editando.value = false;
        alert("Perfil atualizado com sucesso!");

    } catch (error) {
        console.error("Erro ao salvar perfil:", error);
        alert("Não foi possível salvar as alterações: " + error.message);
    } finally {
        carregando.value = false;
    }
}
</script>
