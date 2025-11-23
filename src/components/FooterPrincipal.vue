<template>
  <footer class="footer footer-center bg-primary text-primary-content p-10 mt-auto">
    <aside>
      <!-- Ícone de Patinha (SVG) -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="inline-block w-12 h-12 mb-2"
      >
        <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" style="display:none" /> <!-- Ocultando path antigo de cadeado se houver -->
        <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" style="display:none"/>
        <!-- Path da Patinha -->
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 6a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm9 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM12 10.5a3 3 0 100-6 3 3 0 000 6zM5.25 12a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm9.75 0a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
      </svg>

      <p class="font-bold text-lg">
        Resgata Pet
        <br />
        Conectando corações e salvando vidas desde 2025.
      </p>
      <p>Copyright © {{ new Date().getFullYear() }} - Todos os direitos reservados</p>
    </aside>

    <nav>
      <div class="grid grid-flow-col gap-4">
        <!-- Twitter / X -->
        <a class="cursor-pointer hover:text-secondary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current">
            <path
              d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>

        <!-- Youtube -->
        <a class="cursor-pointer hover:text-secondary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current">
            <path
              d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>

        <!-- Facebook -->
        <a class="cursor-pointer hover:text-secondary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current">
            <path
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
      </div>
    </nav>
  </footer>
</template>

<script setup>
</script>
