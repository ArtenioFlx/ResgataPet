<template>
  <div class="p-6">

    <!-- CABEÇALHO COM BOTÃO NOVO -->
    <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-primary">Lista de ONGs</h2>

        <!-- NOVO BOTÃO DE CADASTRO -->
        <RouterLink to="/ongs/novo" class="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Cadastrar ONG
        </RouterLink>
    </div>

   <div>
  <div v-if="ongs.length === 0" class="text-center p-10 text-gray-500">
    <span class="loading loading-spinner text-primary" v-if="loading"></span>
    <p v-else>Nenhuma ONG cadastrada ainda.</p>
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div
    v-for="ong in ongs"
    :key="ong.id"
    class="card bg-base-100 shadow-xl border border-base-200"
  >
    <figure v-if="ong.imagem" class="h-48 w-full overflow-hidden">
      <img :src="ong.imagem" alt="Imagem da ONG" class="h-full w-full object-cover" />
    </figure>

    <div class="card-body p-5">
      <h2 class="card-title text-xl mb-1">{{ ong.nome }}</h2>
      <p class="text-sm opacity-80">{{ ong.cidade }} - {{ ong.estado }}</p>

      <p class="mt-2 text-gray-600 line-clamp-2">{{ ong.descricao }}</p>

      <!-- NOVO BLOCO DE AÇÃO - AJUDA/PIX -->
      <div v-if="ong.chavePix" class="mt-4 pt-3 border-t border-base-200">
          <p class="text-xs font-semibold text-success mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline-block mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0ZM12 8.25v2.25M12 14.25v2.25M10.5 18H9a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h3.75a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75H12Z" />
              </svg>
              Ajude esta ONG através da Chave PIX:
          </p>
          <p class="text-sm font-bold text-success truncate">{{ ong.chavePix }}</p>
      </div>
      <!-- FIM NOVO BLOCO -->

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
import { onBeforeRouteUpdate } from 'vue-router'
import { getAllOngs } from '@/controllers/ongsController'

const ongs = ref([])
const loading = ref(true)

const carregarOngs = async () => {
    loading.value = true
    try {
        ongs.value = await getAllOngs();
    } catch (error) {
        console.error("Erro ao carregar ONGs:", error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    carregarOngs();
})

onBeforeRouteUpdate(async (to, from, next) => {
    await carregarOngs();
    next();
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* CORREÇÃO: Adiciona a propriedade padrão para compatibilidade */
    line-clamp: 2;
}
</style>
