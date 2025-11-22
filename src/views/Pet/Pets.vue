<template>
  <div class="p-6">
    <navbar>
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Lista de Pets</h1>
        <RouterLink to="/pets/new" class="btn btn-primary">Adicionar Pet</RouterLink>
      </div>
    </navbar>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="pet in pets" :key="pet.id" class="card bg-base-200 shadow">
        <figure>
          <img :src="pet.image" class="h-48 w-full object-cover"/>
        </figure>

        <div class="card-body">
          <h2 class="card-title">{{ pet.name }}</h2>
          <p>{{ pet.breed }}</p>

          <div class="flex gap-2">
            <RouterLink :to="`/pets/${pet.id}`" class="btn btn-sm btn-info">Ver</RouterLink>
            <RouterLink :to="`/pets/${pet.id}/edit`" class="btn btn-sm btn-warning">Editar</RouterLink>
            <button @click="remove(pet.id)" class="btn btn-sm btn-error">Excluir</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getPets, deletePet } from '../../services/petsServices'

export default {
  data() {
    return {
      pets: []
    }
  },
  mounted() {
    this.pets = getPets();
  },
  methods: {
    remove(id) {
      deletePet(id);
      this.pets = getPets();
    }
  }
}
</script>
