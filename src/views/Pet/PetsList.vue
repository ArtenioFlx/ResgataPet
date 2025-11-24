<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-primary">Lista de Pets</h1>
      <RouterLink to="/pets/new" class="btn btn-primary">Adicionar Pet</RouterLink>
    </div>

    <div v-if="pets.length === 0" class="alert shadow-lg bg-base-100">
        <div>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Nenhum pet cadastrado ainda. Clique em "Adicionar Pet" para começar.</span>
        </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="pet in pets" :key="pet.id" class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition">
        <figure>
          <img :src="pet.image" class="h-48 w-full object-cover"/>
        </figure>

        <div class="card-body p-4">
          <h2 class="card-title text-xl text-primary">{{ pet.name }}</h2>
          <p class="text-sm opacity-80">{{ pet.breed }}</p>

          <div class="card-actions justify-end mt-2">
            <RouterLink :to="`/pets/${pet.id}`" class="btn btn-xs btn-info">Ver</RouterLink>
            <RouterLink :to="`/pets/${pet.id}/edit`" class="btn btn-xs btn-warning">Editar</RouterLink>
            <button @click="remove(pet.id)" class="btn btn-xs btn-error">Excluir</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getAllPets, deletePet } from '../../controllers/petsController'

export default {
  // CORREÇÃO: Nome composto para satisfazer a regra do ESLint (vue/multi-word-component-names)
  name: 'PetList',
  data() {
    return {
      pets: []
    }
  },
  async mounted() {
    this.pets = await getAllPets();
  },
  methods: {
    async remove(id) {
        if (!confirm('Tem certeza que deseja deletar este pet?')) return;

      await deletePet(id);
      this.pets = await getAllPets();
    }
  }
}
</script>
