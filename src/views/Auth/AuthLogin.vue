<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-4">
    <div class="card w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">

        <h2 class="text-3xl font-bold text-center text-primary mb-6">Login</h2>

        <form @submit.prevent="fazerLogin">
          <!-- E-mail -->
          <div class="form-control mb-4">
            <label class="label"><span class="label-text">E-mail</span></label>
            <input
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Senha -->
          <div class="form-control mb-2">
            <label class="label"><span class="label-text">Senha</span></label>
            <input
              v-model="senha"
              type="password"
              placeholder="******"
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Link Esqueceu Senha -->
          <div class="flex justify-end mb-6">
            <RouterLink
              to="/forgot-password"
              class="link link-hover text-sm text-primary"
            >
              Esqueceu a senha?
            </RouterLink>
          </div>

          <!-- Botão Entrar -->
          <button type="submit" class="btn btn-primary w-full text-lg" :disabled="carregando">
            {{ carregando ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <div class="divider">ou</div>

        <!-- Link Cadastro -->
        <p class="text-center">
          Não tem uma conta?
          <RouterLink to="/register" class="link link-primary font-bold">
            Cadastre-se
          </RouterLink>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Localbase from 'localbase'

const router = useRouter()
const email = ref('')
const senha = ref('')
const carregando = ref(false)

let db
onMounted(() => {
  db = new Localbase('db')
})

const fazerLogin = async () => {
  if (email.value && senha.value) {
    carregando.value = true

    try {
      // Busca usuário com este e-mail
      const usuario = await db.collection('users').doc({ email: email.value }).get()

      if (usuario) {
        // Verifica a senha
        if (usuario.senha === senha.value) {

            // ============================================
            // SUCESSO! Salva a sessão no LocalStorage
            // ============================================
            const sessaoUsuario = {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                foto: usuario.foto,
                funcao: usuario.funcao,
                desde: usuario.desde
            }
            localStorage.setItem('usuarioSessao', JSON.stringify(sessaoUsuario))

            // Dispara evento para avisar a NavBar que logamos
            window.dispatchEvent(new Event('storage'))

            router.push('/')
        } else {
            alert('Senha incorreta.')
        }
      } else {
        alert('Usuário não encontrado. Verifique o e-mail ou cadastre-se.')
      }
    } catch (error) {
      console.error(error)
      alert('Erro ao fazer login.')
    } finally {
      carregando.value = false
    }

  } else {
    alert('Por favor, preencha todos os campos.')
  }
}
</script>
