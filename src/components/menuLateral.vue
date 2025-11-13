<template>
  <div class="mx-3">
    <ul class="menu bg-base-200 rounded-box w-56">
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'tutors.index' }">Tutores</router-link></li>
      <li><router-link to="/pets">Pets</router-link></li>
      <li><router-link to="/about">Sobre nós</router-link></li>
      <li><router-link to="/contact">Contato</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
