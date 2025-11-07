<h1 align="center">TERRALOGIC</h1>

<div align="center">

  <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react" />

  <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logoColor=white&logo=vite&color=646CFF" alt="vite" />

  <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />

  <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logoColor=white&logo=nodedotjs&color=339933" alt="nodejs" />

  <img src="https://img.shields.io/badge/-Express-black?style=for-the-badge&logoColor=white&logo=express&color=000000" alt="express" />

  <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />

  <img src="https://img.shields.io/badge/-Azure_AI-black?style=for-the-badge&logoColor=white&logo=microsoftazure&color=0078D4" alt="azure" />

  <img src="https://img.shields.io/badge/-Recharts-black?style=for-the-badge&logoColor=white&logo=chartdotjs&color=FF6384" alt="recharts" />

</div>

<br />

## About

A modern, AI-powered project management dashboard built with React and Express.js. TERRALOGIC provides comprehensive task tracking, team analytics, AI-driven insights, and an intelligent chatbot for seamless project management.

## Features

- ✨ **Modern Dashboard** - Real-time overview with analytics and visualizations
- 📊 **Interactive Charts** - Donut, line, and bar charts for data visualization
- 📝 **Task Management** - Full CRUD operations for tasks with filtering and search
- 🏗️ **Project Tracking** - Manage multiple projects and track their progress
- 👥 **Team Management** - Team benchmarking and performance analytics
- 🤖 **AI Chatbot** - Intelligent assistant powered by Azure AI (GPT-4o-mini)
- 💡 **AI Insights** - Sentiment analysis and team performance insights
- 🔍 **Advanced Query** - Filter and search tasks with multiple criteria
- 🎨 **Dark Theme** - Beautiful dark UI with smooth animations
- 📱 **Responsive Design** - Mobile-friendly interface
- 📈 **Analytics** - Team velocity, efficiency, and completion rate tracking

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Recharts** - Chart library for data visualization
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **Azure AI** - AI inference API (GitHub Models)
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yaswanth1320/terralogic.git
   cd hackton
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory:

   ```bash
   # MongoDB Connection
   MONGODB_URI="mongodb://localhost:27017/terralogic"
   # or use MongoDB Atlas:
   # MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/terralogic"

   # Server Port
   PORT=5000

   # Azure AI / GitHub Models API
   GITHUB_TOKEN="your-github-token-here"
   ```

5. **Start the development servers**

   **Terminal 1 - Start Backend Server:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Start Frontend Dev Server:**
   ```bash
   cd client
   npm run dev
   ```

6. **Open the application**

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## Project Structure

```
hackton/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── api.js         # API client
│   │   └── App.jsx        # Main app component
│   └── package.json
│
└── server/                 # Express backend
    ├── controllers/        # Route controllers
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── utils/             # Utility functions
    ├── db.js              # Database connection
    └── index.js           # Server entry point
```

## API Endpoints

- `GET /api/overview` - Get dashboard overview data
- `GET /api/tasks` - Get all tasks (with filtering)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/projects` - Get all projects
- `GET /api/teams` - Get team data
- `GET /api/sentiment/:teamId` - Get team sentiment analysis
- `GET /api/analytics` - Get analytics data
- `GET /api/users` - Get all users
- `POST /api/ai/chat` - Chat with AI assistant

## Environment Variables

### Server (.env)

```bash
# Database
MONGODB_URI="mongodb://localhost:27017/terralogic"

# Server
PORT=5000
NODE_ENV=development

# AI/ML
GITHUB_TOKEN="your-github-token-here"
```

### Client

Update the API base URL in `client/src/api.js` if your backend runs on a different port:

```javascript
const API_BASE = "http://localhost:5000/api";
```

## Features Overview

### 📊 Overview Dashboard
- Real-time task statistics
- Completion rate tracking
- 7-day trend analysis
- Team performance metrics

### 📋 Task Management
- Create, update, and delete tasks
- Filter by status, project, assignee
- Search functionality
- Pagination support

### 🤖 AI Chatbot
- Context-aware responses
- Integration with project data
- Powered by Azure AI (GPT-4o-mini)

### 💡 AI Insights
- Team benchmarking
- Sentiment analysis
- Performance recommendations

### 🔍 Advanced Query
- Multi-criteria filtering
- Date range queries
- Sorting options
- Export capabilities

## Scripts

### Server
- `npm run dev` - Start development server
- `npm start` - Start production server (with nodemon)

### Client
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with React and Express.js
- UI components styled with TailwindCSS
- Charts powered by Recharts
- AI capabilities powered by Azure AI / GitHub Models API
