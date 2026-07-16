# auth.py
from jose import jwt, JWTError, ExpiredSignatureError
from fastapi import Depends, HTTPException, Cookie
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from .database import SessionLocal
from .models import User

SECRET_KEY = "super_secret_key_123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict):
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme),
    refresh_token: str = Cookie(None)
):
    email = None
    new_access_token = None

    # Try to decode access token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
    except ExpiredSignatureError:
        if not refresh_token:
            raise HTTPException(status_code=401, detail="Access token expired and no refresh token")
        try:
            refresh_payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
            email = refresh_payload.get("sub")
            new_access_token = create_access_token({"sub": email})
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid access token")

    if not email:
        raise HTTPException(status_code=401, detail="Invalid token data")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {"user": user, "new_access_token": new_access_token}
