<template>
  <div class="w-full">
     <div class="mb-2">
      <breadcrumbs>
        <template v-slot:model> Tutores </template>
        <template v-slot:action> Adicionar Tutor </template>
      </breadcrumbs>
    </div>

    <fieldset class="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4 shadow-sm">
      <legend class="fieldset-legend font-bold text-lg px-2">Dados do Tutor</legend>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="form-control md:col-span-2">
            <label class="label"><span class="label-text">Nome Completo</span></label>
            <input
                type="text"
                class="input input-bordered w-full"
                placeholder="Ex: João Silva"
                v-model="form.nome"
            />
          </div>

          <div class="form-control md:col-span-1">
            <label class="label"><span class="label-text">Logradouro</span></label>
            <input type="text" class="input input-bordered w-full" placeholder="Rua, Avenida..." v-model="form.endereco.logradouro" />
          </div>

          <div class="form-control md:col-span-1">
            <label class="label"><span class="label-text">Número</span></label>
            <input type="text" class="input input-bordered w-full" placeholder="123" v-model="form.endereco.numero" />
          </div>

          <div class="form-control">
             <label class="label"><span class="label-text">Bairro</span></label>
             <input type="text" class="input input-bordered w-full" placeholder="Bairro" v-model="form.endereco.bairro" />
          </div>

          <div class="form-control">
             <label class="label"><span class="label-text">CEP</span></label>
             <input type="text" class="input input-bordered w-full" placeholder="00000-000" v-model="form.endereco.cep" />
          </div>

           <div class="form-control">
             <label class="label"><span class="label-text">Cidade</span></label>
             <input type="text" class="input input-bordered w-full" placeholder="Cidade" v-model="form.endereco.cidade" />
          </div>

           <div class="form-control">
             <label class="label"><span class="label-text">Estado</span></label>
             <input type="text" class="input input-bordered w-full" placeholder="UF" v-model="form.endereco.estado" />
          </div>

           <div class="form-control md:col-span-2">
             <label class="label"><span class="label-text">Complemento</span></label>
             <input type="text" class="input input-bordered w-full" placeholder="Apto, Bloco..." v-model="form.endereco.complemento" />
          </div>
      </div>

      <div class="mt-6 flex justify-end gap-2">
         <button class="btn btn-ghost" @click="$router.back()">Cancelar</button>
         <button class="btn btn-primary" @click="adicionarTutor" :disabled="loading">
            {{ loading ? 'Salvando...' : 'Adicionar Tutor' }}
         </button>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import breadcrumbs from "@/components/Breadcrumbs.vue";
import { createTutor } from "@/controllers/tutorsController";

const router = useRouter();
const loading = ref(false);

// CORREÇÃO: Objeto reativo estruturado corretamente
const form = reactive({
  nome: "", // Padronizado para 'nome'
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

const adicionarTutor = async () => {
  // Validação local
  if(!form.nome) {
      alert("O nome é obrigatório!");
      return;
  }

  loading.value = true;

  // Monta o objeto para enviar ao Controller
  const novoTutor = {
      nome: form.nome,

      // TRUQUE DE COMPATIBILIDADE:
      // Envia também 'nomeCompleto' para passar na validação antiga do Controller
      // caso você ainda não tenha alterado o arquivo tutorsController.js
      nomeCompleto: form.nome,

      endereco: { ...form.endereco },
      telefones: [],
  };

  try {
    await createTutor(novoTutor);
    alert("Tutor adicionado com sucesso!");
    router.push({ name: "tutors.index" });
  } catch (error) {
    console.error("Erro ao adicionar:", error);
    alert("Erro ao adicionar tutor: " + error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
