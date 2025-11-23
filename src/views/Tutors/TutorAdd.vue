<template>
  <div class="w-full p-6 bg-base-200 min-h-full">
    <div class="max-w-xl mx-auto card bg-base-100 shadow-xl p-6">
      <h2 class="text-2xl font-bold text-primary mb-6">Adicionar Novo Tutor</h2>

      <form class="flex flex-col gap-3" @submit.prevent="adicionarTutor">

        <!-- UPLOAD DE FOTO -->
        <div class="flex flex-col items-center mb-4">
           <div class="w-24 h-24 rounded-full bg-base-200 overflow-hidden mb-2 border-2 border-primary shadow-sm">
              <img v-if="form.foto" :src="form.foto" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                </svg>
              </div>
           </div>
           <label class="btn btn-xs btn-outline btn-primary">
              Carregar Foto
              <input type="file" class="hidden" @change="processarImagem" accept="image/*" />
           </label>
        </div>

        <label class="label font-semibold">Dados Pessoais</label>
        <input
          type="text"
          class="input input-bordered w-full"
          placeholder="Nome completo"
          v-model="form.nomeCompleto"
          required
        />

        <div class="divider my-0"></div>
        <label class="label font-semibold">Endereço</label>

        <input type="text" class="input input-bordered w-full" placeholder="Logradouro" v-model="form.logradouro" />

        <div class="flex gap-2">
            <div class="w-1/3">
                <input type="text" class="input input-bordered w-full" placeholder="Nº" v-model="form.numero" />
            </div>
            <div class="w-2/3">
                <input type="text" class="input input-bordered w-full" placeholder="Bairro" v-model="form.bairro" />
            </div>
        </div>

        <div class="flex gap-2">
          <input type="text" class="input input-bordered w-full" placeholder="CEP" v-model="form.cep" />
          <input type="text" class="input input-bordered w-full" placeholder="Complemento" v-model="form.complemento" />
        </div>

        <div class="flex gap-2">
            <div class="w-2/3">
                <input type="text" class="input input-bordered w-full" placeholder="Cidade" v-model="form.cidade" />
            </div>
            <div class="w-1/3">
                <input type="text" class="input input-bordered w-full" placeholder="UF" v-model="form.estado" />
            </div>
        </div>

        <button class="btn btn-primary mt-6 w-full" type="submit">Salvar Tutor</button>
      </form>
    </div>

    <div class="toast toast-end toast-top" v-if="toastVisible">
      <div class="alert alert-success">
        <span>Tutor <strong>{{ nomeCompletoToast }}</strong> salvo!</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Localbase from "localbase";
import { converterParaBase64 } from '@/utils/imageUtils';
import { useRouter } from 'vue-router';

const router = useRouter();
let db;

onMounted(() => {
  db = new Localbase("db");
});

const toastVisible = ref(false);
const nomeCompletoToast = ref("");

const form = reactive({
  nomeCompleto: "",
  foto: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cep: "",
  complemento: "",
  cidade: "",
  estado: "",
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

const adicionarTutor = async () => {
  if (!form.nomeCompleto) {
      alert("Nome é obrigatório");
      return;
  }

  try {
    await db.collection("tutores").add({
      nome: form.nomeCompleto,
      foto: form.foto,
      endereco: {
        logradouro: form.logradouro,
        numero: form.numero,
        bairro: form.bairro,
        cep: form.cep,
        complemento: form.complemento,
        cidade: form.cidade,
        estado: form.estado,
      },
      telefones: [],
    });

    nomeCompletoToast.value = form.nomeCompleto;
    toastVisible.value = true;

    setTimeout(() => {
      toastVisible.value = false;
      router.push({ name: 'tutors.index' });
    }, 1500);

  } catch (error) {
    console.error("Erro ao adicionar tutor:", error);
  }
};
</script>
