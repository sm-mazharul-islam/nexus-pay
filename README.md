# NexusPay

NexusPay is a high-performance web platform built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Originally designed as a premium payment processing interface, ensuring transparency and efficiency in humanitarian efforts.

## 🚀 Key Features

- **Premium UI/UX**: Bento-grid inspired layout with modern Glassmorphism effects.
- **Smooth Animations**: Powered by Framer Motion for high-end hover and interaction effects.
- **Secure Backend**: Custom-built RESTful API routes using Next.js App Router.
- **Database Integration**: Robust data management using MongoDB and Prisma ORM.
- **Relief Tracking**: Dedicated modules to manage inventory and beneficiary distribution logs.
- **Instant Feedback**: Success animation pages to confirm transactions and distributions.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) & [Prisma ORM](https://www.prisma.io/)
- **Animations**: [Framer Motion](https://www.framer.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
src/
├── app/
│   ├── api/          # API Route Handlers (checkout, distribution, etc.)
│   ├── dashboard/    # Administrative dashboard
│   ├── payment-success/ # Post-transaction confirmation page
│   └── page.tsx      # Main interface
├── components/       # Reusable UI components
├── lib/              # Prisma client initialization
└── prisma/           # Schema definition and database models
```
