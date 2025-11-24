<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-4">
    <div class="card w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">

        <h2 class="text-2xl font-bold text-center text-info mb-2">Recuperar Senha</h2>
        <p class="text-sm text-center mb-6 opacity-70">
          Digite seu e-mail abaixo para receber um link de redefinição de senha.
        </p>

        <form @submit.prevent="enviarLink">
          <!-- E-mail -->
          <div class="form-control mb-6">
            <label class="label"><span class="label-text">E-mail cadastrado</span></label>
            <input
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Botão Enviar -->
          <button type="submit" class="btn btn-info w-full text-lg text-white">
            Enviar Link
          </button>
        </form>

        <div class="mt-6 text-center">
          <RouterLink to="/login" class="link link-hover text-sm">
            ← Voltar para o Login
          </RouterLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// Importando funções reativas e o roteador do Vue
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')

const enviarLink = () => {
  if (email.value) {
    alert(`Um link de recuperação foi enviado para ${email.value}`)
    router.push('/login')
  }
}
</script>
