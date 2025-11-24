<template>
  <div>
    <!-- HERO com imagem de fundo e na paleta de cores da RESGATAPET -->
    <div class="hero min-h-[65vh] relative" style="background-image: url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80');">

      <!-- Alteração das cores - bg-black por um gradiente roxo para manter a coerência com o restante do projeto -->
      <div class="hero-overlay bg-linear-to-r from-primary/80 to-purple-900/80"></div>

      <div class="hero-content text-center text-neutral-content relative z-10">
        <div class="max-w-3xl">
          <h1 class="mb-5 text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-md">
            Seu novo melhor amigo <br/> está esperando por você
          </h1>
          <p class="mb-8 text-xl text-white/90 font-medium max-w-2xl mx-auto">
            Junte-se à nossa missão de conectar corações. Adotar é um ato de amor que transforma vidas e traz alegria para o seu lar.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/pets" class="btn btn-secondary btn-lg border-none hover:scale-105 transition-transform shadow-lg text-white font-bold rounded-full px-8">
              Quero Adotar
            </RouterLink>
            <RouterLink to="/ongs" class="btn btn-outline btn-accent btn-lg hover:bg-white hover:text-primary hover:border-white text-white font-bold rounded-full px-8 backdrop-blur-sm">
              Conhecer ONGs
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Decoração de onda na parte inferior -->
      <div class="absolute bottom-0 w-full overflow-hidden leading-none">
        <svg class="relative block w-full h-[50px] lg:h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="fill-base-100"></path>
        </svg>
      </div>
    </div>

    <!-- SEÇÃO DE DESTAQUES (DADOS REAIS) -->
    <section class="py-16 bg-base-100">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <div class="badge badge-primary badge-outline mb-2">Novidades</div>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800">🐾 Adicionados Recentemente</h2>
            <p class="text-gray-500 mt-2 text-lg">Confira os últimos pets que chegaram à plataforma procurando um lar.</p>
          </div>
          <RouterLink to="/pets" class="btn btn-ghost text-primary hover:bg-primary/10 group">
            Ver todos os pets
            <span class="group-hover:translate-x-1 transition-transform">→</span>
          </RouterLink>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-20">
          <span class="loading loading-spinner loading-lg text-primary"></span>
          <p class="mt-4 text-gray-400 animate-pulse">Buscando amigos...</p>
        </div>

        <!-- Empty State (Sem pets) -->
        <div v-else-if="petsDestaque.length === 0" class="alert bg-base-200 border-none shadow-inner p-8 flex flex-col items-center text-center">
          <div class="bg-gray-200 p-4 rounded-full mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-gray-400 w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <span class="text-lg font-medium text-gray-600">Ainda não há pets cadastrados.</span>
          <p class="text-sm text-gray-500 mb-4">Seja a primeira ONG a divulgar um animalzinho!</p>
          <RouterLink to="/pets/new" class="btn btn-primary btn-wide">Cadastrar Pet</RouterLink>
        </div>

        <!-- Grid de Pets -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="pet in petsDestaque" :key="pet.id" class="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
            <figure class="h-64 w-full overflow-hidden relative">
              <img
                :src="pet.image"
                :alt="pet.name"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute top-3 right-3">
                 <div class="badge badge-secondary shadow-md">Novo</div>
              </div>
              <!-- Gradiente interno no card para leitura do nome -->
              <div class="absolute bottom-0 w-full bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 pt-10">
                <h3 class="text-white font-bold text-xl drop-shadow-sm">{{ pet.name }}</h3>
                <p class="text-white/80 text-xs font-medium">{{ pet.breed }}</p>
              </div>
            </figure>

            <div class="card-body p-5 bg-white">
              <p class="text-sm text-gray-500 line-clamp-2 min-h-10 leading-relaxed">
                {{ pet.description || "Este pet está ansioso para te conhecer melhor!" }}
              </p>
              <div class="card-actions justify-end mt-4 pt-4 border-t border-gray-100">
                <RouterLink :to="`/pets/${pet.id}`" class="btn btn-primary btn-sm btn-block rounded-lg group-hover:bg-secondary group-hover:border-secondary transition-colors">
                  Conhecer {{ pet.name }}
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- SEÇÃO PARA ONGS (Call to Action) -->
    <section class="py-24 bg-base-200 relative overflow-hidden">
      <!-- Elementos decorativos de fundo -->
      <div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-6 text-center relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold text-primary mb-6">Você representa uma ONG ou Projeto?</h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Junte-se à nossa rede de solidariedade. Oferecemos uma plataforma 100% gratuita para você gerenciar seus resgates, organizar tutores e encontrar lares amorosos com muito mais agilidade.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink to="/ongs/novo" class="btn btn-primary btn-wide shadow-lg rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Cadastrar Minha ONG
          </RouterLink>
          <RouterLink to="/tutors/add" class="btn btn-outline btn-wide bg-white hover:bg-gray-100 hover:text-primary rounded-full">
            Cadastrar Tutor Voluntário
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllPets } from '@/controllers/petsController';

const petsDestaque = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const todosPets = await getAllPets();
    // Pega os últimos 4 pets adicionados para mostrar frescor no conteúdo
    if (todosPets && todosPets.length > 0) {
       petsDestaque.value = todosPets.reverse().slice(0, 4);
    }
  } catch (error) {
    console.error("Erro ao carregar destaques:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
