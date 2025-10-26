<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <!-- Absolute full-width Navbar -->
    <header class="absolute top-0 left-0 w-full z-50">
      <Navbar />
    </header>

    <!-- Main content area -->
    <main class="grow pt-20 pb-20">
      <!-- padding to avoid overlap -->
      <div class="container-max">
        <div class="max-w-6xl mx-auto w-full px-4 md:px-8">
          <slot />
        </div>
      </div>
    </main>

    <!-- Absolute full-width Footer -->
    <footer class="bg-blue-700 text-white shadow-inner py-6 text-center z-40">
      <p class="text-sm sm:text-base">
        &copy; 2025 <span class="font-semibold">TicketApp</span> — Built with
        Vue 3 + Tailwind
      </p>
    </footer>
  </div>
</template>
