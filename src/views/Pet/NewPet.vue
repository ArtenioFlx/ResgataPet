<template>
  <div class="min-h-screen bg-base-200 p-6">
    <div class="max-w-xl mx-auto">
      <h1 class="text-3xl font-bold text-primary mb-6 text-center">🐾 Cadastrar Novo Pet</h1>

      <div class="card bg-base-100 shadow-xl p-6">
        <form @submit.prevent="salvarPet" class="flex flex-col gap-4">

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
            <img :src="pet.image" class="w-full h-full object-cover" />
          </div>

          <label class="label"><span class="label-text">Descrição</span></label>
          <textarea
            v-model="pet.description"
            placeholder="Conte um pouco sobre o pet..."
            class="textarea textarea-bordered w-full h-32"
          ></textarea>

          <button type="submit" class="btn btn-primary mt-4">Salvar Pet</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { createPet } from '@/controllers/petsController';
import { converterParaBase64 } from '@/utils/imageUtils';

const router = useRouter();

const pet = reactive({
  name: '',
  breed: '',
  image: '', // Guardará o Base64
  description: '',
});

const processarImagem = async (event) => {
  const arquivo = event.target.files[0]
  if (arquivo) {
    pet.image = await converterParaBase64(arquivo)
  }
}

const salvarPet = async () => {
  try {
    // Se não tiver imagem, usa uma padrão
    if (!pet.image) {
      pet.image = 'https://via.placeholder.com/300x200?text=Pet+Sem+Foto';
    }

    await createPet(pet);
    alert('Pet cadastrado com sucesso!');
    router.push('/pets');

  } catch (error) {
    console.error(error);
    alert(error.message || 'Erro ao cadastrar o pet.');
  }
};
</script>
