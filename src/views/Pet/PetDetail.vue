<template>
  <div class="p-6 max-w-2xl mx-auto">

    <button class="btn mb-4" @click="$router.back()">Voltar</button>

    <div class="card bg-base-200 shadow">
      <figure>
        <img :src="pet.image" class="h-64 w-full object-cover"/>
      </figure>

      <div class="card-body">
        <h1 class="card-title">{{ pet.name }}</h1>
        <p><strong>Raça:</strong> {{ pet.breed }}</p>
        <p>{{ pet.description }}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { getPetById } from '../../services/petsServices'

export default {
  data() {
    return {
      pet: {}
    }
  },
  mounted() {
    const id = this.$route.params.id
    this.pet = getPetById(id)
  }
}
</script>
