# 🛡️ ShadowWatch

**ShadowWatch** is an autonomous Shadow IT Detection platform designed to help corporate IT security teams monitor, identify, and manage unauthorized SaaS tools used by employees. By analyzing various signals, ShadowWatch assesses risk, tracks compliance gaps, and provides actionable intelligence to IT administrators.

## ✨ Features

- **Dashboard Overview**: Get a high-level view of your organization's security posture, tracking total apps, unsanctioned tools, high-risk applications, and compliance gaps.
- **App Inventory**: Maintain a comprehensive directory of all discovered applications, along with their risk scores, active users, and data residency.
- **Risk Assessment**: Automatically calculate risk scores (Low, Medium, High, Critical) for discovered tools.
- **Alerts & Intelligence**: View real-time security alerts triggered by mass adoption, compliance gaps, and high-risk vendor discoveries.
- **Automated Policies**: Define rules to automatically block apps, flag for review, or notify administrators based on predefined conditions.
- **Secure Admin Access**: Protected dashboard access with session-based authentication.

## 💻 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router, Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine. 

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/shadow-watch.git
   cd shadow-watch
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🔐 Admin Authentication

The dashboard is protected by middleware. When you first start the application, you will be redirected to the login page. 

Use the following default credentials to log in:

- **Email:** `admin@shadowwatch.com`
- **Password:** `admin123`

*(Note: These are mock credentials configured for development purposes. In a production environment, this should be hooked up to a real database or SSO provider.)*

## 📁 Project Structure

```text
shadow-watch/
├── app/               # Next.js App Router (Pages, Layouts, API Routes, Server Actions)
│   ├── (dashboard)/   # Main protected dashboard views (Apps, Alerts, Policies, etc.)
│   ├── login/         # Authentication view
│   ├── api/           # Backend API routes
│   └── actions.ts     # Next.js Server Actions (Auth, mutations)
├── components/        # Reusable React components (UI library, Layouts)
├── lib/               # Utility functions, Mock Data, and Prompts
└── middleware.ts      # Next.js Middleware for route protection
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
