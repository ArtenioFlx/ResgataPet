<template>
  <div class="p-6">
    <div class="mb-4 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold text-primary">Tutores</h1>
        <p class="text-sm opacity-70">Gerencie os tutores cadastrados</p>
      </div>
      <button class="btn btn-primary" @click="adicionar">
        Adicionar Tutor
      </button>
    </div>

    <div class="card w-full bg-base-100 shadow-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <!-- Cabeçalho -->
          <thead class="bg-base-200">
            <tr>
              <th>Tutor</th>
              <th>Endereço</th>
              <th>Telefones</th>
              <th class="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="tutores.length === 0">
              <td colspan="4" class="text-center p-8 text-gray-500">
                Nenhum tutor encontrado. Clique em adicionar para começar.
              </td>
            </tr>

            <tr v-for="tutor in tutores" :key="tutor.id" class="hover">
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12 bg-base-300">
                      <img
                        v-if="tutor.foto"
                        :src="tutor.foto"
                        alt="Avatar"
                        class="object-cover"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center font-bold text-xl text-primary">
                        {{ tutor.nome ? tutor.nome.charAt(0).toUpperCase() : '?' }}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ tutor.nome }}</div>
                    <div class="text-sm opacity-50">
                      {{ tutor.endereco?.cidade || "Cidade não informada" }} - {{ tutor.endereco?.estado || "UF" }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="max-w-xs truncate">
                {{ tutor.endereco?.logradouro }}, {{ tutor.endereco?.numero }}
                <br />
                <span class="badge badge-ghost badge-sm">
                  {{ tutor.endereco?.bairro }}
                </span>
              </td>
              <td>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="telefone in tutor.telefones"
                    :key="telefone"
                    class="badge badge-outline badge-xs"
                  >
                    {{ telefone }}
                  </span>
                  <span v-if="(!tutor.telefones || tutor.telefones.length === 0)" class="text-xs opacity-50">
                    -
                  </span>
                </div>
              </td>
              <th class="text-right">
                <div class="join">
                  <button class="btn btn-ghost btn-xs join-item" @click="editar(tutor.id)">Editar</button>
                  <button class="btn btn-ghost text-error btn-xs join-item" @click="deletar(tutor.id)">Excluir</button>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Localbase from "localbase";

let db;
const tutores = ref([]);
const router = useRouter();

onMounted(() => {
  db = new Localbase("db");
  capturarTutores();
});

const capturarTutores = async () => {
  try {
    tutores.value = await db.collection("tutores").orderBy('nome').get();
  } catch (e) {
    console.error("Erro ao ordenar tutores:", e);
    tutores.value = await db.collection("tutores").get();
  }
};

const adicionar = () => {
  router.push({ name: "tutors.add" });
};

const editar = (id) => {
  router.push({ name: "tutors.edit", params: { id } });
};

const deletar = async (id) => {
  if(confirm("Tem certeza que deseja excluir este tutor?")) {
    await db.collection("tutores").doc({ id: id }).delete();
    capturarTutores();
  }
};
</script>
