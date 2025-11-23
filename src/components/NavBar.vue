<template>
  <div class="navbar bg-base-100 shadow-sm border-b border-base-200 px-4">
    <!-- Lado Esquerdo: Toggle Menu e Título -->
    <div class="flex-1 gap-2">
      <!-- CORREÇÃO: Removida a classe 'lg:hidden' para o botão aparecer sempre -->
      <button class="btn btn-square btn-ghost" @click="toggleSidebar">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-6 w-6 stroke-current"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <RouterLink to="/" class="text-xl font-bold text-primary cursor-pointer">Resgata Pet</RouterLink>
    </div>

    <!-- Lado Direito: Dropdown do Usuário -->
    <div class="flex-none gap-2">

      <!-- Se estiver logado -->
      <div v-if="usuario" class="dropdown dropdown-end">

        <!-- O que aparece na barra (Avatar clicável) -->
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img :alt="usuario.nome" :src="usuario.foto || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'" />
          </div>
        </div>

        <!-- O Menu que abre -->
        <ul tabindex="0" class="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

          <li class="menu-title px-4 py-2">
            <span>Olá, {{ usuario.nome.split(' ')[0] }}</span>
          </li>

          <li>
            <RouterLink to="/minha-conta" class="justify-between">
              Meu Perfil
            </RouterLink>
          </li>

          <li><RouterLink to="/pets/new">Novo Pet</RouterLink></li>

          <div class="divider my-1"></div>

          <li>
            <a @click="fazerLogout" class="text-error">Sair</a>
          </li>
        </ul>
      </div>

      <!-- Se NÃO estiver logado: Mostra botão Entrar -->
      <div v-else>
         <RouterLink to="/login" class="btn btn-sm btn-primary">Entrar</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref(null)

const props = defineProps({
  estaAberto: {
    type: Boolean,
    require: true,
  },
});

const emit = defineEmits(["update:estaAberto"]);

function toggleSidebar() {
  emit("update:estaAberto", !props.estaAberto);
}

function carregarUsuario() {
  const sessao = localStorage.getItem('usuarioSessao')
  if (sessao) {
    usuario.value = JSON.parse(sessao)
  } else {
    usuario.value = null
  }
}

function fazerLogout() {
  if(confirm("Deseja realmente sair?")) {
    localStorage.removeItem('usuarioSessao')
    usuario.value = null
    router.push('/login')
  }
}

onMounted(() => {
  carregarUsuario()

  // Ouve evento caso o login ocorra em outra aba ou componente
  window.addEventListener('storage', () => {
    carregarUsuario()
  })
})
</script>

<style lang="scss" scoped></style>
