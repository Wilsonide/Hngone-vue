# 🎫 TicketApp Vue Frontend

This project is a modern, responsive single-page application built with Vue 3 and TypeScript, designed to simplify event ticket management. It provides a clean interface for user authentication (signup/login) and a dashboard for managing personal tickets with features like creating, updating, and deleting tickets.

## ✨ Features

*   **User Authentication**: Secure signup and login functionality using local storage for session management.
*   **Intuitive Dashboard**: A personalized overview of open, in-progress, and closed tickets.
*   **Ticket Management**: Create new tickets, update existing ones (title, description, status), and delete tickets with ease.
*   **Client-Side Data Persistence**: Utilizes browser's local storage for user and ticket data, simulating backend interaction.
*   **Responsive UI**: Built with Tailwind CSS and Shadcn-Vue components for a consistent and accessible experience across devices.
*   **Form Validation**: Robust form validation implemented using VeeValidate and Zod.
*   **Animations**: Smooth UI transitions and animations powered by AOS (Animate On Scroll) and `@vueuse/motion`.
*   **Notifications**: User-friendly toast notifications via `vue-sonner` for actions like login, signup, and ticket operations.

## 🚀 Technologies Used

| Technology         | Description                                        | Link                                                               |
| :----------------- | :------------------------------------------------- | :----------------------------------------------------------------- |
| **Vue.js**         | Progressive JavaScript framework for building UIs. | [Vue.js](https://vuejs.org/)                                       |
| **TypeScript**     | Strongly typed superset of JavaScript.             | [TypeScript](https://www.typescriptlang.org/)                      |
| **Vite**           | Next-generation frontend tooling.                  | [Vite](https://vitejs.dev/)                                        |
| **Tailwind CSS**   | Utility-first CSS framework.                       | [Tailwind CSS](https://tailwindcss.com/)                           |
| **Pinia**          | Intuitive, type-safe, and flexible Vue store.      | [Pinia](https://pinia.vuejs.org/)                                  |
| **Vue Router**     | Official routing library for Vue.js.               | [Vue Router](https://router.vuejs.org/)                            |
| **Zod**            | TypeScript-first schema declaration and validation. | [Zod](https://zod.dev/)                                            |
| **VeeValidate**    | Form validation library for Vue.js.                | [VeeValidate](https://vee-validate.logaretm.com/v4/)               |
| **AOS**            | Animate On Scroll library.                         | [AOS](https://michalsnik.github.io/aos/)                           |
| **VueUse**         | Collection of essential Vue Composition Utilities. | [VueUse](https://vueuse.org/)                                      |
| **Lucide Vue Next** | Beautiful & consistent open-source icon toolkit.   | [Lucide](https://lucide.dev/)                                      |
| **Reka-UI**        | Vue UI component library.                          | [Reka-UI](https://reka-ui.dev/)                                    |
| **Vue Sonner**     | Opinionated toast component.                       | [Vue Sonner](https://vue-sonner.vercel.app/)                       |

## 🛠️ Getting Started

Follow these steps to set up and run the TicketApp Vue Frontend on your local machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/TicketApp-Vue-Frontend.git
    cd TicketApp-Vue-Frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

This project primarily handles data client-side using `localStorage` and does not require explicit server-side environment variables. For local development, Vite provides `import.meta.env` for environment variables prefixed with `VITE_`. No custom environment variables are strictly required to run this application.

## 🏃‍♀️ Usage

To run the application in development mode:

```bash
npm run dev
# or
yarn dev
```

This will start a local development server, typically at `http://localhost:5173`. Open this URL in your browser to interact with the application.

### Application Flow:

1.  **Landing Page**: Upon visiting the application, you'll land on the `Home` page, showcasing the app's purpose.
2.  **User Registration**:
    *   Navigate to `/auth/signup` or click "Get Started" from the landing page.
    *   Fill in your `Full Name`, `Email`, and `Password`.
    *   Click "Sign Up" to create an account. Your user data will be stored in `localStorage`.
    *   You will be redirected to the login page after successful signup.
3.  **User Login**:
    *   Navigate to `/auth/login` or click "Login".
    *   Enter your registered `Email` and `Password`.
    *   Click "Login". If successful, your session will be stored in `localStorage`, and you'll be redirected to the Dashboard.
4.  **Dashboard**:
    *   Accessible at `/dashboard` after logging in.
    *   View a summary of your tickets, categorized by status (Open, In Progress, Closed).
    *   Click "Manage Tickets" to go to the ticket management interface.
5.  **Ticket Management**:
    *   Accessible at `/tickets` after logging in.
    *   **Create New Ticket**:
        *   Use the "Create New Ticket" form at the top.
        *   Enter a `Ticket title` (required).
        *   Optionally add a `Description`.
        *   Select a `Status` (defaults to 'Open').
        *   Click "Create Ticket". The new ticket will appear in the list below and be saved to `localStorage`.
    *   **Edit Ticket**:
        *   Click the "Edit" button on any ticket card.
        *   A modal will appear, allowing you to modify the `Title`, `Description`, and `Status`.
        *   Click "Save Changes" to update the ticket.
    *   **Delete Ticket**:
        *   Click the "Delete" button on any ticket card.
        *   Confirm your action in the prompt. The ticket will be removed from the list and `localStorage`.
6.  **Logout**:
    *   Click the "Logout" button in the navigation bar to end your session. Your session data will be cleared from `localStorage`.

## ✍️ Author Info

**Mmadu**

*   LinkedIn: [https://linkedin.com/in/yourusername](https://linkedin.com/in/yourusername)
*   Twitter: [https://twitter.com/yourusername](https://twitter.com/yourusername)
*   Portfolio: [https://your-portfolio-website.com](https://your-portfolio-website.com)

---

[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-35495E?style=for-the-badge&logo=pinia&logoColor=4FC08D)](https://pinia.vuejs.org/)
[![Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)