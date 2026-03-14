<div align="center">
  <h3 align="center">EASES</h3>
  <p align="center">
    A real-time collaborative document editor built with Next.js, Liveblocks, and Lexical.
    <br />
    <a href="https://github.com/yourusername/EASES"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://your-demo-url.vercel.app">View Demo</a>
    ·
    <a href="https://github.com/yourusername/EASES/issues">Report Bug</a>
    ·
    <a href="https://github.com/yourusername/EASES/issues">Request Feature</a>
  </p>
</div>

<!-- BADGES -->
<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
  <img src="https://img.shields.io/badge/Liveblocks-000000?style=for-the-badge&logoColor=white" alt="Liveblocks" />
</div>

---

## 📖 About The Project

EASES is an advanced, real-time collaborative text editor designed to mirror the seamless experience of Google Docs. Built on top of the modern Next.js 14 App Router, it offers rich text editing capabilities, live presence indicators, instant syncing, and robust user authentication.

Whether you're brainstorming with a team or taking personal notes, EASES provides a beautiful, responsive, and highly polished interface to get things done.

### ✨ Key Features

- **Real-time Collaboration:** Multiple users can edit the same document simultaneously with lightning-fast sync powered by Liveblocks.
- **Rich Text Editor:** Built with Meta's Lexical framework for a highly extensible and performant editing experience.
- **Authentication & Authorization:** Secure user authentication handled by Clerk, including document-level permissions (View vs. Edit).
- **In-App Notifications:** Instantly know when you are invited to a document or when someone tags you.
- **Email Invitations:** Built-in email invite system using Resend to notify external users securely.
- **Active Presences:** See exactly who is currently viewing or editing the document with live avatar cursors.
- **Error Tracking:** Fully integrated with Sentry to catch and monitor runtime bugs and performance issues.
- **Modern UI:** Designed with Tailwind CSS and Shadcn UI components for a premium look and feel.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Collaboration & State:** [Liveblocks](https://liveblocks.io/)
- **Rich Text Editor:** [Lexical](https://lexical.dev/)
- **Email Service:** [Resend](https://resend.com/)
- **Error Monitoring:** [Sentry](https://sentry.io/)

---

## 🚀 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have Node.js and npm installed.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/EASES.git
   cd EASES
   ```

2. **Install dependencies**
   ```sh
   npm install --legacy-peer-deps
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root of the project and add your API keys:

   ```env
   # Clerk Auth Next.js Keys
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

   # Liveblocks Auth Keys
   LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
   LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key

   # Sentry Error Tracking (Optional)
   SENTRY_AUTH_TOKEN=your_sentry_auth_token

   # Resend Email API
   RESEND_API_KEY=your_resend_api_key

   # Site URL (for proper email links in production)
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the Development Server**
   ```sh
   npm run dev
   ```

   Your app should now be running on [http://localhost:3000](http://localhost:3000).

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ and Next.js</p>
</div>
