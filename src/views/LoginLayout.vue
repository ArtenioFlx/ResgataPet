<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-full max-w-sm shadow-xl bg-base-100">
      <div class="card-body">
        <h2 class="text-2xl font-bold text-center text-primary mb-4">Login</h2>

        <form>
          <!-- E-mail -->
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">E-mail</span>
            </label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Senha -->
          <div class="form-control mb-6">
            <label class="label">
              <span class="label-text">Senha</span>
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              class="input input-bordered w-full"
              required
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover text-primary"
                >Esqueceu a senha?</a
              >
            </label>
          </div>

          <!-- Botão -->
          <div class="form-control">
            <button type="submit" class="btn btn-primary w-full">Entrar</button>
          </div>
        </form>

        <div class="divider">ou</div>

        <p class="text-center text-sm">
          Não tem uma conta?
          <a href="#" class="text-primary font-semibold link-hover">Cadastre-se</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
