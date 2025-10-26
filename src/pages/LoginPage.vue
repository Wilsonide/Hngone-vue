<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { loginSchema, type LoginData } from "@/types/auth";
import { toast } from "vue-sonner";

const router = useRouter();

// Initialize form with Zod validation
const { handleSubmit, errors } = useForm<LoginData>({
  validationSchema: toTypedSchema(loginSchema),
});

// Writable fields
const { value: email } = useField<LoginData["email"]>("email");
const { value: password } = useField<LoginData["password"]>("password");

// Handle form submission
const onSubmit = handleSubmit((data) => {
  try {
    const stored = localStorage.getItem("ticketapp_users");
    const users = stored ? JSON.parse(stored) : [];

    // Find matching user
    const user = users.find(
      (u: LoginData) => u.email === data.email && u.password === data.password
    );

    if (user) {
      localStorage.setItem("ticketapp_session", JSON.stringify(user));
      toast.success("Login successful!");
      router.push("/dashboard");
    } else {
      toast.error("Invalid email or password.");
    }
  } catch (err) {
    console.error("Login error:", err);
    toast.error("Something went wrong during login.");
  }
});
</script>

<template>
  <Layout>
    <div class="flex flex-col items-center justify-center py-24">
      <div
        class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-blue-100"
      >
        <h2 class="text-2xl font-bold text-blue-700 text-center mb-6">Login</h2>

        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter password"
              autocomplete="current-password"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <p v-if="errors.password" class="text-red-600 text-sm mt-1">
              {{ errors.password }}
            </p>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p class="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?
          <span
            class="text-blue-600 cursor-pointer hover:underline"
            @click="router.push('/auth/signup')"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  </Layout>
</template>
