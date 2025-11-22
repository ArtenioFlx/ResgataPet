
<template>
  <div class="p-6 max-w-xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Cadastrar nova ONG</h2>

    <form class="flex flex-col gap-4" @submit.prevent="salvarOng">

      <input v-model="nome" type="text" placeholder="Nome da ONG" class="input input-bordered w-full" />

      <input v-model="email" type="email" placeholder="Email" class="input input-bordered w-full" />

      <input v-model="telefone" type="text" placeholder="Telefone" class="input input-bordered w-full" />

      <input v-model="cidade" type="text" placeholder="Cidade" class="input input-bordered w-full" />

      <input v-model="estado" type="text" placeholder="Estado" class="input input-bordered w-full" />

      <textarea v-model="descricao" placeholder="Descrição" class="textarea textarea-bordered w-full"></textarea>

      <input v-model="imagem" type="text" placeholder="URL da imagem (opcional)" class="input input-bordered w-full" />

      <button class="btn btn-primary w-full">Cadastrar ONG</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addOng } from '@/services/ongsService'
import { useRouter } from 'vue-router'
const router = useRouter()

// Campos do formulário
const nome = ref('')
const email = ref('')
const telefone = ref('')
const cidade = ref('')
const estado = ref('')
const descricao = ref('')
const imagem = ref('')

// Função para salvar a ONG
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

  // Limpar formulário
  nome.value = ''
  email.value = ''
  telefone.value = ''
  cidade.value = ''
  estado.value = ''
  descricao.value = ''
  imagem.value = ''
}
</script>
