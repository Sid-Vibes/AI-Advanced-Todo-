# Backend API

FastAPI backend with PostgreSQL, JWT authentication, and AI-powered task predictions.

## Setup

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Environment Variables

Create a `.env` file with:
```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
SECRET_KEY=your_secret_key
OPENAI_API_KEY=your_openai_key
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /register | Register a new user |
| POST | /login | Login user |
| GET | /me | Get current user |
| POST | /refresh | Refresh access token |
| GET | /dashboard | Protected dashboard route |
| POST | /predict | Predict task (simple logic) |
| POST | /predicts | Predict task (AI-powered) |
| POST | /logout | Logout user |
