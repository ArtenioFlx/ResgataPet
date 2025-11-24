<template>
  <div class="min-h-screen bg-base-200 p-6">
    <div class="max-w-xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6 text-center">
        Editar Pet: {{ pet?.name }}
      </h1>

      <div v-if="pet" class="card bg-base-100 shadow-xl p-6">
        <form @submit.prevent="salvarEdicao" class="flex flex-col gap-4">

          <label class="label"><span class="label-text">Nome do Pet</span></label>
          <input
            v-model="pet.name"
            type="text"
            placeholder="Ex: Rex, Luna"
            class="input input-bordered w-full"
            required
          />

          <label class="label"><span class="label-text">Raça</span></label>
          <input
            v-model="pet.breed"
            type="text"
            placeholder="Ex: Vira-lata"
            class="input input-bordered w-full"
            required
          />

          <!-- UPLOAD DE IMAGEM DO PET -->
          <div class="form-control w-full">
            <label class="label"><span class="label-text">Foto do Pet</span></label>
            <input
              type="file"
              @change="processarImagem"
              class="file-input file-input-bordered file-input-secondary w-full"
              accept="image/*"
            />
          </div>

          <!-- PREVIEW -->
          <div v-if="pet.image" class="w-full h-48 bg-base-200 rounded-lg overflow-hidden mt-2">
            <img :src="pet.image" class="w-full h-full object-cover" :alt="pet.name" />
          </div>

          <label class="label"><span class="label-text">Descrição</span></label>
          <textarea
            v-model="pet.description"
            placeholder="Conte um pouco sobre o pet..."
            class="textarea textarea-bordered w-full h-32"
          ></textarea>

          <button type="submit" class="btn btn-primary mt-4">Salvar Edição</button>

          <button type="button" @click="$router.push('/pets')" class="btn btn-outline btn-sm">Cancelar</button>
        </form>
      </div>

      <div v-else class="text-center p-10">
        <span class="loading loading-spinner text-primary"></span>
        <p class="mt-2">Carregando dados do Pet...</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Importa o controlador (IndexedDB)
import { getPetById, updatePet } from '@/controllers/petsController';
import { converterParaBase64 } from '@/utils/imageUtils'; // Para processar a imagem

const route = useRoute();
const router = useRouter();
const pet = ref(null); // Iniciamos como null para verificar carregamento

onMounted(async () => {
  const id = route.params.id;
  try {
    // Busca o pet pelo ID
    pet.value = await getPetById(id);

    if (!pet.value) {
      alert('Pet não encontrado.');
      router.push('/pets');
    }
  } catch (error) { // <-- Variável 'error' agora usada
    console.error("Erro ao carregar pet:", error);
  }
});

// Processa a imagem Base64
const processarImagem = async (event) => {
  const arquivo = event.target.files[0]
  if (arquivo && typeof converterParaBase64 === 'function') {
    if (pet.value) {
        pet.value.image = await converterParaBase64(arquivo);
    }
  }
}

const salvarEdicao = async () => {
    try {
        if (!pet.value.name) {
             alert('O nome do pet é obrigatório.');
             return;
        }
        await updatePet(pet.value);
        alert('Pet atualizado!');
        router.push('/pets');
    } catch (error) {
        console.error("Erro ao salvar edição:", error);
        alert('Erro ao atualizar.');
    }
}
</script>
