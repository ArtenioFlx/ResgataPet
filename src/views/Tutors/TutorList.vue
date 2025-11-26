<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-primary">Gerenciar Tutores</h1>
      <RouterLink :to="{ name: 'tutors.add' }" class="btn btn-primary">
        Novo Tutor
      </RouterLink>
    </div>

    <div v-if="loading" class="flex justify-center my-10">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <div v-else-if="tutors.length === 0" class="alert alert-info">
      <span>Nenhum tutor cadastrado ainda.</span>
    </div>

    <div v-else class="overflow-x-auto bg-base-100 shadow-xl rounded-lg">
      <table class="table w-full">
        <thead>
          <tr class="bg-base-200">
            <th>Nome</th>
            <th>Cidade/UF</th>
            <th>Telefones</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tutor in tutors" :key="tutor.id" class="hover">
            <td class="font-bold text-lg">
              {{ tutor.nome }}
            </td>
            <td>
              <div class="flex flex-col">
                <span class="font-semibold">{{ tutor.endereco?.cidade }}</span>
                <span class="text-xs text-gray-500">{{ tutor.endereco?.estado }}</span>
              </div>
            </td>
            <td>
              <div v-if="tutor.telefones && tutor.telefones.length > 0">
                <div v-for="(tel, index) in tutor.telefones" :key="index" class="text-sm">
                  {{ tel }}
                </div>
              </div>
              <span v-else class="text-gray-400 text-sm">Sem telefone</span>
            </td>
            <td class="flex gap-2 justify-center">
              <RouterLink :to="{ name: 'tutors.show', params: { id: tutor.id } }" class="btn btn-sm btn-ghost" title="Ver Detalhes">
                Ver
              </RouterLink>
              <RouterLink :to="{ name: 'tutors.edit', params: { id: tutor.id } }" class="btn btn-sm btn-ghost text-blue-600" title="Editar">
                Editar
              </RouterLink>
              <button @click="confirmarExclusao(tutor)" class="btn btn-sm btn-ghost text-red-600" title="Excluir">
                Apagar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllTutors, deleteTutor } from '@/services/tutorsService';

const tutors = ref([]);
const loading = ref(true);

const fetchTutors = async () => {
    loading.value = true;
    try {
        tutors.value = await getAllTutors();
    } catch (error) {
        console.error("Erro ao buscar tutores:", error);
        alert("Erro ao carregar a lista de tutores.");
    } finally {
        loading.value = false;
    }
};

const confirmarExclusao = async (tutor) => {
    if (confirm(`Tem certeza que deseja excluir o tutor ${tutor.nome}?`)) {
        try {
            await deleteTutor(tutor.id);
            alert('Tutor excluído com sucesso!');
            await fetchTutors();
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir tutor.');
        }
    }
};

onMounted(fetchTutors);
</script>
