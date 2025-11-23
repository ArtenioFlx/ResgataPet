<template>
  <div class="p-6 max-w-2xl mx-auto">

    <button class="btn btn-sm btn-outline mb-4" @click="$router.back()">Voltar</button>

    <div v-if="pet && pet.id">
      <div class="card bg-base-100 shadow-xl">
        <figure>
          <img :src="pet.image" class="h-80 w-full object-cover"/>
        </figure>

        <div class="card-body">
          <h1 class="card-title text-primary text-3xl">{{ pet.name }}</h1>
          <p class="text-lg opacity-80"><strong>Raça:</strong> {{ pet.breed }}</p>
          <div class="divider"></div>
          <p class="leading-relaxed">{{ pet.description || 'Nenhuma descrição fornecida.' }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center p-10">
      <span class="loading loading-spinner text-primary"></span>
      <p class="mt-2">Carregando detalhes do pet...</p>
    </div>

  </div>
</template>

<script>
import { getPetById } from '../../controllers/petsController'

export default {
  data() {
    return {
      pet: {}
    }
  },
  async mounted() {
    const id = this.$route.params.id
    // Correção: aguarda a promessa do banco de dados
    const result = await getPetById(id)

    if (result) {
        this.pet = result;
    } else {
        this.pet = { name: 'Pet não encontrado', breed: '-', description: 'Não localizado no banco de dados.', image: 'https://via.placeholder.com/600x400?text=Erro' };
    }
  }
}
</script>
