# The Laptop Depot - Full-Stack E-commerce Platform

Complete full-stack web application for a refurbished electronics store in Siliguri, West Bengal.

## 🚀 Features

### Public Store
- Browse products by category
- Featured products showcase
- Detailed product specifications
- WhatsApp integration for purchases
- Google Maps store location
- Responsive design

### Admin Panel
- Secure authentication (JWT)
- Dashboard with statistics
- Product management (CRUD)
- Category management (CRUD)
- Stock status tracking
- Featured product marking

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **PostgreSQL** - Database (via Neon cloud)
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **Framer Motion** - Animations

## 📋 Prerequisites

- Node.js v16 or higher
- npm or yarn
- Neon account (free): https://console.neon.tech

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd laptop-depot
```

### 2. Install Dependencies
```bash
npm run install-all
```

### 3. Setup Backend
```bash
cd backend

# Create .env file
cp .env.example .env

# Add your Neon database URL to .env
# DATABASE_URL=postgresql://...

# Initialize database
npm run init-db

# Start backend server
npm run dev
```

Backend runs on: http://localhost:5000

### 4. Setup Frontend
```bash
cd frontend

# Create .env file
cp .env.example .env

# Start frontend server
npm run dev
```

Frontend runs on: http://localhost:5173

## 📁 Project Structure
```
laptop-depot/
├── backend/            # Node.js/Express API
│   ├── config/        # Database & environment
│   ├── controllers/   # Business logic
│   ├── middleware/    # Auth, validation, errors
│   ├── models/        # Data layer
│   ├── routes/        # API endpoints
│   └── server.js      # Main entry point
│
├── frontend/          # React application
│   ├── src/
│   │   ├── components/  # Reusable UI
│   │   ├── pages/       # Full pages
│   │   ├── layouts/     # Layout wrappers
│   │   ├── services/    # API calls
│   │   └── hooks/       # Custom hooks
│   └── index.html
│
└── README.md
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

## 🌐 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://...  # Neon connection string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📞 Contact Information

**The Laptop Depot**
- Phone/WhatsApp: +91 83890 21443
- Email: thelaptopdepot02@gmail.com
- Location: Panitanki More, Sevoke Rd, Siliguri, WB 734001

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for production use
- Follows industry best practices