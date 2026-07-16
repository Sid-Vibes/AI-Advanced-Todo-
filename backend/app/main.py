from fastapi import FastAPI, Depends, HTTPException, status, Cookie
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi.responses import JSONResponse
from .auth import create_access_token, create_refresh_token, get_current_user
from fastapi.security import OAuth2PasswordBearer
from .schemas import UserSchema, LoginSchema, UserSchemaOut
from . import models
from .models import User
from .database import SessionLocal, engine
from jose import jwt, JWTError
from datetime import timedelta
from pydantic import BaseModel
import google.generativeai as genai
from openai import OpenAI


class TaskSchema(BaseModel):
    title: str

database_model.Base.metadata.create_all(bind=engine)
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- REGISTER ----------------
@app.post("/register")
def register_user(user: UserSchema, db: Session = Depends(get_db)):
    existing_user = db.query(database_model.User).filter(database_model.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)
    db_user = database_model.User(
        fullName=user.fullName,
        email=user.email,
        password=hashed_password,
        phone=user.phone,
        occupation=user.occupation
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "User created successfully"}

# ---------------- LOGIN ----------------
@app.post("/login")
def login_user(user: LoginSchema, db: Session = Depends(get_db)):
    db_user = db.query(database_model.User).filter(database_model.User.email == user.email).first()
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token({"sub": db_user.email})
    refresh_token = create_refresh_token({"sub": db_user.email})

    user_data = UserSchemaOut(
        fullName=db_user.fullName,
        email=db_user.email,
        phone=db_user.phone,
        occupation=db_user.occupation
    )

    response = JSONResponse(content={
        "access_token": access_token,
        "fullName": user_data.fullName,
        "email": user_data.email,
        "phone": user_data.phone,
        "occupation": user_data.occupation
    })
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True)
    return response


# ---------------- GET CURRENT USER ----------------
@app.get("/me")
def read_current_user(current = Depends(get_current_user)):
    user = current["user"]
    new_token = current["new_access_token"]

    response = {
        "fullName": user.fullName,
        "email": user.email,
        "occupation": user.occupation
    }
    if new_token:
        response["new_access_token"] = new_token
    return response
# ---------------- REFRESH TOKEN ----------------
@app.post("/refresh")
def refresh_token(refresh_token: str = Cookie(None)):
    if not refresh_token:
        raise HTTPException(status_code=401, detail="No refresh token found")

    try:
        payload = jwt.decode(refresh_token, "your_secret_key_here", algorithms=["HS256"])
        email = payload.get("sub")
        new_access_token = create_access_token({"sub": email})
        return {"access_token": new_access_token}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

# ---------------- PROTECTED ROUTE ----------------
@app.get("/dashboard")
def dashboard(current_user=Depends(get_current_user)):
    return {"message": f"Welcome, {current_user.fullName}!"}

# ---------------- PREDICT TASK ----------------
@app.post("/predict")
def predict_task(task: TaskSchema, current_user=Depends(get_current_user)):
    # Simple prediction logic - in real app, this could use AI/ML
    predictions = [
        f"Based on '{task.title}', you might need to allocate 2-3 hours for completion.",
        f"Task '{task.title}' appears to be high priority. Consider breaking it into smaller steps.",
        f"Similar tasks usually take about 1 hour. Plan accordingly for '{task.title}'.",
        f"'{task.title}' might require collaboration. Consider involving team members.",
        f"This task '{task.title}' could be completed in 30 minutes if focused."
    ]
    import random
    prediction = random.choice(predictions)
    return {"prediction": prediction}

@app.post("/predicts")
def predict_task(task: TaskSchema, current_user=Depends(get_current_user)):
    # Simple prediction logic - in real app, this could use AI/ML
     
    

    client = OpenAI(
    api_key="key",
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
       )

    response = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": f"provide a suggestion for the following task in one line: {task.title}"
        }
    ]
   )

    print(response.choices[0].message)
    return {"prediction": str(response.choices[0].message)}

# ---------------- LOGOUT ----------------
@app.post("/logout")
def logout():
    response = JSONResponse(content={"message": "Logged out successfully"})
    response.delete_cookie(key="refresh_token")
    return response


