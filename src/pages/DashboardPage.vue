<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref<{ name?: string; email: string } | null>(null);

// Simulate loading tickets from localStorage
const tickets = ref([]);
const openCount = ref(0);
const progressCount = ref(0);
const closedCount = ref(0);

onMounted(() => {
  const session = localStorage.getItem("ticketapp_session");
  if (!session) {
    router.push("/auth/login");
    return;
  }

  user.value = JSON.parse(session);

  const storedTickets = JSON.parse(
    localStorage.getItem("ticketapp_tickets") || "[]"
  );
  tickets.value = storedTickets;
  openCount.value = storedTickets.filter(
    (t: any) => t.status === "open"
  ).length;
  progressCount.value = storedTickets.filter(
    (t: any) => t.status === "in_progress"
  ).length;
  closedCount.value = storedTickets.filter(
    (t: any) => t.status === "closed"
  ).length;
});
</script>

<template>
  <Layout>
    <section
      class="py-20 px-6 flex flex-col items-center justify-center max-w-[1440px] mx-auto"
    >
      <h1 class="text-3xl sm:text-4xl font-bold text-blue-700 mb-8 text-center">
        Welcome Back, {{ user?.name || "User" }} 👋
      </h1>

      <p class="text-gray-600 text-center max-w-2xl mb-12">
        Here’s an overview of your current tickets and progress.
      </p>

      <!-- Ticket Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <!-- Open Tickets -->
        <div
          class="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col items-center justify-center hover:shadow-xl transition"
        >
          <h3 class="text-xl font-semibold text-blue-700 mb-2">Open Tickets</h3>
          <p class="text-4xl font-bold text-gray-800">{{ openCount }}</p>
        </div>

        <!-- In Progress Tickets -->
        <div
          class="bg-white rounded-2xl shadow-lg p-8 border border-amber-100 flex flex-col items-center justify-center hover:shadow-xl transition"
        >
          <h3 class="text-xl font-semibold text-amber-600 mb-2">In Progress</h3>
          <p class="text-4xl font-bold text-gray-800">{{ progressCount }}</p>
        </div>

        <!-- Closed Tickets -->
        <div
          class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col items-center justify-center hover:shadow-xl transition"
        >
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Closed</h3>
          <p class="text-4xl font-bold text-gray-800">{{ closedCount }}</p>
        </div>
      </div>

      <div class="mt-12">
        <button
          @click="router.push('/tickets')"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md"
        >
          Manage Tickets
        </button>
      </div>
    </section>
  </Layout>
</template>
