<script setup lang="ts">
import { ref, onMounted } from "vue";
import Layout from "@/components/Layout.vue";
import { nanoid } from "nanoid";
import { useRouter } from "vue-router";
import { Toaster, toast } from "vue-sonner";

interface Ticket {
  id?: string;
  title: string;
  description?: string;
  status: "open" | "in_progress" | "closed";
}

const router = useRouter();
const tickets = ref<Ticket[]>([]);
const showEditBox = ref(false);
const editTicket = ref<Ticket | null>(null);
const editForm = ref<Ticket>({ title: "", description: "", status: "open" });

const newTicket = ref<Ticket>({
  title: "",
  description: "",
  status: "open",
});
const createErrors = ref<{ title?: string }>({});
const editErrors = ref<{ title?: string }>({});

onMounted(() => {
  const session = localStorage.getItem("ticketapp_session");
  if (!session) {
    toast.error("Unauthorized access — please log in.", { duration: 3000 });
    router.push("/auth/login");
    return;
  }
  const stored = JSON.parse(localStorage.getItem("ticketapp_tickets") || "[]");
  tickets.value = stored;
});

function saveTickets(updated: Ticket[]) {
  tickets.value = updated;
  localStorage.setItem("ticketapp_tickets", JSON.stringify(updated));
}

function createTicket() {
  createErrors.value = {};
  if (!newTicket.value.title.trim()) {
    createErrors.value.title = "Title is required";
    toast.error("Title is required", {
      duration: 2000,
      position: "top-center",
    });
    return;
  }
  const ticket = { ...newTicket.value, id: nanoid() };
  saveTickets([...tickets.value, ticket]);
  newTicket.value = { title: "", description: "", status: "open" };
  toast.success("Ticket created successfully!", {
    duration: 2000,
    position: "top-center",
  });
}

function deleteTicket(id: string) {
  if (confirm("Delete this ticket?")) {
    const updated = tickets.value.filter((t) => t.id !== id);
    saveTickets(updated);
    toast.success("Ticket deleted successfully!", {
      duration: 2000,
      position: "top-center",
    });
  }
}

function openEditBox(ticket: Ticket) {
  editTicket.value = { ...ticket };
  editForm.value = { ...ticket }; // copy for safe editing
  editErrors.value = {};
  showEditBox.value = true;
}

function updateTicket() {
  if (!editTicket.value) return;

  editErrors.value = {};
  if (!editForm.value.title?.trim()) {
    editErrors.value.title = "Title is required";
    toast.error("Title is required", {
      duration: 2000,
      position: "top-center",
    });
    return;
  }

  const updated = tickets.value.map((t) =>
    t.id === editTicket.value!.id
      ? { ...editForm.value, id: editTicket.value!.id }
      : t
  );

  saveTickets(updated);
  showEditBox.value = false;
  editTicket.value = null;
  toast.success("Ticket updated successfully!", {
    duration: 2000,
    position: "top-center",
  });
}

function statusColor(status: Ticket["status"]) {
  const colors: Record<Ticket["status"], string> = {
    open: "bg-green-100 text-green-700",
    in_progress: "bg-yellow-100 text-yellow-700",
    closed: "bg-gray-100 text-gray-700",
  };
  return colors[status];
}
</script>

<template>
  <Layout>
    <Toaster position="top-center" rich-colors expand />
    <section class="py-16 max-w-[1440px] mx-auto px-6">
      <h1 class="text-3xl font-bold text-blue-700 mb-10 text-center">
        Ticket Management
      </h1>

      <!-- Create Ticket Form -->
      <div
        class="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 max-w-2xl mx-auto mb-10"
      >
        <h2 class="text-xl font-semibold mb-4 text-gray-700 text-center">
          Create New Ticket
        </h2>
        <form @submit.prevent="createTicket" class="space-y-4">
          <div>
            <input
              v-model="newTicket.title"
              placeholder="Ticket title"
              :class="[
                'w-full border rounded-lg p-2 focus:ring-2',
                createErrors.title
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400',
              ]"
            />
            <p v-if="createErrors.title" class="text-red-500 text-sm mt-1">
              {{ createErrors.title }}
            </p>
          </div>
          <textarea
            v-model="newTicket.description"
            placeholder="Description (optional)"
            rows="3"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <select
            v-model="newTicket.status"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Create Ticket
          </button>
        </form>
      </div>

      <!-- Ticket Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-if="tickets.length === 0"
          class="col-span-full text-gray-500 text-center"
        >
          No tickets available.
        </div>
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="relative bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition"
        >
          <div>
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold text-lg text-gray-800">
                {{ ticket.title }}
              </h3>
              <span
                :class="statusColor(ticket.status)"
                class="px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ ticket.status.replace("_", " ") }}
              </span>
            </div>
            <p v-if="ticket.description" class="text-gray-600 text-sm">
              {{ ticket.description }}
            </p>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <button
              class="px-4 py-1 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              @click="openEditBox(ticket)"
            >
              Edit
            </button>
            <button
              class="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
              @click="deleteTicket(ticket.id!)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Edit Modal -->
      <transition name="fade">
        <div
          v-if="showEditBox"
          class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <div
            class="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md relative"
          >
            <button
              class="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              @click="showEditBox = false"
            >
              ✕
            </button>
            <h3 class="text-lg font-semibold text-gray-800 mb-4 text-center">
              Edit Ticket
            </h3>
            <form @submit.prevent="updateTicket" class="space-y-4">
              <div>
                <input
                  v-model="editForm.title"
                  placeholder="Title"
                  :class="[
                    'w-full border rounded-lg p-2 focus:ring-2',
                    editErrors.title
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-blue-400',
                  ]"
                />
                <p v-if="editErrors.title" class="text-red-500 text-sm mt-1">
                  {{ editErrors.title }}
                </p>
              </div>
              <textarea
                v-model="editForm.description"
                placeholder="Description"
                rows="3"
                class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <select
                v-model="editForm.status"
                class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </transition>
    </section>
  </Layout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
