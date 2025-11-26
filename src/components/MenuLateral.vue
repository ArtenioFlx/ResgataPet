<template>
  <div class="h-full min-h-screen bg-base-100 border-r border-base-200 text-base-content w-64 flex flex-col">

    <!-- Menu Principal -->
    <ul class="menu p-4 w-full gap-2 font-medium">

      <!-- Seção: Navegação -->
      <li class="menu-title px-4 opacity-60 uppercase text-xs tracking-wider">
        Resgatapet
      </li>

      <li>
        <!-- Usamos :active-class para ligar à variável criada no script -->
        <router-link :to="{ name: 'home' }" :active-class="classeAtiva">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Home
        </router-link>
      </li>

      <li>
        <router-link to="/pets" :active-class="classeAtiva">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          Pets para Adoção
        </router-link>
      </li>

      <li>
        <router-link to="/ongs" :active-class="classeAtiva">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          ONGs Parceiras
        </router-link>
      </li>

      <!-- Seção: Gestão (Administrativo) -->
      <li class="menu-title px-4 mt-6 opacity-60 uppercase text-xs tracking-wider">
        Gestão
      </li>

      <li>
        <router-link :to="{ name: 'tutors.index' }" :active-class="classeAtiva">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          Gerenciar Tutores
        </router-link>
      </li>

      <li>
        <router-link to="/minha-conta" :active-class="classeAtiva">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          Minha Área
        </router-link>
      </li>

      <!-- Divisor para Institucional -->
      <div class="divider my-2"></div>

      <li>
        <router-link to="/about" :active-class="classeAtiva">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Sobre Nós
        </router-link>
      </li>

      <li>
        <router-link to="/contact" :active-class="classeAtiva">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          Fale Conosco
        </router-link>
      </li>
    </ul>

    <!-- Rodapé Simples -->
    <div class="mt-auto p-6 bg-base-200/30 text-center text-xs opacity-50">
      <p class="font-bold">Resgata Pet</p>
      <p>v1.0.0 © 2025</p>
    </div>
  </div>
</template>

<script setup>
// Definimos as classes de "ativo" aqui para não poluir o HTML
// e removemos o bloco <style> que causava o erro.
const classeAtiva = 'bg-primary text-primary-content font-bold shadow-md';
</script>
