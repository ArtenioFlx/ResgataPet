<template>
  <section class="hero min-h-[70vh] bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://images.unsplash.com/photo-1558944351-dae1b71f0e34"
          class="max-w-sm rounded-lg shadow-2xl"
          alt="Cachorro feliz"
        />
        <div>
          <h1 class="text-5xl font-bold text-primary">Adote amor, adote um amigo!</h1>
          <p class="py-6 max-w-md">
            O ResgataPet conecta animais resgatados a novos lares. Encontre o pet perfeito para você e ajude
            uma ONG local a transformar vidas.
          </p>
          <div class="flex gap-3">
            <RouterLink to="/pets" class="btn btn-primary">Ver Pets Disponíveis</RouterLink>
            <RouterLink to="/ongs" class="btn btn-outline btn-primary">Conhecer ONGs</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de pets em destaque -->
    <section class="py-16 bg-base-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8 text-primary">🐾 Pets em Destaque</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <!-- Card de pet -->
          <div v-for="pet in petsDestaque" :key="pet.id" class="card bg-base-200 shadow-xl">
            <figure>
              <img :src="pet.foto" :alt="pet.nome" class="h-56 w-full object-cover" />
            </figure>
            <div class="card-body">
              <h3 class="card-title">{{ pet.nome }}</h3>
              <p class="text-sm opacity-80">{{ pet.descricao }}</p>
              <div class="card-actions justify-end">
                <RouterLink :to="`/pets/${pet.id}`" class="btn btn-primary btn-sm">Ver Detalhes</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de propósito -->
    <section class="py-16 bg-base-200">
      <div class="container mx-auto text-center px-6 max-w-3xl">
        <h2 class="text-3xl font-bold text-primary mb-4">Nosso Propósito</h2>
        <p class="text-lg leading-relaxed opacity-80">
          Nosso objetivo é criar uma ponte entre ONGs, protetores independentes e pessoas dispostas a adotar.
          Com a ajuda da tecnologia, queremos facilitar o processo de adoção e promover o bem-estar animal.
        </p>
      </div>
    </section>

    <!-- Chamada para ação final -->
    <section class="py-16 bg-primary text-primary-content text-center">
      <h2 class="text-3xl font-bold mb-4">Tem uma ONG? Junte-se ao ResgataPet!</h2>
      <p class="mb-6 max-w-2xl mx-auto">
        Cadastre sua organização e comece a divulgar seus animais disponíveis para adoção de forma simples e gratuita.
      </p>
      <RouterLink to="/ongs/novo" class="btn btn-outline btn-light">
        Cadastrar Minha ONG
      </RouterLink>
    </section>
</template>

<script setup>

const petsDestaque = [
  {
    id: 1,
    nome: 'Luna',
    descricao: 'Uma gatinha carinhoso.',
    foto: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb',
  },
  {
    id: 2,
    nome: 'Rex',
    descricao: 'Um cachorro leal e cheio de energia.',
    foto: 'https://images.unsplash.com/photo-1517849845537-4d257902454a',
  },
  {
    id: 3,
    nome: 'Nina',
    descricao: 'Esperta, brincalhona e pronta para um novo lar.',
    foto: 'https://images.unsplash.com/photo-1558788353-f76d92427f16',
  },
  {
    id: 4,
    nome: 'Theo',
    descricao: 'Um amigo fiel em busca de uma segunda chance.',
    foto: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238',
  },
]
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
