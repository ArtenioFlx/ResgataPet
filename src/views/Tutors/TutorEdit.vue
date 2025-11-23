<template>
  <div class="w-full p-6 bg-base-200 min-h-full">
     <div class="mb-4 max-w-xl mx-auto">
      <div class="text-sm breadcrumbs">
        <ul>
            <li><router-link :to="{name: 'tutors.index'}">Tutores</router-link></li>
            <li>Editando</li>
        </ul>
      </div>
    </div>

    <div v-if="form.id" class="max-w-xl mx-auto card bg-base-100 shadow-xl p-6">
      <h2 class="text-2xl font-bold text-primary mb-6">Editando Tutor</h2>

      <form class="flex flex-col gap-3">

        <!-- EDIÇÃO DE FOTO -->
        <div class="flex flex-col items-center mb-4">
           <div class="w-24 h-24 rounded-full bg-base-200 overflow-hidden mb-2 border-2 border-primary shadow-sm">
              <img v-if="form.foto" :src="form.foto" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <span class="text-xs">Sem foto</span>
              </div>
           </div>
           <label class="btn btn-xs btn-outline btn-primary">
              Alterar Foto
              <input type="file" class="hidden" @change="processarImagem" accept="image/*" />
           </label>
        </div>

        <label class="label font-semibold">Dados Pessoais</label>
        <input
          type="text"
          class="input input-bordered w-full"
          placeholder="Nome completo"
          v-model="form.nome"
        />

        <div class="divider my-0"></div>
        <label class="label font-semibold">Endereço</label>

        <input type="text" class="input input-bordered w-full" placeholder="Logradouro" v-model="form.endereco.logradouro" />

        <div class="flex gap-2">
            <div class="w-1/3">
                <input type="text" class="input input-bordered w-full" placeholder="Nº" v-model="form.endereco.numero" />
            </div>
            <div class="w-2/3">
                <input type="text" class="input input-bordered w-full" placeholder="Bairro" v-model="form.endereco.bairro" />
            </div>
        </div>

        <div class="flex gap-2">
             <input type="text" class="input input-bordered w-full" placeholder="CEP" v-model="form.endereco.cep" />
             <input type="text" class="input input-bordered w-full" placeholder="Complemento" v-model="form.endereco.complemento" />
        </div>

        <div class="flex gap-2">
            <div class="w-2/3">
                <input type="text" class="input input-bordered w-full" placeholder="Cidade" v-model="form.endereco.cidade" />
            </div>
            <div class="w-1/3">
                <input type="text" class="input input-bordered w-full" placeholder="UF" v-model="form.endereco.estado" />
            </div>
        </div>

        <button class="btn btn-primary mt-6 w-full" @click.prevent="atualizarTutor">Salvar Alterações</button>
      </form>
    </div>
    <div v-else class="text-center p-10">
      <span class="loading loading-spinner text-primary"></span>
      <p class="mt-2">Carregando dados...</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Localbase from "localbase";
import { converterParaBase64 } from '@/utils/imageUtils';

let db;
const route = useRoute();
const router = useRouter();
const tutorId = route.params.id;

const form = reactive({
  id: '',
  nome: "",
  foto: "",
  endereco: {
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    complemento: "",
    cidade: "",
    estado: "",
  },
  telefones: [],
});

onMounted(async () => {
  db = new Localbase("db");
  try {
      const tutor = await db.collection("tutores").doc({ id: tutorId }).get();
      if (tutor) {
        form.id = tutor.id
        form.nome = tutor.nome;
        form.foto = tutor.foto || "";
        form.endereco = { ...tutor.endereco };
        form.telefones = [...tutor.telefones];
      } else {
        alert("Tutor não encontrado.");
        router.push({ name: 'tutors.index' });
      }
  } catch (error) {
      console.error(error);
  }
});

const processarImagem = async (event) => {
  const arquivo = event.target.files[0];
  if (arquivo) {
    try {
      form.foto = await converterParaBase64(arquivo);
    } catch (error) {
      console.error("Erro ao converter imagem", error);
    }
  }
};

const atualizarTutor = async () => {
  if (!form.nome) {
      alert("O nome é obrigatório!");
      return;
  }

  try {
      await db.collection("tutores").doc({ id: form.id }).update({
          nome: form.nome,
          foto: form.foto,
          endereco: form.endereco,
          telefones: form.telefones
      });

      alert("Tutor atualizado com sucesso!");
      router.push({ name: 'tutors.index' });

  } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao atualizar tutor.");
  }
};
</script>
