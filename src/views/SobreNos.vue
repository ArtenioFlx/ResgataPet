<template>
  <div class="min-h-full bg-base-100">
    <!-- HERO SECTION -->
    <div class="hero min-h-[50vh] relative" style="background-image: url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80');">
      <div class="hero-overlay bg-opacity-70 bg-primary"></div> <!-- Overlay com a cor Primária (Roxo) -->
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold text-white drop-shadow-md">Nossa Paixão é Salvar Vidas</h1>
          <p class="mb-5 text-lg font-medium text-white/90">
            Conectamos amor, cuidado e esperança para animais que precisam de um lar.
          </p>
          <a href="#historia" class="btn btn-secondary btn-wide rounded-full shadow-lg border-none text-white">Conheça Nossa História</a>
        </div>
      </div>
    </div>

    <!-- SEÇÃO: QUEM SOMOS (Layout lado a lado) -->
    <section id="historia" class="py-20 px-6 max-w-6xl mx-auto">
      <div class="flex flex-col lg:flex-row items-center gap-12">
        <!-- Imagem com detalhe decorativo -->
        <div class="lg:w-1/2">
          <div class="relative">
             <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" class="rounded-2xl shadow-2xl w-full z-10 relative" alt="Cão feliz" />
             <!-- Retângulo colorido atrás da imagem para dar estilo -->
             <div class="absolute -bottom-6 -right-6 w-full h-full bg-secondary/20 rounded-2xl z-0"></div>
          </div>
        </div>

        <!-- Texto -->
        <div class="lg:w-1/2 space-y-6">
          <h2 class="text-4xl font-bold text-primary">Sobre o <span class="text-secondary">Resgata Pet</span></h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            O Resgata Pet nasceu de um sonho compartilhado: criar um mundo onde nenhum animal sofra nas ruas.
            Percebemos que muitas ONGs incríveis tinham dificuldade em divulgar seus animais, e muitas pessoas
            queriam adotar mas não sabiam onde procurar.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed">
            Somos a ponte digital que une esses dois mundos. Utilizamos tecnologia para simplificar a adoção,
            dar visibilidade aos "invisíveis" e facilitar o trabalho heroico dos protetores.
          </p>

          <!-- Estatísticas Rápidas -->
          <div class="flex gap-4 pt-4">
            <div class="stat bg-base-200 rounded-xl shadow-sm p-4 w-auto border-l-4 border-primary">
              <div class="stat-value text-primary text-2xl">X+</div>
              <div class="stat-desc text-gray-600 font-bold">Adoções</div>
            </div>
            <div class="stat bg-base-200 rounded-xl shadow-sm p-4 w-auto border-l-4 border-secondary">
              <div class="stat-value text-secondary text-2xl">X+</div>
              <div class="stat-desc text-gray-600 font-bold">ONGs Parceiras</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEÇÃO: NOSSOS PILARES (Cards Coloridos) -->
    <section class="bg-base-200 py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-primary mb-12">Nossos Pilares</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="card bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300 border-t-4 border-primary">
            <div class="card-body items-center text-center">
              <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <h3 class="card-title text-xl mb-2">Amor Incondicional</h3>
              <p class="text-gray-600">Acreditamos que todo animal merece ser tratado com dignidade, carinho e respeito.</p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="card bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300 border-t-4 border-secondary">
            <div class="card-body items-center text-center">
              <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 class="card-title text-xl mb-2">Agilidade</h3>
              <p class="text-gray-600">Usamos tecnologia para tornar o processo de adoção rápido, seguro e desburocratizado.</p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="card bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300 border-t-4 border-accent">
            <div class="card-body items-center text-center">
              <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 class="card-title text-xl mb-2">Comunidade</h3>
              <p class="text-gray-600">Construímos uma rede de apoio sólida entre tutores, ONGs e parceiros locais.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION FINAL (Gradiente) -->
    <section class="py-20 px-6">
      <div class="max-w-4xl mx-auto bg-linear-to-r from-primary to-secondary rounded-3xl p-10 text-center shadow-2xl text-white">
        <h2 class="text-3xl font-bold mb-4">Pronto para encontrar seu novo melhor amigo?</h2>
        <p class="mb-8 text-lg opacity-90">Milhares de pets estão esperando por uma chance. Comece sua jornada agora.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
           <RouterLink to="/pets" class="btn btn-wide bg-white text-primary border-none hover:bg-gray-100 font-bold shadow-md">Adotar um Pet</RouterLink>
           <RouterLink to="/ongs" class="btn btn-wide btn-outline text-white hover:bg-white hover:text-primary">Conhecer ONGs</RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
</script>

<style scoped>
/* Efeito de fade-in ao carregar */
.hero, section {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
