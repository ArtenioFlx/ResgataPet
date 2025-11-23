<template>
  <div class="min-h-screen bg-base-200 p-6">
    <div v-if="pet" class="max-w-xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6 text-center">🐾 Editando Pet: {{ pet.name }}</h1>

      <div class="card bg-base-100 shadow-xl p-6">
        <form @submit.prevent="salvarEdicao" class="flex flex-col gap-4">

          <label class="label">
            <span class="label-text">Nome do Pet</span>
          </label>
          <input
            v-model="pet.name"
            type="text"
            placeholder="Ex: Rex, Luna, Fofão"
            class="input input-bordered w-full"
            required
          />

          <label class="label">
            <span class="label-text">Raça</span>
          </label>
          <input
            v-model="pet.breed"
            type="text"
            placeholder="Ex: Vira-lata, Poodle, Siamês"
            class="input input-bordered w-full"
            required
          />

          <label class="label">
            <span class="label-text">URL da Imagem</span>
          </label>
          <input
            v-model="pet.image"
            type="url"
            placeholder="Ex: https://img.exemplo.com/pet.jpg"
            class="input input-bordered w-full"
          />

          <label class="label">
            <span class="label-text">Descrição</span>
          </label>
          <textarea
            v-model="pet.description"
            placeholder="Conte um pouco sobre o pet (personalidade, história)"
            class="textarea textarea-bordered w-full h-32"
          ></textarea>

          <button type="submit" class="btn btn-primary mt-4">
            Salvar Edição
          </button>
        </form>
      </div>

    </div>
    <div v-else class="text-center p-10">
      <span class="loading loading-spinner text-primary"></span>
      <p class="mt-2">Carregando dados do pet...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Importação correta do Controller
import { getPetById, updatePet } from '@/controllers/petsController';

const route = useRoute();
const router = useRouter();
const pet = ref(null);

onMounted(async () => {
  const id = route.params.id;
  try {
    pet.value = await getPetById(id);

    if (!pet.value) {
      alert('Pet não encontrado.');
      router.push('/pets');
    }
  } catch (e) {
    console.error(e);
    router.push('/pets');
  }
});

const salvarEdicao = async () => {
  try {
    await updatePet(pet.value);
    alert('Pet atualizado com sucesso!');
    router.push('/pets');
  } catch (error) {
    alert('Erro ao salvar edição: ' + error.message);
  }
};
</script>
