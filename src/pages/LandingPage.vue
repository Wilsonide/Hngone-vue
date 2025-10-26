<script setup lang="ts">
import Layout from "@/components/Layout.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

const router = useRouter();

onMounted(() => {
  AOS.init({ duration: 800, once: true });
});
</script>

<template>
  <Layout>
    <main class="overflow-hidden">
      <!-- ✅ Hero Section -->
      <section
        class="relative flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-20 py-16 md:py-24 max-w-[1440px] mx-auto px-6"
      >
        <!-- ✅ Text Content -->
        <div
          class="flex-1 text-center md:text-left relative z-20"
          data-aos="fade-right"
        >
          <h1
            class="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-900"
          >
            Simplify Your Event Experience with
            <span class="text-blue-700"> TicketApp </span>
          </h1>

          <p class="text-lg md:text-xl text-gray-600 mb-8">
            Book, manage, and explore your favorite events — all in one easy
            place.
          </p>

          <div class="flex justify-center md:justify-start gap-4">
            <button
              @click="router.push('/auth/signup')"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </button>

            <button
              @click="router.push('/auth/login')"
              class="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </div>
        </div>

        <!-- ✅ Hero Image + Circle -->
        <div class="flex-1 relative z-10" data-aos="fade-left">
          <img
            src="/assets/hero-illustration.svg"
            alt="Event illustration"
            class="w-full max-w-md mx-auto relative z-20"
          />

          <!-- ✅ Blue Circle -->
          <div
            class="absolute -left-24 top-1/3 w-56 h-56 bg-blue-100 rounded-full blur-3xl opacity-70 -z-10"
          ></div>
        </div>
      </section>

      <!-- ✅ Wavy Divider -->
      <div class="relative w-full -mt-12">
        <svg
          class="w-full h-32 md:h-48"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#e0f2fe"
            fill-opacity="1"
            d="M0,192L48,192C96,192,192,192,288,181.3C384,171,480,149,576,138.7C672,128,768,128,864,138.7C960,149,1056,171,1152,192C1248,213,1344,235,1392,245.3L1440,256V320H0Z"
          ></path>
        </svg>
      </div>

      <!-- ✅ Features Section -->
      <section class="py-16 md:py-24 bg-blue-50">
        <div class="text-center mb-12" data-aos="fade-up">
          <h2 class="text-3xl font-bold text-gray-800">
            Why Choose TicketApp?
          </h2>
          <p class="text-gray-600 mt-2">
            Discover the features that make event management easy and fun.
          </p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <!-- Feature 1 -->
          <div
            class="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition"
          >
            <div
              class="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4 text-2xl"
            >
              🎫
            </div>
            <h3 class="text-xl font-semibold mb-2">Easy Ticket Booking</h3>
            <p class="text-gray-600">
              Book tickets to your favorite events with just a few clicks.
            </p>
          </div>

          <!-- Feature 2 -->
          <div
            class="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition"
          >
            <div
              class="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4 text-2xl"
            >
              📅
            </div>
            <h3 class="text-xl font-semibold mb-2">Event Management</h3>
            <p class="text-gray-600">
              Manage and organize all your upcoming events effortlessly.
            </p>
          </div>

          <!-- Feature 3 -->
          <div
            class="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition"
          >
            <div
              class="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4 text-2xl"
            >
              ⭐
            </div>
            <h3 class="text-xl font-semibold mb-2">Personalized Experience</h3>
            <p class="text-gray-600">
              Get recommendations and updates tailored to your preferences.
            </p>
          </div>
        </div>
      </section>
    </main>
  </Layout>
</template>
