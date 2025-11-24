<template>
  <div class="p-6 max-w-3xl mx-auto">
    <div v-if="ong" class="bg-white shadow-lg rounded-2xl p-6">

      <!-- Imagem -->
      <img
        :src="ong.imagem || 'https://via.placeholder.com/600x300?text=ONG+Sem+Imagem'"
        alt="Imagem da ONG"
        class="w-full h-60 object-cover rounded-xl mb-4"
      />

      <!-- Nome -->
      <div>
        <h1 v-if="!editando" class="text-3xl font-bold mb-2">
          {{ ong.nome }}
        </h1>

        <input
          v-else
          v-model="ong.nome"
          class="input input-bordered w-full mb-2"
          placeholder="Nome da ONG"
        />
      </div>

      <!-- Cidade e Estado -->
      <div class="mb-4">
        <p v-if="!editando" class="text-gray-600">
          📍 {{ ong.cidade }} - {{ ong.estado }}
        </p>

        <div v-else class="flex gap-2">
          <input
            v-model="ong.cidade"
            class="input input-bordered w-1/2"
            placeholder="Cidade"
          />
          <input
            v-model="ong.estado"
            class="input input-bordered w-1/2"
            placeholder="Estado"
          />
        </div>
      </div>

      <!-- Descrição -->
      <div class="mb-6">
        <p v-if="!editando" class="text-lg leading-relaxed">
          {{ ong.descricao }}
        </p>

        <textarea
          v-else
          v-model="ong.descricao"
          class="textarea textarea-bordered w-full h-32"
          placeholder="Descrição da ONG"
        ></textarea>
      </div>

      <!-- Contatos -->
      <div class="space-y-3 mt-4">
        <!-- Email -->
        <div>
          <p v-if="!editando"><strong>Email:</strong> {{ ong.email }}</p>

          <input
            v-else
            v-model="ong.email"
            type="email"
            class="input input-bordered w-full"
            placeholder="Email da ONG"
          />
        </div>

        <!-- Telefone -->
        <div>
          <p v-if="!editando"><strong>Telefone:</strong> {{ ong.telefone }}</p>

          <input
            v-else
            v-model="ong.telefone"
            type="text"
            class="input input-bordered w-full"
            placeholder="Telefone da ONG"
          />
        </div>
      </div>

          <!-- Botões quando ESTIVER editando (menores) -->
    <div v-if="editando" class="flex gap-3 mt-6">
      <button
        @click="salvarEdicao"
        class="btn btn-success btn-sm w-1/2"
      >
        Salvar
      </button>

      <button
        @click="cancelarEdicao"
        class="btn btn-outline btn-sm w-1/2"
      >
        Cancelar
      </button>
    </div>


      <!--Botões quando NÃO estiver editando -->
      <div v-if="!editando" class="flex flex-col gap-2 mt-6">

        <button @click="router.back()" class="btn btn-primary w-full">
          Voltar
        </button>

        <button @click="toggleFavorito" class="btn btn-warning w-full">
          {{ ong.favorito ? "Remover dos favoritos" : "❤️ Favoritar" }}
        </button>

        <button @click="ativarEdicao" class="btn btn-info w-full">
          Editar ONG
        </button>

        <button @click="removerOng" class="btn btn-error w-full">
          Deletar ONG
        </button>

      </div>

    </div>

    <div v-else class="text-center p-10 text-gray-500">
      Carregando detalhes...
    </div>

  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getOngById, deleteOng, updateOng } from '@/services/ongsService'

const backup = ref({})
const editando = ref(false)
const route = useRoute()
const router = useRouter()
const ong = ref(null)

onMounted(async () => {
  ong.value = await getOngById(route.params.id)
})

const ativarEdicao = () => {
  backup.value = { ...ong.value }
  editando.value = true
}

const salvarEdicao = async () => {
  await updateOng(ong.value)
  alert("Alterações salvas!")
  editando.value = false
}

const cancelarEdicao = () => {
  ong.value = { ...backup.value }
  editando.value = false
}

const removerOng = async () => {
  const confirmar = confirm("Tem certeza que deseja deletar esta ONG?")
  if (!confirmar) return

  await deleteOng(route.params.id)
  alert("ONG deletada com sucesso!")
  router.push("/ongs")
}

const toggleFavorito = async () => {
  ong.value.favorito = !ong.value.favorito
  await updateOng(ong.value)
  alert(
    ong.value.favorito
      ? "Adicionado aos favoritos!"
      : "Removido dos favoritos!"
  )
}
</script>
