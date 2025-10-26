<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { signupSchema, type SignupData } from "@/types/auth";
import { toast } from "vue-sonner";

const router = useRouter();

// Setup form
const { handleSubmit, errors, resetForm } = useForm<SignupData>({
  validationSchema: toTypedSchema(signupSchema),
});

// Define fields
const { value: name } = useField<SignupData["name"]>("name");
const { value: email } = useField<SignupData["email"]>("email");
const { value: password } = useField<SignupData["password"]>("password");

// Handle form submission
const onSubmit = handleSubmit((data) => {
  try {
    const stored = localStorage.getItem("ticketapp_users");
    const users = stored ? JSON.parse(stored) : [];

    // Prevent duplicate emails
    if (users.some((u: any) => u.email === data.email)) {
      toast.error("Email already registered.");
      return;
    }

    users.push(data);
    localStorage.setItem("ticketapp_users", JSON.stringify(users));

    toast.success("Signup successful!");
    resetForm();
    setTimeout(() => router.push("/auth/login"), 800);
  } catch (err) {
    console.error("Signup error:", err);
    toast.error("Something went wrong during signup.");
  }
});
</script>

<template>
  <Layout>
    <div class="flex flex-col items-center justify-center py-24">
      <div
        class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-blue-100"
      >
        <h2 class="text-2xl font-bold text-blue-700 text-center mb-6">
          Create Account
        </h2>

        <form @submit.prevent="onSubmit" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-gray-700 mb-1">Full Name</label>
            <input
              v-model="name"
              type="text"
              placeholder="John Doe"
              autocomplete="name"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <p v-if="errors.name" class="text-red-600 text-sm mt-1">
              {{ errors.name }}
            </p>
          </div>

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
              autocomplete="new-password"
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
            Sign Up
          </button>
        </form>

        <p class="text-center text-sm text-gray-600 mt-4">
          Already have an account?
          <span
            class="text-blue-600 cursor-pointer hover:underline"
            @click="router.push('/auth/login')"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  </Layout>
</template>
