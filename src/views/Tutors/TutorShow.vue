<template>
  <div class="p-6">
    <div class="text-sm breadcrumbs mb-4">
      <ul>
        <li><router-link :to="{name: 'tutors.index'}">Tutores</router-link></li>
        <li>Detalhes</li>
      </ul>
    </div>

    <div class="card bg-base-100 shadow-xl p-6">
        <pre class="bg-base-200 p-4 rounded">{{ $route.params.id }}</pre>
        <p class="mt-4 opacity-70">Detalhes em construção...</p>
    </div>
  </div>
</template>
