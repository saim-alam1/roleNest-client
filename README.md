# RoleNest 🏢

---

## 🌟 Project Overview

**RoleNest** is a full-stack apartment management system built with the MERN stack. It allows users to view available apartments, apply for agreements, make payments, and stay updated with announcements. Admins can manage members, agreements, coupons, and announcements—all through an intuitive dashboard system.

The project implements **role-based access control** with **Firebase authentication** and **JWT middleware**, ensuring enhanced security for all user and admin operations.

**Live Demo:** [https://rolenest-765eb.web.app/](https://rolenest-765eb.web.app/)

---

## ⚡ Key Features

- **Dynamic Home Page**
  - Banner slider showcasing apartments/buildings
  - About section with elegant typography
  - Coupons displayed in a visually appealing way
  - Map/location details of apartments

- **Authentication & Security**
  - Email/password login and registration
  - Google login integration
  - Password validation with toast notifications
  - **JWT + Firebase middleware** for secure API access
  - Role-based access control (User / Member / Admin)

- **Apartment Management**
  - Paginated apartment listings (6 per page)
  - Search/filter apartments by rent range
  - Apply for apartment agreements (only logged-in users)

- **User Dashboard (Private Route)**
  - View profile & agreements
  - Announcements feed

- **Member Dashboard (Private Route)**
  - Profile with rented apartment info
  - Make payments with coupon discounts
  - View payment history
  - Announcements feed

- **Admin Dashboard (Private Route)**
  - Admin profile stats (total rooms, available/unavailable percentages, user/member counts)
  - Manage members (promote/demote roles)
  - Create announcements
  - Approve/reject agreement requests
  - Manage coupons (add/view)

- **Challenge Features**
  - Role-based middleware using Firebase Admin SDK + JWT
  - Sweet alerts & toasts for user interactions
  - Fully responsive and visually engaging UI

---

## 🛠 Tech Stack & Libraries

### Frontend

- **React 19**
- **React Router v7** (Routing & Private Routes)
- **TailwindCSS 4 + DaisyUI** (Styling & components)
- **Framer Motion** (Animations)
- **Swiper** (Banner slider)
- **Lottie React** (Animations)
- **React-Leaflet + Leaflet** (Interactive maps)
- **React Hook Form** (Forms & validation)
- **React Toastify & SweetAlert2** (Notifications)
- **React Icons** (Iconography)

### Backend / API

- **Firebase** (Authentication, roles, JWT middleware)
- **Axios** (API requests)
- **Stripe** (Payments)

### State & Data

- **@tanstack/react-query** (Server state & data fetching)

### Development Tools

- **Vite** (Dev server & build tool)
- **ESLint + Plugins** (Linting & code quality)
- **Notiflix** (Loading/alerts, optional)

---

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   ```
