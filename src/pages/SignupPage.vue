<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import { useRouter } from "vue-router";
import { useForm, defineField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { signupSchema, type SignupData } from "@/types/auth";
import { toast } from "vue-sonner";

const router = useRouter();

// Use `defineField` for writable v-model bindings
const {
  handleSubmit,
  errors,
  resetForm,
  defineField: define,
} = useForm<SignupData>({
  validationSchema: toTypedSchema(signupSchema),
});

const [name, nameProps] = define("name");
const [email, emailProps] = define("email");
const [password, passwordProps] = define("password");

const onSubmit = handleSubmit((data) => {
  try {
    const stored = localStorage.getItem("ticketapp_users");
    const users = stored ? JSON.parse(stored) : [];
    users.push(data);
    localStorage.setItem("ticketapp_users", JSON.stringify(users));
    toast.success("Signup successful!");
    resetForm();
    router.push("/auth/login");
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
              v-bind="nameProps"
              type="text"
              placeholder="John Doe"
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
              v-bind="emailProps"
              type="email"
              placeholder="you@example.com"
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
              v-bind="passwordProps"
              type="password"
              placeholder="Enter password"
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
