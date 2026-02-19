# The Laptop Depot - Frontend

React frontend for The Laptop Depot e-commerce platform.

## Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Framer Motion** - Animations

## Setup

### Prerequisites
- Node.js v16+
- Backend server running on port 5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update backend URL in `.env` if needed:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

Frontend runs on http://localhost:5173

## Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/          # Full page components
├── layouts/        # Layout wrappers
├── services/       # API service layer
├── hooks/          # Custom React hooks
├── App.jsx         # Main app with routing
└── main.jsx        # Entry point
```

## Available Scripts

- `npm run dev` - Development server with hot reload
- `npm run build` - Production build
- `npm run preview` - Preview production build

## Features

### Public Pages
- Homepage with featured products
- Category browsing
- Product detail pages
- Contact information
- Google Maps integration

### Admin Panel
- Secure login
- Dashboard with statistics
- Product management (CRUD)
- Category management (CRUD)
- Stock status updates
- Featured product marking