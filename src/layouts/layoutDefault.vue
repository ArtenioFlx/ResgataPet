<template>
  <div class="flex h-screen overflow-hidden bg-base-100 relative">

    <!-- Sidebar -->
    <div
      class="h-full bg-base-100 border-r border-base-200 transition-all duration-300 ease-in-out z-30 shrink-0"
      :style="{ width: sidebarAberto ? '16rem' : '0' }"
      :class="{ 'overflow-hidden': !sidebarAberto }"
    >
      <menu-lateral v-if="sidebarAberto" />
    </div>

    <!-- Conteúdo principal -->
    <div class="flex flex-col flex-1 min-w-0 w-full">

      <!-- Navbar superior -->
      <nav-bar
        v-model:estaAberto="sidebarAberto"
        class="z-10 relative"
      />

      <main class="flex-1 overflow-y-auto flex flex-col">
        <div class="flex-1 p-4">
          <router-view />
        </div>
        <FooterPrincipal />
      </main>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import menuLateral from "@/components/MenuLateral.vue";
import navBar from "@/components/NavBar.vue";
import FooterPrincipal from "@/components/FooterPrincipal.vue";

const sidebarAberto = ref(false);
</script>
