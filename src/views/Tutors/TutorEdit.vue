<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-primary mb-6">Editar Tutor</h1>

    <div v-if="loading" class="text-center">
       <span class="loading loading-spinner loading-lg"></span>
    </div>

    <form v-else @submit.prevent="salvarAlteracoes" class="card bg-base-100 shadow-xl p-6">

      <h2 class="text-xl font-semibold mb-4 border-b pb-2">Dados Pessoais</h2>
      <div class="form-control mb-4">
        <label class="label"><span class="label-text">Nome Completo</span></label>
        <input v-model="form.nome" type="text" class="input input-bordered w-full" required />
      </div>

      <h2 class="text-xl font-semibold mb-4 mt-6 border-b pb-2">Endereço</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
            <label class="label"><span class="label-text">CEP</span></label>
            <input v-model="form.cep" type="text" class="input input-bordered" />
        </div>
        <div class="form-control">
            <label class="label"><span class="label-text">Logradouro</span></label>
            <input v-model="form.logradouro" type="text" class="input input-bordered" />
        </div>
        <div class="form-control">
            <label class="label"><span class="label-text">Número</span></label>
            <input v-model="form.numero" type="text" class="input input-bordered" />
        </div>
        <div class="form-control">
            <label class="label"><span class="label-text">Bairro</span></label>
            <input v-model="form.bairro" type="text" class="input input-bordered" />
        </div>
        <div class="form-control">
            <label class="label"><span class="label-text">Cidade</span></label>
            <input v-model="form.cidade" type="text" class="input input-bordered" />
        </div>
        <div class="form-control">
            <label class="label"><span class="label-text">Estado (UF)</span></label>
            <input v-model="form.estado" type="text" class="input input-bordered" />
        </div>
      </div>

      <div class="mt-8 flex justify-end gap-3">
        <RouterLink :to="{ name: 'tutors.index' }" class="btn btn-ghost">Cancelar</RouterLink>
        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTutorById, updateTutor } from '@/services/tutorsService';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const form = ref({
    id: null,
    nome: '', // Padronizado para 'nome'
    logradouro: '',
    numero: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: ''
});

onMounted(async () => {
    try {
        const tutor = await getTutorById(route.params.id);
        if (tutor) {
            form.value = {
                id: tutor.id,
                // CORREÇÃO: Carrega do banco 'nome'. Se for antigo usa 'nomeCompleto' como fallback
                nome: tutor.nome || tutor.nomeCompleto,
                ...tutor.endereco
            };
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar tutor.');
    } finally {
        loading.value = false;
    }
});

const salvarAlteracoes = async () => {
    try {
        const tutorAtualizado = {
            id: Number(form.value.id),
            nome: form.value.nome, // Salva como 'nome'
            endereco: {
                logradouro: form.value.logradouro,
                numero: form.value.numero,
                bairro: form.value.bairro,
                cep: form.value.cep,
                cidade: form.value.cidade,
                estado: form.value.estado,
            },
            telefones: [] // Se quiser manter telefones, precisa carregar eles no onMounted também
        };

        await updateTutor(tutorAtualizado);
        alert('Tutor atualizado com sucesso!');
        router.push({ name: 'tutors.index' });
    } catch (error) {
        console.error(error);
        alert('Erro ao atualizar tutor.');
    }
}
</script>
