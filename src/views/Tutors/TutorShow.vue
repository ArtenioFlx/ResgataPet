<template>
  <div class="p-6 max-w-3xl mx-auto" v-if="tutor">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-3xl text-primary">{{ tutor.nome }}</h2>

        <div class="divider"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-bold text-gray-500 mb-1">Endereço</h3>
            <p>{{ tutor.endereco?.logradouro }}, {{ tutor.endereco?.numero }}</p>
            <p>{{ tutor.endereco?.bairro }}</p>
            <p>{{ tutor.endereco?.cidade }} - {{ tutor.endereco?.estado }}</p>
            <p>CEP: {{ tutor.endereco?.cep }}</p>
          </div>

          <div>
            <h3 class="font-bold text-gray-500 mb-1">Contato</h3>
             <ul v-if="tutor.telefones && tutor.telefones.length">
               <li v-for="(tel, i) in tutor.telefones" :key="i">📞 {{ tel }}</li>
             </ul>
             <p v-else class="text-gray-400">Nenhum telefone cadastrado</p>
          </div>
        </div>

        <div class="card-actions justify-end mt-6">
          <RouterLink :to="{ name: 'tutors.index' }" class="btn btn-ghost">Voltar</RouterLink>
          <RouterLink :to="{ name: 'tutors.edit', params: { id: tutor.id } }" class="btn btn-primary">Editar</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getTutorById } from '@/services/tutorsService';

const route = useRoute();
const tutor = ref(null);

onMounted(async () => {
    try {
        tutor.value = await getTutorById(route.params.id);
    } catch (e) {
        console.error(e);
        alert('Erro ao carregar detalhes.');
    }
});
</script>
