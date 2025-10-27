<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const router = useRouter();
const isLoggedIn = ref(false);
const menuOpen = ref(false); // NEW: toggle for mobile menu

onMounted(() => {
  const session = localStorage.getItem("ticketapp_session");
  isLoggedIn.value = !!session;
});

function handleLogout() {
  if (confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("ticketapp_session");
    toast.success("You have been logged out");
    isLoggedIn.value = false;
    router.push("/");
    menuOpen.value = false;
  }
}

function closeMenu() {
  menuOpen.value = false;
}
</script>

<template>
  <nav class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
    <div
      class="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center"
    >
      <!-- Logo -->
      <router-link
        to="/"
        class="text-2xl font-bold text-blue-700 hover:text-blue-800 transition"
      >
        TicketApp_vue
      </router-link>

      <!-- Hamburger Button (Mobile) -->
      <button
        class="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
        @click="menuOpen = !menuOpen"
      >
        <svg
          v-if="!menuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-6">
        <router-link
          to="/"
          class="font-medium text-gray-700 hover:text-blue-600 pb-1 transition"
          active-class="text-blue-600 border-b-2 border-blue-600"
        >
          Home
        </router-link>

        <router-link
          to="/dashboard"
          class="font-medium text-gray-700 hover:text-blue-600 pb-1 transition"
          active-class="text-blue-600 border-b-2 border-blue-600"
        >
          Dashboard
        </router-link>

        <router-link
          to="/tickets"
          class="font-medium text-gray-700 hover:text-blue-600 pb-1 transition"
          active-class="text-blue-600 border-b-2 border-blue-600"
        >
          Tickets
        </router-link>

        <!-- Auth -->
        <div>
          <button
            v-if="isLoggedIn"
            @click="handleLogout"
            class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Logout
          </button>
          <router-link
            v-else
            to="/auth/login"
            class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Login
          </router-link>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown -->
    <transition name="fade">
      <div
        v-if="menuOpen"
        class="md:hidden border-t border-gray-200 bg-white px-6 py-4 flex flex-col gap-4"
      >
        <router-link
          to="/"
          class="font-medium text-gray-700 hover:text-blue-600 pb-1 transition"
          active-class="text-blue-600 border-b-2 border-blue-600"
          @click="closeMenu"
        >
          Home
        </router-link>

        <router-link
          to="/dashboard"
          class="font-medium text-gray-700 hover:text-blue-600 pb-1 transition"
          active-class="text-blue-600 border-b-2 border-blue-600"
          @click="closeMenu"
        >
          Dashboard
        </router-link>

        <router-link
          to="/tickets"
          class="font-medium text-gray-700 hover:text-blue-600 pb-1 transition"
          active-class="text-blue-600 border-b-2 border-blue-600"
          @click="closeMenu"
        >
          Tickets
        </router-link>

        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          Logout
        </button>

        <router-link
          v-else
          to="/auth/login"
          @click="closeMenu"
          class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-center"
        >
          Login
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
/* Optional: smooth fade animation for dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
