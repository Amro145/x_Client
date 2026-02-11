# 𝕏 Client - Modern Social Media Experience

The frontend for the 𝕏 clone, delivering a sleek, responsive, and high-performance user experience. Built with the latest web technologies for maximum speed and aesthetic appeal.

---

## ✨ Features

-   **🎨 Premium UI**: Modern Dark Mode aesthetics with glassmorphism and smooth transitions.
-   **⚡ Blazing Fast**: Powered by **Vite** and **React 19** for near-instant load times.
-   **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop.
-   **🔄 State Management**: Hybrid approach using **Redux Toolkit** for global sync and **Zustand** for lightweight state.
-   **🧪 Robust Validation**: Client-side input validation, length constraints, and image size checks.
-   **🧩 Component Library**: Styled with **Tailwind CSS 4** and **DaisyUI 5** for a consistent design system.
-   **🔔 Real-time Interaction**: Instant UI updates for likes, follows, and post creation.

## 🛠️ Tech Stack

-   **Framework**: [React 19](https://react.dev/)
-   **Build Tool**: [Vite 6](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI 5](https://daisyui.com/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Zustand](https://zustand-demo.pmnd.rs/)
-   **Routing**: [React Router 7](https://reactrouter.com/)
-   **API Client**: [Axios](https://axios-http.com/)
-   **Notifications**: [React Hot Toast](https://react-hot-toast.com/) & [SweetAlert2](https://sweetalert2.github.io/)

## 📁 Project Structure

```text
├── src/
│   ├── components/    # Reusable UI parts & Page layouts
│   ├── store/         # Redux slices & API services
│   ├── lib/           # Helper functions & Date formatting
│   ├── App.jsx        # Routing and Auth Provider
│   └── main.jsx       # Global entry point
├── public/            # Static assets
└── tailwind.config.js # Custom design tokens
```

## 🚀 Getting Started

1.  **Clone and Install**:
    ```bash
    npm install
    ```
2.  **Environment Setup**:
    Create a `.env` file:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```
3.  **Run locally**:
    ```bash
    npm run dev
    ```

## 💅 Key Design Principles

-   **Aesthetics First**: High-contrast dark mode with slate-800 borders and vibrant blue accents.
-   **Consistency**: Shared `Layout` component ensures the 3-column "X" structure is maintained across all views.
-   **Accessibility**: Semantic HTML and clear focus states for keyboard navigation.

---

Designed to be wowed. Part of the **X Project Ecosystem**.
