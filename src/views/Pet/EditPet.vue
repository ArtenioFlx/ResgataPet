<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Editar Pet</h1>

    <form @submit.prevent="save">

      <div class="form-control mb-4">
        <label class="label">Nome</label>
        <input v-model="pet.name" type="text" class="input input-bordered" required />
      </div>

      <div class="form-control mb-4">
        <label class="label">Raça</label>
        <input v-model="pet.breed" type="text" class="input input-bordered" required />
      </div>

      <div class="form-control mb-4">
        <label class="label">Descrição</label>
        <textarea v-model="pet.description" class="textarea textarea-bordered" required></textarea>
      </div>

      <div class="form-control mb-4">
        <label class="label">Imagem (URL)</label>
        <input v-model="pet.image" type="text" class="input input-bordered" required />
      </div>

      <button class="btn btn-primary w-full">Salvar Alterações</button>

    </form>

  </div>
</template>

<script>
import { getPetById, updatePet } from '../../services/petsServices'

export default {
  data() {
    return {
      pet: {}
    }
  },
  mounted() {
    const id = this.$route.params.id
    this.pet = { ...getPetById(id) }
  },
  methods: {
    save() {
      updatePet(this.pet)
      this.$router.push('/pets')
    }
  }
}
</script>
