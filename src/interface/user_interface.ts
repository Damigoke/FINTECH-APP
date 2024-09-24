import { Document } from 'mongoose'

export interface IUser {
  email: string;
  password: string;
  confirm_password: string;
}

export interface ILogInUser{
    email: string;
    password: string;
}
