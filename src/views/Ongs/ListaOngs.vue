
<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Lista de ONGs</h2>

   <div>
  <div v-if="ongs.length === 0">
    Nenhuma ONG cadastrada ainda.
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div
    v-for="ong in ongs"
    :key="ong.id"
    class="card bg-base-100 shadow-xl"
  >
    <figure v-if="ong.imagem">
      <img :src="ong.imagem" alt="Imagem da ONG" class="h-48 w-full object-cover" />
    </figure>

    <div class="card-body">
      <h2 class="card-title">{{ ong.nome }}</h2>
      <p class="text-sm opacity-80">{{ ong.cidade }} - {{ ong.estado }}</p>

      <p class="mt-2">{{ ong.descricao }}</p>

      <div class="card-actions justify-end mt-4">
       <button
        class="btn btn-primary btn-sm"
        @click="$router.push(`/ongs/${ong.id}`)"
      >
        Ver detalhes
      </button>

      </div>
    </div>
  </div>
</div>

</div>

  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { getAllOngs } from '@/controllers/ongsController'


const ongs = ref([])

onMounted(async () => {
  ongs.value = await getAllOngs();
})
</script>



