# SpotMyStay

> Discover, compare, and book hostels with a modern full-stack experience for students, travelers, and property owners.

[![Version](https://img.shields.io/badge/version-1.0.0-0ea5e9.svg)](https://github.com/HimanshuChaudharii/spotmystay)
[![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-22c55e.svg)](frontend)
[![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-f59e0b.svg)](backend)
[![Database](https://img.shields.io/badge/database-MongoDB-10b981.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-ISC-64748b.svg)](LICENSE)

## 📌 Table of Contents

- [✨ Overview](#-overview)
- [✨ Features](#-features)
- [📸 Screenshots](#-screenshots)
- [⚙️ Tech Stack](#️-tech-stack)
- [🚀 Installation](#-installation)
- [💻 Usage](#-usage)
- [📂 Project Structure](#-project-structure)
- [🛣️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙌 Acknowledgements](#-acknowledgements)

## ✨ Overview

SpotMyStay is a full-stack hostel discovery and booking platform designed to make accommodation search and management simple. It supports multiple user workflows, including guest browsing, authenticated booking, owner listing management, and admin operations.

The project uses a modular architecture:
- A React + Vite frontend for fast, responsive UI.
- An Express + MongoDB backend with JWT-based authentication.
- Role-aware routes and dashboards for admin and owner users.

## ✨ Features

- User authentication and authorization (JWT-based)
- Dedicated dashboards for Admin and Owner workflows
- Hostel discovery with detail pages
- Booking and review management APIs
- Protected routes for authenticated flows
- Profile management experience
- Seed utility for admin initialization
- Configurable API base URL via environment variables

## 📸 Screenshots

> Replace the placeholders below with real screenshots from your app.

| Screen | Preview |
|---|---|
| Home Page | ![Home Screenshot](https://via.placeholder.com/1200x650?text=SpotMyStay+Home) |
| Hostel Details | ![Hostel Details Screenshot](https://via.placeholder.com/1200x650?text=Hostel+Details) |
| Admin Dashboard | ![Admin Dashboard Screenshot](https://via.placeholder.com/1200x650?text=Admin+Dashboard) |

## ⚙️ Tech Stack

### Frontend
- React 19
- Vite 7
- React Router DOM
- Axios
- Tailwind CSS 4
- GSAP

### Backend
- Node.js
- Express 5
- MongoDB + Mongoose
- JWT + bcrypt
- dotenv + CORS

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/HimanshuChaudharii/spotmystay.git
cd spotmystay
```

### 2. Install dependencies

```bash
npm install
npm --prefix backend install
npm --prefix frontend install
```

### 3. Configure environment variables

Create a file at `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/spotmystay
JWT_SECRET=replace_with_secure_secret
PORT=5000
```

Optional frontend API override (create `frontend/.env`):

```env
VITE_API_URL=http://localhost:5000/api
```

## 💻 Usage

### Run full stack (recommended)

```bash
npm run dev
```

### Run services separately

```bash
npm run dev:backend
npm run dev:frontend
```

Default local URLs:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api`

### Example API request

```bash
curl http://localhost:5000/api/hostels
```

## 📂 Project Structure

```text
SpotMyStay-main/
├─ backend/
│  ├─ config/
│  ├─ controllers/
│  ├─ middleware/
│  ├─ models/
│  ├─ routes/
│  ├─ utils/
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  └─ pages/
│  └─ vite.config.js
├─ package.json
└─ README.md
```

## 🛣️ Roadmap

- Add image upload/storage pipeline for hostel media
- Add advanced filtering (price, location, amenities)
- Add booking status notifications (email/in-app)
- Add automated tests (unit + integration)
- Add CI workflow with lint/build/test checks
- Add containerized deployment setup (Docker)

## 🤝 Contributing

Contributions are welcome. To contribute:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please keep commits focused, follow existing code style, and include clear PR descriptions.

## 📜 License

This project is distributed under the ISC License.

## 🙌 Acknowledgements

- Open-source libraries powering the React and Node.js ecosystem
- MongoDB Atlas and the JavaScript tooling community

---

### Ready to contribute or deploy?

If you find this project useful, star the repository and share feedback to help improve SpotMyStay.