<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Lista de ONGs</h1>

    <!-- Botão para abrir modal -->
    <button class="btn btn-primary mb-4" @click="openCreateModal">
      Cadastrar Nova ONG
    </button>

    <!-- Tabela -->
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="ong in ongs" :key="ong.id">
            <td>{{ ong.nomeOng }}</td>
            <td>{{ ong.cnpj }}</td>
            <td>{{ ong.telefone }}</td>
            <td>{{ ong.responsavel }}</td>

            <td class="flex gap-2">
              <button class="btn btn-info btn-sm" @click="openEditModal(ong)">
                Editar
              </button>

              <button class="btn btn-error btn-sm" @click="remove(ong.id)">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <input type="checkbox" id="modalOng" class="modal-toggle" v-model="showModal" />

    <div class="modal">
      <div class="modal-box max-w-2xl">

        <h3 class="font-bold text-xl mb-4">
          {{ selectedOng ? "Editar ONG" : "Cadastrar ONG" }}
        </h3>

        <OngForm :ong="selectedOng" @saved="closeModal" />

        <div class="modal-action">
          <label class="btn" @click="closeModal">Fechar</label>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getOngs, deleteOng } from "../services/ongService.js";
import OngForm from "../components/OngForm.vue";

export default {
  name: "OngList",
  components: { OngForm },

  data() {
    return {
      ongs: [],
      showModal: false,
      selectedOng: null,
    };
  },

  async created() {
    await this.loadOngs();
  },

  methods: {
    async loadOngs() {
      this.ongs = await getOngs();
    },

    openCreateModal() {
      this.selectedOng = null;
      this.showModal = true;
    },

    openEditModal(ong) {
      this.selectedOng = { ...ong };
      this.showModal = true;
    },

    async remove(id) {
      if (confirm("Tem certeza que deseja excluir esta ONG?")) {
        await deleteOng(id);
        await this.loadOngs();
      }
    },

    async closeModal() {
      this.showModal = false;
      await this.loadOngs();
    }
  }
};
</script>
