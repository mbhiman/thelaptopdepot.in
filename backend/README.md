# The Laptop Depot - Full Stack Web Application

A production-ready full-stack web application for The Laptop Depot, a refurbished electronics store in Siliguri, West Bengal. Built with React, Node.js, Express, and PostgreSQL.

# The Laptop Depot - Backend API

Backend server for The Laptop Depot refurbished electronics store.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **PostgreSQL** - Database (via Neon)
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Setup

### Prerequisites
- Node.js v16+
- Neon account (free): https://console.neon.tech

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your Neon database URL to `.env`:
```env
DATABASE_URL=postgresql://your_connection_string_here
JWT_SECRET=your_secret_key_here
```

4. Initialize database:
```bash
npm run init-db
```

5. Start development server:
```bash
npm run dev
```

Server runs on http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user (protected)
- `POST /api/auth/change-password` - Change password (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/slug/:slug` - Get product by slug
- `GET /api/products/category/:categorySlug` - Get products by category
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `PATCH /api/products/:id/stock` - Update stock (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/products/admin/stats` - Get statistics (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/slug/:slug` - Get category by slug
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)


## Project Structure
```
backend/
├── config/          # Database configuration
├── controllers/     # Request handlers
├── middleware/      # Auth, validation, errors
├── models/          # Database operations
├── routes/          # API endpoints
├── .env            # Environment variables (not in Git)
├── .env.example    # Environment template
└── server.js       # Main entry point
```

## Scripts

- `npm start` - Production mode
- `npm run dev` - Development mode (auto-restart)
- `npm run init-db` - Initialize/reset database

## Environment Variables

See `.env.example` for all required variables.