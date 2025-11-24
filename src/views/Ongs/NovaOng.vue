<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Cadastrar nova ONG</h2>

    <form class="flex flex-col gap-4" @submit.prevent="salvarOng">

      <input v-model="nome" type="text" placeholder="Nome da ONG" class="input input-bordered w-full" required />

      <input v-model="email" type="email" placeholder="Email" class="input input-bordered w-full" required />

      <input v-model="telefone" type="text" placeholder="Telefone" class="input input-bordered w-full" />

      <div class="flex gap-2">
        <input v-model="cidade" type="text" placeholder="Cidade" class="input input-bordered w-1/2" />
        <input v-model="estado" type="text" placeholder="UF" class="input input-bordered w-1/2" />
      </div>

      <textarea v-model="descricao" placeholder="Descrição da ONG..." class="textarea textarea-bordered w-full h-24"></textarea>

      <!-- CAMPO DE UPLOAD DE IMAGEM -->
      <div class="form-control w-full">
        <label class="label">
          <span class="label-text">Logo ou Imagem de Perfil</span>
        </label>
        <input
          type="file"
          @change="processarImagem"
          class="file-input file-input-bordered file-input-primary w-full"
          accept="image/*"
        />
      </div>

      <!-- PRÉ-VISUALIZAÇÃO DA IMAGEM -->
      <div v-if="imagem" class="flex justify-center mt-2">
        <img :src="imagem" alt="Preview" class="w-32 h-32 object-cover rounded-full border-4 border-primary shadow-lg" />
      </div>

      <button class="btn btn-primary w-full mt-4">Cadastrar ONG</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addOng } from '@/services/ongsService'
import { useRouter } from 'vue-router'
import { converterParaBase64 } from '@/utils/imageUtils' // Adicionada função para converter imagem para Base64


const router = useRouter()

// Campos do formulário
const nome = ref('')
const email = ref('')
const telefone = ref('')
const cidade = ref('')
const estado = ref('')
const descricao = ref('')
const imagem = ref('') // Agora guardará o Base64

// Função acionada quando o usuário seleciona um arquivo
const processarImagem = async (event) => {
  const arquivo = event.target.files[0]
  if (arquivo) {
    try {
      const base64 = await converterParaBase64(arquivo)
      imagem.value = base64 // Salva a string gigante na variável imagem
    } catch (error) {
      alert("Erro ao processar imagem")
      console.error(error)
    }
  }
}

const salvarOng = async () => {
  const novaOng = {
    nome: nome.value,
    email: email.value,
    telefone: telefone.value,
    cidade: cidade.value,
    estado: estado.value,
    descricao: descricao.value,
    imagem: imagem.value
  }

  await addOng(novaOng)
  alert('ONG cadastrada com sucesso!')
  router.push('/ongs')
}
</script>
