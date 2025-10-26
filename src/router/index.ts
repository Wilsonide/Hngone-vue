import { createRouter, createWebHistory } from "vue-router";

// ✅ Import all your pages
import LandingPage from "@/pages/LandingPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import TicketManagement from "@/pages/TicketManagementPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/auth/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/auth/signup",
    name: "Signup",
    component: SignupPage,
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: TicketManagement,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage, // 👈 Added route
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/", // fallback to home
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
