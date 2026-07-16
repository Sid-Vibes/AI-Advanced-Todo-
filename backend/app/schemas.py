from pydantic import BaseModel, EmailStr

class UserSchema(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    phone: str
    occupation: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str
    
class UserSchemaOut(BaseModel):
    fullName: str
    email: str
    phone: str
    occupation: str    

