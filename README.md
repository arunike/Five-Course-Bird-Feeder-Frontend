# 🐦 Five Course Bird Feeder - Frontend

> An intelligent bird monitoring system with real-time video analysis and species detection powered by machine learning.

[![React](https://img.shields.io/badge/React-17.0.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5.4-blue.svg)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-4.24.16-blue.svg)](https://ant.design/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22.0-orange.svg)](https://www.tensorflow.org/js)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.txt)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Related Projects](#related-projects)

## 🌟 Overview

Five Course Bird Feeder is a modern web application that transforms backyard bird watching into an intelligent, data-driven experience. Using computer vision and machine learning, the system automatically detects, identifies, and tracks bird species visiting your feeder in real-time.

**Key Capabilities:**
- 🎥 Real-time video streaming and recording
- 🤖 Automated bird detection using TensorFlow.js
- 📊 Comprehensive statistics and analytics
- 👤 Multi-user support with role-based access
- 🎨 Customizable themes (Light/Dark mode)
- 📱 Responsive design for all devices

## ✨ Features

### 🔐 Authentication & User Management
- Secure login/registration system
- Password validation with strength requirements
- User profile management
- Admin dashboard for user administration

### 🏠 Home Dashboard
- Live video feed from bird feeder camera
- Recent bird sighting summaries
- Quick access to all features
- Automatic video selection based on latest activity

### 📹 Video Library
- Upload and manage recorded videos
- Automatic bird detection on uploaded videos
- Video playback with detection overlays
- Organized video history

### 📊 Statistics & Analytics
- **Species Distribution**: Bar charts showing bird diversity
- **Observation Timeline**: Track sightings over time
- **Species Breakdown**: Pie charts for species composition
- **Total Sightings**: Cumulative bird visit counts
- **Unique Species**: Track biodiversity at your feeder

### 🤖 Machine Learning Integration
- Real-time object detection using COCO-SSD
- Bird species classification with MobileNet
- Confidence scoring for detections
- Automatic duplicate detection filtering

### ⚙️ Customization
- **Theme Modes**: Light, Dark, or Follow System
- **Theme Colors**: 7 color schemes (Cyan, Green, Yellow, Orange, Red, Pink, Purple)
- **Layout Options**: Side, Top, or Mixed navigation
- **Accessibility**: Color weakness mode and grayscale mode

## 🛠 Tech Stack

### Core Framework
- **React 17** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing

### State Management
- **Redux Toolkit** - Centralized state management
- **React Redux** - React bindings for Redux

### UI Components & Styling
- **Ant Design** - Enterprise-grade UI components
- **Material-UI** - Additional component library
- **Less** - CSS preprocessor
- **React Icons** - Icon library

### Machine Learning
- **TensorFlow.js** - Browser-based ML
- **COCO-SSD** - Object detection model
- **MobileNet** - Image classification model

### Data Visualization
- **ECharts** - Interactive charts
- **echarts-for-react** - React wrapper for ECharts

### HTTP & API
- **Axios** - HTTP client
- **Axios-JSONP** - JSONP support

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Docker** (for backend services)
- **Backend API** running (see [Five Course Bird Feeder API](https://github.com/arunike/CS506-API))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arunike/CS506-Frontend.git
   cd CS506-Frontend
   ```

2. **Set up the Backend API** (Required)
   
   The frontend requires the backend API to be running. Follow these steps:

   **a. Install Prerequisites:**
   - Java 17 or higher ([Download JDK](https://www.oracle.com/java/technologies/downloads/))
   - Docker Desktop ([Download Docker](https://www.docker.com/products/docker-desktop))

   **b. Clone the Backend Repository:**
   ```bash
   # In a separate terminal window
   git clone https://github.com/arunike/CS506-API.git
   cd CS506-API
   ```

   **c. Start MySQL Database:**
   ```bash
   # Navigate to api directory
   cd api
   
   # Start Docker MySQL container
   docker-compose up -d
   
   # Verify Docker is running
   docker ps
   ```
   
   You should see a MySQL container running on port `60066`.

   **d. Start the Backend Server:**
   ```bash
   # Navigate to user service directory
   cd user
   
   # Start Spring Boot application (Unix/Mac)
   ./mvnw spring-boot:run
   
   # Or on Windows
   mvnw.cmd spring-boot:run
   ```
   
   The backend API will start on **http://localhost:8080**

   **e. Verify Backend is Running:**
   ```bash
   curl http://localhost:8080/api/v1/users/all
   ```
   
   You should receive a JSON response.

3. **Install Frontend Dependencies**
   ```bash
   # Return to the frontend directory
   npm install
   ```

4. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```

5. **Open Your Browser**
   - Navigate to `http://localhost:5173`
   - You can now register a new account or login

### Quick Start (All Services)

To start both backend and frontend in one go:

```bash
# Terminal 1 - Backend
cd CS506-API/api && docker-compose up -d && cd user && ./mvnw spring-boot:run

# Terminal 2 - Frontend  
cd CS506-Frontend && npm install && npm run dev
```

### Troubleshooting

**Backend Connection Issues:**
- Ensure Docker is running: `docker ps`
- Check backend is on port 8080: `curl http://localhost:8080/api/v1/users/all`
- Verify MySQL container: `docker logs <container-id>`

**CORS Errors:**
- Backend CORS is configured for `http://localhost:5173`
- Ensure frontend is running on the correct port
- Check browser console for specific CORS errors

**Database Issues:**
- Reset database: `cd api && docker-compose down -v && docker-compose up -d`
- Check MySQL logs: `docker logs <mysql-container-id>`

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, SVGs, fonts
│   ├── components/     # Reusable UI components
│   │   └── Board/      # Statistics board component
│   ├── layouts/        # Layout components
│   │   ├── components/ # Header, Menu, Settings
│   │   └── index.tsx   # Main layout wrapper
│   ├── modules/        # Redux slices
│   │   ├── global.ts   # Global state (theme, layout)
│   │   ├── user.ts     # User authentication state
│   │   └── store.ts    # Redux store configuration
│   ├── pages/          # Page components
│   │   ├── Admin/      # Admin dashboard
│   │   ├── Home/       # Home page with video
│   │   ├── Login/      # Authentication pages
│   │   ├── Statistic/  # Analytics dashboard
│   │   └── User/       # User profile
│   ├── router/         # Route definitions
│   ├── services/       # API service layer
│   ├── styles/         # Global styles and themes
│   │   ├── theme.less  # Theme variables
│   │   └── index.less  # Global styles
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Root component
│   └── main.tsx        # Application entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md           # This file
```

### API Configuration

API endpoints are configured in:
- `src/services/` - Service layer with Axios instances
- Backend URL: `http://localhost:8080/api/v1/`

## 🔗 Related Projects

- **Backend API**: [Five Course Bird Feeder API](https://github.com/arunike/CS506-API)
- **Course**: COMP SCI 506 - Software Engineering

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## 👥 Authors

- **COMP SCI 506 Team**

## 🙏 Acknowledgments

- Ant Design team for the excellent UI framework
- TensorFlow.js for browser-based ML capabilities
- ECharts for powerful data visualization
- All contributors and testers

---

**Note**: This is an educational project developed for COMP SCI 506: Software Engineering.
