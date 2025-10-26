<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const router = useRouter();
const isLoggedIn = ref(false);

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
  }
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

      <!-- Links -->
      <div class="flex items-center gap-6">
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
  </nav>
</template>
