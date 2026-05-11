# Aura Resort | Luxury Redefined

![Aura Resort](https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80)

Aura Resort is a premium, production-ready luxury resort platform built with **Next.js 16**, **MongoDB**, and **Tailwind CSS**. It features a modern "Glossy Card" design language, fully responsive layouts, and a robust admin dashboard for managing bookings, rooms, and inquiries.

## Features

- **Premium UI/UX**: Glossy glassmorphism design with fluid animations using Framer Motion (Tailwind-integrated).
- **Room Management**: Dynamic room listing with real-time availability and database integration.
- **Smart Booking System**: Multi-step, secure booking flow with instant validation.
- **Admin Dashboard**: Secure role-based access for managing:
  - Real-time Bookings (Confirm/Cancel/Delete)
  - Room Inventory (Add/Edit/Delete)
  - Customer Inquiries
  - Analytics Overview
- **Image Optimization**: Next.js 16 Image component integration for lightning-fast loading and WebP support.
- **Newsletter & Inquiries**: Integrated lead generation and contact systems.
- **Fully Responsive**: Seamless experience across mobile, tablet, and desktop.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4.
- **Backend**: Next.js Serverless Functions, Mongoose (MongoDB).
- **Authentication**: NextAuth.js (Role-based: User/Admin).
- **Icons**: Lucide React.
- **Validation**: Zod + React Hook Form.

## Getting Started

### 1. Prerequisites
- Node.js 18.x or later
- MongoDB Atlas account (or local MongoDB instance)

### 2. Installation
```bash
git clone https://github.com/yourusername/aura-resort.git
cd aura-resort
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add the following:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Admin Credentials
ADMIN_EMAIL=admin@aura.com
ADMIN_PASSWORD=your_secure_password

# Optional: ImageKit/Cloudinary
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_endpoint
```

### 4. Running the Project
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## Project Structure

- `app/`: Next.js App Router (Pages, API Routes, Layouts)
- `components/`: Reusable UI components (Navbar, Footer, Gallery)
- `models/`: Mongoose Schemas (Booking, Room, Inquiry)
- `lib/`: Shared utilities (Database connection, Auth options)
- `public/`: Static assets

## Security
- CSRF protection enabled via NextAuth.js.
- Protected Admin API routes with role-based session validation.
- Sanitized database queries via Mongoose.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with  by [Senthilnathan R](https://github.com/senthilnathanr)
# resort-
