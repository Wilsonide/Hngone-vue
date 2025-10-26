<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 relative">
    <RouterView />
    <!-- Router outlet (renders Layout.vue and pages inside it) -->
  </div>
</template>

<style>
html,
body {
  scroll-behavior: smooth;
  font-family: "Inter", sans-serif;
  background-color: #f9fafb;
  color: #1f2937;
}
</style>
