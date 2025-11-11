<template>
  <div class="max-w-xl mx-auto p-6 bg-base-200 rounded-lg shadow">
    <h2 class="text-2xl font-bold mb-4">
      {{ form.id ? "Editar ONG" : "Cadastrar ONG" }}
    </h2>

    <form @submit.prevent="saveOng" class="grid gap-4">

      <!-- Nome da ONG -->
      <div class="form-control">
        <label class="label">Nome da ONG</label>
        <input v-model="form.nomeOng" type="text" class="input input-bordered" required />
      </div>

      <!-- CNPJ -->
      <div class="form-control">
        <label class="label">CNPJ</label>
        <input v-model="form.cnpj" type="text" class="input input-bordered" required />
      </div>

      <!-- Telefone -->
      <div class="form-control">
        <label class="label">Telefone</label>
        <input v-model="form.telefone" type="text" class="input input-bordered" required />
      </div>

      <!-- Endereço -->
      <div class="form-control">
        <label class="label">Endereço</label>
        <input v-model="form.endereco" type="text" class="input input-bordered" required />
      </div>

      <!-- Email -->
      <div class="form-control">
        <label class="label">E-mail</label>
        <input v-model="form.email" type="email" class="input input-bordered" required />
      </div>

      <!-- Responsável -->
      <div class="form-control">
        <label class="label">Responsável</label>
        <input v-model="form.responsavel" type="text" class="input input-bordered" required />
      </div>

      <!-- Capacidade -->
      <div class="form-control">
        <label class="label">Capacidade Máxima</label>
        <input v-model="form.capacidade" type="number" class="input input-bordered" required />
      </div>

      <!-- Site -->
      <div class="form-control">
        <label class="label">Site</label>
        <input v-model="form.site" type="text" class="input input-bordered" />
      </div>

      <!-- Descrição -->
      <div class="form-control">
        <label class="label">Descrição</label>
        <textarea v-model="form.descricao" class="textarea textarea-bordered"></textarea>
      </div>

      <!-- Botão -->
      <button class="btn btn-primary w-full mt-4">
        {{ form.id ? "Atualizar" : "Cadastrar" }}
      </button>

    </form>
  </div>
</template>


<script>
import { addOng, updateOng } from "../services/ongService.js";

export default {
  name: "OngForm",

  props: {
    ong: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      form: this.ong
        ? { ...this.ong }
        : {
            nomeOng: "",
            cnpj: "",
            telefone: "",
            endereco: "",
            email: "",
            responsavel: "",
            capacidade: "",
            site: "",
            descricao: "",
          },
    };
  },

  methods: {
    async saveOng() {
      if (this.form.id) {
        await updateOng(this.form);
      } else {
        await addOng(this.form);
      }

      this.$emit("saved");
    },
  },
};
</script>
