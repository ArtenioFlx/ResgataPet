<template>
  <div class="min-h-full bg-base-200 p-6">

    <!-- Tela se o usuário estiver logado -->
    <div v-if="usuario">
        <!-- Cabeçalho do Perfil -->
        <div class="card lg:card-side bg-base-100 shadow-xl mb-8 max-w-5xl mx-auto">
        <figure class="pl-0 lg:pl-8 pt-8 lg:pt-0">
            <div class="avatar online">
            <div class="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <!-- Exibe foto do usuário ou avatar padrão -->
                <img :src="usuario.foto || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'" />
            </div>
            </div>
        </figure>
        <div class="card-body">
            <h2 class="card-title text-3xl">Olá, {{ usuario.nome }}!</h2>
            <p class="opacity-70">Membro desde {{ usuario.desde }} • {{ usuario.funcao }}</p>
            <div class="card-actions justify-end items-center">
            <div class="badge badge-outline">Usuário Ativo</div>
            </div>
        </div>
        </div>

        <!-- Grid de Informações -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        <!-- Card de Dados Pessoais -->
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
            <h2 class="card-title text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>
                Meus Dados
            </h2>

            <div class="space-y-3">
                <div>
                <span class="text-sm opacity-60 block">E-mail</span>
                <span class="font-medium">{{ usuario.email }}</span>
                </div>
                <div>
                <span class="text-sm opacity-60 block">ID do Usuário</span>
                <span class="font-medium">#{{ usuario.id }}</span>
                </div>
                <div>
                <span class="text-sm opacity-60 block">Função</span>
                <span class="badge badge-secondary badge-outline">{{ usuario.funcao }}</span>
                </div>
            </div>
            </div>
        </div>

        <!-- Card de Estatísticas / Atalhos -->
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

    <!-- Tela se NÃO estiver logado -->
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
import { ref, onMounted } from 'vue'

const usuario = ref(null)

onMounted(() => {
  // Busca os dados salvos no navegador (LocalStorage)
  const sessao = localStorage.getItem('usuarioSessao')
  if (sessao) {
    usuario.value = JSON.parse(sessao)
  }
})
</script>
