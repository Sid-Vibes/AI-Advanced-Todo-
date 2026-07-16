# AI-Advanced-Todo

**AI-Advanced-Todo** is a smart To-Do web application that uses AI-based prediction and recommendation to help users manage daily tasks more effectively. It analyzes user task history and behavior to suggest optimal working times and related tasks for better productivity.

---

## 🚀 Features

### User Authentication
- User registration with full name, email, phone, and occupation
- Secure login with JWT-based access and refresh tokens
- HTTP-only refresh token cookies for enhanced security
- Auto token refresh when access token expires
- Protected routes for authenticated users only

### Task Management
- Add, edit, and delete tasks
- Mark tasks as complete/incomplete
- Task notifications using browser Notification API
- Real-time task status tracking
- Active tasks counter

### AI-Powered Predictions
- AI-based task suggestions using **Google Gemini (gemini-2.5-flash)**
- Smart time estimation for task completion
- Priority analysis and task breakdown recommendations
- Collaboration suggestions
- Popup display for predictions

### Dashboard
- Dark/Light theme toggle
- User profile management
- Statistics cards (Total Tasks, Completed Tasks)
- Responsive layout with Tailwind CSS

### Frontend Pages
- **Home** - Landing page
- **About** - Project information
- **Contact** - Contact page
- **Login** - User authentication
- **Register** - New user signup
- **Dashboard** - Protected task management area

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLAlchemy ORM with PostgreSQL (configurable)
- **Authentication**: JWT (JSON Web Tokens) with python-jose
- **Password Hashing**: Passlib (pbkdf2_sha256)
- **AI Integration**: OpenAI SDK with Google Gemini API
- **CORS**: FastAPI CORSMiddleware

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **HTTP Client**: Axios / Fetch API
- **Linting**: ESLint

---

## 📁 Project Structure
 AI-Advanced-Todo/
  ├── README.md # Project documentation │
  ├── backend/ # FastAPI Backend │
   ├── app/ │
    │ ├── init.py # Package initialization │
    │ ├── main.py # FastAPI app & routes │ 
    │ ├── auth.py # JWT authentication logic │
    │ ├── database.py # Database configuration │
    │ ├── models.py # SQLAlchemy ORM models │
    │ └── schemas.py # Pydantic schemas │
    ├── requirements.txt # Python dependencies │
    └── .gitignore # Python ignore rules │ 
  └── my-project/ # React Frontend 
    ├── public/ # Static assets 
    ├── src/ │
     ├── main.jsx # React entry point & routing │
     ├── App.jsx # Root component with layout │ ├── App.css # Global styles │ ├── index.css # Tailwind imports │
     └── components/ │
      ├── Header/ # Site header │
      ├── Footer/ # Site footer │
      ├── Home/ # Landing page │ 
      ├── About/ # About page │ 
      ├── Contact/ # Contact page │ 
      ├── Login/ # Login form │ 
      ├── Registration/ # Registration form │ 
      ├── ProtectedRoute/ # Auth guard component │ 
      └── Dashborad/ # Task dashboard │ 
        ├── Dashborad.jsx # Main dashboard │ 
        ├── AddTaskForm.jsx # Task creation form │ 
        ├── TodoList.jsx # Task list display │ 
        ├── ProfilePage.jsx # User profile │ 
        └── PredictionPopup.jsx # AI prediction modal
    ├── index.html # HTML template 
    ├── package.json # Node dependencies 
    ├── vite.config.js # Vite configuration 
    ├── eslint.config.js # ESLint configuration 
    └── .gitignore


---

## ⚙️ Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL (or SQLite for development)
- Git

---


# Frontend Setup
Navigate to frontend directory
cd my-project
Install dependencies
npm install
Configure API endpoint
Update the API base URL in src/components/Dashborad/Dashborad.jsx if needed:
const response = await fetch('http://localhost:8000/predicts', {
Run the development server
npm run dev
Frontend runs at: http://localhost:5173


🔌 API Endpoints

Method	Endpoint	Description	Auth Required
POST	/register	Register new user	No
POST	/login	Login user	No
GET	/me	Get current user profile	Yes
POST	/refresh	Refresh access token	Yes (cookie)
GET	/dashboard	Protected dashboard route	Yes
POST	/predict	Get random task prediction	Yes
POST	/predicts	Get AI-powered task prediction	Yes
POST	/logout	Logout user	Yes


🎯 Key Features Deep Dive

# Authentication Flow
User registers with credentials
Server returns access token + sets HTTP-only refresh token cookie
Access token stored in localStorage on frontend
Protected routes check for token presence
When access token expires, refresh token auto-generates new access token

# AI Prediction System
Uses Google Gemini 2.5 Flash model via OpenAI SDK
Accepts task title as input
Returns one-line smart suggestions for task completion
Displays predictions in a popup modal

# Task Notifications
Requests browser notification permission on dashboard load
Checks tasks every minute for upcoming due times
Notifies user 1 minute before task deadline
Works only for enabled and incomplete tasks

🎨 UI/UX Features
Dark/Light Mode: Toggle between themes with persistent state
Responsive Design: Mobile-first approach with Tailwind CSS
Glassmorphism Cards: Modern UI with gradients and shadows
Smooth Animations: CSS transitions for theme and state changes
Icons: Lucide React for consistent iconography

📝 Notes
Backend uses hardcoded secret keys for development. Use environment variables in production.
CORS is configured for http://localhost:5173 only. Update in production.
Database uses SQLite by default for development. Switch to PostgreSQL for production.
AI predictions require a valid Gemini API key.

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Built with ❤️ by Sid-Vibes   

